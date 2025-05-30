import { Container, Typography, Paper, Box, Link } from '@mui/material'
import Header from './Header'

const Contact = () => {
  return (
    <Container maxWidth="md" sx={{ mb: 2 }}>
      <Header title={'Contact'} />
      <Paper sx={{ mb: 3, p: 4, textAlign: 'justify' }}>
        <Box sx={{ mt: 2 }}>
          <Typography paragraph>
            Token of Exchange is an open source project. You can find the source
            code and contribute on GitHub.
          </Typography>
          <Typography paragraph>
            For questions, suggestions, or bug reports, please:
          </Typography>
          <ul>
            <li>
              <Link
                href="https://github.com/yourusername/token-of-exchange/issues"
                target="_blank"
                rel="noopener"
              >
                Open an issue on GitHub
              </Link>
            </li>
            <li>
              <Link href="mailto:your.email@example.com">Send us an email</Link>
            </li>
          </ul>
        </Box>
      </Paper>
    </Container>
  )
}

export default Contact
