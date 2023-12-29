<script setup></script>

<template>
  <ClientOnly>
    <div
      v-if="$pwa?.offlineReady || $pwa?.needRefresh"
      class="fixed bottom-2.5 right-2.5 z-[100] max-w-[80%] rounded-lg border border-gray-300/70 bg-white p-4 shadow md:bottom-5 md:right-5 dark:border-gray-700 dark:bg-background-dark-soft"
      role="alert"
    >
      <div class="mb-2 text-sm text-yami md:text-base dark:text-slate-200">
        <span v-if="$pwa.offlineReady">App ready to work offline</span>
        <span v-else> New content available, click on reload button to update. </span>
      </div>

      <UButton
        v-if="$pwa.needRefresh"
        color="primary"
        label="Update"
        class="mr-2"
        @click="$pwa.updateServiceWorker()"
      />

      <UButton
        color="gray"
        label="Close"
        @click="$pwa.cancelPrompt()"
      />
    </div>

    <div
      v-if="$pwa?.showInstallPrompt && !$pwa?.offlineReady && !$pwa?.needRefresh"
      class="fixed bottom-2.5 right-2.5 z-[100] rounded-lg border border-gray-300/70 bg-white p-4 shadow md:bottom-5 md:right-5 dark:border-gray-700 dark:bg-background-dark-soft"
      role="alert"
    >
      <p class="mb-2 text-sm text-yami md:text-base dark:text-slate-200">
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
