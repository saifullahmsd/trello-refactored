import { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const AddListForm = ({ onAddList }) => {
    const [isAdding, setIsAdding] = useState(false);
    const [title, setTitle] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) return;
        await onAddList(title);
        setTitle('');
        setIsAdding(false);
    };

    return (
        <Box sx={{ width: { xs: '85vw', sm: 280, md: 300 }, minWidth: { xs: '85vw', sm: 280, md: 300 }, flexShrink: 0 }}>
            {isAdding ? (
                <Box component="form" onSubmit={handleSubmit}
                    sx={{ bgcolor: 'secondary.main', p: 1, borderRadius: 1 }}>
                    <TextField autoFocus fullWidth size="small" placeholder="Enter list title..."
                        value={title} onChange={(e) => setTitle(e.target.value)}
                        sx={{ bgcolor: 'white', mb: 1 }} />
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button type="submit" variant="contained" size="small">Add List</Button>
                        <Button size="small" onClick={() => setIsAdding(false)}>Cancel</Button>
                    </Box>
                </Box>
            ) : (
                <Button startIcon={<AddIcon />} fullWidth onClick={() => setIsAdding(true)}
                    sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white', justifyContent: 'flex-start',
                        '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' } }}>
                    Add another list
                </Button>
            )}
        </Box>
    );
};

export default AddListForm;
