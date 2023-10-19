<template>
  <footer class="border-t border-gray-300/70 py-4 dark:border-gray-700">
    <div class="container flex flex-col items-center space-y-3 sm:space-y-5">
      <div class="flex items-center space-x-2">
        <p class="text-sm text-gray-600 dark:text-smoke-2">Made with</p>
        <Icon
          name="logos:nuxt-icon"
          class="text-xl"
        />
      </div>

      <div class="flex items-center space-x-3 divide-x divide-gray-300/70 dark:divide-gray-700">
        <div class="flex items-center space-x-3">
          <NuxtLink
            to="https://github.com/ionivetech"
            target="_blank"
          >
            <Icon
              name="mdi:github"
              class="text-2xl text-gray-600 dark:text-gray-300"
            />
          </NuxtLink>

          <NuxtLink
            to="https://www.linkedin.com/in/faridnugraha/"
            target="_blank"
          >
            <Icon
              name="mdi:linkedin"
              class="text-2xl text-gray-600 dark:text-gray-300"
            />
          </NuxtLink>
        </div>

        <p class="pl-3 text-sm text-gray-600 dark:text-smoke-2">©2023 All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>
