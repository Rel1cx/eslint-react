[**@eslint-react/core**](../../../README.md)

***

[@eslint-react/core](../../../README.md) / [useComponentCollector](../README.md) / ReturnType

# Type Alias: ReturnType

> **ReturnType**: `object`

## Type declaration

### ctx

> **ctx**: `object`

#### ctx.getAllComponents()

> **getAllComponents**: (`node`) => `Map`\<`string`, [`ERFunctionComponent`](../../../interfaces/ERFunctionComponent.md)\>

##### Parameters

###### node

`TSESTree.Program`

##### Returns

`Map`\<`string`, [`ERFunctionComponent`](../../../interfaces/ERFunctionComponent.md)\>

#### ctx.getCurrentEntries()

> **getCurrentEntries**: () => `FunctionEntry`[]

##### Returns

`FunctionEntry`[]

#### ctx.getCurrentEntry()

> **getCurrentEntry**: () => `FunctionEntry` \| `_`

##### Returns

`FunctionEntry` \| `_`

### listeners

> **listeners**: `ESLintUtils.RuleListener`
