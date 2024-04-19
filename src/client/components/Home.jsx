import { Box, Typography } from '@mui/material'
import { Button } from '@mui/joy'
import { useNavigate } from 'react-router-dom'
import React from 'react'
import boxStyle from '../styling/BoxStyle'

const Home = () => {
  // Eventually Will Use Contexts to check for Sign In Status
  const navigate = useNavigate();

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
          gap: '5px'
        }}>
        <Button size="sm" variant="outlined" onClick={() => navigate('/login')}>
          Log In
        </Button>
        <Button size="sm" variant="outlined" onClick={() => navigate('/signup')}>
          Sign Up
        </Button>
      </Box>
    </Box>
  );
};

export default Home