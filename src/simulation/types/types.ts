/* Simulation Logic Types */
export type SellerType = 'resident' | 'company' | 'bank'

export interface MarketOffer {
  sellerId: number
  sellerName?: string
  sellerIndex: number
  sellerType: SellerType
  product: string
  available: number
  price: number
  createdTick: number
}

// Activity log entries store the history of actions taken by residents, companies, banks, etc.
// This is used for analytics mostly, but can be for any other purpose as well.
export interface ActivityLogEntry {
  tick: number
  sourceId: number
  sourceType?: 'resident' | 'company' | 'bank' | 'government' | 'market' | 'other'
  action:
  | 'produce'
  | 'consume'
  | 'buy'
  | 'sell'
  | 'transfer'
  | 'death'
  | 'startCompany'
  | 'payTax'
  | 'receiveWage'
  | 'think'
  | 'evaluate'
  | 'trade'
  targetId?: number
  targetType?: 'resident' | 'company' | 'bank' | 'government' | 'market' | 'other',
  message?: string
  metadata?: Record<string, any>
  changes?: {
    tokens?: number
    consumables?: number
    sustenance?: number
    [key: string]: number | undefined
  }
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

  reset: () => void

  isRunning: boolean
  start: () => void
  stop: () => void

  tickRate: number
  setTickRate: (value: number) => void

  totalTicks: number
  addTick: () => void
}

export type ResidentStore = {
  residents: Resident[]
  setResidents: (residents: Resident[]) => void
  reset: () => void
}

export type LogStore = {
  activityLogEntries: ActivityLogEntry[]
  addActivityLogEntry: (entry: ActivityLogEntry) => void
  reset: () => void
}

/* Zustand Resident Feed Store Types */

export interface FeedEntry {
  tick: number
  residentId: number
  message: string
}

export type ResidentFeedStore = {
  feed: FeedEntry[]
  addEntry: (entry: FeedEntry) => void
  getFeedForResident: (residentId: number) => FeedEntry[]
  getGlobalFeed: () => FeedEntry[]
  clearFeed: () => void
}

/* Resident related types */
export type BehaviouralTrait = 'inventor' | 'risk-taker' | 'sustainer'
export type ResidentStatus = 'thriving' | 'deprived' | 'deceased'
export type ResidentOccupation = 'owner' | 'employee' | 'unemployed'
export type Action = 'producing' | 'mining' | 'idle'

export interface Resident {
  id: number
  name: string
  behaviouralTrait: BehaviouralTrait
  status: ResidentStatus
  occupation: string
  tokens: number
  sustenance: number
  consumables: number
  landQuality: number
  action: Action
  exchangeLog: ExchangeLog[]
}
export interface ExchangeLog {
  consumables: number,
  tokens: number,
  sustenance: number
}

/* World factors */
export interface EconomicIndicators {
  averageSustenancePrice: number
  goldDemand: number
  workshopSaturation: number
  availableJobs: {
    sustenance: number
    mining: number
    innovation: number
  }
}
