import type {
  Resident,
  BehaviouralTrait,
  ResidentStatus,
  Activity,
  ActivityLogEntry,
  MarketOffer,
} from '../types/types'
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
  names.slice(0, 10).map((name, i) => ({
    id: i + 1,
    name,
    behaviouralTrait: pickTrait(),
    status: 'thriving',
    occupation: 'owner',
    tokens: 5,
    sustenance: 10,
    consumables: 7,
    landQuality: randomGaussian(1, 0.5),
    activity: 'idle',
    exchangeLog: [],
  }))

// Decide next action purely based on resident's data, returns new Resident
export const decideNextAction = (resident: Resident): Resident => {
  const internalBias = 0.4
  const externalBias = 0.6

  const internalScore = evalInternalScore(resident.behaviouralTrait)
  const externalScore = evalExternalScore(resident.landQuality)

  const combined = internalScore * internalBias + externalScore * externalBias
  const threshold = Math.random()

  const newActivity: Activity = combined > threshold ? 'mining' : 'producing'

  return { ...resident, activity: newActivity }
}

const evalInternalScore = (trait: BehaviouralTrait): number => {
  if (trait === 'inventor') return 0.45
  if (trait === 'risk-taker') return 0.6
  return 0.5
}

const evalExternalScore = (landQuality: number): number => {
  return landQuality > 1 ? 0.25 : 0.5
}

// Produce tokens or sustenance based on activity, returns new Resident and produced amount
export const produce = (
  resident: Resident
): { updatedResident: Resident; action: 'produce' | 'mine'; amount: number } | null => {
  switch (resident.activity) {
    case 'producing': {
      const amount = Math.round(1 * (resident.landQuality || 1))
      return {
        updatedResident: { ...resident, sustenance: resident.sustenance + amount },
        action: 'produce',
        amount,
      }
    }
    case 'mining': {
      const amount = Math.round(0.5 * Math.random())
      return {
        updatedResident: { ...resident, tokens: resident.tokens + amount },
        action: 'mine',
        amount,
      }
    }
    default:
      return null
  }
}

// Remove consumables, update status accordingly, return new Resident and changes
export const removeConsumables = (
  resident: Resident,
  amount: number
): { updatedResident: Resident; statusChange: ResidentStatus; amount: number } | null => {
  const newAmount = Math.max(0, resident.consumables - amount)
  let newStatus: ResidentStatus = resident.status

  if (newAmount === 0) newStatus = 'deceased'
  else if (newAmount <= 7) newStatus = 'deprived'

  return {
    updatedResident: { ...resident, consumables: newAmount, status: newStatus },
    statusChange: newStatus,
    amount: amount,
  }
}

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

  let updatedResident = decideNextAction(resident)

  const production = produce(updatedResident)
  if (production && production.updatedResident) {
    updatedResident = production.updatedResident
    addActivityLogEntry({
      tick,
      sourceId: updatedResident.id,
      sourceType: 'resident',
      action: 'produce',
      // Consider adding targetId/targetType if relevant
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


/* Trade function helpers */

export function removeTokens(resident: Resident, amount: number): Resident {
  return { ...resident, tokens: Math.max(0, resident.tokens - amount) }
}

export function addTokens(resident: Resident, amount: number): Resident {
  return { ...resident, tokens: resident.tokens + amount }
}

export function removeSustenance(resident: Resident, amount: number): Resident {
  return { ...resident, sustenance: Math.max(0, resident.sustenance - amount) }
}

export function addConsumables(resident: Resident, amount: number): Resident {
  return {
    ...resident,
    consumables: (resident.consumables ?? 0) + amount
  }
}


export function evaluatePurchaseOffer(
  resident: Resident,
  marketOffer: MarketOffer
): { totalCost: number; tradeAmount: number } | null {
  if (resident.tokens < marketOffer.price) return null
  if (marketOffer.available <= 0) return null
  return { totalCost: marketOffer.price, tradeAmount: 1 }
}
