import React, {useEffect, useState} from 'react';
import {useHistory, useLocation, Route} from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import { Add, Done, PriorityHigh, Cached } from '@material-ui/icons';
import { SearchRounded } from '@material-ui/icons';

import { Button, CircularProgress, List, Paper } from '@material-ui/core';
import { InputAdornment } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Checkbox } from '@material-ui/core';
import { FormControlLabel } from '@material-ui/core';
import { ListItem } from '@material-ui/core';
import { ListItemAvatar } from '@material-ui/core';
import { Avatar } from '@material-ui/core';
import { ListItemText } from '@material-ui/core';
import { Divider } from '@material-ui/core';

import EditPageView from './EditPageView';
import fb, { useCollection, useDoc } from './firebase';

const styles = theme => ({
    root: {
        textAlign: 'left',
        padding: theme.spacing(3),
        paddingTop: theme.spacing(1)
    },
});

const PageListView = (props) => {
    const history = useHistory();
    const location = useLocation();
    
    const classes = props.classes;
    let [collection, addPage, loadingPages, pagesError] = useCollection('Contributions', 
        // If not admin, query for only my pages
        props.user.admin ? undefined : ['owner', '==', props.user.uid]
    );
    let [publishedList, loadingPublished, publishedError] = useDoc('Contributions/published');

    const loading = loadingPages || loadingPublished;
    const error = pagesError || publishedError;
    
    let pages = collection && collection.filter(e => !!e.type);
    let [filterOwned, setFilterOwned] = useState(false);
    let [filterReview, setFilterReview] = useState(false);
    let [search, setSearch] = useState("");

    pages = pages.filter(p => (
            (p.name && p.name.includes(search)) || 
            (p.description && p.description.includes(search))
        ));
    if(filterOwned) {
        pages = pages.filter(p => p.owner && p.owner === props.user.uid);
    }
    if(filterReview) {
        pages = pages.filter(p => p["pendingReview"]);
    }

    const newPage = () => {
        let contribName = window.prompt("Enter artist/collection title:");
        if (contribName) {
            let maxIndex = 0;
            pages.forEach( (e) => {
                if(e.index > maxIndex) maxIndex = e.index;
            })
            addPage({
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
                owner: props.user.uid,
                index: maxIndex + 1,
            });
        } else {
            window.alert("Page name can not be blank!");
        }
    };

    // const showList = location.pathname.split('pages')[1].length <= 1;

    // if(!showList) {
    //     if(loading) {
    //         return (loading && <span><br/><CircularProgress /><br />Loading Page...</span>)
    //     }
    //     const user = props.user;
    //     return 
    // }

    return (
        <Paper className={props.classes.root}>
            <h1>My Pages</h1>
            <Button onClick={newPage} 
                    disabled={!!loading || !!error}
                    variant="contained" color={"primary"} 
                    startIcon={<Add />}>
                        Create New Page
            </Button>
            <br /><br />
            <TextField
                id="input-with-icon-textfield"
                variant="outlined"
                placeholder="Search Pages"
                onChange={(evt) => {setSearch(evt.target.value)}}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchRounded />
                        </InputAdornment>
                    ),
                }}
            />
            <br />
            {props.user.admin && 
                <div>
                    <FormControlLabel
                            color={"primary"}
                            label={<div style={{display: 'flex', alignItems: 'center'}}>
                                    Only Show My Pages
                                </div>}
                            labelPlacement="end"
                            style={{marginLeft: 5}}
                            control={
                                <Checkbox
                                    disabled={loading}
                                    checked={filterOwned}
                                    onChange={() => {setFilterOwned(!filterOwned)}}
                                    name="filterOwnedSwitch"
                                    color="secondary"
                                />}
                            />
                    <br />
                    <FormControlLabel
                            color={"primary"}
                            label={<div style={{display: 'flex', alignItems: 'center'}}>
                                    Only Show Pages Awaiting Review
                                </div>}
                            labelPlacement="end"
                            style={{marginLeft: 5}}
                            control={
                                <Checkbox
                                    disabled={loading}
                                    checked={filterReview}
                                    onChange={() => {setFilterReview(!filterReview)}}
                                    name="filterReviewSwitch"
                                    color="secondary"
                                />}
                            />
                </div>
            }
            <br />
            {/* Firestore data loading/error: */}
            {loading && <span><br/><CircularProgress /><br />Fetching Data...</span>}
            {error && 
                <h4>
                    <br />
                    Error fetching data. If this issue persists, contact the JHDB Global team at <a href="mailto:global@jazzhistorydatabase.com">global@jazzhistorydatabase.com</a>
                </h4>
            }
            {/* Page list */}
            <List>
                {pages && publishedList && pages.map(e => {
                    const pendingApproval = e.pendingReview;
                    const published = publishedList[e.ref.id];
                    const statusColor = (published) ? "lightgreen" : (pendingApproval) ? "orange" : "whitesmoke";
                    const statusText = (published) ? "Published" : (pendingApproval) ? "Awaiting Review" : "Work in Progress";
                    const statusIcon = (published) ? <Done /> : (pendingApproval) ? <PriorityHigh /> : <Cached />;
                    return (
                        <div key={e.ref.id || e.name}>
                            <Divider />
                            <ListItem button 
                                    onClick={() => {history.push(`/pages/${e.ref.id}`)}}>
                                <ListItemAvatar>
                                    <Avatar style={{backgroundColor: e['bioUrl'] ? 'white' : undefined}} 
                                            src={e['bioUrl'] || ""} >
                                        {e.name.substring(0,1)}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={<b>{e.name}</b>}
                                            secondary={<span>
                                    {/* Status */}
                                    <span style={{
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            color:  statusColor }}>
                                        {statusIcon}
                                        {statusText}
                                        <br />
                                    </span>
                                    {/* Description */}
                                    {e.description.substring(0, 100)}{e.description.length > 99 ? '...' : ''}
                                </span>}>
                                </ListItemText>
                            </ListItem>
                        </div>
                    );
                })}
            </List>
        </Paper>
    );
}

export default withStyles(styles)(PageListView);