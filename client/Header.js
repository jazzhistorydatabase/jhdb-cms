import AppBar from '@material-ui/core/AppBar';
import React, {Component} from 'react';
import {Avatar, Divider, Drawer, IconButton, List, ListItem, ListItemText, ListSubheader} from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Helpicon from '@material-ui/icons/Help';
import SettingsIcon from '@material-ui/icons/Settings';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { CloseSharp } from '@material-ui/icons';
import {createMuiTheme, MuiThemeProvider, withStyles} from '@material-ui/core/styles';

import './App.css';
import 'typeface-roboto';
import fb from './firebase';
import HelpDialog from './HelpDialog';
import UploadDialog from './UploadDialog';
import genericUserPhoto from './generic-user.jpg';
import { CloudUpload } from '@material-ui/icons';
import { Button } from '@material-ui/core';

const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
    palette: {
        primary: {
            main: '#00519a',//19ABFF
            text: '#ffffff',
            light: '#6edcff',//00519a
        },
        secondary: {
            main: '#80cbc4',
            text: '#000000',
        },
    },
});

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
        padding: 5,
        marginLeft: 10,
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
    icon: {
        height: 35,
        width: 35,
    },
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    menuButton: {
        height: 50,
    },
    toolbarHelp: {
        height: "100%",
        // backgroundColor: theme.palette.primary.main,
    },
    accountButton: {
        backgroundColor: "#007ccb",
        display: 'inline-block',
        height: 40,
        padding: 5,
        verticalAlign: 'middle'
    },
    accountButtonText: {
        display: 'inline-block',
        height: 40,
        paddingLeft: 5,
        paddingRight: 5,
        verticalAlign: 'middle'
    },
    accountButtonImg: {
        height: 30
    },
};

class Header extends Component {

    constructor(props) {
        super(props);
        this.helpRef = React.createRef();

        this.state = {
            showHelp: false,
            showUpload: false,
            drawerOpen: false,
        }
    }

    toggleHelpDialog() {
        this.setState({
            showHelp: !this.state.showHelp
        });
    }

    toggleUploadDialog() {
        this.setState({
            showUpload: !this.state.showUpload
        });
    }

    toggleDrawer(event) {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        this.setState({drawerOpen: !this.state.drawerOpen});
    };

    handleAdminButtonClick() {
        this.toggleDrawer();
        this.props.adminSwap();
    };


    render() {
        const classes = this.props.classes;

        let loginButton = this.props.user ? (
            <ListItem button color="inherit"
                      onClick={this.props.handleSignOut}>
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

        let userDetail = this.props.user ? (
            <div>
                <Avatar
                    alt={(this.props.user && this.props.user.name) || "Unnamed Contributor"}
                    src={(this.props.user && this.props.user.displayPhoto) || genericUserPhoto}
                    className={classes.bigAvatar}/>
                {/* <ListItem selected className={classes.avatarName}>
                    <ListItemText primary={this.props.user.displayName} />
                </ListItem> */}
                <ListSubheader className={classes.avatarName}>{this.props.user.displayName} </ListSubheader>
            </div>
        ) : (
            <div>
                <Avatar
                    alt={"No User"}
                    src={(this.props.user && this.props.user.displayPhoto) || genericUserPhoto}
                    className={classes.bigAvatar}/>
                {/* <ListItem selected className={classes.avatarName}> */}
                <ListSubheader className={classes.avatarName}>{"Not Signed In"} </ListSubheader>
                {/* </ListItem> */}
            </div>
        );

        let adminButton = this.props.adminButton ? (
            <ListItem button color="primary" aria-label="Admin" onClick={() => {
                return this.handleAdminButtonClick.bind(this)()
            }}>
                <SettingsIcon/>
                <ListItemText primary={"Admin Settings"}></ListItemText>
            </ListItem>
        ) : (<div/>);

        let uploadButton = (this.props.user && this.props.user.authorized) ? (
            <Button variant="contained"
                    color="secondary"
                    onClick={this.toggleUploadDialog.bind(this)} >
                <CloudUpload />
                <label style={{marginLeft: 5}}>{"Upload Media"}</label>
            </Button>
        ) : (
            <div></div>
        );

        return (
            <MuiThemeProvider theme={theme}>
                <Drawer className={classes.drawer} open={this.state.drawerOpen} onClose={this.toggleDrawer.bind(this)}>
                    <ListItem button onClick={this.toggleDrawer.bind(this)}>
                        <CloseSharp />
                        <ListItemText primary="Close Menu"/>
                    </ListItem>
                    {userDetail}
                    <List>
                        <Divider/>
                        {loginButton}
                        {adminButton}
                        <ListItem button
                                  size="small"
                                  color='inherit'
                                  aria-label="Upload"
                                  onClick={this.toggleHelpDialog.bind(this)}>
                            <Helpicon/>
                            <ListItemText primary={"Help"}></ListItemText>
                        </ListItem>
                        <ListItem button>
                            <a href={"http://www.jazzhistorydatabase.com"}>
                                <ListItemText primary={"Back to jazzhistorydatabase.com"}></ListItemText>
                            </a>
                        </ListItem>
                    </List>
                    <div style={{"width": "1vw"}}></div>
                    <div>
                        <br/>
                    </div>
                </Drawer>
                <div className={classes.root}>
                    <AppBar position="static">
                        <Toolbar>
                            <Button 
                                size="large"
                                color="inherit"
                                className={classes.menuButton}
                                startIcon={<MenuIcon style={{fontSize: 35}} />}
                                aria-label="menu"
                                onClick={this.toggleDrawer.bind(this)} >Menu</Button>
                            <div className={classes.grow}>
                                <Typography variant="h5" align="left" color="inherit">
                                    <b>Global Contributor Portal</b>
                                </Typography>
                                <Typography variant="h6" align="left" color="inherit">
                                    Jazz History Database
                                </Typography>
                            </div>
                            <div>
                            {uploadButton}
                            </div>
                            <Button 
                                size="large"
                                color="inherit"
                                className={classes.toolbarHelp}
                                endIcon={<Helpicon style={{fontSize: 35}} />}
                                aria-label="menu"
                                onClick={this.toggleHelpDialog.bind(this)} >Help</Button>
                            <HelpDialog
                                show={this.state.showHelp}
                                toggle={this.toggleHelpDialog.bind(this)}/>
                            <UploadDialog
                                show={this.state.showUpload}
                                toggle={this.toggleUploadDialog.bind(this)}/>

                        </Toolbar>

                    </AppBar>
                </div>
                {this.props.content}
            </MuiThemeProvider>
        );
    }

}

export default withStyles(styles)(Header);

