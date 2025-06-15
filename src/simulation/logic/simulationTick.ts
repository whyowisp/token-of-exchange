// simulationTick.ts (pure logic, no hooks)
import type { ActivityLogEntry } from '../types/types'
import { processResidentDailyLifecycle } from './residentFunctions'
import { findMarketOffer, resolveSingleTrade } from './tradeFunctions'

export function processSimulationTick(
  residents: string | any[] | undefined,
  totalTicks: number | undefined,
  addActivityLogEntry: { (entry: ActivityLogEntry): void; (entry: ActivityLogEntry): void; (entry: ActivityLogEntry): void } | undefined
) {
  if (typeof totalTicks !== 'number' || residents === undefined || !Array.isArray(residents)) {
    throw new Error('totalTicks must be defined')
  }
  const idx = totalTicks % residents.length
  const updatedResidents = [...residents]
  const resident = updatedResidents[idx]

  const dailyResident = processResidentDailyLifecycle(
    resident,
    totalTicks,
    addActivityLogEntry ?? (() => { })
  )
  updatedResidents[idx] = dailyResident

  const marketOffer = findMarketOffer(dailyResident, updatedResidents, totalTicks)
  if (!marketOffer) return updatedResidents

  const tradedResidents = resolveSingleTrade(
    updatedResidents,
    dailyResident,
    marketOffer,
    totalTicks,
    addActivityLogEntry ?? (() => { })
  )
  return tradedResidents ?? updatedResidents
}
