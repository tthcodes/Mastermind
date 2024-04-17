import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
//Use dynamic imports using React.lazy for components associated with routes
const Home = lazy(() => import('./components/Home'))
const Play = lazy(() => import('./components/Play'))


const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Home />} />
        <Route path='/signup' element={<Home />} />
        <Route path='/play' element={<Play />} />
        <Route path='/settings' element={<Home />} />
        <Route path='/instructions' element={<Home />} />
      </Routes>
    </Suspense>
  );
};

export default App;
