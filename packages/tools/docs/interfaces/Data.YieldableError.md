[@eslint-react/tools](../README.md) / [Data](../modules/Data.md) / YieldableError

# Interface: YieldableError

[Data](../modules/Data.md).YieldableError

**`Since`**

2.0.0

## Hierarchy

- [`Case`](Data.Case-1.md)

- `Pipeable`

- `Readonly`\<`Error`\>

  ↳ **`YieldableError`**

## Table of contents

### Properties

- [[ChannelTypeId]](Data.YieldableError.md#[channeltypeid])
- [[EffectTypeId]](Data.YieldableError.md#[effecttypeid])
- [[SinkTypeId]](Data.YieldableError.md#[sinktypeid])
- [[StreamTypeId]](Data.YieldableError.md#[streamtypeid])
- [cause](Data.YieldableError.md#cause)
- [message](Data.YieldableError.md#message)
- [name](Data.YieldableError.md#name)
- [stack](Data.YieldableError.md#stack)

### Methods

- [[symbol]](Data.YieldableError.md#[symbol])
- [[symbol]](Data.YieldableError.md#[symbol]-1)
- [pipe](Data.YieldableError.md#pipe)

## Properties

### [ChannelTypeId]

• `Readonly` **[ChannelTypeId]**: `VarianceStruct`\<`never`, `unknown`, `unknown`, `unknown`, [`YieldableError`](Data.YieldableError.md), `never`, `never`\>

---

### [EffectTypeId]

• `Readonly` **[EffectTypeId]**: `VarianceStruct`\<`never`, [`YieldableError`](Data.YieldableError.md), `never`\>

---

### [SinkTypeId]

• `Readonly` **[SinkTypeId]**: `VarianceStruct`\<`never`, [`YieldableError`](Data.YieldableError.md), `unknown`, `never`, `never`\>

---

### [StreamTypeId]

• `Readonly` **[StreamTypeId]**: `VarianceStruct`\<`never`, [`YieldableError`](Data.YieldableError.md), `never`\>

---

### cause

• `Optional` `Readonly` **cause**: `unknown`

#### Inherited from

Readonly.cause

---

### message

• `Readonly` **message**: `string`

#### Inherited from

Readonly.message

---

### name

• `Readonly` **name**: `string`

#### Inherited from

Readonly.name

---

### stack

• `Optional` `Readonly` **stack**: `string`

#### Inherited from

Readonly.stack

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

[Case](Data.Case-1.md).[[symbol]](Data.Case-1.md#[symbol]-1)

---

### [symbol]

▸ **[symbol]**(): `number`

#### Returns

`number`

#### Inherited from

Case.[symbol]

---

### pipe

▸ **pipe**\<`A`, `B`\>(`this`, `ab`): `B`

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |

#### Parameters

| Name   | Type              |
| :----- | :---------------- |
| `this` | `A`               |
| `ab`   | (`_`: `A`) => `B` |

#### Returns

`B`

#### Inherited from

Pipeable.pipe

▸ **pipe**\<`A`, `B`, `C`\>(`this`, `ab`, `bc`): `C`

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |
| `C`  |

#### Parameters

| Name   | Type              |
| :----- | :---------------- |
| `this` | `A`               |
| `ab`   | (`_`: `A`) => `B` |
| `bc`   | (`_`: `B`) => `C` |

#### Returns

`C`

#### Inherited from

Pipeable.pipe

▸ **pipe**\<`A`, `B`, `C`, `D`\>(`this`, `ab`, `bc`, `cd`): `D`

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |
| `C`  |
| `D`  |

#### Parameters

| Name   | Type              |
| :----- | :---------------- |
| `this` | `A`               |
| `ab`   | (`_`: `A`) => `B` |
| `bc`   | (`_`: `B`) => `C` |
| `cd`   | (`_`: `C`) => `D` |

#### Returns

`D`

#### Inherited from

Pipeable.pipe

▸ **pipe**\<`A`, `B`, `C`, `D`, `E`\>(`this`, `ab`, `bc`, `cd`, `de`): `E`

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |
| `C`  |
| `D`  |
| `E`  |

#### Parameters

| Name   | Type              |
| :----- | :---------------- |
| `this` | `A`               |
| `ab`   | (`_`: `A`) => `B` |
| `bc`   | (`_`: `B`) => `C` |
| `cd`   | (`_`: `C`) => `D` |
| `de`   | (`_`: `D`) => `E` |

#### Returns

`E`

#### Inherited from

Pipeable.pipe

▸ **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`\>(`this`, `ab`, `bc`, `cd`, `de`, `ef`): `F`

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |
| `C`  |
| `D`  |
| `E`  |
| `F`  |

#### Parameters

| Name   | Type              |
| :----- | :---------------- |
| `this` | `A`               |
| `ab`   | (`_`: `A`) => `B` |
| `bc`   | (`_`: `B`) => `C` |
| `cd`   | (`_`: `C`) => `D` |
| `de`   | (`_`: `D`) => `E` |
| `ef`   | (`_`: `E`) => `F` |

#### Returns

`F`

#### Inherited from

Pipeable.pipe

▸ **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`\>(`this`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`): `G`

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |
| `C`  |
| `D`  |
| `E`  |
| `F`  |
| `G`  |

#### Parameters

| Name   | Type              |
| :----- | :---------------- |
| `this` | `A`               |
| `ab`   | (`_`: `A`) => `B` |
| `bc`   | (`_`: `B`) => `C` |
| `cd`   | (`_`: `C`) => `D` |
| `de`   | (`_`: `D`) => `E` |
| `ef`   | (`_`: `E`) => `F` |
| `fg`   | (`_`: `F`) => `G` |

#### Returns

`G`

#### Inherited from

Pipeable.pipe

▸ **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`\>(`this`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`): `H`

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |
| `C`  |
| `D`  |
| `E`  |
| `F`  |
| `G`  |
| `H`  |

#### Parameters

| Name   | Type              |
| :----- | :---------------- |
| `this` | `A`               |
| `ab`   | (`_`: `A`) => `B` |
| `bc`   | (`_`: `B`) => `C` |
| `cd`   | (`_`: `C`) => `D` |
| `de`   | (`_`: `D`) => `E` |
| `ef`   | (`_`: `E`) => `F` |
| `fg`   | (`_`: `F`) => `G` |
| `gh`   | (`_`: `G`) => `H` |

#### Returns

`H`

#### Inherited from

Pipeable.pipe

▸ **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`\>(`this`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`): `I`

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |
| `C`  |
| `D`  |
| `E`  |
| `F`  |
| `G`  |
| `H`  |
| `I`  |

#### Parameters

| Name   | Type              |
| :----- | :---------------- |
| `this` | `A`               |
| `ab`   | (`_`: `A`) => `B` |
| `bc`   | (`_`: `B`) => `C` |
| `cd`   | (`_`: `C`) => `D` |
| `de`   | (`_`: `D`) => `E` |
| `ef`   | (`_`: `E`) => `F` |
| `fg`   | (`_`: `F`) => `G` |
| `gh`   | (`_`: `G`) => `H` |
| `hi`   | (`_`: `H`) => `I` |

#### Returns

`I`

#### Inherited from

Pipeable.pipe

▸ **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`\>(`this`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`): `J`

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |
| `C`  |
| `D`  |
| `E`  |
| `F`  |
| `G`  |
| `H`  |
| `I`  |
| `J`  |

#### Parameters

| Name   | Type              |
| :----- | :---------------- |
| `this` | `A`               |
| `ab`   | (`_`: `A`) => `B` |
| `bc`   | (`_`: `B`) => `C` |
| `cd`   | (`_`: `C`) => `D` |
| `de`   | (`_`: `D`) => `E` |
| `ef`   | (`_`: `E`) => `F` |
| `fg`   | (`_`: `F`) => `G` |
| `gh`   | (`_`: `G`) => `H` |
| `hi`   | (`_`: `H`) => `I` |
| `ij`   | (`_`: `I`) => `J` |

#### Returns

`J`

#### Inherited from

Pipeable.pipe

▸ **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`\>(`this`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`): `K`

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |
| `C`  |
| `D`  |
| `E`  |
| `F`  |
| `G`  |
| `H`  |
| `I`  |
| `J`  |
| `K`  |

#### Parameters

| Name   | Type              |
| :----- | :---------------- |
| `this` | `A`               |
| `ab`   | (`_`: `A`) => `B` |
| `bc`   | (`_`: `B`) => `C` |
| `cd`   | (`_`: `C`) => `D` |
| `de`   | (`_`: `D`) => `E` |
| `ef`   | (`_`: `E`) => `F` |
| `fg`   | (`_`: `F`) => `G` |
| `gh`   | (`_`: `G`) => `H` |
| `hi`   | (`_`: `H`) => `I` |
| `ij`   | (`_`: `I`) => `J` |
| `jk`   | (`_`: `J`) => `K` |

#### Returns

`K`

#### Inherited from

Pipeable.pipe

▸ **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`\>(`this`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`): `L`

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |
| `C`  |
| `D`  |
| `E`  |
| `F`  |
| `G`  |
| `H`  |
| `I`  |
| `J`  |
| `K`  |
| `L`  |

#### Parameters

| Name   | Type              |
| :----- | :---------------- |
| `this` | `A`               |
| `ab`   | (`_`: `A`) => `B` |
| `bc`   | (`_`: `B`) => `C` |
| `cd`   | (`_`: `C`) => `D` |
| `de`   | (`_`: `D`) => `E` |
| `ef`   | (`_`: `E`) => `F` |
| `fg`   | (`_`: `F`) => `G` |
| `gh`   | (`_`: `G`) => `H` |
| `hi`   | (`_`: `H`) => `I` |
| `ij`   | (`_`: `I`) => `J` |
| `jk`   | (`_`: `J`) => `K` |
| `kl`   | (`_`: `K`) => `L` |

#### Returns

`L`

#### Inherited from

Pipeable.pipe

▸ **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`\>(`this`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`, `lm`): `M`

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |
| `C`  |
| `D`  |
| `E`  |
| `F`  |
| `G`  |
| `H`  |
| `I`  |
| `J`  |
| `K`  |
| `L`  |
| `M`  |

#### Parameters

| Name   | Type              |
| :----- | :---------------- |
| `this` | `A`               |
| `ab`   | (`_`: `A`) => `B` |
| `bc`   | (`_`: `B`) => `C` |
| `cd`   | (`_`: `C`) => `D` |
| `de`   | (`_`: `D`) => `E` |
| `ef`   | (`_`: `E`) => `F` |
| `fg`   | (`_`: `F`) => `G` |
| `gh`   | (`_`: `G`) => `H` |
| `hi`   | (`_`: `H`) => `I` |
| `ij`   | (`_`: `I`) => `J` |
| `jk`   | (`_`: `J`) => `K` |
| `kl`   | (`_`: `K`) => `L` |
| `lm`   | (`_`: `L`) => `M` |

#### Returns

`M`

#### Inherited from

Pipeable.pipe

▸ **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`\>(`this`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`, `lm`, `mn`): `N`

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |
| `C`  |
| `D`  |
| `E`  |
| `F`  |
| `G`  |
| `H`  |
| `I`  |
| `J`  |
| `K`  |
| `L`  |
| `M`  |
| `N`  |

#### Parameters

| Name   | Type              |
| :----- | :---------------- |
| `this` | `A`               |
| `ab`   | (`_`: `A`) => `B` |
| `bc`   | (`_`: `B`) => `C` |
| `cd`   | (`_`: `C`) => `D` |
| `de`   | (`_`: `D`) => `E` |
| `ef`   | (`_`: `E`) => `F` |
| `fg`   | (`_`: `F`) => `G` |
| `gh`   | (`_`: `G`) => `H` |
| `hi`   | (`_`: `H`) => `I` |
| `ij`   | (`_`: `I`) => `J` |
| `jk`   | (`_`: `J`) => `K` |
| `kl`   | (`_`: `K`) => `L` |
| `lm`   | (`_`: `L`) => `M` |
| `mn`   | (`_`: `M`) => `N` |

#### Returns

`N`

#### Inherited from

Pipeable.pipe

▸ **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`, `O`\>(`this`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`, `lm`, `mn`, `no`): `O`

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |
| `C`  |
| `D`  |
| `E`  |
| `F`  |
| `G`  |
| `H`  |
| `I`  |
| `J`  |
| `K`  |
| `L`  |
| `M`  |
| `N`  |
| `O`  |

#### Parameters

| Name   | Type              |
| :----- | :---------------- |
| `this` | `A`               |
| `ab`   | (`_`: `A`) => `B` |
| `bc`   | (`_`: `B`) => `C` |
| `cd`   | (`_`: `C`) => `D` |
| `de`   | (`_`: `D`) => `E` |
| `ef`   | (`_`: `E`) => `F` |
| `fg`   | (`_`: `F`) => `G` |
| `gh`   | (`_`: `G`) => `H` |
| `hi`   | (`_`: `H`) => `I` |
| `ij`   | (`_`: `I`) => `J` |
| `jk`   | (`_`: `J`) => `K` |
| `kl`   | (`_`: `K`) => `L` |
| `lm`   | (`_`: `L`) => `M` |
| `mn`   | (`_`: `M`) => `N` |
| `no`   | (`_`: `N`) => `O` |

#### Returns

`O`

#### Inherited from

Pipeable.pipe

▸ **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`, `O`, `P`\>(`this`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`, `lm`, `mn`, `no`, `op`): `P`

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |
| `C`  |
| `D`  |
| `E`  |
| `F`  |
| `G`  |
| `H`  |
| `I`  |
| `J`  |
| `K`  |
| `L`  |
| `M`  |
| `N`  |
| `O`  |
| `P`  |

#### Parameters

| Name   | Type              |
| :----- | :---------------- |
| `this` | `A`               |
| `ab`   | (`_`: `A`) => `B` |
| `bc`   | (`_`: `B`) => `C` |
| `cd`   | (`_`: `C`) => `D` |
| `de`   | (`_`: `D`) => `E` |
| `ef`   | (`_`: `E`) => `F` |
| `fg`   | (`_`: `F`) => `G` |
| `gh`   | (`_`: `G`) => `H` |
| `hi`   | (`_`: `H`) => `I` |
| `ij`   | (`_`: `I`) => `J` |
| `jk`   | (`_`: `J`) => `K` |
| `kl`   | (`_`: `K`) => `L` |
| `lm`   | (`_`: `L`) => `M` |
| `mn`   | (`_`: `M`) => `N` |
| `no`   | (`_`: `N`) => `O` |
| `op`   | (`_`: `O`) => `P` |

#### Returns

`P`

#### Inherited from

Pipeable.pipe

▸ **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`, `O`, `P`, `Q`\>(`this`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`, `lm`, `mn`, `no`, `op`, `pq`): `Q`

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |
| `C`  |
| `D`  |
| `E`  |
| `F`  |
| `G`  |
| `H`  |
| `I`  |
| `J`  |
| `K`  |
| `L`  |
| `M`  |
| `N`  |
| `O`  |
| `P`  |
| `Q`  |

#### Parameters

| Name   | Type              |
| :----- | :---------------- |
| `this` | `A`               |
| `ab`   | (`_`: `A`) => `B` |
| `bc`   | (`_`: `B`) => `C` |
| `cd`   | (`_`: `C`) => `D` |
| `de`   | (`_`: `D`) => `E` |
| `ef`   | (`_`: `E`) => `F` |
| `fg`   | (`_`: `F`) => `G` |
| `gh`   | (`_`: `G`) => `H` |
| `hi`   | (`_`: `H`) => `I` |
| `ij`   | (`_`: `I`) => `J` |
| `jk`   | (`_`: `J`) => `K` |
| `kl`   | (`_`: `K`) => `L` |
| `lm`   | (`_`: `L`) => `M` |
| `mn`   | (`_`: `M`) => `N` |
| `no`   | (`_`: `N`) => `O` |
| `op`   | (`_`: `O`) => `P` |
| `pq`   | (`_`: `P`) => `Q` |

#### Returns

`Q`

#### Inherited from

Pipeable.pipe

▸ **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`, `O`, `P`, `Q`, `R`\>(`this`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`, `lm`, `mn`, `no`, `op`, `pq`, `qr`): `R`

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |
| `C`  |
| `D`  |
| `E`  |
| `F`  |
| `G`  |
| `H`  |
| `I`  |
| `J`  |
| `K`  |
| `L`  |
| `M`  |
| `N`  |
| `O`  |
| `P`  |
| `Q`  |
| `R`  |

#### Parameters

| Name   | Type              |
| :----- | :---------------- |
| `this` | `A`               |
| `ab`   | (`_`: `A`) => `B` |
| `bc`   | (`_`: `B`) => `C` |
| `cd`   | (`_`: `C`) => `D` |
| `de`   | (`_`: `D`) => `E` |
| `ef`   | (`_`: `E`) => `F` |
| `fg`   | (`_`: `F`) => `G` |
| `gh`   | (`_`: `G`) => `H` |
| `hi`   | (`_`: `H`) => `I` |
| `ij`   | (`_`: `I`) => `J` |
| `jk`   | (`_`: `J`) => `K` |
| `kl`   | (`_`: `K`) => `L` |
| `lm`   | (`_`: `L`) => `M` |
| `mn`   | (`_`: `M`) => `N` |
| `no`   | (`_`: `N`) => `O` |
| `op`   | (`_`: `O`) => `P` |
| `pq`   | (`_`: `P`) => `Q` |
| `qr`   | (`_`: `Q`) => `R` |

#### Returns

`R`

#### Inherited from

Pipeable.pipe

▸ **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`, `O`, `P`, `Q`, `R`, `S`\>(`this`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`, `lm`, `mn`, `no`, `op`, `pq`, `qr`, `rs`): `S`

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |
| `C`  |
| `D`  |
| `E`  |
| `F`  |
| `G`  |
| `H`  |
| `I`  |
| `J`  |
| `K`  |
| `L`  |
| `M`  |
| `N`  |
| `O`  |
| `P`  |
| `Q`  |
| `R`  |
| `S`  |

#### Parameters

| Name   | Type              |
| :----- | :---------------- |
| `this` | `A`               |
| `ab`   | (`_`: `A`) => `B` |
| `bc`   | (`_`: `B`) => `C` |
| `cd`   | (`_`: `C`) => `D` |
| `de`   | (`_`: `D`) => `E` |
| `ef`   | (`_`: `E`) => `F` |
| `fg`   | (`_`: `F`) => `G` |
| `gh`   | (`_`: `G`) => `H` |
| `hi`   | (`_`: `H`) => `I` |
| `ij`   | (`_`: `I`) => `J` |
| `jk`   | (`_`: `J`) => `K` |
| `kl`   | (`_`: `K`) => `L` |
| `lm`   | (`_`: `L`) => `M` |
| `mn`   | (`_`: `M`) => `N` |
| `no`   | (`_`: `N`) => `O` |
| `op`   | (`_`: `O`) => `P` |
| `pq`   | (`_`: `P`) => `Q` |
| `qr`   | (`_`: `Q`) => `R` |
| `rs`   | (`_`: `R`) => `S` |

#### Returns

`S`

#### Inherited from

Pipeable.pipe

▸ **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`, `O`, `P`, `Q`, `R`, `S`, `T`\>(`this`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`, `lm`, `mn`, `no`, `op`, `pq`, `qr`, `rs`, `st`): `T`

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |
| `C`  |
| `D`  |
| `E`  |
| `F`  |
| `G`  |
| `H`  |
| `I`  |
| `J`  |
| `K`  |
| `L`  |
| `M`  |
| `N`  |
| `O`  |
| `P`  |
| `Q`  |
| `R`  |
| `S`  |
| `T`  |

#### Parameters

| Name   | Type              |
| :----- | :---------------- |
| `this` | `A`               |
| `ab`   | (`_`: `A`) => `B` |
| `bc`   | (`_`: `B`) => `C` |
| `cd`   | (`_`: `C`) => `D` |
| `de`   | (`_`: `D`) => `E` |
| `ef`   | (`_`: `E`) => `F` |
| `fg`   | (`_`: `F`) => `G` |
| `gh`   | (`_`: `G`) => `H` |
| `hi`   | (`_`: `H`) => `I` |
| `ij`   | (`_`: `I`) => `J` |
| `jk`   | (`_`: `J`) => `K` |
| `kl`   | (`_`: `K`) => `L` |
| `lm`   | (`_`: `L`) => `M` |
| `mn`   | (`_`: `M`) => `N` |
| `no`   | (`_`: `N`) => `O` |
| `op`   | (`_`: `O`) => `P` |
| `pq`   | (`_`: `P`) => `Q` |
| `qr`   | (`_`: `Q`) => `R` |
| `rs`   | (`_`: `R`) => `S` |
| `st`   | (`_`: `S`) => `T` |

#### Returns

`T`

#### Inherited from

Pipeable.pipe

▸ **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`, `O`, `P`, `Q`, `R`, `S`, `T`, `U`\>(`this`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`, `lm`, `mn`, `no`, `op`, `pq`, `qr`, `rs`, `st`, `tu`): `U`

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |
| `C`  |
| `D`  |
| `E`  |
| `F`  |
| `G`  |
| `H`  |
| `I`  |
| `J`  |
| `K`  |
| `L`  |
| `M`  |
| `N`  |
| `O`  |
| `P`  |
| `Q`  |
| `R`  |
| `S`  |
| `T`  |
| `U`  |

#### Parameters

| Name   | Type              |
| :----- | :---------------- |
| `this` | `A`               |
| `ab`   | (`_`: `A`) => `B` |
| `bc`   | (`_`: `B`) => `C` |
| `cd`   | (`_`: `C`) => `D` |
| `de`   | (`_`: `D`) => `E` |
| `ef`   | (`_`: `E`) => `F` |
| `fg`   | (`_`: `F`) => `G` |
| `gh`   | (`_`: `G`) => `H` |
| `hi`   | (`_`: `H`) => `I` |
| `ij`   | (`_`: `I`) => `J` |
| `jk`   | (`_`: `J`) => `K` |
| `kl`   | (`_`: `K`) => `L` |
| `lm`   | (`_`: `L`) => `M` |
| `mn`   | (`_`: `M`) => `N` |
| `no`   | (`_`: `N`) => `O` |
| `op`   | (`_`: `O`) => `P` |
| `pq`   | (`_`: `P`) => `Q` |
| `qr`   | (`_`: `Q`) => `R` |
| `rs`   | (`_`: `R`) => `S` |
| `st`   | (`_`: `S`) => `T` |
| `tu`   | (`_`: `T`) => `U` |

#### Returns

`U`

#### Inherited from

Pipeable.pipe

▸ **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`, `O`, `P`, `Q`, `R`, `S`, `T`, `U`\>(`this`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`, `lm`, `mn`, `no`, `op`, `pq`, `qr`, `rs`, `st`, `tu`): `U`

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |
| `C`  |
| `D`  |
| `E`  |
| `F`  |
| `G`  |
| `H`  |
| `I`  |
| `J`  |
| `K`  |
| `L`  |
| `M`  |
| `N`  |
| `O`  |
| `P`  |
| `Q`  |
| `R`  |
| `S`  |
| `T`  |
| `U`  |

#### Parameters

| Name   | Type              |
| :----- | :---------------- |
| `this` | `A`               |
| `ab`   | (`_`: `A`) => `B` |
| `bc`   | (`_`: `B`) => `C` |
| `cd`   | (`_`: `C`) => `D` |
| `de`   | (`_`: `D`) => `E` |
| `ef`   | (`_`: `E`) => `F` |
| `fg`   | (`_`: `F`) => `G` |
| `gh`   | (`_`: `G`) => `H` |
| `hi`   | (`_`: `H`) => `I` |
| `ij`   | (`_`: `I`) => `J` |
| `jk`   | (`_`: `J`) => `K` |
| `kl`   | (`_`: `K`) => `L` |
| `lm`   | (`_`: `L`) => `M` |
| `mn`   | (`_`: `M`) => `N` |
| `no`   | (`_`: `N`) => `O` |
| `op`   | (`_`: `O`) => `P` |
| `pq`   | (`_`: `P`) => `Q` |
| `qr`   | (`_`: `Q`) => `R` |
| `rs`   | (`_`: `R`) => `S` |
| `st`   | (`_`: `S`) => `T` |
| `tu`   | (`_`: `T`) => `U` |

#### Returns

`U`

#### Inherited from

Pipeable.pipe
