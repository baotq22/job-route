import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import useStore from "../store/index";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const NavBar = () => {
  const { isAuthenticated, setIsAuthenticated } = useStore();
  const navigate = useNavigate();

  const name = localStorage.getItem('email');

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    setIsAuthenticated(false)
    toast.success("Logged Out")
    navigate('/login')
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          {isAuthenticated ? <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Welcome, {name}
          </Typography> : <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
          </Typography>}
          {isAuthenticated ? <Button onClick={logout} variant="contained" color="inherit">Logout</Button> : <Link to="/login">
            <Button variant="contained" color="inherit">Login</Button>
          </Link>}
        </Toolbar>
      </AppBar>
    </Box>
  )
}