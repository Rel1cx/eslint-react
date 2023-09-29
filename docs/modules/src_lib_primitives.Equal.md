[eslint-plugin-react-ts](../README.md) / [src/lib/primitives](src_lib_primitives.md) / Equal

# Namespace: Equal

[src/lib/primitives](src_lib_primitives.md).Equal

## Table of contents

### Interfaces

- [Equal](../interfaces/src_lib_primitives.Equal.Equal.md)

### Variables

- [symbol](src_lib_primitives.Equal.md#symbol)

### Functions

- [equals](src_lib_primitives.Equal.md#equals)
- [equivalence](src_lib_primitives.Equal.md#equivalence)
- [isEqual](src_lib_primitives.Equal.md#isequal)

## equality

### equals

▸ **equals**<`B`\>(`that`): <A\>(`self`: `A`) => `boolean`

#### Type parameters

| Name |
| :------ |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `that` | `B` |

#### Returns

`fn`

▸ <`A`\>(`self`): `boolean`

##### Type parameters

| Name |
| :------ |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `A` |

##### Returns

`boolean`

**`Since`**

1.0.0

▸ **equals**<`A`, `B`\>(`self`, `that`): `boolean`

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `A` |
| `that` | `B` |

#### Returns

`boolean`

## guards

### isEqual

▸ **isEqual**(`u`): u is Equal

#### Parameters

| Name | Type |
| :------ | :------ |
| `u` | `unknown` |

#### Returns

u is Equal

**`Since`**

1.0.0

## instances

### equivalence

▸ **equivalence**<`A`\>(): `Equivalence`<`A`\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Returns

`Equivalence`<`A`\>

**`Since`**

1.0.0

## symbols

### symbol

• `Const` **symbol**: unique `symbol`

**`Since`**

1.0.0
