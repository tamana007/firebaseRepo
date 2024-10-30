// src/components/Home.tsx

import React from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch {
      console.error('Failed to log out');
    }
  };

  return (
    <div>
      <h2>Welcome, {currentUser?.email}</h2>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
};

export default Home;
