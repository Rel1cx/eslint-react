[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [Record](../README.md) / replaceOption

# Function: replaceOption()

Replaces a value in the record with the new value passed as parameter.

## Param

The record to be updated.

## Param

The key to search for in the record.

## Param

The new value to replace the existing value with.

## Example

```ts
import { Record, Option } from "effect"

assert.deepStrictEqual(
  Record.replaceOption({ a: 1, b: 2, c: 3 }, 'a', 10),
  Option.some({ a: 10, b: 2, c: 3 })
)
assert.deepStrictEqual(Record.replaceOption(Record.empty<string>(), 'a', 10), Option.none())
```

## Since

2.0.0

## replaceOption(key, b)

> **replaceOption**\<`K`, `B`\>(`key`, `b`): \<`A`\>(`self`) => [`Option`](../../O/type-aliases/Option.md)\<`Record`\<`K`, `B` \| `A`\>\>

Replaces a value in the record with the new value passed as parameter.

### Type Parameters

• **K** *extends* `string` \| `symbol`

• **B**

### Parameters

• **key**: `NoInfer`\<`K`\>

• **b**: `B`

### Returns

`Function`

#### Type Parameters

• **A**

#### Parameters

• **self**: [`ReadonlyRecord`](../type-aliases/ReadonlyRecord.md)\<`K`, `A`\>

#### Returns

[`Option`](../../O/type-aliases/Option.md)\<`Record`\<`K`, `B` \| `A`\>\>

### Param

The record to be updated.

### Param

The key to search for in the record.

### Param

The new value to replace the existing value with.

### Example

```ts
import { Record, Option } from "effect"

assert.deepStrictEqual(
  Record.replaceOption({ a: 1, b: 2, c: 3 }, 'a', 10),
  Option.some({ a: 10, b: 2, c: 3 })
)
assert.deepStrictEqual(Record.replaceOption(Record.empty<string>(), 'a', 10), Option.none())
```

### Since

2.0.0

## replaceOption(self, key, b)

> **replaceOption**\<`K`, `A`, `B`\>(`self`, `key`, `b`): [`Option`](../../O/type-aliases/Option.md)\<`Record`\<`K`, `A` \| `B`\>\>

Replaces a value in the record with the new value passed as parameter.

### Type Parameters

• **K** *extends* `string` \| `symbol`

• **A**

• **B**

### Parameters

• **self**: [`ReadonlyRecord`](../type-aliases/ReadonlyRecord.md)\<`K`, `A`\>

• **key**: `NoInfer`\<`K`\>

• **b**: `B`

### Returns

[`Option`](../../O/type-aliases/Option.md)\<`Record`\<`K`, `A` \| `B`\>\>

### Param

The record to be updated.

### Param

The key to search for in the record.

### Param

The new value to replace the existing value with.

### Example

```ts
import { Record, Option } from "effect"

assert.deepStrictEqual(
  Record.replaceOption({ a: 1, b: 2, c: 3 }, 'a', 10),
  Option.some({ a: 10, b: 2, c: 3 })
)
assert.deepStrictEqual(Record.replaceOption(Record.empty<string>(), 'a', 10), Option.none())
```

### Since

2.0.0
