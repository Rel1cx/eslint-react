[**@eslint-react/core**](../../../README.md)

***

[@eslint-react/core](../../../README.md) / [useComponentCollector](../README.md) / ReturnType

# Type Alias: ReturnType

> **ReturnType**: `object`

## Type declaration

### ctx

> **ctx**: `object`

#### ctx.getAllComponents()

> **getAllComponents**: (`node`) => [`Map`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map)\<`string`, [`ERFunctionComponent`](../../../interfaces/ERFunctionComponent.md)\>

##### Parameters

###### node

`TSESTree.Program`

##### Returns

[`Map`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map)\<`string`, [`ERFunctionComponent`](../../../interfaces/ERFunctionComponent.md)\>

#### ctx.getCurrentEntries()

> **getCurrentEntries**: () => [`FunctionEntry`](../../../-internal-/type-aliases/FunctionEntry.md)[]

##### Returns

[`FunctionEntry`](../../../-internal-/type-aliases/FunctionEntry.md)[]

#### ctx.getCurrentEntry()

> **getCurrentEntry**: () => [`FunctionEntry`](../../../-internal-/type-aliases/FunctionEntry.md) \| [`_`](../../../-internal-/type-aliases.md)

##### Returns

[`FunctionEntry`](../../../-internal-/type-aliases/FunctionEntry.md) \| [`_`](../../../-internal-/type-aliases.md)

### listeners

> **listeners**: [`RuleListener`](../../../-internal-/type-aliases/RuleListener.md)
