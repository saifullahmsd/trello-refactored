import { useState } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Button, Typography, Alert, Box, Avatar, Chip
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useInviteMemberMutation } from '../../store/api/boardApiSlice';

const InviteMemberModal = ({ open, onClose, boardId, currentMembers = [] }) => {
    const [email, setEmail] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [inviteMember, { isLoading }] = useInviteMemberMutation();

    const handleInvite = async (e) => {
        e.preventDefault();
        setSuccessMsg('');
        setErrorMsg('');
        if (!email.trim()) return;
        try {
            await inviteMember({ boardId, email }).unwrap();
            setSuccessMsg(`${email} invited successfully`);
            setEmail('');
        } catch (error) {
            setErrorMsg(error?.data?.error || 'Failed to invite member')
        }
    };

    const handleClose = () => {
        onClose();
        setEmail('');
        setSuccessMsg('');
        setErrorMsg('');
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PersonAddIcon color="primary" />
                Invite Member
            </DialogTitle>
            <DialogContent>
                {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
                {successMsg && <Alert severity="success">{successMsg}</Alert>}
                <Box component="form" onSubmit={handleInvite}>
                    <TextField autoFocus fullWidth label="Email Address" type="email"
                        value={email} onChange={(e) => setEmail(e.target.value)}
                        placeholder="example@email.com" sx={{ mt: 1 }} />
                </Box>
                {currentMembers.length > 0 && (
                    <Box sx={{ mt: 3 }}>
                        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                            Current Members:
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                            {currentMembers.map((member, index) => (
                                <Chip key={index}
                                    avatar={<Avatar>{member?.name?.[0]?.toUpperCase() || 'U'}</Avatar>}
                                    label={member?.name || 'Member'} variant="outlined" size="small"
                                />
                            ))}
                        </Box>
                    </Box>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button variant="contained" onClick={handleInvite}
                    disabled={isLoading || !email.trim()} startIcon={<PersonAddIcon />}>
                    {isLoading ? 'Inviting...' : 'Invite'}
                </Button>
            </DialogActions>
        </Dialog>
    )
}
export default InviteMemberModal;
