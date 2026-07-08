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
import { registerUser, setCredentials } from '../auth/authSlice';

  const loginSchema = z.object({
    name: z
        .string()
        .min(1, { message: 'name is required' }),

    email: z
        .string()
        .min(1, { message: 'Email is required' })
        .email({ message: 'Invalid email address' }),

    password: z
        .string()
        .min(1, { message: 'Password is required' })
        .min(6, { message: 'Password must be at least 6 characters' }),

    confirmpassword: z
        .string()
        .min(1, { message: 'Confirm Password is required' })
        .min(6, { message: 'Password must be at least 6 characters' }),
    })
    .refine((data) => data.password === data.confirmpassword, {
    message: "Passwords don't match",
    path: ["confirmpassword"]
    });


export default function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [registerError, setRegisterError] = useState('');
  const { registeredUsers } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmpassword: ''
    },
    resolver: zodResolver(loginSchema),
  });
    
  const onSubmit = (data) => {
    console.log("Form Data Submitted:", data);
    
    const existingUser = registeredUsers.find(
      (user) => user.email === data.email
    );

    if (existingUser) {
      setRegisterError('Email already registered');
      return;
    }

    dispatch(registerUser({
      name: data.name,
      email: data.email,
      password: data.password
    }));

    dispatch(setCredentials({
      user: { email: data.email, name: data.name },
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
                Register
              </Typography>

              {registerError && (
                <Typography color="error" variant="body2" sx={{ mb: 1 }}>
                  {registerError}
                </Typography>
              )}

          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ width: '100%' }}>
            <TextField
              margin="dense"
              required
              fullWidth
              label="Name"
              type="text"
              id="name"
              autoComplete="name"
              autoFocus
              {...register("name", { 
              })}
              error={Boolean(errors.name)} 
              helperText={errors.name?.message}
            />
            
            <TextField
              margin="dense"
              required
              fullWidth
              id="email"
              label="Email Address"
              autoComplete="email"
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
              autoComplete="new-password"
              {...register("password", { 
              })}
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
            />

            <TextField
              margin="dense"
              required
              fullWidth
              label="Confirm Password"
              type="password"
              id="confirmpassword"
              autoComplete="new-password"
              {...register("confirmpassword", { 
              })}
              error={Boolean(errors.confirmpassword)} 
              helperText={errors.confirmpassword?.message}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 1, py: 1.2 }}
            >
              Register
            </Button>

            <Button
              component={Link} 
              to="/login"     
              type="button"
              fullWidth
              variant="outlined"
              sx={{ mt: 0, mb: 1, py: 1.2 }}
            >
              Back to login
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}