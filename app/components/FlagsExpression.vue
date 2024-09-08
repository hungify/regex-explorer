<script setup lang="ts">
import Combobox from './ui/combobox/Combobox.vue'

defineProps<Props>()
defineEmits<Emits>()
const flagOptions = [
  { value: 'g', label: 'Global search', name: 'global' },
  { value: 'i', label: 'Case-insensitive search', name: 'insensitive' },
  { value: 'm', label: 'Multi-line search', name: 'multiple' },
  { value: 's', label: 'Allows . to match newline characters', name: 'single' },
  { value: 'u', label: 'Unicode', name: 'unicode' },
]
interface Props {
  modelValue: string[]
}

interface Emits {
  (event: 'update:modelValue', value: string[]): void
}

const expressionFlags = defineModel('modelValue', {
  default: [],
})
</script>

<template>
  <Combobox
    v-model="expressionFlags"
    :options="flagOptions"
    :multiple="true"
  >
    <slot />
  </Combobox>
</template>
