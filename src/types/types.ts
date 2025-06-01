/* React&MUI types */

export type Mode = 'light' | 'dark' | 'system';

export interface ThemeProps {
  mode: Mode;
  setMode: (mode: Mode) => void;
}

export interface HeaderProps {
  title: string
}

export interface PageProps {
  title: string;
  content: React.ReactNode;
}


/* Zustand Store Types */

export type BankingMode = 'fiat' | 'gold-standard' | 'crypto-like' | 'government-issued'
export type GovernanceMode = 'elder-autocratic' | 'trader-led' | 'council'
export type TaxType = 'flat' | 'progressive' | 'wealth' | 'consumption' | 'resource'

export type SimulationStore = {
  bankingMode: BankingMode
  setBankingMode: (bankingMode: BankingMode) => void

  governanceMode: GovernanceMode
  setGovernanceMode: (governanceMode: GovernanceMode) => void

  enabledTaxes: Map<TaxType, boolean>
  setTaxEnabled: (taxType: TaxType, enabled: boolean) => void
  taxRates: Map<TaxType, number>
  setTaxRate: (taxType: TaxType, rate: number) => void

  isRunning: boolean
  startSimulation: () => void
  stopSimulation: () => void
}