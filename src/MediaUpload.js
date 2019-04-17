import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import './App.css';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Switch from "@material-ui/core/Switch";
import Paper from "@material-ui/core/Paper";
import FileUpload from "./FileUpload";
import Button from "@material-ui/core/Button";
import fb from "./firebase";

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
        console.log("Callback: "+event.target.checked);
        let newState =  {};
        switch(this.props && this.props.uploadName) {
            case "Images":
                newState["imagesSubpage"] = event.target.checked;
                break;
            case "Audio":
                newState["audioSubpage"] = event.target.checked;
                break;
            case "Video":
                break;
            default:
                newState["videoSubpage"] = event.target.checked;
                break;
        }
        this.props.onChange(newState);
    };

    addFileUpload(event) {
        let lst = this.state.collection;
        fb.base.addToCollection(this.props.collection, {
            name: "",
            url: "",
            caption: "",
            icon: "",
            thumbnail: "",
        });
    };

    componentWillMount() {
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
        let fileIndex = 0;
        let fileUploads = this.state.collection.map((fileDoc) => {
            fileIndex++;
            return (
                <FileUpload key={fileIndex}
                            fileType={this.props.uploadName}
                            fileIndex={fileIndex}
                            fileDoc={fileDoc}
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
                                <Switch
                                    checked={(this.props && this.props.isSubpage) || false}
                                    onChange={this.handleSubpage.bind(this)}
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
                    <br/>
                    <br/>
                </Paper>
            </div>
        );
    }

}

export default withStyles(styles)(MediaUpload);

