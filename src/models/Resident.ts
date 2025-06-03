import type {
  ResidentStatus,
  Trait,
  ResidentOccupation,
} from '../types/types'

export class Resident {
  private static nextId = 1;

  readonly _id: number
  readonly _name: string
  readonly _trait: Trait
  private _status: ResidentStatus
  private _occupation: ResidentOccupation
  private _tokens: number

  constructor(name: string, trait: Trait, tokens: number) {
    this._id = Resident.nextId++
    this._name = name
    this._trait = trait
    this._status = 'thriving'
    this._occupation = 'unemployed'
    this._tokens = tokens ? tokens : 0
  }

  get id(): number { return this._id }
  get name(): string { return this._name }
  get trait(): Trait { return this._trait }
  get status(): ResidentStatus { return this._status }
  get occupation(): ResidentOccupation { return this._occupation }
  get tokens(): number { return this._tokens }

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

  toJSON(): object {
    return {
      id: this._id,
      name: this._name,
      trait: this._trait,
      status: this._status,
      occupation: this._occupation,
      tokens: this._tokens
    }
  }
}