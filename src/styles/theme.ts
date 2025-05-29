
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
    background: {
      paper: 'rgba(0, 0, 0, 0.8)',
      default: 'rgba(0, 0, 0, 0.8)',
    }
  }
});

export { theme, darkTheme };
