import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import GameContext from './contexts/GameContext';
import axios from 'axios';

// Use dynamic imports using React.lazy for components associated with routes, only loaded when needed
  // Improves initial load performance by code splitting. 
  // Reduces initial bundle size, app becomes interactive quicker
const Home = lazy(() => import('./components/Home'))
const Play = lazy(() => import('./components/Play'))
const GameOver = lazy(() => import('./components/GameOver'))
const SignUp = lazy(() => import('./components/Signup'))
const Login = lazy(() => import('./components/Login'))
const Profile = lazy(() => import('./components/Profile'))
const Instructions = lazy(() => import('./components/Instructions'))
const Settings = lazy(() => import('./components/Settings'))



const App = () => {
  // Define Global state variables to be used by GameContext, 
    // this links them to their set funcs and sets a default val 
  const [answer, setAnswer] = useState([]);
  const [numCount, setNumCount] = useState(4);
  const [maxGuessCount, setMaxGuessCount] = useState(10);
  const [minNum, setMinNum] = useState(0);
  const [maxNum, setMaxNum] = useState(7);
  const [isSignedIn, setIsSignedIn] = useState(false)

  useEffect(() => {
    // Function to check for active session upon App mount
    const verifySession = async () => {
      try {
        // API get request to auth middleware
        const response = await axios.get('/api/auth/verify-session');

        // If session successfully verified, set signed in state to true
        if (response.status === 200) {
          setIsSignedIn(true); // backend returns a 200 status if the session is valid
        } else {
          setIsSignedIn(false);
        }
      } catch (error) {
        console.error('Error verifying session:', error);
        setIsSignedIn(false);
      }
    };
    // Call function
    verifySession();
  }, [setIsSignedIn]); 

  // Store state variables and set funcs in obj to later pass to Game Context Provider
  const value = {
    answer,
    setAnswer,
    numCount,
    setNumCount,
    maxGuessCount,
    setMaxGuessCount,
    minNum,
    setMinNum,
    maxNum,
    setMaxNum,
    isSignedIn,
    setIsSignedIn
  };

  // Wrap components in GameContext Provider to pass down global state variabls and setter funcs
  // Lazy designed to work with 'Suspense' to specify loading fallback. (displayed while components fetched)

  return (
    <GameContext.Provider value={value}>
      <Suspense fallback={<div>Game Loading...</div>}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/play' element={<Play />} />
          <Route path='/instructions' element={<Instructions />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/gameover' element={<GameOver />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/settings' element={<Settings />} />
        </Routes>
      </Suspense>
    </GameContext.Provider>
  );
};

export default App;
