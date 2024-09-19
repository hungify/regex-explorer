<script setup lang="ts" T extends generic="T extends OptionProps, M extends boolean">
import { Check } from 'lucide-vue-next'
import { cn } from '~/lib/utils'

export interface OptionProps {
  value: string
  label: string
}

interface Props {
  multiple?: M
  modelValue: M extends true ? T[] : T
  options: T[]
  emptyText?: string
  showSearch?: boolean
  searchPlaceholder?: string
}

interface Emit {
  (event: 'update:modelValue', value: T | T[]): void
}

const { multiple } = defineProps<Props>()

defineEmits<Emit>()

const selected = defineModel<string | string[]>('modelValue')

const isOpen = ref(false)

function isSelected(option: T) {
  if (selected.value !== undefined) {
    if (multiple) {
      return selected.value.includes(option.value)
    }
    return selected.value === option.value
  }
}

function handleSelect(option: T) {
  if (multiple && Array.isArray(selected.value)) {
    if (selected.value === undefined) {
      selected.value = [option.value]
    }

    else {
      if (selected.value.includes(option.value)) {
        selected.value = selected.value.filter(v => v !== option.value)
      }
      else {
        selected.value = [...selected.value, option.value]
      }
    }
  }
  else {
    selected.value = option.value
  }
}
</script>

<template>
  <UiPopover v-model:open="isOpen">
    <UiPopoverTrigger as-child class="cursor-pointer">
      <slot />
    </UiPopoverTrigger>
    <UiPopoverContent class="w-[200px] p-0">
      <UiCommand>
        <UiCommandInput v-if="showSearch" class="h-8" :placeholder="searchPlaceholder" />
        <UiCommandEmpty>{{ emptyText }}</UiCommandEmpty>
        <UiCommandList>
          <UiCommandGroup>
            <UiCommandItem
              v-for="option in options"
              :key="option.value"
              :value="option.value"
              @select="handleSelect(option)"
            >
              {{ option.value }}
              <Check
                :class="cn(
                  'ml-auto h-4 w-4',
                  isSelected(option) ? 'opacity-100' : 'opacity-0',
                )"
              />
            </UiCommandItem>
          </UiCommandGroup>
        </UiCommandList>
      </UiCommand>
    </UiPopoverContent>
  </UiPopover>
</template>
