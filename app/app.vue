<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core';

// Store
const alQuranStore = useAlQuranStore()

const isPhoneScreen = useMediaQuery('(max-width: 768px)')
</script>

<template>
  <div
    id="content"
    :class="{
      'pb-[64px]': !alQuranStore.getPlayingAudio && isPhoneScreen,
      'pb-[140px]': alQuranStore.getPlayingAudio && !isPhoneScreen,
      'pb-[204px]': alQuranStore.getPlayingAudio && isPhoneScreen,
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
