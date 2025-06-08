import type {
  ResidentFeedStore,
} from '../types/types'
import { create } from 'zustand'

const MAX_FEED_LENGTH = 50

export const useResidentFeedStore = create<ResidentFeedStore>((set, get) => ({
  feed: [],

  addEntry: (entry) =>
    set((state) => ({
      feed: [entry, ...state.feed].slice(0, MAX_FEED_LENGTH)
    })),

  getFeedForResident: (residentId) =>
    get().feed.filter((e) => e.residentId === residentId),

  getGlobalFeed: () => get().feed,

  clearFeed: () => set({ feed: [] }),
}))