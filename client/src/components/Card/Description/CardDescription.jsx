import { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import SubjectIcon from '@mui/icons-material/Subject';
import SectionHeader from '../../ui/SectionHeader';

const CardDescription = ({ card, onSave }) => {
    const [description, setDescription] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        setDescription(card?.description || '');
    }, [card?.description]);

    const handleSave = () => {
        onSave(description);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setDescription(card?.description || '');
        setIsEditing(false);
    };

    return (
        <Box sx={{ mb: 4 }}>
            <SectionHeader
                icon={<SubjectIcon />}
                title="Description"
                action={!isEditing && description && (
                    <Button size="small" sx={{ ml: 2 }} onClick={() => setIsEditing(true)}>Edit</Button>
                )}
            />
            {isEditing || !description ? (
                <Box>
                    <TextField
                        multiline rows={4} fullWidth
                        placeholder="Add a more detailed description..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        sx={{ bgcolor: 'white', mb: 1 }}
                    />
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button variant="contained" onClick={handleSave}>Save</Button>
                        <Button color="inherit" onClick={handleCancel}>Cancel</Button>
                    </Box>
                </Box>
            ) : (
                <Box
                    onClick={() => setIsEditing(true)}
                    sx={{
                        cursor: 'pointer', p: 2, bgcolor: 'rgba(9, 30, 66, 0.04)',
                        borderRadius: 1, '&:hover': { bgcolor: 'rgba(9, 30, 66, 0.08)' }
                    }}
                >
                    <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>{description}</Typography>
                </Box>
            )}
        </Box>
    );
};

export default CardDescription;
