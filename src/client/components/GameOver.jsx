// Game Over Page
import React from 'react';
import { Box, Typography } from '@mui/material'
import { Button } from '@mui/joy'
import containerStyle from '../styling/containerStyling';
import { useLocation, useNavigate } from 'react-router-dom'

const GameOver = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Access passed state from Play page to manipulate game over message
  const { winner, message } = location.state || {};

  // Change color and background color based on win condition
  const backgroundColor = winner ? 'mintcream' : 'mistyrose'; 
  const color = winner ? 'forestgreen' : 'firebrick'; 

  return (
    <Box sx = {{
      ...containerStyle,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      p: 2,
      backgroundColor: backgroundColor,
      color: color,
    }}>
        <Typography variant = 'h6' sx={{ fontSize: '1.5rem', mb: 3}}>
          {message}
        </Typography>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '30%',
          marginTop: '3%',
          mb: 3,
        }}>
          <Button size="sm" variant="outlined" onClick={() => navigate('/play')} sx={{
            borderColor: color,
            color: color,
            '&:hover': {
              backgroundColor: color,
              color: 'white'
                }
            }}>
            Play Again
          </Button>
          <Button size="sm" variant="outlined" onClick={() => navigate('/')} sx={{
            borderColor: color,
            color: color,
            '&:hover': {
              backgroundColor: color,
              color: 'white'
                }
            }}>
            Home
          </Button>
        </Box>
    </Box>
  );
};

export default GameOver;