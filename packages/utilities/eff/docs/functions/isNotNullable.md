[**@eslint-react/eff**](../README.md)

***

[@eslint-react/eff](../README.md) / isNotNullable

# Function: isNotNullable()

> **isNotNullable**\<`A`\>(`input`): `input is NonNullable<A>`

A guard that succeeds when the input is not `null` or `undefined`.

## Type Parameters

• **A**

## Parameters

### input

`A`

The value to test.

## Returns

`input is NonNullable<A>`

## Example

```ts
import { isNotNullable } from "effect/Predicate"

assert.deepStrictEqual(isNotNullable({}), true)
assert.deepStrictEqual(isNotNullable([]), true)

assert.deepStrictEqual(isNotNullable(null), false)
assert.deepStrictEqual(isNotNullable(undefined), false)
```

## Since

2.0.0
