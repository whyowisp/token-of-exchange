// --- FILE 2: src/simulation/types.ts ---

import type { Resident } from '../models/Resident'

/* Simulation Logic Types */
export type SellerType = 'resident' | 'company' | 'bank'

export interface MarketOffer {
  sellerId: number
  sellerIndex: number
  sellerType: SellerType
  product: string
  available: number
  price: number
  createdTick: number
}

// DEPRECATE this
export interface Trade {
  timestamp?: number
  buyerId: number
  sellerId: number
  sellerType: string
  product: string
  price: number
  tokenAmount: number
  productAmount: number
}

// USE this
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
  targetId?: number
  targetType?: 'resident' | 'company' | 'bank' | 'government' | 'market' | 'other'
  metadata?: Record<string, any>
  changes: {
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

  residents: Resident[]
  setResidents: (residents: Resident[]) => void

  activityLogEntries: ActivityLogEntry[]
  addActivityLogEntry: (entry: ActivityLogEntry) => void

  reset: () => void

  isRunning: boolean
  start: () => void
  stop: () => void

  tickRate: number
  setTickRate: (value: number) => void

  totalTicks: number
  addTick: () => void
}

/* Zustand Resident Feed Store Types */
export type FeedEntry = {
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
export type Activity = 'producing' | 'mining' | 'idle'

export interface ExchangeLog {
  consumables: number,
  tokens: number,
  sustenance: number
}

export interface ResidentData {
  id: number
  name: string
  trait: BehaviouralTrait
  status: ResidentStatus
  occupation: ResidentOccupation
  tokens: number
  sustenance: number
  consumables: number
  landQuality: number
  activity: Activity
  exchangeLog: ExchangeLog[]
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
