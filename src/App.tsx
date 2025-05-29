import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { Box, Container, CssBaseline, Paper } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { useColorScheme } from '@mui/material/styles';
import { theme, darkTheme } from './styles/theme';
import { BrowserRouter, Routes, Route, Link } from 'react-router';

import MainMenu from './components/MainMenu';
import Home from './components/Home';
import Contact from './components/Contact';
import SimulationLayout from './components/SimulationLayout';

import island from './assets/island.png'

const App = () => {
  const { mode, setMode } = useColorScheme();

  if (!mode) return null;
  return (
    <ThemeProvider theme={mode === 'dark' ? darkTheme : theme}>
      <CssBaseline />
      <Box
        sx={{
          width: '100vw',
          minHeight: '100vh',
          backgroundImage: `url(${island})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >

        <MainMenu mode={mode} setMode={setMode} />

        {/* Main content area with dark overlay for the background image */}
        <Container maxWidth="xl" sx={{ minHeight: '100vh', background: 'transparent' }}>
          <Paper
            sx={{
              minHeight: '100vh',
              borderRadius: 0,
            }}
          >
            <Routes>
              <Route path="/contact" element={<Contact />} />
              <Route path="/simulation" element={<SimulationLayout />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App
