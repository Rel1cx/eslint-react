[@eslint-react/tools](../README.md) / [Chunk](../modules/Chunk.md) / NonEmptyChunk

# Interface: NonEmptyChunk\<A\>

[Chunk](../modules/Chunk.md).NonEmptyChunk

**`Since`**

2.0.0

## Type parameters

| Name |
| :--- |
| `A`  |

## Hierarchy

- [`Chunk`](Chunk.Chunk-1.md)\<`A`\>

- `NonEmptyIterable`\<`A`\>

  ↳ **`NonEmptyChunk`**

## Table of contents

### Properties

- [[TypeId]](Chunk.NonEmptyChunk.md#[typeid])
- [[nonEmpty]](Chunk.NonEmptyChunk.md#[nonempty])
- [length](Chunk.NonEmptyChunk.md#length)

### Methods

- [[NodeInspectSymbol]](Chunk.NonEmptyChunk.md#[nodeinspectsymbol])
- [[iterator]](Chunk.NonEmptyChunk.md#[iterator])
- [[symbol]](Chunk.NonEmptyChunk.md#[symbol])
- [[symbol]](Chunk.NonEmptyChunk.md#[symbol]-1)
- [pipe](Chunk.NonEmptyChunk.md#pipe)
- [toJSON](Chunk.NonEmptyChunk.md#tojson)
- [toString](Chunk.NonEmptyChunk.md#tostring)

## Properties

### [TypeId]

• `Readonly` **[TypeId]**: `Object`

#### Type declaration

| Name | Type               |
| :--- | :----------------- |
| `_A` | `Covariant`\<`A`\> |

#### Inherited from

[Chunk](Chunk.Chunk-1.md).[[TypeId]](Chunk.Chunk-1.md#[typeid])

---

### [nonEmpty]

• `Readonly` **[nonEmpty]**: `A`

#### Inherited from

NonEmptyIterable.[nonEmpty]

---

### length

• `Readonly` **length**: `number`

#### Inherited from

[Chunk](Chunk.Chunk-1.md).[length](Chunk.Chunk-1.md#length)

## Methods

### [NodeInspectSymbol]

▸ **[NodeInspectSymbol]**(): `unknown`

#### Returns

`unknown`

#### Inherited from

[Chunk](Chunk.Chunk-1.md).[[NodeInspectSymbol]](Chunk.Chunk-1.md#[nodeinspectsymbol])

---

### [iterator]

▸ **[iterator]**(): `Iterator`\<`A`, `any`, `undefined`\>

#### Returns

`Iterator`\<`A`, `any`, `undefined`\>

#### Inherited from

[Chunk](Chunk.Chunk-1.md).[[iterator]](Chunk.Chunk-1.md#[iterator])

---

### [symbol]

▸ **[symbol]**(`that`): `boolean`

#### Parameters

| Name   | Type                      |
| :----- | :------------------------ |
| `that` | [`Equal`](Equal.Equal.md) |

#### Returns

`boolean`

#### Inherited from

[Chunk](Chunk.Chunk-1.md).[[symbol]](Chunk.Chunk-1.md#[symbol]-1)

---

### [symbol]

▸ **[symbol]**(): `number`

#### Returns

`number`

#### Inherited from

Chunk.[symbol]

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

[Chunk](Chunk.Chunk-1.md).[pipe](Chunk.Chunk-1.md#pipe)

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

[Chunk](Chunk.Chunk-1.md).[pipe](Chunk.Chunk-1.md#pipe)

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

[Chunk](Chunk.Chunk-1.md).[pipe](Chunk.Chunk-1.md#pipe)

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

[Chunk](Chunk.Chunk-1.md).[pipe](Chunk.Chunk-1.md#pipe)

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

[Chunk](Chunk.Chunk-1.md).[pipe](Chunk.Chunk-1.md#pipe)

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

[Chunk](Chunk.Chunk-1.md).[pipe](Chunk.Chunk-1.md#pipe)

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

[Chunk](Chunk.Chunk-1.md).[pipe](Chunk.Chunk-1.md#pipe)

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

[Chunk](Chunk.Chunk-1.md).[pipe](Chunk.Chunk-1.md#pipe)

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

[Chunk](Chunk.Chunk-1.md).[pipe](Chunk.Chunk-1.md#pipe)

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

[Chunk](Chunk.Chunk-1.md).[pipe](Chunk.Chunk-1.md#pipe)

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

[Chunk](Chunk.Chunk-1.md).[pipe](Chunk.Chunk-1.md#pipe)

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

[Chunk](Chunk.Chunk-1.md).[pipe](Chunk.Chunk-1.md#pipe)

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

[Chunk](Chunk.Chunk-1.md).[pipe](Chunk.Chunk-1.md#pipe)

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

[Chunk](Chunk.Chunk-1.md).[pipe](Chunk.Chunk-1.md#pipe)

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

[Chunk](Chunk.Chunk-1.md).[pipe](Chunk.Chunk-1.md#pipe)

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

[Chunk](Chunk.Chunk-1.md).[pipe](Chunk.Chunk-1.md#pipe)

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

[Chunk](Chunk.Chunk-1.md).[pipe](Chunk.Chunk-1.md#pipe)

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

[Chunk](Chunk.Chunk-1.md).[pipe](Chunk.Chunk-1.md#pipe)

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

[Chunk](Chunk.Chunk-1.md).[pipe](Chunk.Chunk-1.md#pipe)

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

[Chunk](Chunk.Chunk-1.md).[pipe](Chunk.Chunk-1.md#pipe)

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

[Chunk](Chunk.Chunk-1.md).[pipe](Chunk.Chunk-1.md#pipe)

---

### toJSON

▸ **toJSON**(): `unknown`

#### Returns

`unknown`

#### Inherited from

[Chunk](Chunk.Chunk-1.md).[toJSON](Chunk.Chunk-1.md#tojson)

---

### toString

▸ **toString**(): `string`

#### Returns

`string`

#### Inherited from

[Chunk](Chunk.Chunk-1.md).[toString](Chunk.Chunk-1.md#tostring)
