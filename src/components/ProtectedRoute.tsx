// src/ProtectedRoute.tsx

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

interface ProtectedRouteProps {
  children: JSX.Element;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
