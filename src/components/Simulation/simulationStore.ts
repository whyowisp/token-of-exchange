import type {
  SimulationStore,
  BankingMode,
  GovernanceMode,
  TaxType,
  TaxConfig,
  BehaviouralTrait
} from '../../types/types'
import { Resident } from '../../models/Resident'
import { create } from 'zustand'
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

const pickTrait = (index: number): BehaviouralTrait => {
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

const createResidents = (): Array<Resident> => {
  const residents = names.slice(0, 10).map((name, index) => {
    const landQuality = randomGaussian(1, 0.5)
    const behaviouralTrait = pickTrait(index)
    return new Resident(name, behaviouralTrait, 0, 0, 10, landQuality, 'idle')
  })

  console.log(residents.forEach((r) => console.log(JSON.stringify(r))))
  return residents
}

export const useSimulationStore = create<SimulationStore>((set) => ({
  bankingMode: 'gold-standard',
  setBankingMode: (bankingMode: BankingMode) => set({ bankingMode }),

  governanceMode: 'elder-autocratic',
  setGovernanceMode: (governanceMode: GovernanceMode) =>
    set({ governanceMode }),

  taxSettings: new Map<TaxType, TaxConfig>(),
  // Note to self: Partial makes providing properties optional. e.g No need to pass full { enabled: <value>, rate: <value> }
  setTaxConfig: (taxType: TaxType, config: Partial<TaxConfig>) => {
    set((state) => {
      const newSettings = new Map(state.taxSettings) // Nts: Never update existing state. Update copy instead. 
      const oldConfig = newSettings.get(taxType) ?? { enabled: false, rate: 20 }
      newSettings.set(taxType, { ...oldConfig, ...config })
      return { taxSettings: newSettings }
    })
  },

  residents: [],
  setResidents: (residents: Resident[]) => set({ residents }),

  tickCount: 0,
  addTick: () => {
    set((state) => ({ tickCount: state.tickCount + 1 }))
  },

  update: () =>
    set((state) => {
      // Create a new array with spread operator to maintain immutability
      const updatedResidents = [...state.residents].map(resident => {
        // Create a new resident instance with updated properties
        const updatedResident = new Resident(
          resident.name,
          resident.behaviouralTrait,
          resident.tokens,
          resident.sustenance,
          resident.consumable,
          resident.landQuality,
          resident.activity
        )

        // Simulation logic

        // Daily actions
        // Use 1 consumable
        updatedResident.removeConsumable(1)

        // Weekly actions (7 iterations)
        if (state.tickCount % 7 === 0) {
          updatedResident.decideNextAction() // resident.decideNextAction(economicIndicators)
        }


        // Monthly
        // calculate economic meters.  should be done elsewhere and read here

        // Produce       
        updatedResident.produce()
        console.log(JSON.stringify(updatedResident))
        return updatedResident
      })
      return { residents: updatedResidents }
    }),
  reset: () => {
    set({ isRunning: false })
    set({ tickCount: 0 })
    set({ residents: createResidents() })
  },

  isRunning: false,
  start: () => set({ isRunning: true }),
  stop: () => set({ isRunning: false }),

  tickRate: 1000,
  setTickRate: (value: number) => set({ tickRate: value }),
}))
