<script lang="ts" setup>
const search = defineModel<string>()
</script>

<template>
  <div class="search-section-wrapper">
    <!-- Icon -->
    <Icon
      name="material-symbols:prayer-times-rounded"
      class="text-[80px] text-white sm:text-[95px]"
    />

    <!-- Search field -->
    <div class="relative w-full md:w-2/3 lg:w-3/4 xl:w-6/12">
      <input
        v-model="search"
        type="text"
        placeholder="Cari Do'a"
        class="input-search"
      >

      <div
        class="absolute inset-y-2/4 right-2 flex size-8 -translate-y-2/4 items-center justify-center rounded-full bg-teal-600 dark:bg-slate-700 md:size-9"
      >
        <Icon
          name="radix-icons:magnifying-glass"
          class="text-xl text-white"
        />
      </div>
    </div>
  </div>
</template>
