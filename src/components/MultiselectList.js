import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Button from '@material-ui/core/Button';

const animatedComponents = makeAnimated();

export default function AnimatedMultiselectList() {

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
        <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            options={companies}
            onChange={handleChange}
        />
        <Button onClick={handleSubmit} color="primary">
            Submit
        </Button>
      </div>
  );
}