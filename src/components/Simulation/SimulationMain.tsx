import { Resident } from '../../models/Resident'

import { useEffect } from 'react'
import { Grid, Stack } from '@mui/material'
import { useSimulationStore } from './simulationStore'

import Settings from './Settings'
import Metrics from './Metrics'
import Community from './Community'
import Feed from './Feed'
import ToolBar from './ToolBar'

/*const processResidentsLifeCycle = (residents: Resident[], totalTicks: number): Resident[] => {
  return residents.map((resident) => {
    const newResident = new Resident(
      resident.name,
      resident.behaviouralTrait,
      resident.status,
      resident.tokens,
      resident.sustenance,
      resident.consumable,
      resident.landQuality,
      resident.activity
    )

    if (resident.status === 'deceased') return newResident

    // Daily actions
    newResident.produceSustenance()
    newResident.removeConsumable(1)

    // Weekly decisions
    if (totalTicks % 7 === 0) {
      newResident.decideNextAction()
    }

    return newResident
  })
}

function resolveTrades(residents: Resident[]): Resident[] {
  return residents.map((buyer) => {
    if (buyer.status === 'deceased' || buyer.consumable >= 7) return buyer

    const result = buyer.tryBuyConsumables(7, residents)
    if (result) {
      const seller = residents[result.sellerIndex]
      seller.removeSustenance(result.targetAmount)
    }
    return buyer
  })
}*/

const processSingleResidentLifeCycle = (
  residents: Resident[],
  totalTicks: number,
  indexToUpdate: number
): Resident[] => {
  const resident = residents[indexToUpdate]
  if (!resident) return residents

  const newResident = new Resident(
    resident.name,
    resident.behaviouralTrait,
    resident.status,
    resident.tokens,
    resident.sustenance,
    resident.consumable,
    resident.landQuality,
    resident.activity
  )

  if (resident.status !== 'deceased') {
    newResident.produceSustenance()
    newResident.removeConsumable(1)

    const daysPassed = Math.floor(totalTicks / residents.length || 0)
    if (daysPassed % 7 === 0) {
      newResident.decideNextAction()
    }
  }

  // Return a new array with only this resident updated
  const newResidents = [...residents]
  newResidents[indexToUpdate] = newResident
  return newResidents
}

function resolveSingleTrade(residents: Resident[], buyerIndex: number): Resident[] {
  // Copy the array so we don’t mutate the original
  const newResidents = [...residents]

  const buyer = newResidents[buyerIndex]
  if (!buyer) return newResidents

  if (buyer.status === 'deceased' || buyer.consumable >= 7) {
    // No trade needed or possible, return unchanged
    return newResidents
  }

  const result = buyer.tryBuyConsumables(7, newResidents)
  if (result) {
    const seller = newResidents[result.sellerIndex]
    if (seller) {
      seller.removeSustenance(result.targetAmount)
    }
  }

  return newResidents
}

const SimulationMain = () => {
  const isRunning = useSimulationStore((state) => state.isRunning)
  const tickRate = useSimulationStore((state) => state.tickRate)
  const residents = useSimulationStore((state) => state.residents)
  const totalTicks = useSimulationStore((state) => state.totalTicks)
  const setResidents = useSimulationStore((state) => state.setResidents)
  const addTick = useSimulationStore((state) => state.addTick)

  useEffect(() => {
    if (!isRunning) return
    const interval = setInterval(() => {
      try {
        addTick()

        const idx = totalTicks % residents.length // Pick one resident per tick, loop through all
        const updated = processSingleResidentLifeCycle([...residents], totalTicks + 1, idx)
        const resolved = resolveSingleTrade(updated, idx)

        setResidents(resolved)
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
