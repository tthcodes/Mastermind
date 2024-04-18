import { Box, Typography } from '@mui/material';
import { Button } from '@mui/joy';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import GameContext from '../contexts/GameContext';
import boxStyle from '../styling/BoxStyle';
import GuessLog from './GuessLog';
import GuessSubmit from './GuessSubmit';

const Play = () => {
  const navigate = useNavigate();
  const [correctNumsCount, setCorrectNumsCount] = useState(0);
  const [correctLocationsCount, setCorrectLocationsCount] = useState(0);
  const [nothingCorrect, setNothingCorrect] = useState(false);
  const [guessNum, setGuessNum] = useState(0);
  const [guessLog, setGuessLog] = useState([]);
  const { answer, setAnswer, numCount, setNumCount, maxGuessCount, minNum, maxNum } = useContext(GameContext);

  // useEffect that will generate the correct answer on page load
  useEffect(() => {
    const generateAnswer = async () => {
      try {
        const response = await axios.get(
          `/api/generate-answer/?length=${numCount}&min=${minNum}&max=${maxNum}`
        );
        
        //Defensive check for if we do not get back the generated answer in num array form

        if (Array.isArray(response.data) && response.data.length > 0) {
          setAnswer(response.data);
          console.log(`Answer state updated to: ${response.data}`)
        } else {
          throw new Error('Invalid data format received')
        }
      } catch (error) {
        console.error(`Error in generating answer combination: ${error}`);
      }
    };
    generateAnswer();
  }, [minNum, maxNum, numCount]);

  // Helper function that checks if the game should continue (no more guesses) or (correct guess)
    const isGameOver = (guess) => {
      // Update guess count number every time this is invoked
      setGuessNum(guessNum + 1);

      // Check if guess was correct
      if (guess === answer.join('')) {
        navigate('/gameover', {
          state: { winner: true, message: "Congratulations, you cracked the code!" },
        })
      }

      else if (guessNum >= maxGuessCount) {
        navigate('/gameover', {
          state: { winner: false, message: "Sorry, better luck next time..."},
        })
      }
    };

  // Helper function that will get correct number and correct location stats 
    const getGuessAccuracy = (guess, answer) => {
      // Convert input guess string into array of nums
      const guessArr = guess.split('').map(Number);
      // Init correct nums, correct locations, and freq maps for guess and answer
      let answerFreqMap = {};
      let guessFreqMap = {};
      let numCorrect = 0;
      let numCorrectLocation = 0;

      // Populate frequency map for answer, while also cross checking correct nums in
        // correct places within guess by holding onto the index of answer array
      answer.forEach((num, index) => {
          answerFreqMap[num] = (answerFreqMap[num] || 0) + 1;
          if (num === guess[index]) {
              numCorrectLocation++;
          }
      });

      console.log('Guess from getGuessAccuracy', guess, typeof guess, typeof guess[0])

      // Populate frequency maps for guess
      guessArr.forEach((num) => {
          guessFreqMap[num] = (guessFreqMap[num] || 0) + 1;
      });

      // Calculate correct numbers that are not necessarily in the correct location
      for (const num in guessFreqMap) {
          if (answerFreqMap[num]) {
              // Accounts for duplicates in answer combination.
              // Freq of a correct # in guessFreqMap will never be greater than the freq
                // of that same number in answer combo (using Math.min)
              numCorrect += Math.min(guessFreqMap[num], answerFreqMap[num]);
          }
      }
      return [numCorrect, numCorrectLocation];
    };

  // Create a function that check the user's submitted guess vs. answer and updates guessLog 
    const checkAnswer = async (guess) => {
      
      // Convert guess to nums arr to compare answer arr
      console.log('input guess to checkAnswer', guess)
      const guessArr = guess.split('').map(Number); // need to make sure guess comes in correct data form
      console.log('guessArr:', guessArr)
      
      if (!guessArr.every(Number.isFinite)) {
        console.error('Invalid guess input: guess contains non-numeric values.');
        return;
      }

      // Check if game should end based on answer and/or guess count
      isGameOver();
      
      setNothingCorrect(false);

      // Get accuracy stats for log display
      const [guessCorrectNums, guessCorrectLocations] = getGuessAccuracy(guess, guessArr);

      // Use guess stats info to set guessLog or set NoneCorrect to true
      if (guessCorrectNums === 0 && guessCorrectLocations === 0) setNothingCorrect(true);

      // Update guessLog and guess accuracy state
      setGuessLog((prevState) => {
        return [...prevState, [guess, guessCorrectNums, guessCorrectLocations]];
      });
      setCorrectNumsCount(guessCorrectNums);
      setCorrectLocationsCount(guessCorrectLocations);
    };

  // Create function that submits guess upon click 
    const submitGuess = (guessInput) => {
      const guess = guessInput.join('');
      checkAnswer(guess);
    };

  return (
    <Box sx={boxStyle}>
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
        alignItems: 'center', // Centers the child components horizontally
        justifyContent: 'center', // Centers the child components vertically
        flexGrow: 1, 
        width: '100%', 
        }}>
        <GuessLog guessLog = {guessLog} />
      </Box>
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
      <Box>
        <GuessSubmit
          title = "Take a Guess!"
          length = {numCount}
          onFormSubmit = {submitGuess}
        />
      </Box>
    </Box>
  );
};

export default Play