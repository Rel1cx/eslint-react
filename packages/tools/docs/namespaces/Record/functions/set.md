[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [Record](../README.md) / set

# Function: set()

Add a new key-value pair or update an existing key's value in a record.

## Param

The record to which you want to add or update a key-value pair.

## Param

The key you want to add or update.

## Param

The value you want to associate with the key.

## Example

```ts
import { set } from "effect/Record"

assert.deepStrictEqual(set("a", 5)({ a: 1, b: 2 }), { a: 5, b: 2 });
assert.deepStrictEqual(set("c", 5)({ a: 1, b: 2 }), { a: 1, b: 2, c: 5 });
```

## Since

2.0.0

## set(key, value)

> **set**\<`K`, `K1`, `B`\>(`key`, `value`): \<`A`\>(`self`) => `Record`\<`K` \| `K1`, `B` \| `A`\>

Add a new key-value pair or update an existing key's value in a record.

### Type Parameters

• **K** *extends* `string` \| `symbol`

• **K1** *extends* `string` \| `symbol`

• **B**

### Parameters

• **key**: `K1`

• **value**: `B`

### Returns

`Function`

#### Type Parameters

• **A**

#### Parameters

• **self**: [`ReadonlyRecord`](../type-aliases/ReadonlyRecord.md)\<`K`, `A`\>

#### Returns

`Record`\<`K` \| `K1`, `B` \| `A`\>

### Param

The record to which you want to add or update a key-value pair.

### Param

The key you want to add or update.

### Param

The value you want to associate with the key.

### Example

```ts
import { set } from "effect/Record"

assert.deepStrictEqual(set("a", 5)({ a: 1, b: 2 }), { a: 5, b: 2 });
assert.deepStrictEqual(set("c", 5)({ a: 1, b: 2 }), { a: 1, b: 2, c: 5 });
```

### Since

2.0.0

## set(self, key, value)

> **set**\<`K`, `A`, `K1`, `B`\>(`self`, `key`, `value`): `Record`\<`K` \| `K1`, `A` \| `B`\>

Add a new key-value pair or update an existing key's value in a record.

### Type Parameters

• **K** *extends* `string` \| `symbol`

• **A**

• **K1** *extends* `string` \| `symbol`

• **B**

### Parameters

• **self**: [`ReadonlyRecord`](../type-aliases/ReadonlyRecord.md)\<`K`, `A`\>

• **key**: `K1`

• **value**: `B`

### Returns

`Record`\<`K` \| `K1`, `A` \| `B`\>

### Param

The record to which you want to add or update a key-value pair.

### Param

The key you want to add or update.

### Param

The value you want to associate with the key.

### Example

```ts
import { set } from "effect/Record"

assert.deepStrictEqual(set("a", 5)({ a: 1, b: 2 }), { a: 5, b: 2 });
assert.deepStrictEqual(set("c", 5)({ a: 1, b: 2 }), { a: 1, b: 2, c: 5 });
```

### Since

2.0.0
