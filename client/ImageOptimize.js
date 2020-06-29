import React from 'react';
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

const optimizeImages = (collRef) => {
    console.log(collRef.path);
    fb.getToken( token => {
        axios.post(`/optimize`, {
            auth: token,
            ref: collRef.path
        }).then(resp => {
            window.alert("Successfully started image optimization. Images will display a spinner during the optimization process - if an image appears stuck optimizing for more than a few minutes, please try again or contact the JHDB Global team for assistance.");
            console.log(resp);
        }).catch( err => {
            window.alert("Error optimizing images - please contact developers for support\n\n" + err);
            console.log(err);
            return;
        });
    });
}

const ImageOptimize = (props) => {
    const { classes } = props;

    return (
        <div className={classes.root}>
            <Paper className={classes.paper} elevation={3} square={false}>
                <Typography variant="h6">Image Optimization</Typography>
                <Typography variant="p">Click the button below to optimize all images. This will generate web-ready images and thumbnails using your selected images and captions. Please complete this step once you have finished linking all images for this Page above - it is necessary for publishing.</Typography>
                <br />
                <Button variant="contained" color="primary" className={classes.button}
                            onClick={() => {optimizeImages(props.collection)}}>Optimize Images</Button>
            </Paper>
        </div>
    )
};

export default withStyles(styles)(ImageOptimize);