[**@eslint-react/eff**](../../README.md)

***

[@eslint-react/eff](../../README.md) / [./Either.js](../README.md) / isEither

# Function: isEither()

> **isEither**(`input`): `input is Either<unknown, unknown>`

Tests if a value is a `Either`.

## Parameters

### input

`unknown`

The value to test.

## Returns

`input is Either<unknown, unknown>`

## Example

```ts
import { Either } from "effect"

assert.deepStrictEqual(Either.isEither(Either.right(1)), true)
assert.deepStrictEqual(Either.isEither(Either.left("a")), true)
assert.deepStrictEqual(Either.isEither({ right: 1 }), false)
```

## Since

2.0.0
