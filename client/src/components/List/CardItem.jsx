import { useState } from 'react';
import { Card as MuiCard, Typography, Box, Avatar, Chip } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import AttachmentIcon from '@mui/icons-material/InsertLink';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DescriptionIcon from '@mui/icons-material/DescriptionOutlined';
import { Draggable } from 'react-beautiful-dnd';
import EditCardModal from '../Card/EditCardModal';

const CardItem = ({ card, index }) => {
    const [isModelOpen, setIsModelOpen] = useState(false);

    let totalItems = 0, completedItems = 0;
    card.checklists?.forEach(cl => {
        cl.items?.forEach(item => {
            totalItems++;
            if (item.completed) completedItems++;
        });
    });

    const commentCount = card.comments?.length || 0;
    const activeLabels = card.labels || [];

    const getDueDateColor = () => {
        if (!card.date?.dueDate) return null;
        if (card.date?.completed) return '#61bd4f';
        if (new Date(card.date.dueDate) < new Date()) return '#ec9488';
        return 'rgba(9, 30, 66, 0.08)';
    };

    const coverColor = card.cover?.color || null;
    const isSizeOne = true;

    return (
        <>
            <Draggable draggableId={card._id} index={index}>
                {(provided, snapshot) => (
                    <MuiCard
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        sx={{
                            mb: 1.5,
                            cursor: 'grab',
                            backgroundColor: (!isSizeOne && coverColor) ? coverColor : 'white',
                            boxShadow: snapshot.isDragging ? 3 : 1,
                            overflow: 'hidden',
                            '&:hover': { boxShadow: 3 },
                        }}
                        onClick={() => setIsModelOpen(true)}
                    >
                        {coverColor && isSizeOne && (
                            <Box sx={{ height: 36, bgcolor: coverColor, width: '100%' }} />
                        )}

                        <Box sx={{ p: 1.5 }}>
                            {activeLabels.length > 0 && (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 0.8 }}>
                                    {activeLabels.map((label, i) => (
                                        <Box key={i} sx={{
                                            height: 8, width: 40, borderRadius: 1,
                                            bgcolor: label.color
                                        }} />
                                    ))}
                                </Box>
                            )}

                            <Typography variant="body2" sx={{ mb: 1, color: (!isSizeOne && coverColor) ? 'white' : 'inherit' }}>
                                {card.title}
                            </Typography>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
                                    {card.date?.dueDate && (
                                        <Box sx={{
                                            display: 'flex', alignItems: 'center', gap: 0.3,
                                            bgcolor: getDueDateColor(), borderRadius: 1,
                                            px: 0.7, py: 0.2
                                        }}>
                                            <AccessTimeIcon sx={{ fontSize: 12 }} />
                                            <Typography variant="caption" fontSize="0.65rem">
                                                {new Date(card.date.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                            </Typography>
                                        </Box>
                                    )}

                                    {card.description && (
                                        <DescriptionIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                                    )}

                                    {commentCount > 0 && (
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
                                            <ChatBubbleOutlineIcon sx={{ fontSize: 13, color: 'text.secondary' }} />
                                            <Typography variant="caption" color="text.secondary">{commentCount}</Typography>
                                        </Box>
                                    )}

                                    {card.attachments?.length > 0 && (
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
                                            <AttachmentIcon sx={{ fontSize: 13, color: 'text.secondary' }} />
                                            <Typography variant="caption" color="text.secondary">{card.attachments.length}</Typography>
                                        </Box>
                                    )}

                                    {totalItems > 0 && (
                                        <Box sx={{
                                            display: 'flex', alignItems: 'center', gap: 0.3,
                                            bgcolor: completedItems === totalItems ? '#61bd4f' : 'transparent',
                                            borderRadius: 1, px: 0.5
                                        }}>
                                            <CheckBoxOutlinedIcon sx={{ fontSize: 13, color: completedItems === totalItems ? 'white' : 'text.secondary' }} />
                                            <Typography variant="caption" color={completedItems === totalItems ? 'white' : 'text.secondary'}>
                                                {completedItems}/{totalItems}
                                            </Typography>
                                        </Box>
                                    )}
                                </Box>

                                {card.members?.length > 0 && (
                                    <Box sx={{ display: 'flex', gap: 0.3 }}>
                                        {card.members.slice(0, 3).map((memberId, i) => (
                                            <Avatar key={i} sx={{ width: 24, height: 24, fontSize: '0.7rem', bgcolor: 'primary.main' }}>
                                                ?
                                            </Avatar>
                                        ))}
                                    </Box>
                                )}
                            </Box>
                        </Box>
                    </MuiCard>
                )}
            </Draggable>
            <EditCardModal open={isModelOpen} handleClose={() => setIsModelOpen(false)} card={card} />
        </>
    );
};

export default CardItem;
