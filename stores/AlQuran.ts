import { defineStore } from 'pinia'

// Type state
type Store = {
  playingAudio: string
}

export const useAlQuranStore = defineStore({
  id: 'alQuranStore',

  state: (): Store => ({
    playingAudio: '',
  }),

  getters: {
    getPlayingAudio: (state) => state.playingAudio,
  },

  actions: {
    setPlayingAudio(url: string) {
      this.playingAudio = url
    },
  },
})
