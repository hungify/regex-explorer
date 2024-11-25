<script setup lang="ts">
import type { AST } from '@eslint-community/regexpp'
import { GRAPH_NODE, GRAPH_NODE_MARGIN_HORIZONTAL, GRAPH_PADDING_HORIZONTAL, GRAPH_PADDING_VERTICAL, GRAPH_ROOT_RADIUS, GRAPH_WITHOUT_ROOT_PADDING_HORIZONTAL, GRAPH_WITHOUT_ROOT_PADDING_VERTICAL } from '@/constants/graph'
import { lrd, measureNodes } from '~/lib/graph'
import type { NodeSize } from '~/types/graph'
import { measureSimpleNode } from '~/lib/measure'

const { ast } = useExpression()
const size = ref<[number, number]>([800, 600])
const currentSizeMap = reactive(new Map<AST.Node | AST.Pattern, NodeSize>())
const nextSizeMap = reactive(new Map<AST.Node | AST.Pattern, NodeSize>())

const paddingH = GRAPH_NODE.PADDING_HORIZONTAL

onMounted(() => {
  lrd(ast.value!, (node: AST.Node | AST.Pattern) => {
    switch (node.type) {
      // case 'Pattern': {
      //   const bodySize = measureNodes(node.body, nextSizeMap)
      //   nextSizeMap.set(node.body, { box: bodySize, content: bodySize })
      //   if (isPrimaryGraphRef.current) {
      //     const width
      //         = bodySize[0]
      //         + GRAPH_PADDING_HORIZONTAL * 2
      //         + GRAPH_ROOT_RADIUS * 4
      //         + GRAPH_NODE_MARGIN_HORIZONTAL * 2
      //     const height = bodySize[1] + GRAPH_PADDING_VERTICAL * 2
      //     setSize([width, height])
      //   }
      //   else {
      //     const width
      //         = bodySize[0] + GRAPH_WITHOUT_ROOT_PADDING_HORIZONTAL * 2
      //     const height = bodySize[1] + GRAPH_WITHOUT_ROOT_PADDING_VERTICAL * 2
      //     setSize([width, height])
      //   }
      //   break
      // }
      // case 'Group':
      // case 'lookAroundAssertion': {
      //   const { children } = node
      //   const childrenSize = currentSizeMap.has(children)
      //     ? currentSizeMap.get(children)!.box
      //     : measureNodes(children, nextSizeMap)
      //   nextSizeMap.set(children, {
      //     box: childrenSize,
      //     content: childrenSize,
      //   })
      //   const contentSize: [number, number] = [
      //     childrenSize[0] + GRAPH_NODE_MARGIN_HORIZONTAL * 2,
      //     childrenSize[1] + GRAPH_GROUP_NODE_PADDING_VERTICAL * 2,
      //   ]
      //   const boxSize = getBoxSize(node, contentSize)
      //   nextSizeMap.set(node, { box: boxSize, content: contentSize })
      //   break
      // }
      // case 'choice': {
      //   const branchesSize = measureBranches(
      //     node.branches,
      //     currentSizeMap,
      //     nextSizeMap,
      //   )
      //   nextSizeMap.set(node, { box: branchesSize, content: branchesSize })
      //   break
      // }
      case 'Character':
        const size = measureSimpleNode(node)
        nextSizeMap.set(node, size)
        break
      default: {
        break
      }
    }
  })
})
</script>

<template>
  <div class="p-2">
    {{ currentSizeMap.values() }}
    {{ nextSizeMap.values() }}
    <!-- <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      :width="size[0]"
      :height="size[1]"
      class="select-none rounded-lg border font-mono [&_div]:pointer-events-none"
    >
      <GraphLayout
        :x="paddingH"
        :width="size[0] - 2 * paddingH"
        :center-y="size[1] / 2"
      >
        <Nodes v-if="ast?.alternatives" :nodes="ast?.alternatives" />
      </GraphLayout>
    </svg> -->
  </div>
</template>
