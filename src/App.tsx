import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { Box, Container, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { useColorScheme } from '@mui/material/styles';
import { theme, darkTheme } from './styles/theme';
import { BrowserRouter, Routes, Route, Link } from 'react-router';

import MainMenu from './components/MainMenu';
import Home from './components/Home';
import Contact from './components/Contact';
import SimulationLayout from './components/SimulationLayout';

const App = () => {
  const { mode, setMode } = useColorScheme();

  if (!mode) return null;
  return (
    <ThemeProvider theme={mode === 'dark' ? darkTheme : theme}>
      <CssBaseline />
      <Container maxWidth="xl">
        <MainMenu mode={mode} setMode={setMode} />
        <Routes>
          <Route path="/contact" element={<Contact />} />
          <Route path="/simulation" element={<SimulationLayout />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App
