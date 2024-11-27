[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [Data](../README.md) / tuple

# Function: tuple()

> **tuple**\<`As`\>(...`as`): `Readonly`\<`As`\>

## Type Parameters

• **As** *extends* readonly `any`[]

## Parameters

• ...**as**: `As`

## Returns

`Readonly`\<`As`\>

## Example

```ts
import { Data, Equal } from "effect"

const alice = Data.tuple("Alice", 30)

const bob = Data.tuple("Bob", 40)

assert.deepStrictEqual(Equal.equals(alice, alice), true)
assert.deepStrictEqual(Equal.equals(alice, Data.tuple("Alice", 30)), true)

assert.deepStrictEqual(Equal.equals(alice, ["Alice", 30]), false)
assert.deepStrictEqual(Equal.equals(alice, bob), false)
```

## Category

constructors

## Since

2.0.0
