import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles} from '@material-ui/core/styles';
import './App.css';


const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {flexGrow:1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class ButtonAppBar extends Component{
 render(){
   const classes = this.props;
   return (
       <div className = {classes.root}>
         <AppBar position = "static">
           <Toolbar>
             {/*<IconButton className = {classes.menuButton} color = "inherit" aria-label="Menu">*/}
             {/*<MenuIcon />*/}
             {/*</IconButton>*/}
             <Typography variant="h5" align = "left" color = "inherit" className ={classes.grow}>
               Collaborator Portal
               <Typography variant = "h6" align = "left" color = "inherit" className = {classes.grow}>
                 Philly Branch
               </Typography>
             </Typography>
             <div>
               <Button color="inherit">Main Branch </Button>
               <Button color="inherit">Philly Branch  </Button>
             </div>
             <div>
               <Typography color = "inherit" align = "right" className = {classes.grow}> Logged in as: </Typography>
               <Button color="inherit">PhillyAdmin </Button>
               <br/>
             </div>

           </Toolbar>
         </AppBar>
       </div>
   );}

}

export default withStyles(styles) (ButtonAppBar);

