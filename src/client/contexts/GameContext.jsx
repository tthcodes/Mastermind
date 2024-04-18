import React, { createContext } from 'react';

const defContext = {
  answer: [],
  setAnswer: () => {},
  numCount: 4,
  setNumCount: () => {},
  maxGuessCount: 10,
  setMaxGuessCount: () => {}
}

//Create context
const GameContext = createContext(defContext);

export default GameContext