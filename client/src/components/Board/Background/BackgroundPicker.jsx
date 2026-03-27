import React from 'react';
import { Box } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

export const BACKGROUNDS = [
    { link: '#0079bf', isImage: false },
    { link: '#d29034', isImage: false },
    { link: '#519839', isImage: false },
    { link: '#b04632', isImage: false },
    { link: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80', isImage: true },
    { link: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', isImage: true },
    { link: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80', isImage: true },
    { link: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80', isImage: true },
];

const BackgroundPicker = ({ selectedBgLink, onSelectBg }) => {
    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {BACKGROUNDS.map((bg, index) => {
                const isSelected = selectedBgLink === bg.link;
                return (
                    <Box
                        key={index}
                        onClick={() => onSelectBg(bg)}
                        sx={{
                            width: 'calc(25% - 6px)',
                            minWidth: 50,
                            height: 48,
                            borderRadius: 1,
                            cursor: 'pointer',
                            flexShrink: 0,
                            backgroundColor: bg.isImage ? '#ccc' : bg.link,
                            backgroundImage: bg.isImage ? `url(${bg.link})` : 'none',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            boxSizing: 'border-box',
                            border: isSelected ? '2px solid #0052cc' : '2px solid transparent',
                            transition: 'all 0.15s ease',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            '&:hover': { filter: 'brightness(0.85)' },
                        }}
                    >
                        {isSelected && (
                            <CheckIcon sx={{ color: 'white', fontSize: 20, filter: 'drop-shadow(0px 0px 2px rgba(0,0,0,0.8))' }} />
                        )}
                    </Box>
                );
            })}
        </Box>
    );
};

export default BackgroundPicker;
