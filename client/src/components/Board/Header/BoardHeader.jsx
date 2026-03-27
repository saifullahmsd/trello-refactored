import { Box, Typography, TextField, Button, IconButton, InputAdornment, Tooltip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PeopleIcon from '@mui/icons-material/People';
import HistoryIcon from '@mui/icons-material/History';
import DeleteIcon from '@mui/icons-material/Delete';

const BoardHeader = ({
    boardTitle, isEditingTitle, onTitleChange, onTitleSave, onTitleEditToggle,
    cardSearch, onSearchChange,
    onInvite, onActivity, onDelete
}) => (
    <Box sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between',
        alignItems: { xs: 'flex-start', sm: 'center' },
        gap: { xs: 1.5, sm: 0 },
        mb: 2
    }}>
        {/* Title */}
        {isEditingTitle ? (
            <TextField
                value={boardTitle} onChange={(e) => onTitleChange(e.target.value)}
                onBlur={onTitleSave}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') onTitleSave();
                    if (e.key === 'Escape') onTitleEditToggle(false);
                }}
                autoFocus size="small"
                sx={{
                    '& .MuiOutlinedInput-root': {
                        color: 'white', fontSize: { xs: '1rem', sm: '1.25rem' }, fontWeight: 'bold',
                        '& fieldset': { borderColor: 'white' }
                    },
                    width: { xs: '100%', sm: 'auto' }
                }}
            />
        ) : (
            <Typography
                variant="h5" color="white" fontWeight="bold"
                onClick={() => onTitleEditToggle(true)}
                sx={{
                    cursor: 'pointer', '&:hover': { opacity: 0.8 },
                    fontSize: { xs: '1.1rem', sm: '1.5rem' }
                }}
            >
                {boardTitle}
            </Typography>
        )}

        {/* Search + Actions Row */}
        <Box sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: 1,
            width: { xs: '100%', sm: 'auto' }
        }}>
            {/* Search */}
            <TextField
                size="small" placeholder="Filter cards..." value={cardSearch}
                onChange={(e) => onSearchChange(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon fontSize="small" sx={{ color: 'white' }} />
                        </InputAdornment>
                    )
                }}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        color: 'white',
                        '& fieldset': { borderColor: 'rgba(255,255,255,0.5)' },
                        '&:hover fieldset': { borderColor: 'white' }
                    },
                    '& input::placeholder': { color: 'rgba(255,255,255,0.7)' },
                    width: { xs: '100%', sm: 160 },
                    flexGrow: { xs: 1, sm: 0 }
                }}
            />

            {/* Desktop action buttons */}
            <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 1 }}>
                <Button variant="contained" startIcon={<PeopleIcon />} onClick={onInvite} size="small"
                    sx={{ bgcolor: 'rgba(255,255,255,0.25)', '&:hover': { bgcolor: 'rgba(255,255,255,0.35)' } }}>
                    Invite
                </Button>
                <Button variant="contained" startIcon={<HistoryIcon />} onClick={onActivity} size="small"
                    sx={{ bgcolor: 'rgba(255,255,255,0.25)', '&:hover': { bgcolor: 'rgba(255,255,255,0.35)' } }}>
                    Activity
                </Button>
                <Button variant="contained" color="error" startIcon={<DeleteIcon />}
                    onClick={onDelete} size="small">
                    Delete
                </Button>
            </Box>

            {/* Mobile icon-only buttons */}
            <Box sx={{ display: { xs: 'flex', sm: 'none' }, gap: 0.5 }}>
                <Tooltip title="Invite">
                    <IconButton onClick={onInvite} size="small"
                        sx={{ bgcolor: 'rgba(255,255,255,0.25)', color: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.35)' } }}>
                        <PeopleIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Activity">
                    <IconButton onClick={onActivity} size="small"
                        sx={{ bgcolor: 'rgba(255,255,255,0.25)', color: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.35)' } }}>
                        <HistoryIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete Board">
                    <IconButton onClick={onDelete} size="small"
                        sx={{ bgcolor: 'rgba(211,47,47,0.8)', color: 'white', '&:hover': { bgcolor: '#d32f2f' } }}>
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            </Box>
        </Box>
    </Box>
);

export default BoardHeader;
