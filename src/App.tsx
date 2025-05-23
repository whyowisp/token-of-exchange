import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { useState } from 'react'
import { ThemeProvider } from '@emotion/react';

import { darkTheme, defaultTheme } from './styles/theme'
import { CssBaseline } from '@mui/material';
import { Grid  } from '@mui/material';

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Grid container spacing={2} sx={{ padding: 2 }}>
        <Grid size={12}>
          <h1>Welcome to the App</h1>
        </Grid>
        <Grid size={3}>
          <p>Sidebar</p>
        </Grid>
        <Grid size={3}>
          <p>Graphs</p>
        </Grid>
        <Grid size={3}>
          <p>Tables</p>
        </Grid>
        <Grid size={3}>
          <p>Simulation actions</p>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

export default App
