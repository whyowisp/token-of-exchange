import { Resident } from '../../models/Resident'

import { useEffect, useRef } from 'react'
import { Box, Button, Grid, Slider, Stack, Typography } from '@mui/material'
import { Toolbar } from '@mui/x-charts'
import { useSimulationStore } from './simulationStore'

import Settings from './Settings'
import Metrics from './Metrics'
import Community from './Community'
import Feed from './Feed'
import { initial } from 'lodash'
import ToolBar from './ToolBar'

const SimulationMain = () => {
  const tickRate = useSimulationStore((state) => state.tickRate)
  const isRunning = useSimulationStore((state) => state.isRunning)
  const update = useSimulationStore((state) => state.update)
  const reset = useSimulationStore((state) => state.reset)

  const residents = useSimulationStore((state) => state.residents)

  // Ticks for debugging
  const addTick = useSimulationStore((state) => state.addTick)

  useEffect(() => {
    if (residents.length === 0) reset()
  }, [])

  /* Simulation Loop */
  const rafRef = useRef<ReturnType<typeof setInterval> | null>(null)
  useEffect(() => {
    if (!isRunning) return

    let lastTime = performance.now()

    const tick = (now: number) => {
      console.log(tickRate)
      if (now - lastTime >= tickRate) {
        addTick()
        update()
        lastTime = now
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [isRunning, addTick])

  return (
    <>
      <ToolBar />
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
            <Community residents={residents} />
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
