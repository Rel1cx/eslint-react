[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [Record](../README.md) / modify

# Function: modify()

Apply a function to the element at the specified key, creating a new record.
If the key does not exist, the record is returned unchanged.

## Param

The record to be updated.

## Param

The key of the element to modify.

## Param

The function to apply to the element.

## Example

```ts
import { Record as R } from "effect"

const f = (x: number) => x * 2

assert.deepStrictEqual(
 R.modify({ a: 3 }, 'a', f),
 { a: 6 }
)
assert.deepStrictEqual(
 R.modify({ a: 3 } as Record<string, number>, 'b', f),
 { a: 3 }
)
```

## Since

2.0.0

## modify(key, f)

> **modify**\<`K`, `A`, `B`\>(`key`, `f`): (`self`) => `Record`\<`K`, `A` \| `B`\>

Apply a function to the element at the specified key, creating a new record.
If the key does not exist, the record is returned unchanged.

### Type Parameters

• **K** *extends* `string` \| `symbol`

• **A**

• **B**

### Parameters

• **key**: `NoInfer`\<`K`\>

• **f**

### Returns

`Function`

#### Parameters

• **self**: [`ReadonlyRecord`](../type-aliases/ReadonlyRecord.md)\<`K`, `A`\>

#### Returns

`Record`\<`K`, `A` \| `B`\>

### Param

The record to be updated.

### Param

The key of the element to modify.

### Param

The function to apply to the element.

### Example

```ts
import { Record as R } from "effect"

const f = (x: number) => x * 2

assert.deepStrictEqual(
 R.modify({ a: 3 }, 'a', f),
 { a: 6 }
)
assert.deepStrictEqual(
 R.modify({ a: 3 } as Record<string, number>, 'b', f),
 { a: 3 }
)
```

### Since

2.0.0

## modify(self, key, f)

> **modify**\<`K`, `A`, `B`\>(`self`, `key`, `f`): `Record`\<`K`, `A` \| `B`\>

Apply a function to the element at the specified key, creating a new record.
If the key does not exist, the record is returned unchanged.

### Type Parameters

• **K** *extends* `string` \| `symbol`

• **A**

• **B**

### Parameters

• **self**: [`ReadonlyRecord`](../type-aliases/ReadonlyRecord.md)\<`K`, `A`\>

• **key**: `NoInfer`\<`K`\>

• **f**

### Returns

`Record`\<`K`, `A` \| `B`\>

### Param

The record to be updated.

### Param

The key of the element to modify.

### Param

The function to apply to the element.

### Example

```ts
import { Record as R } from "effect"

const f = (x: number) => x * 2

assert.deepStrictEqual(
 R.modify({ a: 3 }, 'a', f),
 { a: 6 }
)
assert.deepStrictEqual(
 R.modify({ a: 3 } as Record<string, number>, 'b', f),
 { a: 3 }
)
```

### Since

2.0.0
