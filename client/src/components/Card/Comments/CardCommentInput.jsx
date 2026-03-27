import { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import UserAvatar from '../../ui/UserAvatar';

const CardCommentInput = ({ userName, onSubmit }) => {
    const [text, setText] = useState('');

    const handleSubmit = () => {
        if (!text.trim()) return;
        onSubmit(text);
        setText('');
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: { xs: 1, sm: 2 }, mb: 3 }}>
            <Box sx={{ display: { xs: 'none', sm: 'block' }, flexShrink: 0 }}>
                <UserAvatar name={userName} size={32} />
            </Box>
            <Box sx={{ flexGrow: 1 }}>
                <TextField
                    fullWidth size="small" multiline rows={2}
                    placeholder="Write a comment..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    sx={{ bgcolor: 'white', mb: 1 }}
                />
                <Button
                    variant="contained" size="small"
                    onClick={handleSubmit}
                    disabled={!text.trim()}
                >
                    Save
                </Button>
            </Box>
        </Box>
    );
};

export default CardCommentInput;
