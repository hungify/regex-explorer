<script  lang="ts" setup>
import { defineProps } from 'vue'
import { GRAPH_DIMENSIONS, GRAPH_LAYOUT } from '@/constants/graph'

const props = defineProps<{
  x: number
  width: number
  centerY: number
}>()

const radius = GRAPH_DIMENSIONS.ROOT_RADIUS
const nodeMargin = GRAPH_LAYOUT.NODE_MARGIN_HORIZONTAL
</script>

<template>
  <CircleNode :cx="props.x + radius" :cy="props.centerY" />

  <Edge
    :start="[props.x + radius * 2, props.centerY]"
    :end="[props.x + radius * 2 + nodeMargin, props.centerY]"
  />

  <slot />

  <Edge
    :start="[
      props.x + width - 2 * radius - nodeMargin,
      props.centerY,
    ]"
    :end="[props.x + width - 2 * radius, props.centerY]"
  />

  <CircleNode :cx="props.x + width - radius" :cy="props.centerY" />
</template>
