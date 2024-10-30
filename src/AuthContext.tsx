// src/AuthContext.tsx

import React, { useContext, useState, useEffect, ReactNode } from "react";
import { auth } from "./firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  UserCredential,
} from "firebase/auth";

// Define the shape of the authentication context
interface AuthContextType {
  currentUser: User | null;
  signup: (email: string, password: string) => Promise<UserCredential>;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
}

// Create the context with an initial value of null
const AuthContext = React.createContext<AuthContextType | null>(null);

// Custom hook to use the AuthContext
export function useAuth() {
  return useContext(AuthContext) as AuthContextType;
}

// Define the props for the AuthProvider component
interface AuthProviderProps {
  children: ReactNode;
}

// AuthProvider component that wraps your app and makes auth object available
export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Function to handle user signup
  function signup(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  // Function to handle user login
  function login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // Function to handle user logout
  function logout() {
    return signOut(auth);
  }

  // Set up an observer on the Auth object to get the current user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    // Clean up the subscription on unmount
    return unsubscribe;
  }, []);

  // The context value that will be supplied to any descendants of this component
  const value: AuthContextType = {
    currentUser,
    signup,
    login,
    logout,
  };

  // Only render the children once the loading state is false
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
