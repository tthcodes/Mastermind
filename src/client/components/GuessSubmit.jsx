import React, { useState, useRef } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

const GuessSubmit = ({ title, length, onFormSubmit }) => {
  const [inputs, setInputs] = useState(Array(length).fill(''));
  const inputRefs = useRef([]);

  const handleInputChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index] = value.slice(0, 1); // Ensure only the first character is taken, no more
    setInputs(newInputs);

    // Move to next input if necessary
    if (value && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputs.every(input => input)) {
      onFormSubmit(inputs);
      setInputs(Array(length).fill('')); // Reset inputs after submit
    } else {
      alert('Please fill all the inputs correctly.');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, p: 2 }}
    >
      <Typography variant="h5">{title}</Typography>
      <Box sx={{ display: 'flex', gap: 1 }}>
        {inputs.map((input, index) => (
          <TextField
            key={index}
            type="text"
            value={input}
            onChange={e => handleInputChange(index, e.target.value)}
            inputRef={el => inputRefs.current[index] = el}
            inputProps={{ maxLength: 1, style: { textAlign: 'center', width: '40px' } }}
          />
        ))}
      </Box>
      <Button type="submit" variant="contained">Submit</Button>
    </Box>
  );
};

export default GuessSubmit;