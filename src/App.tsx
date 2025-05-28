import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { Box, CssBaseline, FormControl, FormLabel, FormControlLabel, RadioGroup, Radio } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { useColorScheme } from '@mui/material/styles';
import { theme, darkTheme } from './styles/theme';
import SimulationLayout from './components/SimulationLayout'
import MainMenu from './components/MainMenu'

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh' }}>
        <MainMenu />
        <SimulationLayout />
      </Box>
    </ThemeProvider>
  );
}

export default App
