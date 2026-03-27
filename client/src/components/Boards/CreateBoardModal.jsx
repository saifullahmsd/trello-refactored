import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Box, Typography, TextField, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useCreateBoardMutation } from '../../store/api/boardApiSlice';

import BackgroundPicker, { BACKGROUNDS } from '../Board/Background/BackgroundPicker';

const CreateBoardModal = ({ open, handleClose }) => {
    const [title, setTitle] = useState('');
    const [selectedBg, setSelectedBg] = useState(BACKGROUNDS[0]);
    const [createBoard, { isLoading }] = useCreateBoardMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createBoard({
                title,
                backgroundLink: selectedBg.link,
                isImage: selectedBg.isImage
            }).unwrap();
            setTitle('');
            handleClose();
        } catch (err) { console.error('Failed to create board:', err); }
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" fontWeight="bold">Create board</Typography>
                <IconButton onClick={handleClose} size="small"><CloseIcon /></IconButton>
            </DialogTitle>
            <DialogContent>
                <Box sx={{
                    height: 120, borderRadius: 1, mb: 3,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: selectedBg.isImage ? '#ddd' : selectedBg.link,
                    backgroundImage: selectedBg.isImage ? `url(${selectedBg.link})` : 'none',
                    backgroundSize: 'cover', backgroundPosition: 'center',
                    boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.1)'
                }}>
                    <img src="https://trello.com/assets/14cda5dc635d1f13bc48.svg" alt="board preview" />
                </Box>

                <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 1 }}>Background</Typography>
                <Box sx={{ mb: 3 }}>
                    <BackgroundPicker 
                        selectedBgLink={selectedBg.link} 
                        onSelectBg={setSelectedBg} 
                    />
                </Box>

                <form onSubmit={handleSubmit}>
                    <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 1 }}>Board title *</Typography>
                    <TextField fullWidth size="small" autoFocus required
                        value={title} onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. Project Apollo" sx={{ mb: 2 }} />
                    <Button type="submit" fullWidth variant="contained"
                        disabled={!title.trim() || isLoading}>
                        Create
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateBoardModal;
