[**@eslint-react/eff**](../../../README.md)

***

[@eslint-react/eff](../../../README.md) / [Data](../README.md) / Class

# Variable: Class()

> `const` **Class**: \<`A`\>(`args`) => `Readonly`\<`A`\>

Provides a constructor for a Case Class.

## Parameters

### args

`Types.Equals`\<`A`, \{\}\> *extends* `true` ? `void` : `{ readonly [P in keyof A]: A[P] }`

## Returns

`Readonly`\<`A`\>

## Example

```ts
import { Data, Equal } from "effect"

class Person extends Data.Class<{ readonly name: string }> {}

// Creating instances of Person
const mike1 = new Person({ name: "Mike" })
const mike2 = new Person({ name: "Mike" })
const john = new Person({ name: "John" })

// Checking equality
assert.deepStrictEqual(Equal.equals(mike1, mike2), true)
assert.deepStrictEqual(Equal.equals(mike1, john), false)
```

## Since

2.0.0
