import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Axios from 'axios';
import fb from './firebase';

export default function UploadDialog(props) {
  return (
    <div>
      <Dialog
        open={props.show}
        onClose={props.toggle}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Upload Media to JazzHistoryDatabase Contributor System"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please select one or more files from your computer to upload.
            <input type="file" id="jhdbfilesuin" multiple/>
            <br />
            <br />
            <Button color="inherit" onClick={() => {
                fb.getToken( token => {
                    let reader = new FileReader();
                    let file = document.getElementById("jhdbfilesuin").files[0];

                    Axios.get("/upload?auth="+token).then(resp => {
                        let link = resp.data;
                        console.log(file);
                        Axios.post(link, file, {
                            headers: {
                              'content-type': 'application/octet-stream'
                            }
                          }).then(x => {console.log(x)}).catch(err => {console.log(err)});
                    })
                });
              }}>
              <label>{"Begin Upload"}</label>
            </Button>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.toggle} color="primary" autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}