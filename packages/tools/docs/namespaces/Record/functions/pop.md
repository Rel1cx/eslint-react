[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [Record](../README.md) / pop

# Function: pop()

Retrieves the value of the property with the given `key` from a record and returns an `Option`
of a tuple with the value and the record with the removed property.
If the key is not present, returns `O.none`.

## Param

The input record.

## Param

The key of the property to retrieve.

## Example

```ts
import { Record as R, Option } from "effect"

assert.deepStrictEqual(R.pop({ a: 1, b: 2 }, "a"), Option.some([1, { b: 2 }]))
assert.deepStrictEqual(R.pop({ a: 1, b: 2 } as Record<string, number>, "c"), Option.none())
```

## Since

2.0.0

## pop(key)

> **pop**\<`K`, `X`\>(`key`): \<`A`\>(`self`) => [`Option`](../../O/type-aliases/Option.md)\<[`A`, `Record`\<`Exclude`\<`K`, `X`\>, `A`\>]\>

Retrieves the value of the property with the given `key` from a record and returns an `Option`
of a tuple with the value and the record with the removed property.
If the key is not present, returns `O.none`.

### Type Parameters

• **K** *extends* `string` \| `symbol`

• **X** *extends* `string` \| `symbol`

### Parameters

• **key**: `X`

### Returns

`Function`

#### Type Parameters

• **A**

#### Parameters

• **self**: [`ReadonlyRecord`](../type-aliases/ReadonlyRecord.md)\<`K`, `A`\>

#### Returns

[`Option`](../../O/type-aliases/Option.md)\<[`A`, `Record`\<`Exclude`\<`K`, `X`\>, `A`\>]\>

### Param

The input record.

### Param

The key of the property to retrieve.

### Example

```ts
import { Record as R, Option } from "effect"

assert.deepStrictEqual(R.pop({ a: 1, b: 2 }, "a"), Option.some([1, { b: 2 }]))
assert.deepStrictEqual(R.pop({ a: 1, b: 2 } as Record<string, number>, "c"), Option.none())
```

### Since

2.0.0

## pop(self, key)

> **pop**\<`K`, `A`, `X`\>(`self`, `key`): [`Option`](../../O/type-aliases/Option.md)\<[`A`, `Record`\<`Exclude`\<`K`, `X`\>, `A`\>]\>

Retrieves the value of the property with the given `key` from a record and returns an `Option`
of a tuple with the value and the record with the removed property.
If the key is not present, returns `O.none`.

### Type Parameters

• **K** *extends* `string` \| `symbol`

• **A**

• **X** *extends* `string` \| `symbol`

### Parameters

• **self**: [`ReadonlyRecord`](../type-aliases/ReadonlyRecord.md)\<`K`, `A`\>

• **key**: `X`

### Returns

[`Option`](../../O/type-aliases/Option.md)\<[`A`, `Record`\<`Exclude`\<`K`, `X`\>, `A`\>]\>

### Param

The input record.

### Param

The key of the property to retrieve.

### Example

```ts
import { Record as R, Option } from "effect"

assert.deepStrictEqual(R.pop({ a: 1, b: 2 }, "a"), Option.some([1, { b: 2 }]))
assert.deepStrictEqual(R.pop({ a: 1, b: 2 } as Record<string, number>, "c"), Option.none())
```

### Since

2.0.0
