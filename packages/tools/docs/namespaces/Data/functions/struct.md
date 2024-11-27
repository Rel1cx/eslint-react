[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [Data](../README.md) / struct

# Function: struct()

> **struct**\<`A`\>(`a`): \{ readonly \[P in string \| number \| symbol\]: A\[P\] \}

## Type Parameters

• **A** *extends* `Record`\<`string`, `any`\>

## Parameters

• **a**: `A`

## Returns

\{ readonly \[P in string \| number \| symbol\]: A\[P\] \}

## Example

```ts
import { Data, Equal } from "effect"

const alice = Data.struct({ name: "Alice", age: 30 })

const bob = Data.struct({ name: "Bob", age: 40 })

assert.deepStrictEqual(Equal.equals(alice, alice), true)
assert.deepStrictEqual(Equal.equals(alice, Data.struct({ name: "Alice", age: 30 })), true)

assert.deepStrictEqual(Equal.equals(alice, { name: "Alice", age: 30 }), false)
assert.deepStrictEqual(Equal.equals(alice, bob), false)
```

## Category

constructors

## Since

2.0.0
