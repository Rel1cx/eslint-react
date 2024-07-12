[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [Record](../README.md) / mapEntries

# Function: mapEntries()

Maps entries of a `ReadonlyRecord` using the provided function, allowing modification of both keys and corresponding values.

## Example

```ts
import { mapEntries } from "effect/Record"

assert.deepStrictEqual(mapEntries({ a: 3, b: 5 }, (a, key) => [key.toUpperCase(), a + 1]), { A: 4, B: 6 })
```

## Since

2.0.0

## mapEntries(f)

> **mapEntries**\<`K`, `A`, `K2`, `B`\>(`f`): (`self`) => `Record`\<`K2`, `B`\>

Maps entries of a `ReadonlyRecord` using the provided function, allowing modification of both keys and corresponding values.

### Type Parameters

• **K** *extends* `string`

• **A**

• **K2** *extends* `string`

• **B**

### Parameters

• **f**

### Returns

`Function`

#### Parameters

• **self**: [`ReadonlyRecord`](../type-aliases/ReadonlyRecord.md)\<`K`, `A`\>

#### Returns

`Record`\<`K2`, `B`\>

### Example

```ts
import { mapEntries } from "effect/Record"

assert.deepStrictEqual(mapEntries({ a: 3, b: 5 }, (a, key) => [key.toUpperCase(), a + 1]), { A: 4, B: 6 })
```

### Since

2.0.0

## mapEntries(self, f)

> **mapEntries**\<`K`, `A`, `K2`, `B`\>(`self`, `f`): `Record`\<`K2`, `B`\>

Maps entries of a `ReadonlyRecord` using the provided function, allowing modification of both keys and corresponding values.

### Type Parameters

• **K** *extends* `string`

• **A**

• **K2** *extends* `string`

• **B**

### Parameters

• **self**: [`ReadonlyRecord`](../type-aliases/ReadonlyRecord.md)\<`K`, `A`\>

• **f**

### Returns

`Record`\<`K2`, `B`\>

### Example

```ts
import { mapEntries } from "effect/Record"

assert.deepStrictEqual(mapEntries({ a: 3, b: 5 }, (a, key) => [key.toUpperCase(), a + 1]), { A: 4, B: 6 })
```

### Since

2.0.0
