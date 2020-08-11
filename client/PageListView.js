import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import { Add, Done, PriorityHigh, Cached } from '@material-ui/icons';

import { Button, CircularProgress, List } from '@material-ui/core';

import fb, { useCollection, useDoc } from './firebase';
import { Switch } from '@material-ui/core';
import { FormControlLabel } from '@material-ui/core';
import { ListItem } from '@material-ui/core';
import { ListItemAvatar } from '@material-ui/core';
import { Avatar } from '@material-ui/core';
import { ListItemText } from '@material-ui/core';
import { Divider } from '@material-ui/core';

const styles = theme => ({
    root: {
        textAlign: 'left',
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
    }
});

const PageListView = (props) => {
    const history = useHistory();
    let [collection, addPage, loadingPages, pagesError] = useCollection('Contributions', 
            // If not admin, query for only my pages
            props.user.admin ? undefined : ['owner', '==', props.user.uid]);
    let [publishedList, loadingPublished, publishedError] = useDoc('Contributions/published');

    const loading = loadingPages || loadingPublished;
    console.log(`pages ${loadingPages} published ${loadingPublished}`)
    const error = pagesError || publishedError;

    let pages = collection && collection.filter(e => !!e.type);
    let [filterOwned, setFilterOwned] = useState(false);
    if(filterOwned) {
        pages = pages.filter(p => p.owner === props.user.uid);
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


    return (
        <div className={props.classes.root}>
            <h1>My Pages</h1>
            <Button onClick={newPage} 
                    disabled={!!loading || !!error}
                    variant="contained" color={"primary"} 
                    startIcon={<Add />}>
                        Create New Page
            </Button>
            <br /><br />
            {props.user.admin && 
                <FormControlLabel
                        color={"primary"}
                        label={<div style={{display: 'flex', alignItems: 'center'}}>
                                Only Show My Pages
                            </div>}
                        labelPlacement="start"
                        control={
                            <Switch
                                disabled={loading}
                                checked={filterOwned}
                                onChange={() => {setFilterOwned(!filterOwned)}}
                                name="filterOwnedSwitch"
                                color="secondary"
                            />}
                        />
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
                    const pendingApproval = e.approval === "pending";
                    const published = publishedList[e.ref.id];
                    const statusColor = (published) ? "lightgreen" : (pendingApproval) ? "lightyellow" : "whitesmoke";
                    return (
                        <div key={e.ref.id || e.name}>
                            <Divider />
                            <ListItem button 
                                    onClick={() => {history.push(`/edit/${e.ref.id}`)}}>
                                <ListItemAvatar>
                                    <Avatar src={e['bioUrl'] || ""} >{e.name.substring(0,1)}</Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={<b>{e.name}</b>}
                                            secondary={<span>
                                    {/* Status */}
                                    <span style={{
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            color:  statusColor }}>
                                    {published && 
                                        <span><Done /> Published</span>
                                    }
                                    {pendingApproval &&  
                                        <span><PriorityHigh /> Needs Review</span>
                                    }
                                    {!published && !pendingApproval && 
                                        <span><Cached /> Work in Progress</span>
                                    }
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
        </div>
    );
}

export default withStyles(styles)(PageListView);