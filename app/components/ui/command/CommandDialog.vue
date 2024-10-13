<script setup lang="ts">
import { useForwardPropsEmits } from 'radix-vue'
import type { DialogRootEmits, DialogRootProps } from 'radix-vue'
import Command from './Command.vue'

interface Props extends DialogRootProps {
  contentClass?: string
}

const { contentClass, ...restProps } = defineProps<Props>()
const emits = defineEmits<DialogRootEmits>()

const forwarded = useForwardPropsEmits(restProps, emits)
</script>

<template>
  <UiDialog v-bind="forwarded">
    <UiDialogContent
      class="overflow-hidden p-0 shadow-lg"
      :class="contentClass"
    >
      <Command class="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:size-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:size-5">
        <slot />
      </Command>
    </UiDialogContent>
  </UiDialog>
</template>
