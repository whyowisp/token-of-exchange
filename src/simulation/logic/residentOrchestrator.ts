import type {
  Resident,
  ActivityLogEntry,
} from '../types/types'
import { decideNextAction, produce, removeConsumables } from './residentFunctions'


export const think = (
  resident: Resident,
  tick: number,
  addActivityLogEntry: (entry: ActivityLogEntry) => void
): Resident => {
  const { updatedResident, message } = decideNextAction(resident)

  addActivityLogEntry({
    tick,
    sourceId: updatedResident.id,
    sourceType: 'resident',
    action: 'think',
    message,
  })

  return updatedResident
}

export const produceResources = (
  resident: Resident,
  tick: number,
  addActivityLogEntry: (entry: ActivityLogEntry) => void
): Resident => {
  const production = produce(resident)

  if (production && production.updatedResident) {
    const updatedResident = production.updatedResident

    addActivityLogEntry({
      tick,
      sourceId: updatedResident.id,
      sourceType: 'resident',
      action: 'produce',
      changes: {
        tokens: production.action === 'mine' ? production.amount : 0,
        consumables: 0,
        sustenance: production.action === 'produce' ? production.amount : 0,
      },
    })
    return updatedResident
  }
  return resident
}

export const consumeDailyNeeds = (
  resident: Resident,
  tick: number,
  addActivityLogEntry: (entry: ActivityLogEntry) => void
): Resident => {
  const removal = removeConsumables(resident, 1)

  if (removal && removal.updatedResident) {
    const updatedResident = removal.updatedResident

    addActivityLogEntry({
      tick,
      sourceId: updatedResident.id,
      sourceType: 'resident',
      action: 'consume',
      metadata: { residentStatusChange: removal.statusChange },
      changes: {
        tokens: 0,
        consumables: -removal.amount,
        sustenance: 0,
      },
    })

    return updatedResident
  }

  return resident
}



// The main lifecycle processor: takes Resident, tick, log function, returns updated Resident
export const processResidentDailyLifecycle = (
  resident: Resident,
  tick: number,
  addActivityLogEntry: (entry: ActivityLogEntry) => void
): Resident => {
  if (resident.status === 'deceased') {
    addActivityLogEntry({
      tick,
      sourceId: resident.id,
      sourceType: 'resident',
      action: 'death',
      message: `${resident.name} deceased, no action.`
    })
    return resident
  }

  let r = think(resident, tick, addActivityLogEntry)
  r = produceResources(r, tick, addActivityLogEntry)
  r = consumeDailyNeeds(r, tick, addActivityLogEntry)

  return r
}

