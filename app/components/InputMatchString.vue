<script setup lang="ts">
import { defaultKeymap, historyKeymap } from '@codemirror/commands'
import type { Extension } from '@codemirror/state'
import type { EditorView } from '@codemirror/view'
import { highlightWhitespace, keymap } from '@codemirror/view'
import CodeMirror from 'vue-codemirror6'
import { highlightNewLine } from '~/lib/extensions/new-line'
import { createSearchHighlighter } from '~/lib/extensions/search'

interface CMInstance {
  view: EditorView
}

const cmInstance = ref<CMInstance | null>(null)

const { pattern, isValidPattern, source } = useExpression()
const { searchMatches, highlightSearchRegex } = createSearchHighlighter()

watchEffect(() => {
  if (!cmInstance.value)
    return

  const inputPattern = isValidPattern.value ? pattern.value : ''
  searchMatches(cmInstance.value.view as EditorView, inputPattern)
})

const extensions: Extension[] = [
  highlightWhitespace(),
  highlightNewLine(),
  highlightSearchRegex,
  keymap.of([
    ...defaultKeymap,
    ...historyKeymap,
  ]),
]
</script>

<template>
  <div class="size-full gap-1.5 p-2">
    <ClientOnly fallback-tag="span">
      <CodeMirror
        ref="cmInstance"
        v-model="source"
        class="flex size-full min-h-20 rounded-md border border-input bg-background px-3 py-2 font-sans text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        placeholder="Insert your test string here"
        :extensions wrap spellcheck="false"
      />

      <template #fallback>
        <p class="transition-colors dark:text-blue-100/50">
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
  padding: 0;
}

.vue-codemirror .cm-scroller {
  font-family: inherit;
}

.vue-codemirror .cm-newline {
  color: currentColor;
  pointer-events: none;
  opacity: 0.5;
}
.vue-codemirror .cm-line {
  padding: 0;
}

.vue-codemirror .cm-search-highlight {
  background-color: #22c55e;
}
</style>
