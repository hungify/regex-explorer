<script setup lang="ts">
import { appName } from '~/constants'

useHead({
  title: appName,
})
</script>

<template>
  <div class="h-full flex flex-col">
    <div class="w-full p-2 flex items-center justify-center gap-2 border-b border-blue-200/80 dark:border-blue-300/10 border-dashed bg-gradient-to-r from-transparent via-blue-100/40 to-transparent  dark:from-transparent dark:via-blue-600/10 dark:to-transparent text-sm text-accent-blue dark:text-blue-100 transition-colors fv-style sticky top-0">
      <InputExpression />
    </div>
    <div class="relative w-full p-2 flex justify-center gap-2 border-b border-blue-200/80 dark:border-blue-300/10 border-dashed bg-gradient-to-r from-transparent via-blue-100/40 to-transparent  dark:from-transparent dark:via-blue-600/10 dark:to-transparent text-sm text-accent-blue dark:text-blue-100 transition-colors fv-style items-stretch h-full">
      <PlaygroundExpression />
    </div>
  </div>
</template>

<style>
html,
body,
#__nuxt {
  height: 100vh;
  margin: 0;
  padding: 0;
}

html.dark {
  background: #222;
  color: white;
}
</style>
