import { createTheme } from '@mui/material';

const theme = createTheme({
  colorSchemes: {
    light: true,
  },
  palette: {
    primary: {
      light: '#9CA3AF',   // Light Slate Gray
      main: '#475569',   // Slate Blue (mid)
      dark: '#1E293B',   // Charcoal Blue
      contrastText: '#ffffff',
    },
    thriving: {
      main: '#6DBF75',
    },
    deprived: {
      main: '#D97706',
    },
    deceased: {
      main: '#4F4F4F',
    },
    background: {
      paper: 'rgba(255, 255, 255, 0.8)',
      default: 'rgba(255, 255, 255, 0.8)',
    }
  }
});



const darkTheme = createTheme({
  colorSchemes: {
    dark: true,
  },
  palette: {
    thriving: {
      main: '#6DBF75',
    },
    deprived: {
      main: '#D97706',
    },
    deceased: {
      main: '#1F1F1F'
    },


    background: {
      paper: 'rgba(0, 0, 0, 0.8)',
      default: 'rgba(0, 0, 0, 0.8)',
    }
  }
});

export { theme, darkTheme };
