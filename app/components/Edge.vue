<script setup lang="ts">
const props = defineProps<{
  start: [number, number]
  end: [number, number]
}>()

const path = computed(() => {
  const [x1, y1] = props.start
  const [x2, y2] = props.end
  return `M${x1},${y1}L${x2},${y2}`
})
</script>

<template>
  <path
    :d="path"
    class="stroke-slate-100 stroke-[1.5]"
  />
</template>
