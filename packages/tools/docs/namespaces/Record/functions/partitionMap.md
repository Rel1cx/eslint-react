[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [Record](../README.md) / partitionMap

# Function: partitionMap()

Partitions the elements of a record into two groups: those that match a predicate, and those that don't.

## Param

The record to partition.

## Param

The predicate function to apply to each element.

## Example

```ts
import { Record, Either } from "effect"

const x = { a: 1, b: 2, c: 3 }
const f = (n: number) => (n % 2 === 0 ? Either.right(n) : Either.left(n))
assert.deepStrictEqual(Record.partitionMap(x, f), [{ a: 1, c: 3 }, { b: 2}])
```

## Since

2.0.0

## partitionMap(f)

> **partitionMap**\<`K`, `A`, `B`, `C`\>(`f`): (`self`) => [`Record`\<[`NonLiteralKey`](../namespaces/ReadonlyRecord/type-aliases/NonLiteralKey.md)\<`K`\>, `B`\>, `Record`\<[`NonLiteralKey`](../namespaces/ReadonlyRecord/type-aliases/NonLiteralKey.md)\<`K`\>, `C`\>]

Partitions the elements of a record into two groups: those that match a predicate, and those that don't.

### Type Parameters

• **K** *extends* `string`

• **A**

• **B**

• **C**

### Parameters

• **f**

### Returns

`Function`

#### Parameters

• **self**: [`ReadonlyRecord`](../type-aliases/ReadonlyRecord.md)\<`K`, `A`\>

#### Returns

[`Record`\<[`NonLiteralKey`](../namespaces/ReadonlyRecord/type-aliases/NonLiteralKey.md)\<`K`\>, `B`\>, `Record`\<[`NonLiteralKey`](../namespaces/ReadonlyRecord/type-aliases/NonLiteralKey.md)\<`K`\>, `C`\>]

### Param

The record to partition.

### Param

The predicate function to apply to each element.

### Example

```ts
import { Record, Either } from "effect"

const x = { a: 1, b: 2, c: 3 }
const f = (n: number) => (n % 2 === 0 ? Either.right(n) : Either.left(n))
assert.deepStrictEqual(Record.partitionMap(x, f), [{ a: 1, c: 3 }, { b: 2}])
```

### Since

2.0.0

## partitionMap(self, f)

> **partitionMap**\<`K`, `A`, `B`, `C`\>(`self`, `f`): [`Record`\<[`NonLiteralKey`](../namespaces/ReadonlyRecord/type-aliases/NonLiteralKey.md)\<`K`\>, `B`\>, `Record`\<[`NonLiteralKey`](../namespaces/ReadonlyRecord/type-aliases/NonLiteralKey.md)\<`K`\>, `C`\>]

Partitions the elements of a record into two groups: those that match a predicate, and those that don't.

### Type Parameters

• **K** *extends* `string`

• **A**

• **B**

• **C**

### Parameters

• **self**: [`ReadonlyRecord`](../type-aliases/ReadonlyRecord.md)\<`K`, `A`\>

• **f**

### Returns

[`Record`\<[`NonLiteralKey`](../namespaces/ReadonlyRecord/type-aliases/NonLiteralKey.md)\<`K`\>, `B`\>, `Record`\<[`NonLiteralKey`](../namespaces/ReadonlyRecord/type-aliases/NonLiteralKey.md)\<`K`\>, `C`\>]

### Param

The record to partition.

### Param

The predicate function to apply to each element.

### Example

```ts
import { Record, Either } from "effect"

const x = { a: 1, b: 2, c: 3 }
const f = (n: number) => (n % 2 === 0 ? Either.right(n) : Either.left(n))
assert.deepStrictEqual(Record.partitionMap(x, f), [{ a: 1, c: 3 }, { b: 2}])
```

### Since

2.0.0
