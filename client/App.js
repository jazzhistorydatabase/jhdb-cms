import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import { lightBlue } from '@material-ui/core/colors';
import { SnackbarProvider } from 'notistack';

import { CircularProgress, Link } from '@material-ui/core';
import Paper from "@material-ui/core/Paper";

import Header from './Header';
import InfoView from './InfoView';
import UploadView from './UploadView';
import AdminView from './AdminView';
import fb from './firebase';
import dbx from './dropbox.js';
import { ArrowUpwardSharp } from '@material-ui/icons';
import PageListView from './PageListView';



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
    paper: {
        maxWidth: 1500,
        margin: theme.spacing(3),
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: theme.spacing(3),
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
    snackbarContainer: {
        // top: 20,
        // right: 20,
        // left: 'auto',
        // bottom: 'auto',
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
                                                  vertical: 'top',
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
                                    <Paper className={classes.paper} elevation={3}>
                                        <Switch>
                                            <Route exact path="/">
                                                <InfoView />
                                            </Route>
                                            <Route path="/upload">
                                                <UploadView user={user} />
                                            </Route>
                                            <Route path="/pages">
                                                <PageListView user={user} />
                                            </Route>
                                            <Route path="/admin">
                                                <AdminView user={user}
                                                            adminSwap={window.history.back}
                                                            users={[user]} />
                                            </Route>
                                        </Switch>
                                    </Paper>
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