import { useState } from 'react';
import { Box, Divider, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LabelIcon from '@mui/icons-material/Label';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import PaletteIcon from '@mui/icons-material/Palette';
import SidebarButton from '../../ui/SidebarButton';
import MembersPopover from './Popovers/MembersPopover';
import AttachmentPopover from './Popovers/AttachmentPopover';
import CoverPopover from './Popovers/CoverPopover';

const CardSidebar = ({
    card, board,
    onToggleMember,
    onOpenLabels,
    onOpenChecklist,
    onAddAttachment,
    onUpdateCover,
    onSaveDate,
    onDeleteCard
}) => {
    const [memberAnchorEl, setMemberAnchorEl] = useState(null);
    const [attachAnchorEl, setAttachAnchorEl] = useState(null);
    const [coverAnchorEl, setCoverAnchorEl] = useState(null);

    return (
        <>
            <Typography variant="subtitle2" color="text.secondary" fontWeight="bold" sx={{ mb: 1 }}>
                Add to card
            </Typography>
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr 1fr', md: '1fr' },
                gap: 1
            }}>
                <SidebarButton icon={<PersonIcon />} label="Members"
                    onClick={(e) => setMemberAnchorEl(e.currentTarget)} />
                <MembersPopover
                    anchorEl={memberAnchorEl} onClose={() => setMemberAnchorEl(null)}
                    board={board} card={card} onToggleMember={onToggleMember}
                />

                <SidebarButton icon={<LabelIcon />} label="Labels" onClick={onOpenLabels} />
                <SidebarButton label="Checklist" onClick={onOpenChecklist} />

                <SidebarButton icon={<AttachFileIcon />} label="Attachment"
                    onClick={(e) => setAttachAnchorEl(e.currentTarget)} />
                <AttachmentPopover
                    anchorEl={attachAnchorEl} onClose={() => setAttachAnchorEl(null)}
                    onAdd={onAddAttachment}
                />

                <SidebarButton icon={<PaletteIcon />} label="Cover"
                    onClick={(e) => setCoverAnchorEl(e.currentTarget)} />
                <CoverPopover
                    anchorEl={coverAnchorEl} onClose={() => setCoverAnchorEl(null)}
                    currentColor={card.cover?.color} onSelectColor={onUpdateCover}
                />

                <Box sx={{ position: 'relative' }}>
                    <SidebarButton label="Start Date" onClick={() => {
                        try { document.getElementById('start-date-input')?.showPicker(); }
                        catch (e) { console.error(e); }
                    }} />
                    <input
                        id="start-date-input" type="date"
                        onChange={(e) => onSaveDate('start', e.target.value)}
                        style={{ position: 'absolute', bottom: 0, left: 0, opacity: 0, width: 0, height: 0 }}
                    />
                </Box>

                <Box sx={{ position: 'relative' }}>
                    <SidebarButton label="Due Date" onClick={() => {
                        try { document.getElementById('due-date-input')?.showPicker(); }
                        catch (e) { console.error(e); }
                    }} />
                    <input
                        id="due-date-input" type="date"
                        onChange={(e) => onSaveDate('due', e.target.value)}
                        style={{ position: 'absolute', bottom: 0, left: 0, opacity: 0, width: 0, height: 0 }}
                    />
                </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle2" color="text.secondary" fontWeight="bold" sx={{ mb: 1 }}>
                Actions
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <SidebarButton label="Delete" color="error"
                    sx={{ color: 'white' }} onClick={onDeleteCard} />
            </Box>
        </>
    );
};

export default CardSidebar;
