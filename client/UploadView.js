import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Axios from 'axios';
import fb from './firebase';
import { Typography, TextField } from '@material-ui/core';
import { CircularProgress, Card } from '@material-ui/core';


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
				<Card style={{marginTop: 50, marginBotton: 50, padding: 20}}>
					<DialogTitle id="alert-dialog-title">{"Upload Media to JazzHistoryDatabase Contributor System"}</DialogTitle>
					<DialogContent>
						<Typography id="alert-dialog-description">
							You will be redirected to a page where you can select files from your computer to be uploaded to your secure JHDB Dropbox folder. Please make sure to follow appropriate naming conventions on all files prior to uploading, as you will be unable to rename them once they have been uploaded to the archive.
						</Typography>
						<br />
						<Typography>
							If you would like your media to be uploaded to a subfolder, please enter the name here (e.g. entering "<code>John Doe</code>" will upload to "<code>{this.props.user.displayName}/John Doe</code>")
						</Typography>
						<br />
						<Typography>
							You can add additional subfolders with "<code>/</code>" - e.g. if you would like an Images folder under the John Doe folder, you could enter "<code>John Doe/Images</code>"
						</Typography>
						<TextField
							onChange={this.handleFolderChange}
							label="Subfolder Name"
							margin="normal"
							InputLabelProps={{
								shrink: true,
							}}
                        />
						<br />
						<Button disabled={this.state.loading} variant="outlined" color="primary" onClick={() => {
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
				</Card>
			</div>
		);
	}
}

export default UploadView;