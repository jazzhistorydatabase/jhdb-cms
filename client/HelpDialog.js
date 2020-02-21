import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function HelpDialog(props) {
//   const [open, setOpen] = React.useState(false);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

  return (
    <div>
      <Dialog
        open={props.show}
        onClose={props.toggle}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"JazzHistoryDatabase CMS Project"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Content management system developed by the JazzHistoryDatabase CMS team. 
            Sponsored by <a href="https://global-lab.wpi.edu">The Global Lab at WPI</a>.
            <br/>                     
            Questions? Technical difficulties? Email 
                <a href="mailto:gr-jhdb-dev@wpi.edu">gr-jhdb-dev@wpi.edu</a>
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