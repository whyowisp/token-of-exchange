import { Resident } from '../../models/Resident'
import type { BehaviouralTrait, Trade } from '../../types/types'
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
    return new Resident(name, behaviouralTrait, 'thriving', 10, 10, 10, landQuality, 'idle')
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

export const processResidentDailyActivities = (
  resident: Resident,
): Resident => {
  if (!resident) return resident

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
  }

  return newResident
}