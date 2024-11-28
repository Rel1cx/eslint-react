[**@eslint-react/tools**](../README.md)

***

[@eslint-react/tools](../README.md) / isNullable

# Function: isNullable()

> **isNullable**\<`A`\>(`input`): input is Extract\<A, undefined \| null\>

A guard that succeeds when the input is `null` or `undefined`.

## Type Parameters

• **A**

## Parameters

### input

`A`

The value to test.

## Returns

input is Extract\<A, undefined \| null\>

## Example

```ts
import { isNullable } from "effect/Predicate"

assert.deepStrictEqual(isNullable(null), true)
assert.deepStrictEqual(isNullable(undefined), true)

assert.deepStrictEqual(isNullable({}), false)
assert.deepStrictEqual(isNullable([]), false)
```

## Since

2.0.0
