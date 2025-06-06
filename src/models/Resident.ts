import type {
  ResidentStatus,
  BehaviouralTrait,
  ResidentOccupation,
  Activity,
} from '../types/types'

export class Resident {
  private static nextId = 1;

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

  constructor(name: string, behaviouralTrait: BehaviouralTrait, tokens: number, sustenance: number, consumable: number, landQuality: number, activity: Activity) {
    this._id = Resident.nextId++
    this._name = name
    this._behaviouralTrait = behaviouralTrait
    this._status = 'thriving'
    this._occupation = 'owner'
    this._tokens = tokens ? tokens : 0
    this._sustenance = sustenance ? sustenance : 0
    this._consumable = consumable ? consumable : 0
    this._landQuality = landQuality
    this._activity = activity
  }

  get id(): number { return this._id }
  get name(): string { return this._name }
  get behaviouralTrait(): BehaviouralTrait { return this._behaviouralTrait }
  get status(): ResidentStatus { return this._status }
  get occupation(): ResidentOccupation { return this._occupation }
  get tokens(): number { return this._tokens }
  get sustenance(): number { return this._sustenance }
  get consumable(): number { return this._consumable }
  get landQuality(): number { return this._landQuality }
  get activity(): Activity { return this._activity }

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

  addConsumable(amount: number) {
    this._consumable += amount
    if (this._consumable >= 7) this.setStatus('thriving')
  }

  removeConsumable(amount: number) {
    this._consumable = Math.max(0, this._consumable - amount)
    if (this._consumable === 0) this.setStatus('deceased')
    else if (this._consumable <= 7) this.setStatus('deprived')
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

    const combined = (internal * internalBias + external * externalBias)
    const threshold = Math.random()

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

    if (this._landQuality > 1) return pBase *= 0.5
    else return pBase *= 1
  }

  produce() {
    if (this._activity === 'producing') {
      // Basic sustenance output influenced by land quality
      const baseProduction = 20
      const landMultiplier = this._landQuality || 1
      this._consumable = Math.round(baseProduction * landMultiplier)

    } else if (this._activity === 'mining') {
      // Mining produces tokens, not sustenance
      const baseMining = 5
      const miningLuck = Math.random() * 2 // adds some randomness
      this._tokens = Math.round(baseMining * miningLuck)
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
      activity: this._activity
    }
  }
}