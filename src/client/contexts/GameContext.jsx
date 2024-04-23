import React, { createContext } from 'react';

// Provider in App.jsx should override these defaults with stateful logic using React
// Even though we set these values in App.jsx, we will use this 
  // as fallback default values for any component consuming context NOT wrapped in provider
  // useful for isolation and testing

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

// Create context and export, helps us avoid prop drilling
const GameContext = createContext(defContext);

export default GameContext