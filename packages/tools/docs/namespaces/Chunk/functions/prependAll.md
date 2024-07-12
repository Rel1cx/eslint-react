[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [Chunk](../README.md) / prependAll

# Function: prependAll()

Prepends the specified prefix chunk to the beginning of the specified chunk.
If either chunk is non-empty, the result is also a non-empty chunk.

## Example

```ts
import { Chunk } from "effect"

assert.deepStrictEqual(
  Chunk.make(1, 2).pipe(Chunk.prependAll(Chunk.make("a", "b")), Chunk.toArray),
  ["a", "b", 1, 2]
)
```

## Since

2.0.0

## prependAll(that)

> **prependAll**\<`S`, `T`\>(`that`): (`self`) => [`OrNonEmpty`](../namespaces/Chunk/type-aliases/OrNonEmpty.md)\<`S`, `T`, [`Infer`](../namespaces/Chunk/type-aliases/Infer.md)\<`S`\> \| [`Infer`](../namespaces/Chunk/type-aliases/Infer.md)\<`T`\>\>

Prepends the specified prefix chunk to the beginning of the specified chunk.
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
  Chunk.make(1, 2).pipe(Chunk.prependAll(Chunk.make("a", "b")), Chunk.toArray),
  ["a", "b", 1, 2]
)
```

### Since

2.0.0

## prependAll(self, that)

> **prependAll**\<`A`, `B`\>(`self`, `that`): [`NonEmptyChunk`](../interfaces/NonEmptyChunk.md)\<`A` \| `B`\>

Prepends the specified prefix chunk to the beginning of the specified chunk.
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
  Chunk.make(1, 2).pipe(Chunk.prependAll(Chunk.make("a", "b")), Chunk.toArray),
  ["a", "b", 1, 2]
)
```

### Since

2.0.0

## prependAll(self, that)

> **prependAll**\<`A`, `B`\>(`self`, `that`): [`NonEmptyChunk`](../interfaces/NonEmptyChunk.md)\<`A` \| `B`\>

Prepends the specified prefix chunk to the beginning of the specified chunk.
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
  Chunk.make(1, 2).pipe(Chunk.prependAll(Chunk.make("a", "b")), Chunk.toArray),
  ["a", "b", 1, 2]
)
```

### Since

2.0.0

## prependAll(self, that)

> **prependAll**\<`A`, `B`\>(`self`, `that`): [`Chunk`](../interfaces/Chunk.md)\<`A` \| `B`\>

Prepends the specified prefix chunk to the beginning of the specified chunk.
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
  Chunk.make(1, 2).pipe(Chunk.prependAll(Chunk.make("a", "b")), Chunk.toArray),
  ["a", "b", 1, 2]
)
```

### Since

2.0.0
