<script lang="ts" setup>
// Props
withDefaults(
  defineProps<{
    description: string
  }>(),
  {
    description: '',
  },
)

// Emits
const emits = defineEmits<{
  (e: 'close-modal'): void
}>()
</script>

<template>
  <ClientOnly>
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
        class="whitespace-pre-wrap text-sm !leading-8 text-smoke-1 md:text-base dark:text-smoke-2"
        v-html="description"
      />
    </div>
  </ClientOnly>
</template>
