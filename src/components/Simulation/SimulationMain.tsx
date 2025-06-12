import { useEffect } from 'react'
import { Grid, Stack } from '@mui/material'
import { useSimulationStore } from '../../store/simulationStore'
import { processResidentDailyLifecycle } from './residentFunctions'
import { resolveSingleTrade } from './tradeFunctions'

import Settings from './Settings'
import Metrics from './Metrics'
import Community from './Community'
import Feed from './Feed'
import ToolBar from './ToolBar'
import type { FeedEntry } from '../../types/types'
import { findMarketOffer } from './tradeFunctions'
import type { Resident } from '../../models/Resident'

const SimulationMain = () => {
  const isRunning = useSimulationStore((state) => state.isRunning)
  const tickRate = useSimulationStore((state) => state.tickRate)
  const residents = useSimulationStore((state) => state.residents)
  const totalTicks = useSimulationStore((state) => state.totalTicks)
  const setResidents = useSimulationStore((state) => state.setResidents)
  const addTick = useSimulationStore((state) => state.addTick)
  const activityLogEntries = useSimulationStore((state) => state.activityLogEntries)
  const addActivityLogEntry = useSimulationStore((state) => state.addActivityLogEntry)

  /*const createFeedEntry = (resolved: { residents: Resident[]; tradeData: Trade }): FeedEntry | null => {
    const { residents, tradeData } = resolved
    const { buyerId, sellerId, tokenAmount, productAmount } = tradeData

    const buyer = resolved.residents.find((r) => r._id === buyerId)
    const sellerName = residents.find((r) => r._id === sellerId)?.name

    const message = `${buyer?.name} bought 
      ${productAmount}🌾 from 
      ${sellerName} with 
      ${tokenAmount}🥮`

    return {
      tick: totalTicks,
      residentId: buyer?.id || 0,
      message,
    }
  }*/

  useEffect(() => {
    if (!isRunning) return
    const interval = setInterval(() => {
      try {
        /*console.clear()
        console.log(`RESIDENTS AT TICK: ${totalTicks}`)
        residents.forEach((resident) => {
          console.log(resident)
        })*/
        addTick()
        const idx = totalTicks % residents.length
        const updatedResidents = [...residents]

        /* Daily Activities */
        // Producing, consuming. Making life changes, getting job, starting company
        const resident = updatedResidents[idx]
        const dailyResident = processResidentDailyLifecycle(resident, totalTicks, addActivityLogEntry)
        updatedResidents[idx] = dailyResident

        // Check the markets
        const marketOffer = findMarketOffer(dailyResident, updatedResidents, totalTicks)
        console.log(`Market offer for ${dailyResident.name}:`, marketOffer)
        if (!marketOffer) {
          setResidents(updatedResidents)
        } else {
          const communityTraded = resolveSingleTrade(
            updatedResidents,
            dailyResident,
            marketOffer,
            totalTicks,
            addActivityLogEntry
          )
          setResidents(communityTraded ? residents : updatedResidents)
        }
        setResidents(updatedResidents)
        /*console.log(`RESIDENTS AT TICK: ${totalTicks}`)
        updatedResidents.forEach((resident) => {
          console.log(resident)
        })*/

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
  }, [isRunning, tickRate, residents, totalTicks, setResidents, addTick, activityLogEntries, addActivityLogEntry])

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
