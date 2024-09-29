<script setup lang="ts">
import TheHeader from '~/components/TheHeader.vue'
</script>

<template>
  <div class="flex flex-col h-full">
    <TheHeader />
    <main class="mx-3 md:mx-12 grow border-r border-l border-dashed border-blue-200 dark:border-blue-300/20">
      <slot />
    </main>
  </div>
</template>
