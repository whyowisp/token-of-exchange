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

const createResidents = (): Array<Resident> => {
  const residents = names.slice(0, 10).map((name) => {
    const landQuality = randomGaussian(1, 0.5)
    const behaviouralTrait = pickTrait()
    return new Resident(name, behaviouralTrait, 'thriving', 20, 10, 10, landQuality, 'idle')
  })
  return residents
}

/* STORE */

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

  residents: createResidents(), // Residents single source of truth
  setResidents: (residents: Resident[]) => set({ residents }),

  reset: () => {
    set({ isRunning: false })
    set({ totalTicks: 0 })
    set({ residents: createResidents() })
  },

  totalTicks: 0,
  addTick: () => {
    console.log('adding tick')
    set((state) => ({ totalTicks: state.totalTicks + 1 }))
  },

  tickRate: 1000,
  setTickRate: (value: number) => set({ tickRate: value }),

  isRunning: false,
  start: () => set({ isRunning: true }),
  stop: () => set({ isRunning: false }),
}))
