import type { AST } from '@eslint-community/regexpp'
import { type CharacterClassKey, characterClassTextMap, getNameText, getQuantifierText, tryCharacterClassText } from './graph'
import { GRAPH_ICON_SIZE, GRAPH_NAME_MEASURE_HEIGHT, GRAPH_NODE_MIN_HEIGHT, GRAPH_NODE_MIN_WIDTH, GRAPH_NODE_PADDING_HORIZONTAL, GRAPH_NODE_PADDING_VERTICAL, GRAPH_QUANTIFIER_MEASURE_HEIGHT, GRAPH_QUANTIFIER_TEXT_FONTSIZE, GRAPH_QUOTE_PADDING, GRAPH_ROOT_RADIUS, GRAPH_TEXT_FONT_SIZE } from '~/constants/graph'

function t(text: string) {
  return text
}

export interface NodeSize {
  box: [number, number]
  content: [number, number]
}

const ZERO_SIZE: [number, number] = [0, 0]
const EMPTY_SIZE: [number, number] = [
  GRAPH_NODE_MIN_WIDTH,
  GRAPH_NODE_MIN_HEIGHT,
]
export const ROOT_SIZE: [number, number] = [
  GRAPH_ROOT_RADIUS * 2,
  GRAPH_ROOT_RADIUS * 2,
]
export const DEFAULT_SIZE: NodeSize = {
  box: ZERO_SIZE,
  content: ZERO_SIZE,
}

const assertionTextMap = {
  beginning: 'Begin with',
  end: 'End with',
  lookahead: ['Followed by:', 'Not followed by:'],
  lookbehind: ['Preceded by:', 'Not Preceded by:'],
  word: ['WordBoundary', 'NonWordBoundary'],
}

let ctx: CanvasRenderingContext2D | null = null

try {
  const canvas = document.createElement('canvas')
  ctx = canvas.getContext('2d')
}
catch (error) {
  ctx = null
}

export function getBackReferenceText(node: AST.BackReferenceNode, t: Function) {
  return `${t('Back reference')} #${node.ref}`
}

export function getBoundaryAssertionText(node:
  | AST.BeginningBoundaryAssertionNode
  | AST.EndBoundaryAssertionNode
  | AST.WordBoundaryAssertionNode, t: Function) {
  let text = ''
  if (node.kind === 'word') {
    const negate = node.negate
    text = assertionTextMap.word[negate ? 1 : 0]
  }
  else {
    const kind = node.kind
    text = assertionTextMap[kind]
  }
  return t(text)
}

export function getQuantifier(node: AST.Node) {
  return (node.type === 'character' || node.type === 'group' || node.type === 'backReference') ? node.quantifier : null
}

export function checkQuantifier(node: AST.Node): node is (AST.CharacterNode | AST.GroupNode | AST.BackReferenceNode) {
  return node.type === 'character' || node.type === 'group' || node.type === 'backReference'
}

export function measureText(text: string, fontSize: number, fontFamily = null): [number, number] {
  let width = 0
  if (ctx) {
    ctx.font = `${fontSize}px ${fontFamily}`
    ;({ width } = ctx.measureText(text))
  }
  else {
    width = text.length * fontSize * 0.75
  }
  const fontHeight = 1.5 * fontSize
  return [width, fontHeight]
}

function measureQuantifier(node: AST.Node): [number, number] {
  const quantifier = getQuantifier(node)
  if (quantifier) {
    const text = getQuantifierText(quantifier)
    const [textWidth] = measureText(text, GRAPH_QUANTIFIER_TEXT_FONTSIZE)
    const width
      = textWidth
      + GRAPH_ICON_SIZE
      + (quantifier.max === Infinity ? GRAPH_ICON_SIZE : 0)
    return [width, GRAPH_QUANTIFIER_MEASURE_HEIGHT]
  }
  return ZERO_SIZE
}

function measureTexts(texts: string[]): [number, number][] {
  return texts.map(text => measureText(text, GRAPH_TEXT_FONT_SIZE))
}

function measureNodeText(texts: string[] | string): [number, number] {
  let width = 0
  let height = 0
  if (typeof texts === 'string') {
    ;[width, height] = measureText(texts, GRAPH_TEXT_FONT_SIZE)
  }
  else {
    const sizes = measureTexts(texts)
    for (const size of sizes) {
      const [w, h] = size
      width = Math.max(width, w)
      height += h
    }
  }
  return [
    width + GRAPH_NODE_PADDING_HORIZONTAL * 2,
    height + GRAPH_NODE_PADDING_VERTICAL * 2,
  ]
}

