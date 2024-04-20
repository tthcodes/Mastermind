import React, { createContext } from 'react';

const defContext = {
  answer: [],
  setAnswer: () => {},
  numCount: 4,
  setNumCount: () => {},
  maxGuessCount: 10,
  setMaxGuessCount: () => {},
  minNum: 0,
  setMinNum: () => {},
  maxNum: 7,
  setMaxNum: () => {},
  isSignedIn: false,
  setIsSignedIn: () => {}
}

//Create context
const GameContext = createContext(defContext);

export default GameContext