[**@eslint-react/eff**](../README.md)

***

[@eslint-react/eff](../README.md) / isNotUndefined

# Function: isNotUndefined()

> **isNotUndefined**\<`A`\>(`input`): `input is Exclude<A, undefined>`

Tests if a value is not `undefined`.

## Type Parameters

• **A**

## Parameters

### input

`A`

The value to test.

## Returns

`input is Exclude<A, undefined>`

## Example

```ts
import { isNotUndefined } from "effect/Predicate"

assert.deepStrictEqual(isNotUndefined(null), true)
assert.deepStrictEqual(isNotUndefined("undefined"), true)

assert.deepStrictEqual(isNotUndefined(undefined), false)
```

## Since

2.0.0
