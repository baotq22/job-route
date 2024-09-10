import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useStore from "../store/index";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CheckWelcome } from '../checkWelcome';

const defaultTheme = createTheme();

export default function SignIn() {
  CheckWelcome();
  const { isAuthenticated, setIsAuthenticated } = useStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isError, setIsError] = useState({});

  const navigate = useNavigate();

  const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

  const validatePassword = (password) => {
    const criteria = [
      { regex: /[A-Z]/, message: 'At least one uppercase character' },
      { regex: /\d/, message: 'At least one digit' },
      { regex: /[@$!%*?&]/, message: 'At least one special character' },
      { regex: /.{8,}/, message: 'At least 8 characters' },
    ];

    const errors = criteria
      .filter(({ regex }) => !regex.test(password))
      .map(({ message }) => message);

    return errors.length === 0 ? null : errors.join(', ');
  };

  const errors = {}
  const handleSubmit = (event) => {
    const token = import.meta.env.REACT_APP_LOGIN_TOKEN;
    event.preventDefault();
    if (password === '') {
      errors.password = 'This field is required'
    } else {
      const pwdError = validatePassword(password)
      if (pwdError) {
        errors.password = pwdError
      }
    }
    if (!validateEmail(email) || email === '') {
      errors.email = 'This field is required'
    }
    setIsError(errors)

    if (Object.keys(errors).length === 0) {
      console.log(
        "Email: " + email + "\n"
        + "Password: " + password + "\n"
      )
      localStorage.setItem('email', email);
      localStorage.setItem('token', token)
      setIsAuthenticated(true)
      navigate('/')
      toast.success("Login successfully")
    }
  };

  const btnClear = (event) => {
    event.preventDefault();
    setPassword('');
    setEmail('');
    setIsError({});
  };

  const validateTheEmail = (e) => {
    const value = e.target.value
    setEmail(value);
    if (validateEmail(value) || value === '') {
      setEmail(value);
      setIsError(prevErrors => ({ ...prevErrors, email: null }));
    } else {
      setIsError(prevErrors => ({ ...prevErrors, email: "Incorrect email format" }));
    }
  };

  const validateThePwd = (e) => {
    const value = e.target.value
    setPassword(value);
    const pwdError = validatePassword(value)
    if (value || value === '') {
      setPassword(value);
      setIsError(prevErrors => ({ ...prevErrors, password: null }));
    } else {
      setIsError(prevErrors => ({ ...prevErrors, password: pwdError }));
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={validateTheEmail}
              error={isError.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={validateThePwd}
              error={isError.password}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Button
              onClick={() => navigate('/')}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Back To Main Page
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}