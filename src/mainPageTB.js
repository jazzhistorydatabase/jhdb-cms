import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';
import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import './mainPageTB.css';
const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
});
function MainPageTB(props) {
    const { classes } = props;
    let contrib = props.contributions;
    return (
        <div className={classes.root+" MainPage-format"}>
            <Button variant="outlined" color={"primary"} className={classes.button}>Add Contribution </Button>
            <List component="nav">

                {contrib.map((e) => {
                    return (<ListItem>
                        <ListItemText primary={e.name} />
                        <Button variant="outlined" color={"primary"} className={classes.button}>Edit </Button>
                        <Button variant="outlined" color={"primary"} className={classes.button}>Preview </Button>
                        <ListItemText primary={e.status}/>
                        <ListItemIcon>

                        </ListItemIcon>
                    </ListItem>);
                })}
            </List>
        </div>
    );
}

MainPageTB.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainPageTB);