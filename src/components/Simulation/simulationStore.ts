import type {
  SimulationStore,
  BankingMode,
  GovernanceMode,
  TaxationMode,
} from '../../types/types'
import { create } from 'zustand'

export const useSimulationStore = create<SimulationStore>((set) => ({
  bankingMode: 'gold-standard',
  setBankingMode: (bankingMode: BankingMode) => set({ bankingMode }),

  governanceMode: 'elder-autocratic',
  setGovernanceMode: (governanceMode: GovernanceMode) =>
    set({ governanceMode }),

  taxationMode: 'flat-tax',
  setTaxationMode: (taxationMode: TaxationMode) => set({ taxationMode }),

  setTaxationModel: (taxationMode: TaxationMode) => set({ taxationMode }),

  isRunning: false,
  startSimulation: () => set({ isRunning: true }),
  stopSimulation: () => set({ isRunning: false }),
}))
