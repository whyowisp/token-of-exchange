import { useEffect } from 'react'
import { Grid, Stack } from '@mui/material'
import { useSimulationStore } from '../../store/simulationStore'
import { useResidentFeedStore } from '../../store/residentFeedStore'
import { processSingleResidentLifeCycle, resolveSingleTrade } from './residentFunctions'

import Settings from './Settings'
import Metrics from './Metrics'
import Community from './Community'
import Feed from './Feed'
import ToolBar from './ToolBar'
import type { FeedEntry } from '../../types/types'

const SimulationMain = () => {
  const isRunning = useSimulationStore((state) => state.isRunning)
  const tickRate = useSimulationStore((state) => state.tickRate)
  const residents = useSimulationStore((state) => state.residents)
  const totalTicks = useSimulationStore((state) => state.totalTicks)
  const setResidents = useSimulationStore((state) => state.setResidents)
  const addTick = useSimulationStore((state) => state.addTick)

  const addEntry = useResidentFeedStore((state) => state.addEntry)

  const createFeedEntry = (resolved: any, idx: number): FeedEntry | null => {
    const { tokenAmount, consumableAmount, sellerIndex } = resolved.tradeData
    if (tokenAmount == 0 || consumableAmount == 0) return null

    const message = `${residents[idx].name} bought 
      ${consumableAmount} 🌾 from 
      ${residents[sellerIndex].name} with 
      ${tokenAmount} 🥮`

    return {
      tick: totalTicks,
      residentId: idx,
      message,
    }
  }

  useEffect(() => {
    if (!isRunning) return
    const interval = setInterval(() => {
      try {
        addTick()

        const idx = totalTicks % residents.length
        const updated = processSingleResidentLifeCycle([...residents], totalTicks + 1, idx)
        const resolved = resolveSingleTrade(updated, idx)
        console.log(resolved.tradeData)
        setResidents(resolved.residents)

        const feedEntry = createFeedEntry(resolved, idx)
        if (feedEntry) addEntry(feedEntry)
      } catch (e) {
        console.error('Simulation error:', e)
        clearInterval(interval)
      }
    }, tickRate)

    return () => clearInterval(interval)
  }, [isRunning, tickRate, residents, totalTicks, setResidents, addTick])

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
