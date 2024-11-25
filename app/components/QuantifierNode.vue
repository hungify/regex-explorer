<script setup lang="ts">
import type { AST } from '@eslint-community/regexpp'
import { GRAPH_DIMENSIONS } from '~/constants/graph'
import { getQuantifierText } from '~/lib/graph'

interface Props {
  quantifier: AST.Quantifier
}

const props = defineProps<Props>()
const hasInfinity = computed(() => props.quantifier.max === Infinity)

const text = computed(() => getQuantifierText(props.quantifier))
</script>

<template>
  <div className="text-center pointer-events-none leading-normal text-foreground [&>span]:align-middle flex items-center justify-center whitespace-pre">
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      shapeRendering="geometricPrecision"
      viewBox="0 0 24 24"
      :height="GRAPH_DIMENSIONS.ICON_SIZE"
      :width="GRAPH_DIMENSIONS.ICON_SIZE"
    >
      <path d="M17 1l4 4-4 4" />
      <path
        d="M3 11V9a4 4 0 014-4h14M21 13v2a4 4 0 01-4 4H3"
        :strokeDasharray="quantifier.greedy ? '' : '4, 4'"
      />
      <path d="M7 23l-4-4 4-4" />
    </svg>
    <span>{{ text }}</span>
    <InfinityIcon v-if="hasInfinity" :size="GRAPH_DIMENSIONS.ICON_SIZE" />
  </div>
</template>
