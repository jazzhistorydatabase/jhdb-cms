import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import './App.css';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Switch from "@material-ui/core/Switch";
import Paper from "@material-ui/core/Paper";
import FileUpload from "./FileUpload";
import Button from "@material-ui/core/Button";

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
    nameStyle: {
        margin: theme.spacing.unit * 2,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    fab: {
        margin: theme.spacing.unit,
    },


});

class MediaUpload extends Component {

    state = {
        makeSubpage: '',
        contribText: '',
    };
    handleSubpage = name => event => {
        this.setState({
            makeSubpage: event.target.checked
        });
    };
    handleTextChange = event => {
        this.setState({contribBio: event.target.value});
    };

    render() {
        const classes = this.props.classes;

        return (
            <div className={classes.root}>
                <br/>
                <Paper className={classes.paper} elevation={3} square={false}>
                    <FormGroup row>
                        <h3>
                            {this.props.uploadName || ""}
                        </h3>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={this.state.makeSubpage}
                                    onChange={this.handleSubpage('')}
                                    value="make subpage"
                                />
                            }
                            label="Make Subpage"
                        />
                    </FormGroup>
                    <h4>
                        <FileUpload fileName="File #1"/>
                    </h4>
                    <h4>
                        <FileUpload fileName="File #2"/>
                    </h4>
                    <Button variant="contained" color="primary" className={classes.button}>
                        + ADD MORE
                    </Button>
                </Paper>
            </div>
        );
    }

}

export default withStyles(styles)(MediaUpload);

