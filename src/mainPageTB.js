import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';


import './mainPageTB.css';
import Button from '@material-ui/core/Button';
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
    console.log(Object.keys(contrib));
    return (
        <div className={classes.root+" MainPage-format"}>
            <Button variant="outlined" color={"primary"} className={classes.button}>Add Contribution </Button>
            <List component="nav">
                {/*Object.keys() gives you the keys of that object as an array*/}
                {/*contrib is an object made up of keys that correspond to their unique information (collections -> collection name, collection status, etc.)*/}
                {/*objects in javascript are a set of key value pairs*/}
                {/*.map maps a function to every single key*/}
                {/*e is a variable that represents a collection's key*/}
                {/*contrib[e].attribute accesses the attribute of that contrib by their key*/}
                {contrib.map((e) => {
                    return (<ListItem button>
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