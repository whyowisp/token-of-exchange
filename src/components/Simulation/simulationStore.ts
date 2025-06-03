import { Resident } from '../../models/Resident'
import type {
  SimulationStore,
  BankingMode,
  GovernanceMode,
  TaxType,
  TaxConfig
} from '../../types/types'
import { create } from 'zustand'

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

const createResidents = (): Array<Resident> => {
  return names.slice(0, 10).map((name) => new Resident(name, 'sustainer', 5))
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
          resident.trait,
          resident.tokens
        )

        // Copy over current state
        updatedResident.setStatus(resident.status)
        //updatedResident.setOccupation(resident.occupation)
        updatedResident.addTokens(-1)

        // Add your simulation logic here
        // Example:
        if (updatedResident.tokens < 4) {
          updatedResident.setStatus('deprived')
        }
        if (updatedResident.tokens < 2) {
          updatedResident.setStatus('deceased')
        }

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
