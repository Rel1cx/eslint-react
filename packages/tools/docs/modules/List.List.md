[@eslint-react/tools](../README.md) / [List](List.md) / List

# Namespace: List

[List](List.md).List

**`Since`**

2.0.0

## Table of contents

### Type Aliases

- [AndNonEmpty](List.List.md#andnonempty)
- [Infer](List.List.md#infer)
- [OrNonEmpty](List.List.md#ornonempty)
- [With](List.List.md#with)

## Type Aliases

### AndNonEmpty

Ƭ **AndNonEmpty**\<`S`, `T`, `A`\>: `S` extends [`Cons`](../interfaces/List.Cons.md)\<`any`\> ? `T` extends [`Cons`](../interfaces/List.Cons.md)\<`any`\> ? [`Cons`](../interfaces/List.Cons.md)\<`A`\> : [`List`](List.md#list)\<`A`\> : [`List`](List.md#list)\<`A`\>

**`Since`**

2.0.0

#### Type parameters

| Name | Type                                    |
| :--- | :-------------------------------------- |
| `S`  | extends [`List`](List.md#list)\<`any`\> |
| `T`  | extends [`List`](List.md#list)\<`any`\> |
| `A`  | `A`                                     |

---

### Infer

Ƭ **Infer**\<`S`\>: `S` extends [`List`](List.md#list)\<infer A\> ? `A` : `never`

**`Since`**

2.0.0

#### Type parameters

| Name | Type                                    |
| :--- | :-------------------------------------- |
| `S`  | extends [`List`](List.md#list)\<`any`\> |

---

### OrNonEmpty

Ƭ **OrNonEmpty**\<`S`, `T`, `A`\>: `S` extends [`Cons`](../interfaces/List.Cons.md)\<`any`\> ? [`Cons`](../interfaces/List.Cons.md)\<`A`\> : `T` extends [`Cons`](../interfaces/List.Cons.md)\<`any`\> ? [`Cons`](../interfaces/List.Cons.md)\<`A`\> : [`List`](List.md#list)\<`A`\>

**`Since`**

2.0.0

#### Type parameters

| Name | Type                                    |
| :--- | :-------------------------------------- |
| `S`  | extends [`List`](List.md#list)\<`any`\> |
| `T`  | extends [`List`](List.md#list)\<`any`\> |
| `A`  | `A`                                     |

---

### With

Ƭ **With**\<`S`, `A`\>: `S` extends [`Cons`](../interfaces/List.Cons.md)\<`any`\> ? [`Cons`](../interfaces/List.Cons.md)\<`A`\> : [`List`](List.md#list)\<`A`\>

**`Since`**

2.0.0

#### Type parameters

| Name | Type                                    |
| :--- | :-------------------------------------- |
| `S`  | extends [`List`](List.md#list)\<`any`\> |
| `A`  | `A`                                     |
