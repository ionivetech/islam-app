<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'

// Store
const alQuranStore = useAlQuranStore()

// Ref
const playerRef = ref()
const sliderRef = ref()

// Variables
const showAudioPlayer = ref<boolean>(false)
const isPlaying = ref<boolean>(false)
const pauseUpdateSlider = ref<boolean>(false)
const playbackTime = ref<number>(0)
const maxDuration = ref<number>(0)
const labelAudioDuration = ref<string>('00:00:00')
const labelCurrentTime = ref<string>('00:00:00')

// Watch url audio
watch(
  () => alQuranStore.getPlayingAudio,
  (val) => {
    if (val) {
      if (!showAudioPlayer.value) {
        showAudioPlayer.value = true
        setTimeout(() => {
          initAudioPlayer()
        }, 250)
      } else {
        initAudioPlayer()
      }
    } else {
      showAudioPlayer.value = false
    }
  },
)

// Convert audio time to hh:mm:ss
const convertTime = (time: number) => {
  const hours = Math.floor(time / 3600)
  const minutes = Math.floor((time % 3600) / 60)
  const seconds = Math.floor(time % 60)

  const hoursReadable = hours < 10 ? `0${hours}` : hours
  const minutesReadable = minutes < 10 ? `0${minutes}` : minutes
  const secondsReadable = seconds < 10 ? `0${seconds}` : seconds

  // Return the formatted string
  return `${hoursReadable}:${minutesReadable}:${secondsReadable}`
}

const play = () => {
  playerRef.value.play()
  isPlaying.value = true
}

const pause = () => {
  playerRef.value.pause()
  isPlaying.value = false
}

const stop = () => {
  playerRef.value.pause()
  playerRef.value.currentTime = 0
  isPlaying.value = false

  setTimeout(() => {
    alQuranStore.setPlayingAudio('')
  }, 200)
}

const togglePlay = () => {
  if (isPlaying.value) pause()
  else play()
}

// Set time data audio duration
const displayDuration = () => {
  labelAudioDuration.value = convertTime(Math.floor(playerRef.value.duration))
}

// Set maximum slider
const setSliderMax = () => {
  maxDuration.value = Math.floor(playerRef.value.duration)
}

// Set color slider
const setColorProgressSlider = (progress: number) => {
  sliderRef.value.style = ` --progress:${progress}%`
}

// Handle time update audio element
const onTimeUpdateListener = () => {
  if (!pauseUpdateSlider.value) {
    labelCurrentTime.value = convertTime(playerRef.value.currentTime)
    playbackTime.value = Math.floor(playerRef.value.currentTime)

    const progress = (playbackTime.value / maxDuration.value) * 100
    setColorProgressSlider(progress)
  }
}

const onEndedPlaying = () => {
  setTimeout(() => {
    stop()
  }, 500)
}

// Handle change position slider
const onChangeProgressPosition = () => {
  playerRef.value.currentTime = Number(playbackTime.value)
}

// Handle input slider
const onInputSlider = (e: any) => {
  const debounceUnpause = useDebounceFn(() => {
    pauseUpdateSlider.value = false
  }, 2000)

  pauseUpdateSlider.value = true
  const tempSliderValue = e.target.value
  labelCurrentTime.value = convertTime(tempSliderValue)

  const progress = (tempSliderValue / maxDuration.value) * 100
  setColorProgressSlider(progress)
  debounceUnpause()
}

const initial = () => {
  displayDuration()
  setSliderMax()
  setColorProgressSlider(0)
  play()
}

// Initialized audio player
const initAudioPlayer = () => {
  if (playerRef.value.readyState > 0) {
    initial()
  } else {
    playerRef.value.addEventListener('loadedmetadata', () => {
      initial()
    })
  }
}
</script>

<template>
  <Teleport to="body">
    <Transition name="audio">
      <div
        v-if="showAudioPlayer"
        class="fixed inset-x-0 bottom-0 z-50 w-full border-t border-slate-700/10 bg-background-light dark:border-slate-300/10 dark:bg-background-dark"
      >
        <audio
          v-show="false"
          ref="playerRef"
          preload="metadata"
          @timeupdate="onTimeUpdateListener"
          @ended="onEndedPlaying"
        >
          <source
            :src="alQuranStore.getPlayingAudio"
            type="audio/mpeg"
          />
        </audio>
        <input
          id="slider"
          ref="sliderRef"
          v-model="playbackTime"
          min="0"
          :max="maxDuration"
          type="range"
          @input="onInputSlider"
          @change="onChangeProgressPosition"
        />

        <div class="flex items-center justify-between p-4">
          <p class="text-sm text-yami dark:text-slate-200">{{ labelCurrentTime }}</p>

          <div class="flex items-center gap-x-2">
            <div
              class="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-teal-100 text-lg text-teal-700 dark:bg-teal-200/10 dark:text-teal-500"
              role="button"
              @click="togglePlay"
            >
              <Icon :name="isPlaying ? 'heroicons:pause-solid' : 'heroicons:play-solid'" />
            </div>

            <div
              class="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-rose-100 text-lg text-rose-700 dark:bg-rose-200/10 dark:text-rose-500"
              role="button"
              @click="stop"
            >
              <Icon name="heroicons:stop-solid" />
            </div>
          </div>

          <p class="text-sm text-yami dark:text-slate-200">
            {{ labelAudioDuration }}
          </p>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style>
#slider {
  @apply absolute -top-[2px] appearance-none w-full h-1 outline-none cursor-pointer;
  background: linear-gradient(
    to right,
    theme('colors.teal.500') var(--progress),
    theme('colors.zinc.200') var(--progress)
  );
}

html.dark #slider {
  background: linear-gradient(
    to right,
    theme('colors.teal.500') var(--progress),
    theme('colors.zinc.600') var(--progress)
  );
}

/* Thumb: webkit */
#slider::-webkit-slider-thumb {
  @apply appearance-none w-3 h-3 bg-teal-600 rounded-full border-none transition-all ease-in-out duration-200;
}

/* Thumb: Firefox */
#slider::-moz-range-thumb {
  @apply appearance-none w-3 h-3 bg-teal-600 rounded-full border-none transition-all ease-in-out duration-200;
}

/* Hover Thumb: Webkit */
#slider::-webkit-slider-thumb:hover {
  @apply shadow-[0_0_0_10px] shadow-teal-300/30;
}

/* Hover Thumb: Firfox */
#slider::-moz-range-thumb:hover {
  @apply shadow-[0_0_0_10px] shadow-teal-300/30;
}
</style>
