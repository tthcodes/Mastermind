import { Box, Typography, List, ListItem, ListItemText } from '@mui/material'
import { Button } from '@mui/joy'
import { useNavigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import boxStyle from '../styling/BoxStyle'

const Play = () => {
  const navigate = useNavigate();
  const [guess, setGuess] = useState([]);

  return (
    <Box sx={boxStyle}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '94%',
        marginTop: '3%',
        mb: 3
      }}>
        <Button variant="outlined" sx={{ alignSelf: 'flex-start' }} onClick={() => navigate('/instructions')}>
          Back
        </Button>
        <Button variant="outlined" sx={{ alignSelf: 'flex-end' }}>
          Settings
        </Button>
      </Box>
      <Typography variant="h2" component="h1" sx={{ 
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10,
        fontFamily: 'bungee',
        flexGrow: 1,
        mt: -1
        }}>
        Mastermind
      </Typography>
    </Box>
  );
};

export default Play