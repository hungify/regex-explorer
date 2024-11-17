<script setup lang="ts">
import { Flag, Link, Sparkle, TriangleAlert } from 'lucide-vue-next'
import FlagsExpression from './FlagsExpression.vue'
import RhombusDecorator from './RhombusDecorator.vue'
import type { ExpressionFlags, ExpressionTokens } from '~/types/expression'
import { EXPRESSION_METADATA } from '~/constants/expression'

const hoveredToken = ref<ExpressionTokens>('/-open')
const hoveredFlag = ref<ExpressionFlags>('empty')
const { pattern, isValidPattern, flags, error } = useExpression()

function handlePasteExpression(event: ClipboardEvent) {
  event.preventDefault()
  const plainText = event.clipboardData?.getData('text/plain')
  if (plainText) {
    if (pattern.value.length === 0) {
      // remove '/' in start and end of the expression
      const strippedExpression = plainText.replace(/^\/|\/$/g, '')
      pattern.value = strippedExpression
    }
    else {
      pattern.value += plainText
    }
  }
}

function handleHoverToken(key: ExpressionTokens) {
  hoveredToken.value = key
}

function handleHoverFlag(flag: ExpressionFlags) {
  hoveredFlag.value = flag
}
</script>

<template>
  <div class="flex w-full max-w-3xl items-center gap-2">
    <RhombusDecorator
      :position="{
        topLeft: true,
        bottomLeft: true,
        topRight: true,
        bottomRight: true,
      }"
    >
      <div class="relative flex w-full grow items-center">
        <UiTooltipProvider :delay-duration="100">
          <UiTooltip>
            <UiTooltipTrigger as="div">
              <span
                class="absolute inset-y-0 start-0 flex cursor-pointer items-center justify-center px-2 hover:text-green-400"
                @mouseover.prevent="handleHoverToken('/-open')"
              >
                /
              </span>
            </UiTooltipTrigger>
            <UiTooltipContent>
              <strong>{{ EXPRESSION_METADATA.tokens[hoveredToken].title }}</strong>
              <p>{{ EXPRESSION_METADATA.tokens[hoveredToken].desc }}</p>
            </UiTooltipContent>
          </UiTooltip>
        </UiTooltipProvider>

        <UiInput
          id="regex"
          v-model="pattern"
          placeholder="Insert your expression here"
          class="w-full pl-8 pr-36 focus-visible:ring-[0.1px] focus-visible:ring-green-600 focus-visible:ring-offset-2"
          :class="{
            'border-red-400': !isValidPattern,
          }"
          @paste="handlePasteExpression"
        />

        <div class="absolute inset-y-0 end-0 flex items-center justify-center gap-2">
          <UiTooltipProvider :delay-duration="100">
            <UiTooltip>
              <UiTooltipTrigger as="div">
                <UiButton
                  variant="link"
                  size="icon"
                  class="hover:text-green-400 hover:no-underline"
                  @mouseover.prevent="handleHoverToken('/-close')"
                >
                  /
                </UiButton>
              </UiTooltipTrigger>
              <UiTooltipContent>
                <strong>{{ EXPRESSION_METADATA.tokens[hoveredToken].title }}</strong>
                <p>{{ EXPRESSION_METADATA.tokens[hoveredToken].desc }}</p>
              </UiTooltipContent>
            </UiTooltip>
          </UiTooltipProvider>

          <UiSeparator orientation="vertical" class="h-2/3 bg-green-400" />

          <div class="min-w-8 space-x-1.5 p-0">
            <UiTooltipProvider :delay-duration="100">
              <UiTooltip>
                <UiTooltipTrigger as="div">
                  <FlagsExpression v-model="flags">
                    <UiButton
                      v-for="flag in flags.length > 0 ? flags : ['empty']"
                      :key="flag"
                      variant="link"
                      :size="flag !== 'empty' ? 'sm' : 'icon'"
                      class="hover:text-green-400"
                      :class="{
                        'p-1': flag !== 'empty',
                        'w-full': flags.length === 1,
                      }"
                      @mouseover.prevent="handleHoverFlag(flag as ExpressionFlags)"
                    >
                      <template v-if="flag !== 'empty'">
                        {{ flag }}
                      </template>
                      <Flag v-else class="size-4" />
                    </UiButton>
                  </FlagsExpression>
                </UiTooltipTrigger>
                <UiTooltipContent>
                  <UiTooltipContent>
                    <strong>{{ EXPRESSION_METADATA.flags[hoveredFlag].title }}</strong>
                    <p>{{ EXPRESSION_METADATA.flags[hoveredFlag].desc }}</p>
                  </UiTooltipContent>
                </UiTooltipContent>
              </UiTooltip>
            </UiTooltipProvider>
          </div>

          <UiSeparator orientation="vertical" class="h-2/3 bg-green-400" />

          <UiTooltipProvider :delay-duration="100">
            <UiTooltip>
              <UiTooltipTrigger as="div">
                <UiButton
                  variant="link"
                  size="icon"
                  :class="{
                    'hover:text-green-400': isValidPattern,
                    'text-red-500': !isValidPattern,
                    'hover:text-red-300': !isValidPattern,
                  }"
                >
                  <Link v-if="isValidPattern" class="size-4" />
                  <TriangleAlert v-else class="size-4" />
                </UiButton>
              </UiTooltipTrigger>
              <UiTooltipContent>
                <p>
                  {{ isValidPattern ? 'Share your expression' : error }}
                </p>
              </UiTooltipContent>
            </UiTooltip>
          </UiTooltipProvider>
        </div>
      </div>

      <UiTooltipProvider :delay-duration="100">
        <UiTooltip>
          <UiTooltipTrigger as="div">
            <UiButton variant="outline" size="icon" class="hover:bg-blue-700/10 hover:text-green-400">
              <Sparkle class="size-4" />
            </UiButton>
          </UiTooltipTrigger>
          <UiTooltipContent>
            <p>Visualize your expression</p>
          </UiTooltipContent>
        </UiTooltip>
      </UiTooltipProvider>
    </RhombusDecorator>
  </div>
</template>
