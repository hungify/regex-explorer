<script setup lang="ts">
import type { AST } from '@eslint-community/regexpp'

interface Props {
  x: number
  y: number
  nodes: AST.Node[]
  id: string
}

const props = defineProps<Props>()
</script>

<template>
  <template v-for="node in nodes" :key="node.raw">
    <GraphElements v-if="node.type === 'Alternative'" :elements="node.elements" />
    <span v-else>
      Node: {{ node.raw }}
    </span>
  </template>
</template>
