import { Box, Typography, Grid, Card, Chip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PeopleIcon from '@mui/icons-material/People';
import BoardCard from './BoardCard';

const BoardsSection = ({ title, icon, boards, onBoardClick, onCreateNew, isMember = false, searchQuery = '' }) => (
    <Box sx={{ mb: 5 }}>
        <Typography variant="subtitle1" fontWeight="bold"
            sx={{ mb: 2, color: '#172b4d', display: 'flex', alignItems: 'center', gap: 1 }}>
            {icon} {title}
        </Typography>
        <Grid container spacing={3}>
            {boards.map((board) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={board._id}>
                    {isMember ? (
                        <Box sx={{ position: 'relative', height: { xs: 80, sm: 100 } }}>
                            <BoardCard board={board} onClick={() => onBoardClick(board._id)} />
                            <Chip label="Member" size="small" icon={<PeopleIcon />}
                                sx={{
                                    position: 'absolute', top: 6, right: 6,
                                    bgcolor: 'rgba(0,0,0,0.55)', color: 'white',
                                    fontSize: '0.65rem', height: 20,
                                    '& .MuiChip-icon': { color: 'white', fontSize: '0.75rem' }
                                }}
                            />
                        </Box>
                    ) : (
                        <BoardCard board={board} onClick={() => onBoardClick(board._id)} />
                    )}
                </Grid>
            ))}

            {boards.length === 0 && searchQuery && (
                <Grid item xs={12}>
                    <Typography color="text.secondary" sx={{ mt: 1 }}>
                        No boards found for "{searchQuery}"
                    </Typography>
                </Grid>
            )}

            {onCreateNew && (
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Card sx={{
                        height: { xs: 80, sm: 100 }, p: 1, backgroundColor: '#e0e0e0',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', '&:hover': { backgroundColor: '#d5d5d5' }
                    }} onClick={onCreateNew}>
                        <Typography display="flex" alignItems="center" color="text.secondary" fontWeight="bold">
                            <AddIcon sx={{ mr: 1 }} /> Create new board
                        </Typography>
                    </Card>
                </Grid>
            )}
        </Grid>
    </Box>
);

export default BoardsSection;
