[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [Record](../README.md) / filterMap

# Function: filterMap()

Transforms a record into a record by applying the function `f` to each key and value in the original record.
If the function returns `Some`, the key-value pair is included in the output record.

## Param

The input record.

## Param

The transformation function.

## Example

```ts
import { Record, Option } from "effect"

const x = { a: 1, b: 2, c: 3 }
const f = (a: number, key: string) => a > 2 ? Option.some(a * 2) : Option.none()
assert.deepStrictEqual(Record.filterMap(x, f), { c: 6 })
```

## Since

2.0.0

## filterMap(f)

> **filterMap**\<`K`, `A`, `B`\>(`f`): (`self`) => `Record`\<[`NonLiteralKey`](../namespaces/ReadonlyRecord/type-aliases/NonLiteralKey.md)\<`K`\>, `B`\>

Transforms a record into a record by applying the function `f` to each key and value in the original record.
If the function returns `Some`, the key-value pair is included in the output record.

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

`Record`\<[`NonLiteralKey`](../namespaces/ReadonlyRecord/type-aliases/NonLiteralKey.md)\<`K`\>, `B`\>

### Param

The input record.

### Param

The transformation function.

### Example

```ts
import { Record, Option } from "effect"

const x = { a: 1, b: 2, c: 3 }
const f = (a: number, key: string) => a > 2 ? Option.some(a * 2) : Option.none()
assert.deepStrictEqual(Record.filterMap(x, f), { c: 6 })
```

### Since

2.0.0

## filterMap(self, f)

> **filterMap**\<`K`, `A`, `B`\>(`self`, `f`): `Record`\<[`NonLiteralKey`](../namespaces/ReadonlyRecord/type-aliases/NonLiteralKey.md)\<`K`\>, `B`\>

Transforms a record into a record by applying the function `f` to each key and value in the original record.
If the function returns `Some`, the key-value pair is included in the output record.

### Type Parameters

• **K** *extends* `string`

• **A**

• **B**

### Parameters

• **self**: [`ReadonlyRecord`](../type-aliases/ReadonlyRecord.md)\<`K`, `A`\>

• **f**

### Returns

`Record`\<[`NonLiteralKey`](../namespaces/ReadonlyRecord/type-aliases/NonLiteralKey.md)\<`K`\>, `B`\>

### Param

The input record.

### Param

The transformation function.

### Example

```ts
import { Record, Option } from "effect"

const x = { a: 1, b: 2, c: 3 }
const f = (a: number, key: string) => a > 2 ? Option.some(a * 2) : Option.none()
assert.deepStrictEqual(Record.filterMap(x, f), { c: 6 })
```

### Since

2.0.0
