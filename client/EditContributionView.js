import Button from '@material-ui/core/Button';
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Paper from "@material-ui/core/Paper";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React, { Component } from 'react';
import 'typeface-roboto';
import fb from "./firebase";
import MediaUpload from "./MediaUpload";
import FileUpload from "./FileUpload";
import axios from 'axios';
import { Publish } from '@material-ui/icons';
import { AssignmentLate } from '@material-ui/icons';
import { Delete } from '@material-ui/icons';
import { Switch } from '@material-ui/core';

const styles = theme => ({
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    previewButton: {
        display: 'block',
        position: 'fixed',
        height: 60,
        bottom: 20,
        right: 10,
    },
    switchPaper: {
        display: 'inline-block',
        marginLeft: theme.spacing(2),
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
    },
    paper: {
        padding: theme.spacing(3),
    },
    mediaUploadTitle: {
        width: '10vw',
        textAlign: 'left',
    }
});

class EditContributionView extends Component {
    handleBeforeButtonClick() {
        if(window.confirm("Are you sure? Any unsaved changes will be permanently lost")) {
            this.props.onSelectContribution();
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            contributionData: this.props.selectedContribution,
        };
        
        this.handleNameChange = event => {
            let data = this.state.contributionData;
            if ((data && (data.approval === 'pending'))) {
                window.alert("Please rescind your request for approval before making changes.");
                return false;
            } else {
                data.name = event.target.value;
                this.setState({contributionData: data});
            }
        };
    
        this.handleCheckBoxChange = event => {
            let data = this.state.contributionData;
            if ((data && (data.approval === 'pending'))) {
                window.alert("Please rescind your request for approval before making changes.");
                return false;
            } else {
                data.type = event.target.value;
                this.setState({contributionData: data});
            }
        };
        this.handleBioChange = event => {
            let data = this.state.contributionData;
            if ((data && (data.approval === 'pending'))) {
                window.alert("Please rescind your request for approval before making changes.");
                return false;
            } else {
                data.description = event.target.value.replace(/\n/g, "<br />");
                this.setState({contributionData: data});
            }
        };
        this.handleEndBoxChange = name => event => {
            this.setState({[name]: event.target.checked});
        };
    
        this.handleChildChange = newState => {
            let contrib = this.state.contributionData;
            if ((contrib && (contrib.approval === 'pending'))) {
                window.alert("Please rescind your request for approval before making changes.");
                return false;
            } else {
                Object.keys(newState).forEach(key => {
                    contrib[key] = newState[key];
                });
                this.setState({contributionData: contrib});
            }
        };

        this.handleDeleteContribution = event => {
            let contributionData = this.state.contributionData;
            if (window.confirm('Are you sure you want to delete "' + contributionData.name +
                    '"?\n\nThis will remove this collection from the contributor portal.\n\nThis ' +
                    'cannot be undone!\n\nAll your media files (bio photo, images, audio, video) will ' +
                    'remain in Dropbox. However, any captions, links, and bio description will be ' +
                    'deleted.')) {
                let publishedList = this.props.publishedList;
                publishedList[contributionData.ref.id] = 'false';
                fb.base.removeDoc(this.state.contributionData.ref);
                this.handleBeforeButtonClick();
            }
        };

        this.handleSwitchChange = (event) => {
            let contributionData = this.state.contributionData;
            let publishedList = this.props.publishedList;
            if (event.target.name === 'publishedSwitch') {
                if (!this.props.admin) {
                    console.log("Attempt to publish without admin credentials!");
                    return;
                } else if (event.target.checked) {
                    if (window.confirm('Are you sure you want to publish "' + contributionData.name +
                            '"?\n\nThis will make it publicly accessible via the Jazz History Database ' +
                            'website. You may visit your published contribution by clicking the ' + 
                            '"Published" button next to the contribution name in the "My Collections" page.')) {
                        fb.getToken( token => {
                            axios.post(`/publish`, {
                                auth: token,
                                name: contributionData.name
                            }).then(resp => {
                                window.alert("Publish success! You will now be redirected to the published page.");
                                window.location.href = "https://global.jazzhistorydatabase.com/" + contributionData.name.toLowerCase().replace(/ /gi, '-');
                            }).catch( err => {
                                window.alert("Error publishing - please contact developers for support\n\n" + err);
                                console.log(err);
                                return;
                            });
                        });
                        contributionData.status = "published";
                        contributionData.approval = "approved";
                        publishedList[contributionData.ref.id] = 'true';
                    }
                } else {
                    if (window.confirm('Are you sure you want to unpublish "' + contributionData.name +
                            '"?\n\nThis contribution will no longer be publicly accessible from the Jazz ' +
                            'History Database website. However, all your media files will remain in ' +
                            'Dropbox, and this contribution will remain accessible through this portal. ' +
                            'You may make any desired changes to your contribution while it is unpublished. ' +
                            'To publish your contribution again, you may need to request approval from ' +
                            'the JHDB administrators again. You may preview your contribution anytime by ' +
                            'clicking the "Preview" button on this page.')) {
                        contributionData.status = "unpublished";
                        contributionData.approval = "not requested";
                        publishedList[contributionData.ref.id] = 'false';
                    }
                }
            } else if (event.target.name === 'approvalSwitch') {
                if (event.target.checked) {
                    if (window.confirm('Are you sure you want to request approval to publish "' +
                            contributionData.name + '"?\n\nThis will notify JHDB administrators that ' +
                            'your contribution is ready to be published. It will go through a review ' +
                            'process according to JHDB\'s standards for publishing. An administrator ' +
                            'may approve and publish your contribution, or request changes before ' +
                            'publishing. Make sure to check your email in case an administrator wants ' +
                            'to get in contact with you. Please refrain from making changes to your ' +
                            'contribution while it is pending approval, to ensure that JHDB ' +
                            'administrators won\'t review incomplete changes. You may preview your ' +
                            'contribution anytime using the "Preview" button on this page.')) {
                        contributionData.approval = "pending";
                    }
                } else {
                    if (this.props.admin || 
                        window.confirm('Are you sure you want to rescind your request for approval to ' +
                            'publish "' + contributionData.name + '"?\n\nThis will notify JHDB ' +
                            'administrators that your contribution is no longer ready to be published. ' +
                            'You may rescind your request for approval at any time - your contribution ' +
                            'will remain accessible through this portal. ' +
                            'If you need to make changes to your contribution, please do this ' +
                            'as soon as possible.')) {
                        contributionData.approval = "not requested";
                    }
                }
            } else {
                console.log("Something called this function...but what??");
                return;
            }
            this.setState({ contributionData: contributionData });
        };
    }

