import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";
import FormControl from "@material-ui/core/FormControl";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import fb from './firebase';
import dbx from './dropbox.js';

import './MainPageTB.css';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#c51162',
        },
    },
});

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    button: {
        marginLeft: '10px'
    },
    paper: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
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
        width: '20vw',
        textAlign: 'left',
        paddingLeft: '3vw',
        marginRight: 'auto'
    },
    cardColor: {
        backgroundColor: '#fce4ec',
    }
});

class MainPageTB extends Component {
    // // Testing purposes. Attach this to a button's onClick to see in action - it opens a file attached to the collection, in dropbox.
    // onBioDocumentClick = function(documentName) {
    //     this.props.dropbox.openFile(documentName);
    // };
    
    handleAddButtonClick() {
        let contribName = window.prompt("Enter collection name:");
        if(contribName) {
            fb.base.addToCollection(`Contributions`, {
                name: contribName,
                description: '',
                type: 'collection',
                imagesSubpage: false,
                videoSubpage: false,
                audioSubpage: false,
                status: 'unpublished',
            });
        } else {
            window.alert("Collection name can not be blank!");
        }
    };
  
    handleEditButtonClick(selectedContribution) {
        this.props.windowSwap(selectedContribution);
    };

    handleAdminButtonClick(){
        this.props.adminSwap();
    };
    render() {
        const classes = this.props.classes;
        let contrib = this.props.contributions;
        return (
            <MuiThemeProvider theme={theme}>
                <br/>
                <br/>
                <Paper className={classes.paper} elevation={3} square={false} classes={{root: classes.cardColor}}>
                    <div className={" MainPage-format"}>
                        <h1>My Contributions</h1>
                        <Button onClick={() => {return this.handleAddButtonClick.bind(this)()}} variant="outlined" color={"primary"}
                                className={classes.button}>Add Contribution </Button>
                        <List className-={classes.contributionList}>
                            {contrib.map((e) => {
                                return (
                                    <ListItem key={e.id || e.name} className={classes.contributionListItem}>
                                        <h3 className={classes.contributionListName}>{e.name}</h3>
                                        <Button variant="outlined" color={"primary"}
                                                onClick={() => {return this.handleEditButtonClick.bind(this)(e)}}
                                                className={classes.button}>Edit </Button>
                                        <Button variant="outlined" color={"primary"}
                                                className={classes.button}>Preview </Button>
                                        <h3 className={classes.contributionListStatus}>{e.status}</h3>
                                    </ListItem>
                                );
                            })}
                        </List>
                    </div>
                </Paper>
                {/*<Fab color="primary" aria-label="Add" className={classes.fab} onClick={() => {return this.handleAdminButtonClick.bind(this)()}}>*/}
                    {/*<AddIcon />*/}
                {/*</Fab>*/}
                <Button variant="outlined" color={"primary"}
                        onClick={this.handleAdminButtonClick.bind(this)}
                        className={classes.button}>Admin </Button>
            </MuiThemeProvider>
        );
    }
}

export default withStyles(styles)(MainPageTB);