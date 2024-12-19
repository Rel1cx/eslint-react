[**@eslint-react/tools**](../../../README.md)

***

[@eslint-react/tools](../../../README.md) / [F](../README.md) / untupled

# Function: untupled()

> **untupled**\<`A`, `B`\>(`f`): (...`a`) => `B`

Inverse function of `tupled`

## Type Parameters

• **A** *extends* readonly `unknown`[]

• **B**

## Parameters

### f

(`a`) => `B`

## Returns

`Function`

### Parameters

#### a

...`A`

### Returns

`B`

## Example

```ts
import { untupled } from "effect/Function"

const getFirst = untupled(<A, B>(tuple: [A, B]): A => tuple[0])

assert.deepStrictEqual(getFirst(1, 2), 1)
```

## Since

2.0.0
