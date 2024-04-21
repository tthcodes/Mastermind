import React from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/joy';  
import containerStyle from '../styling/containerStyling';

const Instructions = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{
      ...containerStyle,
      display: 'flex'
    }}>
      <Box sx={{
        marginTop: '11vh'
      }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3, textAlign: 'center', textDecoration: 'underline'}}>
        Game Instructions
      </Typography>
      <List sx={{ width: '100%', maxWidth: 480, textAlign: 'center'}}>
        <ListItem>
          <ListItemText primary="1. Start the game by clicking the 'Start' button." />
        </ListItem>
        <ListItem>
          <ListItemText primary="2. Guess the correct sequence of numbers, which is randomly generated every game. Numbers will range from 0 -> 7. There CAN be duplicates." />
        </ListItem>
        <ListItem>
          <ListItemText primary="3. You have a limited number of attempts to guess correctly." />
        </ListItem>
        <ListItem>
          <ListItemText primary="4. Feedback will be provided after each guess." />
        </ListItem>
        <ListItem>
          <ListItemText primary="5. Use the feedback to make better guesses." />
        </ListItem>
        <ListItem>
          <ListItemText primary="6. Have fun! :)" />
        </ListItem>
      </List>
      </Box>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '94%',
        marginTop: '3%',
        mb: 3
      }}>
        <Button variant="outlined" onClick={() => navigate('/')}>
          Back
        </Button>
      </Box>
    </Box>
  );
};

export default Instructions;
