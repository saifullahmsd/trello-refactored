import { useState } from 'react';
import { TextField, Button } from '@mui/material';
import PopoverWrapper from '../../../ui/PopoverWrapper';

const AttachmentPopover = ({ anchorEl, onClose, onAdd }) => {
    const [link, setLink] = useState('');
    const [name, setName] = useState('');

    const handleAttach = async () => {
        await onAdd(link, name);
        setLink('');
        setName('');
        onClose();
    };

    return (
        <PopoverWrapper anchorEl={anchorEl} onClose={() => { onClose(); setLink(''); setName(''); }} title="Attach a Link">
            <TextField
                fullWidth size="small" label="Link (URL)"
                value={link} onChange={(e) => setLink(e.target.value)}
                sx={{ mb: 1 }} autoFocus
            />
            <TextField
                fullWidth size="small" label="Display Name (optional)"
                value={name} onChange={(e) => setName(e.target.value)}
                sx={{ mb: 1.5 }}
            />
            <Button fullWidth variant="contained" size="small" disabled={!link.trim()} onClick={handleAttach}>
                Attach
            </Button>
        </PopoverWrapper>
    );
};

export default AttachmentPopover;
