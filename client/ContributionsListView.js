import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";
import {Add, Edit, Visibility, Person, PriorityHigh, Done } from "@material-ui/icons";


import fb from './firebase';
import { Typography, ListSubheader } from '@material-ui/core';
import { ListItemText, ListItemAvatar, Avatar, ListItemSecondaryAction } from '@material-ui/core';

const styles = theme => ({
    button: {
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(1),
    },
    paper: {
        padding: theme.spacing(4),
        paddingTop: theme.spacing(1),
    },
    addButton: {
        marginLeft: theme.spacing(4),
    }
});

class MainPageTB extends Component {
    
    handleAddButtonClick() {
        let contribName = window.prompt("Enter collection name:");
        if (contribName) {
            let lst = this.props.contributions;
            let maxIndex = 0;
            lst.forEach( (e) => {
                if(e.index > maxIndex) maxIndex = e.index;
            })
            fb.base.addToCollection(`Contributions`, {
                name: contribName,
                description: '',
                type: 'collection',
                imagesSubpage: false,
                videoSubpage: false,
                audioSubpage: false,
                status: 'unpublished',
                bioUrl: '',
                bioName: '',
                bioThumbnail: '',
                owner: this.props.user.uid,
                index: maxIndex + 1,
            });
        } else {
            window.alert("Collection name can not be blank!");
        }
    };

    handleEditButtonClick(selectedContribution) {
        this.props.onSelectContribution(selectedContribution);
    };

    render() {
        const classes = this.props.classes;
        let contrib = this.props.contributions.filter(e => !!e.type);

        if(!this.props.user.admin) {
            // If user isn't admin, only display user's contributions
            contrib = contrib.filter(e => {
                return e.owner === this.props.user.uid;
            });
        } else {
            // If user is admin, show their contributions at the top
            contrib = contrib.sort((a, b) => {
                // Show user's contribs on top
                if(a.owner === this.props.user.uid) return -1;
                return 1;
            });
        }

        const selectedUid = this.props.selectedContribution ? this.props.selectedContribution.ref.id : "";

        return (
            <div>
                <br />
                <br />
                <Paper className={classes.paper} elevation={3} square={false} classes={{ root: classes.cardColor }}>
                    <div className={" MainPage-format"}>
                        <h1>My Pages</h1>
                        <Button onClick={() => { return this.handleAddButtonClick.bind(this)() }} 
                                variant="contained" color={"primary"} 
                                startIcon={<Add />}>
                                    Create New Page
                        </Button>
                        <br />
                        <List className={classes.contributionList}>
                            {/* <ListSubheader>My Collections</ListSubheader> */}
                            {contrib.map((e) => {
                                let pendingApproval = e.approval === "pending";
                                let published = this.props.publishedList && this.props.publishedList[e.ref.id] === 'true';
                                return (
                                    <ListItem key={e.ref.id || e.name} button 
                                              selected={e.ref.id === selectedUid}
                                              onClick={() => {return this.handleEditButtonClick.bind(this)(e)}}>
                                        <ListItemAvatar>
                                            <Avatar src={e['bioUrl'] || ""} >{e.name.substring(0,1)}</Avatar>
                                        </ListItemAvatar>
                                        <ListItemText className={classes.contributionListName} 
                                                      primary={e.name}
                                                      secondary={e.description.substring(0, 100)}>
                                        </ListItemText>
                                        <ListItemSecondaryAction>
                                            <Button variant="outlined" style={{color:  (published) ? "lightgreen" : (pendingApproval) ? "lightyellow" : "whitesmoke" }}
                                                startIcon={(published) ? <Done /> : (pendingApproval) ? <PriorityHigh /> : <Person />}
                                                onClick={(published) ? 
                                                    () => { window.location.href = "/published/"+e.name.toLowerCase().replace(/ /g, "-") } :
                                                    () => { return this.handleEditButtonClick.bind(this)(e) }}
                                                    className={classes.button}>
                                                    {(published) ? "Published" : (pendingApproval) ? "Pending Approval" : "Work in Progress"}    
                                            </Button>
                                        </ListItemSecondaryAction>
                                        {/* {userButtons(e, published, pendingApproval)} */}
                                        
                                        {/* <h3 className={classes.contributionListStatus}>e.status</h3> */}
                                    </ListItem>
                                );
                            })}
                        </List>
                    </div>
                </Paper>
            </div>
        );
    }
}

export default withStyles(styles)(MainPageTB);