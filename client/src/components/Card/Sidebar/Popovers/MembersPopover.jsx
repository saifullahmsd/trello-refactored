import { Box, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import UserAvatar from '../../../ui/UserAvatar';
import PopoverWrapper from '../../../ui/PopoverWrapper';

const MembersPopover = ({ anchorEl, onClose, board, card, onToggleMember }) => (
    <PopoverWrapper anchorEl={anchorEl} onClose={onClose} title="Board Members" width={250}>
        <List dense>
            {board && (
                <ListItem
                    button
                    onClick={() => onToggleMember(board.user?._id || board.user)}
                    sx={{ borderRadius: 1, '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' } }}
                >
                    <ListItemAvatar>
                        <UserAvatar name="O" size={28} />
                    </ListItemAvatar>
                    <ListItemText primary="Owner" />
                    {card.members?.includes(board.user?._id || board.user) && (
                        <Typography variant="caption" color="primary">✓</Typography>
                    )}
                </ListItem>
            )}
            {board?.members?.map((member) => {
                const isAssigned = card.members?.some(
                    m => m === member._id || m?._id === member._id
                );
                return (
                    <ListItem
                        button key={member._id}
                        onClick={() => onToggleMember(member._id)}
                        sx={{ borderRadius: 1, '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' } }}
                    >
                        <ListItemAvatar>
                            <UserAvatar name={member.name} size={28} bgcolor="secondary.main" />
                        </ListItemAvatar>
                        <ListItemText primary={member.name} secondary={member.email} />
                        {isAssigned && (
                            <Typography variant="caption" color="primary" fontWeight="bold">✓</Typography>
                        )}
                    </ListItem>
                );
            })}
        </List>
    </PopoverWrapper>
);

export default MembersPopover;
