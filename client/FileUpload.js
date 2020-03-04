import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import './App.css';
import FormGroup from "@material-ui/core/FormGroup";
import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';
import LinkOffIcon from '@material-ui/icons/LinkOff';
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Tooltip from '@material-ui/core/Tooltip';

import fb from "./firebase";
import dbx from './dropbox.js';
import { Grid, InputLabel } from '@material-ui/core';

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
    fabImg: {
        width: '50px',
        height: '50px',
        borderRadius: '100px',
    },

});

class FileUpload extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fileDoc: undefined,
        };

        this.handleTextChange = event => {
            let fileDoc = this.state.fileDoc;
            if (this.props.fileType === 'Video' && event.target.id.indexOf('multiline') === -1)  {
                fileDoc.url = event.target.value;
            } else {
                fileDoc.caption = event.target.value;
            }
            this.setState({fileDoc: fileDoc});
        };
    };


    handleDelete() {
        if(window.confirm("Are you sure you want to remove this item? This can not be undone!\n\n(This will not remove the file from dropbox or your computer)")) {
            fb.base.removeDoc(this.props.fileDoc.ref);
        }
    }

    onChooserSuccess(file) {
        let fileDoc = this.state.fileDoc;
        fileDoc['name'] = file[0].name || "";
        fileDoc['url'] = (file[0].link && file[0].link.replace('www.dropbox', 'dl.dropboxusercontent')) || "";
        fileDoc['icon'] = file[0].icon || "";
        fileDoc['thumbnail'] = (file[0].link && file[0].link.replace('www.dropbox', 'dl.dropboxusercontent')) || "";

        this.setState({fileDoc: fileDoc});
    }

    componentWillMount() {
        if(this.props && this.props.fileDoc) {
            fb.base.syncDoc(this.props.fileDoc.ref, {
                context: this,
                state: 'fileDoc',
                withRefs: true
            });
        }
    }

    render() {
        const classes = this.props.classes;
        const doc = this.state.fileDoc;
        if(!doc) {
            return <div />;
        }
        const isVideo = (this.props.fileType === 'Video');
        let fileUploadIcon = doc.url ?
                ((doc.thumbnail || doc.icon) ?
                    (<img className={classes.fabImg} alt="Upload preview" src={(doc.thumbnail || doc.icon)} />) :
                    (<CheckIcon />)):
                (<AddIcon/>);

        let fileUploadComponent;
        if (!isVideo) {
            fileUploadComponent =
                <Tooltip title={"Click to " + (doc.url ? "change" : "select") + " file"}>
                    <Fab
                        size="small"
                        color={doc.url ? 'none' : 'primary'}
                        aria-label="Upload"
                        className={classes.fab}
                        onClick={
                            () => {
                                if (this.state.fileDoc) {
                                    dbx.onChoose(this.props.fileType, this.onChooserSuccess.bind(this));
                                }
                            }
                        }>
                        {fileUploadIcon}
                    </Fab>
                </Tooltip>
        } else {
            fileUploadComponent =
                <TextField
                    id="standard-static"
                    label="Link"
                    style={{margin: 5}}
                    value={(this.state.fileDoc && this.state.fileDoc.url) || ""}
                    onChange={this.handleTextChange}
                    margin="normal"
                    variant="filled"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
        }

        return (
            <div className={classes.root}>
                    
                <FormGroup row id={(this.state.fileDoc && this.state.fileDoc.name) || this.props.fileIndex}>
                    <Grid container spacing={3} justify="left" alignItems="center" row>
                        <Grid item xs={isVideo ? 5 : 1}>
                            {fileUploadComponent}
                        </Grid>
                        <Grid item style={{display: isVideo ? 'none' : 'block'}} xs={isVideo ? 0 : 4}>
                            <Typography style={{overflowWrap: 'break-word', wordWrap: "break-word"}} variant={"body1"}>
                                {(this.state.fileDoc && this.state.fileDoc.name) || (this.props && this.props.fileIndex)} 
                            </Typography>
                        </Grid>
                        <Grid item xs={5}>
                            <TextField
                                id="standard-multiline-static"
                                label="Caption"
                                style={{margin: 5, width: "100%"}}
                                multiline
                                value={(this.state.fileDoc && this.state.fileDoc.caption) || ""}
                                onChange={this.handleTextChange}
                                margin="normal"
                                variant="filled"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                />
                        </Grid>
                        <Grid item xs={2}>
                            <Tooltip title="Unlink file from collection (will not delete original file)">
                                <Fab size="small"
                                    aria-label="Delete"
                                    onClick={this.handleDelete.bind(this)}
                                    className={classes.fab}>
                                    <LinkOffIcon />
                                </Fab>
                            </Tooltip>
                         </Grid>
                    </Grid>
                </FormGroup>

            </div>
        );
    }

}

export default withStyles(styles)(FileUpload);

