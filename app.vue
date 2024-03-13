<script setup lang="ts">
// Store
const alQuranStore = useAlQuranStore()
</script>

<template>
  <div
    id="content"
    :class="{ 'pb-[140px]': alQuranStore.getPlayingAudio }"
  >
    <VitePwaManifest />
    <NuxtLoadingIndicator />

    <Header />

    <main class="min-h-screen pb-8">
      <NuxtPage />

      <LazyAudioPlayer />
    </main>

    <Footer />

    <PopupPwa />
  </div>
</template>
