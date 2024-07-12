[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [Record](../README.md) / remove

# Function: remove()

If the given key exists in the record, returns a new record with the key removed,
otherwise returns a copy of the original record.

## Param

the record to remove the key from.

## Param

the key to remove from the record.

## Example

```ts
import { remove } from "effect/Record"

assert.deepStrictEqual(remove({ a: 1, b: 2 }, "a"), { b: 2 })
```

## Since

2.0.0

## remove(key)

> **remove**\<`K`, `X`\>(`key`): \<`A`\>(`self`) => `Record`\<`Exclude`\<`K`, `X`\>, `A`\>

If the given key exists in the record, returns a new record with the key removed,
otherwise returns a copy of the original record.

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

`Record`\<`Exclude`\<`K`, `X`\>, `A`\>

### Param

the record to remove the key from.

### Param

the key to remove from the record.

### Example

```ts
import { remove } from "effect/Record"

assert.deepStrictEqual(remove({ a: 1, b: 2 }, "a"), { b: 2 })
```

### Since

2.0.0

## remove(self, key)

> **remove**\<`K`, `A`, `X`\>(`self`, `key`): `Record`\<`Exclude`\<`K`, `X`\>, `A`\>

If the given key exists in the record, returns a new record with the key removed,
otherwise returns a copy of the original record.

### Type Parameters

• **K** *extends* `string` \| `symbol`

• **A**

• **X** *extends* `string` \| `symbol`

### Parameters

• **self**: [`ReadonlyRecord`](../type-aliases/ReadonlyRecord.md)\<`K`, `A`\>

• **key**: `X`

### Returns

`Record`\<`Exclude`\<`K`, `X`\>, `A`\>

### Param

the record to remove the key from.

### Param

the key to remove from the record.

### Example

```ts
import { remove } from "effect/Record"

assert.deepStrictEqual(remove({ a: 1, b: 2 }, "a"), { b: 2 })
```

### Since

2.0.0
