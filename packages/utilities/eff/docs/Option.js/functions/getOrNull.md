[**@eslint-react/eff**](../../README.md)

***

[@eslint-react/eff](../../README.md) / [./Option.js](../README.md) / getOrNull

# Function: getOrNull()

> **getOrNull**\<`A`\>(`self`): `null` \| `A`

Returns the value of the `Option` if it is a `Some`, otherwise returns `null`.

## Type Parameters

• **A**

## Parameters

### self

[`Option`](../type-aliases/Option.md)\<`A`\>

The `Option` to extract the value from.

## Returns

`null` \| `A`

## Example

```ts
import { Option } from "effect"

assert.deepStrictEqual(Option.getOrNull(Option.some(1)), 1)
assert.deepStrictEqual(Option.getOrNull(Option.none()), null)
```

## Since

2.0.0
