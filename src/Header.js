import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';

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

function ButtonAppBar(props){
  const { classes } = props;
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
  );
}
ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles) (ButtonAppBar);

// class Header extends Component {
//   render() {
//     return (
//       <div className="Header">
//       <h1>Contributor Portal</h1>
//         <h2> Philadelphia Branch</h2>
//       </div>
//     );
//   }
// }
//
// export default Header;
