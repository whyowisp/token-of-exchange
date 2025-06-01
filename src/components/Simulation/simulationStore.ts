import type {
  SimulationStore,
  BankingMode,
  GovernanceMode,
  TaxType
} from '../../types/types'
import { create } from 'zustand'




export const useSimulationStore = create<SimulationStore>((set) => ({
  bankingMode: 'gold-standard',
  setBankingMode: (bankingMode: BankingMode) => set({ bankingMode }),

  governanceMode: 'elder-autocratic',
  setGovernanceMode: (governanceMode: GovernanceMode) =>
    set({ governanceMode }),

  enabledTaxes: new Map<TaxType, boolean>(),
  setTaxEnabled: (taxType: TaxType, enabled: boolean) =>
    set((state) => ({
      enabledTaxes: new Map(state.enabledTaxes).set(taxType, enabled)
    })),
  taxRates: new Map<TaxType, number>(),
  setTaxRate: (taxType: TaxType, rate: number) =>
    set((state) => ({
      taxRates: new Map(state.taxRates).set(taxType, rate)
    })),

  isRunning: false,
  startSimulation: () => set({ isRunning: true }),
  stopSimulation: () => set({ isRunning: false }),
}))
