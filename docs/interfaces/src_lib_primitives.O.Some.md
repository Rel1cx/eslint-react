[eslint-plugin-react-ts](../README.md) / [src/lib/primitives](../modules/src_lib_primitives.md) / [O](../modules/src_lib_primitives.O.md) / Some

# Interface: Some<A\>

[src/lib/primitives](../modules/src_lib_primitives.md).[O](../modules/src_lib_primitives.O.md).Some

**`Since`**

1.0.0

## Type parameters

| Name |
| :------ |
| `A` |

## Hierarchy

- [`Case`](src_lib_primitives.Data.Case-1.md)

- `Pipeable`

- `Inspectable`

  ↳ **`Some`**

## Table of contents

### Properties

- [[NodeInspectSymbol]](src_lib_primitives.O.Some.md#[nodeinspectsymbol])
- [[TypeId]](src_lib_primitives.O.Some.md#[typeid])
- [[blacklistSymbol]](src_lib_primitives.O.Some.md#[blacklistsymbol])
- [[typeSymbol]](src_lib_primitives.O.Some.md#[typesymbol])
- [[unifySymbol]](src_lib_primitives.O.Some.md#[unifysymbol])
- [\_tag](src_lib_primitives.O.Some.md#_tag)
- [toJSON](src_lib_primitives.O.Some.md#tojson)
- [toString](src_lib_primitives.O.Some.md#tostring)
- [value](src_lib_primitives.O.Some.md#value)

### Methods

- [[symbol]](src_lib_primitives.O.Some.md#[symbol])
- [[symbol]](src_lib_primitives.O.Some.md#[symbol]-1)
- [pipe](src_lib_primitives.O.Some.md#pipe)

## Properties

### [NodeInspectSymbol]

• `Readonly` **[NodeInspectSymbol]**: () => `unknown`

#### Type declaration

▸ (): `unknown`

##### Returns

`unknown`

#### Inherited from

Inspectable.[NodeInspectSymbol]

#### Defined in

node_modules/@effect/data/Inspectable.d.ts:21

___

### [TypeId]

• `Readonly` **[TypeId]**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_A` | (`_`: `never`) => `A` |

#### Defined in

node_modules/@effect/data/Option.d.ts:50

___

### [blacklistSymbol]

• `Optional` **[blacklistSymbol]**: [`OptionUnifyBlacklist`](src_lib_primitives.O.OptionUnifyBlacklist.md)

#### Defined in

node_modules/@effect/data/Option.d.ts:55

___

### [typeSymbol]

• `Optional` **[typeSymbol]**: `unknown`

#### Defined in

node_modules/@effect/data/Option.d.ts:53

___

### [unifySymbol]

• `Optional` **[unifySymbol]**: [`OptionUnify`](src_lib_primitives.O.OptionUnify.md)<[`Some`](src_lib_primitives.O.Some.md)<`A`\>\>

#### Defined in

node_modules/@effect/data/Option.d.ts:54

___

### \_tag

• `Readonly` **\_tag**: ``"Some"``

#### Defined in

node_modules/@effect/data/Option.d.ts:48

___

### toJSON

• `Readonly` **toJSON**: () => `unknown`

#### Type declaration

▸ (): `unknown`

##### Returns

`unknown`

#### Inherited from

Inspectable.toJSON

#### Defined in

node_modules/@effect/data/Inspectable.d.ts:20

___

### toString

• `Readonly` **toString**: () => `string`

#### Type declaration

▸ (): `string`

##### Returns

`string`

#### Inherited from

Inspectable.toString

#### Defined in

node_modules/@effect/data/Inspectable.d.ts:19

___

### value

• `Readonly` **value**: `A`

#### Defined in

node_modules/@effect/data/Option.d.ts:49

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

[Case](src_lib_primitives.Data.Case-1.md).[[symbol]](src_lib_primitives.Data.Case-1.md#[symbol]-1)

#### Defined in

node_modules/@effect/data/Equal.d.ts:16

___

### [symbol]

▸ **[symbol]**(): `number`

#### Returns

`number`

#### Inherited from

Data.Case.[symbol]

#### Defined in

node_modules/@effect/data/Hash.d.ts:11

___

### pipe

▸ **pipe**<`A`, `B`\>(`this`, `ab`): `B`

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

#### Defined in

node_modules/@effect/data/Pipeable.d.ts:9

▸ **pipe**<`A`, `B`, `C`\>(`this`, `ab`, `bc`): `C`

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

#### Defined in

node_modules/@effect/data/Pipeable.d.ts:10

▸ **pipe**<`A`, `B`, `C`, `D`\>(`this`, `ab`, `bc`, `cd`): `D`

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

#### Defined in

node_modules/@effect/data/Pipeable.d.ts:11

▸ **pipe**<`A`, `B`, `C`, `D`, `E`\>(`this`, `ab`, `bc`, `cd`, `de`): `E`

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

#### Defined in

node_modules/@effect/data/Pipeable.d.ts:12

▸ **pipe**<`A`, `B`, `C`, `D`, `E`, `F`\>(`this`, `ab`, `bc`, `cd`, `de`, `ef`): `F`

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

#### Defined in

node_modules/@effect/data/Pipeable.d.ts:13

▸ **pipe**<`A`, `B`, `C`, `D`, `E`, `F`, `G`\>(`this`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`): `G`

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

#### Defined in

node_modules/@effect/data/Pipeable.d.ts:14

▸ **pipe**<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`\>(`this`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`): `H`

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

#### Defined in

node_modules/@effect/data/Pipeable.d.ts:15

▸ **pipe**<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`\>(`this`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`): `I`

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

#### Defined in

node_modules/@effect/data/Pipeable.d.ts:16

▸ **pipe**<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`\>(`this`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`): `J`

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

#### Defined in

node_modules/@effect/data/Pipeable.d.ts:17

▸ **pipe**<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`\>(`this`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`): `K`

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

#### Defined in

node_modules/@effect/data/Pipeable.d.ts:18

▸ **pipe**<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`\>(`this`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`): `L`

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

#### Defined in

node_modules/@effect/data/Pipeable.d.ts:19

▸ **pipe**<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`\>(`this`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`, `lm`): `M`

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

#### Defined in

node_modules/@effect/data/Pipeable.d.ts:20

▸ **pipe**<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`\>(`this`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`, `lm`, `mn`): `N`

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

#### Defined in

node_modules/@effect/data/Pipeable.d.ts:21

▸ **pipe**<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`, `O`\>(`this`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`, `lm`, `mn`, `no`): `O`

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

#### Defined in

node_modules/@effect/data/Pipeable.d.ts:22

▸ **pipe**<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`, `O`, `P`\>(`this`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`, `lm`, `mn`, `no`, `op`): `P`

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

#### Defined in

node_modules/@effect/data/Pipeable.d.ts:23

▸ **pipe**<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`, `O`, `P`, `Q`\>(`this`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`, `lm`, `mn`, `no`, `op`, `pq`): `Q`

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

#### Defined in

node_modules/@effect/data/Pipeable.d.ts:24

▸ **pipe**<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`, `O`, `P`, `Q`, `R`\>(`this`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`, `lm`, `mn`, `no`, `op`, `pq`, `qr`): `R`

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

