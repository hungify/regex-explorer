<script setup lang="ts">
import { appName } from '~/constants'

useHead({
  title: appName,
})
</script>

<template>
  <div class="flex h-full flex-col">
    <div class="sticky top-0 flex w-full items-center justify-center gap-2 border-b border-dashed border-blue-200/80 bg-gradient-to-r from-transparent via-blue-100/40 to-transparent p-2 text-sm transition-colors dark:border-blue-300/10 dark:from-transparent dark:via-blue-600/10 dark:to-transparent dark:text-blue-100">
      <ExpressionToolbar />
    </div>
    <div class="relative flex size-full items-stretch justify-center gap-2 border-b border-dashed border-blue-200/80 bg-gradient-to-r from-transparent via-blue-100/40  to-transparent p-2 text-sm transition-colors dark:border-blue-300/10 dark:from-transparent dark:via-blue-600/10 dark:to-transparent dark:text-blue-100">
      <ExpressionPlayground />
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
