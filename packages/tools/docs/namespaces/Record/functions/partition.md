[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [Record](../README.md) / partition

# Function: partition()

Partitions a record into two separate records based on the result of a predicate function.

## Param

The input record to partition.

## Param

The partitioning function to determine the partitioning of each value of the record.

## Example

```ts
import { partition } from "effect/Record"

assert.deepStrictEqual(
  partition({ a: 1, b: 3 }, (n) => n > 2),
  [{ a: 1 }, { b: 3 }]
)
```

## Since

2.0.0

## partition(refinement)

> **partition**\<`K`, `A`, `B`\>(`refinement`): (`self`) => [`Record`\<[`NonLiteralKey`](../namespaces/ReadonlyRecord/type-aliases/NonLiteralKey.md)\<`K`\>, `Exclude`\<`A`, `B`\>\>, `Record`\<[`NonLiteralKey`](../namespaces/ReadonlyRecord/type-aliases/NonLiteralKey.md)\<`K`\>, `B`\>]

Partitions a record into two separate records based on the result of a predicate function.

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

[`Record`\<[`NonLiteralKey`](../namespaces/ReadonlyRecord/type-aliases/NonLiteralKey.md)\<`K`\>, `Exclude`\<`A`, `B`\>\>, `Record`\<[`NonLiteralKey`](../namespaces/ReadonlyRecord/type-aliases/NonLiteralKey.md)\<`K`\>, `B`\>]

### Param

The input record to partition.

### Param

The partitioning function to determine the partitioning of each value of the record.

### Example

```ts
import { partition } from "effect/Record"

assert.deepStrictEqual(
  partition({ a: 1, b: 3 }, (n) => n > 2),
  [{ a: 1 }, { b: 3 }]
)
```

### Since

2.0.0

## partition(predicate)

> **partition**\<`K`, `A`\>(`predicate`): (`self`) => [`Record`\<[`NonLiteralKey`](../namespaces/ReadonlyRecord/type-aliases/NonLiteralKey.md)\<`K`\>, `A`\>, `Record`\<[`NonLiteralKey`](../namespaces/ReadonlyRecord/type-aliases/NonLiteralKey.md)\<`K`\>, `A`\>]

Partitions a record into two separate records based on the result of a predicate function.

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

[`Record`\<[`NonLiteralKey`](../namespaces/ReadonlyRecord/type-aliases/NonLiteralKey.md)\<`K`\>, `A`\>, `Record`\<[`NonLiteralKey`](../namespaces/ReadonlyRecord/type-aliases/NonLiteralKey.md)\<`K`\>, `A`\>]

### Param

The input record to partition.

### Param

The partitioning function to determine the partitioning of each value of the record.

### Example

```ts
import { partition } from "effect/Record"

assert.deepStrictEqual(
  partition({ a: 1, b: 3 }, (n) => n > 2),
  [{ a: 1 }, { b: 3 }]
)
```

### Since

2.0.0

## partition(self, refinement)

> **partition**\<`K`, `A`, `B`\>(`self`, `refinement`): [`Record`\<[`NonLiteralKey`](../namespaces/ReadonlyRecord/type-aliases/NonLiteralKey.md)\<`K`\>, `Exclude`\<`A`, `B`\>\>, `Record`\<[`NonLiteralKey`](../namespaces/ReadonlyRecord/type-aliases/NonLiteralKey.md)\<`K`\>, `B`\>]

Partitions a record into two separate records based on the result of a predicate function.

### Type Parameters

• **K** *extends* `string`

• **A**

• **B**

### Parameters

• **self**: [`ReadonlyRecord`](../type-aliases/ReadonlyRecord.md)\<`K`, `A`\>

• **refinement**

### Returns

[`Record`\<[`NonLiteralKey`](../namespaces/ReadonlyRecord/type-aliases/NonLiteralKey.md)\<`K`\>, `Exclude`\<`A`, `B`\>\>, `Record`\<[`NonLiteralKey`](../namespaces/ReadonlyRecord/type-aliases/NonLiteralKey.md)\<`K`\>, `B`\>]

### Param

The input record to partition.

### Param

The partitioning function to determine the partitioning of each value of the record.

### Example

```ts
import { partition } from "effect/Record"

assert.deepStrictEqual(
  partition({ a: 1, b: 3 }, (n) => n > 2),
  [{ a: 1 }, { b: 3 }]
)
```

### Since

2.0.0

## partition(self, predicate)

> **partition**\<`K`, `A`\>(`self`, `predicate`): [`Record`\<[`NonLiteralKey`](../namespaces/ReadonlyRecord/type-aliases/NonLiteralKey.md)\<`K`\>, `A`\>, `Record`\<[`NonLiteralKey`](../namespaces/ReadonlyRecord/type-aliases/NonLiteralKey.md)\<`K`\>, `A`\>]

Partitions a record into two separate records based on the result of a predicate function.

### Type Parameters

• **K** *extends* `string`

• **A**

### Parameters

• **self**: [`ReadonlyRecord`](../type-aliases/ReadonlyRecord.md)\<`K`, `A`\>

• **predicate**

### Returns

[`Record`\<[`NonLiteralKey`](../namespaces/ReadonlyRecord/type-aliases/NonLiteralKey.md)\<`K`\>, `A`\>, `Record`\<[`NonLiteralKey`](../namespaces/ReadonlyRecord/type-aliases/NonLiteralKey.md)\<`K`\>, `A`\>]

### Param

The input record to partition.

### Param

The partitioning function to determine the partitioning of each value of the record.

### Example

```ts
import { partition } from "effect/Record"

assert.deepStrictEqual(
  partition({ a: 1, b: 3 }, (n) => n > 2),
  [{ a: 1 }, { b: 3 }]
)
```

### Since

2.0.0
