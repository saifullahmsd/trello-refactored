import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
    Box, Typography, Button, Container, Grid, Paper,
    IconButton, Menu, MenuItem, useMediaQuery, useTheme
} from '@mui/material';
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';
import PeopleIcon from '@mui/icons-material/People';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import MenuIcon from '@mui/icons-material/Menu';

const features = [
    {
        icon: <ViewKanbanIcon sx={{ fontSize: 40, color: '#0052cc' }} />,
        title: 'Visual Boards',
        desc: 'Organize your work into beautiful Kanban boards. See everything at a glance.'
    },
    {
        icon: <DragIndicatorIcon sx={{ fontSize: 40, color: '#0052cc' }} />,
        title: 'Drag & Drop',
        desc: 'Move cards and lists effortlessly with smooth drag and drop functionality.'
    },
    {
        icon: <PeopleIcon sx={{ fontSize: 40, color: '#0052cc' }} />,
        title: 'Team Collaboration',
        desc: 'Invite members, assign tasks, and collaborate in real-time with your team.'
    },
    {
        icon: <CheckCircleIcon sx={{ fontSize: 40, color: '#0052cc' }} />,
        title: 'Track Progress',
        desc: 'Add checklists, due dates, labels, and attachments to keep everything on track.'
    },
];

const HomePage = () => {
    const navigate = useNavigate();
    const { userInfo } = useSelector((state) => state.auth);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {
        if (userInfo) navigate('/dashboard');
    }, [userInfo, navigate]);

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f4f5f7' }}>

            {/* Hero Navbar */}
            <Box sx={{
                bgcolor: '#0052cc', px: { xs: 2, sm: 4 }, py: 1.5,
                display: 'flex', justifyContent: 'space-between', alignItems: 'center'
            }}>
                {/* Logo */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{
                        width: 28, height: 28, bgcolor: 'white', borderRadius: 1,
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <Typography sx={{ color: '#0052cc', fontWeight: 900, fontSize: '1rem' }}>T</Typography>
                    </Box>
                    <Typography variant="h6" fontWeight="bold" sx={{ color: 'white' }}>Trello</Typography>
                </Box>

                {/* Desktop Buttons */}
                <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 1 }}>
                    <Button
                        variant="outlined"
                        onClick={() => navigate('/login')}
                        sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.6)', textTransform: 'none', '&:hover': { borderColor: 'white' } }}
                    >
                        Log In
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => navigate('/register')}
                        sx={{ bgcolor: 'white', color: '#0052cc', fontWeight: 'bold', textTransform: 'none', '&:hover': { bgcolor: '#e8f0fe' } }}
                    >
                        Sign Up
                    </Button>
                </Box>

                {/* Mobile Hamburger */}
                <Box sx={{ display: { xs: 'flex', sm: 'none' } }}>
                    <IconButton color="inherit" onClick={(e) => setAnchorEl(e.currentTarget)}>
                        <MenuIcon sx={{ color: 'white' }} />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={() => setAnchorEl(null)}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    >
                        <MenuItem onClick={() => { setAnchorEl(null); navigate('/login'); }}>
                            <Typography variant="body2">Log In</Typography>
                        </MenuItem>
                        <MenuItem onClick={() => { setAnchorEl(null); navigate('/register'); }}>
                            <Typography variant="body2" fontWeight="bold">Sign Up</Typography>
                        </MenuItem>
                    </Menu>
                </Box>
            </Box>

            {/* Hero Section */}
            <Box sx={{
                background: 'linear-gradient(135deg, #0052cc 0%, #2684ff 50%, #00b8d9 100%)',
                py: { xs: 7, sm: 10, md: 14 }, px: { xs: 2, sm: 3 }, textAlign: 'center',
                clipPath: { xs: 'none', sm: 'ellipse(100% 90% at 50% 0%)' }
            }}>
                <Typography
                    variant="h2" fontWeight={800}
                    sx={{ color: 'white', mb: 1, fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3.5rem' } }}
                >
                    Organize Anything,
                </Typography>
                <Typography
                    variant="h2" fontWeight={800}
                    sx={{ color: '#ffd700', mb: 3, fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3.5rem' } }}
                >
                    Together.
                </Typography>
                <Typography
                    variant="h6"
                    sx={{
                        color: 'rgba(255,255,255,0.85)', mb: 5,
                        maxWidth: 600, mx: 'auto',
                        fontSize: { xs: '0.95rem', sm: '1.1rem', md: '1.25rem' },
                        px: { xs: 1, sm: 0 }
                    }}
                >
                    Trello keeps your team's work organized using boards, lists, and cards — so you always know what needs to get done.
                </Typography>
                <Button
                    variant="contained"
                    size={isMobile ? 'medium' : 'large'}
                    onClick={() => navigate('/register')}
                    sx={{
                        bgcolor: '#ffd700', color: '#172b4d', fontWeight: 'bold',
                        px: { xs: 3, sm: 5 }, py: { xs: 1.2, sm: 1.8 },
                        fontSize: { xs: '0.95rem', sm: '1.1rem' },
                        borderRadius: 3,
                        textTransform: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                        '&:hover': { bgcolor: '#ffec6e', transform: 'translateY(-2px)', transition: '0.2s' }
                    }}
                >
                    Get Started for Free →
                </Button>
            </Box>

            {/* Features Section */}
            <Container maxWidth="lg" sx={{ py: { xs: 6, sm: 10 }, px: { xs: 2, sm: 3 } }}>
                <Typography
                    variant="h4" fontWeight="bold" textAlign="center"
                    sx={{ mb: 1, color: '#172b4d', fontSize: { xs: '1.4rem', sm: '2rem' } }}
                >
                    Everything you need to stay organized
                </Typography>
                <Typography variant="body1" textAlign="center" color="text.secondary" sx={{ mb: 6 }}>
                    Simple, powerful, and flexible. Trello works for any team and any project.
                </Typography>
                <Grid container spacing={{ xs: 2, sm: 4 }}>
                    {features.map((f, i) => (
                        <Grid item xs={12} sm={6} md={3} key={i}>
                            <Paper elevation={0} sx={{
                                p: { xs: 3, sm: 4 }, textAlign: 'center', borderRadius: 3,
                                border: '1px solid #e1e4e8', height: '100%',
                                transition: '0.25s', '&:hover': { boxShadow: '0 8px 30px rgba(0,82,204,0.12)', transform: 'translateY(-4px)' }
                            }}>
                                <Box sx={{ mb: 2 }}>{f.icon}</Box>
                                <Typography variant="h6" fontWeight="bold" sx={{ mb: 1, fontSize: { xs: '1rem', sm: '1.1rem' } }}>
                                    {f.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">{f.desc}</Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* CTA Section */}
            <Box sx={{ bgcolor: '#0052cc', py: { xs: 6, sm: 8 }, textAlign: 'center', px: { xs: 2, sm: 3 } }}>
                <Typography
                    variant="h4" fontWeight="bold"
                    sx={{ color: 'white', mb: 2, fontSize: { xs: '1.4rem', sm: '2rem' } }}
                >
                    Ready to get started?
                </Typography>
                <Typography sx={{ color: 'rgba(255,255,255,0.8)', mb: 4, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                    Join thousands of teams already using Trello.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Button
                        variant="contained"
                        size={isMobile ? 'medium' : 'large'}
                        onClick={() => navigate('/register')}
                        sx={{ bgcolor: '#ffd700', color: '#172b4d', fontWeight: 'bold', textTransform: 'none', px: 4, '&:hover': { bgcolor: '#ffec6e' } }}
                    >
                        Create Free Account
                    </Button>
                    <Button
                        variant="outlined"
                        size={isMobile ? 'medium' : 'large'}
                        onClick={() => navigate('/login')}
                        sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.6)', textTransform: 'none', px: 4, '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' } }}
                    >
                        Log In
                    </Button>
                </Box>
            </Box>

            {/* Footer */}
            <Box sx={{ bgcolor: '#172b4d', py: { xs: 2, sm: 3 }, textAlign: 'center' }}>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                    © 2026 Trello Clone. Built with React + Node.js
                </Typography>
            </Box>
        </Box>
    );
};

export default HomePage;
