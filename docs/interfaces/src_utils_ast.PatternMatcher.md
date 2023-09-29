[eslint-plugin-react-ts](../README.md) / [src/utils/ast](../modules/src_utils_ast.md) / PatternMatcher

# Interface: PatternMatcher

[src/utils/ast](../modules/src_utils_ast.md).PatternMatcher

## Table of contents

### Methods

- [[replace]](src_utils_ast.PatternMatcher.md#[replace])
- [execAll](src_utils_ast.PatternMatcher.md#execall)
- [test](src_utils_ast.PatternMatcher.md#test)

## Methods

### [replace]

▸ **[replace]**(`str`, `replacer`): `string`

Replace all matched parts by a given replacer.

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |
| `replacer` | `string` \| (...`strs`: `string`[]) => `string` |

#### Returns

`string`

**`See`**

[https://eslint-community.github.io/eslint-utils/api/ast-utils.html#matcher-symbol-replace](https://eslint-community.github.io/eslint-utils/api/ast-utils.html#matcher-symbol-replace)

**`Example`**

```ts
const { PatternMatcher } = require("eslint-utils")
const matcher = new PatternMatcher(/\\p{Script=Greek}/g)

module.exports = {
    meta: {},
    create(context) {
        return {
            "Literal[regex]"(node) {
                const replacedPattern = node.regex.pattern.replace(
                    matcher,
                    "[\\u0370-\\u0373\\u0375-\\u0377\\u037A-\\u037D\\u037F\\u0384\\u0386\\u0388-\\u038A\\u038C\\u038E-\\u03A1\\u03A3-\\u03E1\\u03F0-\\u03FF\\u1D26-\\u1D2A\\u1D5D-\\u1D61\\u1D66-\\u1D6A\\u1DBF\\u1F00-\\u1F15\\u1F18-\\u1F1D\\u1F20-\\u1F45\\u1F48-\\u1F4D\\u1F50-\\u1F57\\u1F59\\u1F5B\\u1F5D\\u1F5F-\\u1F7D\\u1F80-\\u1FB4\\u1FB6-\\u1FC4\\u1FC6-\\u1FD3\\u1FD6-\\u1FDB\\u1FDD-\\u1FEF\\u1FF2-\\u1FF4\\u1FF6-\\u1FFE\\u2126\\uAB65]|\\uD800[\\uDD40-\\uDD8E\\uDDA0]|\\uD834[\\uDE00-\\uDE45]"
                )
            },
        }
    },
}
```

#### Defined in

node_modules/@typescript-eslint/utils/dist/ast-utils/eslint-utils/PatternMatcher.d.ts:36

___

### execAll

▸ **execAll**(`str`): `IterableIterator`<`RegExpExecArray`\>

Iterate all matched parts in a given string.

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

`IterableIterator`<`RegExpExecArray`\>

**`See`**

[https://eslint-community.github.io/eslint-utils/api/ast-utils.html#matcher-execall](https://eslint-community.github.io/eslint-utils/api/ast-utils.html#matcher-execall)

#### Defined in

node_modules/@typescript-eslint/utils/dist/ast-utils/eslint-utils/PatternMatcher.d.ts:7

___

### test

▸ **test**(`str`): `boolean`

Check whether this pattern matches a given string or not.

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

`boolean`

**`See`**

[https://eslint-community.github.io/eslint-utils/api/ast-utils.html#matcher-test](https://eslint-community.github.io/eslint-utils/api/ast-utils.html#matcher-test)

#### Defined in

node_modules/@typescript-eslint/utils/dist/ast-utils/eslint-utils/PatternMatcher.d.ts:13
