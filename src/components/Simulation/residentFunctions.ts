import { Resident } from '../../models/Resident'
import type { BehaviouralTrait, TradeData } from '../../types/types'
import { randomGaussian } from '../../utility/math'

const names = [
  'Alice',
  'Bob',
  'Carol',
  'Dave',
  'Eve',
  'Frank',
  'Grace',
  'Hank',
  'Irene',
  'Jack',
  'Kate',
  'Leo',
  'Mallory',
  'Ned',
  'Olivia',
  'Peggy',
  'Quinn',
  'Rick',
  'Sybil',
  'Trent',
]

const pickTrait = (): BehaviouralTrait => {
  const traitP = {
    sustainer: 0.6,
    riskTaker: 0.2,
    inventor: 0.2,
  }
  const rnd = Math.random()
  if (rnd < traitP.sustainer) return 'sustainer'
  if (rnd < traitP.sustainer + traitP.riskTaker) return 'risk-taker'
  return 'inventor'
}

export const createResidents = (): Array<Resident> => {
  const residents = names.slice(0, 10).map((name) => {
    const landQuality = randomGaussian(1, 0.5)
    const behaviouralTrait = pickTrait()
    return new Resident(name, behaviouralTrait, 'thriving', 20, 10, 10, landQuality, 'idle')
  })
  return residents
}

export const processResidentsLifeCycle = (residents: Resident[], totalTicks: number): Resident[] => {
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

export function resolveTrades(residents: Resident[]): Resident[] {
  return residents.map((buyer) => {
    if (buyer.status === 'deceased' || buyer.consumable >= 7) return buyer

    const result = buyer.tryBuyConsumables(7, residents)
    if (result) {
      const seller = residents[result.sellerIndex]
      seller.removeSustenance(result.consumableAmount)
    }
    return buyer
  })
}

export const processSingleResidentLifeCycle = (
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

export const resolveSingleTrade =
  (residents: Resident[], buyerIndex: number): { residents: Resident[], tradeData: TradeData } => {
    let tradeData: TradeData = {
      buyerIndex,
      tokenAmount: 0,
      sellerIndex: 0,
      consumableAmount: 0
    }

    // Copy the array so we don’t mutate the original
    const newResidents = [...residents]

    const buyer = newResidents[buyerIndex]
    if (!buyer) return { residents: newResidents, tradeData }

    if (buyer.status === 'deceased' || buyer.consumable >= 7) {
      // No trade needed or possible, return unchanged
      return { residents: newResidents, tradeData }
    }

    const result = buyer.tryBuyConsumables(7, newResidents)
    if (result) {
      const seller = newResidents[result.sellerIndex]
      if (seller) {
        seller.removeSustenance(result.consumableAmount)

        // If seller was found, update tradeData
        tradeData.sellerIndex = result.sellerIndex
        tradeData.tokenAmount = result?.tokenAmount ?? 0
        tradeData.consumableAmount = result?.consumableAmount ?? 0
      }
    }

    return { residents: newResidents, tradeData }
  }