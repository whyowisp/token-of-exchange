import { update } from 'lodash'
import type { ResidentStatus, BehaviouralTrait, ResidentOccupation, Activity, MarketOffer, Trade } from '../types/types'

export class Resident {
  private static nextId = 1

  readonly _id: number
  readonly _name: string
  readonly _behaviouralTrait: BehaviouralTrait
  private _status: ResidentStatus
  private _occupation: ResidentOccupation
  private _tokens: number
  private _sustenance: number
  private _consumable: number
  private _landQuality: number
  private _activity: Activity

  constructor(
    name: string,
    behaviouralTrait: BehaviouralTrait,
    status: ResidentStatus,
    tokens: number,
    sustenance: number,
    consumable: number,
    landQuality: number,
    activity: Activity
  ) {
    this._id = Resident.nextId++
    this._name = name
    this._behaviouralTrait = behaviouralTrait
    this._status = status
    this._occupation = 'owner'
    this._tokens = tokens ?? 0
    this._sustenance = sustenance ?? 0
    this._consumable = consumable ?? 0
    this._landQuality = landQuality
    this._activity = activity
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
  get consumable(): number {
    return this._consumable
  }
  get landQuality(): number {
    return this._landQuality
  }
  get activity(): Activity {
    return this._activity
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

  removeSustenance(amount: number) {
    this._sustenance = Math.max(0, this._sustenance - amount)
  }

  addConsumable(amount: number) {
    this._consumable += amount
    if (this._consumable >= 7) this.setStatus('thriving')
  }

  removeConsumable(amount: number) {
    this._consumable = Math.max(0, this._consumable - amount)
    if (this._consumable === 0) this.setStatus('deceased')
    else if (this._consumable <= 7) this.setStatus('deprived')
  }

  tryBuyConsumables(marketOffer: MarketOffer, trade: Trade): Trade | null {
    const WEEKLY_NEED = 7
    const remainingNeed = Math.max(0, WEEKLY_NEED - this.consumable)

    if (!marketOffer || marketOffer.price <= 0) {
      console.warn(`[Trade] Invalid market offer`, marketOffer)
      return null
    }
    if (this.status === 'deceased') {
      console.info(`[Trade] Buyer ${this.id} is deceased`)
      return null
    }
    if (this.consumable >= WEEKLY_NEED) {
      console.info(`[Trade] Buyer ${this.id} already has enough`)
      return null
    }

    // Calculate trade amounts
    const maxAffordable = Math.floor(this.tokens / marketOffer.price)
    const ableToBuy = Math.min(maxAffordable, remainingNeed)
    const tradeAmount = Math.min(marketOffer.available, ableToBuy)

    // Validate final trade amount
    if (tradeAmount <= 0) return null

    const totalCost = tradeAmount * marketOffer.price

    // Validate buyer has enough tokens
    if (totalCost > this.tokens) return null

    this.removeTokens(totalCost)
    this.addConsumable(tradeAmount)

    return {
      ...trade,
      tokenAmount: totalCost,
      productAmount: tradeAmount
    }
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

  produceSustenance() {
    if (this._activity === 'producing') {
      const baseProduction = 2.5
      const landMultiplier = this._landQuality || 1
      this._sustenance += Math.round(baseProduction * landMultiplier) // add to existing consumable
    } else if (this._activity === 'mining') {
      const baseMining = 1.9
      const miningLuck = Math.random() * 2
      this._tokens += Math.round(baseMining * miningLuck) // add to existing tokens
    }
  }

  toJSON(): object {
    return {
      id: this._id,
      name: this._name,
      behaviouralTrait: this.behaviouralTrait,
      status: this._status,
      occupation: this._occupation,
      tokens: this._tokens,
      sustenance: this._sustenance,
      consumable: this._consumable,
      landQuality: this._landQuality,
      activity: this._activity,
    }
  }
}
