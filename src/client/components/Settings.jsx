import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { Button } from '@mui/joy'; 
import Typography from '@mui/material/Typography';
import GameContext from '../contexts/GameContext';
import containerStyle from '../styling/containerStyling';

const Settings = () => {
  const navigate = useNavigate();
  const { setNumCount, setMinNum, setMaxNum, setMaxGuessCount, numCount, maxGuessCount, minNum, maxNum } = useContext(GameContext);

  // Initialize local setting values before save
  const [localNumCount, setLocalNumCount] = useState(4);
  const [localMaxGuessCount, setLocalMaxGuessCount] = useState(10);
  const [localMinNum, setLocalMinNum] = useState(0);
  const [localMaxNum, setLocalMaxNum] = useState(7);
  const [error, setError] = useState('');

  // UseEffect to present current settings saved from game context
  useEffect(() => {
    setLocalNumCount(numCount);
    setLocalMaxGuessCount(maxGuessCount);
    setLocalMinNum(minNum);
    setLocalMaxNum(maxNum);
  }, [numCount, maxGuessCount, minNum, maxNum]);

  const handleIncrement = (value, setValue, max) => {
    if (value < max) setValue(value + 1);
  };

  const handleDecrement = (value, setValue, min) => {
    if (value > min) setValue(value - 1);
  };

  const handleSave = () => {

    // Don't allow user to save settings if local minNum allowed >= local maxNum allowed
    if (localMinNum >= localMaxNum) {
      setError('Minimum value must be less than the maximum value.');
      return;
    }

    // Update game context using local values if save button clicked
    setNumCount(localNumCount);
    setMaxGuessCount(localMaxGuessCount);
    setMinNum(localMinNum);
    setMaxNum(localMaxNum);
    setError(null)

    alert('Settings saved!');
  };

  return (
    <Box sx={{
      ...containerStyle,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      }}>
      <Box sx={{ 
        padding: 4, 
        maxWidth: 500, 
        margin: 'auto',
        display: 'flex', 
        flexDirection: 'column', gap: 2 }}>

        <Typography variant="h4" gutterBottom sx={{ 
          textDecoration: 'underline',
          textAlign: 'center',
          fontWeight: 'bold'
          }}>
            Game Settings
        </Typography>

        <Box display="flex" alignItems="center">
          <Typography sx={{ width: '60%' }}>Number of digits in combination:</Typography>
          <Button onClick={() => handleDecrement(localNumCount, setLocalNumCount, 2)}>-</Button>
          <Typography sx={{ marginX: 2 }}>{localNumCount}</Typography>
          <Button onClick={() => handleIncrement(localNumCount, setLocalNumCount, 6)}>+</Button>
        </Box>

        <Box display="flex" alignItems="center">
          <Typography sx={{ width: '60%' }}>Maximum number of guesses:</Typography>
          <Button onClick={() => handleDecrement(localMaxGuessCount, setLocalMaxGuessCount, 1)}>-</Button>
          <Typography sx={{ marginX: 2 }}>{localMaxGuessCount}</Typography>
          <Button onClick={() => handleIncrement(localMaxGuessCount, setLocalMaxGuessCount, 20)}>+</Button>
        </Box>

        <Box display="flex" alignItems="center">
          <Typography sx={{ width: '60%' }}>Smallest value of any single digit:</Typography>
          <Button onClick={() => handleDecrement(localMinNum, setLocalMinNum, 0)}>-</Button>
          <Typography sx={{ marginX: 2 }}>{localMinNum}</Typography>
          <Button onClick={() => handleIncrement(localMinNum, setLocalMinNum, 8)}>+</Button>
        </Box>

        <Box display="flex" alignItems="center">
          <Typography sx={{ width: '60%' }}>Highest value of any single digit:</Typography>
          <Button onClick={() => handleDecrement(localMaxNum, setLocalMaxNum, 1)}>-</Button>
          <Typography sx={{ marginX: 2 }}>{localMaxNum}</Typography>
          <Button onClick={() => handleIncrement(localMaxNum, setLocalMaxNum, 9)}>+</Button>
        </Box>

        <Button onClick={handleSave} variant="outlined" sx={{ mt: 3 }}>Save Settings</Button>

      </Box>

      {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
      <Box sx={{
        width: '100%',
        p: 3,
        textAlign: 'left', // Align the button to the left,
        marginLeft: '30px'
      }}>
        <Button variant="outlined" onClick={() => navigate(-1)} >
          Back
        </Button>
      </Box>
    </Box>
  );
};

export default Settings;