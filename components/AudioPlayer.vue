<script setup lang="ts">
// Store
const alQuranStore = useAlQuranStore()

// Ref
const playerRef = ref()
const playerSourceRef = ref()
const sliderRef = ref()

// Variables
const showAudioPlayer = ref<boolean>(false)
const isPlaying = ref<boolean>(false)
const pauseUpdateSlider = ref<boolean>(false)
const playbackTime = ref<number>(0)
const maxDuration = ref<number>(0)
const labelAudioDuration = ref<string>('00:00:00')
const labelCurrentTime = ref<string>('00:00:00')
const debounceInputSlider = ref()

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
        playerSourceRef.value = val.source
        playerRef.value.load()
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
    alQuranStore.setPlayingAudio(null)
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
  if (debounceInputSlider.value) clearTimeout(debounceInputSlider.value)
  debounceInputSlider.value = setTimeout(() => {
    pauseUpdateSlider.value = false
  }, 1000)

  pauseUpdateSlider.value = true
  const tempSliderValue = e.target.value
  labelCurrentTime.value = convertTime(tempSliderValue)

  const progress = (tempSliderValue / maxDuration.value) * 100
  setColorProgressSlider(progress)
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
  <ClientOnly>
    <Teleport to="#content">
      <Transition name="audio">
        <div
          v-if="showAudioPlayer"
          class="fixed inset-x-0 bottom-16 z-10 w-full border-t border-slate-700/10 bg-background-light backdrop-blur dark:border-slate-300/10 dark:bg-background-dark/75 md:bottom-0"
        >
          <!-- Audio element -->
          <audio
            v-show="false"
            ref="playerRef"
            preload="metadata"
            @timeupdate="onTimeUpdateListener"
            @ended="onEndedPlaying"
          >
            <source
              ref="playerSourceRef"
              :src="alQuranStore.getPlayingAudio?.source"
              type="audio/mpeg"
            />
          </audio>

          <div class="p-2.5 md:p-4">
            <!-- Info surah -->
            <div class="relative mb-1 flex w-full items-center">
              <!-- Play & Pause button -->
              <div
                class="relative mr-2 flex size-10 cursor-pointer items-center justify-center rounded-full bg-teal-600 text-2xl text-white md:absolute md:inset-x-0 md:mx-auto md:size-12"
                role="button"
                @click="togglePlay"
              >
                <Icon :name="isPlaying ? 'heroicons:pause-solid' : 'heroicons:play-solid'" />
              </div>

              <div>
                <p
                  class="text-sm font-semibold tracking-wide text-yami dark:text-slate-200 md:text-base"
                >
                  {{ alQuranStore.getPlayingAudio?.surah }}
                </p>
                <p class="text-xs font-medium text-smoke-1 dark:text-smoke-2 md:text-sm">
                  {{ alQuranStore.getPlayingAudio?.qori }}
                </p>
              </div>

              <UTooltip
                text="Tutup pemutar audio"
                class="absolute right-1 top-1 cursor-pointer md:right-2 md:top-2"
              >
                <Icon
                  name="heroicons:x-mark-solid"
                  class="text-xl text-yami dark:text-slate-200"
                  @click="stop"
                />
              </UTooltip>
            </div>

            <!-- Progress audio -->
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

            <!-- Current time & duration -->
            <div class="mt-1 flex items-center justify-between">
              <p class="text-xs text-yami dark:text-slate-200">{{ labelCurrentTime }}</p>

              <p class="text-xs text-smoke-1 dark:text-smoke-2">
                {{ labelAudioDuration }}
              </p>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </ClientOnly>
</template>

<style>
#slider {
  @apply appearance-none w-full h-1 outline-none cursor-pointer;
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
