[eslint-plugin-react-ts](../README.md) / [src/lib/primitives](src_lib_primitives.md) / [Data](src_lib_primitives.Data.md) / TaggedEnum

# Namespace: TaggedEnum

[src/lib/primitives](src_lib_primitives.md).[Data](src_lib_primitives.Data.md).TaggedEnum

**`Since`**

1.0.0

## Table of contents

### Interfaces

- [WithGenerics](../interfaces/src_lib_primitives.Data.TaggedEnum.WithGenerics.md)

### Type Aliases

- [Args](src_lib_primitives.Data.TaggedEnum.md#args)
- [Kind](src_lib_primitives.Data.TaggedEnum.md#kind)
- [Value](src_lib_primitives.Data.TaggedEnum.md#value)

## Other

### Args

Ƭ **Args**<`A`, `K`\>: `Omit`<`Extract`<`A`, { `_tag`: `K`  }\>, ``"_tag"`` \| keyof [`Case`](../interfaces/src_lib_primitives.Data.Case-1.md)\> extends infer T ? {} extends `T` ? `void` : `T` : `never`

**`Since`**

1.0.0

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | extends [`Data`](src_lib_primitives.Data.md#data)<{ `_tag`: `string`  }\> |
| `K` | extends `A`[``"_tag"``] |

___

### Value

Ƭ **Value**<`A`, `K`\>: `Extract`<`A`, { `_tag`: `K`  }\>

**`Since`**

1.0.0

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | extends [`Data`](src_lib_primitives.Data.md#data)<{ `_tag`: `string`  }\> |
| `K` | extends `A`[``"_tag"``] |

## models

### Kind

Ƭ **Kind**<`Z`, `A`, `B`, `C`, `D`\>: `Z` & { `A`: `A` ; `B`: `B` ; `C`: `C` ; `D`: `D`  }[``"taggedEnum"``]

**`Since`**

1.0.0

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Z` | extends [`WithGenerics`](../interfaces/src_lib_primitives.Data.TaggedEnum.WithGenerics.md)<`number`\> |
| `A` | `unknown` |
| `B` | `unknown` |
| `C` | `unknown` |
| `D` | `unknown` |
