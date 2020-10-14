import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/styles';
import { TextField, SnackbarContent, CircularProgress } from '@material-ui/core';
import { Link, Paper, Typography, Switch, FormControlLabel } from '@material-ui/core';
import { useSnackbar } from 'notistack';

import { useDelayedUpdate } from './firebase';
import { Editor, getTinymce } from '@tinymce/tinymce-react';
import RichTextEditor from './RichTextEditor';
import { FormLabel } from '@material-ui/core';

const styles = theme => ({
    root: {
        textAlign: 'left',
        display: 'flex',
        flexDirection: "column",
        gap: 40,
        width: '90%',
        marginLeft: '5%',
        color: 'white',
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
    }
});

const EditPageView = (props) => {
    const classes = props.classes;
    const pageUpstream = props.page;

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

    const handleToggleChange = (value, key) => {

    }

    const handlePrefixChange = (value) => {

    }
    
    useEffect( () => {
        if(isUpdating) {
            enqueueSnackbar('Saving changes...', {variant: 'info', persist: true});
        }
    }, [isUpdating, enqueueSnackbar]);

    return (
        <div className={classes.root}>
            <Typography variant="h6">Page Name/Title</Typography>
            <TextField
                className={classes.field}
                variant="filled"
                placeholder="Default: Biography of"
                value={page.name}
                onChange={evt => handleTextChange(evt, 'name')}/>
            <Typography variant="h6">Bio Title Prefix</Typography>
            <FormControlLabel
                color={"primary"}
                label={"No Prefix"}
                labelPlacement="right"
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
            <TextField
                className={page.bioPrefix === 'DISABLED' ? classes.disabledField : classes.field}
                disabled={page.bioPrefix === 'DISABLED'}
                variant="filled"
                value={page.bioPrefix}
                onChange={evt => handleTextChange(evt, 'bioPrefix')}/>
            <Typography variant="h6">Biography</Typography>
            <RichTextEditor 
                className={classes.field}
                onEditorChange={(value) => handleRteChange(value, 'description')}
                value={page.description}/>
        </div>
    );
}

export default withStyles(styles)(EditPageView);