import type { ActivityLogEntry } from '../types/types'
import { processResidentDailyLifecycle } from './residentOrchestrator'
import { findMarketOffer, resolveSingleTrade } from './tradeFunctions'
import type { Resident } from '../types/types'

export function processSimulationTick(
  residents: Resident[],
  totalTicks: number,
  addActivityLogEntry: (entry: ActivityLogEntry) => void
): Resident[] {
  if (!Array.isArray(residents)) {
    throw new Error("Residents must be an array")
  }
  const idx = totalTicks % residents.length
  const updatedResidents = [...residents]

  const isMarketDay = Math.floor(totalTicks / residents.length) % 3 === 0

  if (!isMarketDay) {
    // Step 1: Apply daily lifecycle to one resident
    updatedResidents[idx] = processResidentDailyLifecycle(
      residents[idx],
      totalTicks,
      addActivityLogEntry
    )
    return updatedResidents
  }


  // Step 2: Find a market offer for that resident in updated residents
  const marketOffer = findMarketOffer(updatedResidents[idx], updatedResidents, totalTicks)

  // Step 3: Try to resolve a trade on the residents after lifecycle update
  const tradedResidents = resolveSingleTrade(
    updatedResidents,
    updatedResidents[idx],
    marketOffer,
    totalTicks,
    addActivityLogEntry
  )

  // Step 4: If trade happened, return tradedResidents; else return updatedResidents with lifecycle update
  return tradedResidents ?? updatedResidents
}

