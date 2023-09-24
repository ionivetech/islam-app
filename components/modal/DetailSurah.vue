<script lang="ts" setup>
// Props
defineProps({
  description: {
    type: String,
    default: '',
  },
})

// Emits
const emits = defineEmits(['close-modal'])
</script>

<template>
  <div class="p-6">
    <div class="mb-6 flex items-center justify-between">
      <h4 class="text-xl font-semibold text-yami dark:text-white">Detail Surah</h4>
      <Icon
        name="heroicons:x-mark"
        class="cursor-pointer text-xl"
        @click="emits('close-modal')"
      />
    </div>
    <p
      class="whitespace-pre-wrap text-sm !leading-8 text-smoke-1 dark:text-smoke-2 md:text-base"
      v-html="description"
    />
  </div>
</template>
