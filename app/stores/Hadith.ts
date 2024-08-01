import { defineStore } from 'pinia'
// Interface
import type { IHadithHistory } from '@/models/IHadith'

// Type state
type Store = {
  hadithHistory: IHadithHistory[]
}

export const useHadithStore = defineStore({
  id: 'hadithStore',

  state: (): Store => ({
    hadithHistory: [],
  }),

  getters: {
    getHadithHistory: (state) => state.hadithHistory,
  },

  actions: {
    setHadithHistory(data: IHadithHistory[]) {
      this.hadithHistory = data
    },
  },
})
