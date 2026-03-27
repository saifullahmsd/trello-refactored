import { Popover, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const PopoverWrapper = ({ anchorEl, onClose, title, children, width = 280 }) => (
    <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={onClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
    >
        <Box sx={{ width }}>
            {title && (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, pt: 1.5, pb: 1 }}>
                    <Typography variant="subtitle2" fontWeight="bold">{title}</Typography>
                    <IconButton size="small" onClick={onClose}><CloseIcon fontSize="small" /></IconButton>
                </Box>
            )}
            <Box sx={{ px: 2, pb: 2 }}>
                {children}
            </Box>
        </Box>
    </Popover>
);

export default PopoverWrapper;
