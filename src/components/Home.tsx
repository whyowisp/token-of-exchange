import { Container, Paper, Typography, useTheme } from '@mui/material';

import island from '../assets/island.png';
import { bodySx } from '../styles/unique-sx';

const Home = () => {
  const theme = useTheme();

  return (
    <Container maxWidth="md" sx={{ mb: 4 }}>
      <Paper
        elevation={3}
        sx={{
          maxWidth: 'md',
          position: 'relative',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: `url(${island})`,
          padding: 4,
          minHeight: '60vh',
        }}
      >
        {/* Overlay for background color based on theme */}
        <Container
          disableGutters
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            bgcolor: theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.25)' : 'rgba(255, 255, 255, 0.5)',
            pointerEvents: 'none',
          }}
        />
        <Container sx={{ position: 'relative' }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            TOKEN OF EXCHANGE
          </Typography>
          <Typography variant="body2" sx={bodySx}>
            Once there was a serene island, far away from the mainland.
            The residents no longer remembered how or why they came to be there — only that they were ten, and the outside world was unknown to them.
            They lived quietly, self-sufficiently. Water was carried from the fountain, and each person cultivated their own small plot of land.
            There was no excess, no luxury.
            Just enough to sustain themselves.
          </Typography>
          <Typography variant="body2" sx={bodySx}>
            Then, one day, the Elder of the village — in solemn conviction of a divine message — declared a new order.
          </Typography>
          <Paper sx={{ padding: 2, m: 2 }}>
            <Typography variant="body2">
              “From this day on, everyone must make their living through an abstraction called a <b>Workshop</b>.
              And no one may trade without another abstraction, called a <b>Token</b>. This decree, he claimed, “comes from above.
              Beware the wrath that shall follow if it is not obeyed.”
            </Typography>
          </Paper>
          <Typography variant="body2" sx={bodySx}>
            Thus began the age of the Token.
          </Typography>
          <Typography variant="body2" sx={{ ...bodySx }}>
            The question is:
            How will the Token system be implemented? Will it provide for everyone's needs — or fail them?
            What consequences will follow each decision?
          </Typography>
        </Container>
      </Paper>
      <Paper elevation={3} sx={{
        maxWidth: 'md',
        position: 'relative',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        marginTop: 8,
        padding: 4,
      }}>
        <Container>
          <Typography variant='body1' gutterBottom>
            Token of Exchange is a platform for simulating and learning about token economics and exchange mechanisms.
          </Typography>
          <Typography variant='body1' gutterBottom>
            Explore our features, participate in simulations, and contribute to the community.
          </Typography>
        </Container>
      </Paper>
    </Container >
  );
}

export default Home;