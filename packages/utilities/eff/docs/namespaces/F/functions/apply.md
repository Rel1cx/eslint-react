[**@eslint-react/eff**](../../../README.md)

***

[@eslint-react/eff](../../../README.md) / [F](../README.md) / apply

# Function: apply()

> **apply**\<`A`\>(`a`): \<`B`\>(`self`) => `B`

Apply a function to a given value.

## Type Parameters

• **A**

## Parameters

### a

`A`

The value that the function will be applied to.

## Returns

`Function`

### Type Parameters

• **B**

### Parameters

#### self

(`a`) => `B`

### Returns

`B`

## Example

```ts
import { pipe, apply } from "effect/Function"
import { length } from "effect/String"

assert.deepStrictEqual(pipe(length, apply("hello")), 5)
```

## Since

2.0.0
