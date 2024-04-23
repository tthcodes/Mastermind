// Game Over Page
import React, { useState, useEffect, useContext } from 'react';
import { Box, Typography } from '@mui/material'
import { Button } from '@mui/joy'
import containerStyle from '../styling/containerStyling';
import { useLocation, useNavigate } from 'react-router-dom'
import GameContext from '../contexts/GameContext';
import axios from 'axios';

const GameOver = () => {
  const navigate = useNavigate();
  const [ userData, setUserData ] = useState({ username: 'default', score: -1 });
  const location = useLocation();
  const { isSignedIn } = useContext(GameContext);

  useEffect(() => {
    const fetchUserData = async () => {
      if (isSignedIn) {
        try {
          const response = await axios.get('/api/user/get-user-data');
          if (response.status === 200) {
            setUserData({
              username: response.data.username,
              score: response.data.userScore
            });
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, [isSignedIn]); 

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

        {isSignedIn && winner ? (
        <Typography sx = {{
          fontWeight: 'bold',
          marginTop: 4,
          testAlign: 'center',
          color: color
        }}>
          Great job, {userData.username}! New Score: <span style={{ color: color }}>{userData.score}</span>
        </Typography>) : null}

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