import type { ActivityLogEntry } from '../types/types'
import { processResidentDailyLifecycle } from './residentOrchestrator'
import { findMarketOffer, resolveSingleTrade } from './tradeFunctions'
import type { Resident } from '../types/types'

function freezeResidents(residents: Resident[]) {
  return residents.map(r => Object.freeze({ ...r }))
}

export function processSimulationTick(
  residents: Resident[],
  totalTicks: number,
  addActivityLogEntry: (entry: ActivityLogEntry) => void
): Resident[] {
  if (!Array.isArray(residents)) {
    throw new Error("Residents must be an array")
  }
  console.clear()
  //console.log('residents' + JSON.stringify(residents))
  const idx = totalTicks % residents.length

  // Step 1: Apply daily lifecycle to one resident
  const updatedResidents = [...residents]
  updatedResidents[idx] = processResidentDailyLifecycle(
    residents[idx],
    totalTicks,
    addActivityLogEntry
  )

  //console.log('residents after lifecycle update: ' + JSON.stringify(updatedResidents))

  // Step 2: Find a market offer for that resident in updated residents
  const marketOffer = findMarketOffer(updatedResidents[idx], updatedResidents, totalTicks)
  if (!marketOffer) {
    return updatedResidents
  }

  // Step 3: Try to resolve a trade on the residents after lifecycle update
  const frozen = freezeResidents(residents)

  resolveSingleTrade(frozen, frozen[idx], marketOffer, totalTicks, addActivityLogEntry)
  const tradedResidents = resolveSingleTrade(
    updatedResidents,
    updatedResidents[idx],
    marketOffer,
    totalTicks,
    addActivityLogEntry
  )

  //console.log('residents after trade: ' + JSON.stringify(tradedResidents))

  // Step 4: If trade happened, return tradedResidents; else return updatedResidents with lifecycle update
  return tradedResidents ?? updatedResidents
}

