import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CssVarsProvider defaultMode="system">
      <App />
    </CssVarsProvider>
  </StrictMode>,
)
