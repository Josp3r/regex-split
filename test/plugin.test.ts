import { TextSegment, SplitPlugin, splitWithPlugin } from '../src';

type CustomRule = {
  rule: RegExp,
  desc: string,
}
type CustomSplitResult = {
  content: string,
  desc: string
}
class CustomPlugin extends SplitPlugin<CustomSplitResult> {
  constructor(private list: CustomRule[]) {
    super();
  }

  get rules() {
    return this.list.map(item => item.rule);
  }

  mapping(segment: TextSegment): CustomSplitResult {
    if (segment.index === -1) {
      return {
        content: segment.content,
        desc: '未命中'
      }
    }
    return {
      content: segment.content,
      desc: this.list[segment.index]!.desc
    }
  }
}

describe('插件测试', () => {
  it('测试分割插件', () => {
    const text = 'A1-B2;C3';
    const ruleList: CustomRule[] = [
      {
        rule: /-/g,
        desc: '小短横'
      },
      {
        rule: /;/g,
        desc: '分号'
      },
      {
        rule: /\d/g,
        desc: '数字'
      }
    ]
    
    const segments = splitWithPlugin(text, new CustomPlugin(ruleList))
    // console.log(segments)
    expect(segments.length).toEqual(8);
  });
});
