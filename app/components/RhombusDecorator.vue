<script lang="ts" setup>
type VerticalPosition = 'top' | 'bottom'
type HorizontalPosition = 'left' | 'right'

type Position = `${VerticalPosition}${Capitalize<HorizontalPosition>}`

interface Props {
  position: Record<Position, boolean>
}

const { position } = defineProps<Props>()

const positionList = computed(() => {
  return Object.keys(position).filter(pos => position[pos as Position]) as Position[]
})
</script>

<template>
  <div
    v-for="pos in positionList"
    :key="pos"
    class="absolute h-2 w-2 z-10 rounded-[1px] rotate-45 border border-blue-300 dark:border-blue-500/60 bg-white/80 dark:bg-black"
    :class="{
      'top-[-4.5px] left-[-4.5px]': pos === 'topLeft',
      'top-[-4.5px] right-[-4.5px]': pos === 'topRight',
      'bottom-[-4.5px] left-[-4.5px]': pos === 'bottomLeft',
      'bottom-[-4.5px] right-[-4.5px]': pos === 'bottomRight',

    }"
  />
  <slot />
</template>
