import type { Resident, BehaviouralTrait, NaturalResource } from '../types/types'
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
  const traitP = { sustainer: 0.6, riskTaker: 0.2, inventor: 0.2 }
  const rnd = Math.random()
  if (rnd < traitP.sustainer) return 'sustainer'
  if (rnd < traitP.sustainer + traitP.riskTaker) return 'risk-taker'
  return 'inventor'
}

export const createResidents = (
  count: number,
  naturalResources: NaturalResource[]
): { residents: Resident[]; naturalResources: NaturalResource[] } => {
  const shuffledResources = [...naturalResources].sort(() => Math.random() - 0.5)
  const residents: Resident[] = []
  const updatedResources: NaturalResource[] = [...naturalResources]

  for (let i = 0; i < count; i++) {
    const id = i + 1
    const name = names[i % names.length]
    const resource = shuffledResources[i]

    // Assign ownership
    resource.ownerId = id
    resource.ownerType = 'resident'

    const resident: Resident = {
      entity: 'resident',
      id,
      name,
      behaviouralTrait: pickTrait(),
      status: 'thriving',
      occupation: 'owner',
      tokens: 5,
      sustenance: 5,
      consumables: 5,
      action: 'idle',
      resourceIds: [resource.id],
      exchangeLog: [],
    }

    residents.push(resident)
  }

  return {
    residents,
    naturalResources: updatedResources,
  }
}

export const createNaturalResources = (count = 100): NaturalResource[] => {
  const resources: NaturalResource[] = []

  for (let i = 0; i < count; i++) {
    const quality = randomGaussian(1, 0.5) // Adjust later
    const renewRate = parseFloat((Math.random() * 0.04 + 0.01).toFixed(3)) // Range: 0.01–0.05
    const stressLoadMax = Math.floor(Math.random() * 4) + 1 // Range: 1–4

    const resource: NaturalResource = {
      id: i,
      quality,
      renewRate,
      stressLoadMax,
      condition: 'pristine',
    }
    resources.push(resource)
  }
  return resources
}

export const initCommunity = (
  residentCount: number,
  resourceCount: number
): { residents: Resident[]; naturalResources: NaturalResource[] } => {
  const resources: NaturalResource[] = createNaturalResources(resourceCount)
  const community: { residents: Resident[]; naturalResources: NaturalResource[] } = createResidents(
    residentCount,
    resources
  )
  return community
}
