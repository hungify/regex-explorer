<script lang="ts" setup>
</script>

<template>
  <header class="sticky top-0 z-20 w-full max-w-full flex items-center border-b border-dashed border-blue-200 dark:border-blue-300/20">
    <div class="w-full relative mx-3 md:mx-12 flex border-l border-r border-dashed border-blue-200 dark:border-blue-300/20">
      <nav aria-label="Site's main navigation" data-orientation="horizontal" dir="ltr" class="relative z-[2] md:max-w-[1248px] md:mx-auto w-full py-3 px-4 md:px-6 flex justify-between gap-4 lg:gap-0">
        <div class="flex gap-3 items-center flex-none">
          <NuxtLink class="rounded hover:scale-105 transition-transform fv-style" href="/">
            <TheLogo />
          </nuxtlink>
        </div>
      </nav>
    </div>
  </header>
</template>
