import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import FormGroup from "@material-ui/core/FormGroup";
import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';
import LinkOffIcon from '@material-ui/icons/LinkOff';
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Tooltip from '@material-ui/core/Tooltip';
import WarningIcon from '@material-ui/icons/Warning';

import fb from "./firebase";
import dbx from './dropbox.js';
import { CircularProgress, Grid, InputLabel } from '@material-ui/core';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    fab: {
        margin: theme.spacing(1),
    },
    fabImg: {
        width: '50px',
        height: '50px',
        borderRadius: '200px',
    },

});

class FileUpload extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fileDoc: undefined,
        };

        this.handleTextChange = event => {
            if (this.props.isPendingApproval) {
                window.alert("Please rescind your request for approval before making changes.");
                return false;
            }
            let fileDoc = this.state.fileDoc;
            if (this.props.fileType === 'Video' && event.target.id.indexOf('multiline') === -1)  {
                if (this.props.bio) {
                    fileDoc.bioUrl = event.target.value;
                } else {
                    fileDoc.url = event.target.value;
                }
            } else {
                fileDoc.caption = event.target.value;
            }
            fileDoc.optimized = false;
            this.setState({fileDoc: fileDoc});
        };

        this.handleLinkBlur = event => {
            if (this.props.fileType === 'Video') {
                let fileDoc = this.state.fileDoc;
                let url = event.target.value;
                if (!url.includes('youtu.be/')) { // Not a sharable link
                    if (url.includes('youtube.com/watch?'))  {
                        // ...but we may be able to fix it
                        // find the video id within the url
                        let regex = /\?v=([^&]*)([&$]*?)/gi;
                        let match = regex.exec(url);
                        let videoId = match[1];
                        fileDoc.url = "https://youtu.be/" + videoId;
                        this.setState({fileDoc: fileDoc});
                    }
                }
            } else {
                console.log("link blur handler called from non-video upload!");
            }
        };
    };


    handleDelete() {
        if (this.props.isPendingApproval) {
            window.alert("Please rescind your request for approval before making changes.");
            return false;
        }
        if(window.confirm("Are you sure you want to remove this item? This can not be undone!\n\n(This will not remove the file from dropbox or your computer)")) {
            if (this.props.bio) {
                let fileDoc = this.state.fileDoc;
                fileDoc.bioName = "";
                fileDoc.bioThumbnail = "";
                fileDoc.bioUrl = "";
                this.setState({fileDoc: fileDoc});
            } else {
                fb.base.removeDoc(this.props.fileDoc.ref);
            }
        }
    }

    onChooserSuccess(file) {
        let fileDoc = this.state.fileDoc;
        if (this.props.bio) {
            fileDoc['bioName'] = file[0].name || "";
            fileDoc['bioUrl'] = (file[0].link && file[0].link.replace('www.dropbox', 'dl.dropboxusercontent')) || "";
            fileDoc['bioThumbnail'] = (file[0].link && file[0].link.replace('www.dropbox', 'dl.dropboxusercontent')) || "";
        } else {
            fileDoc['name'] = file[0].name || "";
            fileDoc['url'] = (file[0].link && file[0].link.replace('www.dropbox', 'dl.dropboxusercontent')) || "";
            fileDoc['icon'] = file[0].icon || "";
            fileDoc['thumbnail'] = (file[0].link && file[0].link.replace('www.dropbox', 'dl.dropboxusercontent')) || "";
            fileDoc['optimized'] = false;
        }
        this.setState({fileDoc: fileDoc});
    }

    componentDidMount() {
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
        // tags are different in an image doc vs the bio photo in the contrib doc
        const thumbnail = (this.props.bio) ? 'bioThumbnail' : 'thumbnail';
        const url = (this.props.bio) ? 'bioUrl' : 'url';
        const icon = 'icon';
        const name = (this.props.bio) ? 'bioName' : 'name';
        const caption = 'caption'; // bio doesnt have a caption
        if(!doc) {
            return <div />;
        }
        const isVideo = (this.props.fileType === 'Video');
        let fileUploadIcon;
        if(doc['optimizing']) {
            fileUploadIcon = <CircularProgress color="primary" />;
        } else if(!doc[url]) {
            fileUploadIcon = <AddIcon />;
        } else if(doc[thumbnail] && doc[thumbnail].match(/.*(png|jpg|jpeg).*/gi)) {
            fileUploadIcon = <img className={classes.fabImg} alt="Select" src={doc[thumbnail]} />;
        } else {
            fileUploadIcon = <CheckIcon />;
        }

        return (
            <div className={classes.root}>
                    
                <FormGroup row id={(this.state.fileDoc && this.state.fileDoc[name]) || this.props.fileIndex}>
                    <Grid container spacing={3} justify="flex-start" alignItems="center">
                        {/* Video Link box (only for video) */}
                        <Grid item xs={5} style={{display: isVideo ? 'inline-block' : 'none'}}>
                            <TextField
                                id="standard-static"
                                label="Link"
                                style={{margin: 5, width: '100%'}}
                                defaultValue={(this.state.fileDoc && this.state.fileDoc[url]) || ""}
                                onChange={this.handleTextChange}
                                onBlur={this.handleLinkBlur}
                                margin="normal"
                                variant="filled"
                                placeholder={'Click SHARE on YouTube'}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        {/* File select FAB and filename text (only if not video) */}
                        <Grid item xs={1}  style={{display: !isVideo ? 'inline-block' : 'none'}}>
                            <Tooltip title={"Click to " + (doc[url] ? "change" : "select") + " file"}>
                                <Fab
                                    size="small"
                                    color="primary"
                                    style={doc[url] ? {backgroundColor: 'green'} : {}}
                                    aria-label="Upload"
                                    className={classes.fab}
                                    onClick={
                                        () => {
                                            if (this.props.isPendingApproval) {
                                                window.alert("Please rescind your request for approval before making changes.");
                                                return false;
                                            } else if (this.state.fileDoc) {
                                                dbx.onChoose(this.props.fileType, this.onChooserSuccess.bind(this));
                                            }
                                        }
                                    }>
                                    {fileUploadIcon}
                                </Fab>
                            </Tooltip>
                        </Grid>
                        {/* Filename text replace caption if bio */}
                        <Grid item xs={this.props.bio ? 9 : 4}  style={{display: !isVideo ? 'inline-block' : 'none'}}>
                            <Typography style={{overflowWrap: 'break-word', wordWrap: "break-word"}} variant={"body1"}>
                                <div style={{display: this.state.fileDoc && this.state.fileDoc['url'] && !this.state.fileDoc["optimized"] ? 'inline-block' : 'none'}}>
                                    <Tooltip title="Image not optimized, generate thumbnails below after filling in captions">
                                        <WarningIcon color="error"/>
                                    </Tooltip>
                                </div>
                                {(this.state.fileDoc && this.state.fileDoc[name]) || "Choose a file..."} 
                            </Typography>
                        </Grid>
                        {/* Caption for all except bio */}
                        {(this.props.bio) ? <div/> : 
                            <Grid item xs={5}>
                                <TextField
                                    id="standard-multiline-static"
                                    label="Caption"
                                    style={{margin: 5, width: "100%"}}
                                    multiline
                                    defaultValue={(this.state.fileDoc && this.state.fileDoc['caption']) || ""}
                                    onChange={this.handleTextChange}
                                    margin="normal"
                                    variant="filled"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                        }
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

