[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [E](../README.md) / getLeft

# Function: getLeft()

> **getLeft**\<`R`, `L`\>(`self`): [`Option`](../../O/type-aliases/Option.md)\<`L`\>

Converts a `Either` to an `Option` discarding the value.

## Type Parameters

• **R**

• **L**

## Parameters

• **self**: [`Either`](../type-aliases/Either.md)\<`R`, `L`\>

## Returns

[`Option`](../../O/type-aliases/Option.md)\<`L`\>

## Example

```ts
import { Either, Option } from "effect"

assert.deepStrictEqual(Either.getLeft(Either.right('ok')), Option.none())
assert.deepStrictEqual(Either.getLeft(Either.left('err')), Option.some('err'))
```

## Since

2.0.0
