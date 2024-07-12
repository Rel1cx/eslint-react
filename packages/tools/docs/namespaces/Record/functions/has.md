[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [Record](../README.md) / has

# Function: has()

Check if a given `key` exists in a record.

## Param

the record to look in.

## Param

the key to look for in the record.

## Example

```ts
import { empty, has } from "effect/Record"

assert.deepStrictEqual(has({ a: 1, b: 2 }, "a"), true);
assert.deepStrictEqual(has(empty<string>(), "c"), false);
```

## Since

2.0.0

## has(key)

> **has**\<`K`\>(`key`): \<`A`\>(`self`) => `boolean`

Check if a given `key` exists in a record.

### Type Parameters

• **K** *extends* `string` \| `symbol`

### Parameters

• **key**: `NoInfer`\<`K`\>

### Returns

`Function`

#### Type Parameters

• **A**

#### Parameters

• **self**: [`ReadonlyRecord`](../type-aliases/ReadonlyRecord.md)\<`K`, `A`\>

#### Returns

`boolean`

### Param

the record to look in.

### Param

the key to look for in the record.

### Example

```ts
import { empty, has } from "effect/Record"

assert.deepStrictEqual(has({ a: 1, b: 2 }, "a"), true);
assert.deepStrictEqual(has(empty<string>(), "c"), false);
```

### Since

2.0.0

## has(self, key)

> **has**\<`K`, `A`\>(`self`, `key`): `boolean`

Check if a given `key` exists in a record.

### Type Parameters

• **K** *extends* `string` \| `symbol`

• **A**

### Parameters

• **self**: [`ReadonlyRecord`](../type-aliases/ReadonlyRecord.md)\<`K`, `A`\>

• **key**: `NoInfer`\<`K`\>

### Returns

`boolean`

### Param

the record to look in.

### Param

the key to look for in the record.

### Example

```ts
import { empty, has } from "effect/Record"

assert.deepStrictEqual(has({ a: 1, b: 2 }, "a"), true);
assert.deepStrictEqual(has(empty<string>(), "c"), false);
```

### Since

2.0.0
