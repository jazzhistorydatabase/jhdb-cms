import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import MediaUpload from "./MediaUpload";
import Paper from "@material-ui/core/Paper";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import 'typeface-roboto';
import fb from "./firebase";
import Avatar from '@material-ui/core/Avatar';
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";

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

        };
    }


    render() {
        const classes = this.props.classes;
        return (
            <MuiThemeProvider theme={theme}>
            <div>

                <h1> Admin Settings </h1>
                <Button onClick={this.handleBeforeButtonClick.bind(this)} variant="outlined" color={"primary"}
                        className={classes.button}> Back </Button>
                <br/>
                <br/>
                <Paper className={classes.paper} elevation={3} square={false} classes={{root: classes.cardColor}}>
                    <Grid container justify="center" alignItems="center" row>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.bigAvatar} />
                        <h3> Name </h3>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="role-helper">User Role</InputLabel>
                            <Select
                                value={this.state.role}
                                onChange={this.handleChange}
                                input={<Input name="role" id="role-helper" />}
                            >
                                <MenuItem value="">
                                    <em>User Role</em>
                                </MenuItem>
                                <MenuItem value={1}>Unauthorized</MenuItem>
                                <MenuItem value={2}>Contributor</MenuItem>
                                <MenuItem value={3}>Admin</MenuItem>
                                <MenuItem value={4}>Super Admin </MenuItem>
                            </Select>
                            <FormHelperText>User role</FormHelperText>
                        </FormControl>
                    </Grid>
                </Paper>
            </div>
            </MuiThemeProvider>

        );
    }

}

export default withStyles(styles)(AdminPage);

