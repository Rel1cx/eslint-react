[@eslint-react/tools](../README.md) / [List](List.md) / List

# Namespace: List

[List](List.md).List

**`Since`**

2.0.0

## Table of contents

### Type Aliases

- [Infer](List.List.md#infer)
- [With](List.List.md#with)

## Type Aliases

### Infer

Ƭ **Infer**\<`T`\>: `T` extends [`List`](List.md#list)\<infer A\> ? `A` : `never`

**`Since`**

2.0.0

#### Type parameters

| Name | Type                                    |
| :--- | :-------------------------------------- |
| `T`  | extends [`List`](List.md#list)\<`any`\> |

---

### With

Ƭ **With**\<`T`, `A`\>: `T` extends [`Cons`](../interfaces/List.Cons.md)\<`any`\> ? [`Cons`](../interfaces/List.Cons.md)\<`A`\> : [`List`](List.md#list)\<`A`\>

**`Since`**

2.0.0

#### Type parameters

| Name | Type                                    |
| :--- | :-------------------------------------- |
| `T`  | extends [`List`](List.md#list)\<`any`\> |
| `A`  | `A`                                     |
