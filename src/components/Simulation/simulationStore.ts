import type {
  SimulationStore,
  BankingMode,
  GovernanceMode,
  TaxType,
  TaxConfig,
  BehaviouralTrait
} from '../../types/types'
import { Resident } from '../../models/Resident'
import { create } from 'zustand'
import { randomGaussian } from '../../utility/math'


const names = [
  'Alice',
  'Bob',
  'Carol',
  'Dave',
  'Eve',
  'Frank',
  'Grace',
  'Hank',
  'Irene',
  'Jack',
  'Kate',
  'Leo',
  'Mallory',
  'Ned',
  'Olivia',
  'Peggy',
  'Quinn',
  'Rick',
  'Sybil',
  'Trent',
]

const pickTrait = (index: number): BehaviouralTrait => {
  const traitP = {
    sustainer: 0.6,
    riskTaker: 0.2,
    inventor: 0.2,
  }
  const rnd = Math.random()
  if (rnd < traitP.sustainer) return 'sustainer'
  if (rnd < traitP.sustainer + traitP.riskTaker) return 'risk-taker'
  return 'inventor'
}

const createResidents = (): Array<Resident> => {
  const residents = names.slice(0, 10).map((name, index) => {
    const landQuality = randomGaussian(1, 0.5)
    const behaviouralTrait = pickTrait(index)
    return new Resident(name, behaviouralTrait, 'thriving', 10, 50, 10, landQuality, 'idle')
  })
  return residents
}

const updatedResident = () => {

}

/* STORE */

export const useSimulationStore = create<SimulationStore>((set) => ({
  bankingMode: 'gold-standard',
  setBankingMode: (bankingMode: BankingMode) => set({ bankingMode }),

  governanceMode: 'elder-autocratic',
  setGovernanceMode: (governanceMode: GovernanceMode) =>
    set({ governanceMode }),

  taxSettings: new Map<TaxType, TaxConfig>(),
  // Note to self: Partial makes providing properties optional. e.g No need to pass full { enabled: <value>, rate: <value> }
  setTaxConfig: (taxType: TaxType, config: Partial<TaxConfig>) => {
    set((state) => {
      const newSettings = new Map(state.taxSettings) // Nts: Never update existing state. Update copy instead. 
      const oldConfig = newSettings.get(taxType) ?? { enabled: false, rate: 20 }
      newSettings.set(taxType, { ...oldConfig, ...config })
      return { taxSettings: newSettings }
    })
  },

  residents: [],
  setResidents: (residents: Resident[]) => set({ residents }),

  tickCount: 0,
  addTick: () => {
    set((state) => ({ tickCount: state.tickCount + 1 }))
  },

  update: () =>
    set((state) => {
      // First pass: simulate
      const updatedResidents = state.residents.map(resident => {
        const updatedResident = new Resident(
          resident.name,
          resident.behaviouralTrait,
          resident.status,
          resident.tokens,
          resident.sustenance,
          resident.consumable,
          resident.landQuality,
          resident.activity
        )

        if (resident.status === 'deceased') return updatedResident

        // Daily actions
        updatedResident.removeConsumable(1)

        // Weekly decisions
        if (state.tickCount % 7 === 0) {
          updatedResident.decideNextAction()
        }

        // Produce
        updatedResident.produceSustenance()

        return updatedResident
      })

      // Second pass: resolve trades (when updatedResidents is fully initialized)
      updatedResidents.forEach((buyer) => {
        if (buyer.status === 'deceased') return

        if (buyer.consumable < 7) {
          const tradeResult = buyer.tryBuyConsumables(7, updatedResidents)
          if (tradeResult) {
            console.log(tradeResult)
            const seller = updatedResidents[tradeResult.sellerIndex]
            seller.removeSustenance(tradeResult.targetAmount)
            seller.addTokens(tradeResult.targetAmount)
            console.log('resultl: ', seller.sustenance)
          }
        }
      })
      return { residents: updatedResidents }
    }),
  reset: () => {
    set({ isRunning: false })
    set({ tickCount: 0 })
    set({ residents: createResidents() })
  },

  isRunning: false,
  start: () => set({ isRunning: true }),
  stop: () => set({ isRunning: false }),

  tickRate: 1000,
  setTickRate: (value: number) => set({ tickRate: value }),
}))
