import React from 'react';
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
import { AddRounded, WarningRounded } from '@material-ui/icons';

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: "#4B4B4B",
        padding: 2, 
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
        borderRadius: 3,
        backgroundColor: 'white',
    },
});

const FileInput = (props) => {

    const classes = props.classes;
    const doc = props.fileDoc;
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const onDbxChoose = (file) => {
        let fileDoc = {};
        if (props.type === "bio") {
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
        doc.ref.update(fileDoc).then(() => {
            enqueueSnackbar('Save success!', {variant: 'success'});
        }).catch(err => {
            enqueueSnackbar('Error saving changes', {variant: 'error'});
            console.error(err);
        });
    }

    const fileType = props.type === 'bio' ? 'Images' : props.type;
    const urlKey = props.type === 'bio' ? 'bioUrl' : 'url';
    const thumbnailKey = props.type === 'bio' ? 'bioThumbnail' : 'thumbnail';
    const nameKey = props.type === 'bio' ? 'bioName' : 'name';

    let fileUploadIcon, tooltipText;
        if(doc['optimizing']) {
            fileUploadIcon = <CircularProgress color="primary" />;
            tooltipText = "Optimizing image, please wait...";
        } else if(!doc[urlKey]) {
            fileUploadIcon = <AddRounded />;
            tooltipText = "Click to select file"
        } else if(!doc.optimized && !props.type === 'bio') {// TODO Bio optimization
            fileUploadIcon = <WarningRounded />;
            tooltipText = "Image not optimized, generate optimized images below after filling in captions. Click to change file"
        } else if(doc[thumbnailKey] && doc[thumbnailKey].match(/.*(png|jpg|jpeg).*/gi)) {
            fileUploadIcon = <img className={classes.fabImg} alt="Select" src={doc[thumbnailKey]} />;
            tooltipText = "Click to change file"
        } else {
            fileUploadIcon = <CheckIcon />;
        }

    return (
        <Paper className={classes.root}>
            <Grid container spacing={2} direction="row" alignItems={"center"}>
                <Grid item xs={3}>
                    <Tooltip title={tooltipText}>
                        <Fab
                            size="small"
                            color="primary"
                            // style={doc[url] ? {backgroundColor: (isUnoptimizedImage ? 'red' : 'green')} : {}}
                            aria-label="Upload"
                            className={classes.fab}
                            onClick={() => dbx.onChoose(fileType, onDbxChoose)}>
                                {fileUploadIcon}
                        </Fab>
                    </Tooltip>
                </Grid>
                <Grid item xs={6}>
                    {doc[nameKey]}
                </Grid>
                <Grid item xs={3}>
                    <Fab
                        size="small"
                        color="primary"
                        aria-label="Unlink"
                        className={classes.fab}
                        onClick={() => onDbxChoose([{name: '', url: '', icon: '', thumbnail: ''}])}>
                            <LinkOffIcon />
                    </Fab>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default withStyles(styles)(FileInput);
