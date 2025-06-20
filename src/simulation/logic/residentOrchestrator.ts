import type {
  Resident,
  BehaviouralTrait,
  ActivityLogEntry,
} from '../types/types'
import { decideNextAction, produce, removeConsumables } from './residentFunctions'
import { randomGaussian } from '../../utility/math'

const names = [
  'Alice', 'Bob', 'Carol', 'Dave', 'Eve', 'Frank',
  'Grace', 'Hank', 'Irene', 'Jack', 'Kate', 'Leo',
  'Mallory', 'Ned', 'Olivia', 'Peggy', 'Quinn', 'Rick', 'Sybil', 'Trent',
]

const pickTrait = (): BehaviouralTrait => {
  const traitP = { sustainer: 0.6, riskTaker: 0.2, inventor: 0.2 }
  const rnd = Math.random()
  if (rnd < traitP.sustainer) return 'sustainer'
  if (rnd < traitP.sustainer + traitP.riskTaker) return 'risk-taker'
  return 'inventor'
}

export const createResidents = (): Resident[] =>
  names.slice(0, 3).map((name, i) => ({
    id: i + 1,
    name,
    behaviouralTrait: pickTrait(),
    status: 'thriving',
    occupation: 'owner',
    tokens: 5,
    sustenance: 5,
    consumables: 5,
    landQuality: randomGaussian(1, 0.5),
    action: 'idle',
    exchangeLog: [],
  }))

// The main lifecycle processor: takes Resident, tick, log function, returns updated Resident
export const processResidentDailyLifecycle = (
  resident: Resident,
  tick: number,
  addActivityLogEntry: (entry: ActivityLogEntry) => void
): Resident => {
  if (resident.status === 'deceased') {
    // Optionally clone if you want immutability guarantees:
    // return {...resident}
    return resident
  }

  let { updatedResident, message } = decideNextAction(resident)

  addActivityLogEntry({
    tick,
    sourceId: updatedResident.id,
    sourceType: 'resident',
    action: 'think',
    message,
  })

  const production = produce(updatedResident)
  if (production && production.updatedResident) {
    updatedResident = production.updatedResident
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
  }

  const removal = removeConsumables(updatedResident, 1)
  if (removal && removal.updatedResident) {
    updatedResident = removal.updatedResident
    addActivityLogEntry({
      tick,
      sourceId: updatedResident.id,
      sourceType: 'resident',
      action: 'consume',
      metadata: { residentStatusChange: removal.statusChange },
      changes: {
        tokens: 0,
        consumables: -removal.amount, // Confirm semantics
        sustenance: 0,
      },
    })
  }

  return updatedResident
}

