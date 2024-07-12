[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [Chunk](../README.md) / map

# Function: map()

Transforms the elements of a chunk using the specified mapping function.
If the input chunk is non-empty, the resulting chunk will also be non-empty.

## Example

```ts
import { Chunk } from "effect"

assert.deepStrictEqual(
  Chunk.map(Chunk.make(1, 2), (n) => n + 1),
  Chunk.make(2, 3)
)
```

## Since

2.0.0

## map(f)

> **map**\<`S`, `B`\>(`f`): (`self`) => [`With`](../namespaces/Chunk/type-aliases/With.md)\<`S`, `B`\>

Transforms the elements of a chunk using the specified mapping function.
If the input chunk is non-empty, the resulting chunk will also be non-empty.

### Type Parameters

• **S** *extends* [`Chunk`](../interfaces/Chunk.md)\<`any`\>

• **B**

### Parameters

• **f**

### Returns

`Function`

#### Parameters

• **self**: `S`

#### Returns

[`With`](../namespaces/Chunk/type-aliases/With.md)\<`S`, `B`\>

### Example

```ts
import { Chunk } from "effect"

assert.deepStrictEqual(
  Chunk.map(Chunk.make(1, 2), (n) => n + 1),
  Chunk.make(2, 3)
)
```

### Since

2.0.0

## map(self, f)

> **map**\<`A`, `B`\>(`self`, `f`): [`NonEmptyChunk`](../interfaces/NonEmptyChunk.md)\<`B`\>

Transforms the elements of a chunk using the specified mapping function.
If the input chunk is non-empty, the resulting chunk will also be non-empty.

### Type Parameters

• **A**

• **B**

### Parameters

• **self**: [`NonEmptyChunk`](../interfaces/NonEmptyChunk.md)\<`A`\>

• **f**

### Returns

[`NonEmptyChunk`](../interfaces/NonEmptyChunk.md)\<`B`\>

### Example

```ts
import { Chunk } from "effect"

assert.deepStrictEqual(
  Chunk.map(Chunk.make(1, 2), (n) => n + 1),
  Chunk.make(2, 3)
)
```

### Since

2.0.0

## map(self, f)

> **map**\<`A`, `B`\>(`self`, `f`): [`Chunk`](../interfaces/Chunk.md)\<`B`\>

Transforms the elements of a chunk using the specified mapping function.
If the input chunk is non-empty, the resulting chunk will also be non-empty.

### Type Parameters

• **A**

• **B**

### Parameters

• **self**: [`Chunk`](../interfaces/Chunk.md)\<`A`\>

• **f**

### Returns

[`Chunk`](../interfaces/Chunk.md)\<`B`\>

### Example

```ts
import { Chunk } from "effect"

assert.deepStrictEqual(
  Chunk.map(Chunk.make(1, 2), (n) => n + 1),
  Chunk.make(2, 3)
)
```

### Since

2.0.0
