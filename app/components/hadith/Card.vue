<script setup lang="ts">
// Interface
import type { IHadithItems } from '@/models/IHadith';

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
    class="rounded-lg border border-gray-300/70 p-4 transition-all duration-200 ease-linear hover:border-teal-600 hover:shadow-hadith-card dark:border-gray-700 hover:dark:shadow-hadith-card-dark md:p-6"
  >
    <p class="mb-6 text-sm font-semibold text-yami dark:text-slate-200 md:text-base">
      Hadits {{ hadithHistoryName }} Nomor {{ hadith.number }}
    </p>

    <p
      dir="rtl"
      lang="ar"
      class="mb-3 text-right font-mono text-3xl leading-[65px] text-slate-800 dark:text-slate-200 md:leading-[70px] lg:text-4xl lg:leading-[80px]"
    >
      {{ hadith.arab }}
    </p>

    <p class="text-sm leading-7 text-smoke-1 dark:text-smoke-2 md:text-base">
      {{ hadith.id }}
    </p>
  </div>
</template>
