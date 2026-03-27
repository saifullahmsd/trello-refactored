import { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import UserAvatar from '../../ui/UserAvatar';

const CardCommentItem = ({ comment, isOwner, onUpdate, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(comment.text);

    const handleSave = () => {
        if (!editText.trim()) return;
        onUpdate(comment._id, editText);
        setIsEditing(false);
    };

    return (
        <Box sx={{ display: 'flex', gap: { xs: 1, sm: 2 } }}>
            <Box sx={{ display: { xs: 'none', sm: 'block' }, flexShrink: 0 }}>
                <UserAvatar name={comment.userName} size={32} bgcolor="secondary.main" />
            </Box>
            <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 0.5, mb: 0.5 }}>
                    <Typography variant="subtitle2" fontWeight="bold" sx={{ wordBreak: 'break-word' }}>
                        {comment.userName}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        {new Date(comment.date).toLocaleDateString()}
                    </Typography>
                    {comment.edited && (
                        <Typography variant="caption" color="text.secondary">(edited)</Typography>
                    )}
                </Box>

                {isEditing ? (
                    <Box>
                        <TextField
                            fullWidth size="small" multiline
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            sx={{ bgcolor: 'white', mb: 1 }}
                            autoFocus
                        />
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <Button variant="contained" size="small" onClick={handleSave}>Save</Button>
                            <Button size="small" onClick={() => setIsEditing(false)}>Cancel</Button>
                        </Box>
                    </Box>
                ) : (
                    <Box sx={{ bgcolor: 'white', p: 1.5, borderRadius: 1, mb: 0.5 }}>
                        <Typography variant="body2">{comment.text}</Typography>
                    </Box>
                )}

                {isOwner && !isEditing && (
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Typography variant="caption" sx={{ cursor: 'pointer', textDecoration: 'underline' }}
                            onClick={() => { setIsEditing(true); setEditText(comment.text); }}>
                            Edit
                        </Typography>
                        <Typography variant="caption"
                            sx={{ cursor: 'pointer', textDecoration: 'underline', color: 'error.main' }}
                            onClick={() => onDelete(comment._id)}>
                            Delete
                        </Typography>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default CardCommentItem;
