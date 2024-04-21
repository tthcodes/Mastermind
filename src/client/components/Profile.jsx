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
    event.preventDefault();

    if (!oldPassword || !newPassword) {
      setError('Please fill in all fields for password change.');
      return;
    }

    try {
      const response = await axios.post('/api/user/change-password', {
        oldPassword,
        newPassword
      });
      alert(response.data.message);
      setOldPassword('');
      setNewPassword('');
    } catch (err) {
      console.error('Error during password change:', err);
      setError(err.response ? err.response.data.message : 'Failed to change password.');
    }
  };

  const handleDeleteAccount = async (event) => {
    event.preventDefault();
    if (!deletePassword || deletePassword !== confirmDeletePassword) {
      setError('Passwords do not match or field is empty.');
      return;
    }

    try {
      const response = await axios.post('/api/user/delete-account', { password: deletePassword });
      alert('Account deleted successfully');
      setIsSignedIn(false);
      navigate('/');
    } catch (err) {
      console.error('Error during account deletion:', err);
      setError(err.response ? err.response.data.message : 'Failed to delete account.');
    }
  };

  return (
    <Box sx={containerStyle}>
      <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>
        {username}'s Profile
      </Typography>
      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
      <form onSubmit={handleChangePassword} style={{ width: '60%', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        Change Password?
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
        Delete Account?
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
    </Box>
  );
};

export default Profile;
