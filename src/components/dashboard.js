import { useNavigate } from 'react-router-dom'; 
import { useSelector, useDispatch } from 'react-redux';
import { 
  Container, 
  Box, 
  Typography, 
  Button, 
  Paper 
} from '@mui/material';
import { logout } from '../auth/authSlice';

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
     <Container component="main" maxWidth="md">
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
                Dashboard
              </Typography>

              <Typography variant="h6" sx={{ mb: 1 }}>
                Welcome, {user?.name || 'User'}!
              </Typography>

              <Typography variant="body1" sx={{ mb: 2 }}>
                {user?.email && `Logged in as: ${user.email}`}
              </Typography>

                <Button
                  onClick={handleLogout}     
                  type="button"
                  fullWidth
                  variant="outlined"
                  sx={{ mt: 0, mb: 1, py: 1.2 }}
                >
                  Logout
                </Button>
              
            </Paper>
          </Box>
        </Container>
  );
}

export default Dashboard;
