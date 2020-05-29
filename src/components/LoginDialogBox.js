import React from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
}));
export default function LoginPortalDialog() {

    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    const [state, setState] = React.useState({
        portal : {
            email: "",
            password: ""
        }
    });

    const resetState = () => {
        setState({
            portal: Object.assign({}, state.portal, {
                email: "",
                password: ""
            }),
        })
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        resetState();
    };

    const handleLogin = () => {
        console.log(state.portal.email);
        console.log(state.portal.password);
        // axios request
        handleClose();
    };

    const handleChange = (event) => {
        setState({
                portal: Object.assign({}, state.portal, {
                [event.target.name]: event.target.value,
            }),
        });
    }

    return (
            <div>
                <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                    Login
                </Button>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" className={classes.root}>
                    
                    <DialogTitle id="form-dialog-title">
                        <IconButton>
                            <VpnKeyIcon />                            
                        </IconButton>
                        Login Portal  
                    </DialogTitle>
                    <DialogContent>
                        <TextField 
                            required 
                            autoFocus 
                            margin="dense" 
                            name="email" 
                            label="Email Address" 
                            type="email" 
                            variant="outlined" 
                            onChange={handleChange} />
                        <TextField 
                            required 
                            autoFocus 
                            margin="dense" 
                            name="password" 
                            label="Password" 
                            type="password" 
                            variant="outlined"
                            onChange={handleChange} />  
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={handleLogin} color="primary">
                            Login
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
}