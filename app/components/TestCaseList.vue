<script lang="ts" setup>
import { CircleX } from 'lucide-vue-next'
import type { Testcase } from '~/types/testcase'

const { testcases, removeTestcase, updateTestcase, editableTestcases } = useTestcase()
const { isValidExpression } = useExpression()

function handleUpdateTestString(value: string | number, testcase: Testcase) {
  updateTestcase(testcase.id, { ...testcase, input: String(value) })
}

function handleUpdateDescription(value: string | number, testcase: Testcase) {
  updateTestcase(testcase.id, { ...testcase, title: String(value) })
}

function handleChangeMode(testcase: Testcase) {
  updateTestcase(testcase.id, { ...testcase, mode: testcase.mode === 'view' ? 'edit' : 'view' })
}
</script>

<template>
  <UiAccordion v-model="editableTestcases" type="multiple" collapsible class="flex flex-col gap-2">
    <UiAccordionItem
      v-for="testcase in testcases"
      :key="testcase.id"
      :value="testcase.id"
      class="rounded border-0 border-l-4 bg-background px-2"
      :class="{
        'border-green-400': testcase.passed && isValidExpression,
        'border-red-400': !testcase.passed && isValidExpression,
        'border-blue-400': !isValidExpression,
      }"
    >
      <div class="flex items-center gap-2">
        <UiAccordionTrigger @click="handleChangeMode(testcase)" />
        <div class="flex-1">
          <span v-if="testcase.mode === 'view'">
            <template v-if="testcase.title">
              {{ testcase.title }}
            </template>
            <template v-else>
              given the string
              <span class="italic text-green-400">
                {{ testcase.input || 'empty string' }}
              </span>
              assert that regex does match
            </template>
          </span>
          <UiInput
            v-else
            class="rounded-none border-0 border-b focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="insert test description"
            :model-value="testcase.title"
            @update:model-value="handleUpdateDescription($event, testcase)"
          />
        </div>

        <UiButton variant="ghost" size="icon" @click="removeTestcase(testcase.id)">
          <CircleX />
        </UiButton>
      </div>
      <UiAccordionContent>
        <div class="ml-5 mt-2 flex flex-col gap-4">
          <p>
            given the following test string
          </p>
          <UiTextarea
            class="min-h-10 border focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="insert test string"
            :model-value="testcase.input"
            @update:model-value="handleUpdateTestString($event, testcase)"
          />
          <div>
            assert that regex pattern does match the test string
          </div>
          <UiSeparator />
          <span v-show="!testcase.passed" class="text-red-400">
            Expected regex to match, but did not.
          </span>
        </div>
      </UiAccordionContent>
    </UiAccordionItem>
  </UiAccordion>
</template>
