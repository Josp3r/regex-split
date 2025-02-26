# regex-split

A JavaScript library that splits strings into segments based on regular expressions

## Installation

```bash
npm install regex-split
```

## Usage

### Single Rule

```js
import regexSplit from 'regex-split';

const text = 'A1-B2';
const segments = regexSplit(text, /\d/)
console.log(segments)
/**
 * [
 *   {
 *     content: "A",
 *     index: -1
 *   },
 *   {
 *     content: "1",
 *     index: 0
 *   },
 *   {
 *     content: "-B",
 *     index: -1
 *   },
 *   {
 *     content: "2",
 *     index: 0
 *   }
 * ]
 */
```

### Multiple Rules

```js
import regexSplit from 'regex-split';

const text = 'A1-B2;C3';
const rules = [
    /-/g,
    /;/g,
    /\d/g
]
const segments = regexSplit(text, rules)
console.log(segments)
/**
 * [
 *   {
 *     content: "A",
 *     index: -1
 *   },
 *   {
 *     content: "1",
 *     index: 2
 *   },
 *   {
 *     content: "-",
 *     index: 0
 *   },
 *   {
 *     content: "B",
 *     index: -1
 *   },
 *   {
 *     content: "2",
 *     index: 2
 *   },
 *   {
 *     content: ";",
 *     index: 1
 *   },
 *   {
 *     content: "C",
 *     index: -1
 *   },
 *   {
 *     content: "3",
 *     index: 2
 *   }
 * ]
 */
```

### Use Plugin

```js
import { RuleOptionSplitPlugin, splitWithPlugin } from 'regex-split';

const text = 'A1-B2;C3';
const rules = [
    {
        rule: /-/g,
        desc: '-'
    },
    {
        rule: /;/g,
        desc: ';'
    },
    {
        rule: /\d/g,
        desc: 'number'
    }
]

const segments = splitWithPlugin(text, new RuleOptionSplitPlugin(rules))
console.log(segments)
/**
 * [
 *   {
 *     content: "A",
 *     index: -1,
 *   },
 *   {
 *     content: "1",
 *     index: 2,
 *     desc: "number"
 *   },
 *   {
 *     content: "-",
 *     index: 0,
 *     desc: "-"
 *   },
 *   {
 *     content: "B",
 *     index: -1
 *   },
 *   {
 *     content: "2",
 *     index: 2,
 *     desc: "number"
 *   },
 *   {
 *     content: ";",
 *     index: 1,
 *     desc: ";"
 *   },
 *   {
 *     content: "C",
 *     index: -1
 *   },
 *   {
 *     content: "3",
 *     index: 2,
 *     desc: "number"
 *   }
 * ]
 */
```

Custom Plugin

```js
import { SplitPlugin } from 'regex-split'

class CustomSplitPlugin extends SplitPlugin {
  // TODO: complete it
  constructor () {
  }
  // TODO: complete it
  get rules (): RegExp[] {
  }
  // TODO: complete it
  mapping (segment: TextSegment): TextSegment {
  }
}
```

## Interface

### TextSegment

| Name | Type | Description |
| --- | --- | --- |
| content | String | The content of the segment |
| index | Number | The index of the rules |

## License

MIT
