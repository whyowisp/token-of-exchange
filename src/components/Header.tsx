import { Container, Paper, Typography, useTheme } from '@mui/material'

import island from '../assets/island.png'
import type { HeaderProps } from '../types/types'

const Header = ({ title }: HeaderProps) => {
  const theme = useTheme()
  return (
    <>
      <Paper
        square
        elevation={1}
        sx={{
          maxWidth: 'md',
          position: 'relative',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: `url(${island})`,
          padding: 4,
        }}
      >
        {/* Overlay for home background image based on theme */}
        <Container
          disableGutters
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
          }}
        />

        <Container sx={{ position: 'relative' }}>
          <Typography
            variant="h4"
            component="h1"
            align="center"
            sx={{
              mt: 14,
              mb: 10,
              color: theme.palette.grey[200],
            }}
          >
            {title}
          </Typography>
        </Container>
      </Paper>
    </>
  )
}

export default Header
