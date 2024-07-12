[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [E](../README.md) / getOrNull

# Function: getOrNull()

> **getOrNull**\<`R`, `L`\>(`self`): `null` \| `R`

## Type Parameters

• **R**

• **L**

## Parameters

• **self**: [`Either`](../type-aliases/Either.md)\<`R`, `L`\>

## Returns

`null` \| `R`

## Example

```ts
import { Either } from "effect"

assert.deepStrictEqual(Either.getOrNull(Either.right(1)), 1)
assert.deepStrictEqual(Either.getOrNull(Either.left("a")), null)
```

## Since

2.0.0
