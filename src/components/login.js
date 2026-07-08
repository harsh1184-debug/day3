import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom'; 
import { 
  Container, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper 
} from '@mui/material';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../auth/authSlice';

    const loginSchema = z.object({
    email: z
        .string()
        .min(1, { message: 'Email is required' })
        .email({ message: 'Invalid email address' }),
    password: z
        .string()
        .min(1, { message: 'Password is required' })
        .min(6, { message: 'Password must be at least 6 characters' }),
    });

    export default function LoginPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loginError, setLoginError] = useState('');
    const { registeredUsers } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data) => {
    console.log("Form Data Submitted:", data);
    
    const matchedUser = registeredUsers.find(
      (user) => user.email === data.email && user.password === data.password
    );

    if (!matchedUser) {
      setLoginError('Invalid email or password');
      return;
    }

    dispatch(setCredentials({
      user: { email: matchedUser.email, name: matchedUser.name },
    }));

    navigate('/dashboard');
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box 
        sx={{ 
          marginTop: 8, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center' 
        }}
      >
        <Paper 
          elevation={6} 
          sx={{ 
            padding: 4, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            borderRadius: 2
          }}
        >
          <Typography component="h1" variant="h5" sx={{ mb: 1 }}>
            Login
          </Typography>

          {loginError && (
            <Typography color="error" variant="body2" sx={{ mb: 1 }}>
              {loginError}
            </Typography>
          )}

          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ width: '100%' }}>

            <TextField
              margin="dense"
              required
              fullWidth
              id="email"
              label="Email Address"
              autoComplete="email"
              autoFocus
              {...register("email", { 
              })}
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
            />

            <TextField
              margin="dense"
              required
              fullWidth
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register("password", { 
              })}
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 1, py: 1.2 }}
            >
              Login
            </Button>

            <Button
              component={Link} 
              to="/register"         
              type="button"
              fullWidth
              variant="outlined"
              sx={{ mt: 0, mb: 1, py: 1.2 }}
            >
              Sign Up
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}