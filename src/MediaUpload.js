import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import './App.css';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Switch from "@material-ui/core/Switch";
import Paper from "@material-ui/core/Paper";
import FileUpload from "./FileUpload";
import Button from "@material-ui/core/Button";

import dbx from './dropbox.js';

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

const dbxImageOptions = {
    success: function(files) {
        alert("Here's the file link: " + files[0].link)
    },
    cancel: function() { },
    linkType: "preview", // or "direct"
    multiselect: false,
    extensions: ['images'],
    folderselect: false,
    sizeLimit: 1024 * 1024 * 1024, // in bytes
};

const dbxAudioOptions = {
    success: function(files) {
        alert("Here's the file link: " + files[0].link)
    },
    cancel: function() { },
    linkType: "preview", // or "direct"
    multiselect: false,
    extensions: ['audio'],
    folderselect: false,
    sizeLimit: 1024 * 1024 * 1024, // in bytes
};

class MediaUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            makeSubpage: '',
            contribText: '',
            filesList: [],
            add: '',
        };
    }

    handleSubpage(event) {
        this.setState({
            makeSubpage: event.target.checked
        });
    };

    addFileUpload(event) {
        console.log(this.state);
        let lst = this.state.filesList;
        lst.push(false);
        this.setState({
            filesList: lst
        });
    };

    render() {
        const classes = this.props.classes;
        let fileIndex = 0;
        let fileUploads = this.state.filesList.map((isUploaded) => {
            fileIndex++;
            let dbxOptions;
            if (this.props.uploadName === "Images") {
                dbxOptions = dbxImageOptions;
            } else if (this.props.uploadName === "Audio") {
                dbxOptions = dbxAudioOptions;
            } else if (this.props.uploadName === "Video") {
                dbxOptions = {};
            }
            return (<FileUpload key={fileIndex} fileName={fileIndex} dbxOptions={dbxOptions} uploadName={this.props.uploadName} appKey={dbx.app.appKey}/>);
        });

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
                                    onChange={this.handleSubpage.bind(this)}
                                    value="make subpage"
                                />
                            }
                            label="Make Subpage"
                        />
                    </FormGroup>
                    <h4>
                        {fileUploads}
                    </h4>
                    <Button variant="contained" color="primary" className={classes.button}
                            onClick={this.addFileUpload.bind(this)}>
                        + ADD MORE
                    </Button>
                </Paper>
            </div>
        );
    }

}

export default withStyles(styles)(MediaUpload);

