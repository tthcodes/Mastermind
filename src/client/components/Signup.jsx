import { Box, Typography, TextField, MenuItem, FormControl, InputLabel, Select } from '@mui/material'
import { Button } from '@mui/joy'
import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import containerStyle from '../styling/containerStyling'
import axios from 'axios'

const SignUp = () => {
  // Eventually Will Use Contexts to check for Sign In Status
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [error, setError] = useState(''); 

  // Populate options in dropdowns for user to select birthday
    //(_, i) is beginning of mapping function, first param serves as field placeholder, i is index of current val (begins at 0)
  const months = Array.from({ length: 12 }, (_, i) => i + 1); // 12 months max
  const days = Array.from({ length: 31 }, (_, i) => i + 1); // 31 days max
  const currentYear = new Date().getFullYear(); // Grab current date's year to as starting point for age in years
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i); // Get options beginning from current year

  // Function to handle submission of account info for creation
  const handleSignUp = async (event) => {
    event.preventDefault();

    // Ensure all required fields are filled
    if (!username || !password || !birthMonth || !birthDay || !birthYear) {
      setError('Please fill in all fields.');
      return;
    }
    
    // Utilize user's input birthday state variables to calculate age
    const userBirthday = new Date(birthYear, birthMonth - 1, birthDay); // Date object based on user bday
    const ageDiff = Date.now() - userBirthday.getTime(); // Calculates diff between birth and current date in ms
    const ageDate = new Date(ageDiff); // Creates new date object from age diff in ms
    const userAge = Math.abs(ageDate.getUTCFullYear() - 1970) // Grab year from age diff, subtract 1970 due to Unix Epoch
    
    // Verify user is at least 13 years old (considers COPPA, privacy act for children under 13)
    if (userAge < 13) {
      setError('You must be at least 13 years old to create an account.');
      return;
    }

    // Prepare account data to send to backend for creation
    const userAccountData = {
      username,
      password
    };

    // POST request to create account for user
    try {
      const response = await axios.post('/api/user/sign-up', userAccountData);
      alert('Account created! Please log in to access your account.')
      navigate('/');

    } catch (err) {
      console.error('Error during signup:', err);
      
      // If server sends back unique key error, alert client that their username isn't unique
      if(err.response && err.response.status === 409) {
        setError(err.response.data.message);
      } else {
        setError('Failed to sign up.');
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
      <form onSubmit={handleSignUp} style={{ width: '60%', display: 'flex', flexDirection: 'column', gap: '8px' }}>
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
        <Typography
          variant="subtitle1"
          textAlign="center">
          Date of Birth
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl fullWidth>
            <InputLabel>Month</InputLabel>
            <Select
              value={birthMonth}
              label="Month"
              onChange={(e) => setBirthMonth(e.target.value)}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 200,
                  }
                }
              }}>
              {months.map(month => ( // Map over months array to populate select options
                <MenuItem key={month} value={month}>{month}</MenuItem> // New menu item per element
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Day</InputLabel>
            <Select
              value={birthDay}
              label="Day"
              onChange={(e) => setBirthDay(e.target.value)}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 200,
                  }
                }
              }}>
              {days.map(day => (
                <MenuItem key={day} value={day}>{day}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Year</InputLabel>
            <Select
              value={birthYear}
              label="Year"
              onChange={(e) => setBirthYear(e.target.value)}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 200,
                  }
                }
              }}>
              {years.map(year => (
                <MenuItem key={year} value={year}>{year}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
        <Button type="submit" sx={{ mt: 2 }}>
          Sign Up
        </Button>
        <Button onClick={() => navigate('/')}>
          Home
        </Button>
      </form>
    </Box>
  );
};

export default SignUp