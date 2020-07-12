import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Paper from "@material-ui/core/Paper";
import { withStyles } from '@material-ui/core/styles';
import Switch from "@material-ui/core/Switch";
import { randomBytes } from 'crypto';
import React, { Component } from 'react';
import FileUpload from "./FileUpload";
import fb from "./firebase";
import dbx from './dropbox.js';
import { InputLabel } from '@material-ui/core';
import { TextField } from '@material-ui/core';



const styles = theme => ({
    paper: {
        padding: theme.spacing(2),
    },
});

class MediaUpload extends Component { 
    constructor(props) {
        super(props);
        this.state = {
            contribText: '',
            collection: [],
            add: '',
        };
    }


    addFileUpload(event) {
        if (this.props.isPendingApproval) {
            window.alert("Please rescind your request for approval before making changes.");
            return;
        }
        let lst = this.state.collection;
        let maxIndex = 0;
        lst.forEach( (e) => {
            if(e.index > maxIndex) maxIndex = e.index;
        })
        fb.base.addToCollection(this.props.collection, {
            name: "",
            url: "",
            caption: "",
            icon: "",
            thumbnail: "",
            index: maxIndex + 1,
        });
    };

    onChooserSuccess(files) {
        // Get highest file index
        let lst = this.state.collection;
        let maxIndex = 0;
        lst.forEach( (e) => {
            if(e.index > maxIndex) maxIndex = e.index;
        })
        // create and push each doc
        files.forEach( file => {
            let fileDoc = {};
            fileDoc['name'] = file.name || "";
            fileDoc['url'] = (file.link && file.link.replace('www.dropbox', 'dl.dropboxusercontent')) || "";
            fileDoc['caption'] = "";
            fileDoc['icon'] = file.icon || "";
            fileDoc['thumbnail'] = (file.link && file.link.replace('www.dropbox', 'dl.dropboxusercontent')) || "";
            fileDoc['index'] = ++maxIndex;
            fb.base.addToCollection(this.props.collection, fileDoc);
        });
    }

    componentDidMount() {
        if(this.props && this.props.collection) {
            fb.base.bindCollection(this.props.collection, {
                context: this,
                state: 'collection',
                withRefs: true
            });
        }
    }

    render() {
        const classes = this.props.classes;
        let fileUploads = this.state.collection;
        fileUploads.sort((a, b) => {
            if (!a.index) return -1;
            if (!b.index) return 1;
            return a.index - b.index;
        });
        fileUploads = fileUploads.map((fileDoc) => {
            return (
                <FileUpload key={fileDoc.index || fileDoc.name || randomBytes(2)}
                            fileType={this.props.uploadName}
                            fileIndex={fileDoc.index}
                            fileDoc={fileDoc}
                            isPendingApproval={this.props.isPendingApproval}
                />);
        });

        return (
            <div className={classes.root}>
                <br/>
                <Paper className={classes.paper} elevation={3} square={false}>
                    <FormGroup row>
                        <h2 className={classes.mediaUploadTitle}>
                            {this.props.uploadName || ""}
                        </h2>
                    </FormGroup><br/>
                    <InputLabel>Section Title</InputLabel>
                    <TextField
                                variant="filled"
                                className={classes.textField}
                                defaultValue={this.props.sectionTitle || ""}
                                onChange={this.props.onSectionTitleChange}
                                margin="normal"
                                placeholder={"Default: " + (this.props.uploadName || "")}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            /><br/><br/>
                    <Button variant="contained" color="primary" className={classes.button}
                            onClick={
                                () => {
                                    if (this.props.isPendingApproval) {
                                        window.alert("Please rescind your request for approval before making changes.");
                                    } else {
                                        dbx.onChooseMulti(this.props.uploadName, this.onChooserSuccess.bind(this));
                                    }
                                }
                            }>
                        ++ Bulk Add
                    </Button>
                    <h4>
                        {fileUploads}
                    </h4>
                    <Button variant="contained" color="primary" className={classes.button}
                            onClick={this.addFileUpload.bind(this)}>
                        + ADD ONE
                    </Button>
                    <br/>
                    <br/>
                </Paper>
            </div>
        );
    }

}

export default withStyles(styles)(MediaUpload);

