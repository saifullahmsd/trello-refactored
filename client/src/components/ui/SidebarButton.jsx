import { Button } from '@mui/material';

const SidebarButton = ({ icon, label, onClick, color = 'secondary', sx = {} }) => (
    <Button
        fullWidth
        variant="contained"
        color={color}
        startIcon={icon}
        onClick={onClick}
        sx={{ justifyContent: 'flex-start', color: '#172b4d', textTransform: 'none', ...sx }}
    >
        {label}
    </Button>
);

export default SidebarButton;
