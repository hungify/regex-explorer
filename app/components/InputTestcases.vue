<script setup lang="ts">
const { testcases, addTestcase } = useTestcase()
</script>

<template>
  <div class="flex h-full flex-col justify-between p-2">
    <div class="flex-1">
      <TestCaseList v-if="testcases.length > 0" />
      <span v-else>There are no unit tests, add one to get started</span>
    </div>
    <div>
      <UiButton class="mt-2" variant="ghost" @click="addTestcase">
        Add Testcase
      </UiButton>
    </div>
  </div>
</template>
