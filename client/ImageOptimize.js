import React, { useState, useEffect } from 'react';
import axios from 'axios';
import fb, { useCollection } from './firebase';
import { withStyles } from '@material-ui/styles';
import { Button, Paper, Typography, CircularProgress } from '@material-ui/core';

// This is needed for async/await, not sure why... 
// Parcel's default webpack config might be borked
// eslint-disable-next-line no-unused-vars
import regeneratorRuntime from "regenerator-runtime";
import { DesktopWindows, RestoreRounded, SpeedRounded } from '@material-ui/icons';
import ToggleSwitch from './ToggleSwitch';

const styles = theme => ({
    paper: {
        padding: theme.spacing(2),
        marginTop: theme.spacing(2)
    },
});

const ImageOptimize = (props) => {
    const { classes } = props;
    let [ force, setForce ] = useState(false);
    let [ optimizing, setOptimizing ] = useState(false);
    let [ optimizeProgress, setOptimizeProgress ] = useState({s: 0, f: 0, t: -1});
    // eslint-disable-next-line no-unused-vars
    let [ images, loadingImages, errorImages ] = [props.images, props.loadingImages, props.errorImages];

    
    
    const optimizeImages = (collRef, setOptimizing) => {
        setOptimizing(true);
        console.log(collRef.path);
        fb.getToken( token => {
            // Get list of images pending optimization
            let optimImgs = force ? images : images.filter(img => !img['optimized']);
            if(optimImgs.length === 0) {
                // If there are none, we're done here
                window.alert("No images to optimize, you are ready to publish!");
                setOptimizing(false);
                return;
            }

            window.alert("Successfully started image optimization - please keep this screen open until completion");
            
            const optimizeImage = (image) => {
                let host = window.location.host;
                let isTest = host.includes("localhost") || host.includes("staging") || host.includes("dev");
                return axios.post(`/optimize`, {
                    auth: token,
                    ref: image.ref.path,
                    parentPage: props.parentPage.name,
                    test: isTest,
                    force: force,
                });
            };

            let progress = {
                s: 0, 
                f: 0, 
                t: (optimImgs && optimImgs.length) || 0
            };
            setOptimizeProgress(progress);

            optimImgs.reduce((p, image, index) => {
                return p.then(async responses => {
                    console.log("Optimizing image #"+index);

                    let res;
                    try {
                        res = await optimizeImage(image);
                    } catch(err) {
                        res = false;
                        console.log("Request error optimizing image #" + index);
                        console.log(err);
                    }
                    
                    if(res && res['status'] === 200) {
                        console.log("Succeeded optimizing image #"+index);
                        progress.s++;
                        setOptimizeProgress(progress);
                    } else {
                        progress.f++;
                        setOptimizeProgress(progress);
                        console.log("Failed optimizing image #"+index);
                    }
                    return [...responses, res];
                }).catch(err => {
                    console.log("Promise error optimizing image #" + index);
                    progress.f++;
                    setOptimizeProgress(progress);
                    console.log(err);
                    return [];
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
                <Typography variant="body1">Click the button below to optimize all images. This will generate web-ready images and thumbnails using your selected images and captions. Please complete this step once you have finished linking all images for this Page above - all images must be optimized to publish successfully.</Typography>
                <Typography variant="body1">Note: Previews may not always appear correctly in the list above immediately after optimizing - this is normal. Use the preview button on the sidebar to ensure that all images are displayed properly.</Typography>
                <br />
                {props.admin &&
                    <ToggleSwitch labelText="Force re-optimize all images"
                                labelIcon={<RestoreRounded />}
                                checked={force}
                                onChange={evt => setForce(evt.target.checked)} />
                }
                <br />
                {loadingImages && <CircularProgress />}
                {errorImages && <Typography variant="body1">Error fetching images</Typography>}
                {!loadingImages && images && 
                    <Button disabled={optimizing} variant="contained" color="primary" className={classes.button}
                            onClick={() => {
                                    optimizeImages(props.parentPage, setOptimizing);
                                }}>Generate Optimized Images</Button>}
                <br />
                {optimizing && 
                    <div>
                        <CircularProgress />
                        <Typography variant="body1">
                            <i>Optimizing images... {optimizeProgress.s + optimizeProgress.f} out of {optimizeProgress.t} complete</i><br />
                            {optimizeProgress.f} Errors
                        </Typography>
                    </div>
                }
            </Paper>
        </div>
    )
};

export default withStyles(styles)(ImageOptimize);