import { create } from 'zustand'
import type { CommunityStore } from '../simulation/types/types'
import { initCommunity } from '../simulation/logic/initCommunity'

export const useCommunityStore = create<CommunityStore>((set) => {
  const { residents, naturalResources } = initCommunity(10, 100)

  return {
    residents,
    setResidents: (residents) => set({ residents }),
    naturalResources,
    setNaturalResources: (naturalResources) => set({ naturalResources }),

    reset: () => {
      const { residents, naturalResources } = initCommunity(10, 100)
      set({ residents, naturalResources })
    },
  }
})

