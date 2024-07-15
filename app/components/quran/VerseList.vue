<script setup lang="ts">
// Interfaces
import type { IVerse } from 'models/ISurah'

// Props
const props = withDefaults(
  defineProps<{
    surahName: string
    surahNumber: number
    verse: IVerse
    index: number
  }>(),
  {
    surahName: '',
    surahNumber: 0,
  },
)

// Emits
const emits = defineEmits<{
  (e: 'open-tafsir', value: number): void
}>()

// Store
const alQuranStore = useAlQuranStore()

// Play surah audio
const playSurah = () => {
  const data: any = {
    surah: `${props.surahName} - ${props.verse.nomorAyat}`,
    qori: 'Misyari Rasyid Al-Afasi',
    source: Object.values(props.verse.audio).find((audio: any) => audio.includes('Misyari')),
  }
  alQuranStore.setPlayingAudio(data)
}
</script>

<template>
  <div class="flex w-full flex-col gap-8">
    <!-- Header -->
    <div
      class="flex items-center justify-between rounded-xl bg-teal-600/10 px-4 py-1.5 dark:bg-teal-200/10"
    >
      <!-- Number surah & ayat -->
      <p class="text-sm font-semibold tracking-wide text-teal-700 dark:text-teal-500">
        {{ verse.nomorAyat }}
      </p>

      <div class="flex items-center gap-1">
        <!-- Play ayat -->
        <UTooltip text="Putar ayat">
          <div
            class="flex size-8 cursor-pointer items-center justify-center rounded-full text-lg text-teal-700 hover:bg-teal-100/60 dark:text-teal-500 hover:dark:bg-teal-200/10"
            role="button"
            @click="playSurah"
          >
            <Icon name="heroicons:play" />
          </div>
        </UTooltip>

        <!-- Button tafsir -->
        <UTooltip text="Tafsir">
          <div
            class="flex size-8 cursor-pointer items-center justify-center rounded-full text-lg text-teal-700 hover:bg-teal-100/60 dark:text-teal-500 hover:dark:bg-teal-200/10"
            role="button"
            @click="emits('open-tafsir', index)"
          >
            <Icon name="heroicons:book-open" />
          </div>
        </UTooltip>
      </div>
    </div>

    <!-- Verse -->
    <div class="w-full">
      <p
        dir="rtl"
        lang="ar"
        class="mb-5 text-right font-mono text-3xl leading-[65px] text-slate-800 dark:text-slate-200 md:!leading-[70px] lg:text-4xl lg:!leading-[80px]"
      >
        {{ verse.teksArab }}
      </p>

      <p class="mb-3 text-sm !leading-7 tracking-wide text-teal-800 dark:text-white md:text-base">
        {{ verse.teksLatin }}
      </p>
      <p class="text-sm !leading-7 text-smoke-1 dark:text-slate-400 md:text-base">
        {{ verse.teksIndonesia }}
      </p>
    </div>
  </div>
</template>
