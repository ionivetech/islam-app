<script lang="ts" setup>
// Props
defineProps({
  tafsir: {
    type: String,
    default: '',
  },
})

// Emits
const emits = defineEmits(['close-modal'])
</script>

<template>
  <ClientOnly>
    <div class="py-6">
      <div class="mb-6 flex items-center justify-between px-6">
        <h4 class="text-xl font-semibold text-yami dark:text-white">Tafsir</h4>
        <Icon
          name="heroicons:x-mark"
          class="cursor-pointer text-xl"
          @click="emits('close-modal')"
        />
      </div>

      <div class="max-h-[60vh] overflow-y-auto px-6">
        <p
          class="whitespace-pre-wrap text-sm !leading-8 text-smoke-1 md:text-base dark:text-smoke-2"
        >
          {{ tafsir }}
        </p>
      </div>
    </div>
  </ClientOnly>
</template>
