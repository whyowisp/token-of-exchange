import { Container, Paper, Typography } from '@mui/material';

import island from '../assets/island.png';
import { bodySx } from '../styles/unique-sx';

const Home = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{
        maxWidth: 'md',
        position: 'relative',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url(${island})`,
        padding: 4,
        color: 'white',
      }}>
        <Typography variant="h4" component="h1" gutterBottom align='center'>
          TOKEN OF EXCHANGE
        </Typography>
        <Container sx={{}}>
          <Typography variant="body2" sx={bodySx}>
            Once there was a serene island, far away from the mainland.
            The residents no longer remembered how or why they came to be there — only that they were ten, and the outside world was unknown to them.
            They lived quietly, self-sufficiently. Water was carried from the fountain, and each person cultivated their own small plot of land.
            There was no excess, no luxury.
            Just enough to sustain themselves.
          </Typography>
          <Typography variant="body2" sx={bodySx}>
            Then, one day, the Elder of the village — in a haze of senile inspiration — declared a new order
          </Typography>
          <Paper sx={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', padding: 1, mb: 2 }}>
            <Typography variant="body2" sx={{ ...bodySx, fontStyle: 'normal' }}>
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

        <Typography variant='body1' gutterBottom>
          Token of Exchange is a platform for simulating and learning about token economics and exchange mechanisms.
        </Typography>
        <Typography variant='body1' gutterBottom>
          Explore our features, participate in simulations, and contribute to the community.
        </Typography>
      </Paper>
    </Container>
  );
}

export default Home;