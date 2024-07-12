[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [Record](../README.md) / replace

# Function: replace()

Replace a key's value in a record and return the updated record.
If the key does not exist in the record, a copy of the original record is returned.

## Param

The original record.

## Param

The key to replace.

## Param

The new value to associate with the key.

## Example

```ts
import { Record } from "effect"

assert.deepStrictEqual(Record.replace("a", 3)({ a: 1, b: 2 }), { a: 3, b: 2 });
assert.deepStrictEqual(Record.replace("c", 3)({ a: 1, b: 2 }), { a: 1, b: 2 });
```

## Since

2.0.0

## replace(key, value)

> **replace**\<`K`, `B`\>(`key`, `value`): \<`A`\>(`self`) => `Record`\<`K`, `B` \| `A`\>

Replace a key's value in a record and return the updated record.
If the key does not exist in the record, a copy of the original record is returned.

### Type Parameters

• **K** *extends* `string` \| `symbol`

• **B**

### Parameters

• **key**: `NoInfer`\<`K`\>

• **value**: `B`

### Returns

`Function`

#### Type Parameters

• **A**

#### Parameters

• **self**: [`ReadonlyRecord`](../type-aliases/ReadonlyRecord.md)\<`K`, `A`\>

#### Returns

`Record`\<`K`, `B` \| `A`\>

### Param

The original record.

### Param

The key to replace.

### Param

The new value to associate with the key.

### Example

```ts
import { Record } from "effect"

assert.deepStrictEqual(Record.replace("a", 3)({ a: 1, b: 2 }), { a: 3, b: 2 });
assert.deepStrictEqual(Record.replace("c", 3)({ a: 1, b: 2 }), { a: 1, b: 2 });
```

### Since

2.0.0

## replace(self, key, value)

> **replace**\<`K`, `A`, `B`\>(`self`, `key`, `value`): `Record`\<`K`, `A` \| `B`\>

Replace a key's value in a record and return the updated record.
If the key does not exist in the record, a copy of the original record is returned.

### Type Parameters

• **K** *extends* `string` \| `symbol`

• **A**

• **B**

### Parameters

• **self**: [`ReadonlyRecord`](../type-aliases/ReadonlyRecord.md)\<`K`, `A`\>

• **key**: `NoInfer`\<`K`\>

• **value**: `B`

### Returns

`Record`\<`K`, `A` \| `B`\>

### Param

The original record.

### Param

The key to replace.

### Param

The new value to associate with the key.

### Example

```ts
import { Record } from "effect"

assert.deepStrictEqual(Record.replace("a", 3)({ a: 1, b: 2 }), { a: 3, b: 2 });
assert.deepStrictEqual(Record.replace("c", 3)({ a: 1, b: 2 }), { a: 1, b: 2 });
```

### Since

2.0.0
