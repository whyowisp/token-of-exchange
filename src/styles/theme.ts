import { createTheme } from '@mui/material'

const theme = createTheme({
  colorSchemes: {
    light: true,
  },
});

const darkTheme = createTheme({
  colorSchemes: {
    dark: true,
  },
});

export { theme, darkTheme };
