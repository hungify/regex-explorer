<script setup lang="ts">
import type { AST } from '@eslint-community/regexpp'
import { GRAPH_NODE } from '~/constants/graph'

interface Props {
  x: number
  y: number
  elements: AST.Element[]
}

const props = defineProps<Props>()
</script>

<template>
  <template v-for="(element, index) in props.elements" :key="element.raw">
    <NameAndQuantifier :node="element" />
    <Content
      :x="87.81640625"
      :y="66"
      :width="72"
      :height="28"
      :rx="GRAPH_NODE.BORDER_RADIUS"
      :ry="GRAPH_NODE.BORDER_RADIUS"
      fill="transparent"
      class="stroke-slate-100 stroke-[1.5]"
    >
      <foreignObject
        :x="10 + index * 20"
        :y="20"
        :width="100"
        :height="20"
        :font-size="GRAPH_NODE.FONT_SIZE"
      >
        <TextNode :element="element" />
      </foreignObject>
    </Content>
  </template>
</template>
