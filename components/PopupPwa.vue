<script setup></script>

<template>
  <ClientOnly>
    <div
      v-if="$pwa?.needRefresh"
      class="fixed bottom-5 right-5 z-[100] rounded-lg border border-gray-300/70 bg-white p-4 shadow dark:border-gray-700 dark:bg-background-dark-soft"
      role="alert"
    >
      <p class="mb-2 text-sm text-yami dark:text-slate-200 md:text-base">
        New content available, click on reload button to update.
      </p>

      <UButton
        color="red"
        label="Reload"
        @click="$pwa.updateServiceWorker()"
      />
    </div>

    <div
      v-if="$pwa?.showInstallPrompt && !$pwa?.needRefresh"
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
