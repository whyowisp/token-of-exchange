import { useEffect } from 'react'
import { Grid, Stack } from '@mui/material'
import { useSimulationStore } from '../../store/simulationStore'

import Settings from './Settings'
import Metrics from './Metrics'
import Community from './Community'
import Feed from './Feed'
import ToolBar from './ToolBar'
import { useSimulationLoop } from '../../simulation/logic/useSimulationLoop'

const SimulationMain = () => {
  useSimulationLoop()
  return (
    <>
      <ToolBar />
      <Grid container spacing={1} sx={{ padding: 2 }} display="flex" justifyContent="center">
        <Grid size={{ xs: 12, md: 3 }}>
          <Settings />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Stack spacing={2}>
            <Community />
            <Metrics />
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <Feed />
        </Grid>
      </Grid>
    </>
  )
}

export default SimulationMain
