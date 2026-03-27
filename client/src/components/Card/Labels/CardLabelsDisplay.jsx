import { Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SectionHeader from '../../ui/SectionHeader';

const CardLabelsDisplay = ({ card, onAddLabel }) => {
    if (!card.labels || card.labels.length === 0) return null;

    return (
        <Box sx={{ mb: 4 }}>
            <SectionHeader title="Labels" />
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {card.labels.map((label, index) => (
                    <Box
                        key={index}
                        sx={{
                            bgcolor: label.color, color: 'white',
                            px: 2, py: 0.5, borderRadius: 1,
                            fontSize: '0.85rem', fontWeight: 'bold'
                        }}
                    >
                        {label.text}
                    </Box>
                ))}
                <Box
                    onClick={onAddLabel}
                    sx={{
                        bgcolor: 'rgba(9, 30, 66, 0.04)', px: 1.5, py: 0.5,
                        borderRadius: 1, cursor: 'pointer', display: 'flex', alignItems: 'center',
                        '&:hover': { bgcolor: 'rgba(9, 30, 66, 0.08)' }
                    }}
                >
                    <AddIcon fontSize="small" />
                </Box>
            </Box>
        </Box>
    );
};

export default CardLabelsDisplay;
