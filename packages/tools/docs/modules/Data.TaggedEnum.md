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

Ƭ **Args**<`A`, `K`\>: `Omit`<`Extract`<`A`, { `_tag`: `K` }\>, `"_tag"` \| keyof [`Case`](../interfaces/Data.Case-1.md)\> extends infer T ? {} extends `T` ? `void` : `T` : `never`

**`Since`**

2.0.0

#### Type parameters

| Name | Type                                                  |
| :--- | :---------------------------------------------------- |
| `A`  | extends [`Data`](Data.md#data)<{ `_tag`: `string` }\> |
| `K`  | extends `A`[`"_tag"`]                                 |

---

### Value

Ƭ **Value**<`A`, `K`\>: `Extract`<`A`, { `_tag`: `K` }\>

**`Since`**

2.0.0

#### Type parameters

| Name | Type                                                  |
| :--- | :---------------------------------------------------- |
| `A`  | extends [`Data`](Data.md#data)<{ `_tag`: `string` }\> |
| `K`  | extends `A`[`"_tag"`]                                 |

## models

### Kind

Ƭ **Kind**<`Z`, `A`, `B`, `C`, `D`\>: `Z` & { `A`: `A` ; `B`: `B` ; `C`: `C` ; `D`: `D` }[`"taggedEnum"`]

**`Since`**

2.0.0

#### Type parameters

| Name | Type                                                                               |
| :--- | :--------------------------------------------------------------------------------- |
| `Z`  | extends [`WithGenerics`](../interfaces/Data.TaggedEnum.WithGenerics.md)<`number`\> |
| `A`  | `unknown`                                                                          |
| `B`  | `unknown`                                                                          |
| `C`  | `unknown`                                                                          |
| `D`  | `unknown`                                                                          |
