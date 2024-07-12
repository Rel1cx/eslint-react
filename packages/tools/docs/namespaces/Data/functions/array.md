[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [Data](../README.md) / array

# Function: array()

> **array**\<`As`\>(`as`): `Readonly`\<`As`\>

## Type Parameters

• **As** *extends* readonly `any`[]

## Parameters

• **as**: `As`

## Returns

`Readonly`\<`As`\>

## Example

```ts
import { Data, Equal } from "effect"

const alice = Data.struct({ name: "Alice", age: 30 })
const bob = Data.struct({ name: "Bob", age: 40 })

const persons = Data.array([alice, bob])

assert.deepStrictEqual(
  Equal.equals(
    persons,
    Data.array([
      Data.struct({ name: "Alice", age: 30 }),
      Data.struct({ name: "Bob", age: 40 })
    ])
  ),
  true
)
```

## Since

2.0.0
