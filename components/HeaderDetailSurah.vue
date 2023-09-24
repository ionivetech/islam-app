<script setup lang="ts">
// Interfaces
import { ISurah } from 'models/ISurah'

// Props
defineProps({
  detailSurah: {
    type: Object as PropType<ISurah>,
    required: true,
  },
})

// Emits
const emits = defineEmits(['show-detail', 'show-list'])
</script>

<template>
  <div
    class="sticky top-0 z-10 flex h-10 w-full items-center border-b border-slate-700/10 bg-background-light px-3 dark:border-slate-300/10 dark:bg-background-dark/70 dark:backdrop-blur"
  >
    <div class="container flex items-center justify-between">
      <div
        class="flex cursor-pointer items-center gap-x-2"
        role="button"
        @click="emits('show-list')"
      >
        <Icon
          name="heroicons:squares-2x2-20-solid"
          class="text-base text-slate-800 dark:text-slate-200 md:text-lg"
        />
        <p class="text-xs text-slate-800 dark:text-slate-200 md:text-sm">
          {{ detailSurah.namaLatin }}
        </p>
      </div>

      <div class="flex items-center gap-x-4">
        <div
          class="flex cursor-pointer items-center text-xs text-slate-800 dark:text-slate-200 md:text-sm"
          @click="emits('show-detail')"
        >
          <Icon
            name="heroicons:information-circle-solid"
            class="mr-1 text-base text-slate-800 dark:text-slate-200 md:text-lg"
          />
          Detail
        </div>
        <div
          class="flex cursor-pointer items-center text-xs text-teal-700 dark:text-teal-500 md:text-sm"
        >
          <Icon
            name="heroicons:play-solid"
            class="mr-1 text-base text-teal-700 dark:text-teal-500 md:text-lg"
          />
          Putar
        </div>
      </div>
    </div>
  </div>
</template>
