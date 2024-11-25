<script setup lang="ts">
import type { AST } from '@eslint-community/regexpp'

interface Props {
  element: AST.Element
}

const props = defineProps<Props>()
</script>

<template>
  <div className="text-center pointer-events-none whitespace-nowrap leading-normal text-foreground [&>span]:align-middle">
    <span className="text-foreground/50">
      {{ props.element.raw }}
    </span>
  </div>
</template>
