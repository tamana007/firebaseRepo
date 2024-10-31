// src/components/Login.tsx

import React, { useRef, useState } from 'react';
import { useAuth } from '../AuthContext';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Button,
  TextField,
  Typography,
  Container,
  Grid,
  Divider,
  Link,
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import AppleIcon from '@mui/icons-material/Apple';
import MicrosoftIcon from '@mui/icons-material/Microsoft';

const Login: React.FC = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const {
    login,
    signInWithGoogle,
    signInWithFacebook,
    signInWithTwitter,
    signInWithGithub,
    signInWithMicrosoft,
    signInWithApple,
  } = useAuth();
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
    } catch (error: any) {
      setError('Failed to log in');
      console.error('Login error:', error.code, error.message);
    }

    setLoading(false);
  };

  const handleSocialLogin = async (providerLogin: () => Promise<UserCredential>) => {
    try {
      setError('');
      setLoading(true);
      await providerLogin();
      navigate('/');
    } catch (error: any) {
      setError('Failed to log in');
      console.error('Social login error:', error.code, error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" component="h1" gutterBottom>
        Log In
      </Typography>
      {error && (
        <Typography color="error" gutterBottom>
          {error}
        </Typography>
      )}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          type="email"
          inputRef={emailRef}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          inputRef={passwordRef}
          required
          fullWidth
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={loading}
          fullWidth
          style={{ marginTop: '16px' }}
        >
          Log In
        </Button>
      </form>
      <Divider style={{ margin: '20px 0' }}>Or log in with</Divider>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Button
            variant="outlined"
            startIcon={<GoogleIcon />}
            onClick={() => handleSocialLogin(signInWithGoogle)}
            fullWidth
          >
            Google
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="outlined"
            startIcon={<FacebookIcon />}
            onClick={() => handleSocialLogin(signInWithFacebook)}
            fullWidth
          >
            Facebook
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="outlined"
            startIcon={<TwitterIcon />}
            onClick={() => handleSocialLogin(signInWithTwitter)}
            fullWidth
          >
            Twitter (X)
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="outlined"
            startIcon={<GitHubIcon />}
            onClick={() => handleSocialLogin(signInWithGithub)}
            fullWidth
          >
            GitHub
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="outlined"
            startIcon={<MicrosoftIcon />}
            onClick={() => handleSocialLogin(signInWithMicrosoft)}
            fullWidth
          >
            Microsoft
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="outlined"
            startIcon={<AppleIcon />}
            onClick={() => handleSocialLogin(signInWithApple)}
            fullWidth
          >
            Apple
          </Button>
        </Grid>
      </Grid>
      <Typography variant="body2" align="center" style={{ marginTop: '20px' }}>
        Need an account?{' '}
        <Link component={RouterLink} to="/signup">
          Sign Up
        </Link>
      </Typography>
    </Container>
  );
};

export default Login;
