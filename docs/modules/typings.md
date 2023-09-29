[eslint-plugin-react-ts](../README.md) / typings

# Module: typings

## Table of contents

### Type Aliases

- [Additional](typings.md#additional)
- [Cond](typings.md#cond)
- [Descriptive](typings.md#descriptive)
- [JSONValue](typings.md#jsonvalue)
- [Modifier](typings.md#modifier)
- [Namespace](typings.md#namespace)
- [NegativeDescriptive](typings.md#negativedescriptive)
- [NegativeModifier](typings.md#negativemodifier)
- [NeutralDescriptive](typings.md#neutraldescriptive)
- [PositiveDescriptive](typings.md#positivedescriptive)
- [PositiveModifier](typings.md#positivemodifier)
- [ReactSettings](typings.md#reactsettings)
- [RuleContext](typings.md#rulecontext)
- [RuleDeclaration](typings.md#ruledeclaration)
- [RuleName](typings.md#rulename)
- [RulePreset](typings.md#rulepreset)
- [Severity](typings.md#severity)
- [Term](typings.md#term)

## Type Aliases

### Additional

Ƭ **Additional**: `string`

#### Defined in

[typings/rule-name.ts:148](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/e82a365/typings/rule-name.ts#L148)

___

### Cond

Ƭ **Cond**: ``"always"`` \| ``"never"``

#### Defined in

[typings/index.ts:8](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/e82a365/typings/index.ts#L8)

___

### Descriptive

Ƭ **Descriptive**: [`NegativeDescriptive`](typings.md#negativedescriptive) \| [`NeutralDescriptive`](typings.md#neutraldescriptive) \| [`PositiveDescriptive`](typings.md#positivedescriptive)

#### Defined in

[typings/rule-name.ts:53](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/e82a365/typings/rule-name.ts#L53)

___

### JSONValue

Ƭ **JSONValue**: { `[x: string]`: [`JSONValue`](typings.md#jsonvalue);  } \| [`JSONValue`](typings.md#jsonvalue)[] \| `boolean` \| ``null`` \| `number` \| `string`

#### Defined in

[typings/json-value.ts:1](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/e82a365/typings/json-value.ts#L1)

___

### Modifier

Ƭ **Modifier**: [`NegativeModifier`](typings.md#negativemodifier) \| [`PositiveModifier`](typings.md#positivemodifier)

#### Defined in

[typings/rule-name.ts:11](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/e82a365/typings/rule-name.ts#L11)

___

### Namespace

Ƭ **Namespace**: ``"compat"`` \| ``"debug"`` \| ``"hooks"`` \| ``"jsx"`` \| ``"naming-convention"``

#### Defined in

[typings/rule-name.ts:3](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/e82a365/typings/rule-name.ts#L3)

___

### NegativeDescriptive

Ƭ **NegativeDescriptive**: ``"complicated"`` \| ``"confusing"`` \| ``"constructed"`` \| ``"dangerously"`` \| ``"deprecated"`` \| ``"duplicate"`` \| ``"empty"`` \| ``"extra"`` \| ``"falsely"`` \| ``"implicit"`` \| ``"incompatible"`` \| ``"invalid"`` \| ``"leaked"`` \| ``"legacy"`` \| ``"missing"`` \| ``"misused"`` \| ``"mixing"`` \| ``"outdated"`` \| ``"redundant"`` \| ``"restricted"`` \| ``"suppressing"`` \| ``"suspicious"`` \| ``"unescaped"`` \| ``"uninitialized"`` \| ``"unknown"`` \| ``"unreachable"`` \| ``"unsafe"`` \| ``"unstable"`` \| ``"unused"`` \| ``"useless"``

#### Defined in

[typings/rule-name.ts:13](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/e82a365/typings/rule-name.ts#L13)

___

### NegativeModifier

Ƭ **NegativeModifier**: ``"prevent"`` \| `No`

#### Defined in

[typings/rule-name.ts:9](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/e82a365/typings/rule-name.ts#L9)

___

### NeutralDescriptive

Ƭ **NeutralDescriptive**: ``"access"`` \| ``"calling"`` \| ``"inside"`` \| ``"outside"``

#### Defined in

[typings/rule-name.ts:47](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/e82a365/typings/rule-name.ts#L47)

___

### PositiveDescriptive

Ƭ **PositiveDescriptive**: ``"explicit"`` \| ``"optimal"`` \| ``"optimized"`` \| ``"standard"`` \| ``"strict"``

#### Defined in

[typings/rule-name.ts:45](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/e82a365/typings/rule-name.ts#L45)

___

### PositiveModifier

Ƭ **PositiveModifier**: ``"ensure"`` \| ``"prefer"`` \| ``"strict"``

#### Defined in

[typings/rule-name.ts:7](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/e82a365/typings/rule-name.ts#L7)

___

### ReactSettings

Ƭ **ReactSettings**: `ReadonlyDeep`<{ `[key: string]`: `unknown`; `createClass`: `string` ; `fragment`: `string` ; `pragma`: `string` ; `version`: `string`  }\>

#### Defined in

[typings/react-settings.ts:3](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/e82a365/typings/react-settings.ts#L3)

___

### RuleContext

Ƭ **RuleContext**: [`Remap`](src_lib_primitives.md#remap)<`Readonly`<`TSESLint.RuleContext`<`string`, readonly `unknown`[]\>\>\>

#### Defined in

[typings/rule-context.ts:5](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/e82a365/typings/rule-context.ts#L5)

___

### RuleDeclaration

Ƭ **RuleDeclaration**: `ReadonlyDeep`<[[`Severity`](typings.md#severity), Record<string, unknown\>?] \| [`Severity`](typings.md#severity)\>

#### Defined in

[typings/index.ts:12](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/e82a365/typings/index.ts#L12)

___

### RuleName

Ƭ **RuleName**: \`${NegativeModifier}-${NegativeDescriptive \| NeutralDescriptive}-${Term}\` \| \`${NegativeModifier}-${NegativeDescriptive \| NeutralDescriptive}-${Term}-${Additional}\` \| \`${No}-${Term}\` \| \`${No}-${Term}-${Additional}\` \| \`${PositiveModifier}-${NeutralDescriptive \| PositiveDescriptive}-${Term}\` \| \`${PositiveModifier}-${NeutralDescriptive \| PositiveDescriptive}-${Term}-${Additional}\` \| \`${PositiveModifier}-${Term}\` \| \`${PositiveModifier}-${Term}-${Additional}\`

#### Defined in

[typings/rule-name.ts:150](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/e82a365/typings/rule-name.ts#L150)

___

### RulePreset

Ƭ **RulePreset**: `ReadonlyDeep`<`Record`<`string`, [`RuleDeclaration`](typings.md#ruledeclaration)\>\>

#### Defined in

[typings/index.ts:14](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/e82a365/typings/index.ts#L14)

___

### Severity

Ƭ **Severity**: ``"error"`` \| ``"off"`` \| ``"warn"``

#### Defined in

[typings/index.ts:10](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/e82a365/typings/index.ts#L10)

___

### Term

Ƭ **Term**: ``"argument"`` \| ``"array"`` \| ``"array-index"`` \| ``"arrow-function"`` \| ``"attribute"`` \| ``"block"`` \| ``"boolean"`` \| ``"cache"`` \| ``"callback"`` \| ``"children"`` \| ``"class"`` \| ``"class-component"`` \| ``"class-method"`` \| ``"class-property"`` \| ``"clone-element"`` \| ``"comment"`` \| ``"component"`` \| ``"computed"`` \| ``"computed-property"`` \| ``"conditional-rendering"`` \| ``"const"`` \| ``"constant"`` \| ``"constructor"`` \| ``"context"`` \| ``"context-consumer"`` \| ``"context-provider"`` \| ``"context-value"`` \| ``"createRef"`` \| ``"default-props"`` \| ``"deps"`` \| ``"destructuring"`` \| ``"destructuring-assignment"`` \| ``"direct-mutation"`` \| ``"display-name"`` \| ``"document"`` \| ``"effect"`` \| ``"element"`` \| ``"entities"`` \| ``"error"`` \| ``"event"`` \| ``"event-handler"`` \| ``"exhaustive-deps"`` \| ``"expression"`` \| ``"false"`` \| ``"filename"`` \| ``"forward-ref"`` \| ``"fragment"`` \| ``"function"`` \| ``"function-component"`` \| ``"function-name"`` \| ``"global"`` \| ``"handler"`` \| ``"hook"`` \| ``"html"`` \| ``"id"`` \| ``"index"`` \| ``"input"`` \| ``"key"`` \| ``"literal"`` \| ``"map"`` \| ``"memo"`` \| ``"memoized-function"`` \| ``"method"`` \| ``"name"`` \| ``"namespace"`` \| ``"nested-components"`` \| ``"node"`` \| ``"parameter"`` \| ``"prop"`` \| ``"react"`` \| ``"ref"`` \| ``"render"`` \| ``"return"`` \| ``"spread"`` \| ``"state"`` \| ``"string"`` \| ``"string-refs"`` \| ``"style"`` \| ``"textnodes"`` \| ``"use-callback"`` \| ``"use-context"`` \| ``"use-effect"`` \| ``"use-imperative-handle"`` \| ``"use-layout-effect"`` \| ``"use-memo"`` \| ``"use-reducer"`` \| ``"use-ref"`` \| ``"use-state"`` \| ``"value"`` \| ``"variable"``

#### Defined in

[typings/rule-name.ts:56](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/e82a365/typings/rule-name.ts#L56)
