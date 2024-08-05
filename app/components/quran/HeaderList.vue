<script lang="ts" setup>

const search = defineModel<string>()
</script>

<template>
  <div class="search-section-wrapper">
    <!-- Icon -->
    <img
      src="/images/alquran.svg"
      alt="alquran-logo"
      class="w-22 h-auto md:w-24"
    >

    <!-- Search field -->
    <InputSearch
      v-model="search"
      placeholder="Cari Surah"
    />
  </div>
</template>
