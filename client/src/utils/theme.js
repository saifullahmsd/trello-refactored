import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#0079bf',
            light: '#298fca',
            dark: '#026aa7',
            contrastText: '#fff',
        },
        secondary: {
            main: '#ebecf0',
            contrastText: '#172b4d',
        },
        background: {
            default: '#fafafa',
        },
    },
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
        ].join(','),
        button: {
            textTransform: 'none',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 4,
                    fontWeight: 600,
                },
            },
        },
    },
});

export default theme;
