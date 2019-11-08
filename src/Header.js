import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import React, {Component} from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import './App.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import 'typeface-roboto';
import fb from './firebase';
const theme = createMuiTheme({
    palette: {
        primary: {
         main: '#c51162',
        } ,
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
        backgroundColor: "#A10C32"
    },
    backButton: {
        backgroundColor: "#a02c49"
    }
};

class Header extends Component {
    render() {
        const classes = this.props.classes;

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
                            <Button color="inherit"
                                    className={classes.accountButton}
                                    onClick={this.props.user ? this.props.handleSignOut : fb.showAuthPopup.bind(fb)}>

                                {this.props.user ? this.props.user.displayName : "Sign In"}
                            </Button>
                            <br/>
                        </div>

                    </Toolbar>
                </AppBar>
            </div>
            </MuiThemeProvider>
        );
    }

}

export default withStyles(styles)(Header);

