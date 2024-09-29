import type { ExpressionFlags, ExpressionTokens } from '~/types/expression'

export const EXPRESSION_METADATA = {
  flags: {
    g: {
      title: 'Global',
      desc: 'Matches all occurrences of the pattern in a string.',
    },
    i: {
      title: 'Ignore Case',
      desc: 'Makes the pattern case-insensitive.',
    },
    m: {
      title: 'Multiline',
      desc: 'Makes the pattern match the beginning or end of each line.',
    },
    s: {
      title: 'Single Line',
      desc: 'Allows the dot `.` to match newline characters.',
    },
    u: {
      title: 'Unicode',
      desc: 'Enables support for Unicode properties.',
    },
    empty: {
      title: 'Set Regex Flags',
      desc: 'Expression flags change how the expression is interpreted.',
    },
  },
  tokens: {
    '/-open': {
      title: 'Open',
      desc: 'Indicates the start of a regular expression.',
    },
    '/-close': {
      title: 'Close',
      desc: ' Indicates the end of a regular expression and the start of expression flags.',
    },
    '^': {
      title: 'Start',
      desc: 'Indicates the start of a string.',
    },
    '$': {
      title: 'End',
      desc: 'Indicates the end of a string.',
    },
    '.': {
      title: 'Any',
      desc: 'Matches any single character except the newline character.',
    },
    '|': {
      title: 'Or',
      desc: 'Matches any one of the patterns separated by the `|` symbol.',
    },
    '\\': {
      title: 'Escape',
      desc: 'Escapes a special character.',
    },
  },
} satisfies {
  flags: Record<ExpressionFlags, { title: string, desc: string }>
  tokens: Record<ExpressionTokens, { title: string, desc: string }>
}

export const DEFAULT_TEST_STRING = 'This is a test document. \nIt contains words, numbers like 12345, and special symbols: !@#$. \nSome words are Capitalized, and some are not.\nHere are some dates: 2023-09-28, 2024-01-01.'
