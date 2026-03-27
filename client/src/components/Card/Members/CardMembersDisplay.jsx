import { Box, Chip } from '@mui/material';
import UserAvatar from '../../ui/UserAvatar';
import SectionHeader from '../../ui/SectionHeader';

const CardMembersDisplay = ({ card, board }) => {
    if (!card.members || card.members.length === 0) return null;

    return (
        <Box sx={{ mb: 3 }}>
            <SectionHeader title="Members" />
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {card.members.map((memberId, index) => {
                    const member = board?.members?.find(m => m._id === memberId || m._id === memberId?._id);
                    const isOwner = board?.user?._id === memberId || board?.user?._id === memberId?._id;
                    const name = member?.name || (isOwner ? board?.user?.name : 'Member');
                    return (
                        <Chip
                            key={index}
                            avatar={<UserAvatar name={name} size={24} />}
                            label={name}
                            size="small"
                            variant="outlined"
                        />
                    );
                })}
            </Box>
        </Box>
    );
};

export default CardMembersDisplay;
