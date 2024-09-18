<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const tabs = ['Documents', 'Both', 'Canvas']
const activeTab = ref('Documents')
</script>

<template>
  <div class="flex w-full justify-center items-center gap-2">
    <Tabs default-value="account">
      <TabsList v-model="activeTab">
        <TabsTrigger
          v-for="tab in tabs" :key="tab"
          :value="tab"
        >
          {{ tab }}
        </TabsTrigger>
      </TabsList>
      <!-- <TabsContent value="account">
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="password">
        Change your password here.
      </TabsContent> -->
    </Tabs>
  </div>
</template>
