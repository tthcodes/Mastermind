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
        {guessLog.map((el, index) => {
          console.log('given el', el)
          const [guess, correctNums, correctLocations] = el;
          return (
            <ListItem key={index} divider>
              <ListItemText
                primary={`Guess #${index + 1}: ${guess}`}
                secondary={`Correct Numbers: ${correctNums}, Correct Locations: ${correctLocations}`}
              />
            </ListItem>
            )
          })
          .reverse()}
      </List>
    </Box>
  );
}

export default GuessLog