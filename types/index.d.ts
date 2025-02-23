export interface TextSegment {
  content: string
  index: number // -1=未匹配，≥0=匹配的规则下标
}

export type Rule = string | RegExp

export interface Plugin<T> {
  get rules(): Rule[]
  mapping: (segment: TextSegment) => T
}

// ================= 核心方法 =================
declare function splitText (text: string, rule: Rule, index?: number): TextSegment[]
declare function splitSegements (segments: TextSegment[], rules: Rule[], currentIndex?: number): TextSegment[]
declare function split (text: string, rule: Rule | Rule[]): TextSegment[]
declare function splitWithPlugin <T> (text: string, plugin: Plugin<T>): T[]

export {
  splitText,
  splitSegements,
  split as default
}
