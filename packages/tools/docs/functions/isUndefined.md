[**@eslint-react/tools**](../README.md) • **Docs**

***

[@eslint-react/tools](../README.md) / isUndefined

# Function: isUndefined()

> **isUndefined**(`input`): `input is undefined`

Tests if a value is `undefined`.

## Parameters

• **input**: `unknown`

The value to test.

## Returns

`input is undefined`

## Example

```ts
import { isUndefined } from "effect/Predicate"

assert.deepStrictEqual(isUndefined(undefined), true)

assert.deepStrictEqual(isUndefined(null), false)
assert.deepStrictEqual(isUndefined("undefined"), false)
```

## Since

2.0.0
