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
    button: {
        width: 200,
    }
});

class EditContributionView extends Component {
    handleBeforeButtonClick() {
        this.props.windowSwap();
    }

    state = {
        contribName: '',
        contribType: '',
        contribBio: '',
    };

    handleNameChange =  event => {
        this.setState({ contribName: event.target.value });
    };

    handleCheckBoxChange =  event => {
        this.setState({ contribType: event.target.value});
    };
    handleBioChange = event => {
        this.setState({contribBio: event.target.value});
    };

    render() {
        const classes = this.props.classes;

        return (
            <div>
                <h1> Edit Contribution </h1>
                <Button onClick={this.handleBeforeButtonClick.bind(this)} variant="outlined" color={"primary"}
                className={classes.button}> Back </Button>
                <br/>
                <TextField
                    id="standard-name"
                    label="Contribution Title"
                    className={classes.textField}
                    value={this.state.contribName}
                    onChange={this.handleNameChange}
                    margin="normal"
                />
                <FormControl component={"fieldset"} className={classes.formControl}>
                <FormLabel component = "legend"> Contribution Type</FormLabel>
                <RadioGroup row
                    value={this.state.contribType}
                    onChange={this.handleCheckBoxChange}
                >
                    <FormControlLabel
                        value="artist type"
                        control={<Radio color="primary" />}
                        label="Artist Type"
                        labelPlacement="start"
                    />
                    <FormControlLabel
                        value="collection"
                        control={<Radio color="primary" />}
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
                    style={{ margin: 5 }}
                    multiline
                    value={this.state.contribBio}
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
                <Button variant="contained" size="small" color="default" className={classes.button}>
                    Upload Bio Photo
                    <CloudUploadIcon className={classes.rightIcon} />
                </Button>
                </FormControl>


                </div>

        );
    }

}

export default withStyles(styles)(EditContributionView);

