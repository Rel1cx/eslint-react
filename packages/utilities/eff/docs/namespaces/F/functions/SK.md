[**@eslint-react/tools**](../../../README.md)

***

[@eslint-react/tools](../../../README.md) / [F](../README.md) / SK

# Function: SK()

> **SK**\<`A`, `B`\>(`_`, `b`): `B`

The SK combinator, also known as the "S-K combinator" or "S-combinator", is a fundamental combinator in the
lambda calculus and the SKI combinator calculus.

This function is useful for discarding the first argument passed to it and returning the second argument.

## Type Parameters

• **A**

• **B**

## Parameters

### \_

`A`

The first argument to be discarded.

### b

`B`

The second argument to be returned.

## Returns

`B`

## Example

```ts
import { SK } from "effect/Function";

assert.deepStrictEqual(SK(0, "hello"), "hello")
```

## Since

2.0.0
