<script setup lang="ts">
// Interface
import type { IHadithItems } from 'models/IHadith'

// Props
withDefaults(
  defineProps<{
    hadithHistoryName: string
    hadith: IHadithItems
  }>(),
  {
    hadithHistoryName: '',
  },
)
</script>

<template>
  <div
    class="rounded-lg border border-gray-300/70 p-4 transition-all duration-150 ease-linear hover:!border-teal-600 hover:shadow-[0px_0px_20px_#e4e4e4] md:p-6 dark:border-gray-700 hover:dark:shadow-[0px_0px_20px_#2f2f2f]"
  >
    <p class="mb-6 text-sm font-semibold text-yami md:text-base dark:text-slate-200">
      Hadits {{ hadithHistoryName }} Nomor {{ hadith.number }}
    </p>

    <p
      dir="rtl"
      lang="ar"
      class="mb-3 text-right font-mono text-3xl leading-[65px] text-slate-800 md:!leading-[70px] lg:text-4xl lg:!leading-[80px] dark:text-slate-200"
    >
      {{ hadith.arab }}
    </p>

    <p class="text-sm !leading-7 text-smoke-1 md:text-base dark:text-smoke-2">
      {{ hadith.id }}
    </p>
  </div>
</template>
