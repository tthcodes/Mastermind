import { Box, Typography, TextField } from '@mui/material'
import { Button } from '@mui/joy'
import { useNavigate } from 'react-router-dom'
import React, { useState, useContext } from 'react'
import containerStyle from '../styling/containerStyling'
import axios from 'axios'
import GameContext from '../contexts/GameContext'

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setIsSignedIn } = useContext(GameContext)

  // Function to handle submission of account info for login
  const handleLogin = async (event) => {
    event.preventDefault();

    // Ensure all required fields are filled
    if (!username || !password) {
      setError('Please fill in all fields.');
      return;
    }
    
    // Prepare account data to send to backend for login verification
    const userAccountData = {
      username,
      password
    };

    // POST request to database to check for account existence/correct password
    try {
      const response = await axios.post('/api/user/login', userAccountData);
      alert(`${response.data.message}`)
      navigate('/');
      // set state to logged in
      setIsSignedIn(true);

    } catch (err) {
        console.error('Error during login:', err);
        // If server sends back response, setError and show err message from backend
        if(err.response) {
          // Check if error was caught in validation handler during sanitation
          const message = err.response.data.errors ? 
              // Set message to validation handler message if so
                'Inputs are not valid. (Should contain standard characters and no spaces)' : 
              // Set fallback general error message
                err.response.data.message;
          setError(message);
        } else {
          // General error message for if error not sent with response
          setError('Failed to log in.');
        }
    }
  }

  return (
    <Box sx={{
      ...containerStyle,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      }}>
      <Typography variant="h2" component="h1" sx={{ color: 'black', fontWeight: 'bold', textAlign: 'center', marginTop: 20, fontFamily: 'bungee'}}>
        Mastermind
      </Typography>
      <form onSubmit={handleLogin} style={{ width: '60%', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
        <Button type="submit" sx={{ mt: 2 }}>
          Log In
        </Button>
        <Button onClick={() => navigate('/')}>
          Home
        </Button>
      </form>
    </Box>
  );
};

export default Login