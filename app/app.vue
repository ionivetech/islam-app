<script setup lang="ts">
// Store
const alQuranStore = useAlQuranStore()

const { width } = useWindowSize()
const isPhoneScreen = computed(() => width.value < 768)
</script>

<template>
  <div
    id="content"
    :class="{
      'pb-[64px]': !alQuranStore.getPlayingAudio && isPhoneScreen,
      'pb-[140px]': alQuranStore.getPlayingAudio && !isPhoneScreen,
      'pb-[190px]': alQuranStore.getPlayingAudio && isPhoneScreen,
    }"
  >
    <VitePwaManifest />
    <NuxtLoadingIndicator />

    <Header />

    <main class="min-h-screen pb-8 pt-16">
      <NuxtPage />

      <LazyAudioPlayer />
    </main>

    <Footer />
    <BottomNavigation v-if="isPhoneScreen" />

    <PopupPwa />
  </div>
</template>
