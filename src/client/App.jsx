import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import GameContext from './contexts/GameContext';
//Use dynamic imports using React.lazy for components associated with routes
const Home = lazy(() => import('./components/Home'))
const Play = lazy(() => import('./components/Play'))


const App = () => {
  // Define State Variables from Context
  const [answer, setAnswer] = useState([]);
  const [numCount, setNumCount] = useState(4);
  const [maxGuessCount, setMaxGuessCount] = useState(10);

  // Store State Variables In Object To Pass Down In Provider
  const value = {
    answer,
    setAnswer,
    numCount,
    setNumCount,
    maxGuessCount,
    setMaxGuessCount
  };

  return (
    <GameContext.Provider value={value}>
      <Suspense fallback={<div>Game Loading...</div>}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Home />} />
          <Route path='/signup' element={<Home />} />
          <Route path='/play' element={<Play />} />
          <Route path='/settings' element={<Home />} />
          <Route path='/instructions' element={<Home />} />
        </Routes>
      </Suspense>
    </GameContext.Provider>
  );
};

export default App;
