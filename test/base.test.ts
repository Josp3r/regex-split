import split from '../src';

describe('基础测试', () => {
  it("单分隔符1", () => {
    const text = "a,b,c";
    const segments = split(text, ",");
    expect(segments.length).toEqual(5);
    expect(segments[0].index).toEqual(-1);
    expect(segments[1].index).toEqual(0);
  });
  it('单分隔符2', () => {
    const text = 'A1-B2';
    const segments = split(text, /\d/)
    // console.log(segments)
    expect(segments.length).toEqual(4);
  });
  it('多分割', () => {
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
