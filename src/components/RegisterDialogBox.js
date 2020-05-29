import React from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SendIcon from '@material-ui/icons/Send';
import CancelIcon from '@material-ui/icons/Cancel';
import { makeStyles } from '@material-ui/core/styles';
import MuiPhoneInput from 'material-ui-phone-number';
import TocIcon from '@material-ui/icons/Toc';
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1)
    },
  },
}));
export default function RegistrationFormDialog() {

    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    const [state, setState] = React.useState({
        form : {
            first_name: "",
            last_name: "",
            email: "",
            contact: "",
            password: ""
        }
    });

    const resetState = () => {
        setState({
            form: Object.assign({}, state.form, {
                first_name: "",
                last_name: "",
                email: "",
                contact: "",
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

    const handleSubmit = () => {
        console.log(state.form.first_name);
        console.log(state.form.last_name);
        console.log(state.form.email);
        console.log(state.form.contact);
        console.log(state.form.password);
        // axios request
        handleClose();
    };

    const handleChange = (event) => {
        setState({
                form: Object.assign({}, state.form, {
                [event.target.name]: event.target.value,
            }),
        });
    }

    const handlePhoneChange = (value) => {
        setState({
            form: Object.assign({}, state.form, {
                contact: value,
            }),
        })
    }

    return (
            <div>
                <Button variant="filled" color="inherit" onClick={handleClickOpen}>
                    Register
                </Button>
                <Dialog 
                    open={open} 
                    onClose={handleClose} 
                    aria-labelledby="form-dialog-title" 
                    className={classes.root}>
                    <DialogTitle id="form-dialog-title">
                        <IconButton>
                            <TocIcon />                            
                        </IconButton>
                        Registration Form 
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            To subscribe to investor buddy service, you need to register with all the details required below:
                        </DialogContentText>
                        <TextField 
                            required 
                            autoFocus 
                            margin="dense" 
                            name="first_name" 
                            label="First Name" 
                            type="text" 
                            variant="outlined" 
                            size="small" 
                            width="100" 
                            onChange={handleChange} />
                        <TextField 
                            required 
                            autoFocus 
                            margin="dense" 
                            name="last_name" 
                            label="Last Name" 
                            type="text" 
                            variant="outlined" 
                            size="small" 
                            width="100" 
                            onChange={handleChange} />
                        <MuiPhoneInput 
                            required 
                            defaultCountry="in" 
                            regions={'asia'} 
                            autoFocus 
                            margin="dense" 
                            name="contact" 
                            label="Phone Number" 
                            variant="outlined" 
                            onChange={handlePhoneChange} />
                        <TextField 
                            required 
                            autoFocus 
                            margin="dense" 
                            name="email" 
                            label="Email Address" 
                            type="email" 
                            variant="outlined" 
                            fullWidth 
                            onChange={handleChange} />
                        <TextField 
                            required 
                            autoFocus 
                            margin="dense" 
                            name="password" 
                            label="Password" 
                            type="password" 
                            variant="outlined" 
                            fullWidth 
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
                            onClick={handleSubmit} 
                            color="primary" 
                            endIcon={<SendIcon />}
                            variant="contained">
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
}