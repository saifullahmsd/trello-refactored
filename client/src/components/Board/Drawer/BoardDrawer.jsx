import { useState } from 'react';
import { Box, Typography, Drawer, Tabs, Tab, IconButton, TextField, Button, Divider } from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import UserAvatar from '../../ui/UserAvatar';
import BackgroundPicker from '../Background/BackgroundPicker';

const BoardDrawer = ({ open, onClose, board, boardDesc, onDescChange, onDescSave, onBackgroundChange }) => {
    const [tab, setTab] = useState(0);

    return (
        <Drawer anchor="right" open={open} onClose={onClose}
            PaperProps={{ sx: { width: { xs: '100%', sm: 340 }, bgcolor: '#f4f5f7', display: 'flex', flexDirection: 'column' } }}>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2, bgcolor: '#0052cc' }}>
                <Typography variant="subtitle1" fontWeight="bold" sx={{ color: 'white' }}>Board Menu</Typography>
                <IconButton onClick={onClose} size="small" sx={{ color: 'white' }}><CloseIcon /></IconButton>
            </Box>

            <Tabs value={tab} onChange={(_, v) => setTab(v)} variant="fullWidth"
                sx={{ bgcolor: 'white', borderBottom: '1px solid #e1e4e8', minHeight: 40,
                    '& .MuiTab-root': { minHeight: 40, textTransform: 'none', fontWeight: 'bold', fontSize: '0.85rem' } }}>
                <Tab icon={<HistoryIcon sx={{ fontSize: 18 }} />} iconPosition="start" label="Activity" />
                <Tab icon={<InfoIcon sx={{ fontSize: 18 }} />} iconPosition="start" label="About" />
            </Tabs>

            <Box sx={{ p: 2, overflowY: 'auto', flexGrow: 1 }}>
                {tab === 0 && (
                    <>
                        {(!board?.activity || board.activity.length === 0) ? (
                            <Box sx={{ textAlign: 'center', mt: 6 }}>
                                <HistoryIcon sx={{ fontSize: 48, color: '#ccc', mb: 1 }} />
                                <Typography color="text.secondary" variant="body2">No activity yet.</Typography>
                                <Typography color="text.disabled" variant="caption">Actions like comments will appear here.</Typography>
                            </Box>
                        ) : (
                            board.activity.map((log, index) => (
                                <Box key={index} sx={{
                                    display: 'flex', gap: 1.5, mb: 2, pb: 2,
                                    borderBottom: index < board.activity.length - 1 ? '1px solid #e1e4e8' : 'none'
                                }}>
                                    <UserAvatar name={log.user} size={32} bgcolor="#0052cc" fontSize="0.8rem" />
                                    <Box>
                                        <Typography variant="caption" fontWeight="bold" display="block">{log.user}</Typography>
                                        <Typography variant="caption" color="text.secondary" display="block" sx={{ lineHeight: 1.4 }}>
                                            {log.action}
                                        </Typography>
                                        <Typography variant="caption" color="text.disabled" fontSize="0.65rem">
                                            {new Date(log.date).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                        </Typography>
                                    </Box>
                                </Box>
                            ))
                        )}
                    </>
                )}

                {tab === 1 && (
                    <>
                        <Typography variant="caption" fontWeight="bold" color="text.secondary"
                            sx={{ textTransform: 'uppercase', letterSpacing: 0.5, mb: 1.5, display: 'block' }}>
                            Board Admin
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3, p: 1.5, bgcolor: 'white', borderRadius: 2 }}>
                            <UserAvatar name={board?.user?.name} size={40} bgcolor="#0052cc" />
                            <Box>
                                <Typography variant="body2" fontWeight="bold">{board?.user?.name}</Typography>
                                <Typography variant="caption" color="text.secondary">{board?.user?.email}</Typography>
                            </Box>
                        </Box>

                        {board?.members?.length > 0 && (
                            <>
                                <Typography variant="caption" fontWeight="bold" color="text.secondary"
                                    sx={{ textTransform: 'uppercase', letterSpacing: 0.5, mb: 1.5, display: 'block' }}>
                                    Members ({board.members.length})
                                </Typography>
                                <Box sx={{ mb: 3 }}>
                                    {board.members.map((member) => (
                                        <Box key={member._id} sx={{
                                            display: 'flex', alignItems: 'center', gap: 1.5,
                                            p: 1, mb: 0.5, bgcolor: 'white', borderRadius: 1.5
                                        }}>
                                            <UserAvatar name={member.name} size={32} bgcolor="#00897b" />
                                            <Box>
                                                <Typography variant="body2" fontWeight="500">{member.name}</Typography>
                                                <Typography variant="caption" color="text.secondary">{member.email}</Typography>
                                            </Box>
                                        </Box>
                                    ))}
                                </Box>
                            </>
                        )}

                        <Typography variant="caption" fontWeight="bold" color="text.secondary"
                            sx={{ textTransform: 'uppercase', letterSpacing: 0.5, mb: 1, display: 'block' }}>
                            Change Background
                        </Typography>
                        <Box sx={{ mb: 3, p: 1, bgcolor: 'white', borderRadius: 1 }}>
                            <BackgroundPicker 
                                selectedBgLink={board?.backgroundLink || board?.background} 
                                onSelectBg={onBackgroundChange} 
                            />
                        </Box>

                        <Typography variant="caption" fontWeight="bold" color="text.secondary"
                            sx={{ textTransform: 'uppercase', letterSpacing: 0.5, mb: 1, display: 'block' }}>
                            Description
                        </Typography>
                        <TextField fullWidth multiline minRows={3} size="small"
                            value={boardDesc} onChange={(e) => onDescChange(e.target.value)}
                            placeholder="Add a description to let people know what this board is about..."
                            sx={{ bgcolor: 'white', borderRadius: 1, mb: 1 }}
                        />
                        <Button variant="contained" size="small" onClick={onDescSave}
                            disabled={boardDesc === (board?.description || '')} sx={{ mb: 3 }}>
                            Save Description
                        </Button>

                        <Divider sx={{ mb: 2 }} />
                        <Typography variant="caption" color="text.disabled">
                            Board created: {new Date(board?.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </Typography>
                    </>
                )}
            </Box>
        </Drawer>
    );
};

export default BoardDrawer;
