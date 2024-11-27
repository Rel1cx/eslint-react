[**@eslint-react/tools**](../README.md) • **Docs**

***

[@eslint-react/tools](../README.md) / isNotNull

# Function: isNotNull()

> **isNotNull**\<`A`\>(`input`): `input is Exclude<A, null>`

Tests if a value is not `null`.

## Type Parameters

• **A**

## Parameters

• **input**: `A`

The value to test.

## Returns

`input is Exclude<A, null>`

## Example

```ts
import { isNotNull } from "effect/Predicate"

assert.deepStrictEqual(isNotNull(undefined), true)
assert.deepStrictEqual(isNotNull("null"), true)

assert.deepStrictEqual(isNotNull(null), false)
```

## Category

guards

## Since

2.0.0
