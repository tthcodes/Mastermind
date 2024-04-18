import { Box, Typography } from '@mui/material'
import { Button } from '@mui/joy'
import { useNavigate } from 'react-router-dom'
import React, { useState, useEffect, useContext } from 'react'
import GameContext from '../contexts/GameContext'
import boxStyle from '../styling/BoxStyle'
import GuessLog from './GuessLog'

const Play = () => {
  const navigate = useNavigate();
  const [correctNums, setCorrectNums] = useState(0);
  const [correctLocations, setCorrectLocations] = useState(0);
  const [guessNum, setGuessNum] = useState(0);
  const [guessLog, setGuessLog] = useState([]);
  const { answer, setAnswer, numCount, setNumCount, maxGuessCount } = useContext(GameContext);

  // Create function that will get correct number and correct location counts here... unfinished
  const getGuessAccuracy = (guess, answer) => {
    let correctNums = 0;
    let correctLocation = 0;
    const guessFreq = {};
    const answerFreq = {};
  };

  // Create function that will check current guess count against max guess count

  return (
    <Box sx={boxStyle}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '94%',
        marginTop: '3%',
        mb: 3
      }}>
        <Button variant="outlined" sx={{ alignSelf: 'flex-start' }} onClick={() => navigate('/instructions')}>
          Back
        </Button>
        <Button variant="outlined" sx={{ alignSelf: 'flex-end' }}>
          Settings
        </Button>
      </Box>
      <Typography variant="h2" component="h1" sx={{ 
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10,
        fontFamily: 'bungee',
        flexGrow: 1,
        mt: -1
        }}>
        Mastermind
      </Typography>
      <GuessLog guessLog = {guessLog} />
    </Box>
  );
};

export default Play