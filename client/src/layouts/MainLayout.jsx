import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar, Toolbar, Typography, Button, Box, Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import { useLogoutMutation } from '../store/api/authApiSlice';
import { clearCredentials } from '../store/slices/authSlice';

const MainLayout = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [logoutApiCall] = useLogoutMutation();

    const [anchorEl, setAnchorEl] = useState(null);
    const isMobileMenuOpen = Boolean(anchorEl);

    const handleMobileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(clearCredentials());
            navigate('/');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
            {/* Navbar */}
            <AppBar position="sticky" sx={{ bgcolor: '#0052cc', zIndex: 1200 }} elevation={1}>
                <Toolbar variant="dense" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    {/* Logo */}
                    <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }}
                        onClick={() => navigate('/dashboard')}
                    >
                        <Box sx={{
                            width: 26, height: 26, bgcolor: 'white', borderRadius: 1,
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}>
                            <Typography sx={{ color: '#0052cc', fontWeight: 900, fontSize: '0.9rem' }}>T</Typography>
                        </Box>
                        <Typography variant="h6" fontWeight="bold" sx={{ color: 'white', fontSize: '1.1rem' }}>
                            Trello
                        </Typography>
                    </Box>

                    {/* Right side - Desktop */}
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
                        <Button
                            startIcon={<DashboardIcon fontSize="small" />}
                            onClick={() => navigate('/dashboard')}
                            sx={{ color: 'white', textTransform: 'none', fontSize: '0.85rem' }}
                            size="small"
                        >
                            Boards
                        </Button>

                        <Button
                            startIcon={<PersonIcon fontSize="small" />}
                            onClick={() => navigate('/profile')}
                            sx={{ color: 'white', textTransform: 'none', fontSize: '0.85rem' }}
                            size="small"
                        >
                            {userInfo?.name || 'Profile'}
                        </Button>

                        <Button
                            startIcon={<LogoutIcon fontSize="small" />}
                            onClick={handleLogout}
                            variant="outlined"
                            size="small"
                            sx={{
                                color: 'white', borderColor: 'rgba(255,255,255,0.4)',
                                textTransform: 'none', fontSize: '0.8rem',
                                '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' }
                            }}
                        >
                            Logout
                        </Button>
                    </Box>

                    {/* Right side - Mobile */}
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Mobile Menu */}
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMobileMenuOpen}
                onClose={handleMobileMenuClose}
            >
                <MenuItem onClick={() => { handleMobileMenuClose(); navigate('/dashboard'); }}>
                    <DashboardIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2">Boards</Typography>
                </MenuItem>
                <MenuItem onClick={() => { handleMobileMenuClose(); navigate('/profile'); }}>
                    <PersonIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2">{userInfo?.name || 'Profile'}</Typography>
                </MenuItem>
                <MenuItem onClick={() => { handleMobileMenuClose(); handleLogout(); }}>
                    <LogoutIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2">Logout</Typography>
                </MenuItem>
            </Menu>

            <Box component="main" sx={{ flexGrow: 1 }}>
                <Outlet />
            </Box>
        </Box>
    );
};

export default MainLayout;
