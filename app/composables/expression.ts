import {
  RegExpValidator,
} from '@eslint-community/regexpp'

export function useExpression() {
  const patternRegex = useState<string>('expession', () => '([A-Z])\\w+')

  const isValidPattern = computed(() => {
    const validator = new RegExpValidator()
    try {
      validator.validatePattern(patternRegex.value)
      return true
    }
    // eslint-disable-next-line unused-imports/no-unused-vars
    catch (e) {
      return false
    }
  })

  return {
    patternRegex,
    isValidPattern,
  }
}
