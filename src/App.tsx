import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import { Box, Container, CssBaseline, Paper } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { useColorScheme } from '@mui/material/styles'
import { theme, darkTheme } from './styles/theme'
import { Routes, Route } from 'react-router'

import MainMenu from './components/MainMenu'
import Home from './components/Home'
import Contact from './components/Contact'
import SimulationRoot from './components/Simulation/SimulationRoot'

import island from './assets/island.png'
import Guide from './components/Guide'

const App = () => {
  const { mode, setMode } = useColorScheme()

  if (!mode) return null
  return (
    <ThemeProvider theme={mode === 'dark' ? darkTheme : theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh', // Full height for the background image
          backgroundImage: `url(${island})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          overflow: 'hidden',
        }}
      >
        <MainMenu mode={mode} setMode={setMode} />

        {/* Main content area with dark overlay for the background image */}
        <Container maxWidth="xl">
          <Paper
            sx={{
              minHeight: '100vh',
              borderRadius: 0,
              // override theme's default background color (fixes dark mode issue)
              //backgroundColor: theme => theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.9)' : 'rgba(255, 255, 255, 0.8)',
              boxShadow: 'none',
            }}
          >
            <Routes>
              <Route path="/contact" element={<Contact />} />
              <Route path="/simulation" element={<SimulationRoot />} />
              <Route path="/" element={<Home />} />
              <Route path="/guide" element={<Guide />} />
            </Routes>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default App
