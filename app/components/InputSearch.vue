<script lang="ts" setup>
import { Icon } from '@iconify/vue';

const search = defineModel<string>()

defineProps<{
  placeholder: string
}>()
</script>

<template>
  <div class="relative w-full md:w-8/12 lg:w-6/12">
    <input
      v-model="search"
      type="text"
      :placeholder="placeholder"
      class="input-search"
    >

    <div
      class="absolute inset-y-2/4 right-1 flex size-8 -translate-y-2/4 items-center justify-center rounded-full bg-teal-600 dark:bg-slate-700 md:right-2 md:size-9"
    >
      <Icon
        icon="radix-icons:magnifying-glass"
        class="text-xl text-white"
      />
    </div>
  </div>
</template>