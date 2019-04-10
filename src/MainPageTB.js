import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import './MainPageTB.css';
import Paper from "@material-ui/core/Paper";
import FormControl from "@material-ui/core/FormControl";

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
        width: '90%',
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
    handleAddButtonClick() {
        this.props.windowSwap();
    }

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
                        <Button onClick={this.handleAddButtonClick.bind(this)} variant="outlined" color={"primary"}
                                className={classes.button}>Add Contribution </Button>
                        <List className-={classes.contributionList}>
                            {contrib.map((e) => {
                                return (
                                    <ListItem key={e.id || e.name} className={classes.contributionListItem}>
                                        <h3 className={classes.contributionListName}>{e.name}</h3>
                                        <Button variant="outlined" color={"primary"}
                                                className={classes.button}>Edit </Button>
                                        <Button variant="outlined" color={"primary"}
                                                className={classes.button}>Preview </Button>
                                        <h3 className={classes.contributionListStatus}>{e.status}</h3>
                                    </ListItem>
                                )

                            })}
                        </List>
                    </div>
                </Paper>
            </MuiThemeProvider>
        );
    }
}

export default withStyles(styles)(MainPageTB);