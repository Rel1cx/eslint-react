[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [Ref](../README.md) / Ref

# Interface: Ref\<A\>

## Since

2.0.0

## Category

models

## Extends

- [`Variance`](../namespaces/Ref/interfaces/Variance.md)\<`A`\>.`Effect`\<`A`\>.`Readable`\<`A`\>

## Type Parameters

• **A**

## Properties

### \[ChannelTypeId\]

> `readonly` **\[ChannelTypeId\]**: `VarianceStruct`\<`never`, `unknown`, `never`, `unknown`, `A`, `unknown`, `never`\>

#### Inherited from

`Effect.Effect.[ChannelTypeId]`

***

### \[EffectTypeId\]

> `readonly` **\[EffectTypeId\]**: `VarianceStruct`\<`A`, `never`, `never`\>

#### Inherited from

`Effect.Effect.[EffectTypeId]`

***

### \[ignoreSymbol\]?

> `readonly` `optional` **\[ignoreSymbol\]**: [`RefUnifyIgnore`](RefUnifyIgnore.md)

#### Overrides

`Effect.Effect.[ignoreSymbol]`

***

### \[RefTypeId\]

> `readonly` **\[RefTypeId\]**: `object`

#### \_A

> `readonly` **\_A**: `Invariant`\<`A`\>

#### Inherited from

[`Variance`](../namespaces/Ref/interfaces/Variance.md).[`[RefTypeId]`](../namespaces/Ref/interfaces/Variance.md#%5Breftypeid%5D)

***

### \[SinkTypeId\]

> `readonly` **\[SinkTypeId\]**: `VarianceStruct`\<`A`, `unknown`, `never`, `never`, `never`\>

#### Inherited from

`Effect.Effect.[SinkTypeId]`

***

### \[StreamTypeId\]

> `readonly` **\[StreamTypeId\]**: `VarianceStruct`\<`A`, `never`, `never`\>

#### Inherited from

`Effect.Effect.[StreamTypeId]`

***

### \[TypeId\]

> `readonly` **\[TypeId\]**: *typeof* `TypeId`

#### Inherited from

`Readable.Readable.[TypeId]`

***

### \[typeSymbol\]?

> `readonly` `optional` **\[typeSymbol\]**: `unknown`

#### Overrides

`Effect.Effect.[typeSymbol]`

***

### \[unifySymbol\]?

> `readonly` `optional` **\[unifySymbol\]**: [`RefUnify`](RefUnify.md)\<[`Ref`](Ref.md)\<`A`\>\>

#### Overrides

`Effect.Effect.[unifySymbol]`

***

### get

> `readonly` **get**: `Effect`\<`A`, `never`, `never`\>

#### Inherited from

`Readable.Readable.get`

## Methods

### \[iterator\]()

> **\[iterator\]**(): `EffectGenerator`\<`Effect`\<`A`, `never`, `never`\>\>

#### Returns

`EffectGenerator`\<`Effect`\<`A`, `never`, `never`\>\>

#### Inherited from

`Effect.Effect.[iterator]`

***

### modify()

> **modify**\<`B`\>(`f`): `Effect`\<`B`, `never`, `never`\>

#### Type Parameters

• **B**

#### Parameters

• **f**

#### Returns

`Effect`\<`B`, `never`, `never`\>

***

### pipe()

#### pipe(this)

> **pipe**\<`A`\>(`this`): `A`

##### Type Parameters

• **A**

##### Parameters

• **this**: `A`

##### Returns

`A`

##### Inherited from

`Effect.Effect.pipe`

#### pipe(this, ab)

> **pipe**\<`A`, `B`\>(`this`, `ab`): `B`

##### Type Parameters

• **A**

• **B** = `never`

##### Parameters

• **this**: `A`

• **ab**

##### Returns

`B`

##### Inherited from

`Effect.Effect.pipe`

#### pipe(this, ab, bc)

> **pipe**\<`A`, `B`, `C`\>(`this`, `ab`, `bc`): `C`

##### Type Parameters

• **A**

• **B** = `never`

• **C** = `never`

##### Parameters

• **this**: `A`

• **ab**

• **bc**

##### Returns

`C`

##### Inherited from

`Effect.Effect.pipe`

#### pipe(this, ab, bc, cd)

> **pipe**\<`A`, `B`, `C`, `D`\>(`this`, `ab`, `bc`, `cd`): `D`

##### Type Parameters

• **A**

• **B** = `never`

• **C** = `never`

• **D** = `never`

##### Parameters

• **this**: `A`

• **ab**

• **bc**

• **cd**

##### Returns

`D`

##### Inherited from

`Effect.Effect.pipe`

#### pipe(this, ab, bc, cd, de)

> **pipe**\<`A`, `B`, `C`, `D`, `E`\>(`this`, `ab`, `bc`, `cd`, `de`): `E`

##### Type Parameters

• **A**

• **B** = `never`

• **C** = `never`

• **D** = `never`

• **E** = `never`

##### Parameters

• **this**: `A`

• **ab**

• **bc**

• **cd**

• **de**

##### Returns

`E`

##### Inherited from

`Effect.Effect.pipe`

#### pipe(this, ab, bc, cd, de, ef)

> **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`\>(`this`, `ab`, `bc`, `cd`, `de`, `ef`): `F`

##### Type Parameters

• **A**

• **B** = `never`

• **C** = `never`

• **D** = `never`

• **E** = `never`

• **F** = `never`

##### Parameters

• **this**: `A`

• **ab**

• **bc**

• **cd**

• **de**

• **ef**

##### Returns

`F`

##### Inherited from

`Effect.Effect.pipe`

#### pipe(this, ab, bc, cd, de, ef, fg)

> **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`\>(`this`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`): `G`

##### Type Parameters

• **A**

• **B** = `never`

• **C** = `never`

• **D** = `never`

• **E** = `never`

• **F** = `never`

• **G** = `never`

##### Parameters

• **this**: `A`

• **ab**

• **bc**

• **cd**

• **de**

• **ef**

• **fg**

##### Returns

`G`

##### Inherited from

`Effect.Effect.pipe`

#### pipe(this, ab, bc, cd, de, ef, fg, gh)

> **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`\>(`this`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`): `H`

##### Type Parameters

• **A**

• **B** = `never`

• **C** = `never`

• **D** = `never`

• **E** = `never`

• **F** = `never`

• **G** = `never`

• **H** = `never`

##### Parameters

• **this**: `A`

• **ab**

• **bc**

• **cd**

• **de**

• **ef**

• **fg**

• **gh**

##### Returns

`H`

##### Inherited from

`Effect.Effect.pipe`

#### pipe(this, ab, bc, cd, de, ef, fg, gh, hi)

> **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`\>(`this`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`): `I`

##### Type Parameters

• **A**

• **B** = `never`

• **C** = `never`

• **D** = `never`

• **E** = `never`

• **F** = `never`

• **G** = `never`

• **H** = `never`

• **I** = `never`

##### Parameters

• **this**: `A`

• **ab**

• **bc**

• **cd**

• **de**

• **ef**

• **fg**

• **gh**

• **hi**

##### Returns

`I`

##### Inherited from

`Effect.Effect.pipe`

#### pipe(this, ab, bc, cd, de, ef, fg, gh, hi, ij)

> **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`\>(`this`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`): `J`

##### Type Parameters

• **A**

• **B** = `never`

• **C** = `never`

• **D** = `never`

• **E** = `never`

• **F** = `never`

• **G** = `never`

• **H** = `never`

• **I** = `never`

• **J** = `never`

##### Parameters

• **this**: `A`

• **ab**

• **bc**

• **cd**

• **de**

• **ef**

• **fg**

• **gh**

• **hi**

• **ij**

##### Returns

`J`

##### Inherited from

`Effect.Effect.pipe`

#### pipe(this, ab, bc, cd, de, ef, fg, gh, hi, ij, jk)

> **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`\>(`this`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`): `K`

##### Type Parameters

• **A**

• **B** = `never`

• **C** = `never`

• **D** = `never`

• **E** = `never`

• **F** = `never`

• **G** = `never`

• **H** = `never`

• **I** = `never`

• **J** = `never`

• **K** = `never`

##### Parameters

• **this**: `A`

• **ab**

• **bc**

• **cd**

• **de**

• **ef**

• **fg**

• **gh**

• **hi**

• **ij**

• **jk**

##### Returns

`K`

##### Inherited from

`Effect.Effect.pipe`

#### pipe(this, ab, bc, cd, de, ef, fg, gh, hi, ij, jk, kl)

> **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`\>(`this`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`): `L`

##### Type Parameters

• **A**

• **B** = `never`

• **C** = `never`

• **D** = `never`

• **E** = `never`

• **F** = `never`

• **G** = `never`

• **H** = `never`

• **I** = `never`

• **J** = `never`

• **K** = `never`

• **L** = `never`

##### Parameters

• **this**: `A`

• **ab**

• **bc**

• **cd**

• **de**

• **ef**

• **fg**

• **gh**

• **hi**

• **ij**

• **jk**

• **kl**

##### Returns

`L`

##### Inherited from

`Effect.Effect.pipe`

#### pipe(this, ab, bc, cd, de, ef, fg, gh, hi, ij, jk, kl, lm)

> **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`\>(`this`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`, `lm`): `M`

##### Type Parameters

• **A**

• **B** = `never`

• **C** = `never`

• **D** = `never`

• **E** = `never`

• **F** = `never`

• **G** = `never`

• **H** = `never`

• **I** = `never`

• **J** = `never`

• **K** = `never`

• **L** = `never`

• **M** = `never`

##### Parameters

• **this**: `A`

• **ab**

• **bc**

• **cd**

• **de**

• **ef**

• **fg**

• **gh**

• **hi**

• **ij**

• **jk**

• **kl**

• **lm**

##### Returns

`M`

##### Inherited from

`Effect.Effect.pipe`

#### pipe(this, ab, bc, cd, de, ef, fg, gh, hi, ij, jk, kl, lm, mn)

> **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`\>(`this`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`, `lm`, `mn`): `N`

##### Type Parameters

• **A**

• **B** = `never`

• **C** = `never`

• **D** = `never`

• **E** = `never`

• **F** = `never`

• **G** = `never`

• **H** = `never`

• **I** = `never`

• **J** = `never`

• **K** = `never`

• **L** = `never`

• **M** = `never`

• **N** = `never`

##### Parameters

• **this**: `A`

• **ab**

• **bc**

• **cd**

• **de**

• **ef**

• **fg**

• **gh**

• **hi**

• **ij**

• **jk**

• **kl**

• **lm**

• **mn**

##### Returns

`N`

##### Inherited from

`Effect.Effect.pipe`

#### pipe(this, ab, bc, cd, de, ef, fg, gh, hi, ij, jk, kl, lm, mn, no)

> **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`, `O`\>(`this`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`, `lm`, `mn`, `no`): `O`

##### Type Parameters

• **A**

• **B** = `never`

• **C** = `never`

• **D** = `never`

• **E** = `never`

• **F** = `never`

• **G** = `never`

• **H** = `never`

• **I** = `never`

• **J** = `never`

• **K** = `never`

• **L** = `never`

• **M** = `never`

• **N** = `never`

• **O** = `never`

##### Parameters

• **this**: `A`

• **ab**

• **bc**

• **cd**

• **de**

• **ef**

• **fg**

• **gh**

• **hi**

• **ij**

• **jk**

• **kl**

• **lm**

• **mn**

• **no**

##### Returns

`O`

##### Inherited from

`Effect.Effect.pipe`

#### pipe(this, ab, bc, cd, de, ef, fg, gh, hi, ij, jk, kl, lm, mn, no, op)

> **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`, `O`, `P`\>(`this`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`, `lm`, `mn`, `no`, `op`): `P`

##### Type Parameters

• **A**

• **B** = `never`

• **C** = `never`

• **D** = `never`

• **E** = `never`

• **F** = `never`

• **G** = `never`

• **H** = `never`

• **I** = `never`

• **J** = `never`

• **K** = `never`

• **L** = `never`

• **M** = `never`

• **N** = `never`

• **O** = `never`

• **P** = `never`

##### Parameters

• **this**: `A`

• **ab**

• **bc**

• **cd**

• **de**

• **ef**

• **fg**

• **gh**

• **hi**

• **ij**

• **jk**

• **kl**

• **lm**

• **mn**

• **no**

• **op**

##### Returns

`P`

##### Inherited from

`Effect.Effect.pipe`

#### pipe(this, ab, bc, cd, de, ef, fg, gh, hi, ij, jk, kl, lm, mn, no, op, pq)

> **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`, `O`, `P`, `Q`\>(`this`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`, `lm`, `mn`, `no`, `op`, `pq`): `Q`

##### Type Parameters

• **A**

• **B** = `never`

• **C** = `never`

• **D** = `never`

• **E** = `never`

• **F** = `never`

• **G** = `never`

• **H** = `never`

• **I** = `never`

• **J** = `never`

• **K** = `never`

• **L** = `never`

• **M** = `never`

• **N** = `never`

• **O** = `never`

• **P** = `never`

• **Q** = `never`

##### Parameters

• **this**: `A`

• **ab**

• **bc**

• **cd**

• **de**

• **ef**

• **fg**

• **gh**

• **hi**

• **ij**

• **jk**

• **kl**

• **lm**

• **mn**

• **no**

• **op**

• **pq**

##### Returns

`Q`

##### Inherited from

`Effect.Effect.pipe`

#### pipe(this, ab, bc, cd, de, ef, fg, gh, hi, ij, jk, kl, lm, mn, no, op, pq, qr)

> **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`, `O`, `P`, `Q`, `R`\>(`this`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`, `lm`, `mn`, `no`, `op`, `pq`, `qr`): `R`

##### Type Parameters

• **A**

• **B** = `never`

• **C** = `never`

• **D** = `never`

• **E** = `never`

• **F** = `never`

• **G** = `never`

• **H** = `never`

• **I** = `never`

• **J** = `never`

• **K** = `never`

• **L** = `never`

• **M** = `never`

• **N** = `never`

• **O** = `never`

• **P** = `never`

• **Q** = `never`

• **R** = `never`

##### Parameters

• **this**: `A`

• **ab**

• **bc**

• **cd**

• **de**

• **ef**

• **fg**

• **gh**

• **hi**

• **ij**

• **jk**

• **kl**

• **lm**

• **mn**

• **no**

• **op**

• **pq**

• **qr**

##### Returns

`R`

##### Inherited from

`Effect.Effect.pipe`

#### pipe(this, ab, bc, cd, de, ef, fg, gh, hi, ij, jk, kl, lm, mn, no, op, pq, qr, rs)

> **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`, `O`, `P`, `Q`, `R`, `S`\>(`this`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`, `lm`, `mn`, `no`, `op`, `pq`, `qr`, `rs`): `S`

##### Type Parameters

• **A**

• **B** = `never`

• **C** = `never`

• **D** = `never`

• **E** = `never`

• **F** = `never`

• **G** = `never`

• **H** = `never`

• **I** = `never`

• **J** = `never`

• **K** = `never`

• **L** = `never`

• **M** = `never`

• **N** = `never`

• **O** = `never`

• **P** = `never`

• **Q** = `never`

• **R** = `never`

• **S** = `never`

##### Parameters

• **this**: `A`

• **ab**

• **bc**

• **cd**

• **de**

• **ef**

• **fg**

• **gh**

• **hi**

• **ij**

• **jk**

• **kl**

• **lm**

• **mn**

• **no**

• **op**

• **pq**

• **qr**

• **rs**

##### Returns

`S`

##### Inherited from

`Effect.Effect.pipe`

#### pipe(this, ab, bc, cd, de, ef, fg, gh, hi, ij, jk, kl, lm, mn, no, op, pq, qr, rs, st)

> **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`, `O`, `P`, `Q`, `R`, `S`, `T`\>(`this`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`, `lm`, `mn`, `no`, `op`, `pq`, `qr`, `rs`, `st`): `T`

##### Type Parameters

• **A**

• **B** = `never`

• **C** = `never`

• **D** = `never`

• **E** = `never`

• **F** = `never`

• **G** = `never`

• **H** = `never`

• **I** = `never`

• **J** = `never`

• **K** = `never`

• **L** = `never`

• **M** = `never`

• **N** = `never`

• **O** = `never`

• **P** = `never`

• **Q** = `never`

• **R** = `never`

• **S** = `never`

• **T** = `never`

##### Parameters

• **this**: `A`

• **ab**

• **bc**

• **cd**

• **de**

• **ef**

• **fg**

• **gh**

• **hi**

• **ij**

• **jk**

• **kl**

• **lm**

• **mn**

• **no**

• **op**

• **pq**

• **qr**

• **rs**

• **st**

##### Returns

`T`

##### Inherited from

`Effect.Effect.pipe`

#### pipe(this, ab, bc, cd, de, ef, fg, gh, hi, ij, jk, kl, lm, mn, no, op, pq, qr, rs, st, tu)

> **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`, `O`, `P`, `Q`, `R`, `S`, `T`, `U`\>(`this`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`, `lm`, `mn`, `no`, `op`, `pq`, `qr`, `rs`, `st`, `tu`): `U`

##### Type Parameters

• **A**

• **B** = `never`

• **C** = `never`

• **D** = `never`

• **E** = `never`

• **F** = `never`

• **G** = `never`

• **H** = `never`

• **I** = `never`

• **J** = `never`

• **K** = `never`

• **L** = `never`

• **M** = `never`

• **N** = `never`

• **O** = `never`

• **P** = `never`

• **Q** = `never`

• **R** = `never`

• **S** = `never`

• **T** = `never`

• **U** = `never`

##### Parameters

• **this**: `A`

• **ab**

• **bc**

• **cd**

• **de**

• **ef**

• **fg**

• **gh**

• **hi**

• **ij**

• **jk**

• **kl**

• **lm**

• **mn**

• **no**

• **op**

• **pq**

• **qr**

• **rs**

• **st**

• **tu**

##### Returns

`U`

##### Inherited from

`Effect.Effect.pipe`

#### pipe(this, ab, bc, cd, de, ef, fg, gh, hi, ij, jk, kl, lm, mn, no, op, pq, qr, rs, st, tu)

> **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`, `O`, `P`, `Q`, `R`, `S`, `T`, `U`\>(`this`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`, `lm`, `mn`, `no`, `op`, `pq`, `qr`, `rs`, `st`, `tu`): `U`

##### Type Parameters

• **A**

• **B** = `never`

• **C** = `never`

• **D** = `never`

• **E** = `never`

• **F** = `never`

• **G** = `never`

• **H** = `never`

• **I** = `never`

• **J** = `never`

• **K** = `never`

• **L** = `never`

• **M** = `never`

• **N** = `never`

• **O** = `never`

• **P** = `never`

• **Q** = `never`

• **R** = `never`

• **S** = `never`

• **T** = `never`

• **U** = `never`

##### Parameters

• **this**: `A`

• **ab**

• **bc**

• **cd**

• **de**

• **ef**

• **fg**

• **gh**

• **hi**

• **ij**

• **jk**

• **kl**

• **lm**

• **mn**

• **no**

• **op**

• **pq**

• **qr**

• **rs**

• **st**

• **tu**

##### Returns

`U`

##### Inherited from

`Effect.Effect.pipe`
