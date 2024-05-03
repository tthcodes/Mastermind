import React, { useState, useRef, useContext } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import GameContext from '../contexts/GameContext';

// length = numCount, onFormSubmit = callback function for when form submitted
const GuessSubmit = ({ length, onFormSubmit, guessCount }) => {
  const [inputs, setInputs] = useState(Array(length).fill('')); // each el in this array rep each input field
  const inputRefs = useRef([]); // Array of refs to input elements, helps control of FOCUS
  const { maxGuessCount } = useContext(GameContext);

  // Helper func triggered on change event of ANY of the input fields (for user guess boxes)
  const handleInputChange = (index, value) => { // index tracks which input field changed during map func
    const newInputs = [...inputs]; // arr containing previous guess before change

    // Slice is used to only take first character of input string recently passed into targeted input box
    newInputs[index] = value.slice(0, 1); // change number @ passed in index to sliced value (user's new input)
    setInputs(newInputs); // set input state to user's current guess

    // Move to next input field if a value was passed AND current index is not the last input box 
    if (value && index < length - 1) {
      inputRefs.current[index + 1].focus(); // Changes client focus to next input field using useRef hook
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Check that every input field is filled in before submission
      // '' (empty string) = falsy 
    if (inputs.every(input => input)) {

      // Triggers passed in SUBMIT GUESS callback func on submission, 
        // passes in current guess (inputs) as arr of strings
      onFormSubmit(inputs); 
      setInputs(Array(length).fill('')); // Reset inputs after submit

    // Focus the first input text field after submitting. 
      // Conditional checks that the first input element (1st text field) still part of DOM. 
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus(); // If it passes, focus client to first input element 
    }
    } else {
      alert('Please fill all the inputs correctly.');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.3, p: 2 }}
    >
      <Typography variant="h5">Take a Guess!</Typography>
      <Typography 
        variant='subtitle1'
        sx={{
          textAlign: 'center',
          mb: 1,
          fontSize: '1rem'
        }}>
          Guesses Remaining: {maxGuessCount - guessCount}
        </Typography>
      <Box sx={{ display: 'flex', gap: 1, marginBottom: 2 }}>
        {inputs.map((input, index) => (
          <TextField
            key={index} 
            type="text"
            value={input} 
            onChange={e => handleInputChange(index, e.target.value)}
            inputRef={el => inputRefs.current[index] = el}
            inputProps={{ maxLength: 1, style: { textAlign: 'center', width: '40px' } }} // limits input field to 1 number
          />
        ))}
      </Box>
      <Button type="submit" variant="contained">Submit</Button>
    </Box>
  );
};

export default GuessSubmit;