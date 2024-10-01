/* eslint-disable no-template-curly-in-string */
import { Anchor, Brackets, BrickWall, Flag, Layers, Parentheses, Repeat1, Scissors, Star, Target } from 'lucide-vue-next'
import type { PatternReferences } from '~/types/expression'

const patternReferenceCollection: Omit<PatternReferences, 'allTokens'> = {
  commonTokens: {
    key: 'commonTokens',
    label: 'Common Tokens',
    icon: Star,
    items: [
      {
        label: 'A single character of: a, b or c',
        token: '[abc]',
        explanation: 'Matches a single character that is either a, b, or c.',
      },
      {
        label: 'A character except: a, b or c',
        token: '[^abc]',
        explanation: 'Matches any character except a, b, or c.',
      },
      {
        label: 'A character in the range: a-z',
        token: '[a-z]',
        explanation: 'Matches any lowercase letter from a to z.',
      },
      {
        label: 'A character not in the range: a-z',
        token: '[^a-z]',
        explanation: 'Matches any character that is not a lowercase letter from a to z.',
      },
      {
        label: 'A character in the range: a-z or A-Z',
        token: '[a-zA-Z]',
        explanation: 'Matches any letter, regardless of case.',
      },
      {
        label: 'Any single character',
        token: '.',
        explanation: 'Matches any character except a newline.',
      },
      {
        label: 'Alternate - match either a or b',
        token: 'a|b',
        explanation: 'Matches either the character a or the character b.',
      },
      {
        label: 'Any whitespace character',
        token: '\\s',
        explanation: 'Matches any whitespace character (spaces, tabs, line breaks).',
      },
      {
        label: 'Any non-whitespace character',
        token: '\\S',
        explanation: 'Matches any character that is not a whitespace character.',
      },
      {
        label: 'Any digit',
        token: '\\d',
        explanation: 'Matches any digit (0-9).',
      },
      {
        label: 'Any non-digit',
        token: '\\D',
        explanation: 'Matches any character that is not a digit.',
      },
      {
        label: 'Any word character',
        token: '\\w',
        explanation: 'Matches any alphanumeric character (letters and digits) plus underscores.',
      },
      {
        label: 'Any non-word character',
        token: '\\W',
        explanation: 'Matches any character that is not a word character.',
      },
      {
        label: 'Match everything enclosed',
        token: '(?:...)',
        explanation: 'Matches everything enclosed without capturing the group.',
      },
      {
        label: 'Capture everything enclosed',
        token: '(...)',
        explanation: 'Captures everything enclosed for later use.',
      },
      {
        label: 'Zero or one of a',
        token: 'a?',
        explanation: 'Matches zero or one occurrence of the character a.',
      },
      {
        label: 'Zero or more of a',
        token: 'a*',
        explanation: 'Matches zero or more occurrences of the character a.',
      },
      {
        label: 'One or more of a',
        token: 'a+',
        explanation: 'Matches one or more occurrences of the character a.',
      },
      {
        label: 'Exactly 3 of a',
        token: 'a{3}',
        explanation: 'Matches exactly three occurrences of the character a.',
      },
      {
        label: '3 or more of a',
        token: 'a{3,}',
        explanation: 'Matches three or more occurrences of the character a.',
      },
      {
        label: 'Between 3 and 6 of a',
        token: 'a{3,6}',
        explanation: 'Matches between three and six occurrences of the character a.',
      },
      {
        label: 'Start of string',
        token: '^',
        explanation: 'Matches the beginning of the string.',
      },
      {
        label: 'End of string',
        token: '$',
        explanation: 'Matches the end of the string.',
      },
      {
        label: 'A word boundary',
        token: '\\b',
        explanation: 'Matches a position where a word character is not adjacent to another word character.',
      },
      {
        label: 'Non-word boundary',
        token: '\\B',
        explanation: 'Matches a position where a word character is adjacent to another word character.',
      },
    ],
  },
  generalTokens: {
    key: 'general',
    label: 'General Token',
    icon: Target,
    items: [
      {
        label: 'Newline',
        token: '\n',
        explanation: 'Represents a line break in the text.',
      },
      {
        label: 'Carriage return',
        token: '\r',
        explanation: 'Moves the cursor to the beginning of the line.',
      },
      {
        label: 'Tab',
        token: '\t',
        explanation: 'Inserts a horizontal tab space.',
      },
      {
        label: 'Null character',
        token: '\0',
        explanation: 'Represents a null value or termination of a string.',
      },
    ],
  },
  anchors: {
    key: 'anchors',
    label: 'Anchors',
    icon: Anchor,
    items: [
      {
        label: 'Start of match',
        token: '\\G',
        explanation: 'Matches the position where the previous match ended.',
      },
      {
        label: 'Start of string',
        token: '^',
        explanation: 'Matches the beginning of the string.',
      },
      {
        label: 'End of string',
        token: '$',
        explanation: 'Matches the end of the string.',
      },
      {
        label: 'Start of string',
        token: '\\A',
        explanation: 'Matches the start of the string regardless of multiline mode.',
      },
      {
        label: 'End of string',
        token: '\\Z',
        explanation: 'Matches the end of the string regardless of multiline mode.',
      },
      {
        label: 'Absolute end of string',
        token: '\\z',
        explanation: 'Matches the absolute end of the string.',
      },
      {
        label: 'A word boundary',
        token: '\\b',
        explanation: 'Matches a position where a word character is not adjacent to another word character.',
      },
      {
        label: 'Non-word boundary',
        token: '\\B',
        explanation: 'Matches a position where a word character is adjacent to another word character.',
      },
    ],
  },
  metaSequences: {
    key: 'meta',
    label: 'Meta Sequences',
    icon: Layers,
    items: [
      {
        label: 'Any single character',
        token: '.',
        explanation: 'Matches any single character except line breaks.',
      },
      {
        label: 'Alternate - match either a or b',
        token: 'a|b',
        explanation: 'Matches either the character "a" or the character "b".',
      },
      {
        label: 'Any whitespace character',
        token: '\\s',
        explanation: 'Matches any whitespace character (spaces, tabs, line breaks).',
      },
      {
        label: 'Any non-whitespace character',
        token: '\\S',
        explanation: 'Matches any character that is not a whitespace character.',
      },
      {
        label: 'Any digit',
        token: '\\d',
        explanation: 'Matches any digit (0-9).',
      },
      {
        label: 'Any non-digit',
        token: '\\D',
        explanation: 'Matches any character that is not a digit.',
      },
      {
        label: 'Any word character',
        token: '\\w',
        explanation: 'Matches any word character (alphanumeric characters and underscores).',
      },
      {
        label: 'Any non-word character',
        token: '\\W',
        explanation: 'Matches any character that is not a word character.',
      },
      {
        label: 'Any Unicode sequences, linebreaks included',
        token: '\\X',
        explanation: 'Matches any Unicode sequence, including line breaks.',
      },
      {
        label: 'Match one data unit',
        token: '\\C',
        explanation: 'Matches one data unit (not just a character).',
      },
      {
        label: 'Unicode newlines',
        token: '\\R',
        explanation: 'Matches any Unicode newline sequence.',
      },
      {
        label: 'Match anything but a newline',
        token: '\\N',
        explanation: 'Matches any character except for newline characters.',
      },
      {
        label: 'Vertical whitespace character',
        token: '\\v',
        explanation: 'Matches any vertical whitespace character (like line breaks).',
      },
      {
        label: 'Negation of \\v',
        token: '\\V',
        explanation: 'Matches any character that is not a vertical whitespace character.',
      },
      {
        label: 'Horizontal whitespace character',
        token: '\\h',
        explanation: 'Matches any horizontal whitespace character (spaces and tabs).',
      },
      {
        label: 'Negation of \\h',
        token: '\\H',
        explanation: 'Matches any character that is not a horizontal whitespace character.',
      },
      {
        label: 'Reset match',
        token: '\\K',
        explanation: 'Resets the starting point of the current match.',
      },
      {
        label: 'Match subpattern number #',
        token: '\\#',
        explanation: 'Matches a literal "#" character.',
      },
      {
        label: 'Unicode property X',
        token: '\\pX',
        explanation: 'Matches characters that have the Unicode property X.',
      },
      {
        label: 'Unicode property or script category',
        token: '\\p{...}',
        explanation: 'Matches characters that belong to the specified Unicode property or script category.',
      },
      {
        label: 'Negation of \\pX',
        token: '\\PX',
        explanation: 'Matches characters that do not have the Unicode property X.',
      },
      {
        label: 'Negation of \\p',
        token: '\\P{...}',
        explanation: 'Matches characters that do not belong to the specified Unicode property.',
      },
      {
        label: 'Quote; treat as literals',
        token: '\\Q...\\E',
        explanation: 'Treats the characters between \\Q and \\E as literal characters.',
      },
      {
        label: 'Match subpattern `name`',
        token: '\\k{name}',
        explanation: 'Matches the same text matched by a named capture group.',
      },
      {
        label: 'Match subpattern `name`',
        token: '\\k&lt;name&gt;',
        explanation: 'Matches the same text matched by a named capture group.',
      },
      {
        label: 'Match subpattern `name`',
        token: '\\k\'name\'',
        explanation: 'Matches the same text matched by a named capture group.',
      },
      {
        label: 'Match nth subpattern',
        token: '\\gn',
        explanation: 'Matches the nth capturing group.',
      },
      {
        label: 'Match nth subpattern',
        token: '\\g{n}',
        explanation: 'Matches the nth capturing group.',
      },
      {
        label: 'Match text the nth relative previous subpattern matched',
        token: '\\g{-n}',
        explanation: 'Matches text matched by the nth previous subpattern.',
      },
      {
        label: 'Match expression defined in the nth capture group',
        token: '\\g&lt;n&gt;',
        explanation: 'Matches expression defined in the nth capture group.',
      },
      {
        label: 'Match expression defined in the nth relative upcoming capture group',
        token: '\\g&lt;+n&gt;',
        explanation: 'Matches expression defined in the nth upcoming capture group.',
      },
      {
        label: 'Match expression defined in the nth capture group',
        token: '\\g\'n\'',
        explanation: 'Matches expression defined in the nth capture group.',
      },
      {
        label: 'Match expression defined in the nth relative upcoming subpattern',
        token: '\\g\'+n\'',
        explanation: 'Matches expression defined in the nth relative upcoming subpattern.',
      },
      {
        label: 'Match previously-named capture group `letter`',
        token: '\\g{letter}',
        explanation: 'Matches the previously-named capture group.',
      },
      {
        label: 'Match expression defined in the capture group named "letter"',
        token: '\\g&lt;letter&gt;',
        explanation: 'Matches the expression defined in the capture group named "letter".',
      },
      {
        label: 'Match expression defined in the named capture group `letter`',
        token: '\\g\'letter\'',
        explanation: 'Matches the expression defined in the named capture group.',
      },
      {
        label: 'Hex character YY',
        token: '\\xYY',
        explanation: 'Matches the character with the specified hexadecimal code.',
      },
      {
        label: 'Hex character YYYY',
        token: '\\x{YYYY}',
        explanation: 'Matches the character with the specified hexadecimal code.',
      },
      {
        label: 'Octal character ddd',
        token: '\\ddd',
        explanation: 'Matches the character with the specified octal code.',
      },
      {
        label: 'Control character Y',
        token: '\\cY',
        explanation: 'Matches the specified control character.',
      },
      {
        label: 'Backspace character',
        token: '[\\b]',
        explanation: 'Matches the backspace control character.',
      },
      {
        label: 'Makes any character literal',
        token: '\\',
        explanation: 'Escapes the following character, treating it as a literal.',
      },
    ],
  },
  quantifiers: {
    key: 'quantifiers',
    label: 'Quantifiers',
    icon: Repeat1,
    items: [
      {
        label: 'Zero or one of a',
        token: 'a?',
        explanation: 'Matches zero or one occurrence of the character "a".',
      },
      {
        label: 'Zero or more of a',
        token: 'a*',
        explanation: 'Matches zero or more occurrences of the character "a".',
      },
      {
        label: 'One or more of a',
        token: 'a+',
        explanation: 'Matches one or more occurrences of the character "a".',
      },
      {
        label: 'Exactly 3 of a',
        token: 'a{3}',
        explanation: 'Matches exactly three occurrences of the character "a".',
      },
      {
        label: '3 or more of a',
        token: 'a{3,}',
        explanation: 'Matches three or more occurrences of the character "a".',
      },
      {
        label: 'Between 3 and 6 of a',
        token: 'a{3,6}',
        explanation: 'Matches between three and six occurrences of the character "a".',
      },
      {
        label: 'Greedy quantifier',
        token: 'a*',
        explanation: 'Matches zero or more occurrences of "a", as many as possible.',
      },
      {
        label: 'Lazy quantifier',
        token: 'a*?',
        explanation: 'Matches zero or more occurrences of "a", as few as possible.',
      },
      {
        label: 'Possessive quantifier',
        token: 'a*+',
        explanation: 'Matches zero or more occurrences of "a" and does not backtrack.',
      },
    ],
  },
  groupConstructs: {
    key: 'group',
    icon: Parentheses,
    label: 'Group Constructs',
    items: [
      {
        label: 'Match everything enclosed',
        token: '(?:...)',
        explanation: 'Matches everything enclosed in the group but does not capture it.',
      },
      {
        label: 'Capture everything enclosed',
        token: '(...)',
        explanation: 'Captures everything enclosed in the group.',
      },
      {
        label: 'Atomic group (non-capturing)',
        token: '(?>...)',
        explanation: 'Matches everything enclosed in the group atomically, preventing backtracking.',
      },
      {
        label: 'Duplicate/reset subpattern group number',
        token: '(?|...)',
        explanation: 'Allows you to reset the group number for nested patterns.',
      },
      {
        label: 'Comment group',
        token: '(?#...)',
        explanation: 'Allows you to add comments in the regex pattern, which are ignored during matching.',
      },
      {
        label: 'Named Capturing Group',
        token: '(?\'name\'...)',
        explanation: 'Captures everything enclosed and gives it a name for easier reference.',
      },
      {
        label: 'Named Capturing Group',
        token: '(?&lt;name&gt;...)',
        explanation: 'Another syntax for creating a named capturing group.',
      },
      {
        label: 'Named Capturing Group',
        token: '(?P&lt;name&gt;...)',
        explanation: 'Another syntax for creating a named capturing group in Python.',
      },
      {
        label: 'Inline modifiers',
        token: '(?imsxUJnxx)',
        explanation: 'Applies modifiers to the pattern that follows them.',
      },
      {
        label: 'Localized inline modifiers',
        token: '(?imsxUJnxx:...)',
        explanation: 'Applies modifiers only to the enclosed pattern.',
      },
      {
        label: 'Conditional statement',
        token: '(?(1)yes|no)',
        explanation: 'Conditionally matches based on whether group 1 has captured.',
      },
      {
        label: 'Conditional statement',
        token: '(?(R)yes|no)',
        explanation: 'Conditionally matches based on the result of a previous match.',
      },
      {
        label: 'Recursive Conditional statement',
        token: '(?(R#)yes|no)',
        explanation: 'Recursively evaluates a conditional statement.',
      },
      {
        label: 'Conditional statement',
        token: '(?(R&name)yes|no)',
        explanation: 'Conditional match based on the result of a named group.',
      },
      {
        label: 'Lookahead conditional',
        token: '(?(?=...)yes|no)',
        explanation: 'Checks if the following pattern matches without consuming it.',
      },
      {
        label: 'Lookbehind conditional',
        token: '(?(?&lt;=...)yes|no)',
        explanation: 'Checks if the preceding pattern matches without consuming it.',
      },
      {
        label: 'Recurse entire pattern',
        token: '(?R)',
        explanation: 'Recursively matches the entire pattern.',
      },
      {
        label: 'Match expression defined in capture group 1',
        token: '(?1)',
        explanation: 'Matches whatever was captured in group 1.',
      },
      {
        label: 'Match expression defined in the first relative capture group',
        token: '(?+1)',
        explanation: 'Matches whatever was captured in the first relative group.',
      },
      {
        label: 'Match expression defined in capture group `name`',
        token: '(?&name)',
        explanation: 'Matches whatever was captured in the named group "name".',
      },
      {
        label: 'Match subpattern `name`',
        token: '(?P=name)',
        explanation: 'Matches whatever was captured in the named group "name".',
      },
      {
        label: 'Match expression defined in the capture group "{name}"',
        token: '(?&gt;name)',
        explanation: 'Matches whatever was captured in the specified capture group.',
      },
      {
        label: 'Pre-define patterns before using them',
        token: '(?(DEFINE)...)',
        explanation: 'Defines patterns that can be reused later in the regex.',
      },
      {
        label: 'Positive Lookahead',
        token: '(?=...)',
        explanation: 'Asserts that what follows matches the enclosed pattern.',
      },
      {
        label: 'Negative Lookahead',
        token: '(?!...)',
        explanation: 'Asserts that what follows does not match the enclosed pattern.',
      },
      {
        label: 'Positive Lookbehind',
        token: '(?&lt;=...)',
        explanation: 'Asserts that what precedes matches the enclosed pattern.',
      },
      {
        label: 'Negative Lookbehind',
        token: '(?&lt;...)',
        explanation: 'Asserts that what precedes does not match the enclosed pattern.',
      },
      {
        label: 'Control verb',
        token: '(*ACCEPT)',
        explanation: 'Forces acceptance of the match.',
      },
      {
        label: 'Control verb',
        token: '(*FAIL)',
        explanation: 'Forces failure of the match.',
      },
      {
        label: 'Control verb',
        token: '(*MARK:NAME)',
        explanation: 'Marks a position in the match for future reference.',
      },
      {
        label: 'Control verb',
        token: '(*COMMIT)',
        explanation: 'Commits the current match, preventing backtracking.',
      },
      {
        label: 'Control verb',
        token: '(*PRUNE)',
        explanation: 'Prunes the current branch, preventing backtracking.',
      },
      {
        label: 'Control verb',
        token: '(*SKIP)',
        explanation: 'Skips the current match without consuming it.',
      },
      {
        label: 'Control verb',
        token: '(*THEN)',
        explanation: 'Indicates that the next match must succeed for the current match to succeed.',
      },
      {
        label: 'Pattern modifier',
        token: '(*UTF)',
        explanation: 'Enables UTF-8 mode for the pattern.',
      },
      {
        label: 'Pattern modifier',
        token: '(*UTF8)',
        explanation: 'Enables UTF-8 mode for the pattern.',
      },
      {
        label: 'Pattern modifier',
        token: '(*UTF16)',
        explanation: 'Enables UTF-16 mode for the pattern.',
      },
      {
        label: 'Pattern modifier',
        token: '(*UTF32)',
        explanation: 'Enables UTF-32 mode for the pattern.',
      },
      {
        label: 'Pattern modifier',
        token: '(*UCP)',
        explanation: 'Enables Unicode Character Property matching.',
      },
      {
        label: 'Line break modifier',
        token: '(*CR)',
        explanation: 'Specifies that line breaks are represented as carriage returns.',
      },
      {
        label: 'Line break modifier',
        token: '(*LF)',
        explanation: 'Specifies that line breaks are represented as line feeds.',
      },
      {
        label: 'Line break modifier',
        token: '(*CRLF)',
        explanation: 'Specifies that line breaks are represented as carriage return followed by line feed.',
      },
      {
        label: 'Line break modifier',
        token: '(*ANYCRLF)',
        explanation: 'Matches any line break sequence.',
      },
      {
        label: 'Line break modifier',
        token: '(*ANY)',
        explanation: 'Matches any character, including line breaks.',
      },
      {
        label: 'Empty match modifier',
        token: '(*NOTEMPTY)',
        explanation: 'Specifies that the match cannot be empty.',
      },
      {
        label: 'Empty match modifier',
        token: '(*NOTEMPTY_ATSTART)',
        explanation: 'Specifies that the match cannot be empty at the start.',
      },
      {
        label: 'JIT Modifier',
        token: '(*NO_JIT)',
        explanation: 'Disables just-in-time compilation.',
      },
      {
        label: 'Line break modifier',
        token: '\\R',
        explanation: 'Matches any line break sequence.',
      },
      {
        label: 'Line break modifier',
        token: '(*BSR_ANYCRLF)',
        explanation: 'Matches any line break, regardless of the platform.',
      },
      {
        label: 'Line break modifier',
        token: '(*BSR_UNICODE)',
        explanation: 'Matches line breaks in Unicode mode.',
      },
      {
        label: 'Regex engine modifier',
        token: '(*LIMIT_MATCH=x)',
        explanation: 'Sets a limit on the number of matches allowed.',
      },
      {
        label: 'Regex engine modifier',
        token: '(*LIMIT_RECURSION=d)',
        explanation: 'Sets a limit on recursion depth.',
      },
      {
        label: 'Regex engine modifier',
        token: '(*NO_AUTO_POSSESS)',
        explanation: 'Disables automatic possession of quantifiers.',
      },
      {
        label: 'Regex engine modifier',
        token: '(*NO_START_OPT)',
        explanation: 'Disables start-of-string optimization.',
      },
    ],
  },
  characterClasses: {
    key: 'character',
    icon: Brackets,
    label: 'Character Classes',
    items: [
      {
        label: 'A single character of: a, b or c',
        token: '[abc]',
        explanation: 'Matches any single character from the set: a, b, or c.',
      },
      {
        label: 'A character except: a, b or c',
        token: '[^abc]',
        explanation: 'Matches any single character that is not in the set: a, b, or c.',
      },
      {
        label: 'A character in the range: a-z',
        token: '[a-z]',
        explanation: 'Matches any single lowercase letter from a to z.',
      },
      {
        label: 'A character not in the range: a-z',
        token: '[^a-z]',
        explanation: 'Matches any single character that is not a lowercase letter from a to z.',
      },
      {
        label: 'A character in the range: a-z or A-Z',
        token: '[a-zA-Z]',
        explanation: 'Matches any single letter, either lowercase or uppercase.',
      },
      {
        label: 'Letters and digits',
        token: '[[:alnum:]]',
        explanation: 'Matches any alphanumeric character (letters and digits).',
      },
      {
        label: 'Letters',
        token: '[[:alpha:]]',
        explanation: 'Matches any letter (both lowercase and uppercase).',
      },
      {
        label: 'ASCII codes 0-127',
        token: '[[:ascii:]]',
        explanation: 'Matches any ASCII character, codes 0 to 127.',
      },
      {
        label: 'Space or tab only',
        token: '[[:blank:]]',
        explanation: 'Matches a space or tab character.',
      },
      {
        label: 'Control characters',
        token: '[[:cntrl:]]',
        explanation: 'Matches any control character.',
      },
      {
        label: 'Decimal digits',
        token: '[[:digit:]]',
        explanation: 'Matches any decimal digit (0-9).',
      },
      {
        label: 'Visible characters (not space)',
        token: '[[:graph:]]',
        explanation: 'Matches any visible character that is not a space.',
      },
      {
        label: 'Lowercase letters',
        token: '[[:lower:]]',
        explanation: 'Matches any lowercase letter (a-z).',
      },
      {
        label: 'Visible characters',
        token: '[[:print:]]',
        explanation: 'Matches any visible character, including space.',
      },
      {
        label: 'Visible punctuation characters',
        token: '[[:punct:]]',
        explanation: 'Matches any visible punctuation character.',
      },
      {
        label: 'Whitespace',
        token: '[[:space:]]',
        explanation: 'Matches any whitespace character (space, tab, newline, etc.).',
      },
      {
        label: 'Uppercase letters',
        token: '[[:upper:]]',
        explanation: 'Matches any uppercase letter (A-Z).',
      },
      {
        label: 'Word characters',
        token: '[[:word:]]',
        explanation: 'Matches any word character (alphanumeric plus underscore).',
      },
      {
        label: 'Hexadecimal digits',
        token: '[[:xdigit:]]',
        explanation: 'Matches any hexadecimal digit (0-9, a-f, A-F).',
      },
      {
        label: 'Start of word',
        token: '[[:&lt;:]]',
        explanation: 'Matches the position at the start of a word.',
      },
      {
        label: 'End of word',
        token: '[[:&gt;:]]',
        explanation: 'Matches the position at the end of a word.',
      },
    ],
  },
  flagsModifiers: {
    icon: Flag,
    key: 'flags',
    label: 'Flags/Modifiers',
    items: [
      {
        label: 'Global',
        token: 'g',
        explanation: 'Matches all occurrences in the string, not just the first one.',
      },
      {
        label: 'Multiline',
        token: 'm',
        explanation: 'Treats the input string as multiple lines. ^ and $ match the start and end of each line.',
      },
      {
        label: 'Case insensitive',
        token: 'i',
        explanation: 'Matches letters in a case-insensitive manner (A and a are treated as the same character).',
      },
      {
        label: 'Ignore whitespace / verbose',
        token: 'x',
        explanation: 'Allows for whitespace and comments in the regex for readability; ignores whitespace.',
      },
      {
        label: 'Single line',
        token: 's',
        explanation: 'The dot (.) matches newline characters, allowing . to match across lines.',
      },
      {
        label: 'Unicode',
        token: 'u',
        explanation: 'Treats the pattern as a sequence of Unicode code points.',
      },
      {
        label: 'eXtra',
        token: 'X',
        explanation: 'Allows for the interpretation of extra regex syntax (depends on the engine).',
      },
      {
        label: 'Ungreedy',
        token: 'U',
        explanation: 'Makes quantifiers non-greedy, matching as few characters as possible.',
      },
      {
        label: 'Anchor',
        token: 'A',
        explanation: 'Matches the position at the start of the string.',
      },
      {
        label: 'Duplicate group names',
        token: 'J',
        explanation: 'Allows for the use of duplicate group names in the regex.',
      },
      {
        label: 'Non-capturing groups',
        token: 'n',
        explanation: 'Defines groups without capturing them for back-referencing.',
      },
      {
        label: 'Ignore all whitespace / verbose',
        token: 'xx',
        explanation: 'Ignores all whitespace, making the regex easier to read.',
      },
    ],
  },
  substitution: {
    key: 'substitution',
    label: 'Substitution',
    icon: Scissors,
    items: [
      {
        label: 'Complete match contents',
        token: '$0',
        explanation: 'Refers to the entire match of the regex pattern.',
      },
      {
        label: 'Contents in capture group 1',
        token: '$1',
        explanation: 'Refers to the content captured in the first capture group.',
      },
      {
        label: 'Insert a dollar sign',
        token: '$$',
        explanation: 'Inserts a literal dollar sign in the replacement string.',
      },
      {
        label: 'Contents in capture group `foo`',
        token: '${foo}',
        explanation: 'Refers to the content captured in the named capture group "foo".',
      },
      {
        label: 'Hexadecimal replacement values',
        token: '\\x20',
        explanation: 'Inserts a character based on its hexadecimal ASCII code (32 in this case).',
      },
      {
        label: 'Hexadecimal replacement values',
        token: '\\x{06fa}',
        explanation: 'Inserts a character based on its hexadecimal Unicode code point (0x06fa).',
      },
      {
        label: 'Insert a tab',
        token: '\\t',
        explanation: 'Inserts a tab character.',
      },
      {
        label: 'Insert a carriage return',
        token: '\\r',
        explanation: 'Inserts a carriage return character.',
      },
      {
        label: 'Insert a newline',
        token: '\\n',
        explanation: 'Inserts a newline character.',
      },
      {
        label: 'Insert a form-feed',
        token: '\\f',
        explanation: 'Inserts a form-feed character.',
      },
      {
        label: 'Uppercase Transformation',
        token: '\\U',
        explanation: 'Transforms all characters to uppercase.',
      },
      {
        label: 'Lowercase Transformation',
        token: '\\L',
        explanation: 'Transforms all characters to lowercase.',
      },
      {
        label: 'Terminate any Transformation',
        token: '\\E',
        explanation: 'Ends any ongoing transformation (uppercase or lowercase).',
      },
      {
        label: 'Conditional replacement',
        token: '${1:+foo:bar}',
        explanation: 'Inserts "foo" if capture group 1 is defined; otherwise, inserts "bar".',
      },
      {
        label: 'Insert the escaped literal',
        token: '\\[',
        explanation: 'Inserts a literal opening bracket character.',
      },
    ],
  },
}

export const PATTERN_REFERENCES: PatternReferences = {
  allTokens: {
    key: 'allTokens',
    label: 'All Tokens',
    icon: BrickWall,
    items: Object.values(patternReferenceCollection).flatMap(group => group.items),
  },
  ...patternReferenceCollection,
}
