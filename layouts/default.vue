<script setup lang="ts">
// Store
const alQuranStore = useAlQuranStore()
</script>

<template>
  <div>
    <Header />

    <div :class="alQuranStore.getPlayingAudio ? 'pb-28' : 'pb-8'">
      <slot />

      <AudioPlayer />
    </div>
  </div>
</template>
