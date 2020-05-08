import React, { Component } from 'react';
import AdminView from "./AdminView";
import Header from './Header';
import dbx from './dropbox.js';
import EditContributionView from "./EditContributionView";
import UploadView from "./UploadView";
import fb from './firebase.js';
import ContributionsListView from './ContributionsListView';
import { CircularProgress, Container, CssBaseline } from '@material-ui/core';
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
                        console.log(q);
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
            collectionView: 0,
        });
    }

    handleTabChange(value) {
        this.setState({
            tabValue: value,
        })
    }

    handleCollectionViewChange(value) {
        this.setState({
            collectionView: value,
        })
    }

    adminSwap() {
        this.setState({
            //adminPanel: adminPanel,
            showAdminWindow: !this.state.showAdminWindow
            //showWindow: !this.state.showWindow
        });
    }

    getAppContent() {
        if(!this.state.user) {
            return ( <div>    
                <h3 style={{textAlign: 'left', paddingLeft: 20}}>
                    <ArrowUpwardSharp/><ArrowUpwardSharp/><ArrowUpwardSharp/>
                    <br/>
                    Please sign in to continue (See MENU)
                </h3>
                <h5 style={{paddingLeft: 20, display: this.state.pageLoadDone ? 'none' : 'block'}}>
                    If you have just signed in, give it a few seconds...
                </h5>
            </div>);
        } else if(!this.state.pageLoadDone) {
            return (<div>
                        <h3><CircularProgress /><br/>Fetching data...</h3>
                    </div>);

        } else if(!this.state.user.authorized) {
            return (<h3><br/>This account is not authorized. Make sure you have logged in with your JHDB-provided Dropbox account</h3>);
        } else if(this.state.showAdminView) {
            return (<AdminView adminPanel={this.state.adminPanel}
                users={this.state.users}
                   adminSwap={this.adminSwap.bind(this)}/>);
        }

        switch(this.state.tabValue) {
            case 0:
                return <div>Information time</div>
            case 1:
                return <UploadView />;
            default:
                break;
        }

        switch(( (!!this.state.selectedContribution) && this.state.collectionView) || 0) {
            case 3:
                return (<div>
                            <iframe title="Preview" 
                                    style={{
                                        height: 800,
                                        width: '100%',
                                    }}
                                    // width="100vw" 
                                    // height="90vh"
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
                    user={this.state.user}
                    onSelectContribution={this.selectContribution.bind(this)}
                    publishedList={this.state.publishedList}
                    adminSwap={this.adminSwap.bind(this)}/>);
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
