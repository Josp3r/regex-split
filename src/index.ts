// 类型定义
export interface TextSegment {
  content: string
  index: number // -1=未匹配，≥0=匹配的规则下标
  [key: string]: any
}

export type Rule = string | RegExp

export interface Plugin<T = TextSegment> {
  rules: Rule[]
  mapping: (segment: TextSegment) => T
}

// ================= 核心方法 =================
/**
 * 单规则分割（基础单元）
 * @param text 需要拆分的文本字符串
 * @param rule 当前应用的正则规则
 * @param index 当前规则在总规则数组中的下标
 * @returns 处理后的片段集合
 */
function splitText (
  text: string,
  rule: Rule,
  index?: number // 默认为0
): TextSegment[] {
  const fallbackSegment: TextSegment = {
    content: text,
    index: -1
  }
  if (text.length === 0 || rule === '') {
    return [fallbackSegment]
  }
  const regex = new RegExp(rule, 'g') // 创建副本避免副作用
  const matches = Array.from(text.matchAll(regex))
  if (matches.length === 0) {
    return [fallbackSegment]
  }

  const segments: TextSegment[] = []

  let lastPos = 0
  for (const match of matches) {
    // assetion for ts error: Object is possibly 'undefined'.
    const start = match.index as any as number
    const end = start + match[0].length

    if (start > lastPos) {
      segments.push({
        content: text.slice(lastPos, start),
        index: -1
      })
    }

    segments.push({
      content: match[0],
      index: index ?? 0
    })

    lastPos = end
  }

  if (lastPos < text.length) {
    segments.push({
      content: text.slice(lastPos),
      index: -1
    })
  }

  return segments
}

/**
 * 核心递归处理函数
 * @param segments 当前待处理的文本段集合
 * @param allRules 完整的正则规则数组（必须带g标志）
 * @param currentRuleIndex 当前处理规则的数组下标
 * @returns 处理完成的文本段数组
 */
function splitSegements (
  segments: TextSegment[],
  rules: Rule[],
  currentIndex?: number
): TextSegment[] {
  // 终止条件：所有规则处理完成
  if (typeof currentIndex === 'undefined') currentIndex = 0
  if (currentIndex >= rules.length) return segments
  const currentRule = rules[currentIndex]
  const nextSegments: TextSegment[] = []

  for (const segment of segments) {
    // 已匹配的段直接穿透
    if (segment.index !== -1) {
      nextSegments.push(segment)
      continue
    }

    nextSegments.push(...splitText(segment.content, currentRule, currentIndex))
  }

  // 递归处理下一个规则
  return splitSegements(nextSegments, rules, currentIndex + 1)
}

function split (text: string, rule: Rule | Rule[]): TextSegment[] {
  if (typeof text !== 'string') {
    throw new Error('The text must be a string')
  }
  // 利用空rule初始化segments
  const segments = splitText(text, '')

  // 预检1：空文本直接返回
  if (text.length === 0) return segments

  if (Array.isArray(rule)) {
    // 预检2：规则列表为空直接返回
    if (rule.length === 0) {
      return segments
    }
    return splitSegements(segments, rule)
  }

  // 预检3：规则是单规则并且为空字符串
  if (typeof rule === 'string' && rule.length === 0) return segments

  return splitSegements(segments, [rule])
}

abstract class SplitPlugin<T = TextSegment> implements Plugin<T> {
  abstract get rules (): Rule[]
  abstract mapping (segment: TextSegment): T
}

export interface RuleOption {
  rule: RegExp
  [key: string]: any
}
class RuleOptionSplitPlugin extends SplitPlugin {
  constructor (private readonly list: RuleOption[]) {
    super()
  }

  get rules (): RegExp[] {
    return this.list.map(item => item.rule)
  }

  mapping (segment: TextSegment): TextSegment {
    const s = {
      ...segment
    }
    if (segment.index !== -1) {
      Object.assign(s, this.list[segment.index])
      delete s.rule
    }
    return s
  }
}

function splitWithPlugin <T> (text: string, plugin: Plugin<T>): T[] {
  const rules = plugin.rules
  return split(text, rules).map((segment) => plugin.mapping.bind(plugin)(segment))
}

export {
  SplitPlugin,
  RuleOptionSplitPlugin,
  splitText,
  splitSegements,
  splitWithPlugin,
  split as default
}
