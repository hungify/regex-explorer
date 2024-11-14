<script setup lang="ts">
import { createSwapy } from 'swapy'
import ExplanationExpression from './ExplanationExpression.vue'
import GraphExpression from './GraphExpression.vue'
import InputMatchString from './InputMatchString.vue'
import InputTestcases from './InputTestcases.vue'

const layouts = [
  {
    label: 'Match String',
    swapySlot: 'string',
    component: InputMatchString,
    class: 'col-start-1 col-end-3',
  },
  {
    label: 'Visual',
    swapySlot: 'visual',
    component: GraphExpression,
    class: 'col-start-3 col-end-5',
  },
  {
    label: 'Testcases',
    swapySlot: 'testcases',
    component: InputTestcases,
    class: 'col-start-1 col-end-3',
  },
  {
    label: 'Explanation',
    swapySlot: 'explanation',
    component: ExplanationExpression,
    class: 'col-start-3 col-end-5',
  },
] as const

const container = useTemplateRef<HTMLDivElement>('container')
const { matchers } = useExpression()
const { failedTestCases } = useTestcase()

onMounted(() => {
  if (container.value) {
    createSwapy(container.value)
  }
})
</script>

<template>
  <div ref="container" class="grid w-full grid-cols-4 grid-rows-2 gap-4">
    <div v-for="item in layouts" :key="item.swapySlot" :class="item.class" :data-swapy-slot="item.swapySlot" class=" size-full rounded-lg border border-dashed">
      <div
        class="h-full  rounded-lg dark:bg-blue-600/10" :data-swapy-item="item.swapySlot"
      >
        <div class="flex size-full flex-col">
          <div data-swapy-handle class="p-2 hover:cursor-grab">
            <UiLabel :for="item.swapySlot">
              {{ item.label }}
              <span
                v-if="item.swapySlot === 'string' && matchers"
                class="rounded-md bg-blue-600/10 px-2 py-1 text-xs opacity-55 dark:bg-blue-600/20"
              >
                {{ matchers.length }} matches
              </span>

              <template v-else-if="item.swapySlot === 'testcases'">
                <span v-if="failedTestCases.length > 0" class="rounded-md bg-red-600/10 px-2 py-1 text-xs text-red-500 opacity-55 dark:bg-red-600/20">
                  {{ failedTestCases.length }} test cases failed
                </span>
                <span v-else class="rounded-md bg-green-600/10 px-2 py-1 text-xs text-green-500 opacity-55 dark:bg-green-600/20">
                  All test cases passed
                </span>
              </template>
            </UiLabel>
          </div>

          <UiSeparator />
          <Component :is="item.component" />
        </div>
      </div>
    </div>
  </div>
</template>
