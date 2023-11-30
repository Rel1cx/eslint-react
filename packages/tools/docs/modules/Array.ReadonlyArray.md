[@eslint-react/tools](../README.md) / [Array](Array.md) / ReadonlyArray

# Namespace: ReadonlyArray

[Array](Array.md).ReadonlyArray

**`Since`**

2.0.0

## Table of contents

### Type Aliases

- [Infer](Array.ReadonlyArray.md#infer)
- [With](Array.ReadonlyArray.md#with)
- [With2](Array.ReadonlyArray.md#with2)

## Type Aliases

### Infer

Ƭ **Infer**\<`T`\>: `T` extends `ReadonlyArray`\<infer A\> ? `A` : `T` extends `Iterable`\<infer A\> ? `A` : `never`

**`Since`**

2.0.0

#### Type parameters

| Name | Type                                                    |
| :--- | :------------------------------------------------------ |
| `T`  | extends `ReadonlyArray`\<`any`\> \| `Iterable`\<`any`\> |

---

### With

Ƭ **With**\<`T`, `A`\>: `T` extends [`NonEmptyReadonlyArray`](Array.md#nonemptyreadonlyarray)\<`any`\> ? [`NonEmptyArray`](Array.md#nonemptyarray)\<`A`\> : `A`[]

**`Since`**

2.0.0

#### Type parameters

| Name | Type                                                    |
| :--- | :------------------------------------------------------ |
| `T`  | extends `ReadonlyArray`\<`any`\> \| `Iterable`\<`any`\> |
| `A`  | `A`                                                     |

---

### With2

Ƭ **With2**\<`S`, `T`, `A`\>: `S` extends [`NonEmptyReadonlyArray`](Array.md#nonemptyreadonlyarray)\<`any`\> ? [`NonEmptyArray`](Array.md#nonemptyarray)\<`A`\> : `T` extends [`NonEmptyReadonlyArray`](Array.md#nonemptyreadonlyarray)\<`any`\> ? [`NonEmptyArray`](Array.md#nonemptyarray)\<`A`\> : `A`[]

**`Since`**

2.0.0

#### Type parameters

| Name | Type                                                    |
| :--- | :------------------------------------------------------ |
| `S`  | extends `ReadonlyArray`\<`any`\> \| `Iterable`\<`any`\> |
| `T`  | extends `ReadonlyArray`\<`any`\> \| `Iterable`\<`any`\> |
| `A`  | `A`                                                     |
