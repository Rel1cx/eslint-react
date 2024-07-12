[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [Record](../README.md) / map

# Function: map()

Maps a record into another record by applying a transformation function to each of its values.

## Param

The record to be mapped.

## Param

A transformation function that will be applied to each of the values in the record.

## Example

```ts
import { map } from "effect/Record"

const f = (n: number) => `-${n}`

assert.deepStrictEqual(map({ a: 3, b: 5 }, f), { a: "-3", b: "-5" })

const g = (n: number, key: string) => `${key.toUpperCase()}-${n}`

assert.deepStrictEqual(map({ a: 3, b: 5 }, g), { a: "A-3", b: "B-5" })
```

## Since

2.0.0

## map(f)

> **map**\<`K`, `A`, `B`\>(`f`): (`self`) => `Record`\<`K`, `B`\>

Maps a record into another record by applying a transformation function to each of its values.

### Type Parameters

• **K** *extends* `string`

• **A**

• **B**

### Parameters

• **f**

### Returns

`Function`

#### Parameters

• **self**: [`ReadonlyRecord`](../type-aliases/ReadonlyRecord.md)\<`K`, `A`\>

#### Returns

`Record`\<`K`, `B`\>

### Param

The record to be mapped.

### Param

A transformation function that will be applied to each of the values in the record.

### Example

```ts
import { map } from "effect/Record"

const f = (n: number) => `-${n}`

assert.deepStrictEqual(map({ a: 3, b: 5 }, f), { a: "-3", b: "-5" })

const g = (n: number, key: string) => `${key.toUpperCase()}-${n}`

assert.deepStrictEqual(map({ a: 3, b: 5 }, g), { a: "A-3", b: "B-5" })
```

### Since

2.0.0

## map(self, f)

> **map**\<`K`, `A`, `B`\>(`self`, `f`): `Record`\<`K`, `B`\>

Maps a record into another record by applying a transformation function to each of its values.

### Type Parameters

• **K** *extends* `string`

• **A**

• **B**

### Parameters

• **self**: [`ReadonlyRecord`](../type-aliases/ReadonlyRecord.md)\<`K`, `A`\>

• **f**

### Returns

`Record`\<`K`, `B`\>

### Param

The record to be mapped.

### Param

A transformation function that will be applied to each of the values in the record.

### Example

```ts
import { map } from "effect/Record"

const f = (n: number) => `-${n}`

assert.deepStrictEqual(map({ a: 3, b: 5 }, f), { a: "-3", b: "-5" })

const g = (n: number, key: string) => `${key.toUpperCase()}-${n}`

assert.deepStrictEqual(map({ a: 3, b: 5 }, g), { a: "A-3", b: "B-5" })
```

### Since

2.0.0
