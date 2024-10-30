// src/components/Signup.tsx

import React, { useRef, useState } from 'react';
import { useAuth } from '../AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Signup: React.FC = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !emailRef.current ||
      !passwordRef.current ||
      !passwordConfirmRef.current
    ) {
      return setError('Please fill out all fields');
    }

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate('/');
    } catch (error) {
      setError('Failed to create an account');
      console.error('Signup error:', error);
    }

    setLoading(false);
  };

  return (
    <div>
      <h2>Sign Up</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input type="email" ref={emailRef} required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" ref={passwordRef} required />
        </div>
        <div>
          <label>Confirm Password</label>
          <input type="password" ref={passwordConfirmRef} required />
        </div>
        <button disabled={loading} type="submit">
          Sign Up
        </button>
      </form>
      <p>
        Already have an account? <Link to="/login">Log In</Link>
      </p>
    </div>
  );
};

export default Signup;
