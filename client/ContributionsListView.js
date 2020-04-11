import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";
import {Add, Edit, Visibility, Person, PriorityHigh, Done } from "@material-ui/icons";


import fb from './firebase';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    button: {
        marginLeft: '10px'
    },
    adminFab: {
        position: 'fixed',
        right: '2vw',
        bottom: '2vw',
    },
    paper: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        width: '70%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    contributionList: {
        display: 'block',
        width: 'wrap',
        align: 'center',
    },
    contributionListName: {
        width: '20vw',
        textAlign: 'right',
        marginLeft: 'auto',
        paddingRight: '3vw'
    },
    contributionListStatus: {
        width: '7vw',
        textAlign: 'left',
        paddingLeft: '3vw',
        marginRight: 'auto'
    },
    cardColor: {
        backgroundColor: '#fce4ec',
    }
});

class MainPageTB extends Component {
    
    handleAddButtonClick() {
        let contribName = window.prompt("Enter collection name:");
        if (contribName) {
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
            });
        } else {
            window.alert("Collection name can not be blank!");
        }
    };

    handleEditButtonClick(selectedContribution) {
        this.props.windowSwap(selectedContribution);
    };

    render() {
        const classes = this.props.classes;
        const contrib = this.props.contributions;

        return (
            <div>
                <br />
                <br />
                <Paper className={classes.paper} elevation={3} square={false} classes={{ root: classes.cardColor }}>
                    <div className={" MainPage-format"}>
                        <h1>My Collections</h1>
                        <Button onClick={() => { return this.handleAddButtonClick.bind(this)() }} variant="outlined" color={"primary"} startIcon={<Add />}
                            className={classes.button}>Add Collection </Button>
                        <List className={classes.contributionList}>
                            {contrib.filter(e => e.type).map((e) => {
                                let pendingApproval = e.approval === "pending";
                                let published = this.props.publishedList && this.props.publishedList[e.ref.id] === 'true';
                                return (
                                    <div key={e.ref.id || e.name} >
                                        <ListItem className={classes.contributionListItem}>
                                            <h3 className={classes.contributionListName}>{e.name}</h3>
                                            <Button variant="outlined" color={"primary"}
                                                onClick={() => { return this.handleEditButtonClick.bind(this)(e) }}
                                                startIcon={<Edit />}
                                                className={classes.button}>Edit </Button>
                                            <Button variant="outlined" color={"primary"}
                                                    startIcon={<Visibility />}
                                                    href={"/preview/"+e.name.toLowerCase().replace(/ /g, "-")}
                                                    className={classes.button}>Preview </Button>
                                            <Button variant="outlined" color={"primary"}
                                                    startIcon={(published) ? <Done /> : (pendingApproval) ? <PriorityHigh /> : <Person />}
                                                    onClick={(published) ? 
                                                        () => { window.location.href = "/published/"+e.name.toLowerCase().replace(/ /g, "-") } :
                                                        () => { return this.handleEditButtonClick.bind(this)(e) }}
                                                    className={classes.button}>
                                                        {(published) ? "Published" : (pendingApproval) ? "Pending Approval" : "Work in Progress"}    
                                                </Button>
                                            <h3 className={classes.contributionListStatus}>{/*e.status*/}</h3>
                                        </ListItem>
                                    </div>
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