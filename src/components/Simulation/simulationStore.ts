import type {
  SimulationStore,
  BankingMode,
  GovernanceMode,
  TaxType,
  TaxConfig
} from '../../types/types'
import { create } from 'zustand'




export const useSimulationStore = create<SimulationStore>((set) => ({
  bankingMode: 'gold-standard',
  setBankingMode: (bankingMode: BankingMode) => set({ bankingMode }),

  governanceMode: 'elder-autocratic',
  setGovernanceMode: (governanceMode: GovernanceMode) =>
    set({ governanceMode }),

  /*enabledTaxes: new Map<TaxType, boolean>(),
  setTaxEnabled: (taxType: TaxType, enabled: boolean) =>
    set((state) => ({
      enabledTaxes: new Map(state.enabledTaxes).set(taxType, enabled)
    })),
  taxRates: new Map<TaxType, number>(),
  setTaxRate: (taxType: TaxType, rate: number) =>
    set((state) => ({
      taxRates: new Map(state.taxRates).set(taxType, rate)
    })),*/

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

  isRunning: false,
  startSimulation: () => set({ isRunning: true }),
  stopSimulation: () => set({ isRunning: false }),
}))
