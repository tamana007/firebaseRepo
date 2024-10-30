// src/components/Login.tsx

import React, { useRef, useState } from 'react';
import { useAuth } from '../AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!emailRef.current || !passwordRef.current) {
      return setError('Please enter email and password');
    }

    try {
      setError('');
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate('/');
    } catch (error) {
      setError('Failed to log in');
      console.error('Login error:', error);
    }

    setLoading(false);
  };

  return (
    <div>
      <h2>Log In</h2>
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
        <button disabled={loading} type="submit">
          Log In
        </button>
      </form>
      <p>
        Need an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;
