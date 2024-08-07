<script setup lang="ts">
import { Icon } from '@iconify/vue';

// Interfaces
import type { ISurah } from '@/models/ISurah';

// Store
const alQuranStore = useAlQuranStore()

// Emits
const emits = defineEmits<{
  (e: 'show-detail' | 'show-list'): void
}>()

// Surah detail
const { data: surahDetail } = useNuxtData<ISurah>('surahDetail')

// Play surah audio
const playSurah = () => {
  const data = {
    surah: surahDetail.value!.namaLatin,
    qori: 'Misyari Rasyid Al-Afasi',
    source: surahDetail.value!.audioFull,
  }
  if (surahDetail.value) alQuranStore.setPlayingAudio(data)
}
</script>

<template>
  <div
    v-if="surahDetail"
    class="sticky top-0 z-10 flex h-10 w-full items-center border-b border-slate-700/10 bg-white/75 backdrop-blur dark:border-slate-300/10 dark:bg-background-dark/70"
  >
    <div class="container flex items-center justify-between">
      <div
        class="flex cursor-pointer items-center gap-x-2"
        role="button"
        @click="emits('show-list')"
      >
        <Icon
          icon="heroicons:squares-2x2-20-solid"
          class="text-base text-slate-800 dark:text-slate-200 md:text-lg"
        />
        <p class="text-xs text-slate-800 dark:text-slate-200 md:text-sm">
          {{ surahDetail.namaLatin }}
        </p>
      </div>

      <div class="flex items-center gap-x-4">
        <!-- Detail button -->
        <div
          class="flex cursor-pointer items-center text-xs text-slate-800 dark:text-slate-200 md:text-sm"
          @click="emits('show-detail')"
        >
          <Icon
            icon="heroicons:information-circle-solid"
            class="mr-1 text-base text-slate-800 dark:text-slate-200 md:text-lg"
          />
          Detail
        </div>

        <!-- Play button -->
        <div
          class="flex cursor-pointer items-center text-xs text-teal-700 dark:text-teal-500 md:text-sm"
          @click="playSurah"
        >
          <Icon
            icon="heroicons:play-solid"
            class="mr-1 text-base text-teal-700 dark:text-teal-500 md:text-lg"
          />
          Putar
        </div>
      </div>
    </div>
  </div>
</template>
