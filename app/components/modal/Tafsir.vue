<script lang="ts" setup>
import { Icon } from '@iconify/vue';

const showModal = defineModel<boolean>()

// Props
withDefaults(
  defineProps<{
    tafsir: string
  }>(),
  {
    tafsir: '',
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
      prevent-close
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
      <div class="py-6">
        <div class="mb-6 flex items-center justify-between px-6">
          <h4 class="text-xl font-semibold text-yami dark:text-white">
            Tafsir
          </h4>
          <Icon
            icon="heroicons:x-mark"
            class="cursor-pointer text-xl"
            @click="emits('close-modal')"
          />
        </div>

        <div class="max-h-[60vh] overflow-y-auto px-6">
          <p
            class="whitespace-pre-wrap text-sm !leading-8 text-smoke-1 dark:text-smoke-2 md:text-base"
          >
            {{ tafsir }}
          </p>
        </div>
      </div>
    </UModal>
  </ClientOnly>
</template>
