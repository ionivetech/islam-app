<script setup lang="ts">
import type { InputSize } from '@nuxt/ui/dist/runtime/types'

// Props
withDefaults(
  defineProps<{
    loading: boolean
    icon?: string
    loadingIcon?: string
    size?: InputSize
    placeholder?: string
  }>(),
  {
    loading: false,
    icon: '',
    loadingIcon: '',
    size: 'md',
    placeholder: '',
  },
)

// Variables
const modelValue = defineModel<string>('')
</script>

<template>
  <UInput
    v-model="modelValue"
    :icon="icon"
    :loading-icon="loadingIcon"
    :size="size"
    :placeholder="placeholder"
    :loading="loading"
    trailing
    :ui="{
      base: 'w-full',
      placeholder: 'placeholder-gray-500 dark:placeholder-gray-400',
      rounded: 'rounded-lg',
      color: {
        white: {
          outline:
            'bg-white dark:bg-background-dark focus:ring-primary-500 dark:focus:ring-primary-600',
        },
      },
    }"
  />
</template>
