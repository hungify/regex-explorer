<script setup lang="ts">
import { createSwapy } from 'swapy'
import ExplanationExpression from './ExplanationExpression.vue'
import GraphExpression from './GraphExpression.vue'
import InputMatchString from './InputMatchString.vue'
import InputTestcases from './InputTestcases.vue'

const layouts = [
  {
    label: 'Test String',
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

onMounted(() => {
  if (container.value) {
    createSwapy(container.value)
  }
})
</script>

<template>
  <div ref="container" class="grid grid-cols-4 grid-rows-2 gap-4 w-full">
    <div v-for="item in layouts" :key="item.label" :class="item.class" :data-swapy-slot="item.swapySlot" class=" border-dashed border-[1px] rounded-lg h-full w-full">
      <div
        class="dark:bg-blue-600/10  rounded-lg h-full" :data-swapy-item="item.swapySlot"
      >
        <div class="flex flex-col w-full h-full">
          <div data-swapy-handle class="hover:cursor-grab p-2">
            <UiLabel :for="item.label">
              {{ item.label }}
            </UiLabel>
          </div>

          <UiSeparator />
          <Component :is="item.component" />
        </div>
      </div>
    </div>
  </div>
</template>
