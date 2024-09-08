<script setup lang="ts">
import { Copy, Flag } from 'lucide-vue-next'
import { Input } from './ui/input'
import FlagsExpression from './FlagsExpression.vue'
import RhombusMarker from './RhombusMarker.vue'
import { Button } from './ui/button'
import { Separator } from './ui/separator'
import { EXPRESSION_METADATA } from '~/constants/expression'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import type { ExpressionFlags, ExpressionTokens } from '~/types/expression'

const expressionFlags = ref([])

const hoveredToken = ref<ExpressionTokens>('/-open')
const hoveredFlag = ref<ExpressionFlags>('empty')

function handleHoverToken(key: ExpressionTokens) {
  hoveredToken.value = key
}

function handleHoverFlag(flag: ExpressionFlags) {
  hoveredFlag.value = flag
}
</script>

<template>
  <div class="flex w-full max-w-3xl items-center gap-2">
    <div class="flex items-center relative flex-grow w-full">
      <TooltipProvider :delay-duration="100">
        <Tooltip>
          <TooltipTrigger as="div">
            <span
              class="hover:text-green-400 absolute start-0 inset-y-0 flex items-center justify-center px-2 cursor-pointer"
              @mouseover.prevent="handleHoverToken('/-open')"
            >
              /
            </span>
          </TooltipTrigger>
          <TooltipContent :side-offset="24">
            <strong>{{ EXPRESSION_METADATA.tokens[hoveredToken].title }}</strong>
            <p>{{ EXPRESSION_METADATA.tokens[hoveredToken].desc }}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Input id="regex" placeholder="Insert your expression here" class="pl-8 pr-28 w-full focus-visible:ring-[0.1px] focus-visible:ring-green-600 focus-visible:ring-offset-2" />

      <div class="absolute end-0 inset-y-0 flex items-center justify-center gap-2">
        <TooltipProvider :delay-duration="100">
          <Tooltip>
            <TooltipTrigger as="div">
              <span
                class="hover:text-green-400 cursor-pointer px-2"
                @mouseover.prevent="handleHoverToken('/-close')"
              >
                /
              </span>
            </TooltipTrigger>
            <TooltipContent :side-offset="14">
              <strong>{{ EXPRESSION_METADATA.tokens[hoveredToken].title }}</strong>
              <p>{{ EXPRESSION_METADATA.tokens[hoveredToken].desc }}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Separator orientation="vertical" class="bg-green-400 h-2/3" />

        <FlagsExpression v-model="expressionFlags">
          <Button
            variant="ghost"
            size="xs"
            class="p-0 min-w-8 h-full hover:bg-blue-700/10 space-x-1.5"
          >
            <TooltipProvider :delay-duration="100">
              <Tooltip>
                <TooltipTrigger as="div">
                  <template v-if="expressionFlags.length > 0 ">
                    <Button
                      v-for="flag in expressionFlags"
                      :key="flag"
                      variant="link"
                      size="xs"
                      class="hover:text-green-400 p-1"
                      @mouseover.prevent="handleHoverFlag(flag)"
                    >
                      {{ flag }}
                    </Button>
                  </template>
                  <Button
                    v-else
                    variant="link"
                    size="icon"
                    class="hover:text-green-400"
                    @mouseover.prevent="handleHoverFlag('empty')"
                  >
                    <Flag class="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <TooltipContent>
                    <strong>{{ EXPRESSION_METADATA.flags[hoveredFlag].title }}</strong>
                    <p>{{ EXPRESSION_METADATA.flags[hoveredFlag].desc }}</p>
                  </TooltipContent>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Button>
        </FlagsExpression>
      </div>
    </div>

    <TooltipProvider :delay-duration="100">
      <Tooltip>
        <TooltipTrigger>
          <Button variant="outline" size="icon" class="hover:bg-blue-700/10 hover:text-green-400">
            <Copy class="w-4 h-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Copy to clipboard</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>

    <RhombusMarker position="left" />
    <RhombusMarker position="right" />
  </div>
</template>
