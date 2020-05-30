import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {Box} from "@material-ui/core";

const animatedComponents = makeAnimated();

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

export default function AnimatedMultiselectList() {

  const classes = useStyles();

  var companies = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
    { value: 'chocolate1', label: 'Chocolate1' },
    { value: 'strawberry2', label: 'Strawberry2' },
    { value: 'vanilla3', label: 'Vanilla3' },
  ];

  const [state, setState] = React.useState({
    selectedList: ''
  });

  const handleSubmit = () => {
        console.log('onSumbit: ', state.selectedList.selectedOption);
    };

  const handleChange = selectedOption => {  
    setState({ selectedList:{selectedOption} });
  };

  return (
      <div>
        <Box p={5} px={12}>
            <Paper className={classes.paper} variant="outlined">
                <Grid 
                    container
                    direction="row"
                    justify="center"
                    alignItems="center">
                        <Grid item xs={8}>
                            <Select
                                closeMenuOnSelect={false}
                                components={animatedComponents}
                                isMulti
                                options={companies}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid>
                            <Button onClick={handleSubmit} color="primary">
                                Submit
                            </Button>
                        </Grid> 
                </Grid>            
            </Paper> 
        </Box>          
      </div>
  );
}