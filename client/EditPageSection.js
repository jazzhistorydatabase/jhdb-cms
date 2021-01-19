import React, { Component, useState } from 'react';
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Paper from "@material-ui/core/Paper";
import { withStyles } from '@material-ui/core/styles';
import Switch from "@material-ui/core/Switch";
import { randomBytes } from 'crypto';
import { CircularProgress, InputLabel } from '@material-ui/core';
import { TextField } from '@material-ui/core';

import FileInput from "./FileInput";
import fb, {useCollection} from "./firebase";
import dbx from './dropbox.js';
import ImageOptimize from './ImageOptimize';
import { LinkRounded } from '@material-ui/icons';
import ToggleSwitch from './ToggleSwitch';


const styles = theme => ({
    paper: {
        padding: theme.spacing(2),
    },
    field: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
});

const processFileLink = (link) => {
    return link.replace('www.dropbox', 'dl.dropboxusercontent').replace(' ', '%20');
}

const EditPageSection = (props) => {
    const classes = props.classes;
    let [files, addFile, loadingFiles, filesError] = useCollection(props.collectionRef.path);
    const [page, updatePage] = [props.page, props.updatePage];
    const [manualEntry, setManualEntry] = useState(false);

    if(loadingFiles) {
        return <CircularProgress />
    } else if (filesError) {
        return <div>
                <h4>Error loading files</h4>
                <p>Try refreshing the page, and contact global@jazzhistorydatabase.com if this issue persists</p>
            </div>
    }

    let maxIndex = 0;
    files.forEach( (e) => {
        if(e.index > maxIndex) maxIndex = e.index;
    });
    const onChooserSuccess = (files) => {
        // create and push each doc
        files.forEach( file => {
            let fileDoc = {};
            fileDoc['name'] = file.name || "";
            fileDoc['url'] = (file.link && processFileLink(file.link)) || "";
            fileDoc['caption'] = "";
            fileDoc['icon'] = file.icon || "";
            fileDoc['thumbnail'] = (file.link && processFileLink(file.link)) || "";
            fileDoc['index'] = ++maxIndex;
            addFile(fileDoc);
        });
    };
    const addFileInput = () => addFile({
        name: "",
        url: "",
        caption: "",
        icon: "",
        thumbnail: "",
        index: maxIndex + 1,
    });
    
    files.sort((a, b) => {
        if (!a.index) return -1;
        if (!b.index) return 1;
        return a.index - b.index;
    });

    let fileInputs = files.map((fileDoc) => {
        return (
            <div className={classes.field}
                 key={fileDoc.index || fileDoc.name || randomBytes(2)}>
                <FileInput  type={props.fileType}
                            manualEntry={manualEntry}
                            fileDoc={fileDoc}
                            />
            </div>
        );
    });
    const sectionTitleKey = props.fileType.toLowerCase()+"Title";

    return (
        <div className={classes.root}>
            <br/>
            <Paper className={classes.paper} elevation={3} square={false}>
                <FormGroup row>
                    <h2 className={classes.mediaUploadTitle}>
                        {props.fileType || ""}
                    </h2>
                </FormGroup><br/>
                <InputLabel>Section Title</InputLabel>
                <TextField
                            variant="filled"
                            className={classes.field}
                            defaultValue={page[sectionTitleKey] || ""}
                            onChange={(evt) => {
                                let chg = {};
                                chg[sectionTitleKey] = evt.target.value;
                                updatePage(chg);
                            }}
                            margin="normal"
                            placeholder={"Default: " + (props.fileType || "")}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        /><br/><br/>
                {props.fileType === 'Audio' && props.user && props.user.admin &&
                    <ToggleSwitch labelText="Manual Link Entry (JHDB Website Links Only!)"
                                  labelIcon={<LinkRounded />}
                                  checked={manualEntry}
                                  onChange={evt => setManualEntry(!manualEntry)} />
                }
                <br />
                <Button variant="contained" color="primary" className={classes.button}
                        onClick={
                            () => {
                                dbx.onChooseMulti(props.fileType, onChooserSuccess);
                            }
                        }>
                    ++ Bulk Add
                </Button>
                <br />
                <br />
                <Button variant="contained" color="primary" className={classes.button}
                        onClick={addFileInput}>
                    + ADD ONE
                </Button>
                <br/>
                <br/>
                {fileInputs}
                {props.fileType === 'Images' && 
                <ImageOptimize parentPage={page}
                               images={files}
                               admin={props.user && props.user.admin}
                               loadingImages={loadingFiles}
                               errorImages={filesError}
                />}
            </Paper>
        </div>
    );
}

// }

export default withStyles(styles)(EditPageSection);

