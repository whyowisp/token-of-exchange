import { createTheme } from '@mui/material'

const theme = createTheme({
  colorSchemes: {
    light: true,
  },
  palette: {
    primary: {
      // main color red
      light: '#ff7961',
      main: '#f44336',
    },
  },
});

const darkTheme = createTheme({
  colorSchemes: {
    dark: true,
  },
});

export { theme, darkTheme };
