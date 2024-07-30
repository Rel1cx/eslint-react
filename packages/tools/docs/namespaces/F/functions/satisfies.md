[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [F](../README.md) / satisfies

# Function: satisfies()

> **satisfies**\<`A`\>(): \<`B`\>(`b`) => `B`

A function that ensures that the type of an expression matches some type,
without changing the resulting type of that expression.

## Type Parameters

• **A**

## Returns

`Function`

### Type Parameters

• **B**

### Parameters

• **b**: `B`

### Returns

`B`

## Example

```ts
import { satisfies } from "effect/Function"

const test1 = satisfies<number>()(5 as const)
    //^? const test: 5
    // @ts-expect-error
const test2 = satisfies<string>()(5)
    //^? Argument of type 'number' is not assignable to parameter of type 'string'

assert.deepStrictEqual(satisfies<number>()(5), 5)
```

## Since

2.0.0
