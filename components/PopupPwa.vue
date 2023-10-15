<script setup></script>

<template>
  <ClientOnly>
    <div
      v-if="$pwa?.offlineReady || $pwa?.needRefresh"
      class="fixed bottom-5 right-5 z-[100] rounded-lg border border-gray-300/70 bg-white p-4 shadow dark:border-gray-700 dark:bg-background-dark-soft"
      role="alert"
    >
      <div class="mb-2 text-sm text-yami dark:text-slate-200 md:text-base">
        <span v-if="$pwa.offlineReady"> App ready to work offline </span>
        <span v-else> New content available, click on reload button to update. </span>
      </div>

      <UButton
        v-if="$pwa.needRefresh"
        color="red"
        label="Reload"
        class="mr-2"
        @click="$pwa.updateServiceWorker()"
      />

      <UButton
        color="gray"
        label="Close"
        @click="$pwa.cancelPrompt()"
      />
    </div>

    v-if="$pwa?.showInstallPrompt && !$pwa?.offlineReady && !$pwa?.needRefresh"
    <div
      v-if="$pwa?.showInstallPrompt && !$pwa?.offlineReady && !$pwa?.needRefresh"
      class="fixed bottom-5 right-5 z-[100] rounded-lg border border-gray-300/70 bg-white p-4 shadow dark:border-gray-700 dark:bg-background-dark-soft"
      role="alert"
    >
      <p class="mb-2 text-sm text-yami dark:text-slate-200 md:text-base">
        Install Application to Home screen
      </p>

      <UButton
        color="primary"
        label="Install"
        class="mr-2"
        @click="$pwa.install()"
      />
      <UButton
        color="gray"
        label="Cancel"
        @click="$pwa.cancelInstall()"
      />
    </div>
  </ClientOnly>
</template>
