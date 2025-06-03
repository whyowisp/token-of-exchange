import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  Slider,
  Stack,
  Typography,
} from '@mui/material'
import { debounce } from 'lodash'
import Settings from './Settings'
import Metrics from './Metrics'
import Community from './Community'
import Feed from './Feed'
import { useSimulationStore } from './simulationStore'
import { useEffect, useMemo, useRef } from 'react'
import { Toolbar } from '@mui/x-charts'
import { DEFAULT_ZOOM_SLIDER_SHOW_TOOLTIP } from '@mui/x-charts/internals'

const SimulationMain = () => {
  const isRunning = useSimulationStore((state) => state.isRunning)
  const start = useSimulationStore((state) => state.startSimulation)
  const stop = useSimulationStore((state) => state.stopSimulation)

  const tickRate = useSimulationStore((state) => state.tickRate)
  const setTickRate = useSimulationStore((state) => state.setTickRate)

  const tickCount = useSimulationStore((state) => state.tickCount)
  const tickSimulation = useSimulationStore((state) => state.tickSimulation)

  const rafRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (!isRunning) return

    let lastTime = performance.now()

    const tick = (now: number) => {
      console.log(tickRate)
      if (now - lastTime >= tickRate) {
        tickSimulation()
        lastTime = now
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [isRunning, tickSimulation])

  return (
    <>
      <Toolbar>
        <Box sx={{ flexGrow: 3, display: { xs: 'flex' } }}>
          <Button
            sx={{
              fontFamily: 'monospace',
              fontWeight: 700,
            }}
            onClick={() => start()}
          >
            Start
          </Button>
          <Button
            sx={{
              fontFamily: 'monospace',
              fontWeight: 700,
            }}
            onClick={() => stop()}
          >
            Stop
          </Button>
          <Slider
            sx={{ width: 300, m: 1 }}
            value={tickRate}
            step={500}
            marks
            min={0}
            max={5000}
            valueLabelDisplay="auto"
            onChange={(_, newValue) => {
              stop()
              setTickRate(typeof newValue === 'number' ? newValue : newValue[0])
            }}
          />{' '}
          <Typography sx={{ m: 1, fontFamily: 'monospace' }}>
            Tickcounter: {tickCount}
          </Typography>
        </Box>
      </Toolbar>

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
