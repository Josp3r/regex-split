import split from '../src';

describe('基础测试', () => {
  // 测试案例 1: 单层分割
  it("单层分隔符分割", () => {
    const text = "a,b,c";
    const segments = split(text, ",");
    expect(segments.length).toEqual(5);
    expect(segments[0].index).toEqual(-1);
    expect(segments[1].index).toEqual(0);
  });
  it('测试分割能力', () => {
    const text = 'A1-B2;C3';
    const rules = [
      /-/g,
      /;/g,
      /\d/g
    ]
    const segments = split(text, rules)
    // console.log(segments)
    expect(segments.length).toEqual(8);
  });
});
