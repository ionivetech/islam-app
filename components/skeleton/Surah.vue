<script lang="ts" setup></script>
<template>
  <div class="grid grid-cols-quran-list gap-3 lg:grid-cols-quran-list-lg">
    <div
      v-for="i in 30"
      :key="i"
      class="h-[121px] w-full animate-pulse rounded-lg bg-gray-300 dark:bg-slate-700/30"
    />
  </div>
</template>
