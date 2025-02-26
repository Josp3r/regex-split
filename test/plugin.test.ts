import { RuleOption, RuleOptionSplitPlugin, splitWithPlugin } from '../src';

describe('插件测试', () => {
  it('测试分割插件', () => {
    const text = 'A1-B2;C3';
    const ruleList: RuleOption[] = [
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
    
    const segments = splitWithPlugin(text, new RuleOptionSplitPlugin(ruleList))
    // console.log(segments)
    expect(segments.length).toEqual(8);
    expect(typeof segments[0].desc).toEqual('undefined');
    expect(segments[2].desc).toEqual(ruleList[0].desc);
    expect(segments[5].desc).toEqual(ruleList[1].desc);
    expect(segments[7].desc).toEqual(ruleList[2].desc);
  });
});
