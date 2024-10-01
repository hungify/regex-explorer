<script lang="ts" setup>
import { SunIcon } from 'lucide-vue-next'

const isOpen = ref(false)

const { Meta_K, Ctrl_K } = useMagicKeys({
  passive: false,
  onEventFired(e) {
    if (e.key === 'k' && (e.metaKey || e.ctrlKey))
      e.preventDefault()
  },
})

watch([Meta_K, Ctrl_K], (v) => {
  if (v[0] || v[1])
    isOpen.value = true
})
</script>

<template>
  <header class="flex w-full max-w-full items-center border-b border-dashed border-blue-200 dark:border-blue-300/20">
    <div class="relative mx-3 flex w-full items-center border-x border-dashed border-blue-200 dark:border-blue-300/20 md:mx-12">
      <nav aria-label="Site's main navigation" data-orientation="horizontal" dir="ltr" class="flex w-full justify-between gap-4 px-4 py-2 md:mx-auto md:px-8">
        <div class="flex flex-none items-center gap-3">
          <NuxtLink class="rounded transition-transform hover:scale-105" href="/">
            <TheLogo />
          </NuxtLink>
        </div>

        <div class="flex gap-2">
          <div class="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div class="w-full flex-1 md:w-auto md:flex-none">
              <UiButton
                variant="outline"
                class="relative h-8 w-full justify-start rounded-lg bg-background text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64"
                @click="isOpen = true"
              >
                <span class="hidden lg:inline-flex">Quick References...</span>
                <span class="inline-flex lg:hidden">Quick...</span>
                <kbd class="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                  <span class="text-base">⌘</span>K
                </kbd>
              </UiButton>
            </div>
          </div>

          <UiButton
            class="size-9"
            aria-label="Toggle dark mode"
            variant="ghost"
            size="icon"
          >
            <component
              :is="SunIcon"
              class="size-5 text-foreground"
            />
          </UiButton>
        </div>
      </nav>
    </div>
  </header>
  <QuickReference v-model="isOpen" />
</template>
