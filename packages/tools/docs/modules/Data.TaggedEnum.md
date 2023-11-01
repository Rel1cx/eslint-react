[@eslint-react/tools](../README.md) / [Data](Data.md) / TaggedEnum

# Namespace: TaggedEnum

[Data](Data.md).TaggedEnum

**`Since`**

2.0.0

## Table of contents

### Interfaces

- [WithGenerics](../interfaces/Data.TaggedEnum.WithGenerics.md)

### Type Aliases

- [Args](Data.TaggedEnum.md#args)
- [Kind](Data.TaggedEnum.md#kind)
- [Value](Data.TaggedEnum.md#value)

## Other

### Args

Ƭ **Args**\<`A`, `K`, `E`\>: \{ readonly [K in keyof E as K extends "\_tag" \| keyof Case ? never : K]: E[K] } extends infer T ? {} extends `T` ? `void` : `T` : `never`

**`Since`**

2.0.0

#### Type parameters

| Name | Type                                                                    |
| :--- | :---------------------------------------------------------------------- |
| `A`  | extends \{ `_tag`: `string` } & [`Equal`](../interfaces/Equal.Equal.md) |
| `K`  | extends `A`[`"_tag"`]                                                   |
| `E`  | `Extract`\<`A`, \{ `_tag`: `K` }\>                                      |

---

### Value

Ƭ **Value**\<`A`, `K`\>: `Extract`\<`A`, \{ `_tag`: `K` }\>

**`Since`**

2.0.0

#### Type parameters

| Name | Type                                                                    |
| :--- | :---------------------------------------------------------------------- |
| `A`  | extends \{ `_tag`: `string` } & [`Equal`](../interfaces/Equal.Equal.md) |
| `K`  | extends `A`[`"_tag"`]                                                   |

## models

### Kind

Ƭ **Kind**\<`Z`, `A`, `B`, `C`, `D`\>: `Z` & \{ `A`: `A` ; `B`: `B` ; `C`: `C` ; `D`: `D` }[`"taggedEnum"`]

**`Since`**

2.0.0

#### Type parameters

| Name | Type                                                                                |
| :--- | :---------------------------------------------------------------------------------- |
| `Z`  | extends [`WithGenerics`](../interfaces/Data.TaggedEnum.WithGenerics.md)\<`number`\> |
| `A`  | `unknown`                                                                           |
| `B`  | `unknown`                                                                           |
| `C`  | `unknown`                                                                           |
| `D`  | `unknown`                                                                           |
