import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Typography, TextField, Button, Avatar, Paper, Alert, CircularProgress } from '@mui/material';
import { useGetProfileQuery, useUpdateProfileMutation } from '../store/api/authApiSlice';
import { setCredentials } from '../store/slices/authSlice';

const ProfilePage = () => {
    const dispatch = useDispatch();
    const { data: profile, isLoading } = useGetProfileQuery();
    const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
    const [name, setName] = useState(profile?.name || '');
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    if (profile?.name && !name) setName(profile.name);


    const handleUpdate = async (e) => {
        e.preventDefault();
        setSuccessMsg(''); setErrorMsg('');
        try {
            const updated = await updateProfile({ name }).unwrap();
            dispatch(setCredentials(updated));
            setSuccessMsg('Profile updated successfully!');
        } catch (err) {
            setErrorMsg(err?.data?.error || 'Failed to update profile');
        }
    };

    if (isLoading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 10 }} />;

    return (
        <Box sx={{
            minHeight: '100vh', bgcolor: '#f4f5f7',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            px: { xs: 2, sm: 3 }
        }}>
            <Paper sx={{
                p: { xs: 3, sm: 4 },
                width: '100%',
                maxWidth: 400,
                borderRadius: 3
            }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
                    <Avatar sx={{
                        width: { xs: 56, sm: 72 },
                        height: { xs: 56, sm: 72 },
                        bgcolor: 'primary.main',
                        fontSize: { xs: '1.5rem', sm: '2rem' },
                        mb: 2
                    }}>
                        {profile?.name?.[0]?.toUpperCase() || 'U'}
                    </Avatar>
                    <Typography variant="h5" fontWeight="bold" sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
                        {profile?.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">{profile?.email}</Typography>
                    <Typography variant="caption" color="text.disabled">
                        Member since {new Date(profile?.createdAt).toLocaleDateString()}
                    </Typography>
                </Box>
                {successMsg && <Alert severity="success" sx={{ mb: 2 }}>{successMsg}</Alert>}
                {errorMsg && <Alert severity="error" sx={{ mb: 2 }}>{errorMsg}</Alert>}
                <Box component="form" onSubmit={handleUpdate}>
                    <TextField fullWidth label="Name" value={name} onChange={(e) => setName(e.target.value)} sx={{ mb: 2 }} />
                    <TextField fullWidth label="Email" value={profile?.email || ''} disabled sx={{ mb: 3 }} />
                    <Button type="submit" variant="contained" fullWidth disabled={isUpdating || !name.trim()}>
                        {isUpdating ? 'Updating...' : 'Update Profile'}
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};
export default ProfilePage;
