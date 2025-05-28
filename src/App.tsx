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

import type { Mode } from './types/theme';

const App = () => {
  const { mode, setMode } = useColorScheme();

  const handleModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMode = event.target.value as Mode;
    setMode(newMode);
  };

  if (!mode) return null;

  return (
    <ThemeProvider theme={mode === 'dark' ? darkTheme : theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh' }}>
        <MainMenu mode={mode} setMode={setMode} handleModeChange={handleModeChange} />
        <SimulationLayout />
      </Box>
    </ThemeProvider>
  );
}

export default App
