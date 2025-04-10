[**@eslint-react/eff**](../README.md)

***

[@eslint-react/eff](../README.md) / apply

# Function: apply()

> **apply**\<`A`\>(`a`): \<`B`\>(`self`) => `B`

Apply a function to a given value.

## Type Parameters

### A

`A`

## Parameters

### a

`A`

The value to apply.

## Returns

> \<`B`\>(`self`): `B`

### Type Parameters

#### B

`B`

### Parameters

#### self

(`a`) => `B`

### Returns

`B`

## Example

```ts
import * as assert from "node:assert"
import { pipe, apply } from "effect/Function"
import { length } from "effect/String"

assert.deepStrictEqual(pipe(length, apply("hello")), 5)
```

## Since

1.0.0
