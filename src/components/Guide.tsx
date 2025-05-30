import { Container, Typography, Paper, Box, Link } from '@mui/material'
import Header from './Header'

const Guide = () => {
  return (
    <Container maxWidth="md" sx={{ mb: 2 }}>
      <Header title={'Guidance'} />
      <Paper sx={{ mb: 3, p: 4, textAlign: 'justify' }}></Paper>
    </Container>
  )
}

export default Guide
