import React, { useEffect } from 'react';
import {withStyles} from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';

import { CircularProgress, Paper } from '@material-ui/core';
import FormGroup from "@material-ui/core/FormGroup";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';
import LinkOffIcon from '@material-ui/icons/LinkOff';
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Tooltip from '@material-ui/core/Tooltip';
import WarningIcon from '@material-ui/icons/Warning';
import Grid from '@material-ui/core/Grid'

import dbx from './dropbox.js';
import { useDelayedUpdate } from './firebase';
import { AddRounded, AudiotrackRounded, MovieRounded, WarningRounded } from '@material-ui/icons';
import RichTextEditor from './RichTextEditor.js';

const styles = theme => ({
    root: {
        // flexGrow: 1,
        backgroundColor: "#4B4B4B",
        padding: 2, 
    },
    button: {
        height: 50,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    fab: {
        // margin: theme.spacing(1),
        borderRadius: 10,
    },
    fabImg: {
        width: '40px',
        height: '40px',
        // marginTop: '2px',
        // borderRadius: 10,
        backgroundColor: 'white',
    },
    field: {
        width: '100%',
        height: 60,
        top: 2.5
    }
});

const processFileLink = (link, reverse=false) => {
    if(reverse) {
        return link.replace('dl.dropboxusercontent', 'www.dropbox');
    }
    return link.replace('www.dropbox', 'dl.dropboxusercontent').replace(' ', '%20');
}

const processVideoLink = (url) => {
    if (!url.includes('youtu.be/')) { // Not a sharable link
        if (url.includes('youtube.com/watch?'))  {
            // ...but we may be able to fix it
            // find the video id within the url
            const regex = /\[&?]v=([^&]*)([&$]*?)/gi;
            let match = regex.exec(url);
            let videoId = match[1];
            return "https://youtu.be/" + videoId;
        }
    }
    return url;
};

const FileInput = (props) => {

    const classes = props.classes;
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const onSuccess = () => {
        closeSnackbar();
        // enqueueSnackbar('Save success!', {variant: 'success'});
    }
    
    const onError = () => {
        closeSnackbar();
        enqueueSnackbar('Error saving changes', {variant: 'error'});
    }

    const [doc, updateDoc] = useDelayedUpdate(props.fileDoc, 3000, onSuccess, onError);

    const update = (data) => {
        props.updatePage({});
        updateDoc(data);
    }
    
    const onDbxChoose = (file) => {
        let fileDoc = {};
        if (props.type === "bio") {
            fileDoc['bioName'] = file[0].name || "";
            fileDoc['bioUrl'] = (file[0].link && processFileLink(file[0].link)) || "";
            fileDoc['bioThumbnail'] = (file[0].link && processFileLink(file[0].link)) || "";
        } else {
            fileDoc['name'] = file[0].name || "";
            fileDoc['url'] = (file[0].link && processFileLink(file[0].link)) || "";
            fileDoc['icon'] = file[0].icon || "";
            fileDoc['thumbnail'] = (file[0].link && processFileLink(file[0].link)) || "";
            fileDoc['optimized'] = false;
        }
        doc.ref.update(fileDoc).then(() => {
            enqueueSnackbar('Updated file!', {variant: 'success'});
        }).catch(err => {
            enqueueSnackbar('Error updating file', {variant: 'error'});
            console.error(err);
        });
    }

    const fileType = props.type === 'bio' ? 'Images' : props.type;
    const urlKey = props.type === 'bio' ? 'bioUrl' : 'url';
    const thumbnailKey = props.type === 'bio' ? 'bioThumbnail' : 'thumbnail';
    const nameKey = props.type === 'bio' ? 'bioName' : 'name';

    let fileUploadIcon, tooltipText;
        if(doc['optimizing']) {
            fileUploadIcon = <CircularProgress color="secondary" />;
            tooltipText = "Optimizing image, please wait...";
        } else if(!doc[urlKey]) {
            fileUploadIcon = <AddRounded />;
            tooltipText = "Click to select file"
        } else if(!doc['optimized'] && props.type === 'Images') {// TODO Bio optimization
            fileUploadIcon = <WarningRounded />;
            tooltipText = "Image not optimized, generate optimized images below after filling in captions. Click to change file"
        } else if(doc[thumbnailKey] && doc[thumbnailKey].match(/.*(png|jpg|jpeg).*/gi)) {
            fileUploadIcon = <img className={classes.fabImg} alt="Select" src={doc[thumbnailKey]} />;
            tooltipText = "Click to change file"
        }else if (props.type === 'Audio') {
            fileUploadIcon = <AudiotrackRounded />
            tooltipText = "Click to change file"
        }else if (props.type === 'Video') {
            fileUploadIcon = <MovieRounded />
            tooltipText = "Click to change file"
        } else {
            fileUploadIcon = <CheckIcon />;
            tooltipText = "Click to change file"
        }

    const manualEntry = props.manualEntry;

    return (
        <Paper className={classes.root}>
            <Grid container spacing={2} direction="row" alignItems={"center"}>
                {manualEntry && 
                    <Grid item xs={6} sm={6}>
                        <Tooltip title={'Pages with linked content not licensed to JHDB can not be published. Please see info tab for more information.'}>
                            <TextField
                                className={classes.field}
                                variant="filled"
                                placeholder={props.type === 'Video' ? "Youtube Link (Use Share Button)" : "JHDB Website Links Only!"}
                                value={doc.url}
                                onChange={evt => update({url: processVideoLink(evt.target.value)})} />
                        </Tooltip>
                    </Grid>
                }
                {!manualEntry &&
                    <Grid item xs={6} sm={2}>
                        <Tooltip title={tooltipText}>
                            <Button variant="contained"
                                    className={classes.button}
                                    color="primary"
                                    onClick={() => dbx.onChoose(fileType, onDbxChoose)}
                                    startIcon={fileUploadIcon}>
                                {doc[urlKey] ? "Change File" : "Choose File"}
                            </Button>
                        </Tooltip>
                    </Grid>
                }
                {!manualEntry &&
                    <Grid item xs={6} sm={4}>
                        <a target="#" href={processFileLink(doc['url'] || "", true)}>
                            <Typography style={{overflowWrap: 'break-word', wordWrap: "break-word", color: 'lightblue'}} 
                                        variant={"body1"}>
                                    {doc[nameKey]}
                            </Typography>
                        </a>
                    </Grid>
                }
                <Grid item xs={10} sm={5}>
                    {props.type !== 'bio' &&
                        <RichTextEditor
                        className={classes.field}
                        height={30}
                        placeholder={"Caption"}
                        onEditorChange={(value) => update({caption: value, optimized: false})}
                        value={doc.caption}/>
                    }
                </Grid>
                <Grid item xs={2} sm={1}>
                    <Tooltip title="Unlink">
                        <Fab
                            size="small"
                            color="primary"
                            aria-label="Unlink"
                            className={classes.fab}
                            onClick={() => {
                                if(props.type !== 'bio' && window.confirm("Are you sure you want to remove this item? This can not be undone!\n\n(This will not remove the file from dropbox or your computer)")) {
                                    doc.ref.delete();
                                } else {
                                    onDbxChoose([{name: '', url: '', icon: '', thumbnail: ''}]);
                                }
                            }}>
                                <LinkOffIcon />
                        </Fab>
                    </Tooltip>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default withStyles(styles)(FileInput);
