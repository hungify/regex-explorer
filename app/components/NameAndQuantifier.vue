<script setup lang="ts">
import type { AST } from '@eslint-community/regexpp'
import { GRAPH_COMPUTED, GRAPH_DIMENSIONS, GRAPH_NODE } from '~/constants/graph'
import { getNameText, getQuantifier } from '~/lib/graph'

interface Props {
  x: number
  y: number
  node: AST.BranchNode
}

const props = defineProps<Props>()

const name = computed(() => getNameText(props.node))
const quantifier = computed(() => getQuantifier(props.node))
</script>

<template>
  <foreignObject
    v-if="name"
    :x="0"
    :y="0"
    :width="200"
    :height="GRAPH_COMPUTED.NAME_HEIGHT"
    :font-size="GRAPH_DIMENSIONS.NAME_TEXT_FONTSIZE"
  >
    <div className="text-center pointer-events-none whitespace-nowrap leading-normal text-foreground [&>span]:align-middle">
      {{ name }}
    </div>
  </foreignObject>

  <foreignObject
    v-if="quantifier"
    :x="0"
    :y="0"
    :width="200"
    :height="GRAPH_COMPUTED.QUANTIFIER_HEIGHT"
    :font-size="GRAPH_DIMENSIONS.QUANTIFIER_TEXT_FONTSIZE"
  >
    <QuantifierNode :quantifier="quantifier" />
  </foreignObject>
</template>
