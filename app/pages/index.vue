<script setup lang="ts">
import { appName } from '~/constants'
import InputExpression from '~/components/InputExpression.vue'
import WorkspaceHeader from '~/components/WorkspaceHeader.vue'

useHead({
  title: appName,
})
</script>

<template>
  <div>
    <div class="relative w-full p-2 flex items-center justify-center gap-2 border-b border-blue-200/80 dark:border-blue-300/10 border-dashed bg-gradient-to-r from-transparent via-blue-100/40 to-transparent  dark:from-transparent dark:via-blue-600/10 dark:to-transparent text-sm text-accent-blue dark:text-blue-100 transition-colors fv-style">
      <InputExpression />
    </div>
    <div class="relative w-full p-2 flex items-center justify-center gap-2 border-b border-blue-200/80 dark:border-blue-300/10 border-dashed bg-gradient-to-r from-transparent via-blue-100/40 to-transparent  dark:from-transparent dark:via-blue-600/10 dark:to-transparent text-sm text-accent-blue dark:text-blue-100 transition-colors fv-style">
      <WorkspaceHeader />
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
