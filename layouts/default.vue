<script setup lang="ts">
// Store
const alQuranStore = useAlQuranStore()
</script>

<template>
  <div>
    <Header />

    <div :class="alQuranStore.getPlayingAudio ? 'md:pb-[160px] pb-[156px]' : 'pb-8'">
      <slot />

      <AudioPlayer />
    </div>
  </div>
</template>
