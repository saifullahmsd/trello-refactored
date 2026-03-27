import { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';

const BoardDescription = ({ description, onSave }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [desc, setDesc] = useState(description || '');

    useEffect(() => {
        setDesc(description || '');
    }, [description]);

    const handleSave = () => {
        onSave(desc);
        setIsEditing(false);
    };

    return (
        <Box sx={{ mb: 2 }}>
            {isEditing ? (
                <Box>
                    <TextField fullWidth multiline rows={2} size="small"
                        value={desc} onChange={(e) => setDesc(e.target.value)}
                        placeholder="Add board description..."
                        sx={{ bgcolor: 'rgba(255,255,255,0.9)', borderRadius: 1, mb: 1 }}
                        autoFocus
                    />
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button variant="contained" size="small" onClick={handleSave}>Save</Button>
                        <Button size="small" sx={{ color: 'white' }} onClick={() => setIsEditing(false)}>Cancel</Button>
                    </Box>
                </Box>
            ) : (
                <Typography variant="body2" onClick={() => setIsEditing(true)}
                    sx={{ color: 'rgba(255,255,255,0.8)', cursor: 'pointer', px: 1,
                        '&:hover': { color: 'white', textDecoration: 'underline' } }}>
                    {desc || '+ Add board description...'}
                </Typography>
            )}
        </Box>
    );
};

export default BoardDescription;
