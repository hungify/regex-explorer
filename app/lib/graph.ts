import type { AST } from '@eslint-community/regexpp'
import { GRAPH_CHOICE_PADDING_HORIZONTAL, GRAPH_CHOICE_PADDING_VERTICAL, GRAPH_LAYOUT, GRAPH_NODE, GRAPH_NODE_MARGIN_HORIZONTAL, GRAPH_NODE_MARGIN_VERTICAL } from '~/constants/graph'
import type { NodeSize } from '~/types/graph'

export const characterClassTextMap = {
  '.': 'Any character',
  '\\d': 'Any digit',
  '\\D': 'Non-digit',
  '\\w': 'Any alphanumeric',
  '\\W': 'Non-alphanumeric',
  '\\s': 'White space',
  '\\S': 'Non-white space',
  '\\t': 'Horizontal tab',
  '\\r': 'Carriage return',
  '\\n': 'Linefeed',
  '\\v': 'Vertical tab',
  '\\f': 'Form-feed',
  '[\\b]': 'Backspace',
  '\\0': 'NUL',
  '\\cH': '\\b Backspace',
  '\\cI': '\\t Horizontal Tab',
  '\\cJ': '\\n Line Feed',
  '\\cK': '\\v Vertical Tab',
  '\\cL': '\\f Form Feed',
  '\\cM': '\\r Carriage Return',
  '\\xhh': '',
  '\\uhhhh': '',
}
export type CharacterClassKey = keyof typeof characterClassTextMap

const assertionTextMap = {
  beginning: 'Begins with',
  end: 'Ends with',
  lookahead: ['Followed by:', 'Not followed by:'],
  lookbehind: ['Preceded by:', 'Not preceded by:'],
  word: ['WordBoundary', 'NonWordBoundary'],
} as const

export function getNameText(node: AST.BranchNode): string | null {
  switch (node.type) {
    case 'CharacterClass':
      return node.negate ? 'None of' : 'One of'
    case 'CharacterClassRange':
      return 'Range'
    case 'Group':
      return 'Group'
    case 'Assertion': {
      const { kind, negate } = node
      return assertionTextMap[kind][negate ? 1 : 0]
    }
    default:
      break
  }
  return null
}

export function getQuantifier(node: AST.Node) {
  return (node.type === 'Character' || node.type === 'Group' || node.type === 'Backreference') ? node.quantifier : null
}

export function getQuantifierText(quantifier: AST.Quantifier): string {
  const { min, max } = quantifier
  const minText = min
  const maxText = max === Infinity ? '' : max
  if (min === max) {
    return ` ${minText}`
  }
  return ` ${minText} - ${maxText}`
}

export function lrd(
  node: AST.RegExpLiteral | AST.Node,
  callback: (node: AST.Pattern | AST.Node) => void,
) {
  switch (node.type) {
    case 'Pattern':
      node.alternatives.forEach(child => lrd(child, callback))
      break
    case 'Group':
      node.alternatives.forEach(child => lrd(child, callback))
      break
    case 'CapturingGroup':
      node.alternatives.forEach((branch) => {
        branch.elements.forEach(child => lrd(child, callback))
      })
      break
    default:
      break
  }
  callback(node)
}

export function largerWithMinSize(size: [number, number]): [number, number] {
  return [
    Math.max(size[0], GRAPH_NODE.MIN_WIDTH),
    Math.max(size[1], GRAPH_NODE.MIN_HEIGHT),
  ]
}

export function measureNodes(nodes: AST.Node[], sizeMap: Map<AST.Node | AST.Node[], NodeSize>): [number, number] {
  let width = 0
  let height = 0
  for (const node of nodes) {
    const { box: boxSize } = sizeMap.get(node)!
    width += boxSize[0]
    height = Math.max(height, boxSize[1])
  }
  width += Math.max(nodes.length - 1, 0) * GRAPH_LAYOUT.NODE_MARGIN_HORIZONTAL
  return largerWithMinSize([width, height])
}

export function tryCharacterClassText(key?: number): [string, boolean] {
  if (!key) {
    return ['Empty', true]
  }
  else if (key in characterClassTextMap) {
    return [characterClassTextMap[key as CharacterClassKey], true]
  }
  else {
    return [`"${key}"`, false]
  }
}

export function measureBranches(
  branches: AST.Node[][],
  currentSizeMap: Map<AST.Node | AST.Node[], NodeSize>,
  nextSizeMap: Map<AST.Node | AST.Node[], NodeSize>,
): [number, number] {
  let width = 0
  let height = 0
  for (const branch of branches) {
    const branchSize = currentSizeMap.has(branch)
      ? currentSizeMap.get(branch)!.box
      : measureNodes(branch, nextSizeMap)
    nextSizeMap.set(branch, { box: branchSize, content: branchSize })
    width = Math.max(width, branchSize[0])
    height += branchSize[1]
  }
  height
    += Math.max(branches.length - 1, 0) * GRAPH_NODE_MARGIN_VERTICAL
    + 2 * GRAPH_CHOICE_PADDING_VERTICAL
  width += 2 * GRAPH_CHOICE_PADDING_HORIZONTAL
  return largerWithMinSize([width, height])
}
