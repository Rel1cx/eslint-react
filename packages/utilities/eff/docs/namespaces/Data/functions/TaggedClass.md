[**@eslint-react/eff**](../../../README.md)

***

[@eslint-react/eff](../../../README.md) / [Data](../README.md) / TaggedClass

# Function: TaggedClass()

> **TaggedClass**\<`Tag`\>(`tag`): \<`A`\>(`args`) => `Readonly`\<`A`\> & `object`

Provides a Tagged constructor for a Case Class.

## Type Parameters

• **Tag** *extends* `string`

## Parameters

### tag

`Tag`

## Returns

`Function`

### Parameters

#### args

`Equals`\<`A`, \{\}\> *extends* `true` ? `void` : \{ readonly \[P in string \| number \| symbol as P extends "\_tag" ? never : P\]: A\[P\] \}

### Returns

`Readonly`\<`A`\> & `object`

## Example

```ts
import { Data, Equal } from "effect"

class Person extends Data.TaggedClass("Person")<{ readonly name: string }> {}

// Creating instances of Person
const mike1 = new Person({ name: "Mike" })
const mike2 = new Person({ name: "Mike" })
const john = new Person({ name: "John" })

// Checking equality
assert.deepStrictEqual(Equal.equals(mike1, mike2), true)
assert.deepStrictEqual(Equal.equals(mike1, john), false)

assert.deepStrictEqual(mike1._tag, "Person")
```

## Since

2.0.0
