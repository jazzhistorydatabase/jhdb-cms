import React, { useState, useEffect } from 'react';
import {useHistory, useLocation, Route} from 'react-router-dom';

import { withStyles } from '@material-ui/styles';
import { Button, Grid, TextField, SnackbarContent, CircularProgress } from '@material-ui/core';
import { Link, Paper, Typography, Switch, FormControlLabel } from '@material-ui/core';
import { useSnackbar } from 'notistack';

import { useDelayedUpdate } from './firebase';
import { Editor, getTinymce } from '@tinymce/tinymce-react';
import RichTextEditor from './RichTextEditor';
import { FormLabel } from '@material-ui/core';
import { AssignmentLateRounded, EditRounded, FullscreenRounded, LibraryBooksRounded, PublishRounded, VisibilityRounded } from '@material-ui/icons';
import ToggleSwitch from './ToggleSwitch';
import FileInput from './FileInput';

const styles = theme => ({
    root: {
        textAlign: 'left',
        display: 'flex',
        flexDirection: "column",
        width: '90%',
        marginLeft: '5%',
        color: 'white',
    },
    button: {
        width: "100%",
    },
    field: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    disabledField: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        pointerEvents: 'none',
        opacity: 0.4
    },
    editSidebar: {
        backgroundColor: '#333333',
        position: 'sticky', 
        borderRadius: 5,
        padding: 10,
        margin: 15,
        top: 10,
        // height: 200,
        width: "90%"
    }
});

const EditPageView = (props) => {
    const classes = props.classes;
    const pageUpstream = props.page;

    const history = useHistory();
    const location = useLocation();

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    
    const onSuccess = () => {
        closeSnackbar();
        enqueueSnackbar('Save success!', {variant: 'success'});
    }
    
    const onError = () => {
        closeSnackbar();
        enqueueSnackbar('Error saving changes', {variant: 'error'});
    }
    
    const [page, updatePage, isUpdating] = useDelayedUpdate(pageUpstream, 3000, onSuccess, onError);
    
    useEffect( () => {
        if(isUpdating) {
            enqueueSnackbar('Saving changes...', {variant: 'info', persist: true});
        }
    }, [isUpdating]);

    const showPreview = location.pathname.includes("/preview");
    
    const handleTextChange = (evt, key) => {
        let upd = {};
        upd[key] = evt.target.value;
        updatePage(upd);
    }
    
    const handleRteChange = (value, key) => {
        let upd = {};
        upd[key] = value;
        updatePage(upd);
    }

    const handleToggleChange = (evt, key) => {
        let upd = {};
        upd[key] = evt.target.checked;
        updatePage(upd);
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={3} direction="row-reverse" alignItems="stretch">
                <Grid item xs={12} md={2}>
                    <div className={classes.editSidebar}>
                        <Grid container 
                              className={isUpdating ? classes.disabledField : ""}
                              spacing={2} 
                              direction="column" 
                              alignItems="stretch">
                            <Grid item xs={12}>
                                <Button onClick={() => history.push('/pages')} 
                                        variant="contained" 
                                        color={"primary"}
                                        startIcon={<LibraryBooksRounded />}
                                        className={classes.button}>
                                    Back to My Pages
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                {showPreview && 
                                    <Button onClick={() => history.push(`/pages/${page.ref.id}/`)} 
                                            variant="contained"
                                            color={"primary"}
                                            style={{backgroundColor: 'orange'}}
                                            startIcon={<EditRounded />}
                                            className={classes.button}>
                                        Edit
                                    </Button>
                                }
                                {!showPreview &&
                                    <Button onClick={() => history.push(`/pages/${page.ref.id}/preview`)} 
                                            variant="contained"
                                            color={"primary"}
                                            style={{backgroundColor: 'green'}}
                                            startIcon={<VisibilityRounded />}
                                            className={classes.button}>
                                        Preview
                                    </Button>
                                }
                            </Grid>
                            <Grid item xs={12}>
                                <ToggleSwitch labelText="Review needed"
                                            labelIcon={<AssignmentLateRounded />}
                                            checked={page.pendingReview}
                                            onChange={evt => {
                                                if(evt.target.checked && 
                                                        window.confirm("Submit for review?\nYou won't be able to edit the page while it is pending review")) {
                                                    pageUpstream.ref.update({pendingReview: true});
                                                } else if (!evt.target.checked && window.confirm("Rescind Review Request?\nThe page will be editable again and will remain unpublished.")) {
                                                    pageUpstream.ref.update({pendingReview: false});
                                                }
                                            }} />
                            </Grid>
                            <Grid item xs={12}>
                                <ToggleSwitch labelText="Publish"
                                            labelIcon={<PublishRounded />}
                                            disabled={props.user && !props.user.admin}
                                            checked={props.published}
                                            onChange={evt => handleToggleChange(evt, 'pendingReview')} />
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
                {showPreview && 
                    <Grid item xs={12} md={10}>
                        <Button href={"/preview/"+page.ref.id}
                                target="#"
                                variant="contained"
                                color={"primary"}
                                startIcon={<FullscreenRounded />}
                                className={classes.button}>
                            Fullscreen Preview (New Tab)
                        </Button>
                        <br/>
                        <br/>
                        <iframe title="Preview" 
                                style={{
                                    height: 800,
                                    width: '100%',
                                }}
                                src={"/preview/"+page.ref.id} />
                    </Grid>
                }
                {!showPreview &&
                    <Grid item xs={12} md={10} className={page.pendingReview ? classes.disabledField : ""}>
                        {page.pendingReview && 
                            <Typography variant="h5" style={{color: 'orange'}}>
                                Pending Review - Editing is Disabled
                            </Typography>
                        }
                        <Typography variant="h6">Page Name/Title</Typography>
                        <TextField
                            className={classes.field}
                            variant="filled"
                            value={page.name}
                            onChange={evt => handleTextChange(evt, 'name')}/>
                        <Typography variant="h6">Submitted By (optional)</Typography>
                        <TextField
                            className={classes.field}
                            variant="filled"
                            value={page.submitter}
                            onChange={evt => handleTextChange(evt, 'submitter')}/>
                        <Typography variant="h6">Bio Title Prefix</Typography>
                        <FormControlLabel
                            color={"primary"}
                            label={"No Prefix"}
                            control={
                            <Switch
                                checked={(page.bioPrefix === 'DISABLED')}
                                name="noBioPrefixSwitch"
                                color="secondary"
                                onChange={(evt) => {
                                    let e = evt;
                                    evt.target.value = evt.target.checked ? 'DISABLED' : '';
                                    handleTextChange(e, 'bioPrefix')();
                                }}
                            /> }
                        />
                        <br />
                        <TextField
                            className={page.bioPrefix === 'DISABLED' ? classes.disabledField : classes.field}
                            disabled={page.bioPrefix === 'DISABLED'}
                            placeholder="Default: Biography of"
                            variant="filled"
                            value={page.bioPrefix}
                            onChange={evt => handleTextChange(evt, 'bioPrefix')}/>
                        <Typography variant="h6">Bio Photo</Typography>
                        <FileInput
                            fileDoc={pageUpstream}
                            type="bio" />
                        <Typography variant="h6">Biography</Typography>
                        <RichTextEditor 
                            className={classes.field}
                            onEditorChange={(value) => handleRteChange(value, 'description')}
                            value={page.description}/>
                    </Grid>
                }
            </Grid>
        </div>
    );
}

export default withStyles(styles)(EditPageView);