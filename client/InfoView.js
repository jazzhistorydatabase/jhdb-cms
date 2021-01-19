import React from 'react';
import { Link, Paper, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

const styles = theme => ({
    paper: {
        padding: theme.spacing(2),
    },
});

const InfoView = (props) => (
    <Paper className={props.classes.paper} elevation={3}>
        <h1>Welcome to the contributor portal!</h1>
        <br />
        <Typography>
            Take a look at the video below for a tour! Please feel free to reach out to <Link href="mailto:global@jazzhistorydatabase.com">global@jazzhistorydatabase.com</Link> if you have any questions or issues.
        </Typography>
        <br />
        <Typography>
            You can upload files to the JHDB archive by selecting the Upload tab above. If you have already sent us files, they should have been uploaded for you already and you can skip this step. You can then build pages in the Pages tab. If you have any questions or run into difficulties, please don't hesitate to send us an email and our team will be happy to help you out!
        </Typography>
        <br />
        <h3>Getting Started Walk-Through (Click to play, then press f for fullscreen)</h3>
        <iframe title="info-loggedin" width="800" height="600" style={{maxHeight: "80%", maxWidth: "80%"}} src="https://www.youtube.com/embed/GirVi49SW_g?start=195" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen;" allowfullscreen></iframe>
    </Paper>
);

export default withStyles(styles)(InfoView);