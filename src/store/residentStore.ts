import type {
  ResidentStore,
} from '../simulation/types/types'
import type { Resident } from '../simulation/types/types'
import { create } from 'zustand'
import { createResidents } from '../simulation/logic/residentOrchestrator'

export const useResidentStore = create<ResidentStore>((set) => ({
  residents: createResidents(), // Residents single source of truth
  setResidents: (residents: Resident[]) => set({ residents }),
  reset: () => {
    set({ residents: createResidents() })
  },
}))
