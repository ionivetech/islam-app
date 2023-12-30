<script lang="ts" setup>
const modelValue = defineModel<string>()
</script>

<template>
  <div
    class="mb-10 mt-16 flex h-72 w-full flex-col items-center justify-center gap-y-8 bg-gradient-to-br from-teal-700 to-teal-500 p-4 md:h-80 dark:from-slate-800/50 dark:to-slate-700/50"
  >
    <img
      src="/images/alquran.svg"
      alt="alquran-logo"
      class="h-auto w-24"
    />

    <div class="relative w-full md:w-8/12 lg:w-6/12">
      <input
        v-model="modelValue"
        type="text"
        placeholder="Cari Surah"
        class="input-search"
      />

      <div
        class="absolute inset-y-2/4 right-2 flex h-8 w-8 -translate-y-2/4 items-center justify-center rounded-full bg-teal-600 md:h-9 md:w-9 dark:bg-slate-700"
      >
        <Icon
          name="radix-icons:magnifying-glass"
          class="text-xl text-white"
        />
      </div>
    </div>
  </div>
</template>
