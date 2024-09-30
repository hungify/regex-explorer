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
]

const container = useTemplateRef<HTMLDivElement>('container')
const { matchers } = useExpression()

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
            </UiLabel>
          </div>

          <UiSeparator />
          <Component :is="item.component" />
        </div>
      </div>
    </div>
  </div>
</template>
