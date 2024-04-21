import { Box, Typography } from '@mui/material'
import { Button } from '@mui/joy'
import { useNavigate } from 'react-router-dom'
import React, { useState, useEffect, useContext } from 'react'
import containerStyle from '../styling/containerStyling'
import GameContext from '../contexts/GameContext'
import axios from 'axios'

const Home = () => {
  const {isSignedIn, setIsSignedIn} = useContext(GameContext)
  const navigate = useNavigate();
  const [ userData, setUserData ] = useState({ username: 'default', score: -1 });

  // Upon home component load, fetch user's data to display in U
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

  const handleLogout = async() => {
    try {
      const response = await axios.post('/api/user/logout');
      if (response.status === 200) {
        setIsSignedIn(false) // Update login state
        alert(response.data.message); // Show server message
      }
    } catch (error) {
      alert('Log out unsuccessful');
      console.error(error);
    }
  }

  return (
    <Box sx={containerStyle}>
      {isSignedIn ? (
      <Typography sx = {{
        fontWeight: 'bold',
        marginTop: 2,
        testAlign: 'center',
      }}>
        Welcome back, {userData.username}! Current score: <span style={{ color: 'blue' }}>{userData.score}</span>
      </Typography>) : null}
      <Typography variant="h2" component="h1" sx={{ color: 'black', fontWeight: 'bold', textAlign: 'center', marginTop: 20, fontFamily: 'bungee'}}>
        Mastermind
      </Typography>
      <Button size= "lg" sx={{ width: '35%', height: '65px', marginTop: '20%', fontSize: '35px', fontFamily: 'roboto'}}
        onClick={() => navigate('/play')}>
        Start
      </Button>
      <Button size = "md" variant="outlined" sx={{ width: '20%', marginTop: '2%', fontFamily: 'roboto'}}
        onClick={() => navigate('/instructions')}>
        Instructions
      </Button>
      <Button size = "md" variant="outlined" sx={{ width: '20%', marginTop: '2%', fontFamily: 'roboto'}}
        onClick={() => navigate('/settings')}>
        Settings
      </Button>
      {isSignedIn ? (
        <Box sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          width: '100%',
          paddingRight: '2rem',
          paddingTop: '2rem',
          paddingBottom: '1rem',
          marginTop: 'auto',
          alignSelf:'flex-end',
          gap: '5px'}}>
              <Button size="sm" variant="outlined" onClick={() => navigate('/profile')}>
                Profile
              </Button>
              <Button size="sm" variant="outlined" onClick={handleLogout}>
                Log Out
              </Button>
        </Box>) : (
          <Box sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            width: '100%',
            paddingRight: '2rem',
            paddingTop: '2rem',
            paddingBottom: '1rem',
            marginTop: 'auto',
            alignSelf:'flex-end',
            gap: '5px'}}>
            <Button size="sm" variant="outlined" onClick={() => navigate('/login')}>
              Log In
            </Button>
            <Button size="sm" variant="outlined" onClick={() => navigate('/signup')}>
              Sign Up
            </Button>
          </Box>)}
      </Box>
  );
};

export default Home