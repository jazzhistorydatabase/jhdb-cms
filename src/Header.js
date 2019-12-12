import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import React, {Component} from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Helpicon from '@material-ui/icons/Help';
import {withStyles} from '@material-ui/core/styles';
import './App.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import 'typeface-roboto';
import fb from './firebase';
import HelpDialog from './HelpDialog';

import googleLoginIcon from './google-signin.png';
import msLoginIcon from './ms-signin.png';
import { IconButton } from '@material-ui/core';

const theme = createMuiTheme({
    palette: {
        primary: {
         main: '#c51162',
        }
    },
});

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    accountButton: {
        backgroundColor: "#A10C32",
        display: 'inline-block'
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
            showHelp: false
        }
      }

    toggleHelpDialog() {
        this.setState({
            showHelp: !this.state.showHelp
        });
    }

    render() {
        const classes = this.props.classes;

        let loginButton = this.props.user ? (
            <Button color="inherit"
                    className={classes.accountButton}
                    onClick={this.props.handleSignOut}>

                {this.props.user.displayName}
            </Button>
        ) : (
            <span>
                <Button color="inherit"
                        className={classes.signinButton}
                        onClick={() => {return fb.showAuthPopup('Google')}} >
                            <img src={googleLoginIcon} className={classes.accountButtonImg}/>
                </Button>
                <Button color="inherit"
                        className={classes.signinButton}
                        onClick={() => {return fb.showAuthPopup('Microsoft')}} >
                            <img src={msLoginIcon} className={classes.accountButtonImg}/>
                </Button>
            </span>

        );

        return (
            <MuiThemeProvider theme={theme}>
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <div className={classes.grow}>
                            <Typography variant="h5" align="left" color="inherit">
                                Collaborator Portal
                            </Typography>
                            <Typography variant="h6" align="left" color="inherit">
                                WPI Branch
                            </Typography>
                        </div>
                        <div>
                            <a href="http://www.jazzhistorydatabase.com" style={{"color": "white"}}>
                                <Button color="inherit" className={classes.backButton}>Return to JHDB </Button>
                            </a>
                        </div>
                        <div style={{"width": "5vw"}}></div>
                        <div>
                            {loginButton}
                            <br/>
                        </div>
                        <IconButton
                            size="small"
                            color='inherit'
                            aria-label="Upload"
                            className={classes.fab}
                            onClick={this.toggleHelpDialog.bind(this)} >
                            <Helpicon />
                        </IconButton>
                        <HelpDialog 
                            show={this.state.showHelp} 
                            toggle={this.toggleHelpDialog.bind(this)}/>
                    </Toolbar>
                </AppBar>
            </div>
            </MuiThemeProvider>
        );
    }

}

export default withStyles(styles)(Header);