function measureRanges(ranges: AST.Range[]): [number, number] {
  const singleRangeSet = new Set<number>()
  let width = 0
  let height = 0
  ranges.forEach((range) => {
    let text = ''
    let quotes = 0
    const { min, max } = range
    if (min < 10) {
      if (min === max) {
        singleRangeSet.add(min)
        return
      }
      else {
        text = `"${min}" - "${max}"`
        quotes += 2
      }
    }
    else {
      if (min === max) {
        const res = tryCharacterClassText(min)
        text = res[1] ? t(res[0]) : res[0]
        quotes += res[1] ? 0 : 1
      }
      else {
        const fromRes = tryCharacterClassText(min)
        const toRes = tryCharacterClassText(max)
        const fromText = fromRes[1] ? t(fromRes[0]) : fromRes[0]
        const toText = toRes[1] ? t(toRes[0]) : toRes[0]
        text = `${fromText} - ${toText}`
        quotes += (fromRes[1] ? 0 : 1) + (toRes[1] ? 0 : 1)
      }
    }
    let [w, h] = measureText(text, GRAPH_TEXT_FONT_SIZE)
    w += quotes * GRAPH_QUOTE_PADDING * 2
    width = Math.max(width, w)
    height += h
  })
  if (singleRangeSet.size > 0) {
    const text = `"${Array.from(singleRangeSet).join('')}"`
    let [w, h] = measureText(text, GRAPH_TEXT_FONT_SIZE)
    w += GRAPH_QUOTE_PADDING * 2
    width = Math.max(width, w)
    height += h
  }
  return [
    width + GRAPH_NODE_PADDING_HORIZONTAL * 2,
    height + GRAPH_NODE_PADDING_VERTICAL * 2,
  ]
}

function measureCharacter(node: AST.Character | AST.CharacterClass | AST.CharacterClassRange): [number, number] {
  let size: [number, number] = [0, 0]
  switch (node.type) {
    case 'Character': {
      const { raw } = node
      if (raw === '') {
        size = measureNodeText(t('Empty'))
      }
      else {
        size = measureNodeText(`"${raw}"`)
        size[0] += GRAPH_QUOTE_PADDING * 2
      }
      break
    }
    case 'CharacterClass': {
      const { raw } = node
      if (raw === '') {
        size = measureNodeText('Empty')
      }
      else if (raw in characterClassTextMap) {
        size = measureNodeText(
          t(characterClassTextMap[raw as CharacterClassKey]),
        )
      }
      else {
        size = measureNodeText(raw)
        size[0] += GRAPH_QUOTE_PADDING * 2
      }
      break
    }
    case 'CharacterClassRange': {
      size = measureRanges(node)
      break
    }
    default:
      break
  }
  return size
}

export function getBoxSize(node: AST.Node, contentSize: [number, number]): [number, number] {
  const nameSize = measureNodeName(node)
  const quantifierSize = measureQuantifier(node)
  const width = Math.max(contentSize[0], nameSize[0], quantifierSize[0])
  const height = contentSize[1] + 2 * Math.max(nameSize[1], quantifierSize[1])
  return [width, height]
}

export function largerWithMinSize(size: [number, number]): [number, number] {
  return [
    Math.max(size[0]),
    Math.max(size[1], GRAPH_NODE_MIN_HEIGHT),
  ]
}

export function measureSimpleNode(node: AST.ClassRangesCharacterClassElement): NodeSize {
  let contentSize: [number, number] = EMPTY_SIZE
  switch (node.type) {
    // case 'root': {
    //   return { box: ROOT_SIZE, content: ROOT_SIZE }
    // }
    case 'Character': {
      contentSize = measureCharacter(node)
      break
    }
    // case 'backReference': {
    //   contentSize = measureNodeText(getBackReferenceText(node, t))
    //   break
    // }
    // case 'boundaryAssertion': {
    //   contentSize = measureNodeText(getBoundaryAssertionText(node, t))
    //   break
    // }
    default:
      break
  }
  contentSize = largerWithMinSize(contentSize)
  const boxSize = getBoxSize(node, contentSize)
  return {
    box: boxSize,
    content: contentSize,
  }
}

export function measureNodeName(node: AST.Node | AST.Regex): [number, number] {
  if (node.type !== 'regex') {
    const name = getNameText(node, t)
    if (name) {
      return [measureNodeText(name)[0], GRAPH_NAME_MEASURE_HEIGHT]
    }
  }
  return ZERO_SIZE
}
