[**@eslint-react/tools**](../../README.md) • **Docs**

***

[@eslint-react/tools](../../README.md) / [./Option.js](../README.md) / getOrThrow

# Function: getOrThrow()

> **getOrThrow**\<`A`\>(`self`): `A`

Extracts the value of an `Option` or throws if the `Option` is `None`.

The thrown error is a default error. To configure the error thrown, see  [getOrThrowWith](getOrThrowWith.md).

## Type Parameters

• **A**

## Parameters

• **self**: [`Option`](../type-aliases/Option.md)\<`A`\>

The `Option` to extract the value from.

## Returns

`A`

## Throws

`Error("getOrThrow called on a None")`

## Example

```ts
import { Option } from "effect"

assert.deepStrictEqual(Option.getOrThrow(Option.some(1)), 1)
assert.throws(() => Option.getOrThrow(Option.none()))
```

## Category

conversions

## Since

2.0.0
