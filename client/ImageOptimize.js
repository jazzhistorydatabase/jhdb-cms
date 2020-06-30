import React, { useState } from 'react';
import axios from 'axios';
import fb from './firebase';
import { withStyles } from '@material-ui/styles';
import { Button, Paper, Typography } from '@material-ui/core';


const styles = theme => ({
    paper: {
        padding: theme.spacing(2),
        marginTop: theme.spacing(2)
    },
});

const optimizeImages = (collRef, setOptimizing) => {
    console.log(collRef.path);
    setOptimizing(true);
    window.alert("Successfully started image optimization - please keep this screen open until completion");
    fb.getToken( token => {
        axios.post(`/optimize`, {
            auth: token,
            ref: collRef.path
        }).then(resp => {
            setOptimizing(false);
            console.log(resp);
            window.alert(`Successfully optimized ${resp.data.length / 2} images!`);
        }).catch( err => {
            setOptimizing(false);
            window.alert("Error optimizing images - please contact developers for support\n\n" + err);
            console.log(err);
            return;
        });
    });
}

const ImageOptimize = (props) => {
    const { classes } = props;
    let [ optimizing, setOptimizing ] = useState(false);

    return (
        <div className={classes.root}>
            <Paper className={classes.paper} elevation={3} square={false}>
                <Typography variant="h6">Image Optimization</Typography>
                <Typography variant="p">Click the button below to optimize all images. This will generate web-ready images and thumbnails using your selected images and captions. Please complete this step once you have finished linking all images for this Page above - all images must be optimized to publish successfully.</Typography>
                <br />
                <Button disabled={optimizing} variant="contained" color="primary" className={classes.button}
                            onClick={() => {
                                    optimizeImages(props.collection, setOptimizing);
                                }}>Generate Optimized Images</Button>
            </Paper>
        </div>
    )
};

export default withStyles(styles)(ImageOptimize);