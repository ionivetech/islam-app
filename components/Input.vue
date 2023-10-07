<script setup lang="ts">
// Props
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  loading: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: String,
    default: '',
  },
  loadingIcon: {
    type: String,
    default: '',
  },
  size: {
    type: String,
    default: 'md',
  },
  placeholder: {
    type: String,
    default: '',
  },
})

// Emits
const emits = defineEmits(['update:modelValue', 'onchange-value'])

// Variables
const value = ref<string>(props.modelValue)

watch(
  () => props.modelValue,
  (val) => {
    value.value = val
  },
)

const onChangeInput = (e: string) => {
  emits('update:modelValue', e)
  emits('onchange-value', e)
}
</script>

<template>
  <UInput
    :model-value="value"
    :icon="icon"
    :loading-icon="loadingIcon"
    :size="size"
    :placeholder="placeholder"
    :loading="loading"
    :ui="{
      base: 'w-full',
      placeholder: 'placeholder-gray-500 dark:placeholder-gray-400',
      rounded: 'rounded-lg',
      color: { white: { outline: 'bg-white dark:bg-background-dark' } },
    }"
    @update:model-value="onChangeInput"
  />
</template>