#### Defined in

node_modules/@effect/data/Pipeable.d.ts:25

▸ **pipe**<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`, `O`, `P`, `Q`, `R`, `S`\>(`this`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`, `lm`, `mn`, `no`, `op`, `pq`, `qr`, `rs`): `S`

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

#### Defined in

node_modules/@effect/data/Pipeable.d.ts:26

▸ **pipe**<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`, `O`, `P`, `Q`, `R`, `S`, `T`\>(`this`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`, `lm`, `mn`, `no`, `op`, `pq`, `qr`, `rs`, `st`): `T`

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

#### Defined in

node_modules/@effect/data/Pipeable.d.ts:27

▸ **pipe**<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`, `O`, `P`, `Q`, `R`, `S`, `T`, `U`\>(`this`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`, `lm`, `mn`, `no`, `op`, `pq`, `qr`, `rs`, `st`, `tu`): `U`

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

#### Defined in

node_modules/@effect/data/Pipeable.d.ts:28

▸ **pipe**<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`, `O`, `P`, `Q`, `R`, `S`, `T`, `U`\>(`this`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`, `lm`, `mn`, `no`, `op`, `pq`, `qr`, `rs`, `st`, `tu`): `U`

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

#### Defined in

node_modules/@effect/data/Pipeable.d.ts:29
