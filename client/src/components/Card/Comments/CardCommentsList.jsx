import { Box } from '@mui/material';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import SectionHeader from '../../ui/SectionHeader';
import CardCommentInput from './CardCommentInput';
import CardCommentItem from './CardCommentItem';

const CardCommentsList = ({ card, userName, userId, onAdd, onUpdate, onDelete }) => (
    <Box sx={{ mt: 4, mb: 2 }}>
        <SectionHeader icon={<FormatListBulletedIcon />} title="Activity" />
        <CardCommentInput userName={userName} onSubmit={onAdd} />
        {card.comments && card.comments.length > 0 && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {[...card.comments].reverse().map((comment) => (
                    <CardCommentItem
                        key={comment._id}
                        comment={comment}
                        isOwner={comment.user === userId}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                    />
                ))}
            </Box>
        )}
    </Box>
);

export default CardCommentsList;
