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
export type TaxationMode = 'flat-tax' | 'progressive-tax' | 'wealth-tax' | 'consuption-tax' | 'resource-tax'

export type SimulationStore = {
  bankingMode: BankingMode
  setBankingMode: (bankingMode: BankingMode) => void

  governanceMode: GovernanceMode
  setGovernanceMode: (governanceMode: GovernanceMode) => void

  taxationMode: TaxationMode
  setTaxationModel: (taxationModel: TaxationMode) => void

  isRunning: boolean
  startSimulation: () => void
  stopSimulation: () => void
}