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
import {Grid} from '@material-ui/core';

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
        borderRadius: '100px',
    },

});

class FileUpload extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fileDoc: this.props.fileDoc,
        };

        this.handleDelete = this.handleDelete.bind(this);

        this.handleTextChange = (event) => {
            if (this.props.isPendingApproval) {
                window.alert("Please rescind your request for approval before making changes.");
                return;
            }
            let fileDoc = this.state.fileDoc;
            if (this.props.fileType === 'Video' && event.target.id.indexOf('multiline') === -1)  {
                    fileDoc.url = event.target.value;
            } else {
                fileDoc.caption = event.target.value;
            }
                // if (this.props.bio) {
                //     fileDoc.bioUrl = event.target.value;
                // } else {
                // }
            this.setState({'fileDoc': fileDoc}).then(() => {
                console.log(this.state);
                let update = {};
                update[this.props.fileDoc.ref] = fileDoc;
                this.props.onChange({}, update);
            });
        };

        this.getFileUpload = (caption) => {
            return (this.props.bio) ?
                <div/>
                :
                <Grid item xs={5}>
                    <TextField
                        id="standard-multiline-static"
                        label="Caption"
                        style={{margin: 5, width: "100%"}}
                        multiline
                        value={(this.state.fileDoc && this.state.fileDoc['caption']) || ""}
                        onChange={this.handleTextChange}
                        margin="normal"
                        variant="filled"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
        };

    };



    handleLinkBlur(event) {
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
                    this.setState({fileDoc: fileDoc}).then(() => {
                        let update = {};
                        update[this.props.fileDoc.ref] = fileDoc;
                        this.props.onChange({}, update);
                    });
                }
            }
        } else {
            console.log("link blur handler called from non-video upload!");
        }
    };

    handleDelete() {
        if (this.props.isPendingApproval) {
            window.alert("Please rescind your request for approval before making changes.");
            return;
        }
        if(window.confirm("Are you sure you want to remove this item? This can not be undone!\n\n(This will not remove the file from dropbox or your computer)")) {
            if (this.props.bio) {
                let fileDoc = this.state.fileDoc;
                fileDoc.bioName = "";
                fileDoc.bioThumbnail = "";
                fileDoc.bioUrl = "";
                this.setState({fileDoc: fileDoc});
                this.props.onChange({
                    bioName: "",
                    bioThumbnail: "",
                    bioUrl: ""
                });

            } else {
                fb.db.doc(this.props.fileDoc.ref.path).delete().catch(() => {
                    window.alert("Error deleting entry");
                });
            }
        }
    }

    onChooserSuccess(file) {
        let fileDoc = this.state.fileDoc;
        if (this.props.bio) {
            fileDoc['bioName'] = file[0].name || "";
            fileDoc['bioUrl'] = (file[0].link && file[0].link.replace('www.dropbox', 'dl.dropboxusercontent')) || "";
            fileDoc['bioThumbnail'] = (file[0].link && file[0].link.replace('www.dropbox', 'dl.dropboxusercontent')) || "";
            this.setState({fileDoc: fileDoc});
            this.props.onChange({
                bioName: fileDoc.bioName,
                bioUrl: fileDoc.bioUrl,
                bioThumbnail: fileDoc.bioThumbnail
            });
        } else {
            fileDoc['name'] = file[0].name || "";
            fileDoc['url'] = (file[0].link && file[0].link.replace('www.dropbox', 'dl.dropboxusercontent')) || "";
            fileDoc['icon'] = file[0].icon || "";
            fileDoc['thumbnail'] = (file[0].link && file[0].link.replace('www.dropbox', 'dl.dropboxusercontent')) || "";

            this.setState({fileDoc: fileDoc});
            let update = {};
            update[this.props.fileDoc.ref] = fileDoc;
            this.props.onChange({}, update);
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

        if(!doc) {
            return <div />;
        }
        const isVideo = (this.props.fileType === 'Video');
        let fileUploadIcon = doc[url] ?
                ((doc[thumbnail] || doc[icon]) ?
                    (<img className={classes.fabImg} alt="Upload preview" src={(doc[thumbnail] || doc[icon])} />) :
                    (<CheckIcon />)):
                (<AddIcon/>);

        let fileUploadComponent;
        if (!isVideo) {
            fileUploadComponent =
                <Tooltip title={"Click to " + (doc[url] ? "change" : "select") + " file"}>
                    <Fab
                        size="small"
                        color="primary"
                        aria-label="Upload"
                        className={classes.fab}
                        onClick={
                            () => {
                                if (this.props.isPendingApproval) {
                                    window.alert("Please rescind your request for approval before making changes.");
                                } else if (this.state.fileDoc) {
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
                    label="Link"
                    style={{margin: 5}}
                    value={(this.state.fileDoc && this.state.fileDoc[url]) || ""}
                    onChange={this.handleTextChange.bind(this)}
                    onBlur={this.handleLinkBlur.bind(this)}
                    margin="normal"
                    variant="filled"
                    placeholder={'Click SHARE on YouTube'}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
        }

        return (
            <div className={classes.root}>
                    
                <FormGroup row id={(this.state.fileDoc && this.state.fileDoc[name]) || this.props.fileIndex}>
                    <Grid container spacing={3} justify="flex-start" alignItems="center">
                        <Grid item xs={isVideo ? 5 : 1}>
                            {fileUploadComponent}
                        </Grid>
                        <Grid item style={{display: isVideo ? 'none' : 'block'}} xs={((this.props.bio) ? 9 : 4)}>
                            <Typography style={{overflowWrap: 'break-word', wordWrap: "break-word"}} variant={"body1"}>
                                {(this.state.fileDoc && this.state.fileDoc[name]) || "Choose a file..."} 
                            </Typography>
                        </Grid>
                        {this.getFileUpload()}
                        <Grid item xs={2}>
                            <Tooltip title="Unlink file from collection (will not delete original file)">
                                <Fab size="small"
                                    aria-label="Delete"
                                    onClick={this.handleDelete}
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

