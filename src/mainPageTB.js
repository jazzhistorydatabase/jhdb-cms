import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import './mainPageTB.css';
const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
});

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

function MainPageTB(props) {
    const { classes } = props;

    let contrib = props.contributions;
    console.log(Object.keys(contrib));
    return (
        <div className={classes.root+" MainPage-format"}>
            <List component="nav">
                //Object.keys() gives you the keys of that object as an array
                //contrib is an object made up of keys that correspond to their unique information (collections -> collection name, collection status, etc.)
                //objects in javascript are a set of key value pairs
                //.map maps a function to every single key
                //e is a variable that represents a collection's key
                //contrib[e].attribute accesses the attribute of that contrib by their key
                {Object.keys(contrib).map((e) => {
                    return (<ListItem button>
                        <ListItemText primary={contrib[e].name} />

                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                    </ListItem>);
                })}

                <ListItem button>
                    <ListItemText primary="Drafts" />
                    <ListItemIcon>
                        <DraftsIcon />
                    </ListItemIcon>
                </ListItem>
            </List>
        </div>
    );
}

MainPageTB.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainPageTB);