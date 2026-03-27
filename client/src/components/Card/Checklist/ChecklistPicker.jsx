import React, { useState } from 'react';
import { Popover, Box, Typography, TextField, Button } from '@mui/material';
import { useUpdateCardMutation } from '../../../store/api/cardApiSlice';

const ChecklistPicker = ({ anchorEl, handleClose, card }) => {
    const [checklistTitle, setChecklistTitle] = useState('Checklist');
    const [updateCard] = useUpdateCardMutation();

    const handleCreateChecklist = async (e) => {
        e.preventDefault();
        if (!checklistTitle.trim()) return;
        const updatedChecklists = [...(card.checklists || []), { title: checklistTitle, items: [] }];
        try {
            await updateCard({ id: card._id, checklists: updatedChecklists }).unwrap();
            handleClose();
            setChecklistTitle('Checklist');
        } catch (err) { console.error('Failed to create checklist', err); }
    };

    const open = Boolean(anchorEl);

    return (
        <Popover open={open} anchorEl={anchorEl} onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
            <Box sx={{ p: 2, width: 280 }}>
                <Typography variant="subtitle2" fontWeight="bold" align="center" sx={{ mb: 2 }}>
                    Add Checklist
                </Typography>
                <form onSubmit={handleCreateChecklist}>
                    <Typography variant="body2" fontWeight="bold" sx={{ mb: 1 }}>Title</Typography>
                    <TextField fullWidth size="small" autoFocus value={checklistTitle}
                        onChange={(e) => setChecklistTitle(e.target.value)} sx={{ mb: 2 }} />
                    <Button type="submit" variant="contained" fullWidth>Add</Button>
                </form>
            </Box>
        </Popover>
    );
};

export default ChecklistPicker;
