import React, { useState, useEffect } from 'react';
import { TextField, SnackbarContent, CircularProgress } from '@material-ui/core';
import { Link, Paper, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack';

import { useDelayedUpdate } from './firebase';
import { Editor, getTinymce } from '@tinymce/tinymce-react';
import RichTextEditor from './RichTextEditor';


const EditPageView = (props) => {
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
    
    const handleChange = (evt, key) => {
        let upd = {};
        upd[key] = evt.target.value;
        updatePage(upd);
    }
    
    const handleRteChange = (value, key) => {
        let upd = {};
        upd[key] = value;
        updatePage(upd);
    }
    
   
    
    useEffect( () => {
        if(isUpdating) {
            enqueueSnackbar('Saving changes...', {variant: 'info', persist: true});
        }
    }, [isUpdating, enqueueSnackbar]);

    return (
        <div>
            <TextField
                variant="outlined"
                label="Name"
                value={page.name}
                onChange={evt => handleChange(evt, 'name')}/>
            
            <TextField
                variant="outlined"
                label="Description"
                value={page.description}
                onChange={(evt) => handleChange(evt, 'description')}/>

            <RichTextEditor 
                onEditorChange={(value) => handleRteChange(value, 'description')}
                value={page.description}/>
            <RichTextEditor 
                onEditorChange={(value) => handleRteChange(value, 'name')}
                value={page.name}/>
        </div>
    );
}

export default EditPageView;