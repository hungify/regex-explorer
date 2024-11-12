export type ExpressionFlags = 'g' | 'i' | 'm' | 's' | 'u' | 'empty'
export type ExpressionTokenBasic = '/-open' | '/-close' | '^' | '$' | '.' | '|' | '\\'

export type ExpressionTokens = ExpressionTokenBasic

export type PatternKeys = 'allTokens' | 'commonTokens' | 'generalTokens' | 'anchors' | 'metaSequences' | 'quantifiers' | 'groupConstructs' | 'characterClasses' |
  'flagsModifiers' | 'substitution'

export interface TokenEntry {
  label: string
  token: string
  explanation: string
}

export interface PatternEntry {
  key: string
  label: string
  icon: Component
  items: Array<TokenEntry>
}
export type PatternReferences = Record<PatternKeys, PatternEntry>
