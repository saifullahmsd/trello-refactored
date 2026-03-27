import { Box, Button } from '@mui/material';
import PopoverWrapper from '../../../ui/PopoverWrapper';

const COVER_COLORS = [
    '#61bd4f', '#f2d600', '#ff9f1a', '#eb5a46', '#c377e0',
    '#0079bf', '#00c2e0', '#51e898', '#ff78cb', '#344563'
];

const CoverPopover = ({ anchorEl, onClose, currentColor, onSelectColor }) => (
    <PopoverWrapper anchorEl={anchorEl} onClose={onClose} title="Card Color" width={240}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1.5 }}>
            {COVER_COLORS.map(color => (
                <Box
                    key={color}
                    onClick={() => onSelectColor(color)}
                    sx={{
                        width: 36, height: 28, bgcolor: color, borderRadius: 1,
                        cursor: 'pointer', border: currentColor === color ? '3px solid #000' : 'none',
                        '&:hover': { opacity: 0.85 }
                    }}
                />
            ))}
        </Box>
        {currentColor && (
            <Button size="small" fullWidth variant="outlined" color="error"
                onClick={() => onSelectColor(null)}>
                Remove Cover
            </Button>
        )}
    </PopoverWrapper>
);

export default CoverPopover;