    componentDidMount() {
        if (this.props.selectedContribution && this.props.selectedContribution.ref) {
            fb.base.syncDoc(this.props.selectedContribution.ref.path, {
                context: this,
                state: 'contributionData',
                withRefs: true
            });
        }
    }

    render() {
        const classes = this.props.classes;
        const contrib = this.state.contributionData;
        let approvalText = "Request Approval";
        let publishedText = "Publish";
        if (contrib) {
            if (contrib.approval === 'pending') {
                approvalText = "Pending Approval";
            }
            if (this.props.publishedList && (this.props.publishedList[contrib.ref.id] === 'true')) {
                publishedText = "Published";
            }
        }
        
        return (
            <div>
                <div>
                    <h1> Edit Page </h1>
                    <Button onClick={this.handleBeforeButtonClick.bind(this)} variant="contained" color={"primary"}
                            className={classes.button}> Unselect </Button>
                            <Paper className={classes.switchPaper} elevation={3} square={false} color={"primary"}>
                        <FormControlLabel
                            color={"primary"}
                            label={<div><AssignmentLate /> {approvalText}</div>}
                            labelPlacement="start"
                            control={
                                <Switch
                                    disabled={(this.props.publishedList && contrib && (this.props.publishedList[contrib.ref.id] === 'true'))}
                                    checked={(contrib && (contrib.approval === 'pending'))}
                                    onChange={this.handleSwitchChange}
                                    name="approvalSwitch"
                                    color="secondary"
                                />}
                        />
                    </Paper>
                    <Paper className={classes.switchPaper} elevation={3} square={false} color={"primary"}>
                        <FormControlLabel
                            color={"primary"}
                            label=<div><Publish /> {publishedText}</div>
                            labelPlacement="start"
                            control={
                                    <Switch
                                        disabled={!this.props.admin}
                                        name="publishedSwitch"
                                        checked={(this.props.publishedList && contrib &&  (this.props.publishedList[contrib.ref.id] === 'true'))}
                                        onChange={this.handleSwitchChange}
                                        color="secondary"
                                    /> 
                                }
                        />
                    </Paper>
                    <br/>
                    <br/>
                    <Paper className={classes.paper} elevation={3} square={false} classes={{root: classes.cardColor}}>
                        <h2 className={classes.mediaUploadTitle}> Biography</h2>
                        <FormLabel component="legend">Page Name/Title</FormLabel>
                        <TextField
                            id="standard-name"
                            variant="filled"
                            className={classes.textField}
                            defaultValue={(contrib && contrib.name) || ""}
                            onChange={this.handleNameChange}
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <br />
                        <br />
                        <FormLabel component="legend">Page Type</FormLabel>
                        <RadioGroup row
                                    value={(contrib && contrib.type) || ""}
                                    onChange={this.handleCheckBoxChange}>
                            <FormControlLabel
                                value="artist"
                                control={<Radio color="primary"/>}
                                label="Artist Page (Showcase Media)"
                                labelPlacement="start"
                            />
                            <FormControlLabel
                                disabled
                                value="collection"
                                control={<Radio color="primary"/>}
                                label="Collection (Showcase other pages)"
                                labelPlacement="start"
                            />
                        </RadioGroup>
                        <br />
                        <FormLabel component="legend">Bio Photo</FormLabel>
                        <FileUpload fileType="Images"
                            fileIndex={-1}
                            fileDoc={this.props.selectedContribution}
                            bio="true"
                            isPendingApproval={contrib && (contrib.approval === 'pending')}
                        />
                            <br />
                        <FormLabel component="legend">Biography Text</FormLabel>
                        <TextField
                            id="filled-multiline-flexible, filled-full-width"
                            style={{margin: 5}}
                            multiline
                            defaultValue={(contrib && contrib.description && contrib.description.replace(/<br \/>/g, "\n")) || ""}
                            onChange={this.handleBioChange}
                            fullWidth
                            margin="normal"
                            variant="filled"
                            placeholder={"Insert Biography"}
                            className={classes.formWideControl}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                    </Paper>
                    <br/>
                    <br/>
                    <MediaUpload uploadName="Images"
                                isSubpage={contrib && contrib.imagesSubpage}
                                isPendingApproval={contrib && (contrib.approval === 'pending')}
                                collection={this.props.selectedContribution.ref.collection("Images")}
                                onChange={this.handleChildChange}/>
                    <MediaUpload uploadName="Audio"
                                isSubpage={contrib && contrib.audioSubpage}
                                isPendingApproval={contrib && (contrib.approval === 'pending')}
                                collection={this.props.selectedContribution.ref.collection("Audio")}
                                onChange={this.handleChildChange}/>
                    <MediaUpload uploadName="Video"
                                isSubpage={contrib && contrib.videoSubpage}
                                isPendingApproval={contrib && (contrib.approval === 'pending')}
                                collection={this.props.selectedContribution.ref.collection("Video")}
                                onChange={this.handleChildChange}/>
                    <br/>
                    <br/>
                    <Button onClick={this.handleDeleteContribution} startIcon={<Delete />} variant="outlined"
                            className={classes.button}> Delete Contribution </Button>
                    <br/>
                    <br/>
                    <br/>                    
                </div>
            </div>
        );
    }

}

export default withStyles(styles)(EditContributionView);

