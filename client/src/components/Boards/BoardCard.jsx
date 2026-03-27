import { Card, CardContent, Typography } from '@mui/material';

const BoardCard = ({ board, onClick }) => (
    <Card
        sx={{
            height: { xs: 80, sm: 100 }, p: 2,
            backgroundColor: board.isImage ? 'transparent' : (board.backgroundLink || board.background),
            backgroundImage: board.isImage ? `url(${board.backgroundLink || board.background})` : 'none',
            backgroundSize: 'cover', backgroundPosition: 'center',
            color: 'white', cursor: 'pointer', transition: '0.2s',
            '&:hover': { opacity: 0.9, transform: 'scale(1.02)' }
        }}
        onClick={onClick}
    >
        <CardContent sx={{ p: '8px !important' }}>
            <Typography
                variant="subtitle1" fontWeight="bold"
                sx={{
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    wordBreak: 'break-word',
                    lineHeight: 1.3,
                    fontSize: { xs: '0.9rem', sm: '1rem' }
                }}
            >
                {board.title}
            </Typography>
        </CardContent>
    </Card>
);

export default BoardCard;
