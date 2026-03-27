import { Box, Typography } from '@mui/material';

const SectionHeader = ({ icon, title, action }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        {icon && <Box sx={{ mr: 1, color: 'text.secondary', display: 'flex' }}>{icon}</Box>}
        <Typography variant="subtitle2" fontWeight="bold" sx={{ flexGrow: 1 }}>
            {title}
        </Typography>
        {action}
    </Box>
);

export default SectionHeader;
