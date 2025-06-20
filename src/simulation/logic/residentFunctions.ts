import type { Resident, Action, BehaviouralTrait, ResidentStatus } from '../types/types'

/* RESIDENT UTILITY FUNCTIONS */

export const removeTokens = (resident: Resident, amount: number): Resident => {
  return { ...resident, tokens: Math.max(0, resident.tokens - amount) }
}

export const addTokens = (resident: Resident, amount: number): Resident => {
  return { ...resident, tokens: resident.tokens + amount }
}

export const removeSustenance = (resident: Resident, amount: number): Resident => {
  return { ...resident, sustenance: Math.max(0, resident.sustenance - amount) }
}

export const addConsumables = (resident: Resident, amount: number): Resident => {
  return {
    ...resident,
    consumables: (resident.consumables ?? 0) + amount,
    status: getStatus({ ...resident, consumables: (resident.consumables ?? 0) + amount }),
  }
}

export const removeConsumables = (
  resident: Resident,
  amount: number
): { updatedResident: Resident; statusChange: ResidentStatus; amount: number } | null => {
  const newAmount = Math.max(0, resident.consumables - amount)
  let newStatus: ResidentStatus = resident.status

  newStatus = getStatus({ ...resident, consumables: newAmount })

  return {
    updatedResident: { ...resident, consumables: newAmount, status: newStatus },
    statusChange: newStatus,
    amount: amount,
  }
}

export const getStatus = (resident: Resident): ResidentStatus => {
  if (resident.consumables <= 0) return 'deceased'
  if (resident.consumables <= 6) return 'deprived'
  else return 'thriving'
}

/* RESIDENT INTERNAL LOGIC */

// REFACTOR better internal logic and messaging
export const decideNextAction = (resident: Resident): { updatedResident: Resident, message: string } => {
  const internalBias = 0.4
  const externalBias = 0.6

  const internalScore = evalInternalScore(resident.behaviouralTrait)
  const externalScore = evalExternalScore(resident.landQuality)

  const combined = internalScore * internalBias + externalScore * externalBias
  const threshold = Math.random()

  const newAction: Action = combined > threshold ? 'mining' : 'producing'
  const updatedResident = { ...resident, action: newAction }
  const message = `Resident ${resident.id} decided to switch action to ${newAction} based on internal score ${internalScore.toFixed(2)} and external score ${externalScore.toFixed(2)}.`

  return { updatedResident: updatedResident, message }
}

// Produce tokens or sustenance based on activity, returns new Resident and produced amount
export const produce = (
  resident: Resident
): { updatedResident: Resident; action: 'produce' | 'mine'; amount: number } | null => {
  switch (resident.action) {
    case 'producing': {
      const productionBase = 1
      const amount = Math.round(productionBase * (resident.landQuality || 1))
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

const evalInternalScore = (trait: BehaviouralTrait): number => {
  if (trait === 'inventor') return 0.45
  if (trait === 'risk-taker') return 0.6
  return 0.5
}

const evalExternalScore = (landQuality: number): number => {
  return landQuality > 1 ? 0.25 : 0.5
}