import type { Testcase } from '~/types/testcase'

export function useTestcase() {
  const { expressionRegExp, hasGlobalFlag, expressionString } = useExpression()

  const testcases = useState<Testcase[]>('testcases', () => [])

  const addTestcase = () => {
    const uuid = window.crypto.randomUUID()

    const testcase = {
      id: uuid,
      title: '',
      input: '',
      mode: 'edit',
    } satisfies Testcase

    testcases.value.push(testcase)
  }

  const removeTestcase = (id: string) => {
    const index = testcases.value.findIndex(testcase => testcase.id === id)
    if (index !== -1) {
      testcases.value.splice(index, 1)
    }
  }

  const runTestcase = (id: string) => {
    const testcase = testcases.value.find(testcase => testcase.id === id)
    if (!testcase)
      return

    if (hasGlobalFlag.value) {
      const result = Array.from(testcase.input.matchAll(expressionRegExp.value))
      testcase.passed = result.length > 0
      return
    }

    const result = testcase.input.match(expressionRegExp.value)
    testcase.passed = result !== null
  }

  const updateTestcase = (id: string, testcase: Testcase) => {
    const index = testcases.value.findIndex(testcase => testcase.id === id)
    if (index !== -1) {
      testcases.value[index] = testcase
    }

    runTestcase(id)
  }

  const editableTestcases = computed(() => testcases.value.filter(testcase => testcase.mode === 'edit').map(testcase => testcase.id))

  const failedTestCases = computed(() => testcases.value.filter(testcase => !testcase.passed))

  watchDebounced(expressionString, () => {
    testcases.value.forEach((testcase) => {
      runTestcase(testcase.id)
    })
  }, { debounce: 500, maxWait: 1000 })

  return {
    testcases,
    addTestcase,
    removeTestcase,
    updateTestcase,
    editableTestcases,
    runTestcase,
    failedTestCases,
  }
}
