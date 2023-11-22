[@eslint-react/tools](../README.md) / [Data](../modules/Data.md) / Case

# Interface: Case

[Data](../modules/Data.md).Case

`Case` represents a datatype similar to a case class in Scala. Namely, a
datatype created using `Case` will, by default, provide an implementation
for a constructor, `Hash`, and `Equal`.

**`Since`**

2.0.0

## Hierarchy

- [`Equal`](Equal.Equal.md)

  ↳ **`Case`**

  ↳↳ [`Left`](E.Left.md)

  ↳↳ [`Right`](E.Right.md)

  ↳↳ [`None`](O.None.md)

  ↳↳ [`Some`](O.Some.md)

## Table of contents

### Methods

- [[symbol]](Data.Case-1.md#[symbol])
- [[symbol]](Data.Case-1.md#[symbol]-1)

## Methods

### [symbol]

▸ **[symbol]**(`that`): `boolean`

#### Parameters

| Name   | Type                      |
| :----- | :------------------------ |
| `that` | [`Equal`](Equal.Equal.md) |

#### Returns

`boolean`

#### Inherited from

[Equal](Equal.Equal.md).[[symbol]](Equal.Equal.md#[symbol]-1)

---

### [symbol]

▸ **[symbol]**(): `number`

#### Returns

`number`

#### Inherited from

Equal.Equal.[symbol]
