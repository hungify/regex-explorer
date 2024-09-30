import {
  RegExpParser,
  RegExpValidator,
} from '@eslint-community/regexpp'
import { DEFAULT_PATTERN, DEFAULT_TEST_STRING } from '~/constants/expression'

const validator = new RegExpValidator()

export function useExpression() {
  const flags = useState<string[]>('flags', () => ['g'])
  const pattern = useState<string>('expession', () => DEFAULT_PATTERN)
  const source = useState<string>('source', () => DEFAULT_TEST_STRING)

  const hasGlobalFlag = computed(() => flags.value.includes('g'))

  const expressionRegExp = computed(() => {
    return new RegExp(pattern.value, flags.value.join(''))
  })

  const expressionString = computed(() => {
    return `/${pattern.value}/${flags.value.join('')}`
  })

  const isValidExpression = computed(() => {
    try {
      validator.validateLiteral(expressionString.value)
      return true
    }
    // eslint-disable-next-line unused-imports/no-unused-vars
    catch (e) {
      return false
    }
  })

  const isValidPattern = computed(() => {
    try {
      validator.validatePattern(pattern.value)
      return true
    }
    // eslint-disable-next-line unused-imports/no-unused-vars
    catch (e) {
      return false
    }
  })

  const matchers = computed(() => {
    if (!isValidExpression.value)
      return []

    if (hasGlobalFlag.value) {
      return Array.from(source.value.matchAll(expressionRegExp.value))
    }
    return source.value.match(expressionRegExp.value)
  })

  const ast = computed(() => {
    if (!isValidExpression.value) {
      return null
    }

    const parser = new RegExpParser()
    return parser.parsePattern(pattern.value)
  })

  return {
    pattern,
    source,
    isValidPattern,
    isValidExpression,
    ast,
    flags,
    matchers,
    expressionString,
    hasGlobalFlag,
    expressionRegExp,
  }
}
