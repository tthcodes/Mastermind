import React from 'react'
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material'

const GuessLog = ( { guessLog }) => {
  return (
    <Box sx={{ 
      flexGrow: 1, 
      overflowY: 'auto', 
      maxHeight: '300px', 
      height: '500px',
      width: '400px',
      border: '1px solid gray', 
      padding: 2,
      boxShadow: 10
      }}
      >
      <Typography 
        variant="h5"
        gutterBottom
        sx={{
          textAlign: 'center',
          fontFamily: 'bungee',
          flexGrow: 1
        }}>
        Guess Log
      </Typography>
      <List>
        {guessLog.map((el, index) => {
          const [guess, correctNums, correctLocations] = el; // el = [[curr guess arr], correctNums, correctLocations]
          let secondary;
          if(correctNums === 0) {
            secondary = 'All numbers incorrect.'
          } else {
            secondary = `Correct Numbers: ${correctNums}, Correct Locations: ${correctLocations}`
          };
          return (
            <ListItem key={index} divider>
              <ListItemText
                primary={`Guess #${index + 1}: ${guess}`}
                secondary={secondary}
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