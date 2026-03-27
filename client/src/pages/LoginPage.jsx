import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
    Container, Box, Avatar, Typography, TextField,
    Button, CircularProgress, Link as MuiLink
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useLoginMutation } from '../store/api/authApiSlice';
import { setCredentials } from '../store/slices/authSlice';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate(); // 


    const [login, { isLoading }] = useLoginMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        try {
            const userData = await login({ email, password }).unwrap();
            dispatch(setCredentials(userData));
            console.log('Login Successful!', userData);
            navigate('/dashboard');

        } catch (err) {
            setErrorMsg(err?.data?.error || 'Failed to login');
        }
    };

    return (
        <Container component="main" maxWidth="xs" sx={{ px: { xs: 2, sm: 3 } }}>
            <Box
                sx={{
                    marginTop: { xs: 4, sm: 8 },
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    padding: { xs: 3, sm: 4 },
                    borderRadius: 2,
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5" fontWeight="bold">
                    Log in to Trello
                </Typography>

                {errorMsg && (
                    <Typography color="error" sx={{ mt: 2, width: '100%', textAlign: 'center' }}>
                        {errorMsg}
                    </Typography>
                )}

                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
                        onChange={(e) => setEmail(e.target.value)}
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
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={isLoading}
                        sx={{ mt: 3, mb: 2, py: 1.5 }}
                    >
                        {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
                    </Button>
                    <Box textAlign="center">
                        <MuiLink href="/register" variant="body2" sx={{ cursor: 'pointer' }}>
                            {"Don't have an account? Sign Up"}
                        </MuiLink>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default LoginPage;
