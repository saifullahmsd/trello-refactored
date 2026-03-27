import { useState } from 'react';
import { Typography, Container, Box, CircularProgress, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PeopleIcon from '@mui/icons-material/People';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetBoardsQuery } from '../store/api/boardApiSlice';
import CreateBoardModal from '../components/Boards/CreateBoardModal';
import BoardsSection from '../components/Boards/BoardsSection';

const Dashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const { userInfo } = useSelector((state) => state.auth);
    const { data: boards, isLoading, isError } = useGetBoardsQuery();

    const filtered = boards?.filter(b =>
        b.title.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

    const myBoards = filtered.filter(b => b.user === userInfo?._id || b.user?._id === userInfo?._id);
    const memberBoards = filtered.filter(b => b.user !== userInfo?._id && b.user?._id !== userInfo?._id);

    return (
        <Container maxWidth="lg" sx={{ mt: { xs: 2, sm: 4 }, pb: 6, px: { xs: 2, sm: 3 } }}>
            <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'space-between',
                alignItems: { xs: 'flex-start', sm: 'center' },
                gap: 2,
                mb: 4
            }}>
                <Typography variant="h5" fontWeight="bold">Boards</Typography>
                <TextField
                    size="small" placeholder="Search boards..." value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    InputProps={{
                        startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment>
                    }}
                    sx={{ width: { xs: '100%', sm: 220 } }}
                />
            </Box>

            {isLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress /></Box>
            ) : isError ? (
                <Typography color="error">Failed to load boards.</Typography>
            ) : (
                <>
                    <BoardsSection
                        title="Your Boards" icon="📋"
                        boards={myBoards}
                        onBoardClick={(id) => navigate(`/boards/${id}`)}
                        onCreateNew={() => setIsModalOpen(true)}
                        searchQuery={searchQuery}
                    />
                    {memberBoards.length > 0 && (
                        <BoardsSection
                            title="Boards You're a Member Of"
                            icon={<PeopleIcon fontSize="small" />}
                            boards={memberBoards}
                            onBoardClick={(id) => navigate(`/boards/${id}`)}
                            isMember
                        />
                    )}
                </>
            )}

            <CreateBoardModal open={isModalOpen} handleClose={() => setIsModalOpen(false)} />
        </Container>
    );
};

export default Dashboard;
