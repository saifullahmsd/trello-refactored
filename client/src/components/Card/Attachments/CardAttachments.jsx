import { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import SectionHeader from '../../ui/SectionHeader';

const CardAttachments = ({ card, onAdd, onUpdate, onDelete }) => {
    const [editingId, setEditingId] = useState(null);
    const [editLink, setEditLink] = useState('');
    const [editName, setEditName] = useState('');

    const startEdit = (att) => {
        setEditingId(att._id);
        setEditLink(att.link);
        setEditName(att.name || '');
    };

    const handleSave = (attId) => {
        onUpdate(attId, editLink, editName);
        setEditingId(null);
    };

    return (
        <Box sx={{ mb: 4 }}>
            <SectionHeader title="📎 Attachments" />
            {card.attachments?.map((att) => (
                <Box key={att._id} sx={{ bgcolor: 'white', borderRadius: 1, mb: 1, p: 1.5 }}>
                    {editingId === att._id ? (
                        <Box>
                            <TextField fullWidth size="small" label="Link" value={editLink}
                                onChange={(e) => setEditLink(e.target.value)} sx={{ mb: 1 }} />
                            <TextField fullWidth size="small" label="Display Name" value={editName}
                                onChange={(e) => setEditName(e.target.value)} sx={{ mb: 1 }} />
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <Button variant="contained" size="small" onClick={() => handleSave(att._id)}>Save</Button>
                                <Button size="small" onClick={() => setEditingId(null)}>Cancel</Button>
                            </Box>
                        </Box>
                    ) : (
                        <Box sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' },
                            justifyContent: 'space-between',
                            alignItems: { xs: 'flex-start', sm: 'center' },
                            gap: 1
                        }}>
                            <Box sx={{ minWidth: 0, flex: 1 }}>
                                <Typography variant="body2" fontWeight="bold"
                                    component="a" href={att.link} target="_blank"
                                    sx={{ color: 'primary.main', textDecoration: 'none', wordBreak: 'break-all' }}>
                                    {att.name || att.link}
                                </Typography>
                                <Typography variant="caption" color="text.secondary" display="block">
                                    Added {new Date(att.date).toLocaleDateString()}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', gap: 1, flexShrink: 0 }}>
                                <Button size="small" variant="outlined" onClick={() => startEdit(att)}>Edit</Button>
                                <Button size="small" color="error" variant="outlined"
                                    onClick={() => onDelete(att._id)}>Delete</Button>
                            </Box>
                        </Box>
                    )}
                </Box>
            ))}
        </Box>
    );
};

export default CardAttachments;
