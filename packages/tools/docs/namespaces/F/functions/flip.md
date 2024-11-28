[**@eslint-react/tools**](../../../README.md)

***

[@eslint-react/tools](../../../README.md) / [F](../README.md) / flip

# Function: flip()

> **flip**\<`A`, `B`, `C`\>(`f`): (...`b`) => (...`a`) => `C`

Reverses the order of arguments for a curried function.

## Type Parameters

• **A** *extends* `unknown`[]

• **B** *extends* `unknown`[]

• **C**

## Parameters

### f

(...`a`) => (...`b`) => `C`

A curried function that takes multiple arguments.

## Returns

`Function`

### Parameters

#### b

...`B`

### Returns

`Function`

#### Parameters

##### a

...`A`

#### Returns

`C`

## Example

```ts
import { flip } from "effect/Function"

const f = (a: number) => (b: string) => a - b.length

assert.deepStrictEqual(flip(f)('aaa')(2), -1)
```

## Since

2.0.0
