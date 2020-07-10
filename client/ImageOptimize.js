import React, { useState, useEffect } from 'react';
import axios from 'axios';
import fb, { useCollection } from './firebase';
import { withStyles } from '@material-ui/styles';
import { Button, Paper, Typography, CircularProgress } from '@material-ui/core';

// This is needed for async/await, not sure why... 
// Parcel's default webpack config might be borked
// eslint-disable-next-line no-unused-vars
import regeneratorRuntime from "regenerator-runtime";

const styles = theme => ({
    paper: {
        padding: theme.spacing(2),
        marginTop: theme.spacing(2)
    },
});

const ImageOptimize = (props) => {
    const { classes } = props;
    let [ optimizing, setOptimizing ] = useState(false);
    let [ optimizeProgress, setOptimizeProgress ] = useState({s: 0, f: 0, t: -1});
    // eslint-disable-next-line no-unused-vars
    let [ images, addImage, loadingImages, errorImages ] = useCollection(props.collection.path);

    
    
    const optimizeImages = (collRef, setOptimizing) => {
        setOptimizing(true);
        console.log(collRef.path);
        fb.getToken( token => {
            // Get list of images pending optimization
            let optimImgs = images.filter(img => !img['optimized']);
            if(optimImgs.length === 0) {
                // If there are none, we're done here
                window.alert("No images to optimize, you are ready to publish!");
                setOptimizing(false);
                return;
            }

            window.alert("Successfully started image optimization - please keep this screen open until completion");
            
            const optimizeImage = (image) => {
                return axios.post(`/optimize`, {
                    auth: token,
                    ref: image.ref.path,
                    parentPage: props.parentPage.name
                });
            };

            let progress = {
                s: 0, 
                f: 0, 
                t: (optimImgs && optimImgs.length) || 0
            };
            setOptimizeProgress(progress);

            optimImgs.reduce((p, image, index) => {
                let progressLogged = false;
                return p.then(async responses => {
                    console.log("Optimizing image #"+index);
                    let res = await optimizeImage(image);
                    if(res && res['status'] === 200) {
                        console.log("Succeeded optimizing image #"+index);
                        progress.s++;
                        setOptimizeProgress(progress);
                    } else if(res) {
                        console.log("Failed optimizing image #"+index);
                        progress.f++;
                        setOptimizeProgress(progress);
                    }
                    progressLogged = true;
                    return [...responses, res]
                }).catch(err => {
                    console.log("Request error optimizing image #" + index);
                    console.log(err);
                    if(!progressLogged) {
                        progress.f++;
                        setOptimizeProgress(progress);
                    }
                });
            }, Promise.resolve([]));
        });
    }

    useEffect( () => {
        if(optimizeProgress.t >= 0 && (optimizeProgress.f + optimizeProgress.s >= optimizeProgress.t)) {
            window.alert(`Image optimization complete!\n  ${optimizeProgress.s} Succeeded\n  ${optimizeProgress.f} Failed`)
            setOptimizing(false);
            setOptimizeProgress({s: 0, f: 0, t: -1});
        }
    }, [optimizeProgress.f, optimizeProgress.s, optimizeProgress.t]);

    return (
        <div className={classes.root}>
            <Paper className={classes.paper} elevation={3} square={false}>
                <Typography variant="h6">Image Optimization</Typography>
                <Typography variant="p">Click the button below to optimize all images. This will generate web-ready images and thumbnails using your selected images and captions. Please complete this step once you have finished linking all images for this Page above - all images must be optimized to publish successfully.</Typography>
                <br />
                <br />
                {loadingImages && <CircularProgress />}
                {errorImages && <Typography variant="p">Error fetching images</Typography>}
                {!loadingImages && images && 
                    <Button disabled={optimizing} variant="contained" color="primary" className={classes.button}
                            onClick={() => {
                                    optimizeImages(props.collection, setOptimizing);
                                }}>Generate Optimized Images</Button>}
                <br />
                {optimizing && 
                    <Typography variant="p">
                        <CircularProgress />
                        <i>Optimizing images... {optimizeProgress.s + optimizeProgress.f} out of {optimizeProgress.t} complete</i><br />
                        {optimizeProgress.f} Errors
                    </Typography>}
            </Paper>
        </div>
    )
};

export default withStyles(styles)(ImageOptimize);