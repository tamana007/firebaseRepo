// src/AuthContext.tsx

import React, { useContext, useState, useEffect, ReactNode } from 'react';
import { auth } from './firebaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  GithubAuthProvider,
  OAuthProvider,
  User,
  UserCredential,
} from 'firebase/auth';

// Define the shape of the authentication context
interface AuthContextType {
  currentUser: User | null;
  signup: (email: string, password: string) => Promise<UserCredential>;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  signInWithGoogle: () => Promise<UserCredential>;
  signInWithFacebook: () => Promise<UserCredential>;
  signInWithTwitter: () => Promise<UserCredential>;
  signInWithGithub: () => Promise<UserCredential>;
  signInWithMicrosoft: () => Promise<UserCredential>;
  signInWithApple: () => Promise<UserCredential>;
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

  // Functions for social authentication
  function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  }

  function signInWithFacebook() {
    const provider = new FacebookAuthProvider();
    return signInWithPopup(auth, provider);
  }

  function signInWithTwitter() {
    const provider = new TwitterAuthProvider();
    return signInWithPopup(auth, provider);
  }

  function signInWithGithub() {
    const provider = new GithubAuthProvider();
    return signInWithPopup(auth, provider);
  }

  function signInWithMicrosoft() {
    const provider = new OAuthProvider('microsoft.com');
    return signInWithPopup(auth, provider);
  }

  function signInWithApple() {
    const provider = new OAuthProvider('apple.com');
    return signInWithPopup(auth, provider);
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
    signInWithGoogle,
    signInWithFacebook,
    signInWithTwitter,
    signInWithGithub,
    signInWithMicrosoft,
    signInWithApple,
  };

  // Only render the children once the loading state is false
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
