import type {
  ResidentStatus,
  Trait,
  ResidentOccupation,
  Activity,
} from '../types/types'

export class Resident {
  private static nextId = 1;

  readonly _id: number
  readonly _name: string
  readonly _trait: Trait
  private _status: ResidentStatus
  private _occupation: ResidentOccupation
  private _tokens: number
  private _sustenance: number
  private _consumable: number
  private _landQuality: number
  private _activity: Activity

  constructor(name: string, trait: Trait, tokens: number, sustenance: number, consumable: number, landQuality: number) {
    this._id = Resident.nextId++
    this._name = name
    this._trait = trait
    this._status = 'thriving'
    this._occupation = 'owner'
    this._tokens = tokens ? tokens : 0
    this._sustenance = 0
    this._consumable = consumable ? consumable : 0
    this._landQuality = landQuality
    this._activity = 'idle'
  }

  get id(): number { return this._id }
  get name(): string { return this._name }
  get trait(): Trait { return this._trait }
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
    if (this._consumable >= 2) this.setStatus('thriving')
  }

  removeConsumable(amount: number) {
    this._consumable = Math.max(0, this._consumable - amount)
    if (this._consumable === 0) this.setStatus('deceased')
    else if (this._consumable <= 2) this.setStatus('deprived')
  }

  improveLandQuality(multiplier: number) {
    this._landQuality = this._landQuality * multiplier
  }

  setActivity(activity: Activity) {
    this._activity == activity
  }

  toJSON(): object {
    return {
      id: this._id,
      name: this._name,
      trait: this._trait,
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