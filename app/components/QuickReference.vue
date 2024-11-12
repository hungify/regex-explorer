<script setup lang="ts">
import { Check, Sparkles, X } from 'lucide-vue-next'
import { PATTERN_REFERENCES } from '~/constants/references'
import type { PatternKeys } from '~/types/expression'

interface props {
  modelValue: boolean
}
interface Emits {
  (event: 'update:modelValue', value: boolean): void
}

defineProps<props>()
defineEmits<Emits>()

const open = defineModel('modelValue', { type: Boolean })
const referenceIndex = ref<PatternKeys>('allTokens')
const tokenIndex = ref<number | null>(null)

const activeReference = computed(() => {
  return referenceIndex.value !== null ? PATTERN_REFERENCES[referenceIndex.value] : null
})

const activeToken = computed(() => {
  return tokenIndex.value !== null ? activeReference.value?.items[tokenIndex.value] : null
})
</script>

<template>
  <UiCommandDialog
    v-model:open="open"
    content-class="mx-auto max-w-2xl"
  >
    <UiDialogTitle class="hidden">
      Quick Reference
    </UiDialogTitle>
    <UiCommandInput placeholder="Type a UiCommand or search..." />
    <UiCommandList class="max-h-max">
      <UiCommandEmpty>No results found.</UiCommandEmpty>
      <UiCommandSeparator class="h-px" />
      <UiCommandGroup>
        <div class="flex transform-gpu">
          <div class="min-w-56 pr-1">
            <UiCommandItem
              v-for="(item, key, index) in PATTERN_REFERENCES"
              :key="index"
              :value="item.label"
              class="flex justify-between"
              @mouseenter="referenceIndex = key; tokenIndex = null"
            >
              <div class="flex shrink-0 items-center">
                <component :is="item.icon" class="mr-2 size-4" />
                <span>{{ item.label }}</span>
              </div>
              <Check v-if="referenceIndex === key" class="size-4 stroke-green-500" />
            </UiCommandItem>
          </div>
          <UiSeparator orientation="vertical" class="flex h-96 w-px" />
          <div class="max-h-96 flex-auto overflow-y-auto">
            <div v-if="tokenIndex && activeToken" class="py-0">
              <div
                class="flex justify-between px-3 py-2"
              >
                <h6 class="text-base font-normal">
                  {{ activeToken.label }}
                </h6>

                <UiTooltipProvider :delay-duration="100">
                  <UiTooltip>
                    <UiTooltipTrigger as="div">
                      <UiButton
                        variant="link"
                        size="icon"
                        class="size-4"
                        @click="tokenIndex = null"
                      >
                        <X />
                      </UiButton>
                    </UiTooltipTrigger>
                    <UiTooltipContent>
                      <p>Close details</p>
                    </UiTooltipContent>
                  </UiTooltip>
                </UiTooltipProvider>
              </div>
              <UiSeparator class="flex h-px w-full" />
              <div
                class="flex flex-col gap-2 p-2"
              >
                <p class="text-sm">
                  {{ activeToken.explanation }}
                </p>
                <div class="flex items-center rounded-sm border bg-background px-3 py-2 text-sm transition-colors dark:bg-blue-600/10">
                  <div class="flex flex-1 flex-col gap-1">
                    <p>
                      {{ activeToken.token }}
                    </p>
                  </div>
                  <UiTooltipProvider :delay-duration="100">
                    <UiTooltip>
                      <UiTooltipTrigger as="div">
                        <UiButton
                          variant="ghost"
                          size="icon"
                          class="rounded-full"
                          @click="tokenIndex = null"
                        >
                          <Sparkles class="size-4" />
                        </UiButton>
                      </UiTooltipTrigger>
                      <UiTooltipContent>
                        <p>Load example in editor</p>
                      </UiTooltipContent>
                    </UiTooltip>
                  </UiTooltipProvider>
                </div>
              </div>
            </div>

            <UiCommandGroup v-else class="py-0">
              <UiCommandItem
                v-for="(item, index) in activeReference?.items"
                :key="index"
                class="flex justify-between"
                :value="item.token"
                @click="tokenIndex = index"
              >
                <h5 class="font-medium">
                  {{ item.label }}
                </h5>
                <p class="text-sm text-muted-foreground">
                  {{ item.token }}
                </p>
              </UiCommandItem>
            </UiCommandGroup>
          </div>
        </div>
      </UiCommandGroup>
    </UiCommandList>
  </UiCommandDialog>
</template>
