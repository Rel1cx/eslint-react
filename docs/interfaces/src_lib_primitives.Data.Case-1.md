[eslint-plugin-react-ts](../README.md) / [src/lib/primitives](../modules/src_lib_primitives.md) / [Data](../modules/src_lib_primitives.Data.md) / Case

# Interface: Case

[src/lib/primitives](../modules/src_lib_primitives.md).[Data](../modules/src_lib_primitives.Data.md).Case

`Case` represents a datatype similar to a case class in Scala. Namely, a
datatype created using `Case` will, by default, provide an implementation
for a constructor, `Hash`, and `Equal`.

**`Since`**

1.0.0

## Hierarchy

- `Equal`

  ↳ **`Case`**

  ↳↳ [`Left`](src_lib_primitives.E.Left.md)

  ↳↳ [`Right`](src_lib_primitives.E.Right.md)

  ↳↳ [`None`](src_lib_primitives.O.None.md)

  ↳↳ [`Some`](src_lib_primitives.O.Some.md)

## Table of contents

### Methods

- [[symbol]](src_lib_primitives.Data.Case-1.md#[symbol])
- [[symbol]](src_lib_primitives.Data.Case-1.md#[symbol]-1)

## Methods

### [symbol]

▸ **[symbol]**(`that`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `that` | `Equal` |

#### Returns

`boolean`

#### Inherited from

Equal.Equal.[symbol]

___

### [symbol]

▸ **[symbol]**(): `number`

#### Returns

`number`

#### Inherited from

Equal.Equal.[symbol]
