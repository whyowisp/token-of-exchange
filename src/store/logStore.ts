import type {
  LogStore,
} from '../simulation/types/types'
import { create } from 'zustand'

export const useLogStore = create<LogStore>((set) => ({
  activityLogEntries: [],
  addActivityLogEntry: (entry) => set((state) => ({
    activityLogEntries: [entry, ...state.activityLogEntries],
  })),

  reset: () => {
    set({ activityLogEntries: [] })
  },
}))
