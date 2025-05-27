import { Grid } from '@mui/material';

const LayoutGrid = () => {
  return (
    <Grid container spacing={1} sx={{ padding: 3 }} display="flex" justifyContent="center">
      <Grid size={{ xs: 12, md: 3 }}>
        <p>Configuration</p>
      </Grid>
      <Grid container size={{ xs: 12, md: 6 }}>
        <Grid size={12}>
          <p>Graphs</p>
        </Grid>
        <Grid size={12}>
          <p>Tables</p>
        </Grid>
      </Grid>
      <Grid size={{ xs: 12, md: 3 }}>
        <p>Feed</p>
      </Grid>
    </Grid>
  )
}

export default LayoutGrid;