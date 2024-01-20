[@eslint-react/tools](../README.md) / [Effect](../modules/Effect.md) / Effect

# Interface: Effect\<R, E, A\>

[Effect](../modules/Effect.md).Effect

The `Effect` interface defines a value that lazily describes a workflow or job.
The workflow requires some context `R`, and may fail with an error of type `E`,
or succeed with a value of type `A`.

`Effect` values model resourceful interaction with the outside world, including
synchronous, asynchronous, concurrent, and parallel interaction. They use a
fiber-based concurrency model, with built-in support for scheduling, fine-grained
interruption, structured concurrency, and high scalability.

To run an `Effect` value, you need a `Runtime`, which is a type that is capable
of executing `Effect` values.

**`Since`**

2.0.0

## Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

## Hierarchy

- [`Variance`](Effect.Effect.Variance.md)\<`R`, `E`, `A`\>

- [`Equal`](Equal.Equal.md)

- `Pipeable`

- `Sink`\<`R`, `E`, `unknown`, `never`, `A`\>

- `Stream`\<`R`, `E`, `A`\>

- `Channel`\<`R`, `unknown`, `unknown`, `unknown`, `E`, `never`, `A`\>

  ↳ **`Effect`**

  ↳↳ [`Tag`](Context.Tag.md)

  ↳↳ [`Blocked`](Effect.Blocked.md)

  ↳↳ [`Left`](E.Left.md)

  ↳↳ [`Right`](E.Right.md)

  ↳↳ [`None`](O.None.md)

  ↳↳ [`Some`](O.Some.md)

## Table of contents

### Properties

- [[ChannelTypeId]](Effect.Effect-1.md#[channeltypeid])
- [[EffectTypeId]](Effect.Effect-1.md#[effecttypeid])
- [[SinkTypeId]](Effect.Effect-1.md#[sinktypeid])
- [[StreamTypeId]](Effect.Effect-1.md#[streamtypeid])
- [[ignoreSymbol]](Effect.Effect-1.md#[ignoresymbol])
- [[typeSymbol]](Effect.Effect-1.md#[typesymbol])
- [[unifySymbol]](Effect.Effect-1.md#[unifysymbol])

### Methods

- [[symbol]](Effect.Effect-1.md#[symbol])
- [[symbol]](Effect.Effect-1.md#[symbol]-1)
- [pipe](Effect.Effect-1.md#pipe)

## Properties

### [ChannelTypeId]

• `Readonly` **[ChannelTypeId]**: `VarianceStruct`\<`R`, `unknown`, `unknown`, `unknown`, `E`, `never`, `A`\>

___

### [EffectTypeId]

• `Readonly` **[EffectTypeId]**: [`VarianceStruct`](Effect.Effect.VarianceStruct.md)\<`R`, `E`, `A`\>

#### Inherited from

[Variance](Effect.Effect.Variance.md).[[EffectTypeId]](Effect.Effect.Variance.md#[effecttypeid])

___

### [SinkTypeId]

• `Readonly` **[SinkTypeId]**: `VarianceStruct`\<`R`, `E`, `unknown`, `never`, `A`\>

___

### [StreamTypeId]

• `Readonly` **[StreamTypeId]**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_A` | `Covariant`\<`A`\> |
| `_E` | `Covariant`\<`E`\> |
| `_R` | `Covariant`\<`R`\> |

___

### [ignoreSymbol]

• `Optional` `Readonly` **[ignoreSymbol]**: [`EffectUnifyIgnore`](Effect.EffectUnifyIgnore.md)

___

### [typeSymbol]

• `Optional` `Readonly` **[typeSymbol]**: `unknown`

___

### [unifySymbol]

• `Optional` `Readonly` **[unifySymbol]**: [`EffectUnify`](Effect.EffectUnify.md)\<[`Effect`](Effect.Effect-1.md)\<`R`, `E`, `A`\>\>

## Methods

### [symbol]

▸ **[symbol]**(`that`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `that` | [`Equal`](Equal.Equal.md) |

#### Returns

`boolean`

#### Inherited from

[Equal](Equal.Equal.md).[[symbol]](Equal.Equal.md#[symbol]-1)

___

### [symbol]

▸ **[symbol]**(): `number`

#### Returns

`number`

#### Inherited from

Equal.Equal.[symbol]

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

Pipeable.pipe

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

Pipeable.pipe

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

Pipeable.pipe

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

Pipeable.pipe

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

Pipeable.pipe

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

Pipeable.pipe

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

Pipeable.pipe

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

Pipeable.pipe

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

Pipeable.pipe

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

Pipeable.pipe

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

Pipeable.pipe

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

Pipeable.pipe

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

Pipeable.pipe

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

Pipeable.pipe

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

Pipeable.pipe

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

Pipeable.pipe

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

Pipeable.pipe

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

Pipeable.pipe

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

Pipeable.pipe

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

Pipeable.pipe

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

Pipeable.pipe
