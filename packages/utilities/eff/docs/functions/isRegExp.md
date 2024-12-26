[**@eslint-react/eff**](../README.md)

***

[@eslint-react/eff](../README.md) / isRegExp

# Function: isRegExp()

> **isRegExp**(`input`): `input is RegExp`

Tests if a value is a `RegExp`.

## Parameters

### input

`unknown`

The value to test.

## Returns

`input is RegExp`

## Example

```ts
import { Predicate } from "effect"

assert.deepStrictEqual(Predicate.isRegExp(/a/), true)
assert.deepStrictEqual(Predicate.isRegExp("a"), false)
```

## Since

3.9.0
