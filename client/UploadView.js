import React, { Component } from 'react';
import Axios from 'axios';

import { CircularProgress, TextField, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Publish } from '@material-ui/icons';

import fb from './firebase';


class UploadView extends Component {

	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			folder: "",
		}

		this.handleFolderChange = this.handleFolderChange.bind(this);
	}

	handleFolderChange(event) {
		this.setState({folder: event.target.value});
	}
  

	render() {

		let spinner = this.state.loading ? <CircularProgress /> : <div />

		return (
			<div>
				<DialogTitle id="alert-dialog-title">{"Upload Media to Jazz History Database Contributor System"}</DialogTitle>
				<DialogContent>
					<Typography>
						If you would like your files to be uploaded to a folder, please enter the folder name below (e.g. entering "<code>John Doe</code>" (without the quotes) will upload to "<code>{this.props.user.displayName}/John Doe</code>"). We recommend organizing your files into folders by artist or page.
					</Typography>
					<br />
					<Typography id="alert-dialog-description">
						Once you click "Begin Upload", you will be redirected to Dropbox to upload your files. Please be sure to select the "Browse from Computer" button — the "Select from Dropbox" option is for internal use only. Once your files have finished uploading, you can click the back button in your browser to return to the contributor portal and upload files to a different folder, or start building pages!
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
				</DialogContent>
			</div>
		);
	}
}

export default UploadView;