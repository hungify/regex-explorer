<script setup lang="ts">
import { Flag, Link, Sparkle } from 'lucide-vue-next'
import FlagsExpression from './FlagsExpression.vue'
import RhombusDecorator from './RhombusDecorator.vue'
import type { ExpressionFlags, ExpressionTokens } from '~/types/expression'
import { EXPRESSION_METADATA } from '~/constants/expression'

const expressionFlags = ref([])

const hoveredToken = ref<ExpressionTokens>('/-open')
const hoveredFlag = ref<ExpressionFlags>('empty')
const regexPattern = ref('')

function handlePasteExpression(event: ClipboardEvent) {
  event.preventDefault()
  const plainText = event.clipboardData?.getData('text/plain')
  if (plainText) {
    if (regexPattern.value.length === 0) {
      // remove '/' in start and end of the expression
      const strippedExpression = plainText.replace(/^\/|\/$/g, '')
      regexPattern.value = strippedExpression
    }
    else {
      regexPattern.value += plainText
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
      <div class="flex items-center relative flex-grow w-full">
        <UiTooltipProvider :delay-duration="100">
          <UiTooltip>
            <UiTooltipTrigger as="div">
              <span
                class="hover:text-green-400 absolute start-0 inset-y-0 flex items-center justify-center px-2 cursor-pointer"
                @mouseover.prevent="handleHoverToken('/-open')"
              >
                /
              </span>
            </UiTooltipTrigger>
            <UiTooltipContent :side-offset="24">
              <strong>{{ EXPRESSION_METADATA.tokens[hoveredToken].title }}</strong>
              <p>{{ EXPRESSION_METADATA.tokens[hoveredToken].desc }}</p>
            </UiTooltipContent>
          </UiTooltip>
        </UiTooltipProvider>

        <UiInput
          id="regex"
          v-model="regexPattern"
          placeholder="Insert your expression here"
          class="pl-8 pr-36 w-full focus-visible:ring-[0.1px] focus-visible:ring-green-600 focus-visible:ring-offset-2"
          @paste="handlePasteExpression"
        />

        <div class="absolute end-0 inset-y-0 flex items-center justify-center gap-2">
          <UiTooltipProvider :delay-duration="100">
            <UiTooltip>
              <UiTooltipTrigger as="div">
                <span
                  class="hover:text-green-400 cursor-pointer px-2"
                  @mouseover.prevent="handleHoverToken('/-close')"
                >
                  /
                </span>
              </UiTooltipTrigger>
              <UiTooltipContent :side-offset="14">
                <strong>{{ EXPRESSION_METADATA.tokens[hoveredToken].title }}</strong>
                <p>{{ EXPRESSION_METADATA.tokens[hoveredToken].desc }}</p>
              </UiTooltipContent>
            </UiTooltip>
          </UiTooltipProvider>

          <UiSeparator orientation="vertical" class="bg-green-400 h-2/3" />

          <FlagsExpression v-model="expressionFlags">
            <UiButton
              variant="ghost"
              size="xs"
              class="p-0 min-w-8 h-full hover:bg-blue-700/10 space-x-1.5"
            >
              <UiTooltipProvider :delay-duration="100">
                <UiTooltip>
                  <UiTooltipTrigger as="div">
                    <template v-if="expressionFlags.length > 0 ">
                      <UiButton
                        v-for="flag in expressionFlags"
                        :key="flag"
                        variant="link"
                        size="xs"
                        class="hover:text-green-400 p-1"
                        @mouseover.prevent="handleHoverFlag(flag)"
                      >
                        {{ flag }}
                      </UiButton>
                    </template>
                    <UiButton
                      v-else
                      variant="link"
                      size="icon"
                      class="hover:text-green-400"
                      @mouseover.prevent="handleHoverFlag('empty')"
                    >
                      <Flag class="w-4 h-4" />
                    </UIButton>
                  </UiTooltipTrigger>
                  <UiTooltipContent>
                    <UiTooltipContent>
                      <strong>{{ EXPRESSION_METADATA.flags[hoveredFlag].title }}</strong>
                      <p>{{ EXPRESSION_METADATA.flags[hoveredFlag].desc }}</p>
                    </UiTooltipContent>
                  </UiTooltipContent>
                </UiTooltip>
              </UiTooltipProvider>
            </UiButton>
          </FlagsExpression>

          <UiSeparator orientation="vertical" class="bg-green-400 h-2/3" />

          <UiTooltipProvider :delay-duration="100">
            <UiTooltip>
              <UiTooltipTrigger as="div">
                <UiButton
                  variant="link"
                  size="icon"
                  class="hover:text-green-400"
                  @mouseover.prevent="handleHoverFlag('empty')"
                >
                  <Link class="w-4 h-4" />
                </UiButton>
              </UiTooltipTrigger>
              <UiTooltipContent :side-offset="14">
                <p>Share your expression</p>
              </UiTooltipContent>
            </UiTooltip>
          </UiTooltipProvider>
        </div>
      </div>

      <UiTooltipProvider :delay-duration="100">
        <UiTooltip>
          <UiTooltipTrigger>
            <UiButton variant="outline" size="icon" class="hover:bg-blue-700/10 hover:text-green-400">
              <Sparkle class="w-4 h-4" />
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
