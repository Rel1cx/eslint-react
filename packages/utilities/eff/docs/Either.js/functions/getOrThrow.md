[**@eslint-react/eff**](../../README.md)

***

[@eslint-react/eff](../../README.md) / [./Either.js](../README.md) / getOrThrow

# Function: getOrThrow()

> **getOrThrow**\<`R`, `L`\>(`self`): `R`

Extracts the value of an `Either` or throws if the `Either` is `Left`.

The thrown error is a default error. To configure the error thrown, see  [getOrThrowWith](getOrThrowWith.md).

## Type Parameters

• **R**

• **L**

## Parameters

### self

[`Either`](../type-aliases/Either.md)\<`R`, `L`\>

The `Either` to extract the value from.

## Returns

`R`

## Throws

`Error("getOrThrow called on a Left")`

## Example

```ts
import { Either } from "effect"

assert.deepStrictEqual(Either.getOrThrow(Either.right(1)), 1)
assert.throws(() => Either.getOrThrow(Either.left("error")))
```

## Since

2.0.0
