import { Box, Typography, Checkbox } from '@mui/material';
import SectionHeader from '../../ui/SectionHeader';

const CardDatesDisplay = ({ card, onToggleComplete }) => {
    if (!card.date?.startDate && !card.date?.dueDate) return null;

    return (
        <Box sx={{ mb: 4 }}>
            <SectionHeader title="Dates" />
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                {card.date?.startDate && (
                    <Box>
                        <Typography variant="caption" color="text.secondary">Start Date</Typography>
                        <Box sx={{ bgcolor: 'rgba(9, 30, 66, 0.04)', px: 1.5, py: 0.5, borderRadius: 1 }}>
                            <Typography variant="body2">
                                {new Date(card.date.startDate).toLocaleDateString()}
                            </Typography>
                        </Box>
                    </Box>
                )}
                {card.date?.dueDate && (
                    <Box display="flex" alignItems="center">
                        <Checkbox
                            checked={card.date.completed}
                            onChange={onToggleComplete}
                            sx={{ p: 0.5, mr: 1 }}
                        />
                        <Box>
                            <Typography variant="caption" color="text.secondary">Due Date</Typography>
                            <Box sx={{
                                bgcolor: card.date.completed ? '#61bd4f' : 'rgba(9, 30, 66, 0.04)',
                                color: card.date.completed ? 'white' : 'inherit',
                                px: 1.5, py: 0.5, borderRadius: 1
                            }}>
                                <Typography variant="body2">
                                    {new Date(card.date.dueDate).toLocaleDateString()}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default CardDatesDisplay;
