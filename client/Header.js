import { AppBar, Avatar, BottomNavigation, BottomNavigationAction, Button, Divider, Drawer, List, ListItem, ListItemText, ListSubheader, Tab, Tabs } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { CloseSharp, CloudUploadRounded, Edit, InfoRounded, LibraryBooks, TouchApp, Visibility, SettingsRounded } from '@material-ui/icons';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Helpicon from '@material-ui/icons/Help';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from '@material-ui/styles';
import React, { useState, useEffect } from 'react';
import 'typeface-roboto';
import fb from './firebase';
import genericUserPhoto from './generic-user.jpg';
import HelpDialog from './HelpDialog';
import {Link, useHistory} from 'react-router-dom';

import { useAuthState } from 'react-firebase-hooks/auth';

const styles = theme => ({
    appBar: {
        flexGrow: 1,
        textAlign: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    indicator: {
        backgroundColor: 'white',
    },
    avatarName: {
        fontWeight: 'bold',
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'center',
    },
    bigAvatar: {
        margin: 10,
        width: 80,
        height: 80,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    menuButton: {
        height: 50,
    },
    sticky: {
        position: 'sticky',
        top: 0
    }
});

const Header = (props) => {
    const classes = props.classes;
    const user = props.user;

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [showHelp, setShowHelp] = useState(false);
    const path = window.location.pathname;
    const history = useHistory();

    const toggleDrawer = () => {setDrawerOpen(!drawerOpen)};
    let [appView, setAppView] = useState(
        path.includes('page') ? 2 :
        path.includes('upload') ? 1 : 0
    );

    let onTabChange = (evt, value) => {
        const ops = ['/', '/upload', '/pages'];
        history.push(ops[value]);
        setAppView(value);
    };
    
    let loginButton = user ? (
        <ListItem button color="inherit"
                  onClick={fb.signOut}>
            <ExitToAppIcon/>
            <ListItemText primary="Sign Out"></ListItemText>
        </ListItem>
    ) : (
        <ListItem button color="inherit"
                  onClick={() => {
                      return fb.showAuthPopup()
                  }}>
            <LockOpenIcon/>
            <ListItemText primary="Sign In With Dropbox"></ListItemText>
        </ListItem>

    );

    return (
        <div>
            <Drawer className={classes.drawer} open={drawerOpen} onClose={toggleDrawer}>
                {/* Close Button */}
                <ListItem button onClick={toggleDrawer}>
                    <CloseSharp />
                    <ListItemText primary="Close Menu"/>
                </ListItem>
                {/* User Detail */}
                <Avatar
                    alt={ (user ? (user.name || "Unnamed Contributor") : "No User") }
                    src={ (user && user.displayPhoto) || genericUserPhoto }
                    className={classes.bigAvatar}/>
                <ListSubheader className={classes.avatarName}>
                    {user ? user.name : "Not Signed In"} 
                </ListSubheader>
                {/* Drawer Buttons */}
                <List>
                    <Divider/>
                    {loginButton}
                    { user && user.admin &&
                        <ListItem button
                                size="small"
                                color='inherit'
                                aria-label="Admin"
                                onClick={() => {history.push('/admin')}}>
                                <SettingsRounded />
                                <ListItemText primary={"Admin"} />
                        </ListItem>
                    }
                    <ListItem button
                                size="small"
                                color='inherit'
                                aria-label="Upload"
                                onClick={() => {setShowHelp(!showHelp)}}>
                        <Helpicon/>
                        <ListItemText primary={"Help"} />
                    </ListItem>
                </List>
                <div style={{"width": "1vw"}}></div>
                <br/>
            </Drawer>
            <AppBar position="static">
                <Toolbar>
                    <Button
                        size="large"
                        color="inherit"
                        className={classes.menuButton}
                        startIcon={<MenuIcon style={{fontSize: 35}} />}
                        aria-label="menu"
                        onClick={toggleDrawer} >
                            {window.screen.width >= 408 && "Menu"}
                        </Button>
                    <div className={classes.appBar}>
                        <Typography variant="h6" align="center" color="inherit">
                            Jazz History Database
                        </Typography>
                        <Typography variant="h5" align="center" color="inherit">
                            <b>
                                {(window.screen.width >= 408) && "Global "}
                                Contributor Portal
                            </b>
                        </Typography>
                    </div>                        
                    <HelpDialog
                        show={showHelp}
                        toggle={() => {setShowHelp(!showHelp)}}/>
                </Toolbar>
                <Tabs   centered
                        style={{visibility: (user && user.authorized) ? 'visible' : 'collapse'}}
                        value={appView} 
                        onChange={onTabChange} 
                        indicatorColor="secondary" 
                        textColor="secondary">
                    <Tab label="Information" icon={<InfoRounded />} />
                    <Tab label="Upload Files" icon={<CloudUploadRounded />} />
                    <Tab label="My Pages" icon={<LibraryBooks />} />
                </Tabs>
            </AppBar>
        </div>
    );
}

export default withStyles(styles)(Header);