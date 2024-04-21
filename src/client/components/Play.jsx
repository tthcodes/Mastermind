import { Box, Typography } from '@mui/material';
import { Button } from '@mui/joy';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';
import containerStyle from '../styling/containerStyling';
import axios from 'axios';
import GameContext from '../contexts/GameContext';
import GuessLog from './GuessLog';
import GuessSubmit from './GuessSubmit';

const Play = () => {
  const navigate = useNavigate();
  const [guessCount, setGuessCount] = useState(0);
  const [guessLog, setGuessLog] = useState([]);
  const { answer, setAnswer, numCount, maxGuessCount, minNum, maxNum } = useContext(GameContext);

  // useEffect that will generate new correct answer on page load or change in min, max, answer length
  useEffect(() => {
    const generateAnswer = async () => {
      try {
        // Get request to api, passing answer count + minValue + maxValue as req.query parameters
        const response = await axios.get(`/api/generate-answer/?length=${numCount}&min=${minNum}&max=${maxNum}`);
        
        // Defensive check for if we do not get back the generated answer in num array form
        if (Array.isArray(response.data) && response.data.length > 0) {

          setAnswer(response.data); // Update answer state
          console.log(`Answer state updated to: ${response.data}`) 

        } else {
          throw new Error('Invalid data format received')
        }
      } catch (error) {
        console.error(`Error in generating answer combination: ${error}`);
      }
    };
    // Invoke generate answer function 
    generateAnswer();
  }, [minNum, maxNum, numCount]);

  // Helper function that checks if the game should end (user has no more guesses)
    const isGameOver = (newGuessCount) => {
      if (newGuessCount >= maxGuessCount) {
        navigate('/gameover', {
          state: {
            winner: false,
            message: "Sorry, better luck next time..."
          }
        });
      };
    };

  // Helper function that will get correct number and correct location stats 
    const getGuessAccuracy = (guessStr, answerArr) => {
      // Convert input guess string into array of nums
      const guessArr = guessStr.split('').map(Number);

      // Init correct num count and correct location count at 0
      let numbersCorrect = 0;
      let locationsCorrect = 0;

      // Dicts to track freq of each num in guess and answer
      let freqInAnswer = {};
      let freqInGuess = {};

      // Populate frequency dict for guess
      guessArr.forEach((num) => {
          freqInGuess[num] = (freqInGuess[num] || 0) + 1;
      });
      
      // Populate frequency dict for answer
      answerArr.forEach((num, index) => {
          freqInAnswer[num] = (freqInAnswer[num] || 0) + 1;
          
          // Directly compare numbers between guessArr and answerArr at same index to update location
          if (num === guessArr[index]) {
              locationsCorrect++;
          }
      });

      // Calculate correct numbers, regardless of position
      Object.keys(freqInGuess).forEach((num) => {
        // If num key in guess dict exists as key in answer dict, update correct nums 
          if (freqInAnswer[num]) {

          // Freq of a correct # in guess dict will never be greater than freq in answer dict, use Math.min()
              numbersCorrect += Math.min(freqInGuess[num], freqInAnswer[num]);
          }
      });

      // Return both count of correct nums and count of correct locations
      return [numbersCorrect, locationsCorrect];
    };

  // Create a function that check the user's submitted guess vs. answer and updates guessLog 
    const checkAnswer = async (guess) => {
      
      // Convert guess str to nums arr to compare answer arr
      const guessArr = guess.split('').map(Number); // need to make sure guess comes in correct data form
      
      // Console log invalid guess input + alert user non-numeric value was submitted. 
      if (!guessArr.every(Number.isFinite)) {
        console.error('Invalid guess input: guess contains non-numeric values.');
        alert('Please only submit numeric values in guess.')
        return;
      };

      // Check if the guess is correct
      if (guessArr.join('') === answer.join('')) {
        navigate('/gameover', {
          state: {
            winner: true,
            message: "Congratulations, you cracked the code!"
          }
        });
        return;
      }

      // Update guess count, check if new guess count ends game.
      setGuessCount(prevCount => {
        const newGuessCount = prevCount + 1;
        isGameOver(newGuessCount); // Check if game should end based on guessCount
        return newGuessCount;
      });

      // Get accuracy stats for log display
      const [guessCorrectNums, guessCorrectLocations] = getGuessAccuracy(guess, answer);
      
      // Update guessLog
      console.log('correct answer:', answer, 'current guess:', guessArr)
      console.log('current correct nums:', guessCorrectNums, 'current correct locs:', guessCorrectLocations)
      setGuessLog(prevState => [...prevState, [guessArr, guessCorrectNums, guessCorrectLocations]]);
    };

  // Create function that submits guess upon click 
    const submitGuess = (guessInput) => {
      const guess = guessInput.join(''); 
      // guess is now a single string and passed into checkAnswer() as so
      checkAnswer(guess);
    };

  return (
    <Box sx={containerStyle}>
      <Typography variant="h2" component="h1" sx={{ 
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 1,
        fontFamily: 'bungee',
        flexGrow: 1,
        mt: 2
        }}>
        Mastermind
      </Typography>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column', 
        alignItems: 'center',
        justifyContent: 'center', 
        flexGrow: 1, 
        width: '100%', 
        }}>
        <GuessLog guessLog = {guessLog} />
      </Box>
      <Box>
        <GuessSubmit
          onFormSubmit = {submitGuess}
          guessCount = {guessCount}
          length = {numCount}
        />
      </Box>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '94%',
        marginTop: '3%',
        mb: 3
      }}>
        <Button variant="outlined" sx={{ alignSelf: 'flex-start' }} onClick={() => navigate('/')}>
          Back
        </Button>
        <Button variant="outlined" sx={{ alignSelf: 'flex-end' }} onClick={() => navigate('/settings')}>
          Settings
        </Button>
      </Box>
    </Box>
  );
};

export default Play