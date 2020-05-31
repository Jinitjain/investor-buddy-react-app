import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {Box} from "@material-ui/core";
import companies from '../data/companyDatafinal.json'
import axios from 'axios'
import {useHistory} from 'react-router-dom'

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

const user = localStorage.getItem('user')

export default function AnimatedMultiselectList() {

  const classes = useStyles();
  const history = useHistory();

  const [state, setState] = React.useState({
    selectedList: ''
  });

  const handleSubmit = async () => {
      let companiesArray = []
        // console.log('onSumbit: ', state.selectedList.selectedOption);
        state.selectedList.selectedOption.forEach(obj => {
            console.log(obj.value+'.NS')
            companiesArray.push(obj.value+'.NS')
        })

        console.log(companiesArray)

      const response = await axios.post('https://webappsvc-investor-buddy.azurewebsites.net/users/makeRelation', {
          user: user,
          org: companiesArray
      })

      if(response.status === 200) {
          console.log("Done")
          history.push('/multiselectlist')
      }
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