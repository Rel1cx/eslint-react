[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [Data](../README.md) / tagged

# Function: tagged()

> **tagged**\<`A`\>(`tag`): [`Constructor`](../namespaces/Case/interfaces/Constructor.md)\<`A`, `"_tag"`\>

Provides a tagged constructor for the specified `Case`.

## Type Parameters

• **A** *extends* `object`

## Parameters

• **tag**: `A`\[`"_tag"`\]

## Returns

[`Constructor`](../namespaces/Case/interfaces/Constructor.md)\<`A`, `"_tag"`\>

## Example

```ts
import { Data } from "effect"

interface Person {
  readonly _tag: "Person" // the tag
  readonly name: string
}

const Person = Data.tagged<Person>("Person")

const mike = Person({ name: "Mike" })

assert.deepEqual(mike, { _tag: "Person", name: "Mike" })
```

## Since

2.0.0

## Category

constructors
