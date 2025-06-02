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
export type Mode = 'light' | 'dark' | 'system';

export interface ThemeProps {
  mode: Mode;
  setMode: (mode: Mode) => void;
}

/* React Component Props */
export interface HeaderProps {
  title: string
}

export interface PageProps {
  title: string;
  content: React.ReactNode;
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

  isRunning: boolean
  startSimulation: () => void
  stopSimulation: () => void
}

/* Resident class and related types */
type ResidentStatus = 'thriving' | 'deprived' | 'deceased';
type ResidentOccupation = 'owner' | 'employee' | 'unemployed';

class Resident {
  private static nextId = 1

  readonly id: number
  readonly name: string
  status: ResidentStatus
  occupation: ResidentOccupation
  tokens: number

  constructor(name: string) {
    this.id = Resident.nextId++
    this.name = name
    this.status = 'thriving'
    this.occupation = 'unemployed'
    this.tokens = 0
  }

  setStatus(status: ResidentStatus) {
    this.status = status;
  }

  setOccupation(occupation: ResidentOccupation) {
    this.occupation = occupation
  }
}
