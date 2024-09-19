<script setup lang="ts">
const tabs = ['Text', 'Testcases']
const activeTab = ref('Text')
</script>

<template>
  <div class="flex w-full justify-center items-center gap-2">
    <UiTabs default-value="account">
      <UiTabsList v-model="activeTab">
        <UiTabsTrigger
          v-for="tab in tabs" :key="tab"
          :value="tab"
        >
          {{ tab }}
        </UiTabsTrigger>
      </UiTabsList>
      <UiTabsContent value="account">
        Make changes to your account here.
      </UiTabsContent>
      <UiTabsContent value="password">
        Change your password here.
      </UiTabsContent>
    </UiTabs>
  </div>
</template>
