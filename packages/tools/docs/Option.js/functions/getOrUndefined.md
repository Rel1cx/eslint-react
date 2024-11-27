[**@eslint-react/tools**](../../README.md) • **Docs**

***

[@eslint-react/tools](../../README.md) / [./Option.js](../README.md) / getOrUndefined

# Function: getOrUndefined()

> **getOrUndefined**\<`A`\>(`self`): `undefined` \| `A`

Returns the value of the `Option` if it is a `Some`, otherwise returns `undefined`.

## Type Parameters

• **A**

## Parameters

• **self**: [`Option`](../type-aliases/Option.md)\<`A`\>

The `Option` to extract the value from.

## Returns

`undefined` \| `A`

## Example

```ts
import { Option } from "effect"

assert.deepStrictEqual(Option.getOrUndefined(Option.some(1)), 1)
assert.deepStrictEqual(Option.getOrUndefined(Option.none()), undefined)
```

## Category

getters

## Since

2.0.0
