// src/App.tsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import ProtectedRoute from './components/ProtectedRoute';
// import { Routes, Route } from 'react-router-dom';
// import Home from './components/Home';
// import Login from './components/Login';
// import Signup from './components/Signup';

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
