import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import './App.css';
import FormGroup from "@material-ui/core/FormGroup";
import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import dbx from './dropbox.js';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    fab: {
        margin: theme.spacing.unit,
    },
});

class FileUpload extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contribText: '',
        };
    };
    handleTextChange = event => {
        this.setState({contribText: event.target.value});
    };
    render() {
        const classes = this.props.classes;

        return (
            <div className={classes.root}>

                <FormGroup row id={this.props.uploadName + this.props.fileName}>
                    <Fab
                        size="small"
                        color="primary"
                        aria-label="Add"
                        className={classes.fab}
                        onClick={() => dbx.onChoose(this.props.uploadName, this.props.onChooserSuccess)}>
                        <AddIcon/>
                    </Fab>
                    {this.props.fileName || ''}
                    <TextField
                        id="standard-multiline-static"
                        label="Caption"
                        style={{margin: 5}}
                        multiline
                        value={this.state.contribText}
                        onChange={this.handleTextChange}
                        margin="normal"
                        variant="filled"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </FormGroup>

            </div>
        );
    }

}

export default withStyles(styles)(FileUpload);

