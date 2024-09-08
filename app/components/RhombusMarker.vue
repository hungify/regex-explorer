<script setup lang="ts">
interface Props {
  position: 'left' | 'right'
}

defineProps<Props>()
</script>

<template>
  <div
    class="absolute h-2 w-2 z-10 rounded-[1px] rotate-45 border border-blue-300 dark:border-blue-500/60 bg-white/80 dark:bg-black bottom-[-4.5px]"

    :class="{
      'left-[-4.5px]': position === 'left',
      'right-[-4.5px]': position === 'right',
    }"
  />
</template>
