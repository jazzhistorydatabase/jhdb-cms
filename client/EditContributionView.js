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
import RichTextEditor from 'react-rte';

import { Visibility, Save } from '@material-ui/icons';
import { Switch } from '@material-ui/core';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    uploadWidth: {
        width: 600,
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
    formControl: {
        margin: theme.spacing(2),
    },
    rightIcon: {
        marginLeft: theme.spacing(1),
    },
    formWideControl: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 540,
    },
    button2: {
        width: '40%',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    button3: {
        display: 'inline-block',
        width: '200px',
        height: '40px',
        margin: 20,
    },
    saveButton: {
        display: 'block',
        position: 'fixed',
        backgroundColor: 'green',
        height: 60,
        bottom: 100,
        right: 10,
    },
    previewButton: {
        display: 'block',
        position: 'fixed',
        height: 60,
        bottom: 20,
        right: 10,
    },
    approvalPaper: {
        height: 95,
        position: 'fixed',
        width: 100,
        bottom: 95,
        left: 10,
    },
    publishPaper: {
        height: 65,
        position: 'fixed',
        bottom: 20,
        width: 100,
        left: 10,
    },
    reviewOptionLeft: {
        marginLeft: '10%',
    },
    reviewOptionRight: {
        marginRight: '10%',
    },
    cardColor: {
        backgroundColor: '#fce4ec',
    },
    paper: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    mediaUploadTitle: {
        width: '10vw',
        textAlign: 'left',
    }
});

