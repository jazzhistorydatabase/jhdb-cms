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

import { Visibility } from '@material-ui/icons';
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
        this.props.windowSwap();
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
            approvalSwitch: false,
            publishedSwitch: false,
            publishedList: null,
        };
        
        this.handleNameChange = event => {
            let data = this.state.contributionData;
            data.name = event.target.value;
            this.setState({contributionData: data});
        };
    
        this.handleCheckBoxChange = event => {
            let data = this.state.contributionData;
            data.type = event.target.value;
            this.setState({contributionData: data});
        };
        this.handleBioChange = event => {
            let data = this.state.contributionData;
            data.description = event.target.value;
            this.setState({contributionData: data});
        };
        this.handleEndBoxChange = name => event => {
            this.setState({[name]: event.target.checked});
        };
    
        this.handleChildChange = newState => {
            let contrib = this.state.contributionData;
            Object.keys(newState).forEach(key => {
                contrib[key] = newState[key];
            });
            this.setState({contributionData: contrib});
        }

        this.handleSwitchChange = (event) => {
            let contributionData = this.state.contributionData;
            let publishedList = this.state.publishedList;
            let publishedSwitch = this.state.publishedSwitch;
            let approvalSwitch = this.state.approvalSwitch;
            if (event.target.name === 'publishedSwitch') {
                if (!this.props.admin) {
                    console.log("Attempt to publish without admin credentials!");
                    return;
                } else if (event.target.checked) {
                    contributionData.status = "published";
                    contributionData.approval = "approved";
                    approvalSwitch = false;
                    publishedSwitch = true;
                    publishedList[contributionData.ref.id] = 'true';
                } else {
                    contributionData.status = "unpublished";
                    contributionData.approval = "not requested";
                    approvalSwitch = false;
                    publishedSwitch = false;
                    publishedList[contributionData.ref.id] = 'false';
                }
            } else if (event.target.name === 'approvalSwitch') {
                contributionData.approval = (event.target.checked) ? "pending" : "not requested";
                approvalSwitch = event.target.checked;
            } else {
                console.log("Something called this function...but what??");
                return;
            }
            this.setState({
                contributionData: contributionData,
                publishedSwitch: publishedSwitch,
                approvalSwitch: approvalSwitch,
                publishedList: publishedList,
            });
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
        if (this.props.publishedList) {
            fb.base.syncDoc(this.props.publishedList.ref.path, {
                context: this,
                state: 'publishedList',
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
            if (this.state.publishedList && (this.state.publishedList[contrib.ref.id] === 'true')) {
                publishedText = "Published";
            }
        }
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
                            />
                            <TextField
                                id="filled-multiline-flexible, filled-full-width"
                                label="Biography"
                                style={{margin: 5}}
                                multiline
                                value={(contrib && contrib.description) || ""}
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
                    </FormControl>
                    <br/>
                    <br/>
                    <FormControl className={classes.uploadWidth}>
                        <MediaUpload uploadName="Images"
                                    isSubpage={contrib && contrib.imagesSubpage}
                                    collection={this.props.selectedContribution.ref.collection("Images")}
                                    onChange={this.handleChildChange}/>
                        <MediaUpload uploadName="Audio"
                                    isSubpage={contrib && contrib.audioSubpage}
                                    collection={this.props.selectedContribution.ref.collection("Audio")}
                                    onChange={this.handleChildChange}/>
                        <MediaUpload uploadName="Video"
                                    isSubpage={contrib && contrib.videoSubpage}
                                    collection={this.props.selectedContribution.ref.collection("Video")}
                                    onChange={this.handleChildChange}/>
                    </FormControl>
                    <br/>
                    <br/>
                    <br/>
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
                                    checked={(contrib && (contrib.approval === 'pending')) || this.state.approvalSwitch}
                                    onChange={this.handleSwitchChange}
                                    name="approvalSwitch"
                                    color="secondary"
                                /> }
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
                                        checked={(this.state.publishedList && (this.state.publishedList[contrib.ref.id] === 'true')) || this.state.publishedSwitch}
                                        onChange={this.handleSwitchChange}
                                        color="secondary"
                                    /> :
                                    <Switch
                                        disabled
                                        name="publishedSwitch"
                                        checked={(this.state.publishedList && (this.state.publishedList[contrib.ref.id] === 'true')) || this.state.publishedSwitch}
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

