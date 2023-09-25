<script setup lang="ts">
// Interfaces
import { IAyat } from 'models/ISurah'
// Props
defineProps({
  surahNumber: {
    type: Number,
    default: 0,
  },
  ayat: {
    type: Object as PropType<IAyat>,
    required: true,
  },
  index: {
    type: Number,
    default: 0,
  },
})

// Emits
const emits = defineEmits(['open-tafsir'])
</script>

<template>
  <div
    class="flex w-full flex-col gap-8 border-b border-gray-200 py-7 last:border-b-0 last:pb-0 dark:border-gray-800 md:flex-row md:gap-12"
  >
    <div class="flex items-center justify-start gap-2 md:flex-col">
      <!-- Number surah & ayat -->
      <p class="text-sm font-semibold tracking-wide text-smoke-1 dark:text-smoke-2">
        {{ surahNumber }}:{{ ayat.nomorAyat }}
      </p>

      <!-- Button tafsir -->
      <UTooltip text="Tafsir">
        <div
          class="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-lg text-smoke-1 hover:bg-teal-100/60 hover:text-teal-700 dark:text-smoke-2 hover:dark:bg-teal-200/10 hover:dark:text-teal-500"
          role="button"
          @click="emits('open-tafsir', index)"
        >
          <Icon name="heroicons:book-open" />
        </div>
      </UTooltip>
    </div>

    <div class="w-full">
      <p
        class="mb-5 text-right font-mono text-3xl leading-[65px] text-slate-800 dark:text-slate-200 md:!leading-[70px] lg:text-4xl lg:!leading-[80px]"
      >
        {{ ayat.teksArab }}
      </p>

      <p class="mb-3 text-base !leading-8 tracking-wide text-teal-800 dark:text-white">
        {{ ayat.teksLatin }}
      </p>
      <p class="text-base !leading-8 text-smoke-1 dark:text-slate-400">
        {{ ayat.teksIndonesia }}
      </p>
    </div>
  </div>
</template>
