import { Avatar } from '@mui/material';

const UserAvatar = ({ name, size = 32, bgcolor = 'primary.main', fontSize = '0.85rem', sx = {} }) => (
    <Avatar sx={{ width: size, height: size, bgcolor, fontSize, fontWeight: 'bold', ...sx }}>
        {name ? name.charAt(0).toUpperCase() : 'U'}
    </Avatar>
);

export default UserAvatar;
