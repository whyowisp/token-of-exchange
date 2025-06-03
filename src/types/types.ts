import type { Resident } from "../models/Resident"

/* MUI Theme Customization */
declare module '@mui/material/styles' {
  interface Palette {
    thriving: Palette['primary']
    deprived: Palette['primary']
    deceased: Palette['primary']
    owner: Palette['primary']
    employee: Palette['primary']
    unemployed: Palette['primary']
  }

  interface PaletteOptions {
    thriving?: PaletteOptions['primary']
    deprived?: PaletteOptions['primary']
    deceased?: PaletteOptions['primary']
    owner?: PaletteOptions['primary']
    employee?: PaletteOptions['primary']
    unemployed?: PaletteOptions['primary']
  }
}

declare module '@mui/material/Chip' {
  interface ChipPropsColorOverrides {
    owner: true
    employee: true
    unemployed: true
  }
}

declare module '@mui/material/SvgIcon' {
  interface SvgIconPropsColorOverrides {
    thriving: true
    deprived: true
    deceased: true
  }
}

/* Theme Types */
export type Mode = 'light' | 'dark' | 'system'

export interface ThemeProps {
  mode: Mode
  setMode: (mode: Mode) => void
}

/* React Component Props */
export interface HeaderProps {
  title: string
}

export interface PageProps {
  title: string
  content: React.ReactNode
}

/* Simulation Settings Types */
export type BankingMode = 'fiat' | 'gold-standard' | 'crypto-like' | 'government-issued'
export type GovernanceMode = 'elder-autocratic' | 'trader-led' | 'council'
export type TaxType = 'flat' | 'progressive' | 'wealth' | 'consumption' | 'resource'
export type TaxConfig = {
  enabled: boolean,
  rate: number,
}

/* Zustand Store Types */
export type SimulationStore = {
  bankingMode: BankingMode
  setBankingMode: (bankingMode: BankingMode) => void

  governanceMode: GovernanceMode
  setGovernanceMode: (governanceMode: GovernanceMode) => void

  taxSettings: Map<TaxType, TaxConfig>
  setTaxConfig: (taxType: TaxType, config: Partial<TaxConfig>) => void

  residents: Resident[] // With a risk of duplicates. The map function is used from Array very often.
  setResidents: (residents: Resident[]) => void

  tickCount: number
  addTick: () => void

  update: () => void
  reset: () => void

  isRunning: boolean
  start: () => void
  stop: () => void


  tickRate: number
  setTickRate: (value: number) => void
}

/* Resident related types */
export type ResidentStatus = 'thriving' | 'deprived' | 'deceased'
export type ResidentOccupation = 'owner' | 'employee' | 'unemployed'
export type Trait = 'inventor' | 'risk-taker' | 'sustainer'


// for future serialization use 
export interface ResidentData {
  id: number
  name: string
  trait: Trait
  status: ResidentStatus
  occupation: ResidentOccupation
  tokens: number
}
