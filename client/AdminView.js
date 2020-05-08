import React, {Component} from 'react';

import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControl from "@material-ui/core/FormControl";
import Paper from "@material-ui/core/Paper";
import 'typeface-roboto';
import Avatar from '@material-ui/core/Avatar';
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import fb from "./firebase";
import { randomBytes } from 'crypto';


import genericUserPhoto from './generic-user.jpg';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    paper: {
    },
    cardColor: {
    },
    avatar: {
        margin: 10,
    },
    bigAvatar: {
        margin: 10,
        width: 60,
        height: 60,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120
    },
});

class AdminView extends Component {
    handleBeforeButtonClick() {
        this.props.adminSwap();
    }

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            admin: {},
            authorized: {}
        };
    }

    componentDidMount() {

        fb.base.syncDoc(fb.db.collection("Users").doc("admin"), {
            context: this,
            state: 'admin',
            withRefs: true
        });

        fb.base.syncDoc(fb.db.collection("Users").doc("authorized"), {
            context: this,
            state: 'authorized',
            withRefs: true
        });
    }

    handleChange(evt, user) {

        let admin = this.state.admin;
        let authorized = this.state.authorized;

        switch(evt.target.value) {
            default:
            case 1:
                delete admin[user.uid];
                delete authorized[user.uid];
                this.setState({
                    admin: admin,
                    authorized: authorized
                });
                break;
            case 2:
                delete admin[user.uid];
                authorized[user.uid] = true;
                this.setState({
                    admin: admin,
                    authorized: authorized
                });
                break;
            case 3:
                admin[user.uid] = true;
                authorized[user.uid] = true;
                this.setState({
                    admin: admin,
                    authorized: authorized
                });
                break;


        }
    }


    render() {
        const classes = this.props.classes;

        if(Object.keys(this.state.admin) < 1 || Object.keys(this.state.authorized) < 1) {
            return (<div><h5>Loading user data...</h5></div>);
        }

        return (
            <div>

                <h1> Admin Settings </h1>
                <Button onClick={this.handleBeforeButtonClick.bind(this)} variant="outlined" color={"primary"}
                        className={classes.button}> Back </Button>
                <br/>
                <br/>
                <Paper className={classes.paper} elevation={3} square={false} classes={{root: classes.cardColor}}>
                    {this.props.users.filter(user => !!user.uid).map( (user) => {
                        if (user.uid === fb.auth.currentUser.uid) {
                            return (
                                <div key={user.uid} >
                                <Grid container className={classes.adminGrid} spacing={3} justify="flex-start" alignItems="center">
                                    <Grid item xs={1}>
                                    </Grid>
                                    <Grid item xs={1}>
                                        <Avatar alt={user.name} src={user.displayPhoto || genericUserPhoto} className={classes.bigAvatar} />
                                    </Grid>
                                    <Grid item xs={3}>
                                    <   h3> {user.name} </h3>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <h5> {user.email} </h5>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <b>Admin</b>
                                    </Grid>
                                </Grid>
                            </div>
                            )
                        };

                        return (
                            <div key={user.uid} >
                                <Grid container className={classes.adminGrid} spacing={3} justify="flex-start" alignItems="center" >
                                    <Grid item xs={1}>
                                    </Grid>
                                    <Grid item xs={1}>
                                        <Avatar alt={user.name} src={user.displayPhoto || genericUserPhoto} className={classes.bigAvatar} />
                                    </Grid>
                                    <Grid item xs={3}>
                                    <   h3> {user.name} </h3>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <h5> {user.email} </h5>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <FormControl className={classes.formControl}>
                                            <InputLabel htmlFor="role-helper">User Role</InputLabel>
                                            <Select
                                                value={this.state.admin[user.uid] ? 3 : this.state.authorized[user.uid] ? 2 : 1}
                                                onChange={(evt) => {this.handleChange(evt, user)}}
                                                input={<Input name="role" id="role-helper" />}
                                            >
                                                <MenuItem value="">
                                                    <em>User Role</em>
                                                </MenuItem>
                                                <MenuItem value={1}>Unauthorized</MenuItem>
                                                <MenuItem value={2}>Contributor</MenuItem>
                                                <MenuItem value={3}>Admin</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </div>
                        );
                    })}

                </Paper>
            </div>

        );
    }

}

export default withStyles(styles)(AdminView);

