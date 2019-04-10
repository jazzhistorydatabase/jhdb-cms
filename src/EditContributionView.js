import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import MediaUpload from "./MediaUpload";
import Paper from "@material-ui/core/Paper";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import 'typeface-roboto';
import fb from "./firebase";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#c51162',
        } ,
    },

});

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
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
        margin: theme.spacing.unit * 2,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    formWideControl: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 600,
    },
    button2: {
        width: 200,
    },
    button3: {
        margin: 20,
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
            contributionData: null
        };
    }

    handleNameChange = event => {
        let data = this.state.contributionData;
        data.name = event.target.value;
        this.setState({contributionData: data});
    };

    handleCheckBoxChange = event => {
        let data = this.state.contributionData;
        data.type = event.target.value;
        this.setState({contributionData: data});
    };
    handleBioChange = event => {
        let data = this.state.contributionData;
        data.description = event.target.value;
        this.setState({contributionData: data});
    };
    handleEndBoxChange = name => event => {
        this.setState({[name]: event.target.checked});
    };

    componentWillMount() {
        console.log(this.props && this.props.selectedContribution);
        console.log(fb.base);
        if (this.props.selectedContribution && this.props.selectedContribution.ref) {
            fb.base.syncDoc(this.props.selectedContribution.ref.path, {
                context: this,
                state: 'contributionData',
                withRefs: true
            });
            console.log(this.state.contributionData);
        }
    }

    render() {
        const classes = this.props.classes;
        const contrib = this.state.contributionData;
        const {mediaProcess, contentEditing} = this.state;
        return (
            <MuiThemeProvider theme={theme}>
            <div>
                <h1> Contribution </h1>
                <Button onClick={this.handleBeforeButtonClick.bind(this)} variant="outlined" color={"primary"}
                        className={classes.button}> Back </Button>
                <br/>
                <TextField
                    id="standard-name"
                    label="Contribution Title"
                    className={classes.textField}
                    value={contrib && contrib.name || ""}
                    onChange={this.handleNameChange}
                    margin="normal"
                />
                <FormControl component={"fieldset"} className={classes.formControl}>
                    <FormLabel component="legend"> Contribution Type</FormLabel>
                    <RadioGroup row
                                value={contrib && contrib.type || ""}
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
                <FormControl>
                    <TextField
                        id="filled-multiline-flexible, filled-full-width"
                        label="Biography"
                        style={{margin: 5}}
                        multiline
                        value={contrib && contrib.description || ""}
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
                    <Button variant="contained" size="small" color="default" className={classes.button2}>
                        Upload Bio Photo
                        <CloudUploadIcon className={classes.rightIcon}/>
                    </Button>
                </FormControl>
                <br/>
                <FormControl className={classes.uploadWidth}>
                    <MediaUpload uploadName="Images"/>
                    <MediaUpload uploadName="Audio"/>
                    <MediaUpload uploadName="Video"/>
                </FormControl>
                <br/>
                <FormControl className={classes.uploadWidth}>
                    <br/>
                    <Paper className={classes.paper} elevation={3} square={false}>
                        <FormGroup row>
                            <FormControlLabel
                                control={
                                    <Checkbox checked={mediaProcess} onChange={this.handleEndBoxChange('mediaProcess')}
                                              value="Media Processing"/>
                                }
                                label="Additional Media Processing Required"/>
                            <FormControlLabel
                                control={
                                    <Checkbox checked={contentEditing}
                                              onChange={this.handleEndBoxChange('contentEditing')}
                                              value="Content Editing"/>}
                                label="Additional Content Editing Required"/>
                        </FormGroup>
                        <FormGroup row>
                            <Button variant="contained" color="primary" className={classes.button3}>
                                Submit for Review
                            </Button>
                            <Button variant="contained" color="primary" className={classes.button3}>
                                Preview
                            </Button>
                            <Button variant="contained" color="primary" className={classes.button3}>
                                Save
                            </Button>
                        </FormGroup>
                    </Paper>
                </FormControl>
            </div>
            </MuiThemeProvider>
        );
    }

}

export default withStyles(styles)(EditContributionView);

