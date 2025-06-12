import { remove } from 'lodash'
import type { ResidentStatus, BehaviouralTrait, ResidentOccupation, Activity, MarketOffer, Trade, ExchangeLog, ActivityLogEntry } from '../types/types'

export class Resident {
  private static nextId = 1

  readonly _id: number
  readonly _name: string
  readonly _behaviouralTrait: BehaviouralTrait
  private _status: ResidentStatus
  private _occupation: ResidentOccupation
  private _consumables: number
  private _tokens: number
  private _sustenance: number
  private _landQuality: number
  private _activity: Activity
  private _exchangeLog: ExchangeLog[]

  constructor(
    name: string,
    behaviouralTrait: BehaviouralTrait,
    status: ResidentStatus,
    tokens: number,
    sustenance: number,
    consumables: number,
    landQuality: number,
    activity: Activity,
    exchangeLog: ExchangeLog[],
    id?: number
  ) {

    this._name = name
    this._behaviouralTrait = behaviouralTrait
    this._status = status
    this._occupation = 'owner'
    this._consumables = consumables ?? 0
    this._tokens = tokens ?? 0
    this._sustenance = sustenance ?? 0
    this._landQuality = landQuality
    this._activity = activity
    this._exchangeLog = exchangeLog
    this._id = id ?? Resident.nextId++
  }

  get id(): number {
    return this._id
  }
  get name(): string {
    return this._name
  }
  get behaviouralTrait(): BehaviouralTrait {
    return this._behaviouralTrait
  }
  get status(): ResidentStatus {
    return this._status
  }
  get occupation(): ResidentOccupation {
    return this._occupation
  }
  get tokens(): number {
    return this._tokens
  }
  get sustenance(): number {
    return this._sustenance
  }
  get consumables(): number {
    return this._consumables
  }
  get landQuality(): number {
    return this._landQuality
  }
  get activity(): Activity {
    return this._activity
  }

  get exchangeLog(): ExchangeLog[] {
    return this._exchangeLog
  }

  setStatus(status: ResidentStatus) {
    this._status = status
  }

  setOccupation(occupation: ResidentOccupation) {
    this._occupation = occupation
  }

  addTokens(amount: number) {
    this._tokens += amount
  }

  removeTokens(amount: number) {
    this._tokens = Math.max(0, this._tokens - amount)
  }

  addSustenance(amount: number) {
    this._sustenance += amount
  }

  removeSustenance(amount: number) {
    this._sustenance = Math.max(0, this._sustenance - amount)
  }

  addConsumables(amount: number) {
    this._consumables += amount
    if (this._consumables >= 7) this.setStatus('thriving')
  }

  removeConsumables(amount: number): { statusChange: ResidentStatus, amount: number } | null {
    const amountToRemove = Math.max(0, Math.min(amount, this.consumables))
    this._consumables -= amountToRemove

    if (this.consumables === 0) this.setStatus('deceased')
    else if (this.consumables <= 7) this.setStatus('deprived')

    return { statusChange: this.status, amount: -amountToRemove }
  }

  // Please note sustenance is turning to consumables exactly when trade happens.
  evaluatePurchaseOffer(marketOffer: MarketOffer): { totalCost: number, tradeAmount: number } | null {
    const WEEKLY_NEED = 7
    const remainingNeed = Math.max(0, WEEKLY_NEED - this.consumables)

    console.log(`[Trade] Buyer ${this.name} evaluating offer from seller ${marketOffer.sellerId} for ${marketOffer.available} units at price ${marketOffer.price}`)
    console.log(`[Trade] Buyer ${this.name} needs ${remainingNeed} more consumables, has ${this.consumables} already`)

    if (!marketOffer || marketOffer.price <= 0) {
      console.warn(`[Trade] Invalid market offer`, marketOffer)
      return null
    }
    if (this.status === 'deceased') {
      console.info(`[Trade] Buyer ${this.id} is deceased`)
      return null
    }
    if (this.consumables >= WEEKLY_NEED) {
      console.info(`[Trade] Buyer ${this.name} already has enough`)
      return null
    }

    // Calculate trade amounts
    const maxAffordable = Math.floor(this.tokens / marketOffer.price)
    const ableToBuy = Math.min(maxAffordable, remainingNeed)
    const tradeAmount = Math.min(marketOffer.available, ableToBuy)
    console.log(`Trade amount calculated: ${tradeAmount} units for buyer ${this.name}`)

    // Validate final trade amount
    if (tradeAmount <= 0) return null
    if (tradeAmount > marketOffer.available) {
      console.warn(`[Trade] Not enough available sustenance from seller ${marketOffer.sellerId}`)
      return null
    }

    const totalCost = tradeAmount * marketOffer.price

    // Validate buyer has enough tokens
    if (totalCost > this.tokens) return null

    return { totalCost, tradeAmount }
  }

  pickSeller(sellers: Resident[], targetAmount: number): number {
    const availableSellers = sellers.filter(s => s.sustenance >= targetAmount)

    if (availableSellers.length === 0) {
      return -1
    }

    // TODO pick a seller based on price and availability
    const randomIndex = Math.floor(Math.random() * availableSellers.length)

    return sellers.findIndex(s => s === availableSellers[randomIndex])
  }

  improveLandQuality(multiplier: number) {
    this._landQuality = this._landQuality * multiplier
  }

  setActivity(activity: Activity) {
    this._activity == activity
  }

  decideNextAction() {
    // Estimate how likely is the resident to make life changes
    const internal = this.evalInternalScore()
    const external = this.evalExternalScore()

    const internalBias = 0.4
    const externalBias = 0.6

    const combined = internal * internalBias + external * externalBias
    const threshold = Math.random()

    // If the internal and external factors are higher, it's more probable to go more risky behaviours
    // Behaviours from less risky to most: 'producing' -> 'mining' -> 'investing'
    // Sometimes they go 'idle' for no reason, sickness maybe.
    // The code needs to be refactored!!!
    if (combined > threshold) {
      this._activity = 'mining'
    } else {
      this._activity = 'producing'
    }
  }

  evalInternalScore(): number {
    let pBase = 0.5

    if (this._behaviouralTrait === 'inventor') pBase *= 0.9
    else if (this._behaviouralTrait === 'risk-taker') pBase *= 1.2

    return pBase
  }

  evalExternalScore(): number {
    let pBase = 0.5

    if (this._landQuality > 1) return (pBase *= 0.5)
    else return (pBase *= 1)
  }

  produce(): { action: 'produce' | 'mine'; amount: number } | null {
    switch (this._activity) {
      case 'producing': {
        const baseProduction = 5
        const landMultiplier = this._landQuality || 1
        const amount = Math.round(baseProduction * landMultiplier)
        this.addSustenance(amount)
        return { action: 'produce', amount }
      }
      case 'mining': {
        const baseMining = 0.5
        const miningLuck = Math.random() * 1
        const amount = Math.round(baseMining * miningLuck)
        this.addTokens(amount)
        return { action: 'mine', amount }
      }
      default: { return null }
    }
  }

  toJSON(): object {
    return {
      id: this._id,
      name: this._name,
      behaviouralTrait: this.behaviouralTrait,
      status: this._status,
      occupation: this._occupation,
      consumables: this._consumables,
      tokens: this._tokens,
      sustenance: this._sustenance,
      landQuality: this._landQuality,
      activity: this._activity,
      exchangeLog: this._exchangeLog
    }
  }
}
