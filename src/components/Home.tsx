import { Container, Paper, Typography } from '@mui/material'
import Header from './Header'
import { italicSx } from '../styles/unique-sx'

const Home = () => {
  return (
    <Container maxWidth="md" sx={{ mb: 2 }}>
      <Header title={'Token of Exchange'} />
      <Paper sx={{ mb: 3, p: 4, textAlign: 'justify' }}>
        <Typography variant="body1" sx={italicSx}>
          Once there was a serene island, far away from the mainland. The
          residents no longer remembered how or why they came to be there — only
          that they were ten, and the outside world was unknown to them. They
          lived quietly, self-sufficiently. Water was carried from the fountain,
          and each person cultivated their own small plot of land. There was no
          excess, no luxury. Just enough to sustain themselves.
        </Typography>
        <Typography variant="body1" sx={italicSx}>
          Then, one day, the Elder of the village — in solemn conviction of a
          divine message — declared a new order:
        </Typography>
        <Paper
          square
          sx={{
            padding: 2,
            mb: 4,
            borderLeft: (theme) => `3px solid ${theme.palette.primary.main}`,
            backgroundColor: 'transparent',
            boxShadow: 'none',
          }}
        >
          <Typography variant="body1">
            From this day on, everyone must make their living through an
            abstraction called a <b>Workshop</b>. And no one may trade without
            another abstraction, called a <b>Token</b>. This decree, he claimed,
            'comes from above.' Beware the wrath that shall follow if it is not
            obeyed.
          </Typography>
        </Paper>
        <Typography variant="body1" sx={italicSx}>
          Thus began the age of the Token.
        </Typography>
      </Paper>
    </Container>
  )
}

export default Home
