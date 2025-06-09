import { useEffect } from 'react'
import { Grid, Stack } from '@mui/material'
import { useSimulationStore } from '../../store/simulationStore'
import { useResidentFeedStore } from '../../store/residentFeedStore'
import { processResidentDailyActivities } from './residentFunctions'
import { resolveSingleTrade } from './tradeFunctions'

import Settings from './Settings'
import Metrics from './Metrics'
import Community from './Community'
import Feed from './Feed'
import ToolBar from './ToolBar'
import type { FeedEntry, Trade } from '../../types/types'
import { findMarketOffer } from './tradeFunctions'
import type { Resident } from '../../models/Resident'

const SimulationMain = () => {
  const isRunning = useSimulationStore((state) => state.isRunning)
  const tickRate = useSimulationStore((state) => state.tickRate)
  const residents = useSimulationStore((state) => state.residents)
  const totalTicks = useSimulationStore((state) => state.totalTicks)
  const setResidents = useSimulationStore((state) => state.setResidents)
  const addTick = useSimulationStore((state) => state.addTick)
  const addTrade = useSimulationStore((state) => state.addTrade)

  const addEntry = useResidentFeedStore((state) => state.addEntry)

  const createFeedEntry = (resolved: { residents: Resident[]; trade: Trade }): FeedEntry | null => {
    const { buyerId, sellerId, tokenAmount, productAmount } = resolved.trade

    const buyer = residents.find((r) => r.id === buyerId)
    const sellerName = residents.find((r) => r.id === sellerId)?.name

    const message = `${buyer.name} bought 
      ${productAmount}🌾 from 
      ${sellerName} with 
      ${tokenAmount}🥮`

    return {
      tick: totalTicks,
      residentId: buyer?.id || 0,
      message,
    }
  }

  useEffect(() => {
    if (!isRunning) return
    const interval = setInterval(() => {
      try {
        addTick()
        const idx = totalTicks % residents.length
        const updatedResidents = [...residents]

        /* Daily Activities */
        // Producing, consuming. Making life changes, getting job, starting company
        const resident = updatedResidents[idx]
        const dailyResident = processResidentDailyActivities(resident)
        updatedResidents[idx] = dailyResident

        // Check the markets
        const marketOffer = findMarketOffer(dailyResident, updatedResidents)

        if (marketOffer) {
          const communityTraded = resolveSingleTrade(updatedResidents, dailyResident, marketOffer, totalTicks)
          if (communityTraded) {
            setResidents(communityTraded.residents)
            addTrade(communityTraded.tradeData)

            const feedEntry = createFeedEntry(communityTraded)
            if (feedEntry) addEntry(feedEntry)
          } else {
            // If no trade happened, still update with daily activities
            setResidents(updatedResidents)
          }
        } else {
          // If no market offer found, still update with daily activities
          setResidents(updatedResidents)
        }

        /* Weekly Activities */
        // TODO Refactor processSingleResidentLifecycle to separate daily and weekly actions

        /* Monthly Activities */
        // Update Metrics
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
