[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [Chunk](../README.md) / appendAll

# Function: appendAll()

Concatenates two chunks, combining their elements.
If either chunk is non-empty, the result is also a non-empty chunk.

## Example

```ts
import { Chunk } from "effect"

assert.deepStrictEqual(
  Chunk.make(1, 2).pipe(Chunk.appendAll(Chunk.make("a", "b")), Chunk.toArray),
  [1, 2, "a", "b"]
)
```

## Since

2.0.0

## appendAll(that)

> **appendAll**\<`S`, `T`\>(`that`): (`self`) => [`OrNonEmpty`](../namespaces/Chunk/type-aliases/OrNonEmpty.md)\<`S`, `T`, [`Infer`](../namespaces/Chunk/type-aliases/Infer.md)\<`S`\> \| [`Infer`](../namespaces/Chunk/type-aliases/Infer.md)\<`T`\>\>

Concatenates two chunks, combining their elements.
If either chunk is non-empty, the result is also a non-empty chunk.

### Type Parameters

• **S** *extends* [`Chunk`](../interfaces/Chunk.md)\<`any`\>

• **T** *extends* [`Chunk`](../interfaces/Chunk.md)\<`any`\>

### Parameters

• **that**: `T`

### Returns

`Function`

#### Parameters

• **self**: `S`

#### Returns

[`OrNonEmpty`](../namespaces/Chunk/type-aliases/OrNonEmpty.md)\<`S`, `T`, [`Infer`](../namespaces/Chunk/type-aliases/Infer.md)\<`S`\> \| [`Infer`](../namespaces/Chunk/type-aliases/Infer.md)\<`T`\>\>

### Example

```ts
import { Chunk } from "effect"

assert.deepStrictEqual(
  Chunk.make(1, 2).pipe(Chunk.appendAll(Chunk.make("a", "b")), Chunk.toArray),
  [1, 2, "a", "b"]
)
```

### Since

2.0.0

## appendAll(self, that)

> **appendAll**\<`A`, `B`\>(`self`, `that`): [`NonEmptyChunk`](../interfaces/NonEmptyChunk.md)\<`A` \| `B`\>

Concatenates two chunks, combining their elements.
If either chunk is non-empty, the result is also a non-empty chunk.

### Type Parameters

• **A**

• **B**

### Parameters

• **self**: [`Chunk`](../interfaces/Chunk.md)\<`A`\>

• **that**: [`NonEmptyChunk`](../interfaces/NonEmptyChunk.md)\<`B`\>

### Returns

[`NonEmptyChunk`](../interfaces/NonEmptyChunk.md)\<`A` \| `B`\>

### Example

```ts
import { Chunk } from "effect"

assert.deepStrictEqual(
  Chunk.make(1, 2).pipe(Chunk.appendAll(Chunk.make("a", "b")), Chunk.toArray),
  [1, 2, "a", "b"]
)
```

### Since

2.0.0

## appendAll(self, that)

> **appendAll**\<`A`, `B`\>(`self`, `that`): [`NonEmptyChunk`](../interfaces/NonEmptyChunk.md)\<`A` \| `B`\>

Concatenates two chunks, combining their elements.
If either chunk is non-empty, the result is also a non-empty chunk.

### Type Parameters

• **A**

• **B**

### Parameters

• **self**: [`NonEmptyChunk`](../interfaces/NonEmptyChunk.md)\<`A`\>

• **that**: [`Chunk`](../interfaces/Chunk.md)\<`B`\>

### Returns

[`NonEmptyChunk`](../interfaces/NonEmptyChunk.md)\<`A` \| `B`\>

### Example

```ts
import { Chunk } from "effect"

assert.deepStrictEqual(
  Chunk.make(1, 2).pipe(Chunk.appendAll(Chunk.make("a", "b")), Chunk.toArray),
  [1, 2, "a", "b"]
)
```

### Since

2.0.0

## appendAll(self, that)

> **appendAll**\<`A`, `B`\>(`self`, `that`): [`Chunk`](../interfaces/Chunk.md)\<`A` \| `B`\>

Concatenates two chunks, combining their elements.
If either chunk is non-empty, the result is also a non-empty chunk.

### Type Parameters

• **A**

• **B**

### Parameters

• **self**: [`Chunk`](../interfaces/Chunk.md)\<`A`\>

• **that**: [`Chunk`](../interfaces/Chunk.md)\<`B`\>

### Returns

[`Chunk`](../interfaces/Chunk.md)\<`A` \| `B`\>

### Example

```ts
import { Chunk } from "effect"

assert.deepStrictEqual(
  Chunk.make(1, 2).pipe(Chunk.appendAll(Chunk.make("a", "b")), Chunk.toArray),
  [1, 2, "a", "b"]
)
```

### Since

2.0.0
