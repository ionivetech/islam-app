import { defineStore } from 'pinia'

// Type state
interface IDataAudio {
  surah: string
  qori: string
  source: string
}
type Store = {
  playingAudio: IDataAudio | null
}

export const useAlQuranStore = defineStore({
  id: 'alQuranStore',

  state: (): Store => ({
    playingAudio: null,
  }),

  getters: {
    getPlayingAudio: (state) => state.playingAudio,
  },

  actions: {
    setPlayingAudio(data: IDataAudio | null) {
      this.playingAudio = data
    },
  },
})
