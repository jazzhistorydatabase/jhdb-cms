import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import './App.css';
import FormGroup from "@material-ui/core/FormGroup";
import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from "@material-ui/core/TextField";

import fb from "./firebase";
import dbx from './dropbox.js';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    fab: {
        margin: theme.spacing.unit,
    },
    fabImg: {
        width: '50px',
        height: '50px',
        borderRadius: '100px',
    }
});

class FileUpload extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fileDoc: undefined,
        };
    };
    handleTextChange = event => {
        let fileDoc = this.state.fileDoc;
        fileDoc.caption = event.target.value;
        this.setState({fileDoc: fileDoc});
    };

    handleDelete() {
        if(window.confirm("Are you sure you want to remove this file? This can not be undone!")) {
            fb.base.removeDoc(this.props.fileDoc.ref);
        }
    }

    onChooserSuccess(file) {
        let fileDoc = this.state.fileDoc;
        fileDoc['name'] = file[0].name || "";
        fileDoc['url'] = file[0].link && file[0].link.replace('www.dropbox', 'dl.dropboxusercontent') || "";
        fileDoc['icon'] = file[0].icon || "";
        fileDoc['thumbnail'] = file[0].thumbnailLink && file[0].thumbnailLink.replace('www.dropbox', 'dl.dropboxusercontent') || "";
        this.setState({fileDoc: fileDoc});
    }

    componentWillMount() {
        if(this.props && this.props.fileDoc) {
            fb.base.syncDoc(this.props.fileDoc.ref, {
                context: this,
                state: 'fileDoc',
                withRefs: true
            });
        }
    }

    render() {
        const classes = this.props.classes;
        const doc = this.state.fileDoc;
        if(!doc) {
            return <div />;
        }
        let fileUploadIcon = doc.url ?
                ((doc.thumbnail || doc.icon) ?
                    (<img className={classes.fabImg} src={(doc.thumbnail || doc.icon)} />) :
                    (<CheckIcon />)):
                (<AddIcon/>);

        return (
            <div className={classes.root}>
                <FormGroup row id={(this.state.fileDoc && this.state.fileDoc.name) || this.props.fileIndex}>
                    <Fab
                        size="small"
                        color={doc.url ? 'none' : 'primary'}
                        aria-label="Upload"
                        className={classes.fab}
                        onClick={
                            () => {
                                if (this.state.fileDoc) {
                                    dbx.onChoose(this.props.fileType, this.onChooserSuccess.bind(this));
                                }
                            }
                        }>
                        {fileUploadIcon}
                    </Fab>
                    {(this.state.fileDoc && this.state.fileDoc.name) || (this.props && this.props.fileIndex)}
                    <TextField
                        id="standard-multiline-static"
                        label="Caption"
                        style={{margin: 5}}
                        multiline
                        value={(this.state.fileDoc && this.state.fileDoc.caption) || ""}
                        onChange={this.handleTextChange}
                        margin="normal"
                        variant="filled"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <Fab size="small"
                         aria-label="Delete"
                         onClick={this.handleDelete.bind(this)}
                         className={classes.fab}>
                        <DeleteIcon />
                    </Fab>
                </FormGroup>

            </div>
        );
    }

}

export default withStyles(styles)(FileUpload);

