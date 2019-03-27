import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import React, {Component} from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import './App.css';
import fb from './firebase';


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
        backgroundColor: "#2E40A4"
    }
};

const defaultUserImg = "data:image/png;base64,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";

class ButtonAppBar extends Component {
    render() {
        const classes = this.props.classes;

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <div className={classes.grow}>
                            <Typography variant="h5" align="left" color="inherit">
                                Collaborator Portal
                            </Typography>
                            <Typography variant="h6" align="left" color="inherit">
                                Philly Branch
                            </Typography>
                        </div>
                        <div>
                            <Button color="inherit">Main Branch </Button>
                            <Button color="inherit">Philly Branch </Button>
                        </div>
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
        );
    }

}

export default withStyles(styles)(ButtonAppBar);

