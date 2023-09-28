import { defineStore } from 'pinia'
// Interfaces
import { ISurah } from 'models/ISurah'

// Type state
type Store = {
  surah: ISurah[]
}

export const useAlQuranStore = defineStore({
  id: 'alQuranStore',

  state: (): Store => ({
    surah: [],
  }),

  getters: {
    getSurah: (state) => state.surah,
  },

  actions: {
    setSurah(surah: ISurah[]) {
      this.surah = surah
    },
  },
})
