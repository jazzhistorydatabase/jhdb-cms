import React, { Component } from 'react';
import Axios from 'axios';

import { CircularProgress, Collapse, TextField, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ArrowDropDown, ArrowDropUp, Publish } from '@material-ui/icons';
import { withStyles } from '@material-ui/styles';

import fb from './firebase';

const styles = theme => ({
	paper: {
		width: '60%',
		marginLeft: 'auto',
		marginRight: 'auto',
		textAlign: 'left',
		padding: 14
	}
});

class UploadView extends Component {

	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			folder: "",
			showPrep: false,
			showFolderEntry: false,
		}

		this.handleFolderChange = this.handleFolderChange.bind(this);
	}

	handleFolderChange(event) {
		this.setState({folder: event.target.value});
	}
  

	render() {

		let spinner = this.state.loading ? <CircularProgress /> : <div />

		return (
			<Paper style={{padding: 20}} elevation={3}>
				<h1>Upload Files to Jazz History Database Contributor System</h1>
				<div>
					<Button fullwidth
							variant="outlined" 
							onClick={() => {
								this.setState({'showPrep': !this.state.showPrep})
							}}
							endIcon={this.state.showPrep ? <ArrowDropUp /> : <ArrowDropDown />}
						>Preparing Materials</Button>
					<Collapse in={this.state.showPrep}>
						<Paper className={this.props.classes.paper} elevation={5}>
							<ol>
								<li>
									<p>Collect all materials you expect to use in your collection in a folder on your computer
									desktop. The folder should be named using the artists full name.<br />
									<code>EXAMPLE: Adam Smith</code>
									</p>
								</li>
								<li>
									<p>Inside of that folder, create sub folders which you will populate with materials you have
									collected. (BE SURE TO INCLUDE THE ARTIST’S NAME on sub-folders):
										<ul>
											<li>Adam Smith Bio (text document NOT a PDF)</li>
											<li>Adam Smith Images (photos, CD covers, Posters, Music Manuscripts, etc)</li>
											<li>Adam Smith Audio (audio from unpublished sources OR from CDs with the</li>
											Artist’s permission). Music clips, radio interviews, etc.
											<li>Adam Smith Video (Classroom interview &amp; Youtube performances or interviews,
											lectures, panel discussions, etc.)</li>
										</ul>
									</p>
								</li>
							</ol>
						</Paper>
					</Collapse>
					<br />
					<Button fullwidth
							variant="outlined" 
							onClick={() => {
								this.setState({'showFolderEntry': !this.state.showFolderEntry})
							}}
							endIcon={this.state.showFolderEntry ? <ArrowDropUp /> : <ArrowDropDown />}
						>Student/Advanced Options</Button>
					<Collapse in={this.state.showFolderEntry}>
						<Paper className={this.props.classes.paper} elevation={5}>
							<Typography>
								If you are a student contributor, please enter your name in the box below. If you are uploading individual files to be added to an existing folder, you can also use this box to specify the folder you would like to upload to (e.g. <code>Adam Smith/Adam Smith Images</code>)
							</Typography>
							<TextField
								variant="filled"
								onChange={this.handleFolderChange}
								label="Folder Name"
								margin="normal"
								InputLabelProps={{
									shrink: true,
								}}
							/>
						</Paper>
					</Collapse>
					<br />
					<Typography id="alert-dialog-description">
						Once you click "Begin Upload", you will be redirected to Dropbox to upload your files. Please be sure to select the "Files from Computer" or "Folders from Computer" button — the "Select from Dropbox" option is for internal use only. Once your files have finished uploading, you can click the back button in your browser to return to the contributor portal and start building pages!
					</Typography>
					<br />
					<Button disabled={this.state.loading} startIcon={<Publish />} variant="contained" color="primary" onClick={() => {
						fb.getToken( token => {
							this.setState({loading: true});
							Axios.post(`/upload`, {
								auth: token,
								folder: this.state.folder,
							}).then(resp => {
								let link = resp.data;
								if(link.startsWith('http')) {
									window.location.href = link;
								} else {
									this.setState({loading: false});
								}
							}).catch( () => {
								this.setState({loading: false});
							});
							});
						}}>
						<label>{"Begin Upload"}</label>
					</Button>
					{spinner}
				</div>
			</Paper>
		);
	}
}

export default withStyles(styles)(UploadView);