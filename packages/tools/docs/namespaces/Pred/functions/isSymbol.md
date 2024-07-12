[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [Pred](../README.md) / isSymbol

# Function: isSymbol()

> **isSymbol**(`input`): `input is symbol`

Tests if a value is a `symbol`.

## Parameters

• **input**: `unknown`

The value to test.

## Returns

`input is symbol`

## Example

```ts
import { isSymbol } from "effect/Predicate"

assert.deepStrictEqual(isSymbol(Symbol.for("a")), true)

assert.deepStrictEqual(isSymbol("a"), false)
```

## Since

2.0.0
