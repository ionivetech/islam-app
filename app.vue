<script setup lang="ts">
// Store
const alQuranStore = useAlQuranStore()
</script>

<template>
  <div id="content">
    <VitePwaManifest />
    <NuxtLoadingIndicator />

    <Header />

    <main
      :class="alQuranStore.getPlayingAudio ? 'md:pb-[160px] pb-[156px]' : 'pb-8'"
      class="min-h-[100vh]"
    >
      <NuxtPage />

      <LazyAudioPlayer />
    </main>

    <Footer />

    <PopupPwa />
  </div>
</template>
