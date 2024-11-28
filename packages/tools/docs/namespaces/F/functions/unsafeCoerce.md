[**@eslint-react/tools**](../../../README.md)

***

[@eslint-react/tools](../../../README.md) / [F](../README.md) / unsafeCoerce

# Function: unsafeCoerce()

> **unsafeCoerce**\<`A`, `B`\>(`a`): `B`

Casts the result to the specified type.

## Type Parameters

• **A**

• **B**

## Parameters

### a

`A`

The value to be casted to the target type.

## Returns

`B`

## Example

```ts
import { unsafeCoerce, identity } from "effect/Function"

assert.deepStrictEqual(unsafeCoerce, identity)
```

## Since

2.0.0
