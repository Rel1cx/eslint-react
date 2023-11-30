[@eslint-react/tools](../README.md) / [Chunk](Chunk.md) / Chunk

# Namespace: Chunk

[Chunk](Chunk.md).Chunk

**`Since`**

2.0.0

## Table of contents

### Type Aliases

- [Infer](Chunk.Chunk.md#infer)
- [With](Chunk.Chunk.md#with)
- [With2](Chunk.Chunk.md#with2)

## Type Aliases

### Infer

Ƭ **Infer**\<`S`\>: `S` extends [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<infer A\> ? `A` : `never`

**`Since`**

2.0.0

#### Type parameters

| Name | Type                                                       |
| :--- | :--------------------------------------------------------- |
| `S`  | extends [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`any`\> |

---

### With

Ƭ **With**\<`S`, `A`\>: `S` extends [`NonEmptyChunk`](../interfaces/Chunk.NonEmptyChunk.md)\<`any`\> ? [`NonEmptyChunk`](../interfaces/Chunk.NonEmptyChunk.md)\<`A`\> : [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>

**`Since`**

2.0.0

#### Type parameters

| Name | Type                                                       |
| :--- | :--------------------------------------------------------- |
| `S`  | extends [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`any`\> |
| `A`  | `A`                                                        |

---

### With2

Ƭ **With2**\<`S`, `T`, `A`\>: `S` extends [`NonEmptyChunk`](../interfaces/Chunk.NonEmptyChunk.md)\<`any`\> ? [`NonEmptyChunk`](../interfaces/Chunk.NonEmptyChunk.md)\<`A`\> : `T` extends [`NonEmptyChunk`](../interfaces/Chunk.NonEmptyChunk.md)\<`any`\> ? [`NonEmptyChunk`](../interfaces/Chunk.NonEmptyChunk.md)\<`A`\> : [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>

**`Since`**

2.0.0

#### Type parameters

| Name | Type                                                       |
| :--- | :--------------------------------------------------------- |
| `S`  | extends [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`any`\> |
| `T`  | extends [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`any`\> |
| `A`  | `A`                                                        |
