import React from 'react'
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material'

const GuessLog = ( { guessLog }) => {
  return (
    <Box sx={{ 
      flexGrow: 1, 
      overflowY: 'auto', 
      maxHeight: '300px', 
      width: '300px',
      border: '1px solid gray', 
      padding: 10,
      boxShadow: 10
      }}
      >
      <Typography variant="h4" gutterBottom>
        Guess Log
      </Typography>
      <List>
        {guessLog.map((guess, index) => (
          <ListItem key={index} divider>
            <ListItemText
              primary={`Guess ${index + 1}: ${guess[0]}`}
              secondary={`Correct Numbers: ${guess[1]}, Correct Locations: ${guess[2]}`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default GuessLog