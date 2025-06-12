import { Resident } from '../../models/Resident'
import type { BehaviouralTrait, Trade, ActivityLogEntry } from '../../types/types'
import { useSimulationStore } from "../../store/simulationStore"
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
  const residents = names.slice(0, 3).map((name) => {
    const landQuality = randomGaussian(1, 0.5)
    const behaviouralTrait = pickTrait()
    return new Resident(name, behaviouralTrait, 'thriving', 10, 10, 5, landQuality, 'idle', [])
  })
  return residents
}

export const processResidentDailyLifecycle = (
  resident: Resident, tick: number, addActivityLogEntry: (entry: ActivityLogEntry) => void
): Resident => {
  if (!resident) return resident

  const newResident = new Resident(
    resident.name,
    resident.behaviouralTrait,
    resident.status,
    resident.tokens,
    resident.sustenance,
    resident.consumables,
    resident.landQuality,
    resident.activity,
    resident.exchangeLog,
    resident.id
  )

  // TOTHINK: Should the deceased residents 'action' be logged or not?
  if (resident.status !== 'deceased') {

    newResident.decideNextAction()

    const production = newResident.produce()
    if (production) {
      const newActivityLogEntry = {
        tick,
        residentId: newResident.id,
        sourceId: newResident.id,
        sourceType: "resident",
        action: production.action,
        changes: {
          tokens: production.action === 'mine' ? production.amount : 0,
          consumables: 0,
          sustenance: production.action === 'produce' ? production.amount : 0
        }
      } as ActivityLogEntry
      addActivityLogEntry(newActivityLogEntry)
    }
  }
  const removeResult = newResident.removeConsumables(3)
  console.log(`Resident ${newResident.name} at tick ${tick}: Removed consumables: ${removeResult ? removeResult.amount : 0}, Status change: ${removeResult ? removeResult.statusChange : 'none'}`)
  if (removeResult) {
    const newActivityLogEntry = {
      tick,
      residentId: newResident.id,
      sourceId: newResident.id,
      sourceType: "resident",
      action: 'consume',
      metadata: { residentStatusChange: removeResult.statusChange },
      changes: {
        tokens: 0,
        consumables: removeResult.amount,
        sustenance: 0
      }
    } as ActivityLogEntry
    addActivityLogEntry(newActivityLogEntry)
  }

  return newResident
}

