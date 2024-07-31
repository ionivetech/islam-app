<script lang="ts" setup>
const showModal = defineModel<boolean>()

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
    <UModal
      v-model="showModal"
      :ui="{
        rounded: 'rounded-xl',
        background:
          'bg-background-light dark:bg-background-dark dark:border dark:border-slate-700/50',
        width: 'sm:max-w-[80vw] md:max-w-[70vw]',
        overlay: {
          background: 'bg-gray-200/50 dark:bg-background-dark/50 backdrop-blur',
        },
      }"
    >
      <div class="p-6">
        <div class="mb-6 flex items-center justify-between">
          <h4 class="text-xl font-semibold text-yami dark:text-white">
            Detail Surah
          </h4>
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
    </UModal>
  </ClientOnly>
</template>
