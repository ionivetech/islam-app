<script lang="ts" setup>
import { Icon } from '@iconify/vue';

const search = defineModel<string>()
</script>

<template>
  <div class="search-section-wrapper">
    <!-- Icon -->
    <Icon
      icon="material-symbols:prayer-times-rounded"
      class="text-[80px] text-white sm:text-[95px]"
    />

    <!-- Search field -->
    <InputSearch
      v-model="search"
      placeholder="Cari Do'a"
    />
  </div>
</template>
