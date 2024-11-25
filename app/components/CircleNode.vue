<script setup lang="ts">
import { GRAPH_DIMENSIONS } from '@/constants/graph'

const props = defineProps<{
  cx: number
  cy: number
}>()
</script>

<template>
  <circle
    :cx="props.cx"
    :cy="props.cy"
    :r="GRAPH_DIMENSIONS.ROOT_RADIUS"
    class="fill-transparent stroke-slate-100 stroke-[1.5]"
  />
</template>
