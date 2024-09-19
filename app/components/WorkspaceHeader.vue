<script setup lang="ts">
const tabs = ['Documents', 'Both', 'Canvas']
const activeTab = ref('Documents')
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
      <!-- <TabsContent value="account">
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="password">
        Change your password here.
      </TabsContent> -->
    </UiTabs>
  </div>
</template>
