[@eslint-react/tools](../README.md) / [Context](../modules/Context.md) / Tag

# Interface: Tag\<Identifier, Service\>

[Context](../modules/Context.md).Tag

**`Since`**

2.0.0

## Type parameters

| Name |
| :------ |
| `Identifier` |
| `Service` |

## Hierarchy

- `Pipeable`

- `Inspectable`

- [`Effect`](Effect.Effect-1.md)\<`Identifier`, `never`, `Service`\>

  ↳ **`Tag`**

## Table of contents

### Properties

- [[ChannelTypeId]](Context.Tag.md#[channeltypeid])
- [[EffectTypeId]](Context.Tag.md#[effecttypeid])
- [[SinkTypeId]](Context.Tag.md#[sinktypeid])
- [[StreamTypeId]](Context.Tag.md#[streamtypeid])
- [[TagTypeId]](Context.Tag.md#[tagtypeid])
- [[ignoreSymbol]](Context.Tag.md#[ignoresymbol])
- [[typeSymbol]](Context.Tag.md#[typesymbol])
- [[unifySymbol]](Context.Tag.md#[unifysymbol])
- [\_op](Context.Tag.md#_op)
- [\_tag](Context.Tag.md#_tag)
- [identifier](Context.Tag.md#identifier)
- [stack](Context.Tag.md#stack)

### Methods

- [[NodeInspectSymbol]](Context.Tag.md#[nodeinspectsymbol])
- [[symbol]](Context.Tag.md#[symbol])
- [[symbol]](Context.Tag.md#[symbol]-1)
- [context](Context.Tag.md#context)
- [of](Context.Tag.md#of)
- [pipe](Context.Tag.md#pipe)
- [toJSON](Context.Tag.md#tojson)
- [toString](Context.Tag.md#tostring)

## Properties

### [ChannelTypeId]

• `Readonly` **[ChannelTypeId]**: `VarianceStruct`\<`Identifier`, `unknown`, `unknown`, `unknown`, `never`, `never`, `Service`\>

#### Inherited from

[Effect](Effect.Effect-1.md).[[ChannelTypeId]](Effect.Effect-1.md#[channeltypeid])

___

### [EffectTypeId]

• `Readonly` **[EffectTypeId]**: [`VarianceStruct`](Effect.Effect.VarianceStruct.md)\<`Identifier`, `never`, `Service`\>

#### Inherited from

[Effect](Effect.Effect-1.md).[[EffectTypeId]](Effect.Effect-1.md#[effecttypeid])

___

### [SinkTypeId]

• `Readonly` **[SinkTypeId]**: `VarianceStruct`\<`Identifier`, `never`, `unknown`, `never`, `Service`\>

#### Inherited from

[Effect](Effect.Effect-1.md).[[SinkTypeId]](Effect.Effect-1.md#[sinktypeid])

___

### [StreamTypeId]

• `Readonly` **[StreamTypeId]**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_A` | `Covariant`\<`Service`\> |
| `_E` | `Covariant`\<`never`\> |
| `_R` | `Covariant`\<`Identifier`\> |

#### Inherited from

[Effect](Effect.Effect-1.md).[[StreamTypeId]](Effect.Effect-1.md#[streamtypeid])

___

### [TagTypeId]

• `Readonly` **[TagTypeId]**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_Identifier` | `Invariant`\<`Identifier`\> |
| `_Service` | `Invariant`\<`Service`\> |

___

### [ignoreSymbol]

• `Optional` **[ignoreSymbol]**: [`TagUnifyIgnore`](Context.TagUnifyIgnore.md)

#### Inherited from

[Effect](Effect.Effect-1.md).[[ignoreSymbol]](Effect.Effect-1.md#[ignoresymbol])

___

### [typeSymbol]

• `Optional` **[typeSymbol]**: `unknown`

#### Inherited from

[Effect](Effect.Effect-1.md).[[typeSymbol]](Effect.Effect-1.md#[typesymbol])

___

### [unifySymbol]

• `Optional` **[unifySymbol]**: [`TagUnify`](Context.TagUnify.md)\<[`Tag`](Context.Tag.md)\<`Identifier`, `Service`\>\>

#### Inherited from

[Effect](Effect.Effect-1.md).[[unifySymbol]](Effect.Effect-1.md#[unifysymbol])

___

### \_op

• `Readonly` **\_op**: ``"Tag"``

___

### \_tag

• `Readonly` **\_tag**: ``"Tag"``

___

### identifier

• `Optional` `Readonly` **identifier**: `unknown`

___

### stack

• `Optional` `Readonly` **stack**: `string`

## Methods

### [NodeInspectSymbol]

▸ **[NodeInspectSymbol]**(): `unknown`

#### Returns

`unknown`

#### Inherited from

Inspectable.[NodeInspectSymbol]

___

### [symbol]

▸ **[symbol]**(`that`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `that` | [`Equal`](Equal.Equal.md) |

#### Returns

`boolean`

#### Inherited from

[Effect](Effect.Effect-1.md).[[symbol]](Effect.Effect-1.md#[symbol]-1)

___

### [symbol]

▸ **[symbol]**(): `number`

#### Returns

`number`

___

### context

▸ **context**(`self`): [`Context`](Context.Context.md)\<`Identifier`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Service` |

#### Returns

[`Context`](Context.Context.md)\<`Identifier`\>

___

### of

▸ **of**(`self`): `Service`

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Service` |

#### Returns

`Service`

___

### pipe

▸ **pipe**\<`A`, `B`\>(`this`, `ab`): `B`

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `this` | `A` |
| `ab` | (`_`: `A`) => `B` |

#### Returns

`B`

#### Inherited from

[Effect](Effect.Effect-1.md).[pipe](Effect.Effect-1.md#pipe)

▸ **pipe**\<`A`, `B`, `C`\>(`this`, `ab`, `bc`): `C`

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `this` | `A` |
| `ab` | (`_`: `A`) => `B` |
| `bc` | (`_`: `B`) => `C` |

#### Returns

`C`

#### Inherited from

[Effect](Effect.Effect-1.md).[pipe](Effect.Effect-1.md#pipe)

▸ **pipe**\<`A`, `B`, `C`, `D`\>(`this`, `ab`, `bc`, `cd`): `D`

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `this` | `A` |
| `ab` | (`_`: `A`) => `B` |
| `bc` | (`_`: `B`) => `C` |
| `cd` | (`_`: `C`) => `D` |

#### Returns

`D`

#### Inherited from

[Effect](Effect.Effect-1.md).[pipe](Effect.Effect-1.md#pipe)

▸ **pipe**\<`A`, `B`, `C`, `D`, `E`\>(`this`, `ab`, `bc`, `cd`, `de`): `E`

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |
| `E` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `this` | `A` |
| `ab` | (`_`: `A`) => `B` |
| `bc` | (`_`: `B`) => `C` |
| `cd` | (`_`: `C`) => `D` |
| `de` | (`_`: `D`) => `E` |

#### Returns

`E`

#### Inherited from

[Effect](Effect.Effect-1.md).[pipe](Effect.Effect-1.md#pipe)

▸ **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`\>(`this`, `ab`, `bc`, `cd`, `de`, `ef`): `F`

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |
| `E` |
| `F` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `this` | `A` |
| `ab` | (`_`: `A`) => `B` |
| `bc` | (`_`: `B`) => `C` |
| `cd` | (`_`: `C`) => `D` |
| `de` | (`_`: `D`) => `E` |
| `ef` | (`_`: `E`) => `F` |

#### Returns

`F`

#### Inherited from

[Effect](Effect.Effect-1.md).[pipe](Effect.Effect-1.md#pipe)

▸ **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`\>(`this`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`): `G`

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |
| `E` |
| `F` |
| `G` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `this` | `A` |
| `ab` | (`_`: `A`) => `B` |
| `bc` | (`_`: `B`) => `C` |
| `cd` | (`_`: `C`) => `D` |
| `de` | (`_`: `D`) => `E` |
| `ef` | (`_`: `E`) => `F` |
| `fg` | (`_`: `F`) => `G` |

#### Returns

`G`

#### Inherited from

[Effect](Effect.Effect-1.md).[pipe](Effect.Effect-1.md#pipe)

▸ **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`\>(`this`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`): `H`

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |
| `E` |
| `F` |
| `G` |
| `H` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `this` | `A` |
| `ab` | (`_`: `A`) => `B` |
| `bc` | (`_`: `B`) => `C` |
| `cd` | (`_`: `C`) => `D` |
| `de` | (`_`: `D`) => `E` |
| `ef` | (`_`: `E`) => `F` |
| `fg` | (`_`: `F`) => `G` |
| `gh` | (`_`: `G`) => `H` |

#### Returns

`H`

#### Inherited from

[Effect](Effect.Effect-1.md).[pipe](Effect.Effect-1.md#pipe)

▸ **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`\>(`this`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`): `I`

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |
| `E` |
| `F` |
| `G` |
| `H` |
| `I` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `this` | `A` |
| `ab` | (`_`: `A`) => `B` |
| `bc` | (`_`: `B`) => `C` |
| `cd` | (`_`: `C`) => `D` |
| `de` | (`_`: `D`) => `E` |
| `ef` | (`_`: `E`) => `F` |
| `fg` | (`_`: `F`) => `G` |
| `gh` | (`_`: `G`) => `H` |
| `hi` | (`_`: `H`) => `I` |

#### Returns

`I`

#### Inherited from

[Effect](Effect.Effect-1.md).[pipe](Effect.Effect-1.md#pipe)

▸ **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`\>(`this`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`): `J`

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |
| `E` |
| `F` |
| `G` |
| `H` |
| `I` |
| `J` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `this` | `A` |
| `ab` | (`_`: `A`) => `B` |
| `bc` | (`_`: `B`) => `C` |
| `cd` | (`_`: `C`) => `D` |
| `de` | (`_`: `D`) => `E` |
| `ef` | (`_`: `E`) => `F` |
| `fg` | (`_`: `F`) => `G` |
| `gh` | (`_`: `G`) => `H` |
| `hi` | (`_`: `H`) => `I` |
| `ij` | (`_`: `I`) => `J` |

#### Returns

`J`

#### Inherited from

[Effect](Effect.Effect-1.md).[pipe](Effect.Effect-1.md#pipe)

▸ **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`\>(`this`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`): `K`

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |
| `E` |
| `F` |
| `G` |
| `H` |
| `I` |
| `J` |
| `K` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `this` | `A` |
| `ab` | (`_`: `A`) => `B` |
| `bc` | (`_`: `B`) => `C` |
| `cd` | (`_`: `C`) => `D` |
| `de` | (`_`: `D`) => `E` |
| `ef` | (`_`: `E`) => `F` |
| `fg` | (`_`: `F`) => `G` |
| `gh` | (`_`: `G`) => `H` |
| `hi` | (`_`: `H`) => `I` |
| `ij` | (`_`: `I`) => `J` |
| `jk` | (`_`: `J`) => `K` |

#### Returns

`K`

#### Inherited from

[Effect](Effect.Effect-1.md).[pipe](Effect.Effect-1.md#pipe)

▸ **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`\>(`this`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`): `L`

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |
| `E` |
| `F` |
| `G` |
| `H` |
| `I` |
| `J` |
| `K` |
| `L` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `this` | `A` |
| `ab` | (`_`: `A`) => `B` |
| `bc` | (`_`: `B`) => `C` |
| `cd` | (`_`: `C`) => `D` |
| `de` | (`_`: `D`) => `E` |
| `ef` | (`_`: `E`) => `F` |
| `fg` | (`_`: `F`) => `G` |
| `gh` | (`_`: `G`) => `H` |
| `hi` | (`_`: `H`) => `I` |
| `ij` | (`_`: `I`) => `J` |
| `jk` | (`_`: `J`) => `K` |
| `kl` | (`_`: `K`) => `L` |

#### Returns

`L`

#### Inherited from

[Effect](Effect.Effect-1.md).[pipe](Effect.Effect-1.md#pipe)

▸ **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`\>(`this`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`, `lm`): `M`

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |
| `E` |
| `F` |
| `G` |
| `H` |
| `I` |
| `J` |
| `K` |
| `L` |
| `M` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `this` | `A` |
| `ab` | (`_`: `A`) => `B` |
| `bc` | (`_`: `B`) => `C` |
| `cd` | (`_`: `C`) => `D` |
| `de` | (`_`: `D`) => `E` |
| `ef` | (`_`: `E`) => `F` |
| `fg` | (`_`: `F`) => `G` |
| `gh` | (`_`: `G`) => `H` |
| `hi` | (`_`: `H`) => `I` |
| `ij` | (`_`: `I`) => `J` |
| `jk` | (`_`: `J`) => `K` |
| `kl` | (`_`: `K`) => `L` |
| `lm` | (`_`: `L`) => `M` |

#### Returns

`M`

#### Inherited from

[Effect](Effect.Effect-1.md).[pipe](Effect.Effect-1.md#pipe)

▸ **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`\>(`this`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`, `lm`, `mn`): `N`

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |
| `E` |
| `F` |
| `G` |
| `H` |
| `I` |
| `J` |
| `K` |
| `L` |
| `M` |
| `N` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `this` | `A` |
| `ab` | (`_`: `A`) => `B` |
| `bc` | (`_`: `B`) => `C` |
| `cd` | (`_`: `C`) => `D` |
| `de` | (`_`: `D`) => `E` |
| `ef` | (`_`: `E`) => `F` |
| `fg` | (`_`: `F`) => `G` |
| `gh` | (`_`: `G`) => `H` |
| `hi` | (`_`: `H`) => `I` |
| `ij` | (`_`: `I`) => `J` |
| `jk` | (`_`: `J`) => `K` |
| `kl` | (`_`: `K`) => `L` |
| `lm` | (`_`: `L`) => `M` |
| `mn` | (`_`: `M`) => `N` |

#### Returns

`N`

#### Inherited from

[Effect](Effect.Effect-1.md).[pipe](Effect.Effect-1.md#pipe)

▸ **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`, `O`\>(`this`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`, `lm`, `mn`, `no`): `O`

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |
| `E` |
| `F` |
| `G` |
| `H` |
| `I` |
| `J` |
| `K` |
| `L` |
| `M` |
| `N` |
| `O` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `this` | `A` |
| `ab` | (`_`: `A`) => `B` |
| `bc` | (`_`: `B`) => `C` |
| `cd` | (`_`: `C`) => `D` |
| `de` | (`_`: `D`) => `E` |
| `ef` | (`_`: `E`) => `F` |
| `fg` | (`_`: `F`) => `G` |
| `gh` | (`_`: `G`) => `H` |
| `hi` | (`_`: `H`) => `I` |
| `ij` | (`_`: `I`) => `J` |
| `jk` | (`_`: `J`) => `K` |
| `kl` | (`_`: `K`) => `L` |
| `lm` | (`_`: `L`) => `M` |
| `mn` | (`_`: `M`) => `N` |
| `no` | (`_`: `N`) => `O` |

#### Returns

`O`

#### Inherited from

[Effect](Effect.Effect-1.md).[pipe](Effect.Effect-1.md#pipe)

▸ **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`, `O`, `P`\>(`this`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`, `lm`, `mn`, `no`, `op`): `P`

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |
| `E` |
| `F` |
| `G` |
| `H` |
| `I` |
| `J` |
| `K` |
| `L` |
| `M` |
| `N` |
| `O` |
| `P` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `this` | `A` |
| `ab` | (`_`: `A`) => `B` |
| `bc` | (`_`: `B`) => `C` |
| `cd` | (`_`: `C`) => `D` |
| `de` | (`_`: `D`) => `E` |
| `ef` | (`_`: `E`) => `F` |
| `fg` | (`_`: `F`) => `G` |
| `gh` | (`_`: `G`) => `H` |
| `hi` | (`_`: `H`) => `I` |
| `ij` | (`_`: `I`) => `J` |
| `jk` | (`_`: `J`) => `K` |
| `kl` | (`_`: `K`) => `L` |
| `lm` | (`_`: `L`) => `M` |
| `mn` | (`_`: `M`) => `N` |
| `no` | (`_`: `N`) => `O` |
| `op` | (`_`: `O`) => `P` |

#### Returns

`P`

#### Inherited from

[Effect](Effect.Effect-1.md).[pipe](Effect.Effect-1.md#pipe)

▸ **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`, `O`, `P`, `Q`\>(`this`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`, `lm`, `mn`, `no`, `op`, `pq`): `Q`

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |
| `E` |
| `F` |
| `G` |
| `H` |
| `I` |
| `J` |
| `K` |
| `L` |
| `M` |
| `N` |
| `O` |
| `P` |
| `Q` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `this` | `A` |
| `ab` | (`_`: `A`) => `B` |
| `bc` | (`_`: `B`) => `C` |
| `cd` | (`_`: `C`) => `D` |
| `de` | (`_`: `D`) => `E` |
| `ef` | (`_`: `E`) => `F` |
| `fg` | (`_`: `F`) => `G` |
| `gh` | (`_`: `G`) => `H` |
| `hi` | (`_`: `H`) => `I` |
| `ij` | (`_`: `I`) => `J` |
| `jk` | (`_`: `J`) => `K` |
| `kl` | (`_`: `K`) => `L` |
| `lm` | (`_`: `L`) => `M` |
| `mn` | (`_`: `M`) => `N` |
| `no` | (`_`: `N`) => `O` |
| `op` | (`_`: `O`) => `P` |
| `pq` | (`_`: `P`) => `Q` |

#### Returns

`Q`

#### Inherited from

[Effect](Effect.Effect-1.md).[pipe](Effect.Effect-1.md#pipe)

▸ **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`, `O`, `P`, `Q`, `R`\>(`this`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`, `lm`, `mn`, `no`, `op`, `pq`, `qr`): `R`

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |
| `E` |
| `F` |
| `G` |
| `H` |
| `I` |
| `J` |
| `K` |
| `L` |
| `M` |
| `N` |
| `O` |
| `P` |
| `Q` |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `this` | `A` |
| `ab` | (`_`: `A`) => `B` |
| `bc` | (`_`: `B`) => `C` |
| `cd` | (`_`: `C`) => `D` |
| `de` | (`_`: `D`) => `E` |
| `ef` | (`_`: `E`) => `F` |
| `fg` | (`_`: `F`) => `G` |
| `gh` | (`_`: `G`) => `H` |
| `hi` | (`_`: `H`) => `I` |
| `ij` | (`_`: `I`) => `J` |
| `jk` | (`_`: `J`) => `K` |
| `kl` | (`_`: `K`) => `L` |
| `lm` | (`_`: `L`) => `M` |
| `mn` | (`_`: `M`) => `N` |
| `no` | (`_`: `N`) => `O` |
| `op` | (`_`: `O`) => `P` |
| `pq` | (`_`: `P`) => `Q` |
| `qr` | (`_`: `Q`) => `R` |

#### Returns

`R`

#### Inherited from

[Effect](Effect.Effect-1.md).[pipe](Effect.Effect-1.md#pipe)

▸ **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`, `O`, `P`, `Q`, `R`, `S`\>(`this`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`, `lm`, `mn`, `no`, `op`, `pq`, `qr`, `rs`): `S`

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |
| `E` |
| `F` |
| `G` |
| `H` |
| `I` |
| `J` |
| `K` |
| `L` |
| `M` |
| `N` |
| `O` |
| `P` |
| `Q` |
| `R` |
| `S` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `this` | `A` |
| `ab` | (`_`: `A`) => `B` |
| `bc` | (`_`: `B`) => `C` |
| `cd` | (`_`: `C`) => `D` |
| `de` | (`_`: `D`) => `E` |
| `ef` | (`_`: `E`) => `F` |
| `fg` | (`_`: `F`) => `G` |
| `gh` | (`_`: `G`) => `H` |
| `hi` | (`_`: `H`) => `I` |
| `ij` | (`_`: `I`) => `J` |
| `jk` | (`_`: `J`) => `K` |
| `kl` | (`_`: `K`) => `L` |
| `lm` | (`_`: `L`) => `M` |
| `mn` | (`_`: `M`) => `N` |
| `no` | (`_`: `N`) => `O` |
| `op` | (`_`: `O`) => `P` |
| `pq` | (`_`: `P`) => `Q` |
| `qr` | (`_`: `Q`) => `R` |
| `rs` | (`_`: `R`) => `S` |

#### Returns

`S`

#### Inherited from

[Effect](Effect.Effect-1.md).[pipe](Effect.Effect-1.md#pipe)

▸ **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`, `O`, `P`, `Q`, `R`, `S`, `T`\>(`this`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`, `lm`, `mn`, `no`, `op`, `pq`, `qr`, `rs`, `st`): `T`

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |
| `E` |
| `F` |
| `G` |
| `H` |
| `I` |
| `J` |
| `K` |
| `L` |
| `M` |
| `N` |
| `O` |
| `P` |
| `Q` |
| `R` |
| `S` |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `this` | `A` |
| `ab` | (`_`: `A`) => `B` |
| `bc` | (`_`: `B`) => `C` |
| `cd` | (`_`: `C`) => `D` |
| `de` | (`_`: `D`) => `E` |
| `ef` | (`_`: `E`) => `F` |
| `fg` | (`_`: `F`) => `G` |
| `gh` | (`_`: `G`) => `H` |
| `hi` | (`_`: `H`) => `I` |
| `ij` | (`_`: `I`) => `J` |
| `jk` | (`_`: `J`) => `K` |
| `kl` | (`_`: `K`) => `L` |
| `lm` | (`_`: `L`) => `M` |
| `mn` | (`_`: `M`) => `N` |
| `no` | (`_`: `N`) => `O` |
| `op` | (`_`: `O`) => `P` |
| `pq` | (`_`: `P`) => `Q` |
| `qr` | (`_`: `Q`) => `R` |
| `rs` | (`_`: `R`) => `S` |
| `st` | (`_`: `S`) => `T` |

#### Returns

`T`

#### Inherited from

[Effect](Effect.Effect-1.md).[pipe](Effect.Effect-1.md#pipe)

▸ **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`, `O`, `P`, `Q`, `R`, `S`, `T`, `U`\>(`this`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`, `lm`, `mn`, `no`, `op`, `pq`, `qr`, `rs`, `st`, `tu`): `U`

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |
| `E` |
| `F` |
| `G` |
| `H` |
| `I` |
| `J` |
| `K` |
| `L` |
| `M` |
| `N` |
| `O` |
| `P` |
| `Q` |
| `R` |
| `S` |
| `T` |
| `U` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `this` | `A` |
| `ab` | (`_`: `A`) => `B` |
| `bc` | (`_`: `B`) => `C` |
| `cd` | (`_`: `C`) => `D` |
| `de` | (`_`: `D`) => `E` |
| `ef` | (`_`: `E`) => `F` |
| `fg` | (`_`: `F`) => `G` |
| `gh` | (`_`: `G`) => `H` |
| `hi` | (`_`: `H`) => `I` |
| `ij` | (`_`: `I`) => `J` |
| `jk` | (`_`: `J`) => `K` |
| `kl` | (`_`: `K`) => `L` |
| `lm` | (`_`: `L`) => `M` |
| `mn` | (`_`: `M`) => `N` |
| `no` | (`_`: `N`) => `O` |
| `op` | (`_`: `O`) => `P` |
| `pq` | (`_`: `P`) => `Q` |
| `qr` | (`_`: `Q`) => `R` |
| `rs` | (`_`: `R`) => `S` |
| `st` | (`_`: `S`) => `T` |
| `tu` | (`_`: `T`) => `U` |

#### Returns

`U`

#### Inherited from

[Effect](Effect.Effect-1.md).[pipe](Effect.Effect-1.md#pipe)

▸ **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`, `O`, `P`, `Q`, `R`, `S`, `T`, `U`\>(`this`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`, `lm`, `mn`, `no`, `op`, `pq`, `qr`, `rs`, `st`, `tu`): `U`

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |
| `E` |
| `F` |
| `G` |
| `H` |
| `I` |
| `J` |
| `K` |
| `L` |
| `M` |
| `N` |
| `O` |
| `P` |
| `Q` |
| `R` |
| `S` |
| `T` |
| `U` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `this` | `A` |
| `ab` | (`_`: `A`) => `B` |
| `bc` | (`_`: `B`) => `C` |
| `cd` | (`_`: `C`) => `D` |
| `de` | (`_`: `D`) => `E` |
| `ef` | (`_`: `E`) => `F` |
| `fg` | (`_`: `F`) => `G` |
| `gh` | (`_`: `G`) => `H` |
| `hi` | (`_`: `H`) => `I` |
| `ij` | (`_`: `I`) => `J` |
| `jk` | (`_`: `J`) => `K` |
| `kl` | (`_`: `K`) => `L` |
| `lm` | (`_`: `L`) => `M` |
| `mn` | (`_`: `M`) => `N` |
| `no` | (`_`: `N`) => `O` |
| `op` | (`_`: `O`) => `P` |
| `pq` | (`_`: `P`) => `Q` |
| `qr` | (`_`: `Q`) => `R` |
| `rs` | (`_`: `R`) => `S` |
| `st` | (`_`: `S`) => `T` |
| `tu` | (`_`: `T`) => `U` |

#### Returns

`U`

#### Inherited from

[Effect](Effect.Effect-1.md).[pipe](Effect.Effect-1.md#pipe)

___

### toJSON

▸ **toJSON**(): `unknown`

#### Returns

`unknown`

#### Inherited from

Inspectable.toJSON

___

### toString

▸ **toString**(): `string`

#### Returns

`string`

#### Inherited from

Inspectable.toString
