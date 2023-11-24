[@eslint-react/tools](../README.md) / Chunk

# Namespace: Chunk

## Table of contents

### Namespaces

- [Chunk](Chunk.Chunk.md)

### Interfaces

- [Chunk](../interfaces/Chunk.Chunk-1.md)
- [ChunkTypeLambda](../interfaces/Chunk.ChunkTypeLambda.md)
- [NonEmptyChunk](../interfaces/Chunk.NonEmptyChunk.md)

### Type Aliases

- [TypeId](Chunk.md#typeid)

### Functions

- [append](Chunk.md#append)
- [appendAll](Chunk.md#appendall)
- [appendAllNonEmpty](Chunk.md#appendallnonempty)
- [chunksOf](Chunk.md#chunksof)
- [compact](Chunk.md#compact)
- [contains](Chunk.md#contains)
- [containsWith](Chunk.md#containswith)
- [dedupe](Chunk.md#dedupe)
- [dedupeAdjacent](Chunk.md#dedupeadjacent)
- [drop](Chunk.md#drop)
- [dropRight](Chunk.md#dropright)
- [dropWhile](Chunk.md#dropwhile)
- [empty](Chunk.md#empty)
- [every](Chunk.md#every)
- [filter](Chunk.md#filter)
- [filterMap](Chunk.md#filtermap)
- [filterMapWhile](Chunk.md#filtermapwhile)
- [findFirst](Chunk.md#findfirst)
- [findFirstIndex](Chunk.md#findfirstindex)
- [findLast](Chunk.md#findlast)
- [findLastIndex](Chunk.md#findlastindex)
- [flatMap](Chunk.md#flatmap)
- [flatMapNonEmpty](Chunk.md#flatmapnonempty)
- [flatten](Chunk.md#flatten)
- [flattenNonEmpty](Chunk.md#flattennonempty)
- [forEach](Chunk.md#foreach)
- [fromIterable](Chunk.md#fromiterable)
- [get](Chunk.md#get)
- [getEquivalence](Chunk.md#getequivalence)
- [head](Chunk.md#head)
- [headNonEmpty](Chunk.md#headnonempty)
- [intersection](Chunk.md#intersection)
- [isChunk](Chunk.md#ischunk)
- [isEmpty](Chunk.md#isempty)
- [isNonEmpty](Chunk.md#isnonempty)
- [join](Chunk.md#join)
- [last](Chunk.md#last)
- [make](Chunk.md#make)
- [makeBy](Chunk.md#makeby)
- [map](Chunk.md#map)
- [mapAccum](Chunk.md#mapaccum)
- [modify](Chunk.md#modify)
- [modifyOption](Chunk.md#modifyoption)
- [of](Chunk.md#of)
- [partition](Chunk.md#partition)
- [partitionMap](Chunk.md#partitionmap)
- [prepend](Chunk.md#prepend)
- [prependAll](Chunk.md#prependall)
- [prependAllNonEmpty](Chunk.md#prependallnonempty)
- [range](Chunk.md#range)
- [reduce](Chunk.md#reduce)
- [reduceRight](Chunk.md#reduceright)
- [remove](Chunk.md#remove)
- [replace](Chunk.md#replace)
- [replaceOption](Chunk.md#replaceoption)
- [reverse](Chunk.md#reverse)
- [separate](Chunk.md#separate)
- [size](Chunk.md#size)
- [some](Chunk.md#some)
- [sort](Chunk.md#sort)
- [sortWith](Chunk.md#sortwith)
- [split](Chunk.md#split)
- [splitAt](Chunk.md#splitat)
- [splitWhere](Chunk.md#splitwhere)
- [tail](Chunk.md#tail)
- [tailNonEmpty](Chunk.md#tailnonempty)
- [take](Chunk.md#take)
- [takeRight](Chunk.md#takeright)
- [takeWhile](Chunk.md#takewhile)
- [toArray](Chunk.md#toarray)
- [toReadonlyArray](Chunk.md#toreadonlyarray)
- [union](Chunk.md#union)
- [unsafeFromArray](Chunk.md#unsafefromarray)
- [unsafeFromNonEmptyArray](Chunk.md#unsafefromnonemptyarray)
- [unsafeGet](Chunk.md#unsafeget)
- [unsafeHead](Chunk.md#unsafehead)
- [unsafeLast](Chunk.md#unsafelast)
- [unzip](Chunk.md#unzip)
- [zip](Chunk.md#zip)
- [zipWith](Chunk.md#zipwith)

## Other

### drop

▸ **drop**(`n`): \<A\>(`self`: [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>) => [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>

Drops the first up to `n` elements from the chunk

#### Parameters

| Name | Type     |
| :--- | :------- |
| `n`  | `number` |

#### Returns

`fn`

▸ \<`A`\>(`self`): [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>

##### Type parameters

| Name |
| :--- |
| `A`  |

##### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |

##### Returns

[`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>

**`Since`**

2.0.0

▸ **drop**\<`A`\>(`self`, `n`): [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>

Drops the first up to `n` elements from the chunk

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |
| `n`    | `number`                                         |

#### Returns

[`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>

**`Since`**

2.0.0

---

### dropRight

▸ **dropRight**(`n`): \<A\>(`self`: [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>) => [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>

Drops the last `n` elements.

#### Parameters

| Name | Type     |
| :--- | :------- |
| `n`  | `number` |

#### Returns

`fn`

▸ \<`A`\>(`self`): [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>

##### Type parameters

| Name |
| :--- |
| `A`  |

##### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |

##### Returns

[`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>

**`Since`**

2.0.0

▸ **dropRight**\<`A`\>(`self`, `n`): [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>

Drops the last `n` elements.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |
| `n`    | `number`                                         |

#### Returns

[`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>

**`Since`**

2.0.0

---

### dropWhile

▸ **dropWhile**\<`B`, `A`\>(`predicate`): (`self`: [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`B`\>) => [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`B`\>

Drops all elements so long as the predicate returns true.

#### Type parameters

| Name | Type |
| :--- | :--- |
| `B`  | `B`  |
| `A`  | `B`  |

#### Parameters

| Name        | Type               |
| :---------- | :----------------- |
| `predicate` | `Predicate`\<`A`\> |

#### Returns

`fn`

▸ (`self`): [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`B`\>

##### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`B`\> |

##### Returns

[`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`B`\>

**`Since`**

2.0.0

▸ **dropWhile**\<`A`\>(`self`, `predicate`): [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>

Drops all elements so long as the predicate returns true.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name        | Type                                             |
| :---------- | :----------------------------------------------- |
| `self`      | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |
| `predicate` | `Predicate`\<`A`\>                               |

#### Returns

[`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>

**`Since`**

2.0.0

---

### modify

▸ **modify**\<`A`, `B`\>(`i`, `f`): (`self`: [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>) => [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A` \| `B`\>

Apply a function to the element at the specified index, creating a new `Chunk`,
or returning the input if the index is out of bounds.

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |

#### Parameters

| Name | Type              |
| :--- | :---------------- |
| `i`  | `number`          |
| `f`  | (`a`: `A`) => `B` |

#### Returns

`fn`

▸ (`self`): [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A` \| `B`\>

##### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |

##### Returns

[`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A` \| `B`\>

**`Since`**

2.0.0

▸ **modify**\<`A`, `B`\>(`self`, `i`, `f`): [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A` \| `B`\>

Apply a function to the element at the specified index, creating a new `Chunk`,
or returning the input if the index is out of bounds.

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |

#### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |
| `i`    | `number`                                         |
| `f`    | (`a`: `A`) => `B`                                |

#### Returns

[`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A` \| `B`\>

**`Since`**

2.0.0

---

### modifyOption

▸ **modifyOption**\<`A`, `B`\>(`i`, `f`): (`self`: [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>) => [`Option`](O.md#option)\<[`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A` \| `B`\>\>

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |

#### Parameters

| Name | Type              |
| :--- | :---------------- |
| `i`  | `number`          |
| `f`  | (`a`: `A`) => `B` |

#### Returns

`fn`

▸ (`self`): [`Option`](O.md#option)\<[`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A` \| `B`\>\>

##### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |

##### Returns

[`Option`](O.md#option)\<[`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A` \| `B`\>\>

**`Since`**

2.0.0

▸ **modifyOption**\<`A`, `B`\>(`self`, `i`, `f`): [`Option`](O.md#option)\<[`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A` \| `B`\>\>

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |

#### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |
| `i`    | `number`                                         |
| `f`    | (`a`: `A`) => `B`                                |

#### Returns

[`Option`](O.md#option)\<[`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A` \| `B`\>\>

**`Since`**

2.0.0

---

### remove

▸ **remove**(`i`): \<A\>(`self`: [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>) => [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>

Delete the element at the specified index, creating a new `Chunk`,
or returning the input if the index is out of bounds.

#### Parameters

| Name | Type     |
| :--- | :------- |
| `i`  | `number` |

#### Returns

`fn`

▸ \<`A`\>(`self`): [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>

##### Type parameters

| Name |
| :--- |
| `A`  |

##### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |

##### Returns

[`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>

**`Since`**

2.0.0

▸ **remove**\<`A`\>(`self`, `i`): [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>

Delete the element at the specified index, creating a new `Chunk`,
or returning the input if the index is out of bounds.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |
| `i`    | `number`                                         |

#### Returns

[`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>

**`Since`**

2.0.0

---

### replace

▸ **replace**\<`B`\>(`i`, `b`): \<A\>(`self`: [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>) => [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`B` \| `A`\>

Change the element at the specified index, creating a new `Chunk`,
or returning the input if the index is out of bounds.

#### Type parameters

| Name |
| :--- |
| `B`  |

#### Parameters

| Name | Type     |
| :--- | :------- |
| `i`  | `number` |
| `b`  | `B`      |

#### Returns

`fn`

▸ \<`A`\>(`self`): [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`B` \| `A`\>

##### Type parameters

| Name |
| :--- |
| `A`  |

##### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |

##### Returns

[`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`B` \| `A`\>

**`Since`**

2.0.0

▸ **replace**\<`A`, `B`\>(`self`, `i`, `b`): [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A` \| `B`\>

Change the element at the specified index, creating a new `Chunk`,
or returning the input if the index is out of bounds.

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |

#### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |
| `i`    | `number`                                         |
| `b`    | `B`                                              |

#### Returns

[`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A` \| `B`\>

**`Since`**

2.0.0

---

### replaceOption

▸ **replaceOption**\<`B`\>(`i`, `b`): \<A\>(`self`: [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>) => [`Option`](O.md#option)\<[`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`B` \| `A`\>\>

#### Type parameters

| Name |
| :--- |
| `B`  |

#### Parameters

| Name | Type     |
| :--- | :------- |
| `i`  | `number` |
| `b`  | `B`      |

#### Returns

`fn`

▸ \<`A`\>(`self`): [`Option`](O.md#option)\<[`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`B` \| `A`\>\>

##### Type parameters

| Name |
| :--- |
| `A`  |

##### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |

##### Returns

[`Option`](O.md#option)\<[`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`B` \| `A`\>\>

**`Since`**

2.0.0

▸ **replaceOption**\<`A`, `B`\>(`self`, `i`, `b`): [`Option`](O.md#option)\<[`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A` \| `B`\>\>

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |

#### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |
| `i`    | `number`                                         |
| `b`    | `B`                                              |

#### Returns

[`Option`](O.md#option)\<[`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A` \| `B`\>\>

**`Since`**

2.0.0

---

### take

▸ **take**(`n`): \<A\>(`self`: [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>) => [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>

Takes the first up to `n` elements from the chunk

#### Parameters

| Name | Type     |
| :--- | :------- |
| `n`  | `number` |

#### Returns

`fn`

▸ \<`A`\>(`self`): [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>

##### Type parameters

| Name |
| :--- |
| `A`  |

##### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |

##### Returns

[`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>

**`Since`**

2.0.0

▸ **take**\<`A`\>(`self`, `n`): [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>

Takes the first up to `n` elements from the chunk

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |
| `n`    | `number`                                         |

#### Returns

[`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>

**`Since`**

2.0.0

## combinators

### forEach

▸ **forEach**\<`A`, `B`\>(`f`): (`self`: [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>) => `void`

Applies the specified function to each element of the `List`.

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |

#### Parameters

| Name | Type              |
| :--- | :---------------- |
| `f`  | (`a`: `A`) => `B` |

#### Returns

`fn`

▸ (`self`): `void`

##### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |

##### Returns

`void`

**`Since`**

2.0.0

▸ **forEach**\<`A`, `B`\>(`self`, `f`): `void`

Applies the specified function to each element of the `List`.

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |

#### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |
| `f`    | (`a`: `A`) => `B`                                |

#### Returns

`void`

**`Since`**

2.0.0

## concatenating

### append

▸ **append**\<`A2`\>(`a`): \<A\>(`self`: [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>) => [`NonEmptyChunk`](../interfaces/Chunk.NonEmptyChunk.md)\<`A2` \| `A`\>

Appends the specified element to the end of the `Chunk`.

#### Type parameters

| Name |
| :--- |
| `A2` |

#### Parameters

| Name | Type |
| :--- | :--- |
| `a`  | `A2` |

#### Returns

`fn`

▸ \<`A`\>(`self`): [`NonEmptyChunk`](../interfaces/Chunk.NonEmptyChunk.md)\<`A2` \| `A`\>

##### Type parameters

| Name |
| :--- |
| `A`  |

##### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |

##### Returns

[`NonEmptyChunk`](../interfaces/Chunk.NonEmptyChunk.md)\<`A2` \| `A`\>

**`Since`**

2.0.0

▸ **append**\<`A`, `A2`\>(`self`, `a`): [`NonEmptyChunk`](../interfaces/Chunk.NonEmptyChunk.md)\<`A` \| `A2`\>

Appends the specified element to the end of the `Chunk`.

#### Type parameters

| Name |
| :--- |
| `A`  |
| `A2` |

#### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |
| `a`    | `A2`                                             |

#### Returns

[`NonEmptyChunk`](../interfaces/Chunk.NonEmptyChunk.md)\<`A` \| `A2`\>

**`Since`**

2.0.0

---

### appendAll

▸ **appendAll**\<`B`\>(`that`): \<A\>(`self`: [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>) => [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`B` \| `A`\>

Concatenates the two chunks

#### Type parameters

| Name |
| :--- |
| `B`  |

#### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `that` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`B`\> |

#### Returns

`fn`

▸ \<`A`\>(`self`): [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`B` \| `A`\>

##### Type parameters

| Name |
| :--- |
| `A`  |

##### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |

##### Returns

[`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`B` \| `A`\>

**`Since`**

2.0.0

▸ **appendAll**\<`A`, `B`\>(`self`, `that`): [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A` \| `B`\>

Concatenates the two chunks

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |

#### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |
| `that` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`B`\> |

#### Returns

[`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A` \| `B`\>

**`Since`**

2.0.0

---

### appendAllNonEmpty

▸ **appendAllNonEmpty**\<`B`\>(`that`): \<A\>(`self`: [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>) => [`NonEmptyChunk`](../interfaces/Chunk.NonEmptyChunk.md)\<`B` \| `A`\>

#### Type parameters

| Name |
| :--- |
| `B`  |

#### Parameters

| Name   | Type                                                           |
| :----- | :------------------------------------------------------------- |
| `that` | [`NonEmptyChunk`](../interfaces/Chunk.NonEmptyChunk.md)\<`B`\> |

#### Returns

`fn`

▸ \<`A`\>(`self`): [`NonEmptyChunk`](../interfaces/Chunk.NonEmptyChunk.md)\<`B` \| `A`\>

##### Type parameters

| Name |
| :--- |
| `A`  |

##### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |

##### Returns

[`NonEmptyChunk`](../interfaces/Chunk.NonEmptyChunk.md)\<`B` \| `A`\>

**`Since`**

2.0.0

▸ **appendAllNonEmpty**\<`B`\>(`that`): \<A\>(`self`: [`NonEmptyChunk`](../interfaces/Chunk.NonEmptyChunk.md)\<`A`\>) => [`NonEmptyChunk`](../interfaces/Chunk.NonEmptyChunk.md)\<`B` \| `A`\>

#### Type parameters

| Name |
| :--- |
| `B`  |

#### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `that` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`B`\> |

#### Returns

`fn`

▸ \<`A`\>(`self`): [`NonEmptyChunk`](../interfaces/Chunk.NonEmptyChunk.md)\<`B` \| `A`\>

##### Type parameters

| Name |
| :--- |
| `A`  |

##### Parameters

| Name   | Type                                                           |
| :----- | :------------------------------------------------------------- |
| `self` | [`NonEmptyChunk`](../interfaces/Chunk.NonEmptyChunk.md)\<`A`\> |

##### Returns

[`NonEmptyChunk`](../interfaces/Chunk.NonEmptyChunk.md)\<`B` \| `A`\>

**`Since`**

2.0.0

▸ **appendAllNonEmpty**\<`A`, `B`\>(`self`, `that`): [`NonEmptyChunk`](../interfaces/Chunk.NonEmptyChunk.md)\<`A` \| `B`\>

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |

#### Parameters

| Name   | Type                                                           |
| :----- | :------------------------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>               |
| `that` | [`NonEmptyChunk`](../interfaces/Chunk.NonEmptyChunk.md)\<`B`\> |

#### Returns

[`NonEmptyChunk`](../interfaces/Chunk.NonEmptyChunk.md)\<`A` \| `B`\>

**`Since`**

2.0.0

▸ **appendAllNonEmpty**\<`A`, `B`\>(`self`, `that`): [`NonEmptyChunk`](../interfaces/Chunk.NonEmptyChunk.md)\<`A` \| `B`\>

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |

#### Parameters

| Name   | Type                                                           |
| :----- | :------------------------------------------------------------- |
| `self` | [`NonEmptyChunk`](../interfaces/Chunk.NonEmptyChunk.md)\<`A`\> |
| `that` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`B`\>               |

#### Returns

[`NonEmptyChunk`](../interfaces/Chunk.NonEmptyChunk.md)\<`A` \| `B`\>

**`Since`**

2.0.0

---

### prepend

▸ **prepend**\<`B`\>(`elem`): \<A\>(`self`: [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>) => [`NonEmptyChunk`](../interfaces/Chunk.NonEmptyChunk.md)\<`B` \| `A`\>

Prepend an element to the front of a `Chunk`, creating a new `NonEmptyChunk`.

#### Type parameters

| Name |
| :--- |
| `B`  |

#### Parameters

| Name   | Type |
| :----- | :--- |
| `elem` | `B`  |

#### Returns

`fn`

▸ \<`A`\>(`self`): [`NonEmptyChunk`](../interfaces/Chunk.NonEmptyChunk.md)\<`B` \| `A`\>

##### Type parameters

| Name |
| :--- |
| `A`  |

##### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |

##### Returns

[`NonEmptyChunk`](../interfaces/Chunk.NonEmptyChunk.md)\<`B` \| `A`\>

**`Since`**

2.0.0

▸ **prepend**\<`A`, `B`\>(`self`, `elem`): [`NonEmptyChunk`](../interfaces/Chunk.NonEmptyChunk.md)\<`A` \| `B`\>

Prepend an element to the front of a `Chunk`, creating a new `NonEmptyChunk`.

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |

#### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |
| `elem` | `B`                                              |

#### Returns

[`NonEmptyChunk`](../interfaces/Chunk.NonEmptyChunk.md)\<`A` \| `B`\>

**`Since`**

2.0.0

---

### prependAll

▸ **prependAll**\<`B`\>(`that`): \<A\>(`self`: [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>) => [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`B` \| `A`\>

#### Type parameters

| Name |
| :--- |
| `B`  |

#### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `that` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`B`\> |

#### Returns

`fn`

▸ \<`A`\>(`self`): [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`B` \| `A`\>

##### Type parameters

| Name |
| :--- |
| `A`  |

##### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |

##### Returns

[`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`B` \| `A`\>

**`Since`**

2.0.0

▸ **prependAll**\<`A`, `B`\>(`self`, `that`): [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A` \| `B`\>

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |

#### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |
| `that` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`B`\> |

#### Returns

[`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A` \| `B`\>

**`Since`**

2.0.0

---

### prependAllNonEmpty

▸ **prependAllNonEmpty**\<`B`\>(`that`): \<A\>(`self`: [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>) => [`NonEmptyChunk`](../interfaces/Chunk.NonEmptyChunk.md)\<`B` \| `A`\>

#### Type parameters

| Name |
| :--- |
| `B`  |

#### Parameters

| Name   | Type                                                           |
| :----- | :------------------------------------------------------------- |
| `that` | [`NonEmptyChunk`](../interfaces/Chunk.NonEmptyChunk.md)\<`B`\> |

#### Returns

`fn`

▸ \<`A`\>(`self`): [`NonEmptyChunk`](../interfaces/Chunk.NonEmptyChunk.md)\<`B` \| `A`\>

##### Type parameters

| Name |
| :--- |
| `A`  |

##### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |

##### Returns

[`NonEmptyChunk`](../interfaces/Chunk.NonEmptyChunk.md)\<`B` \| `A`\>

**`Since`**

2.0.0

▸ **prependAllNonEmpty**\<`B`\>(`that`): \<A\>(`self`: [`NonEmptyChunk`](../interfaces/Chunk.NonEmptyChunk.md)\<`A`\>) => [`NonEmptyChunk`](../interfaces/Chunk.NonEmptyChunk.md)\<`B` \| `A`\>

#### Type parameters

| Name |
| :--- |
| `B`  |

#### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `that` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`B`\> |

#### Returns

`fn`

▸ \<`A`\>(`self`): [`NonEmptyChunk`](../interfaces/Chunk.NonEmptyChunk.md)\<`B` \| `A`\>

##### Type parameters

| Name |
| :--- |
| `A`  |

##### Parameters

| Name   | Type                                                           |
| :----- | :------------------------------------------------------------- |
| `self` | [`NonEmptyChunk`](../interfaces/Chunk.NonEmptyChunk.md)\<`A`\> |

##### Returns

[`NonEmptyChunk`](../interfaces/Chunk.NonEmptyChunk.md)\<`B` \| `A`\>

**`Since`**

2.0.0

▸ **prependAllNonEmpty**\<`A`, `B`\>(`self`, `that`): [`NonEmptyChunk`](../interfaces/Chunk.NonEmptyChunk.md)\<`A` \| `B`\>

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |

#### Parameters

| Name   | Type                                                           |
| :----- | :------------------------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>               |
| `that` | [`NonEmptyChunk`](../interfaces/Chunk.NonEmptyChunk.md)\<`B`\> |

#### Returns

[`NonEmptyChunk`](../interfaces/Chunk.NonEmptyChunk.md)\<`A` \| `B`\>

**`Since`**

2.0.0

▸ **prependAllNonEmpty**\<`A`, `B`\>(`self`, `that`): [`NonEmptyChunk`](../interfaces/Chunk.NonEmptyChunk.md)\<`A` \| `B`\>

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |

#### Parameters

| Name   | Type                                                           |
| :----- | :------------------------------------------------------------- |
| `self` | [`NonEmptyChunk`](../interfaces/Chunk.NonEmptyChunk.md)\<`A`\> |
| `that` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`B`\>               |

#### Returns

[`NonEmptyChunk`](../interfaces/Chunk.NonEmptyChunk.md)\<`A` \| `B`\>

**`Since`**

2.0.0

## constructors

### empty

▸ **empty**\<`A`\>(): [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>

#### Type parameters

| Name | Type    |
| :--- | :------ |
| `A`  | `never` |

#### Returns

[`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>

**`Since`**

2.0.0

---

### isChunk

▸ **isChunk**\<`A`\>(`u`): u is Chunk\<A\>

Checks if `u` is a `Chunk<unknown>`

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name | Type              |
| :--- | :---------------- |
| `u`  | `Iterable`\<`A`\> |

#### Returns

u is Chunk\<A\>

**`Since`**

2.0.0

▸ **isChunk**(`u`): u is Chunk\<unknown\>

Checks if `u` is a `Chunk<unknown>`

#### Parameters

| Name | Type      |
| :--- | :-------- |
| `u`  | `unknown` |

#### Returns

u is Chunk\<unknown\>

**`Since`**

2.0.0

---

### make

▸ **make**\<`As`\>(`...as`): [`NonEmptyChunk`](../interfaces/Chunk.NonEmptyChunk.md)\<`As`[`number`]\>

Builds a `NonEmptyChunk` from an non-empty collection of elements.

#### Type parameters

| Name | Type                            |
| :--- | :------------------------------ |
| `As` | extends readonly [`any`, `any`] |

#### Parameters

| Name    | Type |
| :------ | :--- |
| `...as` | `As` |

#### Returns

[`NonEmptyChunk`](../interfaces/Chunk.NonEmptyChunk.md)\<`As`[`number`]\>

**`Since`**

2.0.0

---

### makeBy

▸ **makeBy**\<`A`\>(`f`): (`n`: `number`) => [`NonEmptyChunk`](../interfaces/Chunk.NonEmptyChunk.md)\<`A`\>

Return a Chunk of length n with element i initialized with f(i).

**Note**. `n` is normalized to an integer >= 1.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name | Type                   |
| :--- | :--------------------- |
| `f`  | (`i`: `number`) => `A` |

#### Returns

`fn`

▸ (`n`): [`NonEmptyChunk`](../interfaces/Chunk.NonEmptyChunk.md)\<`A`\>

##### Parameters

| Name | Type     |
| :--- | :------- |
| `n`  | `number` |

##### Returns

[`NonEmptyChunk`](../interfaces/Chunk.NonEmptyChunk.md)\<`A`\>

**`Since`**

2.0.0

▸ **makeBy**\<`A`\>(`n`, `f`): [`NonEmptyChunk`](../interfaces/Chunk.NonEmptyChunk.md)\<`A`\>

Return a Chunk of length n with element i initialized with f(i).

**Note**. `n` is normalized to an integer >= 1.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name | Type                   |
| :--- | :--------------------- |
| `n`  | `number`               |
| `f`  | (`i`: `number`) => `A` |

#### Returns

[`NonEmptyChunk`](../interfaces/Chunk.NonEmptyChunk.md)\<`A`\>

**`Since`**

2.0.0

---

### of

▸ **of**\<`A`\>(`a`): [`NonEmptyChunk`](../interfaces/Chunk.NonEmptyChunk.md)\<`A`\>

Builds a `NonEmptyChunk` from a single element.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name | Type |
| :--- | :--- |
| `a`  | `A`  |

#### Returns

[`NonEmptyChunk`](../interfaces/Chunk.NonEmptyChunk.md)\<`A`\>

**`Since`**

2.0.0

---

### range

▸ **range**(`start`, `end`): [`NonEmptyChunk`](../interfaces/Chunk.NonEmptyChunk.md)\<`number`\>

Create a non empty `Chunk` containing a range of integers, including both endpoints.

#### Parameters

| Name    | Type     |
| :------ | :------- |
| `start` | `number` |
| `end`   | `number` |

#### Returns

[`NonEmptyChunk`](../interfaces/Chunk.NonEmptyChunk.md)\<`number`\>

**`Since`**

2.0.0

## conversions

### fromIterable

▸ **fromIterable**\<`A`\>(`self`): [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>

Converts from an `Iterable<A>`

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name   | Type              |
| :----- | :---------------- |
| `self` | `Iterable`\<`A`\> |

#### Returns

[`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>

**`Since`**

2.0.0

---

### toArray

▸ **toArray**\<`A`\>(`self`): `A`[]

Converts the specified `Chunk` to a `Array`.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |

#### Returns

`A`[]

**`Since`**

2.0.0

---

### toReadonlyArray

▸ **toReadonlyArray**\<`A`\>(`self`): readonly `A`[]

Converts the specified `Chunk` to a `ReadonlyArray`.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |

#### Returns

readonly `A`[]

**`Since`**

2.0.0

## elements

### chunksOf

▸ **chunksOf**(`n`): \<A\>(`self`: [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>) => [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<[`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>\>

Groups elements in chunks of up to `n` elements.

#### Parameters

| Name | Type     |
| :--- | :------- |
| `n`  | `number` |

#### Returns

`fn`

▸ \<`A`\>(`self`): [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<[`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>\>

##### Type parameters

| Name |
| :--- |
| `A`  |

##### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |

##### Returns

[`Chunk`](../interfaces/Chunk.Chunk-1.md)\<[`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>\>

**`Since`**

2.0.0

▸ **chunksOf**\<`A`\>(`self`, `n`): [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<[`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>\>

Groups elements in chunks of up to `n` elements.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |
| `n`    | `number`                                         |

#### Returns

[`Chunk`](../interfaces/Chunk.Chunk-1.md)\<[`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>\>

**`Since`**

2.0.0

---

### contains

▸ **contains**\<`A`\>(`a`): (`self`: [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>) => `boolean`

Returns a function that checks if a `Chunk` contains a given value using the default `Equivalence`.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name | Type |
| :--- | :--- |
| `a`  | `A`  |

#### Returns

`fn`

▸ (`self`): `boolean`

##### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |

##### Returns

`boolean`

**`Since`**

2.0.0

▸ **contains**\<`A`\>(`self`, `a`): `boolean`

Returns a function that checks if a `Chunk` contains a given value using the default `Equivalence`.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |
| `a`    | `A`                                              |

#### Returns

`boolean`

**`Since`**

2.0.0

---

### containsWith

▸ **containsWith**\<`A`\>(`isEquivalent`): (`a`: `A`) => (`self`: [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>) => `boolean`(`self`: [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>, `a`: `A`) => `boolean`

Returns a function that checks if a `Chunk` contains a given value using a provided `isEquivalent` function.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name           | Type                                    |
| :------------- | :-------------------------------------- |
| `isEquivalent` | (`self`: `A`, `that`: `A`) => `boolean` |

#### Returns

`fn`

▸ (`a`): (`self`: [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>) => `boolean`

##### Parameters

| Name | Type |
| :--- | :--- |
| `a`  | `A`  |

##### Returns

`fn`

▸ (`self`): `boolean`

##### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |

##### Returns

`boolean`

▸ (`self`, `a`): `boolean`

##### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |
| `a`    | `A`                                              |

##### Returns

`boolean`

**`Since`**

2.0.0

---

### dedupe

▸ **dedupe**\<`A`\>(`self`): [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>

Remove duplicates from an array, keeping the first occurrence of an element.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |

#### Returns

[`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>

**`Since`**

2.0.0

---

### every

▸ **every**\<`A`, `B`\>(`refinement`): (`self`: [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>) => self is Chunk\<B\>

Check if a predicate holds true for every `Chunk` element.

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |

#### Parameters

| Name         | Type                     |
| :----------- | :----------------------- |
| `refinement` | `Refinement`\<`A`, `B`\> |

#### Returns

`fn`

▸ (`self`): self is Chunk\<B\>

##### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |

##### Returns

self is Chunk\<B\>

**`Since`**

2.0.0

▸ **every**\<`A`\>(`predicate`): (`self`: [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>) => `boolean`

Check if a predicate holds true for every `Chunk` element.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name        | Type               |
| :---------- | :----------------- |
| `predicate` | `Predicate`\<`A`\> |

#### Returns

`fn`

▸ (`self`): `boolean`

##### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |

##### Returns

`boolean`

**`Since`**

2.0.0

▸ **every**\<`A`, `B`\>(`self`, `refinement`): self is Chunk\<B\>

Check if a predicate holds true for every `Chunk` element.

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |

#### Parameters

| Name         | Type                                             |
| :----------- | :----------------------------------------------- |
| `self`       | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |
| `refinement` | `Refinement`\<`A`, `B`\>                         |

#### Returns

self is Chunk\<B\>

**`Since`**

2.0.0

▸ **every**\<`A`\>(`self`, `predicate`): `boolean`

Check if a predicate holds true for every `Chunk` element.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name        | Type                                             |
| :---------- | :----------------------------------------------- |
| `self`      | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |
| `predicate` | `Predicate`\<`A`\>                               |

#### Returns

`boolean`

**`Since`**

2.0.0

---

### findFirst

▸ **findFirst**\<`A`, `B`\>(`refinement`): (`self`: [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>) => [`Option`](O.md#option)\<`B`\>

Returns the first element that satisfies the specified
predicate, or `None` if no such element exists.

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |

#### Parameters

| Name         | Type                     |
| :----------- | :----------------------- |
| `refinement` | `Refinement`\<`A`, `B`\> |

#### Returns

`fn`

▸ (`self`): [`Option`](O.md#option)\<`B`\>

##### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |

##### Returns

[`Option`](O.md#option)\<`B`\>

**`Since`**

2.0.0

▸ **findFirst**\<`B`, `A`\>(`predicate`): (`self`: [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`B`\>) => [`Option`](O.md#option)\<`B`\>

Returns the first element that satisfies the specified
predicate, or `None` if no such element exists.

#### Type parameters

| Name | Type |
| :--- | :--- |
| `B`  | `B`  |
| `A`  | `B`  |

#### Parameters

| Name        | Type               |
| :---------- | :----------------- |
| `predicate` | `Predicate`\<`A`\> |

#### Returns

`fn`

▸ (`self`): [`Option`](O.md#option)\<`B`\>

##### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`B`\> |

##### Returns

[`Option`](O.md#option)\<`B`\>

**`Since`**

2.0.0

▸ **findFirst**\<`A`, `B`\>(`self`, `refinement`): [`Option`](O.md#option)\<`B`\>

Returns the first element that satisfies the specified
predicate, or `None` if no such element exists.

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |

#### Parameters

| Name         | Type                                             |
| :----------- | :----------------------------------------------- |
| `self`       | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |
| `refinement` | `Refinement`\<`A`, `B`\>                         |

#### Returns

[`Option`](O.md#option)\<`B`\>

**`Since`**

2.0.0

▸ **findFirst**\<`A`\>(`self`, `predicate`): [`Option`](O.md#option)\<`A`\>

Returns the first element that satisfies the specified
predicate, or `None` if no such element exists.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name        | Type                                             |
| :---------- | :----------------------------------------------- |
| `self`      | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |
| `predicate` | `Predicate`\<`A`\>                               |

#### Returns

[`Option`](O.md#option)\<`A`\>

**`Since`**

2.0.0

---

### findFirstIndex

▸ **findFirstIndex**\<`A`\>(`predicate`): (`self`: [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>) => [`Option`](O.md#option)\<`number`\>

Return the first index for which a predicate holds.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name        | Type               |
| :---------- | :----------------- |
| `predicate` | `Predicate`\<`A`\> |

#### Returns

`fn`

▸ (`self`): [`Option`](O.md#option)\<`number`\>

##### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |

##### Returns

[`Option`](O.md#option)\<`number`\>

**`Since`**

2.0.0

▸ **findFirstIndex**\<`A`\>(`self`, `predicate`): [`Option`](O.md#option)\<`number`\>

Return the first index for which a predicate holds.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name        | Type                                             |
| :---------- | :----------------------------------------------- |
| `self`      | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |
| `predicate` | `Predicate`\<`A`\>                               |

#### Returns

[`Option`](O.md#option)\<`number`\>

**`Since`**

2.0.0

---

### findLast

▸ **findLast**\<`A`, `B`\>(`refinement`): (`self`: [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>) => [`Option`](O.md#option)\<`B`\>

Find the last element for which a predicate holds.

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |

#### Parameters

| Name         | Type                     |
| :----------- | :----------------------- |
| `refinement` | `Refinement`\<`A`, `B`\> |

#### Returns

`fn`

▸ (`self`): [`Option`](O.md#option)\<`B`\>

##### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |

##### Returns

[`Option`](O.md#option)\<`B`\>

**`Since`**

2.0.0

▸ **findLast**\<`B`, `A`\>(`predicate`): (`self`: [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`B`\>) => [`Option`](O.md#option)\<`B`\>

Find the last element for which a predicate holds.

#### Type parameters

| Name | Type |
| :--- | :--- |
| `B`  | `B`  |
| `A`  | `B`  |

#### Parameters

| Name        | Type               |
| :---------- | :----------------- |
| `predicate` | `Predicate`\<`A`\> |

#### Returns

`fn`

▸ (`self`): [`Option`](O.md#option)\<`B`\>

##### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`B`\> |

##### Returns

[`Option`](O.md#option)\<`B`\>

**`Since`**

2.0.0

▸ **findLast**\<`A`, `B`\>(`self`, `refinement`): [`Option`](O.md#option)\<`B`\>

Find the last element for which a predicate holds.

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |

#### Parameters

| Name         | Type                                             |
| :----------- | :----------------------------------------------- |
| `self`       | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |
| `refinement` | `Refinement`\<`A`, `B`\>                         |

#### Returns

[`Option`](O.md#option)\<`B`\>

**`Since`**

2.0.0

▸ **findLast**\<`A`\>(`self`, `predicate`): [`Option`](O.md#option)\<`A`\>

Find the last element for which a predicate holds.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name        | Type                                             |
| :---------- | :----------------------------------------------- |
| `self`      | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |
| `predicate` | `Predicate`\<`A`\>                               |

#### Returns

[`Option`](O.md#option)\<`A`\>

**`Since`**

2.0.0

---

### findLastIndex

▸ **findLastIndex**\<`A`\>(`predicate`): (`self`: [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>) => [`Option`](O.md#option)\<`number`\>

Return the last index for which a predicate holds.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name        | Type               |
| :---------- | :----------------- |
| `predicate` | `Predicate`\<`A`\> |

#### Returns

`fn`

▸ (`self`): [`Option`](O.md#option)\<`number`\>

##### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |

##### Returns

[`Option`](O.md#option)\<`number`\>

**`Since`**

2.0.0

▸ **findLastIndex**\<`A`\>(`self`, `predicate`): [`Option`](O.md#option)\<`number`\>

Return the last index for which a predicate holds.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name        | Type                                             |
| :---------- | :----------------------------------------------- |
| `self`      | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |
| `predicate` | `Predicate`\<`A`\>                               |

#### Returns

[`Option`](O.md#option)\<`number`\>

**`Since`**

2.0.0

---

### get

▸ **get**(`index`): \<A\>(`self`: [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>) => [`Option`](O.md#option)\<`A`\>

This function provides a safe way to read a value at a particular index from a `Chunk`.

#### Parameters

| Name    | Type     |
| :------ | :------- |
| `index` | `number` |

#### Returns

`fn`

▸ \<`A`\>(`self`): [`Option`](O.md#option)\<`A`\>

##### Type parameters

| Name |
| :--- |
| `A`  |

##### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |

##### Returns

[`Option`](O.md#option)\<`A`\>

**`Since`**

2.0.0

▸ **get**\<`A`\>(`self`, `index`): [`Option`](O.md#option)\<`A`\>

This function provides a safe way to read a value at a particular index from a `Chunk`.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name    | Type                                             |
| :------ | :----------------------------------------------- |
| `self`  | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |
| `index` | `number`                                         |

#### Returns

[`Option`](O.md#option)\<`A`\>

**`Since`**

2.0.0

---

### head

▸ **head**\<`A`\>(`self`): [`Option`](O.md#option)\<`A`\>

Returns the first element of this chunk if it exists.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |

#### Returns

[`Option`](O.md#option)\<`A`\>

**`Since`**

2.0.0

---

### headNonEmpty

▸ **headNonEmpty**\<`A`\>(`self`): `A`

Returns the first element of this non empty chunk.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name   | Type                                                           |
| :----- | :------------------------------------------------------------- |
| `self` | [`NonEmptyChunk`](../interfaces/Chunk.NonEmptyChunk.md)\<`A`\> |

#### Returns

`A`

**`Since`**

2.0.0

---

### intersection

▸ **intersection**\<`A`\>(`that`): \<B\>(`self`: [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`B`\>) => [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A` & `B`\>

Creates a Chunk of unique values that are included in all given Chunks.

The order and references of result values are determined by the Chunk.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `that` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |

#### Returns

`fn`

▸ \<`B`\>(`self`): [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A` & `B`\>

##### Type parameters

| Name |
| :--- |
| `B`  |

##### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`B`\> |

##### Returns

[`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A` & `B`\>

**`Since`**

2.0.0

▸ **intersection**\<`A`, `B`\>(`self`, `that`): [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A` & `B`\>

Creates a Chunk of unique values that are included in all given Chunks.

The order and references of result values are determined by the Chunk.

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |

#### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |
| `that` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`B`\> |

#### Returns

[`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A` & `B`\>

**`Since`**

2.0.0

---

### isEmpty

▸ **isEmpty**\<`A`\>(`self`): `boolean`

Determines if the chunk is empty.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |

#### Returns

`boolean`

**`Since`**

2.0.0

---

### isNonEmpty

▸ **isNonEmpty**\<`A`\>(`self`): self is NonEmptyChunk\<A\>

Determines if the chunk is not empty.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |

#### Returns

self is NonEmptyChunk\<A\>

**`Since`**

2.0.0

---

### last

▸ **last**\<`A`\>(`self`): [`Option`](O.md#option)\<`A`\>

Returns the last element of this chunk if it exists.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |

#### Returns

[`Option`](O.md#option)\<`A`\>

**`Since`**

2.0.0

---

### reverse

▸ **reverse**\<`A`\>(`self`): [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |

#### Returns

[`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>

**`Since`**

2.0.0

---

### size

▸ **size**\<`A`\>(`self`): `number`

Retireves the size of the chunk

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |

#### Returns

`number`

**`Since`**

2.0.0

---

### some

▸ **some**\<`B`, `A`\>(`predicate`): (`self`: [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`B`\>) => self is NonEmptyChunk\<B\>

Check if a predicate holds true for some `Chunk` element.

#### Type parameters

| Name | Type |
| :--- | :--- |
| `B`  | `B`  |
| `A`  | `B`  |

#### Parameters

| Name        | Type               |
| :---------- | :----------------- |
| `predicate` | `Predicate`\<`A`\> |

#### Returns

`fn`

▸ (`self`): self is NonEmptyChunk\<B\>

##### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`B`\> |

##### Returns

self is NonEmptyChunk\<B\>

**`Since`**

2.0.0

▸ **some**\<`A`\>(`self`, `predicate`): self is NonEmptyChunk\<A\>

Check if a predicate holds true for some `Chunk` element.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name        | Type                                             |
| :---------- | :----------------------------------------------- |
| `self`      | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |
| `predicate` | `Predicate`\<`A`\>                               |

#### Returns

self is NonEmptyChunk\<A\>

**`Since`**

2.0.0

---

### sort

▸ **sort**\<`B`\>(`O`): \<A\>(`self`: [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>) => [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>

Sort the elements of a Chunk in increasing order, creating a new Chunk.

#### Type parameters

| Name |
| :--- |
| `B`  |

#### Parameters

| Name | Type                                         |
| :--- | :------------------------------------------- |
| `O`  | [`Order`](../interfaces/Ord.Order.md)\<`B`\> |

#### Returns

`fn`

▸ \<`A`\>(`self`): [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>

##### Type parameters

| Name |
| :--- |
| `A`  |

##### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |

##### Returns

[`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>

**`Since`**

2.0.0

▸ **sort**\<`A`, `B`\>(`self`, `O`): [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>

Sort the elements of a Chunk in increasing order, creating a new Chunk.

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |

#### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |
| `O`    | [`Order`](../interfaces/Ord.Order.md)\<`B`\>     |

#### Returns

[`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>

**`Since`**

2.0.0

---

### sortWith

▸ **sortWith**\<`A`, `B`\>(`f`, `order`): (`self`: [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>) => [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |

#### Parameters

| Name    | Type                                         |
| :------ | :------------------------------------------- |
| `f`     | (`a`: `A`) => `B`                            |
| `order` | [`Order`](../interfaces/Ord.Order.md)\<`B`\> |

#### Returns

`fn`

▸ (`self`): [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>

##### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |

##### Returns

[`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>

**`Since`**

2.0.0

▸ **sortWith**\<`A`, `B`\>(`self`, `f`, `order`): [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |

#### Parameters

| Name    | Type                                             |
| :------ | :----------------------------------------------- |
| `self`  | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |
| `f`     | (`a`: `A`) => `B`                                |
| `order` | [`Order`](../interfaces/Ord.Order.md)\<`B`\>     |

#### Returns

[`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>

**`Since`**

2.0.0

---

### split

▸ **split**(`n`): \<A\>(`self`: [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>) => [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<[`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>\>

Splits this chunk into `n` equally sized chunks.

#### Parameters

| Name | Type     |
| :--- | :------- |
| `n`  | `number` |

#### Returns

`fn`

▸ \<`A`\>(`self`): [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<[`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>\>

##### Type parameters

| Name |
| :--- |
| `A`  |

##### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |

##### Returns

[`Chunk`](../interfaces/Chunk.Chunk-1.md)\<[`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>\>

**`Since`**

2.0.0

▸ **split**\<`A`\>(`self`, `n`): [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<[`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>\>

Splits this chunk into `n` equally sized chunks.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |
| `n`    | `number`                                         |

#### Returns

[`Chunk`](../interfaces/Chunk.Chunk-1.md)\<[`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>\>

**`Since`**

2.0.0

---

### splitAt

▸ **splitAt**(`n`): \<A\>(`self`: [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>) => [beforeIndex: Chunk\<A\>, fromIndex: Chunk\<A\>]

Returns two splits of this chunk at the specified index.

#### Parameters

| Name | Type     |
| :--- | :------- |
| `n`  | `number` |

#### Returns

`fn`

▸ \<`A`\>(`self`): [beforeIndex: Chunk\<A\>, fromIndex: Chunk\<A\>]

##### Type parameters

| Name |
| :--- |
| `A`  |

##### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |

##### Returns

[beforeIndex: Chunk\<A\>, fromIndex: Chunk\<A\>]

**`Since`**

2.0.0

▸ **splitAt**\<`A`\>(`self`, `n`): [beforeIndex: Chunk\<A\>, fromIndex: Chunk\<A\>]

Returns two splits of this chunk at the specified index.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |
| `n`    | `number`                                         |

#### Returns

[beforeIndex: Chunk\<A\>, fromIndex: Chunk\<A\>]

**`Since`**

2.0.0

---

### splitWhere

▸ **splitWhere**\<`B`, `A`\>(`predicate`): (`self`: [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`B`\>) => [beforeMatch: Chunk\<B\>, fromMatch: Chunk\<B\>]

Splits this chunk on the first element that matches this predicate.

#### Type parameters

| Name | Type |
| :--- | :--- |
| `B`  | `B`  |
| `A`  | `B`  |

#### Parameters

| Name        | Type               |
| :---------- | :----------------- |
| `predicate` | `Predicate`\<`A`\> |

#### Returns

`fn`

▸ (`self`): [beforeMatch: Chunk\<B\>, fromMatch: Chunk\<B\>]

##### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`B`\> |

##### Returns

[beforeMatch: Chunk\<B\>, fromMatch: Chunk\<B\>]

**`Since`**

2.0.0

▸ **splitWhere**\<`A`\>(`self`, `predicate`): [beforeMatch: Chunk\<A\>, fromMatch: Chunk\<A\>]

Splits this chunk on the first element that matches this predicate.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name        | Type                                             |
| :---------- | :----------------------------------------------- |
| `self`      | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |
| `predicate` | `Predicate`\<`A`\>                               |

#### Returns

[beforeMatch: Chunk\<A\>, fromMatch: Chunk\<A\>]

**`Since`**

2.0.0

---

### tail

▸ **tail**\<`A`\>(`self`): [`Option`](O.md#option)\<[`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>\>

Returns every elements after the first.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |

#### Returns

[`Option`](O.md#option)\<[`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>\>

**`Since`**

2.0.0

---

### tailNonEmpty

▸ **tailNonEmpty**\<`A`\>(`self`): [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>

Returns every elements after the first.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name   | Type                                                           |
| :----- | :------------------------------------------------------------- |
| `self` | [`NonEmptyChunk`](../interfaces/Chunk.NonEmptyChunk.md)\<`A`\> |

#### Returns

[`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>

**`Since`**

2.0.0

---

### takeRight

▸ **takeRight**(`n`): \<A\>(`self`: [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>) => [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>

Takes the last `n` elements.

#### Parameters

| Name | Type     |
| :--- | :------- |
| `n`  | `number` |

#### Returns

`fn`

▸ \<`A`\>(`self`): [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>

##### Type parameters

| Name |
| :--- |
| `A`  |

##### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |

##### Returns

[`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>

**`Since`**

2.0.0

▸ **takeRight**\<`A`\>(`self`, `n`): [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>

Takes the last `n` elements.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |
| `n`    | `number`                                         |

#### Returns

[`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>

**`Since`**

2.0.0

---

### takeWhile

▸ **takeWhile**\<`A`, `B`\>(`refinement`): (`self`: [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>) => [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`B`\>

Takes all elements so long as the predicate returns true.

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |

#### Parameters

| Name         | Type                     |
| :----------- | :----------------------- |
| `refinement` | `Refinement`\<`A`, `B`\> |

#### Returns

`fn`

▸ (`self`): [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`B`\>

##### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |

##### Returns

[`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`B`\>

**`Since`**

2.0.0

▸ **takeWhile**\<`B`, `A`\>(`predicate`): (`self`: [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`B`\>) => [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`B`\>

Takes all elements so long as the predicate returns true.

#### Type parameters

| Name | Type |
| :--- | :--- |
| `B`  | `B`  |
| `A`  | `B`  |

#### Parameters

| Name        | Type               |
| :---------- | :----------------- |
| `predicate` | `Predicate`\<`A`\> |

#### Returns

`fn`

▸ (`self`): [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`B`\>

##### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`B`\> |

##### Returns

[`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`B`\>

**`Since`**

2.0.0

▸ **takeWhile**\<`A`, `B`\>(`self`, `refinement`): [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`B`\>

Takes all elements so long as the predicate returns true.

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |

#### Parameters

| Name         | Type                                             |
| :----------- | :----------------------------------------------- |
| `self`       | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |
| `refinement` | `Refinement`\<`A`, `B`\>                         |

#### Returns

[`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`B`\>

**`Since`**

2.0.0

▸ **takeWhile**\<`A`\>(`self`, `predicate`): [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>

Takes all elements so long as the predicate returns true.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name        | Type                                             |
| :---------- | :----------------------------------------------- |
| `self`      | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |
| `predicate` | `Predicate`\<`A`\>                               |

#### Returns

[`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>

**`Since`**

2.0.0

---

### union

▸ **union**\<`A`\>(`that`): \<B\>(`self`: [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`B`\>) => [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A` \| `B`\>

Creates a Chunks of unique values, in order, from all given Chunks.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `that` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |

#### Returns

`fn`

▸ \<`B`\>(`self`): [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A` \| `B`\>

##### Type parameters

| Name |
| :--- |
| `B`  |

##### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`B`\> |

##### Returns

[`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A` \| `B`\>

**`Since`**

2.0.0

▸ **union**\<`A`, `B`\>(`self`, `that`): [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A` \| `B`\>

Creates a Chunks of unique values, in order, from all given Chunks.

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |

#### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |
| `that` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`B`\> |

#### Returns

[`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A` \| `B`\>

**`Since`**

2.0.0

---

### unzip

▸ **unzip**\<`A`, `B`\>(`self`): [[`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>, [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`B`\>]

Takes a `Chunk` of pairs and return two corresponding `Chunk`s.

Note: The function is reverse of `zip`.

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |

#### Parameters

| Name   | Type                                                             |
| :----- | :--------------------------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<readonly [`A`, `B`]\> |

#### Returns

[[`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>, [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`B`\>]

**`Since`**

2.0.0

---

### zip

▸ **zip**\<`B`\>(`that`): \<A\>(`self`: [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>) => [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<[`A`, `B`]\>

Zips this chunk pointwise with the specified chunk.

#### Type parameters

| Name |
| :--- |
| `B`  |

#### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `that` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`B`\> |

#### Returns

`fn`

▸ \<`A`\>(`self`): [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<[`A`, `B`]\>

##### Type parameters

| Name |
| :--- |
| `A`  |

##### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |

##### Returns

[`Chunk`](../interfaces/Chunk.Chunk-1.md)\<[`A`, `B`]\>

**`Since`**

2.0.0

▸ **zip**\<`A`, `B`\>(`self`, `that`): [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<[`A`, `B`]\>

Zips this chunk pointwise with the specified chunk.

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |

#### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |
| `that` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`B`\> |

#### Returns

[`Chunk`](../interfaces/Chunk.Chunk-1.md)\<[`A`, `B`]\>

**`Since`**

2.0.0

---

### zipWith

▸ **zipWith**\<`A`, `B`, `C`\>(`that`, `f`): (`self`: [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>) => [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`C`\>

Zips this chunk pointwise with the specified chunk using the specified combiner.

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |
| `C`  |

#### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `that` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`B`\> |
| `f`    | (`a`: `A`, `b`: `B`) => `C`                      |

#### Returns

`fn`

▸ (`self`): [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`C`\>

##### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |

##### Returns

[`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`C`\>

**`Since`**

2.0.0

▸ **zipWith**\<`A`, `B`, `C`\>(`self`, `that`, `f`): [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`C`\>

Zips this chunk pointwise with the specified chunk using the specified combiner.

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |
| `C`  |

#### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |
| `that` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`B`\> |
| `f`    | (`a`: `A`, `b`: `B`) => `C`                      |

#### Returns

[`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`C`\>

**`Since`**

2.0.0

## equivalence

### getEquivalence

▸ **getEquivalence**\<`A`\>(`isEquivalent`): `Equivalence`\<[`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>\>

Compares the two chunks of equal length using the specified function

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name           | Type                 |
| :------------- | :------------------- |
| `isEquivalent` | `Equivalence`\<`A`\> |

#### Returns

`Equivalence`\<[`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>\>

**`Since`**

2.0.0

## filtering

### compact

▸ **compact**\<`A`\>(`self`): [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>

Filter out optional values

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name   | Type                                                                        |
| :----- | :-------------------------------------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<[`Option`](O.md#option)\<`A`\>\> |

#### Returns

[`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>

**`Since`**

2.0.0

---

### dedupeAdjacent

▸ **dedupeAdjacent**\<`A`\>(`self`): [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>

Deduplicates adjacent elements that are identical.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |

#### Returns

[`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>

**`Since`**

2.0.0

---

### filter

▸ **filter**\<`A`, `B`\>(`refinement`): (`self`: [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>) => [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`B`\>

Returns a filtered and mapped subset of the elements.

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |

#### Parameters

| Name         | Type                     |
| :----------- | :----------------------- |
| `refinement` | `Refinement`\<`A`, `B`\> |

#### Returns

`fn`

▸ (`self`): [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`B`\>

##### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |

##### Returns

[`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`B`\>

**`Since`**

2.0.0

▸ **filter**\<`B`, `A`\>(`predicate`): (`self`: [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`B`\>) => [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`B`\>

Returns a filtered and mapped subset of the elements.

#### Type parameters

| Name | Type |
| :--- | :--- |
| `B`  | `B`  |
| `A`  | `B`  |

#### Parameters

| Name        | Type               |
| :---------- | :----------------- |
| `predicate` | `Predicate`\<`A`\> |

#### Returns

`fn`

▸ (`self`): [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`B`\>

##### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`B`\> |

##### Returns

[`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`B`\>

**`Since`**

2.0.0

▸ **filter**\<`A`, `B`\>(`self`, `refinement`): [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`B`\>

Returns a filtered and mapped subset of the elements.

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |

#### Parameters

| Name         | Type                                             |
| :----------- | :----------------------------------------------- |
| `self`       | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |
| `refinement` | `Refinement`\<`A`, `B`\>                         |

#### Returns

[`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`B`\>

**`Since`**

2.0.0

▸ **filter**\<`A`\>(`self`, `predicate`): [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>

Returns a filtered and mapped subset of the elements.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name        | Type                                             |
| :---------- | :----------------------------------------------- |
| `self`      | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |
| `predicate` | `Predicate`\<`A`\>                               |

#### Returns

[`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>

**`Since`**

2.0.0

---

### filterMap

▸ **filterMap**\<`A`, `B`\>(`f`): (`self`: [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>) => [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`B`\>

Returns a filtered and mapped subset of the elements.

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |

#### Parameters

| Name | Type                                                        |
| :--- | :---------------------------------------------------------- |
| `f`  | (`a`: `A`, `i`: `number`) => [`Option`](O.md#option)\<`B`\> |

#### Returns

`fn`

▸ (`self`): [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`B`\>

##### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |

##### Returns

[`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`B`\>

**`Since`**

2.0.0

▸ **filterMap**\<`A`, `B`\>(`self`, `f`): [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`B`\>

Returns a filtered and mapped subset of the elements.

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |

#### Parameters

| Name   | Type                                                        |
| :----- | :---------------------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>            |
| `f`    | (`a`: `A`, `i`: `number`) => [`Option`](O.md#option)\<`B`\> |

#### Returns

[`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`B`\>

**`Since`**

2.0.0

---

### filterMapWhile

▸ **filterMapWhile**\<`A`, `B`\>(`f`): (`self`: [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>) => [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`B`\>

Transforms all elements of the chunk for as long as the specified function returns some value

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |

#### Parameters

| Name | Type                                         |
| :--- | :------------------------------------------- |
| `f`  | (`a`: `A`) => [`Option`](O.md#option)\<`B`\> |

#### Returns

`fn`

▸ (`self`): [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`B`\>

##### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |

##### Returns

[`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`B`\>

**`Since`**

2.0.0

▸ **filterMapWhile**\<`A`, `B`\>(`self`, `f`): [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`B`\>

Transforms all elements of the chunk for as long as the specified function returns some value

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |

#### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |
| `f`    | (`a`: `A`) => [`Option`](O.md#option)\<`B`\>     |

#### Returns

[`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`B`\>

**`Since`**

2.0.0

---

### partition

▸ **partition**\<`C`, `B`, `A`\>(`refinement`): (`self`: [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`C`\>) => [excluded: Chunk\<Exclude\<C, B\>\>, satisfying: Chunk\<B\>]

Separate elements based on a predicate that also exposes the index of the element.

#### Type parameters

| Name | Type |
| :--- | :--- |
| `C`  | `C`  |
| `B`  | `B`  |
| `A`  | `C`  |

#### Parameters

| Name         | Type                                |
| :----------- | :---------------------------------- |
| `refinement` | (`a`: `A`, `i`: `number`) => a is B |

#### Returns

`fn`

▸ (`self`): [excluded: Chunk\<Exclude\<C, B\>\>, satisfying: Chunk\<B\>]

##### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`C`\> |

##### Returns

[excluded: Chunk\<Exclude\<C, B\>\>, satisfying: Chunk\<B\>]

**`Since`**

2.0.0

▸ **partition**\<`B`, `A`\>(`predicate`): (`self`: [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`B`\>) => [excluded: Chunk\<B\>, satisfying: Chunk\<B\>]

Separate elements based on a predicate that also exposes the index of the element.

#### Type parameters

| Name | Type |
| :--- | :--- |
| `B`  | `B`  |
| `A`  | `B`  |

#### Parameters

| Name        | Type                                   |
| :---------- | :------------------------------------- |
| `predicate` | (`a`: `A`, `i`: `number`) => `boolean` |

#### Returns

`fn`

▸ (`self`): [excluded: Chunk\<B\>, satisfying: Chunk\<B\>]

##### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`B`\> |

##### Returns

[excluded: Chunk\<B\>, satisfying: Chunk\<B\>]

**`Since`**

2.0.0

▸ **partition**\<`A`, `B`\>(`self`, `refinement`): [excluded: Chunk\<Exclude\<A, B\>\>, satisfying: Chunk\<B\>]

Separate elements based on a predicate that also exposes the index of the element.

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |

#### Parameters

| Name         | Type                                             |
| :----------- | :----------------------------------------------- |
| `self`       | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |
| `refinement` | (`a`: `A`, `i`: `number`) => a is B              |

#### Returns

[excluded: Chunk\<Exclude\<A, B\>\>, satisfying: Chunk\<B\>]

**`Since`**

2.0.0

▸ **partition**\<`A`\>(`self`, `predicate`): [excluded: Chunk\<A\>, satisfying: Chunk\<A\>]

Separate elements based on a predicate that also exposes the index of the element.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name        | Type                                             |
| :---------- | :----------------------------------------------- |
| `self`      | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |
| `predicate` | (`a`: `A`, `i`: `number`) => `boolean`           |

#### Returns

[excluded: Chunk\<A\>, satisfying: Chunk\<A\>]

**`Since`**

2.0.0

---

### partitionMap

▸ **partitionMap**\<`A`, `B`, `C`\>(`f`): (`self`: [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>) => [left: Chunk\<B\>, right: Chunk\<C\>]

Partitions the elements of this chunk into two chunks using f.

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |
| `C`  |

#### Parameters

| Name | Type                                              |
| :--- | :------------------------------------------------ |
| `f`  | (`a`: `A`) => [`Either`](E.md#either)\<`B`, `C`\> |

#### Returns

`fn`

▸ (`self`): [left: Chunk\<B\>, right: Chunk\<C\>]

##### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |

##### Returns

[left: Chunk\<B\>, right: Chunk\<C\>]

**`Since`**

2.0.0

▸ **partitionMap**\<`A`, `B`, `C`\>(`self`, `f`): [left: Chunk\<B\>, right: Chunk\<C\>]

Partitions the elements of this chunk into two chunks using f.

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |
| `C`  |

#### Parameters

| Name   | Type                                              |
| :----- | :------------------------------------------------ |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>  |
| `f`    | (`a`: `A`) => [`Either`](E.md#either)\<`B`, `C`\> |

#### Returns

[left: Chunk\<B\>, right: Chunk\<C\>]

**`Since`**

2.0.0

---

### separate

▸ **separate**\<`A`, `B`\>(`self`): [[`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>, [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`B`\>]

Partitions the elements of this chunk into two chunks.

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |

#### Parameters

| Name   | Type                                                                             |
| :----- | :------------------------------------------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<[`Either`](E.md#either)\<`A`, `B`\>\> |

#### Returns

[[`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>, [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`B`\>]

**`Since`**

2.0.0

## folding

### join

▸ **join**(`sep`): (`self`: [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`string`\>) => `string`

Joins the elements together with "sep" in the middle.

#### Parameters

| Name  | Type     |
| :---- | :------- |
| `sep` | `string` |

#### Returns

`fn`

▸ (`self`): `string`

##### Parameters

| Name   | Type                                                  |
| :----- | :---------------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`string`\> |

##### Returns

`string`

**`Since`**

2.0.0

▸ **join**(`self`, `sep`): `string`

Joins the elements together with "sep" in the middle.

#### Parameters

| Name   | Type                                                  |
| :----- | :---------------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`string`\> |
| `sep`  | `string`                                              |

#### Returns

`string`

**`Since`**

2.0.0

---

### mapAccum

▸ **mapAccum**\<`S`, `A`, `B`\>(`s`, `f`): (`self`: [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>) => [`S`, [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`B`\>]

Statefully maps over the chunk, producing new elements of type `B`.

#### Type parameters

| Name |
| :--- |
| `S`  |
| `A`  |
| `B`  |

#### Parameters

| Name | Type                                        |
| :--- | :------------------------------------------ |
| `s`  | `S`                                         |
| `f`  | (`s`: `S`, `a`: `A`) => readonly [`S`, `B`] |

#### Returns

`fn`

▸ (`self`): [`S`, [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`B`\>]

##### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |

##### Returns

[`S`, [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`B`\>]

**`Since`**

2.0.0

▸ **mapAccum**\<`S`, `A`, `B`\>(`self`, `s`, `f`): [`S`, [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`B`\>]

Statefully maps over the chunk, producing new elements of type `B`.

#### Type parameters

| Name |
| :--- |
| `S`  |
| `A`  |
| `B`  |

#### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |
| `s`    | `S`                                              |
| `f`    | (`s`: `S`, `a`: `A`) => readonly [`S`, `B`]      |

#### Returns

[`S`, [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`B`\>]

**`Since`**

2.0.0

---

### reduce

▸ **reduce**\<`B`, `A`\>(`b`, `f`): (`self`: [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>) => `B`

#### Type parameters

| Name |
| :--- |
| `B`  |
| `A`  |

#### Parameters

| Name | Type                                       |
| :--- | :----------------------------------------- |
| `b`  | `B`                                        |
| `f`  | (`b`: `B`, `a`: `A`, `i`: `number`) => `B` |

#### Returns

`fn`

▸ (`self`): `B`

##### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |

##### Returns

`B`

**`Since`**

2.0.0

▸ **reduce**\<`A`, `B`\>(`self`, `b`, `f`): `B`

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |

#### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |
| `b`    | `B`                                              |
| `f`    | (`b`: `B`, `a`: `A`, `i`: `number`) => `B`       |

#### Returns

`B`

**`Since`**

2.0.0

---

### reduceRight

▸ **reduceRight**\<`B`, `A`\>(`b`, `f`): (`self`: [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>) => `B`

#### Type parameters

| Name |
| :--- |
| `B`  |
| `A`  |

#### Parameters

| Name | Type                                       |
| :--- | :----------------------------------------- |
| `b`  | `B`                                        |
| `f`  | (`b`: `B`, `a`: `A`, `i`: `number`) => `B` |

#### Returns

`fn`

▸ (`self`): `B`

##### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |

##### Returns

`B`

**`Since`**

2.0.0

▸ **reduceRight**\<`A`, `B`\>(`self`, `b`, `f`): `B`

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |

#### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |
| `b`    | `B`                                              |
| `f`    | (`b`: `B`, `a`: `A`, `i`: `number`) => `B`       |

#### Returns

`B`

**`Since`**

2.0.0

## mapping

### map

▸ **map**\<`T`, `B`\>(`f`): (`self`: `T`) => [`With`](Chunk.Chunk.md#with)\<`T`, `B`\>

Returns a chunk with the elements mapped by the specified f function.

#### Type parameters

| Name | Type                                                       |
| :--- | :--------------------------------------------------------- |
| `T`  | extends [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`any`\> |
| `B`  | `B`                                                        |

#### Parameters

| Name | Type                                                                |
| :--- | :------------------------------------------------------------------ |
| `f`  | (`a`: [`Infer`](Chunk.Chunk.md#infer)\<`T`\>, `i`: `number`) => `B` |

#### Returns

`fn`

▸ (`self`): [`With`](Chunk.Chunk.md#with)\<`T`, `B`\>

##### Parameters

| Name   | Type |
| :----- | :--- |
| `self` | `T`  |

##### Returns

[`With`](Chunk.Chunk.md#with)\<`T`, `B`\>

**`Since`**

2.0.0

▸ **map**\<`T`, `B`\>(`self`, `f`): [`With`](Chunk.Chunk.md#with)\<`T`, `B`\>

Returns a chunk with the elements mapped by the specified f function.

#### Type parameters

| Name | Type                                                       |
| :--- | :--------------------------------------------------------- |
| `T`  | extends [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`any`\> |
| `B`  | `B`                                                        |

#### Parameters

| Name   | Type                                                                |
| :----- | :------------------------------------------------------------------ |
| `self` | `T`                                                                 |
| `f`    | (`a`: [`Infer`](Chunk.Chunk.md#infer)\<`T`\>, `i`: `number`) => `B` |

#### Returns

[`With`](Chunk.Chunk.md#with)\<`T`, `B`\>

**`Since`**

2.0.0

## sequencing

### flatMap

▸ **flatMap**\<`A`, `B`\>(`f`): (`self`: [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>) => [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`B`\>

Returns a chunk with the elements mapped by the specified function.

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |

#### Parameters

| Name | Type                                                                          |
| :--- | :---------------------------------------------------------------------------- |
| `f`  | (`a`: `A`, `i`: `number`) => [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`B`\> |

#### Returns

`fn`

▸ (`self`): [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`B`\>

##### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |

##### Returns

[`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`B`\>

**`Since`**

2.0.0

▸ **flatMap**\<`A`, `B`\>(`self`, `f`): [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`B`\>

Returns a chunk with the elements mapped by the specified function.

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |

#### Parameters

| Name   | Type                                                                          |
| :----- | :---------------------------------------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>                              |
| `f`    | (`a`: `A`, `i`: `number`) => [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`B`\> |

#### Returns

[`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`B`\>

**`Since`**

2.0.0

---

### flatMapNonEmpty

▸ **flatMapNonEmpty**\<`A`, `B`\>(`f`): (`self`: [`NonEmptyChunk`](../interfaces/Chunk.NonEmptyChunk.md)\<`A`\>) => [`NonEmptyChunk`](../interfaces/Chunk.NonEmptyChunk.md)\<`B`\>

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |

#### Parameters

| Name | Type                                                                                        |
| :--- | :------------------------------------------------------------------------------------------ |
| `f`  | (`a`: `A`, `i`: `number`) => [`NonEmptyChunk`](../interfaces/Chunk.NonEmptyChunk.md)\<`B`\> |

#### Returns

`fn`

▸ (`self`): [`NonEmptyChunk`](../interfaces/Chunk.NonEmptyChunk.md)\<`B`\>

##### Parameters

| Name   | Type                                                           |
| :----- | :------------------------------------------------------------- |
| `self` | [`NonEmptyChunk`](../interfaces/Chunk.NonEmptyChunk.md)\<`A`\> |

##### Returns

[`NonEmptyChunk`](../interfaces/Chunk.NonEmptyChunk.md)\<`B`\>

**`Since`**

2.0.0

▸ **flatMapNonEmpty**\<`A`, `B`\>(`self`, `f`): [`NonEmptyChunk`](../interfaces/Chunk.NonEmptyChunk.md)\<`B`\>

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |

#### Parameters

| Name   | Type                                                                                        |
| :----- | :------------------------------------------------------------------------------------------ |
| `self` | [`NonEmptyChunk`](../interfaces/Chunk.NonEmptyChunk.md)\<`A`\>                              |
| `f`    | (`a`: `A`, `i`: `number`) => [`NonEmptyChunk`](../interfaces/Chunk.NonEmptyChunk.md)\<`B`\> |

#### Returns

[`NonEmptyChunk`](../interfaces/Chunk.NonEmptyChunk.md)\<`B`\>

**`Since`**

2.0.0

---

### flatten

▸ **flatten**\<`A`\>(`self`): [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>

Flattens a chunk of chunks into a single chunk by concatenating all chunks.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name   | Type                                                                                          |
| :----- | :-------------------------------------------------------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<[`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>\> |

#### Returns

[`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>

**`Since`**

2.0.0

---

### flattenNonEmpty

▸ **flattenNonEmpty**\<`A`\>(`self`): [`NonEmptyChunk`](../interfaces/Chunk.NonEmptyChunk.md)\<`A`\>

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name   | Type                                                                                                                      |
| :----- | :------------------------------------------------------------------------------------------------------------------------ |
| `self` | [`NonEmptyChunk`](../interfaces/Chunk.NonEmptyChunk.md)\<[`NonEmptyChunk`](../interfaces/Chunk.NonEmptyChunk.md)\<`A`\>\> |

#### Returns

[`NonEmptyChunk`](../interfaces/Chunk.NonEmptyChunk.md)\<`A`\>

**`Since`**

2.0.0

## symbol

### TypeId

Ƭ **TypeId**: typeof `TypeId`

**`Since`**

2.0.0

## unsafe

### unsafeFromArray

▸ **unsafeFromArray**\<`A`\>(`self`): [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>

Wraps an array into a chunk without copying, unsafe on mutable arrays

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name   | Type           |
| :----- | :------------- |
| `self` | readonly `A`[] |

#### Returns

[`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>

**`Since`**

2.0.0

---

### unsafeFromNonEmptyArray

▸ **unsafeFromNonEmptyArray**\<`A`\>(`self`): [`NonEmptyChunk`](../interfaces/Chunk.NonEmptyChunk.md)\<`A`\>

Wraps an array into a chunk without copying, unsafe on mutable arrays

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name   | Type                |
| :----- | :------------------ |
| `self` | readonly [`A`, `A`] |

#### Returns

[`NonEmptyChunk`](../interfaces/Chunk.NonEmptyChunk.md)\<`A`\>

**`Since`**

2.0.0

---

### unsafeGet

▸ **unsafeGet**(`index`): \<A\>(`self`: [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\>) => `A`

Gets an element unsafely, will throw on out of bounds

#### Parameters

| Name    | Type     |
| :------ | :------- |
| `index` | `number` |

#### Returns

`fn`

▸ \<`A`\>(`self`): `A`

##### Type parameters

| Name |
| :--- |
| `A`  |

##### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |

##### Returns

`A`

**`Since`**

2.0.0

▸ **unsafeGet**\<`A`\>(`self`, `index`): `A`

Gets an element unsafely, will throw on out of bounds

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name    | Type                                             |
| :------ | :----------------------------------------------- |
| `self`  | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |
| `index` | `number`                                         |

#### Returns

`A`

**`Since`**

2.0.0

---

### unsafeHead

▸ **unsafeHead**\<`A`\>(`self`): `A`

Returns the first element of this chunk.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |

#### Returns

`A`

**`Since`**

2.0.0

---

### unsafeLast

▸ **unsafeLast**\<`A`\>(`self`): `A`

Returns the last element of this chunk.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Chunk`](../interfaces/Chunk.Chunk-1.md)\<`A`\> |

#### Returns

`A`

**`Since`**

2.0.0
