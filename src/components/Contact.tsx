import { Container, Typography, Paper, Box, Link } from '@mui/material';

const Contact = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Contact
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography paragraph>
            Token of Exchange is an open source project. You can find the source code and contribute on GitHub.
          </Typography>
          <Typography paragraph>
            For questions, suggestions, or bug reports, please:
          </Typography>
          <ul>
            <li>
              <Link href="https://github.com/yourusername/token-of-exchange/issues" target="_blank" rel="noopener">
                Open an issue on GitHub
              </Link>
            </li>
            <li>
              <Link href="mailto:your.email@example.com">
                Send us an email
              </Link>
            </li>
          </ul>
        </Box>
      </Paper>
    </Container>
  );
};

export default Contact;
