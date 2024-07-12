[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [Record](../README.md) / fromIterableWith

# Function: fromIterableWith()

Takes an iterable and a projection function and returns a record.
The projection function maps each value of the iterable to a tuple of a key and a value, which is then added to the resulting record.

## Param

An iterable of values to be mapped to a record.

## Param

A projection function that maps values of the iterable to a tuple of a key and a value.

## Example

```ts
import { fromIterableWith } from "effect/Record"

const input = [1, 2, 3, 4]

assert.deepStrictEqual(
  fromIterableWith(input, a => [String(a), a * 2]),
  { '1': 2, '2': 4, '3': 6, '4': 8 }
)
```

## Since

2.0.0

## fromIterableWith(f)

> **fromIterableWith**\<`A`, `K`, `B`\>(`f`): (`self`) => `Record`\<[`NonLiteralKey`](../namespaces/ReadonlyRecord/type-aliases/NonLiteralKey.md)\<`K`\>, `B`\>

Takes an iterable and a projection function and returns a record.
The projection function maps each value of the iterable to a tuple of a key and a value, which is then added to the resulting record.

### Type Parameters

• **A**

• **K** *extends* `string` \| `symbol`

• **B**

### Parameters

• **f**

### Returns

`Function`

#### Parameters

• **self**: `Iterable`\<`A`\>

#### Returns

`Record`\<[`NonLiteralKey`](../namespaces/ReadonlyRecord/type-aliases/NonLiteralKey.md)\<`K`\>, `B`\>

### Param

An iterable of values to be mapped to a record.

### Param

A projection function that maps values of the iterable to a tuple of a key and a value.

### Example

```ts
import { fromIterableWith } from "effect/Record"

const input = [1, 2, 3, 4]

assert.deepStrictEqual(
  fromIterableWith(input, a => [String(a), a * 2]),
  { '1': 2, '2': 4, '3': 6, '4': 8 }
)
```

### Since

2.0.0

## fromIterableWith(self, f)

> **fromIterableWith**\<`A`, `K`, `B`\>(`self`, `f`): `Record`\<[`NonLiteralKey`](../namespaces/ReadonlyRecord/type-aliases/NonLiteralKey.md)\<`K`\>, `B`\>

Takes an iterable and a projection function and returns a record.
The projection function maps each value of the iterable to a tuple of a key and a value, which is then added to the resulting record.

### Type Parameters

• **A**

• **K** *extends* `string` \| `symbol`

• **B**

### Parameters

• **self**: `Iterable`\<`A`\>

• **f**

### Returns

`Record`\<[`NonLiteralKey`](../namespaces/ReadonlyRecord/type-aliases/NonLiteralKey.md)\<`K`\>, `B`\>

### Param

An iterable of values to be mapped to a record.

### Param

A projection function that maps values of the iterable to a tuple of a key and a value.

### Example

```ts
import { fromIterableWith } from "effect/Record"

const input = [1, 2, 3, 4]

assert.deepStrictEqual(
  fromIterableWith(input, a => [String(a), a * 2]),
  { '1': 2, '2': 4, '3': 6, '4': 8 }
)
```

### Since

2.0.0
