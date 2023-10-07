import { defineStore } from 'pinia'

// Interface state
interface IDataAudio {
  surah: string
  qori: string
  source: string
}
interface IStore {
  playingAudio: IDataAudio | null
}

export const useAlQuranStore = defineStore({
  id: 'alQuranStore',

  state: (): IStore => ({
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
