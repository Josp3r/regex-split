import split from '../src';

describe('基础测试', () => {
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
