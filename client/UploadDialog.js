import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Axios from 'axios';
import fb from './firebase';
import { CircularProgress } from '@material-ui/core';


class UploadDialog extends Component {

	constructor(props) {
		super(props);
		this.state = {
			loading: false,
		}
	}
  

	render() {

		let spinner = this.state.loading ? <CircularProgress /> : <div />

		return (
			<div>
				<Dialog open={this.props.show}
						onClose={this.props.toggle}
						aria-labelledby="alert-dialog-title"
						aria-describedby="alert-dialog-description">
					<DialogTitle id="alert-dialog-title">{"Upload Media to JazzHistoryDatabase Contributor System"}</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							You will be redirected to a page where you can select files from your computer to be uploaded to your secure JHDB Dropbox folder. Please make sure to follow appropriate naming conventions on all files prior to uploading, as you will be unable to rename them once they have been uploaded to the archive.
						</DialogContentText>
						<br />
						<Button disabled={this.state.loading} variant="outlined" color="primary" onClick={() => {
							fb.getToken( token => {
								this.setState({loading: true});
								Axios.get("/upload?auth="+token).then(resp => {
									let link = resp.data;
									if(link.startsWith('http')) {
										window.location.href = link;
									} else {
										console.log(link);
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
					<DialogActions>
						<Button onClick={this.props.toggle} color="primary" autoFocus>
						Cancel
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}

export default UploadDialog;