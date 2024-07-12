[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [Record](../README.md) / mapKeys

# Function: mapKeys()

Maps the keys of a `ReadonlyRecord` while preserving the corresponding values.

## Example

```ts
import { mapKeys } from "effect/Record"

assert.deepStrictEqual(mapKeys({ a: 3, b: 5 }, (key) => key.toUpperCase()), { A: 3, B: 5 })
```

## Since

2.0.0

## mapKeys(f)

> **mapKeys**\<`K`, `A`, `K2`\>(`f`): (`self`) => `Record`\<`K2`, `A`\>

Maps the keys of a `ReadonlyRecord` while preserving the corresponding values.

### Type Parameters

• **K** *extends* `string`

• **A**

• **K2** *extends* `string`

### Parameters

• **f**

### Returns

`Function`

#### Parameters

• **self**: [`ReadonlyRecord`](../type-aliases/ReadonlyRecord.md)\<`K`, `A`\>

#### Returns

`Record`\<`K2`, `A`\>

### Example

```ts
import { mapKeys } from "effect/Record"

assert.deepStrictEqual(mapKeys({ a: 3, b: 5 }, (key) => key.toUpperCase()), { A: 3, B: 5 })
```

### Since

2.0.0

## mapKeys(self, f)

> **mapKeys**\<`K`, `A`, `K2`\>(`self`, `f`): `Record`\<`K2`, `A`\>

Maps the keys of a `ReadonlyRecord` while preserving the corresponding values.

### Type Parameters

• **K** *extends* `string`

• **A**

• **K2** *extends* `string`

### Parameters

• **self**: [`ReadonlyRecord`](../type-aliases/ReadonlyRecord.md)\<`K`, `A`\>

• **f**

### Returns

`Record`\<`K2`, `A`\>

### Example

```ts
import { mapKeys } from "effect/Record"

assert.deepStrictEqual(mapKeys({ a: 3, b: 5 }, (key) => key.toUpperCase()), { A: 3, B: 5 })
```

### Since

2.0.0
