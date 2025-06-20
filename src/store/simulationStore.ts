import type {
  SimulationStore,
  BankingMode,
  GovernanceMode,
  TaxType,
  TaxConfig,
} from '../simulation/types/types'
import type { Resident } from '../simulation/types/types'
import { create } from 'zustand'
import { createResidents } from '../simulation/logic/residentOrchestrator'

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

  activityLogEntries: [],
  addActivityLogEntry: (entry) => set((state) => ({
    activityLogEntries: [entry, ...state.activityLogEntries],
  })),

  reset: () => {
    set({ isRunning: false })
    set({ totalTicks: 0 })
    set({ residents: createResidents() })
    set({ activityLogEntries: [] })
  },

  totalTicks: 0,
  addTick: () => {
    set((state) => ({ totalTicks: state.totalTicks + 1 }))
  },

  tickRate: 1000,
  setTickRate: (value: number) => set({ tickRate: value }),

  isRunning: false,
  start: () => set({ isRunning: true }),
  stop: () => set({ isRunning: false }),
}))
