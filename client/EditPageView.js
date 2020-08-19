import React, { useState, useEffect } from 'react';
import { TextField, SnackbarContent } from '@material-ui/core';
import { Link, Paper, Typography } from '@material-ui/core';

import { useDelayedUpdate } from './firebase';
import { Snackbar } from '@material-ui/core';

const EditPageView = (props) => {
    const pageUpstream = props.page;
    const [message, setMessage] = useState("");

    const [page, updatePage, isUpdating, updateSuccess, updateError] = useDelayedUpdate(pageUpstream, 3000);

    useEffect( () => {
        if (updateError) {
            setTimeout(() => {
                console.log("Update err");
                setMessage("Error saving changes");
            }, 10);
        } else if(updateSuccess) {
            setTimeout(() => {
                console.log("Update succ");
                setMessage(`Updated ${updateSuccess} props`);
            }, 10);
        }
    }, [updateSuccess, updateError]);
    
    const handleChange = (evt, key) => {
        let upd = {};
        upd[key] = evt.target.value;
    
        updatePage(upd);
        setMessage("Saving changes...");
    }

    // const messageSeverity = (isUpdating && 'info') || 
    //                       (updateError && 'error') || 
    //                       'success';

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
            <Snackbar open={!!message} 
                      anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'left',
                      }}
                      autoHideDuration={6000} 
                      onClose={() => {}}>
                    <SnackbarContent message={message} />
            </Snackbar>
        </div>
    );
}

export default EditPageView;