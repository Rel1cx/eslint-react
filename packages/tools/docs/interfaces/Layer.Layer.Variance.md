[@eslint-react/tools](../README.md) / [Layer](../modules/Layer.md) / [Layer](../modules/Layer.Layer.md) / Variance

# Interface: Variance\<RIn, E, ROut\>

[Layer](../modules/Layer.md).[Layer](../modules/Layer.Layer.md).Variance

**`Since`**

2.0.0

## Type parameters

| Name |
| :------ |
| `RIn` |
| `E` |
| `ROut` |

## Hierarchy

- **`Variance`**

  ↳ [`Layer`](Layer.Layer-1.md)

## Table of contents

### Properties

- [[LayerTypeId]](Layer.Layer.Variance.md#[layertypeid])

## Properties

### [LayerTypeId]

• `Readonly` **[LayerTypeId]**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_E` | `Covariant`\<`E`\> |
| `_RIn` | `Covariant`\<`RIn`\> |
| `_ROut` | `Contravariant`\<`ROut`\> |
