<script setup lang="ts">
import { defaultKeymap, historyKeymap } from '@codemirror/commands'
import type { Extension } from '@codemirror/state'
import { highlightWhitespace, keymap } from '@codemirror/view'
import CodeMirror from 'vue-codemirror6'
import { highlightNewLine } from '~/lib/codemirror'

const input = ref('Your\ninitial\ndocument\ncontent')

const extensions: Extension = [
  highlightWhitespace(),
  highlightNewLine(),
  keymap.of([
    ...defaultKeymap,
    ...historyKeymap,
  ]),
]
</script>

<template>
  <div class="w-full gap-1.5 h-full p-2">
    <ClientOnly fallback-tag="span">
      <CodeMirror
        v-model="input" class="flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-full font-sans"
        placeholder="Insert your test string here"
        :extensions
        wrap
      />

      <template #fallback>
        <p class="dark:text-blue-100/50 transition-colors">
          Loading input...
        </p>
      </template>
    </ClientOnly>
  </div>
</template>

<style lang="css">
.vue-codemirror .cm-editor {
  width: 100%;
}

.vue-codemirror .cm-focused {
  outline: none;
}

.vue-codemirror .cm-content {
  caret-color: currentColor;
}

.vue-codemirror .cm-scroller {
  font-family: inherit;
}

.vue-codemirror .cm-newline {
  color: currentColor;
  pointer-events: none;
  opacity: 0.5;
}
</style>
