<script setup lang="ts">
import { defaultKeymap, historyKeymap } from '@codemirror/commands'
import type { Extension } from '@codemirror/state'
import type { EditorView } from '@codemirror/view'
import { highlightWhitespace, keymap } from '@codemirror/view'
import CodeMirror from 'vue-codemirror6'
import { DEFAULT_TEST_STRING } from '~/constants/expression'
import { highlightNewLine } from '~/lib/extensions/new-line'
import { createSearchHighlighter } from '~/lib/extensions/search'

interface CMInstance {
  view: EditorView
}

const input = ref(DEFAULT_TEST_STRING)
const cmInstance = ref<CMInstance | null>(null)

const { patternRegex, isValidPattern } = useExpression()
const { searchMatches, highlightSearchRegex } = createSearchHighlighter()

watchEffect(() => {
  if (!cmInstance.value)
    return

  const pattern = isValidPattern.value ? patternRegex.value : ''
  searchMatches(cmInstance.value.view as EditorView, pattern)
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
  <div class="w-full gap-1.5 h-full p-2">
    <ClientOnly fallback-tag="span">
      <CodeMirror
        ref="cmInstance"
        v-model="input" class="flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-full font-sans"
        placeholder="Insert your test string here"
        :extensions
        wrap
        spellcheck="false"
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
