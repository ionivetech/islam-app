<script lang="ts" setup>
const search = defineModel<string>()

// Props
withDefaults(
  defineProps<{
    hadithHistorySelected: string
  }>(),
  {
    hadithHistorySelected: '',
  },
)

const emits = defineEmits<{
  (e: 'change-hadith-history', value: string): void
}>()
</script>

<template>
  <div class="search-section-wrapper">
    <!-- Icon -->
    <Icon
      name="fa6-solid:book-open"
      class="text-[70px] text-white sm:text-[95px]"
    />

    <!-- Search field -->
    <div class="relative w-full md:w-2/3 lg:w-3/4 xl:w-6/12">
      <input
        v-model="search"
        type="text"
        placeholder="Cari nomor hadits"
        class="input-search"
      />

      <div
        class="mdright-2 absolute inset-y-2/4 right-1 flex size-8 -translate-y-2/4 items-center justify-center rounded-full bg-teal-600 dark:bg-slate-700 md:size-9"
      >
        <Icon
          name="radix-icons:magnifying-glass"
          class="text-xl text-white"
        />
      </div>
    </div>

    <!-- List name of history -->
    <HadithHistoryList
      :selected="hadithHistorySelected"
      @change-hadith-history="emits('change-hadith-history', $event)"
    />
  </div>
</template>
