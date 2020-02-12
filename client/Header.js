import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import React, {Component} from 'react';
import { Avatar, Divider, Drawer, IconButton, List, ListItem, ListSubheader, ListItemText } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Helpicon from '@material-ui/icons/Help';
import SettingsIcon from '@material-ui/icons/Settings';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {withStyles} from '@material-ui/core/styles';
import './App.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import 'typeface-roboto';
import fb from './firebase';
import HelpDialog from './HelpDialog';
import UploadDialog from './UploadDialog';
import genericUserPhoto from './generic-user.jpg';


import Axios from 'axios';

const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
    palette: {
        primary: {
         main: '#c51162',
         text: '#ffffff'
        }
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
    drawer: {
        // backgroundColor: "#FCE4EC",
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
        marginLeft: -12,
        marginRight: 20,
        height: 50,
        width: 50,
    },
    accountButton: {
        backgroundColor: "#A10C32",
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
    backButton: {
        backgroundColor: "#a02c49"
    }
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
        if ( event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        this.setState({drawerOpen: !this.state.drawerOpen });
    };

    handleAdminButtonClick(){
        this.toggleDrawer();
        this.props.adminSwap();
    };
    

    render() {
        const classes = this.props.classes;

        let loginButton = this.props.user ? (
            <ListItem button color="inherit"
                    onClick={this.props.handleSignOut}>
                <ExitToAppIcon />
                <ListItemText primary="Sign Out"></ListItemText>
            </ListItem>
        ) : (
            <ListItem button color="inherit"
            onClick={() => {return fb.showAuthPopup()}} >
                <LockOpenIcon />
                <ListItemText primary="Sign In With Dropbox"></ListItemText>
            </ListItem>

        );

        let userDetail = this.props.user ? (
            <div>
                <Avatar 
                    alt={(this.props.user && this.props.user.name) || "Unnamed Contributor"}
                    src={(this.props.user && this.props.user.displayPhoto) || genericUserPhoto} 
                    className={classes.bigAvatar} />
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
                    className={classes.bigAvatar} />
                {/* <ListItem selected className={classes.avatarName}> */}
                    <ListSubheader className={classes.avatarName}>{"Not Signed In"} </ListSubheader>
                {/* </ListItem> */}
            </div>
        );

        let adminButton = this.props.adminButton ? (
            <ListItem button color="primary" aria-label="Admin" onClick={() => {return this.handleAdminButtonClick.bind(this)()}}>
                <SettingsIcon />
                <ListItemText primary={"Admin Settings"}></ListItemText>
            </ListItem>
        ) : (<div />);

        return (
            <MuiThemeProvider theme={theme}>
            <Drawer className={classes.drawer} open={this.state.drawerOpen} onClose={this.toggleDrawer.bind(this)}>
                {userDetail}
                <List>
                    <Divider />
                    {loginButton}
                    {adminButton}
                    <ListItem button
                        size="small"
                        color='inherit'
                        aria-label="Upload"
                        onClick={this.toggleHelpDialog.bind(this)} >
                        <Helpicon />
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
                        <IconButton className={classes.menuButton} color="inherit" aria-label="menu" onClick={this.toggleDrawer.bind(this)}>
                            <MenuIcon className={classes.icon}/>
                        </IconButton>
                        <div className={classes.grow}>
                            <Typography variant="h5" align="left" color="inherit">
                                <b>Global Contributor Portal</b>
                            </Typography>
                            <Typography variant="h6" align="left" color="inherit">
                                Jazz History Database
                            </Typography>
                        </div>
                        <div>
                            {/* <Button color="inherit" 
                                    onClick={this.toggleUploadDialog.bind(this)} 
                                    className={classes.backButton}>
                                <CloudUploadIcon />
                                <label style={{marginLeft: 5}}>{"Upload Media"}</label>
                            </Button> */}
                        </div>
                        <HelpDialog 
                            show={this.state.showHelp} 
                            toggle={this.toggleHelpDialog.bind(this)}/>
                        <UploadDialog 
                            show={this.state.showUpload} 
                            toggle={this.toggleUploadDialog.bind(this)}/>

                    </Toolbar>

                </AppBar>
            </div>
            </MuiThemeProvider>
        );
    }

}

export default withStyles(styles)(Header);

