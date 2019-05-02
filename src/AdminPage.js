import React, {Component} from 'react';
import {createMuiTheme, MuiThemeProvider, withStyles} from '@material-ui/core/styles';
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

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#c51162',
        } ,
    },

});

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    paper: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        width: '70%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    cardColor: {
        backgroundColor: '#fce4ec',
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
        margin: theme.spacing.unit,
        minWidth: 120
    },

});

class AdminPage extends Component {
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

    componentWillMount() {

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
            <MuiThemeProvider theme={theme}>
            <div>

                <h1> Admin Settings </h1>
                <Button onClick={this.handleBeforeButtonClick.bind(this)} variant="outlined" color={"primary"}
                        className={classes.button}> Back </Button>
                <br/>
                <br/>
                <Paper className={classes.paper} elevation={3} square={false} classes={{root: classes.cardColor}}>
                    {this.props.users.map( (user) => {
                        if(!user.uid || user.uid == fb.auth.currentUser.uid) {
                            return (<div></div>)
                        };
                        console.log("elem for user "+user.name);
                        return (
                            <div key={user.uid} >
                                <Grid container justify="center" alignItems="center" row>
                                    <Avatar alt={user.name} src={user.displayPhoto || "http://chittagongit.com/images/generic-user-icon/generic-user-icon-8.jpg"} className={classes.bigAvatar} />
                                    {/*<h3> {user.name} </h3>*/}
                                    <h5> {user.email} </h5>
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
                                            {/*<MenuItem value={4}>Super Admin </MenuItem>*/}
                                        </Select>
                                        <FormHelperText>User role</FormHelperText>
                                    </FormControl>
                                </Grid>
                            </div>
                        );
                    })}

                </Paper>
            </div>
            </MuiThemeProvider>

        );
    }

}

export default withStyles(styles)(AdminPage);

