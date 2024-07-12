[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [Pred](../README.md) / isUnknown

# Function: isUnknown()

> **isUnknown**(`input`): `input is unknown`

A guard that always succeeds.

## Parameters

• **input**: `unknown`

## Returns

`input is unknown`

## Example

```ts
import { isUnknown } from "effect/Predicate"

assert.deepStrictEqual(isUnknown(null), true)
assert.deepStrictEqual(isUnknown(undefined), true)

assert.deepStrictEqual(isUnknown({}), true)
assert.deepStrictEqual(isUnknown([]), true)
```

## Since

2.0.0
