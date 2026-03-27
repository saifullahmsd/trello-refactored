import React, { useState } from 'react';
import { Box, Typography, Button, TextField, IconButton, Checkbox, LinearProgress } from '@mui/material';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import { useUpdateCardMutation } from '../../../store/api/cardApiSlice';

const Checklist = ({ card, checklist }) => {
    const [newItemText, setNewItemText] = useState('');
    const [isAddingItem, setIsAddingItem] = useState(false);
    const [updateCard] = useUpdateCardMutation();

    const totalItems = checklist.items.length;
    const completedItems = checklist.items.filter(item => item.completed).length;
    const progressPercentage = totalItems === 0 ? 0 : Math.round((completedItems / totalItems) * 100);

    const handleAddItem = async (e) => {
        e.preventDefault();
        if (!newItemText.trim()) return;
        const updatedChecklists = JSON.parse(JSON.stringify(card.checklists));
        const targetChecklist = updatedChecklists.find(c => c._id === checklist._id);
        targetChecklist.items.push({ text: newItemText, completed: false });
        try {
            await updateCard({ id: card._id, checklists: updatedChecklists }).unwrap();
            setNewItemText('');
            setIsAddingItem(false);
        } catch (err) { console.error('Failed to add item', err); }
    };

    const handleToggleItem = async (itemId) => {
        const updatedChecklists = JSON.parse(JSON.stringify(card.checklists));
        const targetChecklist = updatedChecklists.find(c => c._id === checklist._id);
        const targetItem = targetChecklist.items.find(i => i._id === itemId);
        targetItem.completed = !targetItem.completed;
        try {
            await updateCard({ id: card._id, checklists: updatedChecklists }).unwrap();
        } catch (err) { console.error('Failed to update item', err); }
    };

    const handleDeleteChecklist = async () => {
        const updatedChecklists = card.checklists.filter(c => c._id !== checklist._id);
        try {
            await updateCard({ id: card._id, checklists: updatedChecklists }).unwrap();
        } catch (err) { console.error('Failed to delete checklist', err); }
    };

    return (
        <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1, flexWrap: 'wrap', gap: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 0 }}>
                    <CheckBoxOutlinedIcon sx={{ mr: 1, color: 'text.secondary', flexShrink: 0 }} />
                    <Typography variant="h6" fontWeight="bold" sx={{ wordBreak: 'break-word', fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                        {checklist.title}
                    </Typography>
                </Box>
                <Button size="small" color="inherit" onClick={handleDeleteChecklist}>Delete</Button>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, pl: 4 }}>
                <Typography variant="caption" sx={{ minWidth: 35 }}>{progressPercentage}%</Typography>
                <LinearProgress
                    variant="determinate" value={progressPercentage}
                    sx={{
                        flexGrow: 1, ml: 1, height: 8, borderRadius: 4,
                        bgcolor: 'rgba(9, 30, 66, 0.08)',
                        '& .MuiLinearProgress-bar': {
                            bgcolor: progressPercentage === 100 ? '#61bd4f' : '#5ba4cf'
                        }
                    }}
                />
            </Box>

            <Box sx={{ pl: { xs: 1, sm: 3 } }}>
                {checklist.items.map((item) => (
                    <Box key={item._id} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Checkbox checked={item.completed} onChange={() => handleToggleItem(item._id)}
                            sx={{ p: 0.5, mr: 1 }} />
                        <Typography sx={{ textDecoration: item.completed ? 'line-through' : 'none', color: item.completed ? 'text.secondary' : 'text.primary' }}>
                            {item.text}
                        </Typography>
                    </Box>
                ))}

                {isAddingItem ? (
                    <form onSubmit={handleAddItem} style={{ marginTop: '8px' }}>
                        <TextField autoFocus size="small" fullWidth placeholder="Add an item"
                            value={newItemText} onChange={(e) => setNewItemText(e.target.value)}
                            sx={{ bgcolor: 'white', mb: 1 }} />
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <Button type="submit" variant="contained" size="small">Add</Button>
                            <Button size="small" color="inherit" onClick={() => setIsAddingItem(false)}>Cancel</Button>
                        </Box>
                    </form>
                ) : (
                    <Button sx={{ mt: 1 }} color="inherit" onClick={() => setIsAddingItem(true)}>
                        Add an item
                    </Button>
                )}
            </Box>
        </Box>
    );
};

export default Checklist;
