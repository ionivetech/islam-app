<script setup lang="ts">
// Interface
import { IHadithItems } from 'models/IHadith'

// Props
defineProps({
  hadithHistoryName: {
    type: String,
    default: '',
  },
  hadith: {
    type: Object as PropType<IHadithItems>,
    required: true,
  },
})
</script>

<template>
  <div
    class="rounded-lg border border-gray-300/70 p-4 transition-all duration-150 ease-linear hover:!border-teal-600 hover:shadow-[0px_0px_20px_#e4e4e4] dark:border-gray-700 hover:dark:shadow-[0px_0px_20px_#2f2f2f] md:p-6"
  >
    <p class="mb-6 text-sm font-semibold text-yami dark:text-slate-200 md:text-base">
      Hadist {{ hadithHistoryName }} Nomor {{ hadith.number }}
    </p>

    <p
      class="mb-3 text-right font-mono text-2xl leading-[55px] text-yami dark:text-slate-200 md:leading-[60px] lg:text-3xl lg:!leading-[70px]"
    >
      {{ hadith.arab }}
    </p>

    <p class="text-sm !leading-8 text-smoke-1 dark:text-smoke-2 md:text-base">
      {{ hadith.id }}
    </p>
  </div>
</template>
