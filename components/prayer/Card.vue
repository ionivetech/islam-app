<script setup lang="ts">
// Interfaces
import type { IPrayer } from '@/models/IPrayer'

// Props
defineProps({
  prayer: {
    type: Object as PropType<IPrayer>,
    required: true,
  },
  index: {
    type: Number,
    default: 0,
  },
  prayerExpanded: {
    type: Number,
    default: 0,
  },
})

// Emits
const emits = defineEmits(['toggle-expand-prayer'])
</script>

<template>
  <div
    class="group rounded-lg border border-gray-300/70 p-3 transition-all duration-150 ease-linear hover:!border-teal-600 hover:shadow-[0px_0px_20px_#eeeeee] dark:border-gray-700 hover:dark:shadow-[0px_0px_20px_#2f2f2f] md:p-4"
  >
    <div
      :class="
        index + 1 === prayerExpanded
          ? 'md:mb-4 md:pb-4 mb-3 pb-3 border-b border-gray-300/70 dark:border-gray-700'
          : 'mb-0'
      "
      class="flex cursor-pointer items-center justify-between gap-x-3"
      @click="emits('toggle-expand-prayer', index + 1)"
    >
      <div class="flex items-start gap-x-1.5">
        <p class="text-sm font-medium tracking-wide text-yami dark:text-slate-200 md:text-base">
          {{ index + 1 }}.
        </p>
        <p class="text-sm font-medium tracking-wide text-yami dark:text-slate-200 md:text-base">
          {{ prayer.nama }}
        </p>
      </div>

      <Icon
        name="fluent:chevron-down-24-filled"
        :class="{ 'rotate-180': index + 1 === prayerExpanded }"
        class="w-4 min-w-[16px] transition-all duration-300 ease-in-out md:text-xl"
      />
    </div>

    <div
      v-if="index + 1 === prayerExpanded"
      class="space-y-5"
    >
      <!-- Arab, latin & translation -->
      <div v-if="prayer.arab">
        <p
          class="mb-3 text-right font-mono text-2xl leading-[55px] text-yami dark:text-slate-200 md:leading-[60px] lg:text-3xl lg:!leading-[70px]"
        >
          {{ prayer.arab }}
        </p>

        <p
          class="mb-3 text-sm !leading-6 tracking-wide text-teal-800 dark:text-white md:text-base md:!leading-7"
        >
          {{ prayer.latin }}
        </p>

        <p class="text-sm !leading-6 text-smoke-1 dark:text-slate-400 md:text-base md:!leading-7">
          {{ prayer.arti }}
        </p>
      </div>

      <!-- Notes -->
      <div v-if="prayer.keterangan">
        <p class="mb-1 text-sm font-semibold text-yami dark:text-slate-200">Keterangan:</p>
        <p
          class="text-xs text-smoke-1 dark:text-slate-400 md:text-sm"
          v-html="prayer.keterangan"
        ></p>
      </div>

      <!-- Hadith history -->
      <div v-if="prayer.riwayat">
        <p class="mb-1 text-sm font-semibold text-yami dark:text-slate-200">Riwayat:</p>
        <p class="text-xs text-smoke-1 dark:text-slate-400 md:text-sm">{{ prayer.riwayat }}</p>
      </div>
    </div>
  </div>
</template>
