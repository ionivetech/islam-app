<script setup></script>

<template>
  <ClientOnly>
    <div
      v-if="$pwa?.showInstallPrompt"
      class="fixed bottom-2.5 right-2.5 z-[100] rounded-lg border border-gray-300/70 bg-white p-4 shadow dark:border-gray-700 dark:bg-background-dark-soft md:bottom-5 md:right-5"
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
