<script lang="ts" setup></script>

<template>
  <div class="mb-4 space-y-4">
    <div
      v-for="i in 10"
      :key="i"
      class="h-60 w-full animate-pulse rounded-lg bg-gray-200 dark:bg-zinc-700/30"
    />
  </div>
</template>
