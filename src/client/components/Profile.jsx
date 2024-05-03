import { Box, Typography, TextField, Button } from '@mui/material';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import GameContext from '../contexts/GameContext';
import { useNavigate } from 'react-router-dom';
import containerStyle from '../styling/containerStyling'; 

const Profile = () => {
  const navigate = useNavigate();
  const { isSignedIn, setIsSignedIn } = useContext(GameContext);
  const [username, setUsername] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [deletePassword, setDeletePassword] = useState('');
  const [confirmDeletePassword, setConfirmDeletePassword] = useState('');
  const [error, setError] = useState('');

  // Grab user's username for UI greeting and to authorize user on page load
  useEffect(() => {
    const fetchUserData = async () => {
      if (isSignedIn) {
        try {
          const response = await axios.get('/api/user/get-user-data');
          if (response.status === 200) {
            setUsername(response.data.username);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, [isSignedIn]); 

  // Function to verify old password and change to new password if it matches
  const handleChangePassword = async (event) => {
    event.preventDefault(); // Prevents from reloading on submission

    // Make sure all fields have inputs
    if (!oldPassword || !newPassword) {
      setError('Please fill in all fields for password change.');
      return;
    }
    
    // Make sure old password and new password aren't the same
    if (oldPassword === newPassword) {
      setError('New password cannot be the same as old password.');
      return;
    }

    // Make sure new password doesn't contain spaces
    if (/\s/.test(newPassword)) {
      setError('New password cannot contain spaces.')
      return;
    }

    try {
      const response = await axios.patch('/api/user/change-password', {
        oldPassword,
        newPassword
      });
      // Let client know password change was successful
      alert(response.data.message);

      // Clear input fields and error message
      setOldPassword('');
      setNewPassword('');
      setError('');

    } catch (err) {
        console.error('Error during password change:', err);
        if(err.response){
        // Check if error was caught in validation handler during sanitation
        const message = err.response.data.errors ? 
          'Inputs are not valid. (Should contain standard characters and no spaces)' : 
        // Set fallback general error message if no validation handler error
          err.response.data.message;
          setError(message);
        } else {
          // General error message for errors with no response 
          setError('Failed to log in:', err);
        }
      }
    };

  const handleDeleteAccount = async (event) => {
    event.preventDefault();
    if (!deletePassword || deletePassword !== confirmDeletePassword) {
      setError('Passwords do not match or field is empty.');
      return;
    }

    try {
      // Have to specifically configure .delete requests to have an object.. in this case, to confirm password matches
      const response = await axios.delete('/api/user/delete-account', {data: { deletePassword }});
     
      // Let client know account deletion was successful
      alert(response.data.message);

      // Change global state variable isSignedIn to false
      setIsSignedIn(false);

      // Navigate player back to home screen (session should be destroyed)

      navigate('/');
    } catch (err) {
        console.error('Error delete account:', err);
        // Check if err contains response
        if(err.response){
        // Check if error was caught in validation handler during sanitation
        const message = err.response.data.errors ? 
        // Set message to validation handler message if so
          'Inputs are not valid. (Should contain standard characters and no spaces)' : 
        // Set fallback general error message if not
          err.response.data.message;
          setError(message);
        } else {
          // General error message for errors with no response 
          setError('Failed to log in:', err);
        }
      }
    };

  return (
    <Box sx={{ position: 'relative', ...containerStyle}}>
      <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>
        {username}'s Profile
      </Typography>
      {error && (
        <Typography color="error" sx={{
          top: '51vh', 
          right: 0, 
          width: '100%',
          textAlign: 'center',
          zIndex: 2 
        }}>
          {error}
        </Typography>
      )}
      <form onSubmit={handleChangePassword} style={{ width: '60%', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        Want a new password?
        <TextField
          label="Old Password"
          fullWidth
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <TextField
          label="New Password"
          fullWidth
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Change Password
        </Button>
      </form>
      <form onSubmit={handleDeleteAccount} style={{ width: '60%', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        Want to delete your account?
        <TextField
          label="Password"
          fullWidth
          value={deletePassword}
          onChange={(e) => setDeletePassword(e.target.value)}
        />
        <TextField
          label="Confirm Password"
          fullWidth
          value={confirmDeletePassword}
          onChange={(e) => setConfirmDeletePassword(e.target.value)}
        />
        <Button type="submit" variant="contained" color="error" sx={{ mt: 2 }}>
          Delete Account
        </Button>
      </form>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '94%',
        marginTop: '3%',
        mb: 3
      }}>
        <Button variant="outlined" sx={{ alignSelf: 'flex-start', fontWeight: 'bold' }} onClick={() => navigate('/')}>
          Back
        </Button>
        <Button variant="outlined" sx={{ alignSelf: 'flex-end', fontWeight: 'bold' }} onClick={() => navigate('/settings')}>
          Settings
        </Button>
      </Box>
    </Box>
  );
};

export default Profile;
