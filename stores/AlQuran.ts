import { defineStore } from 'pinia'
// Interfaces
import { ISurah } from 'models/ISurah'

// Type state
type Store = {
  surah: ISurah[]
  playingAudio: string
}

export const useAlQuranStore = defineStore({
  id: 'alQuranStore',

  state: (): Store => ({
    surah: [],
    playingAudio: '',
  }),

  getters: {
    getSurah: (state) => state.surah,
    getPlayingAudio: (state) => state.playingAudio,
  },

  actions: {
    setSurah(surah: ISurah[]) {
      this.surah = surah
    },

    setPlayingAudio(url: string) {
      this.playingAudio = url
    },
  },
})
