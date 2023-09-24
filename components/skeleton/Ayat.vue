<script setup lang="ts"></script>

<template>
  <div
    v-for="i in 20"
    :key="i"
    class="flex flex-col gap-3 border-b border-gray-200 py-7 last:border-b-0 last:pb-0"
  >
    <div
      class="mb-3 h-12 w-3/4 animate-pulse self-end rounded-lg bg-gray-200 dark:bg-zinc-700/30"
    />

    <div class="h-5 w-4/5 animate-pulse rounded-lg bg-gray-200 dark:bg-zinc-700/30" />

    <div class="h-5 w-4/5 animate-pulse rounded-lg bg-gray-200 dark:bg-zinc-700/30" />
  </div>
</template>