class EditContributionView extends Component {
    handleBeforeButtonClick() {
        if(!this.state.modified || window.confirm("Your unsaved changes will be lost, are you sure?")) {
            this.props.windowSwap();
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            contribName: '',
            contribType: '',
            contribBio: '',
            mediaProcess: '',
            contentEditing: '',
            contributionData: null,
            modified: false,
        };
        
        this.handleNameChange = event => {
            let data = this.state.contributionData;
            if ((data && (data.approval === 'pending'))) {
                window.alert("Please rescind your request for approval before making changes.");
            } else {
                data.name = event.target.value;
                this.setState({contributionData: data, modified: true});
            }
        };

        this.handleCheckBoxChange = event => {
            let data = this.state.contributionData;
            if ((data && (data.approval === 'pending'))) {
                window.alert("Please rescind your request for approval before making changes.");
            } else {
                data.type = event.target.value;
                this.setState({contributionData: data, modified: true});
            }
        };
        this.handleBioChange = value => {
            let data = this.state.contributionData || {};
            if ((data && (data.approval === 'pending'))) {
                window.alert("Please rescind your request for approval before making changes.");
            } else {
                data.description = value;
                this.setState({contributionData: data, modified: true});
            }
        };
        this.handleEndBoxChange = name => event => {
            this.setState({[name]: event.target.checked});
        };
    
        this.handleChildChange = newState => {
            let contrib = this.state.contributionData;
            if ((contrib && (contrib.approval === 'pending'))) {
                window.alert("Please rescind your request for approval before making changes.");
            } else {
                Object.keys(newState).forEach(key => {
                    contrib[key] = newState[key];
                });
                this.setState({contributionData: contrib, modified: true});
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
            if(this.state.modified) {
                window.alert("You have unsaved changes! Please save or revert before requesting review or publishing.");
                return;
            }
            if (event.target.name === 'publishedSwitch') {
                if (!this.props.admin) {
                    console.log("Attempt to publish without admin credentials!");
                    return;
                } else if (event.target.checked) {
                    if (window.confirm('Are you sure you want to publish "' + contributionData.name +
                            '"?\n\nThis will make it publicly accessible via the Jazz History Database ' +
                            'website. You may visit your published contribution by clicking the ' + 
                            '"Published" button next to the contribution name in the "My Collections" page.')) {
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
            this.setState({ contributionData: contributionData, modified: true });
        };
    }

    save() {
        let data = this.state.contributionData || {};
        data.description = (data.description || RichTextEditor.createEmptyValue()).toString('html');
        this.setState({contributionDataPub: data, modified: false});
    }

    reset(checkWithUser=false) {
        if(!checkWithUser || window.confirm("Revert all unsaved changes? This can not be undone!")) {
            let data = this.state.contributionDataPub || {};
            data.description = RichTextEditor.createValueFromString(data.description || "");
            this.setState({contributionData: data, modified: false});
        }
    }

    componentDidMount() {
        if (this.props.selectedContribution && this.props.selectedContribution.ref) {
            fb.base.syncDoc(this.props.selectedContribution.ref.path, {
                context: this,
                state: 'contributionDataPub',
                withRefs: true,
                then() {
                    this.reset();
                }
            });
        }
    }

    render() {
        const classes = this.props.classes;
        const contrib = this.state.contributionData || {};
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

        const rteConfig = {
            // Optionally specify the groups to display (displayed in the order listed).
            display: [],//['INLINE_STYLE_BUTTONS', 'LINK_BUTTONS', 'HISTORY_BUTTONS'],
            INLINE_STYLE_BUTTONS: [
              {label: 'Bold', style: 'BOLD', className: 'custom-css-class'},
              {label: 'Italic', style: 'ITALIC'},
              {label: 'Underline', style: 'UNDERLINE'}
            ]
          };

        return (
            <div>
                <div>
                    <h1> Contribution </h1>
                    <Button onClick={this.handleBeforeButtonClick.bind(this)} variant="outlined" color={"primary"}
                            className={classes.button}> Back </Button>
                    <br/>
                    <TextField
                        id="standard-name"
                        label="Collection Title"
                        className={classes.textField}
                        value={(contrib && contrib.name) || ""}
                        onChange={this.handleNameChange}
                        margin="normal"
                    />
                    <FormControl component={"fieldset"} className={classes.formControl}>
                        <FormLabel component="legend"> Collection Type</FormLabel>
                        <RadioGroup row
                                    value={(contrib && contrib.type) || ""}
                                    onChange={this.handleCheckBoxChange}>
                            <FormControlLabel
                                value="artist"
                                control={<Radio color="primary"/>}
                                label="Artist Type"
                                labelPlacement="start"
                            />
                            <FormControlLabel
                                value="collection"
                                control={<Radio color="primary"/>}
                                label="Collection"
                                labelPlacement="start"
                            />
                        </RadioGroup>
                    </FormControl>
                    <br/>
                    <FormControl className={classes.uploadWidth}>
                        <Paper className={classes.paper} elevation={3} square={false} classes={{root: classes.cardColor}}>
                            <h2 className={classes.mediaUploadTitle}> Bio</h2>
                            <FormLabel component="legend"> Bio Photo</FormLabel>
                            <FileUpload fileType="Images"
                                fileIndex={-1}
                                fileDoc={this.props.selectedContribution}
                                bio="true"
                                isPendingApproval={contrib && (contrib.approval === 'pending')}
                            />
                            <FormLabel>Biography</FormLabel>
                            <RichTextEditor id="standard-name"
                                    style={{margin: 5}}
                                    className={classes.formWideControl}
                                    value={((contrib && contrib.description) || RichTextEditor.createEmptyValue())}
                                    onChange={this.handleBioChange}
                                    margin="normal"
                                    placeholder={"Insert Biography"}
                                    toolbarConfig={rteConfig} 
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                            />
                        </Paper>
                    </FormControl>
                    <br/>
                    <br/>
                    <FormControl className={classes.uploadWidth}>
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
                    </FormControl>
                    <br/>
                    <br/>
                    <br/>
                    <Button onClick={this.handleDeleteContribution} variant="outlined" color={"primary"}
                            className={classes.button}> Delete Contribution </Button>
                    <br/>
                    <br/>
                    <br/>
                    <Button variant="contained"
                            color="primary"
                            disabled={!this.state.modified}
                            className={classes.saveButton}
                            startIcon={<Save />}
                            onClick={this.save.bind(this)}>
                                Save 
                    </Button>
                    <Button variant="contained"
                            color={"primary"}
                            className={classes.previewButton}
                            startIcon={<Visibility />}
                            href={"/preview/"+this.props.selectedContribution.name.toLowerCase().replace(/ /g, "-")}>
                                Preview 
                    </Button>
                    <Paper className={classes.approvalPaper} elevation={3} square={false} color={"primary"}>
                        <FormControlLabel
                            color={"primary"}
                            label={approvalText}
                            labelPlacement="bottom"
                            control={
                                <Switch
                                    disabled={(this.props.publishedList && contrib && (this.props.publishedList[contrib.ref.id] === 'true'))}
                                    // !! converts undefined to false so switch doesn't get switched to uncontrolled by accident
                                    checked={!!(contrib && (contrib.approval === 'pending'))}
                                    onChange={this.handleSwitchChange}
                                    name="approvalSwitch"
                                    color="secondary"
                                />}
                        />
                    </Paper>
                    <Paper className={classes.publishPaper} elevation={3} square={false} color={"primary"}>
                        <FormControlLabel
                            color={"primary"}
                            label={publishedText}
                            labelPlacement="bottom"
                            control={
                                this.props.admin ? 
                                    <Switch
                                        name="publishedSwitch"
                                        checked={!!(this.props.publishedList && contrib && (this.props.publishedList[contrib.ref.id] === 'true'))}
                                        onChange={this.handleSwitchChange}
                                        color="secondary"
                                    /> :
                                    <Switch
                                        disabled
                                        name="publishedSwitch"
                                        checked={!!(this.props.publishedList && contrib &&  (this.props.publishedList[contrib.ref.id] === 'true'))}
                                        color="secondary"
                                    /> 
                                }
                        />
                    </Paper>
                </div>
            </div>
        );
    }

}

export default withStyles(styles)(EditContributionView);

