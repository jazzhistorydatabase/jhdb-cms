import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import { lightBlue } from '@material-ui/core/colors';
import { SnackbarProvider } from 'notistack';

import { Button, CircularProgress, Link } from '@material-ui/core';

import Header from './Header';
import InfoView from './InfoView';
import UploadView from './UploadView';
import AdminView from './AdminView';
import fb, { useDoc } from './firebase';
import dbx from './dropbox.js';
import { ArrowUpwardSharp } from '@material-ui/icons';
import PageListView from './PageListView';
import EditPageView from './EditPageView';



const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
        h6: {
            marginTop: 15,
        }
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

const styles = theme => ({
    root: {
        textAlign: 'center',
        backgroundColor: '#303030',
        color: '#EEE',
        opacity: 1.0,
        visibility: 'visible',
        transition: 'opacity 100ms 0ms'
    },
    rootHidden: {
        width: '100%',
        height: '100%',
        textAlign: 'center',
        backgroundColor: '#303030',
        color: '#EEE',
        opacity: 0.0,
        visibility: 'hidden',
    },
    shown: {
        opacity: 1.0,
        visibility: 'visible',
        transition: 'opacity 500ms 0ms'
    },
hidden: {
        opacity: 0.0,
        visibility: 'hidden',
        transition: 'opacity 500ms 0ms',
    },
    switch: {
        margin: theme.spacing(2),
        maxWidth: 1500,
        marginLeft: 'auto',
        marginRight: 'auto',
    }
});

const App = (props) => {
    const classes = props.classes;
    
    const [app, setApp] = useState(undefined);
    const [user, setUser] = useState(undefined);
    const [rootClass, setRootClass] = useState(classes.rootHidden);
    const [appClass, setAppClass] = useState(classes.hidden);

    useEffect(() => {
        console.log("fb init ueff")
        setRootClass(classes.root);
        if (!fb.app) {
            console.log("appInit")
            fb.initialize((user) => {
                setUser(user);
                setApp(fb.app);
                setAppClass(classes.shown);
            });
        }
        if (!dbx.app) {
            dbx.initialize();
        }
    }, [classes.root, classes.shown, user]);

    return (
        <div className={rootClass}>
            {!app && <div>
                <br />
                <br />
                <h3>One moment, please...</h3>
                <CircularProgress />
            </div>}
            {app && 
                <div className={appClass}>
                    <Router>
                        <MuiThemeProvider theme={theme}>
                            <SnackbarProvider maxSnack={1}
                                              anchorOrigin={{
                                                  vertical: 'bottom',
                                                  horizontal: 'right'
                                              }}
                                              classes={{containerRoot: classes.snackbarContainer}}>
                                <Header user={user} />
                                {!user &&
                                    <h3 style={{marginLeft: 10, textAlign: 'left'}}>
                                        <ArrowUpwardSharp/><ArrowUpwardSharp/><ArrowUpwardSharp/>
                                        <br/>
                                        Please sign in to continue (See MENU)
                                    </h3>
                                }
                                {user && !user.authorized && 
                                    <h3>
                                        <br/>
                                        This account is not authorized. Make sure you have logged in with your JHDB-provided Dropbox account
                                        <br/>
                                        If you are still unsure of how to proceed, send us an email at <Link href="mailto:global@jazzhistorydatabase.com">global@jazzhistorydatabase.com</Link>
                                    </h3>
                                }
                                {user && user.authorized &&
                                    <div className={classes.switch}>
                                        <Switch>
                                            <Route exact path="/">
                                                <InfoView />
                                            </Route>
                                            <Route path="/upload">
                                                <UploadView user={user} />
                                            </Route>
                                            <Route exact path="/pages">
                                                <PageListView user={user} />
                                            </Route>
                                            <Route path="/pages/:id" component={(props) => {
                                                let [publishedList, loadingPublished] = useDoc('Contributions/published');
                                                const [page, loadingPage] = useDoc(`Contributions/${props.match.params.id}`);
                                                if(loadingPublished || loadingPage) {
                                                    return (
                                                        <div>
                                                            Loading page...
                                                            <br />
                                                            <CircularProgress />
                                                        </div>);
                                                } else if(!page) {
                                                    return (
                                                        <div>
                                                            <h4>No such page</h4>
                                                            <Button variant="contained"
                                                                    color="primary"
                                                                    onClick={() => {history.push('/pages')}}>
                                                                Back
                                                            </Button>
                                                        </div>
                                                    )
                                                }
                                                return <EditPageView page={page} 
                                                                    user={user}
                                                                    publishedList={publishedList}
                                                                    published={!!publishedList[page.ref.id]} />
                                                }}>
                                            </Route>
                                            <Route path="/admin">
                                                <AdminView user={user}
                                                            adminSwap={window.history.back}
                                                            users={[user]} />
                                            </Route>
                                        </Switch>
                                    </div>
                                }
                            </SnackbarProvider>
                        </MuiThemeProvider>
                    </Router>
                </div>
            }
        </div>
    );
}

export default withStyles(styles)(App);