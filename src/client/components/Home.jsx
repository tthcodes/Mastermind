import { Box, Typography } from '@mui/material'
import { Button } from '@mui/joy'
import { useNavigate } from 'react-router-dom'
import React, { useContext } from 'react'
import boxStyle from '../styling/BoxStyle'
import GameContext from '../contexts/GameContext'
import axios from 'axios'

const Home = () => {
  const {isSignedIn, setIsSignedIn} = useContext(GameContext)
  const navigate = useNavigate();

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
    <Box sx={boxStyle}>
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
              <Button size="sm" variant="outlined" onClick={() => navigate('/')}>
                Account
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