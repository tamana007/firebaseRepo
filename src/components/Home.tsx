// src/components/Home.tsx

import React from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Container } from '@mui/material';

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
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome, {currentUser?.email}
      </Typography>
      <Button variant="contained" color="primary" onClick={handleLogout}>
        Log Out
      </Button>
    </Container>
  );
};

export default Home;
