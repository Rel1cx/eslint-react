[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [Record](../README.md) / filter

# Function: filter()

Selects properties from a record whose values match the given predicate.

## Param

The record to filter.

## Param

A function that returns a `boolean` value to determine if the entry should be included in the new record.

## Example

```ts
import { filter } from "effect/Record"

const x = { a: 1, b: 2, c: 3, d: 4 }
assert.deepStrictEqual(filter(x, (n) => n > 2), { c: 3, d: 4 })
```

## Since

2.0.0

## filter(refinement)

> **filter**\<`K`, `A`, `B`\>(`refinement`): (`self`) => `Record`\<[`NonLiteralKey`](../namespaces/ReadonlyRecord/type-aliases/NonLiteralKey.md)\<`K`\>, `B`\>

Selects properties from a record whose values match the given predicate.

### Type Parameters

• **K** *extends* `string`

• **A**

• **B**

### Parameters

• **refinement**

### Returns

`Function`

#### Parameters

• **self**: [`ReadonlyRecord`](../type-aliases/ReadonlyRecord.md)\<`K`, `A`\>

#### Returns

`Record`\<[`NonLiteralKey`](../namespaces/ReadonlyRecord/type-aliases/NonLiteralKey.md)\<`K`\>, `B`\>

### Param

The record to filter.

### Param

A function that returns a `boolean` value to determine if the entry should be included in the new record.

### Example

```ts
import { filter } from "effect/Record"

const x = { a: 1, b: 2, c: 3, d: 4 }
assert.deepStrictEqual(filter(x, (n) => n > 2), { c: 3, d: 4 })
```

### Since

2.0.0

## filter(predicate)

> **filter**\<`K`, `A`\>(`predicate`): (`self`) => `Record`\<[`NonLiteralKey`](../namespaces/ReadonlyRecord/type-aliases/NonLiteralKey.md)\<`K`\>, `A`\>

Selects properties from a record whose values match the given predicate.

### Type Parameters

• **K** *extends* `string`

• **A**

### Parameters

• **predicate**

### Returns

`Function`

#### Parameters

• **self**: [`ReadonlyRecord`](../type-aliases/ReadonlyRecord.md)\<`K`, `A`\>

#### Returns

`Record`\<[`NonLiteralKey`](../namespaces/ReadonlyRecord/type-aliases/NonLiteralKey.md)\<`K`\>, `A`\>

### Param

The record to filter.

### Param

A function that returns a `boolean` value to determine if the entry should be included in the new record.

### Example

```ts
import { filter } from "effect/Record"

const x = { a: 1, b: 2, c: 3, d: 4 }
assert.deepStrictEqual(filter(x, (n) => n > 2), { c: 3, d: 4 })
```

### Since

2.0.0

## filter(self, refinement)

> **filter**\<`K`, `A`, `B`\>(`self`, `refinement`): `Record`\<[`NonLiteralKey`](../namespaces/ReadonlyRecord/type-aliases/NonLiteralKey.md)\<`K`\>, `B`\>

Selects properties from a record whose values match the given predicate.

### Type Parameters

• **K** *extends* `string`

• **A**

• **B**

### Parameters

• **self**: [`ReadonlyRecord`](../type-aliases/ReadonlyRecord.md)\<`K`, `A`\>

• **refinement**

### Returns

`Record`\<[`NonLiteralKey`](../namespaces/ReadonlyRecord/type-aliases/NonLiteralKey.md)\<`K`\>, `B`\>

### Param

The record to filter.

### Param

A function that returns a `boolean` value to determine if the entry should be included in the new record.

### Example

```ts
import { filter } from "effect/Record"

const x = { a: 1, b: 2, c: 3, d: 4 }
assert.deepStrictEqual(filter(x, (n) => n > 2), { c: 3, d: 4 })
```

### Since

2.0.0

## filter(self, predicate)

> **filter**\<`K`, `A`\>(`self`, `predicate`): `Record`\<[`NonLiteralKey`](../namespaces/ReadonlyRecord/type-aliases/NonLiteralKey.md)\<`K`\>, `A`\>

Selects properties from a record whose values match the given predicate.

### Type Parameters

• **K** *extends* `string`

• **A**

### Parameters

• **self**: [`ReadonlyRecord`](../type-aliases/ReadonlyRecord.md)\<`K`, `A`\>

• **predicate**

### Returns

`Record`\<[`NonLiteralKey`](../namespaces/ReadonlyRecord/type-aliases/NonLiteralKey.md)\<`K`\>, `A`\>

### Param

The record to filter.

### Param

A function that returns a `boolean` value to determine if the entry should be included in the new record.

### Example

```ts
import { filter } from "effect/Record"

const x = { a: 1, b: 2, c: 3, d: 4 }
assert.deepStrictEqual(filter(x, (n) => n > 2), { c: 3, d: 4 })
```

### Since

2.0.0
