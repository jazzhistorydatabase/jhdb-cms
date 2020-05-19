import React, { Component } from 'react';
import AdminView from "./AdminView";
import Header from './Header';
import dbx from './dropbox.js';
import EditContributionView from "./EditContributionView";
import UploadView from "./UploadView";
import fb from './firebase.js';
import ContributionsListView from './ContributionsListView';
import { Link } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Visibility } from '@material-ui/icons';
import { CircularProgress, Container, CssBaseline, Button, Paper } from '@material-ui/core';
import { ArrowUpwardSharp } from '@material-ui/icons';
import {createMuiTheme, MuiThemeProvider, withStyles} from '@material-ui/core/styles';
import { lightBlue } from '@material-ui/core/colors';


const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
    palette: {
        type: 'dark',
        primary: {
            main: lightBlue[600],
        },
        secondary: {
            main: lightBlue[900],
        },
    },
});

const styles = {
    root: {
        // flexGrow: 1,
        textAlign: 'center',
        backgroundColor: '#000000',
        width: '100%',
    },
    content: {
        height: '100vh',
        backgroundColor: '#000000',
        width: '100%',
    },
    grow: {
        flexGrow: 1,
        padding: 5,
        marginLeft: 10,
    },
    loading: {
        width: '100%',
        textAlign: 'center',
    },
    paper: {
        padding: theme.spacing(4),
        paddingTop: theme.spacing(1),
        marginTop: theme.spacing(4),
    },
};

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: null,
            contributions: [],
            users: [],
            showEditWindow: false,
            showAdminWindow: false,
            selectedContribution: undefined,
            adminPanel: undefined,
            pageLoadDone: false,
            publishedList: null,
            tabValue: 0,
            collectionView: 0,
        }

        this.getAppContent = this.getAppContent.bind(this);
    }

    handleUserAuth(user) {
        this.setState({user: user});
        if (user) {
            

            fb.base.bindCollection(`Users`, {
                context: this,
                state: 'users',
                withRefs: true,
                then: () => {
                    const u = this.state.user;
                    // Get authorized
                    let authProm = fb.db.collection("Users").doc("authorized").get().then((snapshot) => {
                        u["authorized"] = snapshot.exists && snapshot.data()[u.uid];
                        this.setState({user: u});
                    });
                    // Get admin
                    let adminProm = fb.db.collection("Users").doc("admin").get().then((snapshot) => {
                        u["admin"] = snapshot.exists && snapshot.data()[u.uid];
                        this.setState({user: u});
                    });

                    Promise.all([authProm, adminProm]).then( () => {
                        let q = u.admin ? undefined : (ref) => ref.where('owner', '==', u.uid);
                        if (!u.authorized) return;
                        fb.base.bindCollection(`Contributions`, {
                            context: this,
                            state: 'contributions',
                            withRefs: true,
                            query: q,
                            onFailure(err) {
                                console.log(err);
                            },
                        });

                        fb.base.syncDoc("/Contributions/published", {
                            context: this,
                            state: 'publishedList',
                            withRefs: true,
                            onFailure(err) {
                                console.log(err);
                            },
                        });
                    }).catch(err => {
                        console.log(err);
                    });
                }
            });
            if (!dbx.app) {
                dbx.initialize();
            }
        }
    }

    handleUserSignOut() {
        if (!window.confirm("Sign out of " + this.state.user.displayName + "?")) {
            return;
        }
        this.setState({user: null});
        fb.signOut();
    }

    componentDidMount() {
        if (!fb.app) {
            fb.initialize(this.handleUserAuth.bind(this));
        }
        setTimeout(() => {
            this.setState({pageLoadDone: true});
        }, 5000);
        if(this.state.user && this.state.user.uid) {
            let user = {
                uid: this.state.user.uid,
                name: this.state.user.displayName,
                email: this.state.user.email,
                displayPhoto: this.state.user.photoURL,
            };
            fb.base.addToCollection('Users', user, this.state.user.uid);
        }
    }

    selectContribution(selectedContribution) {
        this.setState({
            selectedContribution: selectedContribution,
            collectionView: selectedContribution ? 2 : 1,
        });
        // Scroll to top
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }

    handleTabChange(value) {
        this.setState({
            tabValue: value,
            showAdminWindow: false,
        });
        // Scroll to top
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }

    handleCollectionViewChange(value) {
        this.setState({
            collectionView: value,
        });
        // Scroll to top
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }

    adminSwap() {
        this.setState({
            showAdminWindow: !this.state.showAdminWindow
        });
    }

    getAppContent() {
        if(!this.state.user) {
            return ( <div style={{paddingLeft: 20}}>    
                <h3 style={{textAlign: 'left'}}>
                    <ArrowUpwardSharp/><ArrowUpwardSharp/><ArrowUpwardSharp/>
                    <br/>
                    Please sign in to continue (See MENU)
                </h3>
                <h5 style={{visibility: this.state.pageLoadDone ? 'hidden' : ''}}>
                    If you have just signed in, give it a few seconds...
                </h5>
                <br />
                <h3>Getting Started Walk-Through</h3>
                <iframe title="info-loggedout" width="560" height="315" style={{marginLeft: 'auto', marginRight: 'auto'}} src="https://www.youtube.com/embed/GirVi49SW_g" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>);
        } else if(!this.state.pageLoadDone) {
            return (<div className={this.props.classes.loading}>
                        <h3><CircularProgress /><br/>Fetching data...</h3>
                    </div>);

        } else if(!this.state.user.authorized) {
            return (<h3>
                        <br/>This account is not authorized. Make sure you have logged in with your JHDB-provided Dropbox account
                        <br/>If you are still unsure of how to proceed, send us an email at <Link href="mailto:global@jazzhistorydatabase.com">global@jazzhistorydatabase.com</Link>
            
                    </h3>);
        } else if(this.state.showAdminWindow) {
            return (<AdminView adminPanel={this.state.adminPanel}
                users={this.state.users}
                   adminSwap={this.adminSwap.bind(this)}/>);
        }

        switch(this.state.tabValue) {
            case 0:
                return <div>
                    <Paper className={this.props.classes.paper}>
                        <h1>Welcome to the contributor portal!</h1>
                        <br />
                        <Typography>
							Take a look at the video below for a tour! Please feel free to reach out to <Link href="mailto:global@jazzhistorydatabase.com">global@jazzhistorydatabase.com</Link> if you have any questions or issues.
						</Typography>
                        <br />
                        <Typography>
							You can upload files to the JHDB archive by selecting the Upload tab above. If you have already sent us files, they should have been uploaded for you already and you can skip this step. You can then build pages in the Pages tab. If you have any questions or run into difficulties, please don't hesitate to send us an email and our team will be happy to help you out!
						</Typography>
                        <br />
                        <h3>Getting Started Walk-Through</h3>
                        <iframe title="info-loggedin" width="560" height="315" src="https://www.youtube.com/embed/GirVi49SW_g?start=195" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </Paper>
                </div>
            case 1:
                return <UploadView user={this.state.user}/>;
            default:
                break;
        }

        switch(( (!!this.state.selectedContribution) && this.state.collectionView) || 0) {
            case 3:
                return (<div>
                            <br />
                            <Button variant="contained"
                                    color={"primary"}
                                    startIcon={<Visibility />}
                                    target="#"
                                    href={"/preview/"+this.state.selectedContribution.name.toLowerCase().replace(/ /g, "-")}>
                                Fullscreen Preview
                            </Button>
                            <br /><br />
                            <iframe title="Preview" 
                                style={{
                                    height: 800,
                                    width: '100%',
                                }}
                                src={"/preview/"+this.state.selectedContribution.name.toLowerCase().replace(/ /g, "-")} />
                        </div>);
            case 2:
                return (<EditContributionView selectedContribution={this.state.selectedContribution}
                admin={this.state.user && this.state.user.admin}
                    publishedList={this.state.publishedList}
                    onSelectContribution={this.selectContribution.bind(this)}/>);
            case 1:
            default:
                return (<ContributionsListView contributions={this.state.contributions}
                    selectedContribution={this.state.selectedContribution}
                    user={this.state.user}
                    users={this.state.users}
                    onSelectContribution={this.selectContribution.bind(this)}
                    publishedList={this.state.publishedList} />);
        }
            
    }


    render() {

        return (
            <div className={styles.root}>
                <MuiThemeProvider theme={theme}>
                    <CssBaseline />
                    <Header user={this.state.user} 
                            handleSignOut={this.handleUserSignOut.bind(this)}
                            handleTabChange={this.handleTabChange.bind(this)}
                            handleCollectionViewChange={this.handleCollectionViewChange.bind(this)}
                            tabValue={this.state.tabValue}
                            collectionView={this.state.collectionView}
                            contributionSelected={!!this.state.selectedContribution}
                            adminSwap={this.adminSwap.bind(this)}
                            adminButton={this.state.user && this.state.user.admin}/>
                    <Container>
                        {this.getAppContent()}
                    </Container>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default withStyles(styles)(App);
