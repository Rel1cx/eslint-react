[**@eslint-react/tools**](../README.md)

***

[@eslint-react/tools](../README.md) / isNever

# Function: isNever()

> **isNever**(`input`): `input is never`

A guard that always fails.

## Parameters

### input

`unknown`

## Returns

`input is never`

## Example

```ts
import { isNever } from "effect/Predicate"

assert.deepStrictEqual(isNever(null), false)
assert.deepStrictEqual(isNever(undefined), false)
assert.deepStrictEqual(isNever({}), false)
assert.deepStrictEqual(isNever([]), false)
```

## Since

2.0.0
