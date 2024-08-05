<script lang="ts" setup>
import { Icon } from '@iconify/vue';

const search = defineModel<string>()

// Props
withDefaults(
  defineProps<{ hadithHistorySelected: string }>(),
  { hadithHistorySelected: '' },
)

const emits = defineEmits<{
  (e: 'change-hadith-history', value: string): void
}>()
</script>

<template>
  <div class="search-section-wrapper">
    <!-- Icon -->
    <Icon
      icon="fa6-solid:book-open"
      class="text-[70px] text-white sm:text-[95px]"
    />

    <!-- Search field -->
    <InputSearch
      v-model="search"
      placeholder="Cari nomor hadits"
    />

    <!-- List name of history -->
    <HadithHistoryList
      :selected="hadithHistorySelected"
      @change-hadith-history="emits('change-hadith-history', $event)"
    />
  </div>
</template>
