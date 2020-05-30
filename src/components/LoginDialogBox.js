import React from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CancelIcon from '@material-ui/icons/Cancel';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
import Slide from '@material-ui/core/Slide';
import DialogContentText from "@material-ui/core/DialogContentText";
import {useSelector, useDispatch} from 'react-redux'
import actions from '../actions'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
}));
export default function LoginPortalDialog() {

    const isLoggedIn = useSelector(state => state.isLoggedIn)
    const dispatch = useDispatch()

    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const [openSuccessMessage, setOpenSuccessMessage] = React.useState(false)
    const [openErrorMessage, setOpenErrorMessage] = React.useState(false)

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

    const handleClickOpenSuccessMessage = () => {
        setOpenSuccessMessage (true)
    }

    const handleClickOpenErrorMessage = () => {
        setOpenErrorMessage (true)
    }

    const handleClose = () => {
        setOpen(false);
        resetState();
    };

    const handleCloseSuccessMessage = () => {
        setOpenSuccessMessage(false)
        resetState()
        dispatch(actions.signIn())
        console.log(isLoggedIn)
    }

    const handleCloseErrorMessage = () => {
        setOpenErrorMessage(false)
        resetState()
        handleClickOpen()
    }

    const handleLogin = async () => {
        console.log(state.portal.email);
        console.log(state.portal.password);
        // axios request

        const response = await  axios.post('https://webappsvc-investor-buddy.azurewebsites.net/users/login', {
            email: state.portal.email,
            password: state.portal.password
        })

        if (response.status === 200) {
            await handleClickOpenSuccessMessage()
        } else {
            handleClickOpenErrorMessage()
        }

        console.log(response)

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
                <Button variant="filled" color="inherit" onClick={handleClickOpen}>
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
                        <Button 
                            onClick={handleClose} 
                            color="secondary"
                            startIcon={<CancelIcon />}
                            variant="contained">
                            Cancel
                        </Button>
                        <Button 
                            onClick={handleLogin} 
                            color="primary" 
                            endIcon={<ExitToAppIcon />}
                            variant="contained">
                            Login
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={openSuccessMessage}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleCloseSuccessMessage}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="successMessage">{"Login Success"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            Your Login to this Portal was Successful
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseSuccessMessage} color="primary">
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={openErrorMessage}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleCloseErrorMessage}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="successMessage">{"Login Failure"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            Invalid Login Credentails
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseErrorMessage} color="primary">
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
}