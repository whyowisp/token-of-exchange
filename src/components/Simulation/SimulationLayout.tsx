import { Grid, Stack } from '@mui/material'
import Settings from './Settings'
import Metrics from './Metrics'
import Residents from './Residents'
import Feed from './Feed'

const LayoutGrid = () => {
  return (
    <Grid
      container
      spacing={1}
      sx={{ padding: 2 }}
      display="flex"
      justifyContent="center"
    >
      <Grid size={{ xs: 12, md: 3 }}>
        <Settings />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Stack spacing={2}>
          <Residents />
          <Metrics />
        </Stack>
      </Grid>
      <Grid size={{ xs: 12, md: 3 }}>
        <Feed />
      </Grid>
    </Grid>
  )
}

export default LayoutGrid
