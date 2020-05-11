import React from 'react';
import { Button, Link, Typography } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function HelpDialog(props) {

  return (
    <div>
      <Dialog
        open={props.show}
        onClose={props.toggle}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{"Jazz History Database Global Contributor Project"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Created by Mikel Matticoli and Lucas Varella. 
            Questions? Technical difficulties? Email us at <Link href="mailto:global@jazzhistorydatabase.com">global@jazzhistorydatabase.com</Link>
            <br/>                     
            <br/>                     
            <Typography variant="h5">Special Thanks:</Typography>
            <br/>                     
            <Link href="https://jazzhistorydatabase.com">Rich Falco, JHDB Founder</Link>
            <Link href="https://www.linkedin.com/in/mikedrnek/">Mike Drnek, JHDB Lab Admin</Link>
            <Link href="https://keithzizza.com">Keith Zizza, IQP Advisor</Link>
            <Link href="https://www.charlie-roberts.com/">Charlie Roberts, Prototype ISP Advisor</Link>
            <Link href="https://imgd.wpi.edu">Interactive Media & Game Development</Link>
            <Link href="https://global-lab.wpi.edu">The Global Lab at WPI</Link>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.toggle} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}