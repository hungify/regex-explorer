<script setup lang="ts">
interface Props {
  modelValue: string[]
}

interface Emits {
  (event: 'update:modelValue', value: string[]): void
}

defineProps<Props>()
defineEmits<Emits>()
const flagOptions = [
  { value: 'g', label: 'Global search', name: 'global' },
  { value: 'i', label: 'Case-insensitive search', name: 'insensitive' },
  { value: 'm', label: 'Multi-line search', name: 'multiple' },
  { value: 's', label: 'Allows . to match newline characters', name: 'single' },
  { value: 'u', label: 'Unicode', name: 'unicode' },
]

const expressionFlags = defineModel('modelValue', {
  default: [] as string[], // TODO: Fix this type
})
</script>

<template>
  <UiCombobox
    v-model="expressionFlags"
    :options="flagOptions"
    :multiple="true"
  >
    <slot />
  </UiCombobox>
</template>
