import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import LoginDialogBox from './LoginDialogBox.js'
import RegisterDialogBox from './RegisterDialogBox.js'
import {useSelector, useDispatch} from 'react-redux'
import actions from "../actions";
import {Link, BrowserRouter as Router} from 'react-router-dom'
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  const isLoggedIn = useSelector(state => state.isLoggedIn)
  const dispatch = useDispatch()

  const handleClickOpen = () => {
    dispatch(actions.signOut())
    localStorage.setItem('user', '');
    console.log(isLoggedIn)
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{background:"#009688"}} >
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title} >
            Investor Buddy
          </Typography>
          {!isLoggedIn ? <LoginDialogBox /> : ''}
          {!isLoggedIn ? <RegisterDialogBox /> : ''}
          {isLoggedIn ?
            <Button variant="filled" color="inherit" onClick={handleClickOpen}>
              LogOut
            </Button>
          : ''}

          {isLoggedIn ?
                  <Button variant="filled" color="inherit">
                    <Link to='/table'>
                    Table
                    </Link>
                  </Button>
                
              : ''}

            {isLoggedIn ?
                  <Button variant="filled" color="inherit">
                    <Link to='/alltable'>
                    All Companies
                    </Link>
                  </Button>
              : ''}
        </Toolbar>
      </AppBar>
    </div>
  );
}
