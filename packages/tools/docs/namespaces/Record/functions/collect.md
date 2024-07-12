[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [Record](../README.md) / collect

# Function: collect()

Transforms the values of a record into an `Array` with a custom mapping function.

## Param

The record to transform.

## Param

The custom mapping function to apply to each key/value of the record.

## Example

```ts
import { collect } from "effect/Record"

const x = { a: 1, b: 2, c: 3 }
assert.deepStrictEqual(collect(x, (key, n) => [key, n]), [["a", 1], ["b", 2], ["c", 3]])
```

## Since

2.0.0

## collect(f)

> **collect**\<`K`, `A`, `B`\>(`f`): (`self`) => `B`[]

Transforms the values of a record into an `Array` with a custom mapping function.

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

`B`[]

### Param

The record to transform.

### Param

The custom mapping function to apply to each key/value of the record.

### Example

```ts
import { collect } from "effect/Record"

const x = { a: 1, b: 2, c: 3 }
assert.deepStrictEqual(collect(x, (key, n) => [key, n]), [["a", 1], ["b", 2], ["c", 3]])
```

### Since

2.0.0

## collect(self, f)

> **collect**\<`K`, `A`, `B`\>(`self`, `f`): `B`[]

Transforms the values of a record into an `Array` with a custom mapping function.

### Type Parameters

• **K** *extends* `string`

• **A**

• **B**

### Parameters

• **self**: [`ReadonlyRecord`](../type-aliases/ReadonlyRecord.md)\<`K`, `A`\>

• **f**

### Returns

`B`[]

### Param

The record to transform.

### Param

The custom mapping function to apply to each key/value of the record.

### Example

```ts
import { collect } from "effect/Record"

const x = { a: 1, b: 2, c: 3 }
assert.deepStrictEqual(collect(x, (key, n) => [key, n]), [["a", 1], ["b", 2], ["c", 3]])
```

### Since

2.0.0
