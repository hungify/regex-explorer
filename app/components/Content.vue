<script setup lang="ts">
import type { SVGAttributes } from 'vue'

interface Props extends /* @vue-ignore */ SVGAttributes {
  x: number
  y: number
  width: number
  height: number
  rx: number
  ry: number
  fill: string
  class: string
}

const props = defineProps<Props>()
const forwarded = useForwardProps(props)
</script>

<template>
  {{ forwarded }}
  <g>
    <rect v-bind="forwarded" />
    <slot />
  </g>
</template>
