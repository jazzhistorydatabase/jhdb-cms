import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Paper from "@material-ui/core/Paper";
import { withStyles } from '@material-ui/core/styles';
import Switch from "@material-ui/core/Switch";
import { randomBytes } from 'crypto';
import React, { Component } from 'react';
import './App.css';
import FileUpload from "./FileUpload";
import fb from "./firebase";
import dbx from './dropbox.js';



const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    nameStyle: {
        margin: theme.spacing(2),
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    fab: {
        margin: theme.spacing(1),
    },
    cardColor: {
        backgroundColor: '#fce4ec',
    },
    mediaUploadTitle: {
        width: '10vw',
        textAlign: 'left',
    }


});

class MediaUpload extends Component { 
    constructor(props) {
        super(props);
        this.state = {
            makeSubpage: '',
            contribText: '',
            collection: [],
            add: '',
        };
    }

    handleSubpage(event) {
        if (this.props.isPendingApproval) {
            window.alert("Please rescind your request for approval before making changes.");
            return;
        }
        let newState =  {};
        switch(this.props && this.props.uploadName) {
            case "Images":
                newState["imagesSubpage"] = event.target.checked;
                break;
            case "Audio":
                newState["audioSubpage"] = event.target.checked;
                break;
            case "Video":
            default:
                newState["videoSubpage"] = event.target.checked;
                break;
        }
        this.props.onChange(newState);
    };

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
        let fileUploads = this.state.collection.map((fileDoc) => {
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
                <Paper className={classes.paper} elevation={3} square={false} classes={{root: classes.cardColor}}>
                    <FormGroup row>
                        <h2 className={classes.mediaUploadTitle}>
                            {this.props.uploadName || ""}
                        </h2>
                        <FormControlLabel
                            control={
                                <Switch disabled
                                    checked={(this.props && this.props.isSubpage) || false}
                                    onChange={this.handleSubpage.bind(this)}
                                />
                            }
                            label="Make Subpage (Coming Soon)"
                        />
                    </FormGroup>
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

