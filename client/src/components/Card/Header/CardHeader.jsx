import { DialogTitle, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const CardHeader = ({ card, onClose }) => (
    <DialogTitle sx={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
        px: { xs: 2, sm: 3 }, py: { xs: 1.5, sm: 2 }
    }}>
        <Box sx={{ flexGrow: 1, pr: 1 }}>
            <Typography variant="h6" fontWeight="bold" sx={{ wordBreak: 'break-word', fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                {card.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                in list <span style={{ textDecoration: 'underline' }}>{card.listTitle}</span>
            </Typography>
        </Box>
        <IconButton onClick={onClose} size="small" sx={{ flexShrink: 0 }}><CloseIcon /></IconButton>
    </DialogTitle>
);

export default CardHeader;
