[@eslint-react/tools](../README.md) / [Chunk](Chunk.md) / Chunk

# Namespace: Chunk

[Chunk](Chunk.md).Chunk

**`Since`**

2.0.0

## Table of contents

### Type Aliases

- [AndNonEmpty](Chunk.Chunk.md#andnonempty)
- [Flatten](Chunk.Chunk.md#flatten)
- [Infer](Chunk.Chunk.md#infer)
- [OrNonEmpty](Chunk.Chunk.md#ornonempty)
- [With](Chunk.Chunk.md#with)

## Type Aliases

### AndNonEmpty

Ƭ **AndNonEmpty**\<`S`, `T`, `A`\>: `S` extends [`NonEmptyChunk`](../interfaces/Chunk.NonEmptyChunk.md)\<`any`\> ? `T` extends [`NonEmptyChunk`](../interfaces/Chunk.NonEmptyChunk.md)\<`any`\> ? [`NonEmptyChunk`](../interfaces/Chunk.NonEmptyChunk.md)\<`A`\> : [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> : [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>

**`Since`**

2.0.0

#### Type parameters

| Name | Type                                                       |
| :--- | :--------------------------------------------------------- |
| `S`  | extends [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`any`\> |
| `T`  | extends [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`any`\> |
| `A`  | `A`                                                        |

---

### Flatten

Ƭ **Flatten**\<`T`\>: `T` extends [`NonEmptyChunk`](../interfaces/Chunk.NonEmptyChunk.md)\<[`NonEmptyChunk`](../interfaces/Chunk.NonEmptyChunk.md)\<infer A\>\> ? [`NonEmptyChunk`](../interfaces/Chunk.NonEmptyChunk.md)\<`A`\> : `T` extends [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<[`Chunk`](../interfaces/Chunk.Chunk-1.md)\<infer A\>\> ? [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> : `never`

**`Since`**

2.0.0

#### Type parameters

| Name | Type                                                                                                    |
| :--- | :------------------------------------------------------------------------------------------------------ |
| `T`  | extends [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<[`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`any`\>\> |

---

### Infer

Ƭ **Infer**\<`S`\>: `S` extends [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<infer A\> ? `A` : `never`

**`Since`**

2.0.0

#### Type parameters

| Name | Type                                                       |
| :--- | :--------------------------------------------------------- |
| `S`  | extends [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`any`\> |

---

### OrNonEmpty

Ƭ **OrNonEmpty**\<`S`, `T`, `A`\>: `S` extends [`NonEmptyChunk`](../interfaces/Chunk.NonEmptyChunk.md)\<`any`\> ? [`NonEmptyChunk`](../interfaces/Chunk.NonEmptyChunk.md)\<`A`\> : `T` extends [`NonEmptyChunk`](../interfaces/Chunk.NonEmptyChunk.md)\<`any`\> ? [`NonEmptyChunk`](../interfaces/Chunk.NonEmptyChunk.md)\<`A`\> : [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>

**`Since`**

2.0.0

#### Type parameters

| Name | Type                                                       |
| :--- | :--------------------------------------------------------- |
| `S`  | extends [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`any`\> |
| `T`  | extends [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`any`\> |
| `A`  | `A`                                                        |

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
