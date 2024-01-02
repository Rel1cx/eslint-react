[@eslint-react/tools](../README.md) / Array

# Namespace: Array

## Table of contents

### Namespaces

- [ReadonlyArray](Array.ReadonlyArray.md)

### Interfaces

- [ReadonlyArrayTypeLambda](../interfaces/Array.ReadonlyArrayTypeLambda.md)

### Type Aliases

- [NonEmptyArray](Array.md#nonemptyarray)
- [NonEmptyReadonlyArray](Array.md#nonemptyreadonlyarray)

### Functions

- [append](Array.md#append)
- [appendAll](Array.md#appendall)
- [cartesian](Array.md#cartesian)
- [cartesianWith](Array.md#cartesianwith)
- [chop](Array.md#chop)
- [chunksOf](Array.md#chunksof)
- [contains](Array.md#contains)
- [containsWith](Array.md#containswith)
- [copy](Array.md#copy)
- [dedupe](Array.md#dedupe)
- [dedupeAdjacent](Array.md#dedupeadjacent)
- [dedupeAdjacentWith](Array.md#dedupeadjacentwith)
- [dedupeWith](Array.md#dedupewith)
- [difference](Array.md#difference)
- [differenceWith](Array.md#differencewith)
- [drop](Array.md#drop)
- [dropRight](Array.md#dropright)
- [dropWhile](Array.md#dropwhile)
- [empty](Array.md#empty)
- [every](Array.md#every)
- [extend](Array.md#extend)
- [filter](Array.md#filter)
- [filterMap](Array.md#filtermap)
- [filterMapWhile](Array.md#filtermapwhile)
- [findFirst](Array.md#findfirst)
- [findFirstIndex](Array.md#findfirstindex)
- [findLast](Array.md#findlast)
- [findLastIndex](Array.md#findlastindex)
- [flatMap](Array.md#flatmap)
- [flatMapNullable](Array.md#flatmapnullable)
- [flatten](Array.md#flatten)
- [forEach](Array.md#foreach)
- [fromIterable](Array.md#fromiterable)
- [fromNullable](Array.md#fromnullable)
- [fromOption](Array.md#fromoption)
- [fromRecord](Array.md#fromrecord)
- [get](Array.md#get)
- [getEquivalence](Array.md#getequivalence)
- [getLefts](Array.md#getlefts)
- [getOrder](Array.md#getorder)
- [getRights](Array.md#getrights)
- [getSomes](Array.md#getsomes)
- [group](Array.md#group)
- [groupBy](Array.md#groupby)
- [groupWith](Array.md#groupwith)
- [head](Array.md#head)
- [headNonEmpty](Array.md#headnonempty)
- [init](Array.md#init)
- [initNonEmpty](Array.md#initnonempty)
- [insertAt](Array.md#insertat)
- [intersection](Array.md#intersection)
- [intersectionWith](Array.md#intersectionwith)
- [intersperse](Array.md#intersperse)
- [isEmptyArray](Array.md#isemptyarray)
- [isEmptyReadonlyArray](Array.md#isemptyreadonlyarray)
- [isNonEmptyArray](Array.md#isnonemptyarray)
- [isNonEmptyReadonlyArray](Array.md#isnonemptyreadonlyarray)
- [join](Array.md#join)
- [last](Array.md#last)
- [lastNonEmpty](Array.md#lastnonempty)
- [length](Array.md#length)
- [liftEither](Array.md#lifteither)
- [liftNullable](Array.md#liftnullable)
- [liftOption](Array.md#liftoption)
- [liftPredicate](Array.md#liftpredicate)
- [make](Array.md#make)
- [makeBy](Array.md#makeby)
- [map](Array.md#map)
- [mapAccum](Array.md#mapaccum)
- [match](Array.md#match)
- [matchLeft](Array.md#matchleft)
- [matchRight](Array.md#matchright)
- [max](Array.md#max)
- [min](Array.md#min)
- [modify](Array.md#modify)
- [modifyNonEmptyHead](Array.md#modifynonemptyhead)
- [modifyNonEmptyLast](Array.md#modifynonemptylast)
- [modifyOption](Array.md#modifyoption)
- [of](Array.md#of)
- [partition](Array.md#partition)
- [partitionMap](Array.md#partitionmap)
- [prepend](Array.md#prepend)
- [prependAll](Array.md#prependall)
- [range](Array.md#range)
- [reduce](Array.md#reduce)
- [reduceRight](Array.md#reduceright)
- [remove](Array.md#remove)
- [replace](Array.md#replace)
- [replaceOption](Array.md#replaceoption)
- [replicate](Array.md#replicate)
- [reverse](Array.md#reverse)
- [rotate](Array.md#rotate)
- [scan](Array.md#scan)
- [scanRight](Array.md#scanright)
- [separate](Array.md#separate)
- [setNonEmptyHead](Array.md#setnonemptyhead)
- [setNonEmptyLast](Array.md#setnonemptylast)
- [some](Array.md#some)
- [sort](Array.md#sort)
- [sortBy](Array.md#sortby)
- [sortWith](Array.md#sortwith)
- [span](Array.md#span)
- [split](Array.md#split)
- [splitAt](Array.md#splitat)
- [splitNonEmptyAt](Array.md#splitnonemptyat)
- [splitWhere](Array.md#splitwhere)
- [tail](Array.md#tail)
- [tailNonEmpty](Array.md#tailnonempty)
- [take](Array.md#take)
- [takeRight](Array.md#takeright)
- [takeWhile](Array.md#takewhile)
- [unappend](Array.md#unappend)
- [unfold](Array.md#unfold)
- [union](Array.md#union)
- [unionWith](Array.md#unionwith)
- [unprepend](Array.md#unprepend)
- [unsafeGet](Array.md#unsafeget)
- [unzip](Array.md#unzip)
- [zip](Array.md#zip)
- [zipWith](Array.md#zipwith)

## Other

### chop

▸ **chop**\<`S`, `B`\>(`f`): (`self`: `S`) => [`With`](Array.ReadonlyArray.md#with)\<`S`, [`Infer`](Array.ReadonlyArray.md#infer)\<`S`\>\>

A useful recursion pattern for processing an `Iterable` to produce a new `Array`, often used for "chopping" up the input
`Iterable`. Typically chop is called with some function that will consume an initial prefix of the `Iterable` and produce a
value and the rest of the `Array`.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends readonly `any`[] \| `Iterable`\<`any`\> |
| `B` | `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (`as`: readonly [[`Infer`](Array.ReadonlyArray.md#infer)\<`S`\>, [`Infer`](Array.ReadonlyArray.md#infer)\<`S`\>]) => readonly [`B`, readonly [`Infer`](Array.ReadonlyArray.md#infer)\<`S`\>[]] |

#### Returns

`fn`

▸ (`self`): [`With`](Array.ReadonlyArray.md#with)\<`S`, [`Infer`](Array.ReadonlyArray.md#infer)\<`S`\>\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `S` |

##### Returns

[`With`](Array.ReadonlyArray.md#with)\<`S`, [`Infer`](Array.ReadonlyArray.md#infer)\<`S`\>\>

**`Since`**

2.0.0

▸ **chop**\<`A`, `B`\>(`self`, `f`): [`B`, ...B[]]

A useful recursion pattern for processing an `Iterable` to produce a new `Array`, often used for "chopping" up the input
`Iterable`. Typically chop is called with some function that will consume an initial prefix of the `Iterable` and produce a
value and the rest of the `Array`.

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | readonly [`A`, `A`] |
| `f` | (`as`: readonly [`A`, `A`]) => readonly [`B`, readonly `A`[]] |

#### Returns

[`B`, ...B[]]

**`Since`**

2.0.0

▸ **chop**\<`A`, `B`\>(`self`, `f`): `B`[]

A useful recursion pattern for processing an `Iterable` to produce a new `Array`, often used for "chopping" up the input
`Iterable`. Typically chop is called with some function that will consume an initial prefix of the `Iterable` and produce a
value and the rest of the `Array`.

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |
| `f` | (`as`: readonly [`A`, `A`]) => readonly [`B`, readonly `A`[]] |

#### Returns

`B`[]

**`Since`**

2.0.0

___

### copy

▸ **copy**\<`A`\>(`self`): [`A`, ...A[]]

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | readonly [`A`, `A`] |

#### Returns

[`A`, ...A[]]

**`Since`**

2.0.0

▸ **copy**\<`A`\>(`self`): `A`[]

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | readonly `A`[] |

#### Returns

`A`[]

**`Since`**

2.0.0

___

### dedupe

▸ **dedupe**\<`S`\>(`self`): `S` extends readonly [`A`, `A`] ? [`A`, ...A[]] : `S` extends `Iterable`\<`A_1`\> ? `A_1`[] : `never`

Remove duplicates from an `Iterable`, preserving the order of the first occurrence of each element.
The equivalence used to compare elements is provided by `Equal.equivalence()` from the `Equal` module.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends readonly [`any`, `any`] \| `Iterable`\<`any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `S` |

#### Returns

`S` extends readonly [`A`, `A`] ? [`A`, ...A[]] : `S` extends `Iterable`\<`A_1`\> ? `A_1`[] : `never`

**`Since`**

2.0.0

___

### dedupeAdjacent

▸ **dedupeAdjacent**\<`A`\>(`self`): `A`[]

Deduplicates adjacent elements that are identical.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |

#### Returns

`A`[]

**`Since`**

2.0.0

___

### dedupeAdjacentWith

▸ **dedupeAdjacentWith**\<`A`\>(`isEquivalent`): (`self`: `Iterable`\<`A`\>) => `A`[]

Deduplicates adjacent elements that are identical using the provided `isEquivalent` function.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `isEquivalent` | (`self`: `A`, `that`: `A`) => `boolean` |

#### Returns

`fn`

▸ (`self`): `A`[]

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |

##### Returns

`A`[]

**`Since`**

2.0.0

▸ **dedupeAdjacentWith**\<`A`\>(`self`, `isEquivalent`): `A`[]

Deduplicates adjacent elements that are identical using the provided `isEquivalent` function.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |
| `isEquivalent` | (`self`: `A`, `that`: `A`) => `boolean` |

#### Returns

`A`[]

**`Since`**

2.0.0

___

### dedupeWith

▸ **dedupeWith**\<`S`\>(`isEquivalent`): (`self`: `S`) => [`With`](Array.ReadonlyArray.md#with)\<`S`, [`Infer`](Array.ReadonlyArray.md#infer)\<`S`\>\>

Remove duplicates from an `Iterable` using the provided `isEquivalent` function,
preserving the order of the first occurrence of each element.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends readonly `any`[] \| `Iterable`\<`any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `isEquivalent` | (`self`: [`Infer`](Array.ReadonlyArray.md#infer)\<`S`\>, `that`: [`Infer`](Array.ReadonlyArray.md#infer)\<`S`\>) => `boolean` |

#### Returns

`fn`

▸ (`self`): [`With`](Array.ReadonlyArray.md#with)\<`S`, [`Infer`](Array.ReadonlyArray.md#infer)\<`S`\>\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `S` |

##### Returns

[`With`](Array.ReadonlyArray.md#with)\<`S`, [`Infer`](Array.ReadonlyArray.md#infer)\<`S`\>\>

**`Since`**

2.0.0

▸ **dedupeWith**\<`A`\>(`self`, `isEquivalent`): [`A`, ...A[]]

Remove duplicates from an `Iterable` using the provided `isEquivalent` function,
preserving the order of the first occurrence of each element.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | readonly [`A`, `A`] |
| `isEquivalent` | (`self`: `A`, `that`: `A`) => `boolean` |

#### Returns

[`A`, ...A[]]

**`Since`**

2.0.0

▸ **dedupeWith**\<`A`\>(`self`, `isEquivalent`): `A`[]

Remove duplicates from an `Iterable` using the provided `isEquivalent` function,
preserving the order of the first occurrence of each element.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |
| `isEquivalent` | (`self`: `A`, `that`: `A`) => `boolean` |

#### Returns

`A`[]

**`Since`**

2.0.0

___

### difference

▸ **difference**\<`A`\>(`that`): (`self`: `Iterable`\<`A`\>) => `A`[]

Creates a `Array` of values not included in the other given `Iterable`.
The order and references of result values are determined by the first `Iterable`.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `that` | `Iterable`\<`A`\> |

#### Returns

`fn`

▸ (`self`): `A`[]

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |

##### Returns

`A`[]

**`Since`**

2.0.0

▸ **difference**\<`A`\>(`self`, `that`): `A`[]

Creates a `Array` of values not included in the other given `Iterable`.
The order and references of result values are determined by the first `Iterable`.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |
| `that` | `Iterable`\<`A`\> |

#### Returns

`A`[]

**`Since`**

2.0.0

___

### differenceWith

▸ **differenceWith**\<`A`\>(`isEquivalent`): (`that`: `Iterable`\<`A`\>) => (`self`: `Iterable`\<`A`\>) => `A`[](`self`: `Iterable`\<`A`\>, `that`: `Iterable`\<`A`\>) => `A`[]

Creates a `Array` of values not included in the other given `Iterable` using the provided `isEquivalent` function.
The order and references of result values are determined by the first `Iterable`.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `isEquivalent` | (`self`: `A`, `that`: `A`) => `boolean` |

#### Returns

`fn`

▸ (`that`): (`self`: `Iterable`\<`A`\>) => `A`[]

##### Parameters

| Name | Type |
| :------ | :------ |
| `that` | `Iterable`\<`A`\> |

##### Returns

`fn`

▸ (`self`): `A`[]

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |

##### Returns

`A`[]

▸ (`self`, `that`): `A`[]

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |
| `that` | `Iterable`\<`A`\> |

##### Returns

`A`[]

**`Since`**

2.0.0

___

### extend

▸ **extend**\<`A`, `B`\>(`f`): (`self`: readonly `A`[]) => `B`[]

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (`as`: readonly `A`[]) => `B` |

#### Returns

`fn`

▸ (`self`): `B`[]

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | readonly `A`[] |

##### Returns

`B`[]

**`Since`**

2.0.0

▸ **extend**\<`A`, `B`\>(`self`, `f`): `B`[]

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | readonly `A`[] |
| `f` | (`as`: readonly `A`[]) => `B` |

#### Returns

`B`[]

**`Since`**

2.0.0

___

### forEach

▸ **forEach**\<`A`\>(`f`): (`self`: `Iterable`\<`A`\>) => `void`

Iterate over the `Iterable` applying `f`.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (`a`: `A`, `i`: `number`) => `void` |

#### Returns

`fn`

▸ (`self`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |

##### Returns

`void`

**`Since`**

2.0.0

▸ **forEach**\<`A`\>(`self`, `f`): `void`

Iterate over the `Iterable` applying `f`.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |
| `f` | (`a`: `A`, `i`: `number`) => `void` |

#### Returns

`void`

**`Since`**

2.0.0

___

### insertAt

▸ **insertAt**\<`B`\>(`i`, `b`): \<A\>(`self`: `Iterable`\<`A`\>) => [`Option`](O.md#option)\<[`B` \| `A`, ...(B \| A)[]]\>

Insert an element at the specified index, creating a new `NonEmptyArray`,
or return `None` if the index is out of bounds.

#### Type parameters

| Name |
| :------ |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `i` | `number` |
| `b` | `B` |

#### Returns

`fn`

▸ \<`A`\>(`self`): [`Option`](O.md#option)\<[`B` \| `A`, ...(B \| A)[]]\>

##### Type parameters

| Name |
| :------ |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |

##### Returns

[`Option`](O.md#option)\<[`B` \| `A`, ...(B \| A)[]]\>

**`Since`**

2.0.0

▸ **insertAt**\<`A`, `B`\>(`self`, `i`, `b`): [`Option`](O.md#option)\<[`A` \| `B`, ...(A \| B)[]]\>

Insert an element at the specified index, creating a new `NonEmptyArray`,
or return `None` if the index is out of bounds.

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |
| `i` | `number` |
| `b` | `B` |

#### Returns

[`Option`](O.md#option)\<[`A` \| `B`, ...(A \| B)[]]\>

**`Since`**

2.0.0

___

### intersection

▸ **intersection**\<`B`\>(`that`): \<A\>(`self`: `Iterable`\<`A`\>) => `A` & `B`[]

Creates an `Array` of unique values that are included in all given `Iterable`s.
The order and references of result values are determined by the first `Iterable`.

#### Type parameters

| Name |
| :------ |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `that` | `Iterable`\<`B`\> |

#### Returns

`fn`

▸ \<`A`\>(`self`): `A` & `B`[]

##### Type parameters

| Name |
| :------ |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |

##### Returns

`A` & `B`[]

**`Since`**

2.0.0

▸ **intersection**\<`A`, `B`\>(`self`, `that`): `A` & `B`[]

Creates an `Array` of unique values that are included in all given `Iterable`s.
The order and references of result values are determined by the first `Iterable`.

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |
| `that` | `Iterable`\<`B`\> |

#### Returns

`A` & `B`[]

**`Since`**

2.0.0

___

### intersectionWith

▸ **intersectionWith**\<`A`\>(`isEquivalent`): (`that`: `Iterable`\<`A`\>) => (`self`: `Iterable`\<`A`\>) => `A`[](`self`: `Iterable`\<`A`\>, `that`: `Iterable`\<`A`\>) => `A`[]

Creates an `Array` of unique values that are included in all given `Iterable`s using the provided `isEquivalent` function.
The order and references of result values are determined by the first `Iterable`.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `isEquivalent` | (`self`: `A`, `that`: `A`) => `boolean` |

#### Returns

`fn`

▸ (`that`): (`self`: `Iterable`\<`A`\>) => `A`[]

##### Parameters

| Name | Type |
| :------ | :------ |
| `that` | `Iterable`\<`A`\> |

##### Returns

`fn`

▸ (`self`): `A`[]

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |

##### Returns

`A`[]

▸ (`self`, `that`): `A`[]

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |
| `that` | `Iterable`\<`A`\> |

##### Returns

`A`[]

**`Since`**

2.0.0

___

### intersperse

▸ **intersperse**\<`B`\>(`middle`): \<S\>(`self`: `S`) => [`With`](Array.ReadonlyArray.md#with)\<`S`, [`Infer`](Array.ReadonlyArray.md#infer)\<`S`\>\>

Places an element in between members of an `Iterable`.
If the input is a non-empty array, the result is also a non-empty array.

#### Type parameters

| Name |
| :------ |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `middle` | `B` |

#### Returns

`fn`

▸ \<`S`\>(`self`): [`With`](Array.ReadonlyArray.md#with)\<`S`, [`Infer`](Array.ReadonlyArray.md#infer)\<`S`\>\>

##### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends readonly `any`[] \| `Iterable`\<`any`\> |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `S` |

##### Returns

[`With`](Array.ReadonlyArray.md#with)\<`S`, [`Infer`](Array.ReadonlyArray.md#infer)\<`S`\>\>

**`Since`**

2.0.0

▸ **intersperse**\<`A`, `B`\>(`self`, `middle`): [`A` \| `B`, ...(A \| B)[]]

Places an element in between members of an `Iterable`.
If the input is a non-empty array, the result is also a non-empty array.

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | readonly [`A`, `A`] |
| `middle` | `B` |

#### Returns

[`A` \| `B`, ...(A \| B)[]]

**`Since`**

2.0.0

▸ **intersperse**\<`A`, `B`\>(`self`, `middle`): (`A` \| `B`)[]

Places an element in between members of an `Iterable`.
If the input is a non-empty array, the result is also a non-empty array.

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |
| `middle` | `B` |

#### Returns

(`A` \| `B`)[]

**`Since`**

2.0.0

___

### max

▸ **max**\<`A`\>(`O`): (`self`: readonly [`A`, `A`]) => `A`

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `O` | [`Order`](../interfaces/Ord.Order.md)\<`A`\> |

#### Returns

`fn`

▸ (`self`): `A`

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | readonly [`A`, `A`] |

##### Returns

`A`

**`Since`**

2.0.0

▸ **max**\<`A`\>(`self`, `O`): `A`

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | readonly [`A`, `A`] |
| `O` | [`Order`](../interfaces/Ord.Order.md)\<`A`\> |

#### Returns

`A`

**`Since`**

2.0.0

___

### min

▸ **min**\<`A`\>(`O`): (`self`: readonly [`A`, `A`]) => `A`

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `O` | [`Order`](../interfaces/Ord.Order.md)\<`A`\> |

#### Returns

`fn`

▸ (`self`): `A`

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | readonly [`A`, `A`] |

##### Returns

`A`

**`Since`**

2.0.0

▸ **min**\<`A`\>(`self`, `O`): `A`

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | readonly [`A`, `A`] |
| `O` | [`Order`](../interfaces/Ord.Order.md)\<`A`\> |

#### Returns

`A`

**`Since`**

2.0.0

___

### modify

▸ **modify**\<`A`, `B`\>(`i`, `f`): (`self`: `Iterable`\<`A`\>) => (`A` \| `B`)[]

Apply a function to the element at the specified index, creating a new `Array`,
or return a copy of the input if the index is out of bounds.

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `i` | `number` |
| `f` | (`a`: `A`) => `B` |

#### Returns

`fn`

▸ (`self`): (`A` \| `B`)[]

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |

##### Returns

(`A` \| `B`)[]

**`Since`**

2.0.0

▸ **modify**\<`A`, `B`\>(`self`, `i`, `f`): (`A` \| `B`)[]

Apply a function to the element at the specified index, creating a new `Array`,
or return a copy of the input if the index is out of bounds.

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |
| `i` | `number` |
| `f` | (`a`: `A`) => `B` |

#### Returns

(`A` \| `B`)[]

**`Since`**

2.0.0

___

### modifyNonEmptyHead

▸ **modifyNonEmptyHead**\<`A`, `B`\>(`f`): (`self`: readonly [`A`, `A`]) => [`A` \| `B`, ...(A \| B)[]]

Apply a function to the head, creating a new `NonEmptyReadonlyArray`.

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (`a`: `A`) => `B` |

#### Returns

`fn`

▸ (`self`): [`A` \| `B`, ...(A \| B)[]]

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | readonly [`A`, `A`] |

##### Returns

[`A` \| `B`, ...(A \| B)[]]

**`Since`**

2.0.0

▸ **modifyNonEmptyHead**\<`A`, `B`\>(`self`, `f`): [`A` \| `B`, ...(A \| B)[]]

Apply a function to the head, creating a new `NonEmptyReadonlyArray`.

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | readonly [`A`, `A`] |
| `f` | (`a`: `A`) => `B` |

#### Returns

[`A` \| `B`, ...(A \| B)[]]

**`Since`**

2.0.0

___

### modifyNonEmptyLast

▸ **modifyNonEmptyLast**\<`A`, `B`\>(`f`): (`self`: readonly [`A`, `A`]) => [`A` \| `B`, ...(A \| B)[]]

Apply a function to the last element, creating a new `NonEmptyReadonlyArray`.

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (`a`: `A`) => `B` |

#### Returns

`fn`

▸ (`self`): [`A` \| `B`, ...(A \| B)[]]

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | readonly [`A`, `A`] |

##### Returns

[`A` \| `B`, ...(A \| B)[]]

**`Since`**

2.0.0

▸ **modifyNonEmptyLast**\<`A`, `B`\>(`self`, `f`): [`A` \| `B`, ...(A \| B)[]]

Apply a function to the last element, creating a new `NonEmptyReadonlyArray`.

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | readonly [`A`, `A`] |
| `f` | (`a`: `A`) => `B` |

#### Returns

[`A` \| `B`, ...(A \| B)[]]

**`Since`**

2.0.0

___

### modifyOption

▸ **modifyOption**\<`A`, `B`\>(`i`, `f`): (`self`: `Iterable`\<`A`\>) => [`Option`](O.md#option)\<(`A` \| `B`)[]\>

Apply a function to the element at the specified index, creating a new `Array`,
or return `None` if the index is out of bounds.

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `i` | `number` |
| `f` | (`a`: `A`) => `B` |

#### Returns

`fn`

▸ (`self`): [`Option`](O.md#option)\<(`A` \| `B`)[]\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |

##### Returns

[`Option`](O.md#option)\<(`A` \| `B`)[]\>

**`Since`**

2.0.0

▸ **modifyOption**\<`A`, `B`\>(`self`, `i`, `f`): [`Option`](O.md#option)\<(`A` \| `B`)[]\>

Apply a function to the element at the specified index, creating a new `Array`,
or return `None` if the index is out of bounds.

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |
| `i` | `number` |
| `f` | (`a`: `A`) => `B` |

#### Returns

[`Option`](O.md#option)\<(`A` \| `B`)[]\>

**`Since`**

2.0.0

___

### remove

▸ **remove**(`i`): \<A\>(`self`: `Iterable`\<`A`\>) => `A`[]

Delete the element at the specified index, creating a new `Array`,
or return a copy of the input if the index is out of bounds.

#### Parameters

| Name | Type |
| :------ | :------ |
| `i` | `number` |

#### Returns

`fn`

▸ \<`A`\>(`self`): `A`[]

##### Type parameters

| Name |
| :------ |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |

##### Returns

`A`[]

**`Since`**

2.0.0

▸ **remove**\<`A`\>(`self`, `i`): `A`[]

Delete the element at the specified index, creating a new `Array`,
or return a copy of the input if the index is out of bounds.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |
| `i` | `number` |

#### Returns

`A`[]

**`Since`**

2.0.0

___

### replace

▸ **replace**\<`B`\>(`i`, `b`): \<A\>(`self`: `Iterable`\<`A`\>) => (`B` \| `A`)[]

Change the element at the specified index, creating a new `Array`,
or return a copy of the input if the index is out of bounds.

#### Type parameters

| Name |
| :------ |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `i` | `number` |
| `b` | `B` |

#### Returns

`fn`

▸ \<`A`\>(`self`): (`B` \| `A`)[]

##### Type parameters

| Name |
| :------ |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |

##### Returns

(`B` \| `A`)[]

**`Since`**

2.0.0

▸ **replace**\<`A`, `B`\>(`self`, `i`, `b`): (`A` \| `B`)[]

Change the element at the specified index, creating a new `Array`,
or return a copy of the input if the index is out of bounds.

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |
| `i` | `number` |
| `b` | `B` |

#### Returns

(`A` \| `B`)[]

**`Since`**

2.0.0

___

### replaceOption

▸ **replaceOption**\<`B`\>(`i`, `b`): \<A\>(`self`: `Iterable`\<`A`\>) => [`Option`](O.md#option)\<(`B` \| `A`)[]\>

#### Type parameters

| Name |
| :------ |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `i` | `number` |
| `b` | `B` |

#### Returns

`fn`

▸ \<`A`\>(`self`): [`Option`](O.md#option)\<(`B` \| `A`)[]\>

##### Type parameters

| Name |
| :------ |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |

##### Returns

[`Option`](O.md#option)\<(`B` \| `A`)[]\>

**`Since`**

2.0.0

▸ **replaceOption**\<`A`, `B`\>(`self`, `i`, `b`): [`Option`](O.md#option)\<(`A` \| `B`)[]\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |
| `i` | `number` |
| `b` | `B` |

#### Returns

[`Option`](O.md#option)\<(`A` \| `B`)[]\>

**`Since`**

2.0.0

___

### rotate

▸ **rotate**(`n`): \<S\>(`self`: `S`) => [`With`](Array.ReadonlyArray.md#with)\<`S`, [`Infer`](Array.ReadonlyArray.md#infer)\<`S`\>\>

Rotate an `Iterable` by `n` steps.
If the input is a non-empty array, the result is also a non-empty array.

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

`fn`

▸ \<`S`\>(`self`): [`With`](Array.ReadonlyArray.md#with)\<`S`, [`Infer`](Array.ReadonlyArray.md#infer)\<`S`\>\>

##### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends readonly `any`[] \| `Iterable`\<`any`\> |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `S` |

##### Returns

[`With`](Array.ReadonlyArray.md#with)\<`S`, [`Infer`](Array.ReadonlyArray.md#infer)\<`S`\>\>

**`Since`**

2.0.0

▸ **rotate**\<`A`\>(`self`, `n`): [`A`, ...A[]]

Rotate an `Iterable` by `n` steps.
If the input is a non-empty array, the result is also a non-empty array.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | readonly [`A`, `A`] |
| `n` | `number` |

#### Returns

[`A`, ...A[]]

**`Since`**

2.0.0

▸ **rotate**\<`A`\>(`self`, `n`): `A`[]

Rotate an `Iterable` by `n` steps.
If the input is a non-empty array, the result is also a non-empty array.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |
| `n` | `number` |

#### Returns

`A`[]

**`Since`**

2.0.0

___

### setNonEmptyHead

▸ **setNonEmptyHead**\<`B`\>(`b`): \<A\>(`self`: readonly [`A`, `A`]) => [`B` \| `A`, ...(B \| A)[]]

Change the head, creating a new `NonEmptyReadonlyArray`.

#### Type parameters

| Name |
| :------ |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `b` | `B` |

#### Returns

`fn`

▸ \<`A`\>(`self`): [`B` \| `A`, ...(B \| A)[]]

##### Type parameters

| Name |
| :------ |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | readonly [`A`, `A`] |

##### Returns

[`B` \| `A`, ...(B \| A)[]]

**`Since`**

2.0.0

▸ **setNonEmptyHead**\<`A`, `B`\>(`self`, `b`): [`A` \| `B`, ...(A \| B)[]]

Change the head, creating a new `NonEmptyReadonlyArray`.

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | readonly [`A`, `A`] |
| `b` | `B` |

#### Returns

[`A` \| `B`, ...(A \| B)[]]

**`Since`**

2.0.0

___

### setNonEmptyLast

▸ **setNonEmptyLast**\<`B`\>(`b`): \<A\>(`self`: readonly [`A`, `A`]) => [`B` \| `A`, ...(B \| A)[]]

Change the last element, creating a new `NonEmptyReadonlyArray`.

#### Type parameters

| Name |
| :------ |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `b` | `B` |

#### Returns

`fn`

▸ \<`A`\>(`self`): [`B` \| `A`, ...(B \| A)[]]

##### Type parameters

| Name |
| :------ |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | readonly [`A`, `A`] |

##### Returns

[`B` \| `A`, ...(B \| A)[]]

**`Since`**

2.0.0

▸ **setNonEmptyLast**\<`A`, `B`\>(`self`, `b`): [`A` \| `B`, ...(A \| B)[]]

Change the last element, creating a new `NonEmptyReadonlyArray`.

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | readonly [`A`, `A`] |
| `b` | `B` |

#### Returns

[`A` \| `B`, ...(A \| B)[]]

**`Since`**

2.0.0

___

### union

▸ **union**\<`T`\>(`that`): \<S\>(`self`: `S`) => [`OrNonEmpty`](Array.ReadonlyArray.md#ornonempty)\<`S`, `T`, [`Infer`](Array.ReadonlyArray.md#infer)\<`S`\> \| [`Infer`](Array.ReadonlyArray.md#infer)\<`T`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends readonly `any`[] \| `Iterable`\<`any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `that` | `T` |

#### Returns

`fn`

▸ \<`S`\>(`self`): [`OrNonEmpty`](Array.ReadonlyArray.md#ornonempty)\<`S`, `T`, [`Infer`](Array.ReadonlyArray.md#infer)\<`S`\> \| [`Infer`](Array.ReadonlyArray.md#infer)\<`T`\>\>

##### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends readonly `any`[] \| `Iterable`\<`any`\> |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `S` |

##### Returns

[`OrNonEmpty`](Array.ReadonlyArray.md#ornonempty)\<`S`, `T`, [`Infer`](Array.ReadonlyArray.md#infer)\<`S`\> \| [`Infer`](Array.ReadonlyArray.md#infer)\<`T`\>\>

**`Since`**

2.0.0

▸ **union**\<`A`, `B`\>(`self`, `that`): [`A` \| `B`, ...(A \| B)[]]

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | readonly [`A`, `A`] |
| `that` | readonly `B`[] |

#### Returns

[`A` \| `B`, ...(A \| B)[]]

**`Since`**

2.0.0

▸ **union**\<`A`, `B`\>(`self`, `that`): [`A` \| `B`, ...(A \| B)[]]

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | readonly `A`[] |
| `that` | readonly [`B`, `B`] |

#### Returns

[`A` \| `B`, ...(A \| B)[]]

**`Since`**

2.0.0

▸ **union**\<`A`, `B`\>(`self`, `that`): (`A` \| `B`)[]

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |
| `that` | `Iterable`\<`B`\> |

#### Returns

(`A` \| `B`)[]

**`Since`**

2.0.0

___

### unionWith

▸ **unionWith**\<`S`, `T`\>(`that`, `isEquivalent`): (`self`: `S`) => [`OrNonEmpty`](Array.ReadonlyArray.md#ornonempty)\<`S`, `T`, [`Infer`](Array.ReadonlyArray.md#infer)\<`S`\> \| [`Infer`](Array.ReadonlyArray.md#infer)\<`T`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends readonly `any`[] \| `Iterable`\<`any`\> |
| `T` | extends readonly `any`[] \| `Iterable`\<`any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `that` | `T` |
| `isEquivalent` | (`self`: [`Infer`](Array.ReadonlyArray.md#infer)\<`S`\>, `that`: [`Infer`](Array.ReadonlyArray.md#infer)\<`T`\>) => `boolean` |

#### Returns

`fn`

▸ (`self`): [`OrNonEmpty`](Array.ReadonlyArray.md#ornonempty)\<`S`, `T`, [`Infer`](Array.ReadonlyArray.md#infer)\<`S`\> \| [`Infer`](Array.ReadonlyArray.md#infer)\<`T`\>\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `S` |

##### Returns

[`OrNonEmpty`](Array.ReadonlyArray.md#ornonempty)\<`S`, `T`, [`Infer`](Array.ReadonlyArray.md#infer)\<`S`\> \| [`Infer`](Array.ReadonlyArray.md#infer)\<`T`\>\>

**`Since`**

2.0.0

▸ **unionWith**\<`A`, `B`\>(`self`, `that`, `isEquivalent`): [`A` \| `B`, ...(A \| B)[]]

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | readonly [`A`, `A`] |
| `that` | `Iterable`\<`B`\> |
| `isEquivalent` | (`self`: `A`, `that`: `B`) => `boolean` |

#### Returns

[`A` \| `B`, ...(A \| B)[]]

**`Since`**

2.0.0

▸ **unionWith**\<`A`, `B`\>(`self`, `that`, `isEquivalent`): [`A` \| `B`, ...(A \| B)[]]

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |
| `that` | readonly [`B`, `B`] |
| `isEquivalent` | (`self`: `A`, `that`: `B`) => `boolean` |

#### Returns

[`A` \| `B`, ...(A \| B)[]]

**`Since`**

2.0.0

▸ **unionWith**\<`A`, `B`\>(`self`, `that`, `isEquivalent`): (`A` \| `B`)[]

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |
| `that` | `Iterable`\<`B`\> |
| `isEquivalent` | (`self`: `A`, `that`: `B`) => `boolean` |

#### Returns

(`A` \| `B`)[]

**`Since`**

2.0.0

___

### unzip

▸ **unzip**\<`S`\>(`self`): `S` extends readonly [readonly [`A`, `B`], readonly [`A`, `B`]] ? [[`A`, ...A[]], [`B`, ...B[]]] : `S` extends `Iterable`\<readonly [`A`, `B`]\> ? [`A`[], `B`[]] : `never`

This function is the inverse of `zip`. Takes an `Iterable` of pairs and return two corresponding `Array`s.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends `Iterable`\<readonly [`any`, `any`]\> \| readonly [readonly [`any`, `any`], readonly [`any`, `any`]] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `S` |

#### Returns

`S` extends readonly [readonly [`A`, `B`], readonly [`A`, `B`]] ? [[`A`, ...A[]], [`B`, ...B[]]] : `S` extends `Iterable`\<readonly [`A`, `B`]\> ? [`A`[], `B`[]] : `never`

**`Since`**

2.0.0

## concatenating

### append

▸ **append**\<`B`\>(`last`): \<A\>(`self`: `Iterable`\<`A`\>) => [`B` \| `A`, ...(B \| A)[]]

Append an element to the end of an `Iterable`, creating a new `NonEmptyArray`.

#### Type parameters

| Name |
| :------ |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `last` | `B` |

#### Returns

`fn`

▸ \<`A`\>(`self`): [`B` \| `A`, ...(B \| A)[]]

##### Type parameters

| Name |
| :------ |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |

##### Returns

[`B` \| `A`, ...(B \| A)[]]

**`Since`**

2.0.0

▸ **append**\<`A`, `B`\>(`self`, `last`): [`A` \| `B`, ...(A \| B)[]]

Append an element to the end of an `Iterable`, creating a new `NonEmptyArray`.

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |
| `last` | `B` |

#### Returns

[`A` \| `B`, ...(A \| B)[]]

**`Since`**

2.0.0

___

### appendAll

▸ **appendAll**\<`S`, `T`\>(`that`): (`self`: `S`) => [`OrNonEmpty`](Array.ReadonlyArray.md#ornonempty)\<`S`, `T`, [`Infer`](Array.ReadonlyArray.md#infer)\<`S`\> \| [`Infer`](Array.ReadonlyArray.md#infer)\<`T`\>\>

Concatenates two arrays (or iterables), combining their elements.
If either array is non-empty, the result is also a non-empty array.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends readonly `any`[] \| `Iterable`\<`any`\> |
| `T` | extends readonly `any`[] \| `Iterable`\<`any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `that` | `T` |

#### Returns

`fn`

▸ (`self`): [`OrNonEmpty`](Array.ReadonlyArray.md#ornonempty)\<`S`, `T`, [`Infer`](Array.ReadonlyArray.md#infer)\<`S`\> \| [`Infer`](Array.ReadonlyArray.md#infer)\<`T`\>\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `S` |

##### Returns

[`OrNonEmpty`](Array.ReadonlyArray.md#ornonempty)\<`S`, `T`, [`Infer`](Array.ReadonlyArray.md#infer)\<`S`\> \| [`Infer`](Array.ReadonlyArray.md#infer)\<`T`\>\>

**`Since`**

2.0.0

▸ **appendAll**\<`A`, `B`\>(`self`, `that`): [`A` \| `B`, ...(A \| B)[]]

Concatenates two arrays (or iterables), combining their elements.
If either array is non-empty, the result is also a non-empty array.

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |
| `that` | readonly [`B`, `B`] |

#### Returns

[`A` \| `B`, ...(A \| B)[]]

**`Since`**

2.0.0

▸ **appendAll**\<`A`, `B`\>(`self`, `that`): [`A` \| `B`, ...(A \| B)[]]

Concatenates two arrays (or iterables), combining their elements.
If either array is non-empty, the result is also a non-empty array.

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | readonly [`A`, `A`] |
| `that` | `Iterable`\<`B`\> |

#### Returns

[`A` \| `B`, ...(A \| B)[]]

**`Since`**

2.0.0

▸ **appendAll**\<`A`, `B`\>(`self`, `that`): (`A` \| `B`)[]

Concatenates two arrays (or iterables), combining their elements.
If either array is non-empty, the result is also a non-empty array.

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |
| `that` | `Iterable`\<`B`\> |

#### Returns

(`A` \| `B`)[]

**`Since`**

2.0.0

___

### prepend

▸ **prepend**\<`B`\>(`head`): \<A\>(`self`: `Iterable`\<`A`\>) => [`B` \| `A`, ...(B \| A)[]]

Prepend an element to the front of an `Iterable`, creating a new `NonEmptyArray`.

#### Type parameters

| Name |
| :------ |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `head` | `B` |

#### Returns

`fn`

▸ \<`A`\>(`self`): [`B` \| `A`, ...(B \| A)[]]

##### Type parameters

| Name |
| :------ |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |

##### Returns

[`B` \| `A`, ...(B \| A)[]]

**`Since`**

2.0.0

▸ **prepend**\<`A`, `B`\>(`self`, `head`): [`A` \| `B`, ...(A \| B)[]]

Prepend an element to the front of an `Iterable`, creating a new `NonEmptyArray`.

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |
| `head` | `B` |

#### Returns

[`A` \| `B`, ...(A \| B)[]]

**`Since`**

2.0.0

___

### prependAll

▸ **prependAll**\<`S`, `T`\>(`that`): (`self`: `S`) => [`OrNonEmpty`](Array.ReadonlyArray.md#ornonempty)\<`S`, `T`, [`Infer`](Array.ReadonlyArray.md#infer)\<`S`\> \| [`Infer`](Array.ReadonlyArray.md#infer)\<`T`\>\>

Prepends the specified prefix array (or iterable) to the beginning of the specified array (or iterable).
If either array is non-empty, the result is also a non-empty array.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends readonly `any`[] \| `Iterable`\<`any`\> |
| `T` | extends readonly `any`[] \| `Iterable`\<`any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `that` | `T` |

#### Returns

`fn`

▸ (`self`): [`OrNonEmpty`](Array.ReadonlyArray.md#ornonempty)\<`S`, `T`, [`Infer`](Array.ReadonlyArray.md#infer)\<`S`\> \| [`Infer`](Array.ReadonlyArray.md#infer)\<`T`\>\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `S` |

##### Returns

[`OrNonEmpty`](Array.ReadonlyArray.md#ornonempty)\<`S`, `T`, [`Infer`](Array.ReadonlyArray.md#infer)\<`S`\> \| [`Infer`](Array.ReadonlyArray.md#infer)\<`T`\>\>

**`Example`**

```ts
import * as ReadonlyArray from "effect/ReadonlyArray"

assert.deepStrictEqual(
  ReadonlyArray.prependAll([1, 2], ["a", "b"]),
  ["a", "b", 1, 2]
)
```

**`Since`**

2.0.0

▸ **prependAll**\<`A`, `B`\>(`self`, `that`): [`A` \| `B`, ...(A \| B)[]]

Prepends the specified prefix array (or iterable) to the beginning of the specified array (or iterable).
If either array is non-empty, the result is also a non-empty array.

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |
| `that` | readonly [`B`, `B`] |

#### Returns

[`A` \| `B`, ...(A \| B)[]]

**`Example`**

```ts
import * as ReadonlyArray from "effect/ReadonlyArray"

assert.deepStrictEqual(
  ReadonlyArray.prependAll([1, 2], ["a", "b"]),
  ["a", "b", 1, 2]
)
```

**`Since`**

2.0.0

▸ **prependAll**\<`A`, `B`\>(`self`, `that`): [`A` \| `B`, ...(A \| B)[]]

Prepends the specified prefix array (or iterable) to the beginning of the specified array (or iterable).
If either array is non-empty, the result is also a non-empty array.

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | readonly [`A`, `A`] |
| `that` | `Iterable`\<`B`\> |

#### Returns

[`A` \| `B`, ...(A \| B)[]]

**`Example`**

```ts
import * as ReadonlyArray from "effect/ReadonlyArray"

assert.deepStrictEqual(
  ReadonlyArray.prependAll([1, 2], ["a", "b"]),
  ["a", "b", 1, 2]
)
```

**`Since`**

2.0.0

▸ **prependAll**\<`A`, `B`\>(`self`, `that`): (`A` \| `B`)[]

Prepends the specified prefix array (or iterable) to the beginning of the specified array (or iterable).
If either array is non-empty, the result is also a non-empty array.

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |
| `that` | `Iterable`\<`B`\> |

#### Returns

(`A` \| `B`)[]

**`Example`**

```ts
import * as ReadonlyArray from "effect/ReadonlyArray"

assert.deepStrictEqual(
  ReadonlyArray.prependAll([1, 2], ["a", "b"]),
  ["a", "b", 1, 2]
)
```

**`Since`**

2.0.0

## constructors

### empty

▸ **empty**\<`A`\>(): `A`[]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | `never` |

#### Returns

`A`[]

**`Since`**

2.0.0

___

### fromIterable

▸ **fromIterable**\<`A`\>(`collection`): `A`[]

Creates a new `Array` from an iterable collection of values.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `collection` | `Iterable`\<`A`\> |

#### Returns

`A`[]

**`Since`**

2.0.0

___

### make

▸ **make**\<`Elements`\>(`...elements`): [`Elements`[`number`], ...Elements[number][]]

Builds a `NonEmptyArray` from an non-empty collection of elements.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Elements` | extends [`any`, ...any[]] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `...elements` | `Elements` |

#### Returns

[`Elements`[`number`], ...Elements[number][]]

**`Since`**

2.0.0

___

### makeBy

▸ **makeBy**\<`A`\>(`n`, `f`): [`A`, ...A[]]

Return a `NonEmptyArray` of length `n` with element `i` initialized with `f(i)`.

**Note**. `n` is normalized to an integer >= 1.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |
| `f` | (`i`: `number`) => `A` |

#### Returns

[`A`, ...A[]]

**`Example`**

```ts
import { makeBy } from 'effect/ReadonlyArray'

assert.deepStrictEqual(makeBy(5, n => n * 2), [0, 2, 4, 6, 8])
```

**`Since`**

2.0.0

___

### of

▸ **of**\<`A`\>(`a`): [`A`, ...A[]]

Constructs a new `NonEmptyArray<A>` from the specified value.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `A` |

#### Returns

[`A`, ...A[]]

**`Since`**

2.0.0

___

### range

▸ **range**(`start`, `end`): [`number`, ...number[]]

Return a `NonEmptyArray` containing a range of integers, including both endpoints.

#### Parameters

| Name | Type |
| :------ | :------ |
| `start` | `number` |
| `end` | `number` |

#### Returns

[`number`, ...number[]]

**`Example`**

```ts
import { range } from 'effect/ReadonlyArray'

assert.deepStrictEqual(range(1, 3), [1, 2, 3])
```

**`Since`**

2.0.0

___

### replicate

▸ **replicate**(`n`): \<A\>(`a`: `A`) => [`A`, ...A[]]

Return a `NonEmptyArray` containing a value repeated the specified number of times.

**Note**. `n` is normalized to an integer >= 1.

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

`fn`

▸ \<`A`\>(`a`): [`A`, ...A[]]

##### Type parameters

| Name |
| :------ |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `A` |

##### Returns

[`A`, ...A[]]

**`Example`**

```ts
import { replicate } from 'effect/ReadonlyArray'

assert.deepStrictEqual(replicate("a", 3), ["a", "a", "a"])
```

**`Since`**

2.0.0

▸ **replicate**\<`A`\>(`a`, `n`): [`A`, ...A[]]

Return a `NonEmptyArray` containing a value repeated the specified number of times.

**Note**. `n` is normalized to an integer >= 1.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `A` |
| `n` | `number` |

#### Returns

[`A`, ...A[]]

**`Example`**

```ts
import { replicate } from 'effect/ReadonlyArray'

assert.deepStrictEqual(replicate("a", 3), ["a", "a", "a"])
```

**`Since`**

2.0.0

___

### unfold

▸ **unfold**\<`B`, `A`\>(`b`, `f`): `A`[]

#### Type parameters

| Name |
| :------ |
| `B` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `b` | `B` |
| `f` | (`b`: `B`) => [`Option`](O.md#option)\<readonly [`A`, `B`]\> |

#### Returns

`A`[]

**`Since`**

2.0.0

## conversions

### fromNullable

▸ **fromNullable**\<`A`\>(`a`): `NonNullable`\<`A`\>[]

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `A` |

#### Returns

`NonNullable`\<`A`\>[]

**`Since`**

2.0.0

___

### fromOption

▸ **fromOption**\<`A`\>(`self`): `A`[]

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Option`](O.md#option)\<`A`\> |

#### Returns

`A`[]

**`Since`**

2.0.0

___

### fromRecord

▸ **fromRecord**\<`K`, `A`\>(`self`): [`K`, `A`][]

Takes a record and returns an array of tuples containing its keys and values.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends `string` |
| `A` | `A` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `self` | `Readonly`\<`Record`\<`K`, `A`\>\> | The record to transform. |

#### Returns

[`K`, `A`][]

**`Example`**

```ts
import { fromRecord } from "effect/ReadonlyArray"

const x = { a: 1, b: 2, c: 3 }
assert.deepStrictEqual(fromRecord(x), [["a", 1], ["b", 2], ["c", 3]])
```

**`Since`**

2.0.0

## elements

### cartesian

▸ **cartesian**\<`B`\>(`that`): \<A\>(`self`: readonly `A`[]) => [`A`, `B`][]

Zips this chunk crosswise with the specified chunk.

#### Type parameters

| Name |
| :------ |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `that` | readonly `B`[] |

#### Returns

`fn`

▸ \<`A`\>(`self`): [`A`, `B`][]

##### Type parameters

| Name |
| :------ |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | readonly `A`[] |

##### Returns

[`A`, `B`][]

**`Since`**

2.0.0

▸ **cartesian**\<`A`, `B`\>(`self`, `that`): [`A`, `B`][]

Zips this chunk crosswise with the specified chunk.

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | readonly `A`[] |
| `that` | readonly `B`[] |

#### Returns

[`A`, `B`][]

**`Since`**

2.0.0

___

### cartesianWith

▸ **cartesianWith**\<`A`, `B`, `C`\>(`that`, `f`): (`self`: readonly `A`[]) => `C`[]

Zips this chunk crosswise with the specified chunk using the specified combiner.

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `that` | readonly `B`[] |
| `f` | (`a`: `A`, `b`: `B`) => `C` |

#### Returns

`fn`

▸ (`self`): `C`[]

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | readonly `A`[] |

##### Returns

`C`[]

**`Since`**

2.0.0

▸ **cartesianWith**\<`A`, `B`, `C`\>(`self`, `that`, `f`): `C`[]

Zips this chunk crosswise with the specified chunk using the specified combiner.

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | readonly `A`[] |
| `that` | readonly `B`[] |
| `f` | (`a`: `A`, `b`: `B`) => `C` |

#### Returns

`C`[]

**`Since`**

2.0.0

___

### contains

▸ **contains**\<`A`\>(`a`): (`self`: `Iterable`\<`A`\>) => `boolean`

Returns a function that checks if a `ReadonlyArray` contains a given value using the default `Equivalence`.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `A` |

#### Returns

`fn`

▸ (`self`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |

##### Returns

`boolean`

**`Since`**

2.0.0

▸ **contains**\<`A`\>(`self`, `a`): `boolean`

Returns a function that checks if a `ReadonlyArray` contains a given value using the default `Equivalence`.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |
| `a` | `A` |

#### Returns

`boolean`

**`Since`**

2.0.0

___

### containsWith

▸ **containsWith**\<`A`\>(`isEquivalent`): (`a`: `A`) => (`self`: `Iterable`\<`A`\>) => `boolean`(`self`: `Iterable`\<`A`\>, `a`: `A`) => `boolean`

Returns a function that checks if a `ReadonlyArray` contains a given value using a provided `isEquivalent` function.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `isEquivalent` | (`self`: `A`, `that`: `A`) => `boolean` |

#### Returns

`fn`

▸ (`a`): (`self`: `Iterable`\<`A`\>) => `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `A` |

##### Returns

`fn`

▸ (`self`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |

##### Returns

`boolean`

▸ (`self`, `a`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |
| `a` | `A` |

##### Returns

`boolean`

**`Since`**

2.0.0

___

### every

▸ **every**\<`A`, `B`\>(`refinement`): (`self`: readonly `A`[]) => self is readonly B[]

Check if a predicate holds true for every `ReadonlyArray` element.

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `refinement` | [`Refinement`](../interfaces/.Refinement.md)\<`A`, `B`\> |

#### Returns

`fn`

▸ (`self`): self is readonly B[]

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | readonly `A`[] |

##### Returns

self is readonly B[]

**`Since`**

2.0.0

▸ **every**\<`A`\>(`predicate`): (`self`: readonly `A`[]) => `boolean`

Check if a predicate holds true for every `ReadonlyArray` element.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | [`Predicate`](../interfaces/.Predicate.md)\<`A`\> |

#### Returns

`fn`

▸ (`self`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | readonly `A`[] |

##### Returns

`boolean`

**`Since`**

2.0.0

▸ **every**\<`A`, `B`\>(`self`, `refinement`): self is readonly B[]

Check if a predicate holds true for every `ReadonlyArray` element.

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | readonly `A`[] |
| `refinement` | [`Refinement`](../interfaces/.Refinement.md)\<`A`, `B`\> |

#### Returns

self is readonly B[]

**`Since`**

2.0.0

▸ **every**\<`A`\>(`self`, `predicate`): `boolean`

Check if a predicate holds true for every `ReadonlyArray` element.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | readonly `A`[] |
| `predicate` | [`Predicate`](../interfaces/.Predicate.md)\<`A`\> |

#### Returns

`boolean`

**`Since`**

2.0.0

___

### findFirst

▸ **findFirst**\<`A`, `B`\>(`refinement`): (`self`: `Iterable`\<`A`\>) => [`Option`](O.md#option)\<`B`\>

Returns the first element that satisfies the specified
predicate, or `None` if no such element exists.

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `refinement` | [`Refinement`](../interfaces/.Refinement.md)\<`A`, `B`\> |

#### Returns

`fn`

▸ (`self`): [`Option`](O.md#option)\<`B`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |

##### Returns

[`Option`](O.md#option)\<`B`\>

**`Since`**

2.0.0

▸ **findFirst**\<`B`, `A`\>(`predicate`): (`self`: `Iterable`\<`B`\>) => [`Option`](O.md#option)\<`B`\>

Returns the first element that satisfies the specified
predicate, or `None` if no such element exists.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `B` | `B` |
| `A` | `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | [`Predicate`](../interfaces/.Predicate.md)\<`A`\> |

#### Returns

`fn`

▸ (`self`): [`Option`](O.md#option)\<`B`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`B`\> |

##### Returns

[`Option`](O.md#option)\<`B`\>

**`Since`**

2.0.0

▸ **findFirst**\<`A`, `B`\>(`self`, `refinement`): [`Option`](O.md#option)\<`B`\>

Returns the first element that satisfies the specified
predicate, or `None` if no such element exists.

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |
| `refinement` | [`Refinement`](../interfaces/.Refinement.md)\<`A`, `B`\> |

#### Returns

[`Option`](O.md#option)\<`B`\>

**`Since`**

2.0.0

▸ **findFirst**\<`A`\>(`self`, `predicate`): [`Option`](O.md#option)\<`A`\>

Returns the first element that satisfies the specified
predicate, or `None` if no such element exists.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |
| `predicate` | [`Predicate`](../interfaces/.Predicate.md)\<`A`\> |

#### Returns

[`Option`](O.md#option)\<`A`\>

**`Since`**

2.0.0

___

### findFirstIndex

▸ **findFirstIndex**\<`A`\>(`predicate`): (`self`: `Iterable`\<`A`\>) => [`Option`](O.md#option)\<`number`\>

Return the first index for which a predicate holds.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | [`Predicate`](../interfaces/.Predicate.md)\<`A`\> |

#### Returns

`fn`

▸ (`self`): [`Option`](O.md#option)\<`number`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |

##### Returns

[`Option`](O.md#option)\<`number`\>

**`Since`**

2.0.0

▸ **findFirstIndex**\<`A`\>(`self`, `predicate`): [`Option`](O.md#option)\<`number`\>

Return the first index for which a predicate holds.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |
| `predicate` | [`Predicate`](../interfaces/.Predicate.md)\<`A`\> |

#### Returns

[`Option`](O.md#option)\<`number`\>

**`Since`**

2.0.0

___

### findLast

▸ **findLast**\<`A`, `B`\>(`refinement`): (`self`: `Iterable`\<`A`\>) => [`Option`](O.md#option)\<`B`\>

Find the last element for which a predicate holds.

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `refinement` | [`Refinement`](../interfaces/.Refinement.md)\<`A`, `B`\> |

#### Returns

`fn`

▸ (`self`): [`Option`](O.md#option)\<`B`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |

##### Returns

[`Option`](O.md#option)\<`B`\>

**`Since`**

2.0.0

▸ **findLast**\<`B`, `A`\>(`predicate`): (`self`: `Iterable`\<`B`\>) => [`Option`](O.md#option)\<`B`\>

Find the last element for which a predicate holds.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `B` | `B` |
| `A` | `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | [`Predicate`](../interfaces/.Predicate.md)\<`A`\> |

#### Returns

`fn`

▸ (`self`): [`Option`](O.md#option)\<`B`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`B`\> |

##### Returns

[`Option`](O.md#option)\<`B`\>

**`Since`**

2.0.0

▸ **findLast**\<`A`, `B`\>(`self`, `refinement`): [`Option`](O.md#option)\<`B`\>

Find the last element for which a predicate holds.

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |
| `refinement` | [`Refinement`](../interfaces/.Refinement.md)\<`A`, `B`\> |

#### Returns

[`Option`](O.md#option)\<`B`\>

**`Since`**

2.0.0

▸ **findLast**\<`A`\>(`self`, `predicate`): [`Option`](O.md#option)\<`A`\>

Find the last element for which a predicate holds.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |
| `predicate` | [`Predicate`](../interfaces/.Predicate.md)\<`A`\> |

#### Returns

[`Option`](O.md#option)\<`A`\>

**`Since`**

2.0.0

___

### findLastIndex

▸ **findLastIndex**\<`A`\>(`predicate`): (`self`: `Iterable`\<`A`\>) => [`Option`](O.md#option)\<`number`\>

Return the last index for which a predicate holds.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | [`Predicate`](../interfaces/.Predicate.md)\<`A`\> |

#### Returns

`fn`

▸ (`self`): [`Option`](O.md#option)\<`number`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |

##### Returns

[`Option`](O.md#option)\<`number`\>

**`Since`**

2.0.0

▸ **findLastIndex**\<`A`\>(`self`, `predicate`): [`Option`](O.md#option)\<`number`\>

Return the last index for which a predicate holds.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |
| `predicate` | [`Predicate`](../interfaces/.Predicate.md)\<`A`\> |

#### Returns

[`Option`](O.md#option)\<`number`\>

**`Since`**

2.0.0

___

### reverse

▸ **reverse**\<`S`\>(`self`): `S` extends readonly [`A`, `A`] ? [`A`, ...A[]] : `S` extends `Iterable`\<`A_1`\> ? `A_1`[] : `never`

Reverse an `Iterable`, creating a new `Array`.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends readonly [`any`, `any`] \| `Iterable`\<`any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `S` |

#### Returns

`S` extends readonly [`A`, `A`] ? [`A`, ...A[]] : `S` extends `Iterable`\<`A_1`\> ? `A_1`[] : `never`

**`Since`**

2.0.0

___

### some

▸ **some**\<`B`, `A`\>(`predicate`): (`self`: readonly `B`[]) => self is readonly [B, B]

Check if a predicate holds true for some `ReadonlyArray` element.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `B` | `B` |
| `A` | `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | [`Predicate`](../interfaces/.Predicate.md)\<`A`\> |

#### Returns

`fn`

▸ (`self`): self is readonly [B, B]

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | readonly `B`[] |

##### Returns

self is readonly [B, B]

**`Since`**

2.0.0

▸ **some**\<`A`\>(`self`, `predicate`): self is readonly [A, A]

Check if a predicate holds true for some `ReadonlyArray` element.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | readonly `A`[] |
| `predicate` | [`Predicate`](../interfaces/.Predicate.md)\<`A`\> |

#### Returns

self is readonly [A, A]

**`Since`**

2.0.0

___

### sortWith

▸ **sortWith**\<`A`, `B`\>(`f`, `order`): (`self`: readonly `A`[]) => `A`[]

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (`a`: `A`) => `B` |
| `order` | [`Order`](../interfaces/Ord.Order.md)\<`B`\> |

#### Returns

`fn`

▸ (`self`): `A`[]

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | readonly `A`[] |

##### Returns

`A`[]

**`Since`**

2.0.0

▸ **sortWith**\<`A`, `B`\>(`self`, `f`, `order`): `A`[]

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | readonly `A`[] |
| `f` | (`a`: `A`) => `B` |
| `order` | [`Order`](../interfaces/Ord.Order.md)\<`B`\> |

#### Returns

`A`[]

**`Since`**

2.0.0

## filtering

### filter

▸ **filter**\<`A`, `B`\>(`refinement`): (`self`: `Iterable`\<`A`\>) => `B`[]

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `refinement` | (`a`: `A`, `i`: `number`) => a is B |

#### Returns

`fn`

▸ (`self`): `B`[]

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |

##### Returns

`B`[]

**`Since`**

2.0.0

▸ **filter**\<`A`, `B`\>(`predicate`): (`self`: `Iterable`\<`A`\>) => `A`[]

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | (`b`: `B`, `i`: `number`) => `boolean` |

#### Returns

`fn`

▸ (`self`): `A`[]

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |

##### Returns

`A`[]

**`Since`**

2.0.0

▸ **filter**\<`A`, `B`\>(`self`, `refinement`): `B`[]

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |
| `refinement` | (`a`: `A`, `i`: `number`) => a is B |

#### Returns

`B`[]

**`Since`**

2.0.0

▸ **filter**\<`A`\>(`self`, `predicate`): `A`[]

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |
| `predicate` | (`a`: `A`, `i`: `number`) => `boolean` |

#### Returns

`A`[]

**`Since`**

2.0.0

___

### filterMap

▸ **filterMap**\<`A`, `B`\>(`f`): (`self`: `Iterable`\<`A`\>) => `B`[]

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (`a`: `A`, `i`: `number`) => [`Option`](O.md#option)\<`B`\> |

#### Returns

`fn`

▸ (`self`): `B`[]

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |

##### Returns

`B`[]

**`Since`**

2.0.0

▸ **filterMap**\<`A`, `B`\>(`self`, `f`): `B`[]

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |
| `f` | (`a`: `A`, `i`: `number`) => [`Option`](O.md#option)\<`B`\> |

#### Returns

`B`[]

**`Since`**

2.0.0

___

### filterMapWhile

▸ **filterMapWhile**\<`A`, `B`\>(`f`): (`self`: `Iterable`\<`A`\>) => `B`[]

Transforms all elements of the `readonlyArray` for as long as the specified function returns some value

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (`a`: `A`) => [`Option`](O.md#option)\<`B`\> |

#### Returns

`fn`

▸ (`self`): `B`[]

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |

##### Returns

`B`[]

**`Since`**

2.0.0

▸ **filterMapWhile**\<`A`, `B`\>(`self`, `f`): `B`[]

Transforms all elements of the `readonlyArray` for as long as the specified function returns some value

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |
| `f` | (`a`: `A`) => [`Option`](O.md#option)\<`B`\> |

#### Returns

`B`[]

**`Since`**

2.0.0

___

### getLefts

▸ **getLefts**\<`E`, `A`\>(`self`): `E`[]

Retrieves the `Left` values from an `Iterable` of `Either`s, collecting them into an array.

#### Type parameters

| Name |
| :------ |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<[`Either`](E.md#either)\<`E`, `A`\>\> |

#### Returns

`E`[]

**`Example`**

```ts
import { getLefts } from "effect/ReadonlyArray"
import { right, left } from "effect/Either"

assert.deepStrictEqual(
  getLefts([right(1), left("err"), right(2)]),
  ["err"]
)
```

**`Since`**

2.0.0

___

### getRights

▸ **getRights**\<`E`, `A`\>(`self`): `A`[]

Retrieves the `Right` values from an `Iterable` of `Either`s, collecting them into an array.

#### Type parameters

| Name |
| :------ |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<[`Either`](E.md#either)\<`E`, `A`\>\> |

#### Returns

`A`[]

**`Example`**

```ts
import { getRights } from "effect/ReadonlyArray"
import { right, left } from "effect/Either"

assert.deepStrictEqual(
  getRights([right(1), left("err"), right(2)]),
  [1, 2]
)
```

**`Since`**

2.0.0

___

### getSomes

▸ **getSomes**\<`A`\>(`self`): `A`[]

Retrieves the `Some` values from an `Iterable` of `Option`s, collecting them into an array.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<[`Option`](O.md#option)\<`A`\>\> |

#### Returns

`A`[]

**`Example`**

```ts
import { getSomes } from "effect/ReadonlyArray"
import { some, none } from "effect/Option"

assert.deepStrictEqual(
  getSomes([some(1), none(), some(2)]),
  [1, 2]
)
```

**`Since`**

2.0.0

___

### partition

▸ **partition**\<`C`, `B`, `A`\>(`refinement`): (`self`: `Iterable`\<`C`\>) => [excluded: Exclude\<C, B\>[], satisfying: B[]]

Separate elements based on a predicate that also exposes the index of the element.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | `C` |
| `B` | `B` |
| `A` | `C` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `refinement` | (`a`: `A`, `i`: `number`) => a is B |

#### Returns

`fn`

▸ (`self`): [excluded: Exclude\<C, B\>[], satisfying: B[]]

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`C`\> |

##### Returns

[excluded: Exclude\<C, B\>[], satisfying: B[]]

**`Since`**

2.0.0

▸ **partition**\<`B`, `A`\>(`predicate`): (`self`: `Iterable`\<`B`\>) => [excluded: B[], satisfying: B[]]

Separate elements based on a predicate that also exposes the index of the element.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `B` | `B` |
| `A` | `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | (`a`: `A`, `i`: `number`) => `boolean` |

#### Returns

`fn`

▸ (`self`): [excluded: B[], satisfying: B[]]

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`B`\> |

##### Returns

[excluded: B[], satisfying: B[]]

**`Since`**

2.0.0

▸ **partition**\<`A`, `B`\>(`self`, `refinement`): [excluded: Exclude\<A, B\>[], satisfying: B[]]

Separate elements based on a predicate that also exposes the index of the element.

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |
| `refinement` | (`a`: `A`, `i`: `number`) => a is B |

#### Returns

[excluded: Exclude\<A, B\>[], satisfying: B[]]

**`Since`**

2.0.0

▸ **partition**\<`A`\>(`self`, `predicate`): [excluded: A[], satisfying: A[]]

Separate elements based on a predicate that also exposes the index of the element.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |
| `predicate` | (`a`: `A`, `i`: `number`) => `boolean` |

#### Returns

[excluded: A[], satisfying: A[]]

**`Since`**

2.0.0

___

### partitionMap

▸ **partitionMap**\<`A`, `B`, `C`\>(`f`): (`self`: `Iterable`\<`A`\>) => [left: B[], right: C[]]

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (`a`: `A`, `i`: `number`) => [`Either`](E.md#either)\<`B`, `C`\> |

#### Returns

`fn`

▸ (`self`): [left: B[], right: C[]]

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |

##### Returns

[left: B[], right: C[]]

**`Since`**

2.0.0

▸ **partitionMap**\<`A`, `B`, `C`\>(`self`, `f`): [left: B[], right: C[]]

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |
| `f` | (`a`: `A`, `i`: `number`) => [`Either`](E.md#either)\<`B`, `C`\> |

#### Returns

[left: B[], right: C[]]

**`Since`**

2.0.0

___

### separate

▸ **separate**\<`E`, `A`\>(`self`): [`E`[], `A`[]]

#### Type parameters

| Name |
| :------ |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<[`Either`](E.md#either)\<`E`, `A`\>\> |

#### Returns

[`E`[], `A`[]]

**`Since`**

2.0.0

## folding

### join

▸ **join**(`sep`): (`self`: `Iterable`\<`string`\>) => `string`

Joins the elements together with "sep" in the middle.

#### Parameters

| Name | Type |
| :------ | :------ |
| `sep` | `string` |

#### Returns

`fn`

▸ (`self`): `string`

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`string`\> |

##### Returns

`string`

**`Since`**

2.0.0

▸ **join**(`self`, `sep`): `string`

Joins the elements together with "sep" in the middle.

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`string`\> |
| `sep` | `string` |

#### Returns

`string`

**`Since`**

2.0.0

___

### mapAccum

▸ **mapAccum**\<`S`, `A`, `B`\>(`s`, `f`): (`self`: `Iterable`\<`A`\>) => [state: S, mappedArray: B[]]

Statefully maps over the chunk, producing new elements of type `B`.

#### Type parameters

| Name |
| :------ |
| `S` |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `s` | `S` |
| `f` | (`s`: `S`, `a`: `A`) => readonly [`S`, `B`] |

#### Returns

`fn`

▸ (`self`): [state: S, mappedArray: B[]]

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |

##### Returns

[state: S, mappedArray: B[]]

**`Since`**

2.0.0

▸ **mapAccum**\<`S`, `A`, `B`\>(`self`, `s`, `f`): [state: S, mappedArray: B[]]

Statefully maps over the chunk, producing new elements of type `B`.

#### Type parameters

| Name |
| :------ |
| `S` |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |
| `s` | `S` |
| `f` | (`s`: `S`, `a`: `A`) => readonly [`S`, `B`] |

#### Returns

[state: S, mappedArray: B[]]

**`Since`**

2.0.0

___

### reduce

▸ **reduce**\<`B`, `A`\>(`b`, `f`): (`self`: `Iterable`\<`A`\>) => `B`

#### Type parameters

| Name |
| :------ |
| `B` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `b` | `B` |
| `f` | (`b`: `B`, `a`: `A`, `i`: `number`) => `B` |

#### Returns

`fn`

▸ (`self`): `B`

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |

##### Returns

`B`

**`Since`**

2.0.0

▸ **reduce**\<`A`, `B`\>(`self`, `b`, `f`): `B`

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |
| `b` | `B` |
| `f` | (`b`: `B`, `a`: `A`, `i`: `number`) => `B` |

#### Returns

`B`

**`Since`**

2.0.0

___

### reduceRight

▸ **reduceRight**\<`B`, `A`\>(`b`, `f`): (`self`: `Iterable`\<`A`\>) => `B`

#### Type parameters

| Name |
| :------ |
| `B` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `b` | `B` |
| `f` | (`b`: `B`, `a`: `A`, `i`: `number`) => `B` |

#### Returns

`fn`

▸ (`self`): `B`

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |

##### Returns

`B`

**`Since`**

2.0.0

▸ **reduceRight**\<`A`, `B`\>(`self`, `b`, `f`): `B`

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |
| `b` | `B` |
| `f` | (`b`: `B`, `a`: `A`, `i`: `number`) => `B` |

#### Returns

`B`

**`Since`**

2.0.0

___

### scan

▸ **scan**\<`B`, `A`\>(`b`, `f`): (`self`: `Iterable`\<`A`\>) => [`B`, ...B[]]

Reduce an `Iterable` from the left, keeping all intermediate results instead of only the final result.

#### Type parameters

| Name |
| :------ |
| `B` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `b` | `B` |
| `f` | (`b`: `B`, `a`: `A`) => `B` |

#### Returns

`fn`

▸ (`self`): [`B`, ...B[]]

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |

##### Returns

[`B`, ...B[]]

**`Since`**

2.0.0

▸ **scan**\<`A`, `B`\>(`self`, `b`, `f`): [`B`, ...B[]]

Reduce an `Iterable` from the left, keeping all intermediate results instead of only the final result.

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |
| `b` | `B` |
| `f` | (`b`: `B`, `a`: `A`) => `B` |

#### Returns

[`B`, ...B[]]

**`Since`**

2.0.0

___

### scanRight

▸ **scanRight**\<`B`, `A`\>(`b`, `f`): (`self`: `Iterable`\<`A`\>) => [`B`, ...B[]]

Reduce an `Iterable` from the right, keeping all intermediate results instead of only the final result.

#### Type parameters

| Name |
| :------ |
| `B` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `b` | `B` |
| `f` | (`b`: `B`, `a`: `A`) => `B` |

#### Returns

`fn`

▸ (`self`): [`B`, ...B[]]

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |

##### Returns

[`B`, ...B[]]

**`Since`**

2.0.0

▸ **scanRight**\<`A`, `B`\>(`self`, `b`, `f`): [`B`, ...B[]]

Reduce an `Iterable` from the right, keeping all intermediate results instead of only the final result.

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |
| `b` | `B` |
| `f` | (`b`: `B`, `a`: `A`) => `B` |

#### Returns

[`B`, ...B[]]

**`Since`**

2.0.0

## getters

### drop

▸ **drop**(`n`): \<A\>(`self`: `Iterable`\<`A`\>) => `A`[]

Drop a max number of elements from the start of an `Iterable`, creating a new `Array`.

**Note**. `n` is normalized to a non negative integer.

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

`fn`

▸ \<`A`\>(`self`): `A`[]

##### Type parameters

| Name |
| :------ |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |

##### Returns

`A`[]

**`Since`**

2.0.0

▸ **drop**\<`A`\>(`self`, `n`): `A`[]

Drop a max number of elements from the start of an `Iterable`, creating a new `Array`.

**Note**. `n` is normalized to a non negative integer.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |
| `n` | `number` |

#### Returns

`A`[]

**`Since`**

2.0.0

___

### dropRight

▸ **dropRight**(`n`): \<A\>(`self`: `Iterable`\<`A`\>) => `A`[]

Drop a max number of elements from the end of an `Iterable`, creating a new `Array`.

**Note**. `n` is normalized to a non negative integer.

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

`fn`

▸ \<`A`\>(`self`): `A`[]

##### Type parameters

| Name |
| :------ |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |

##### Returns

`A`[]

**`Since`**

2.0.0

▸ **dropRight**\<`A`\>(`self`, `n`): `A`[]

Drop a max number of elements from the end of an `Iterable`, creating a new `Array`.

**Note**. `n` is normalized to a non negative integer.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |
| `n` | `number` |

#### Returns

`A`[]

**`Since`**

2.0.0

___

### dropWhile

▸ **dropWhile**\<`B`, `A`\>(`predicate`): (`self`: `Iterable`\<`B`\>) => `B`[]

Remove the longest initial subarray for which all element satisfy the specified predicate, creating a new `Array`.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `B` | `B` |
| `A` | `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | [`Predicate`](../interfaces/.Predicate.md)\<`A`\> |

#### Returns

`fn`

▸ (`self`): `B`[]

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`B`\> |

##### Returns

`B`[]

**`Since`**

2.0.0

▸ **dropWhile**\<`A`\>(`self`, `predicate`): `A`[]

Remove the longest initial subarray for which all element satisfy the specified predicate, creating a new `Array`.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |
| `predicate` | [`Predicate`](../interfaces/.Predicate.md)\<`A`\> |

#### Returns

`A`[]

**`Since`**

2.0.0

___

### get

▸ **get**(`index`): \<A\>(`self`: readonly `A`[]) => [`Option`](O.md#option)\<`A`\>

This function provides a safe way to read a value at a particular index from a `ReadonlyArray`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |

#### Returns

`fn`

▸ \<`A`\>(`self`): [`Option`](O.md#option)\<`A`\>

##### Type parameters

| Name |
| :------ |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | readonly `A`[] |

##### Returns

[`Option`](O.md#option)\<`A`\>

**`Since`**

2.0.0

▸ **get**\<`A`\>(`self`, `index`): [`Option`](O.md#option)\<`A`\>

This function provides a safe way to read a value at a particular index from a `ReadonlyArray`.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | readonly `A`[] |
| `index` | `number` |

#### Returns

[`Option`](O.md#option)\<`A`\>

**`Since`**

2.0.0

___

### head

▸ **head**\<`A`\>(`self`): [`Option`](O.md#option)\<`A`\>

Get the first element of a `ReadonlyArray`, or `None` if the `ReadonlyArray` is empty.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | readonly `A`[] |

#### Returns

[`Option`](O.md#option)\<`A`\>

**`Since`**

2.0.0

___

### headNonEmpty

▸ **headNonEmpty**\<`A`\>(`self`): `A`

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | readonly [`A`, `A`] |

#### Returns

`A`

**`Since`**

2.0.0

___

### init

▸ **init**\<`A`\>(`self`): [`Option`](O.md#option)\<`A`[]\>

Get all but the last element of an `Iterable`, creating a new `Array`, or `None` if the `Iterable` is empty.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |

#### Returns

[`Option`](O.md#option)\<`A`[]\>

**`Since`**

2.0.0

___

### initNonEmpty

▸ **initNonEmpty**\<`A`\>(`self`): `A`[]

Get all but the last element of a non empty array, creating a new array.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | readonly [`A`, `A`] |

#### Returns

`A`[]

**`Since`**

2.0.0

___

### last

▸ **last**\<`A`\>(`self`): [`Option`](O.md#option)\<`A`\>

Get the last element in a `ReadonlyArray`, or `None` if the `ReadonlyArray` is empty.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | readonly `A`[] |

#### Returns

[`Option`](O.md#option)\<`A`\>

**`Since`**

2.0.0

___

### lastNonEmpty

▸ **lastNonEmpty**\<`A`\>(`self`): `A`

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | readonly [`A`, `A`] |

#### Returns

`A`

**`Since`**

2.0.0

___

### length

▸ **length**\<`A`\>(`self`): `number`

Return the number of elements in a `ReadonlyArray`.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | readonly `A`[] |

#### Returns

`number`

**`Since`**

2.0.0

___

### tail

▸ **tail**\<`A`\>(`self`): [`Option`](O.md#option)\<`A`[]\>

Get all but the first element of an `Iterable`, creating a new `Array`, or `None` if the `Iterable` is empty.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |

#### Returns

[`Option`](O.md#option)\<`A`[]\>

**`Since`**

2.0.0

___

### tailNonEmpty

▸ **tailNonEmpty**\<`A`\>(`self`): `A`[]

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | readonly [`A`, `A`] |

#### Returns

`A`[]

**`Since`**

2.0.0

___

### take

▸ **take**(`n`): \<A\>(`self`: `Iterable`\<`A`\>) => `A`[]

Keep only a max number of elements from the start of an `Iterable`, creating a new `Array`.

**Note**. `n` is normalized to a non negative integer.

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

`fn`

▸ \<`A`\>(`self`): `A`[]

##### Type parameters

| Name |
| :------ |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |

##### Returns

`A`[]

**`Since`**

2.0.0

▸ **take**\<`A`\>(`self`, `n`): `A`[]

Keep only a max number of elements from the start of an `Iterable`, creating a new `Array`.

**Note**. `n` is normalized to a non negative integer.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |
| `n` | `number` |

#### Returns

`A`[]

**`Since`**

2.0.0

___

### takeRight

▸ **takeRight**(`n`): \<A\>(`self`: `Iterable`\<`A`\>) => `A`[]

Keep only a max number of elements from the end of an `Iterable`, creating a new `Array`.

**Note**. `n` is normalized to a non negative integer.

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

`fn`

▸ \<`A`\>(`self`): `A`[]

##### Type parameters

| Name |
| :------ |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |

##### Returns

`A`[]

**`Since`**

2.0.0

▸ **takeRight**\<`A`\>(`self`, `n`): `A`[]

Keep only a max number of elements from the end of an `Iterable`, creating a new `Array`.

**Note**. `n` is normalized to a non negative integer.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |
| `n` | `number` |

#### Returns

`A`[]

**`Since`**

2.0.0

___

### takeWhile

▸ **takeWhile**\<`A`, `B`\>(`refinement`): (`self`: `Iterable`\<`A`\>) => `B`[]

Calculate the longest initial subarray for which all element satisfy the specified predicate, creating a new `Array`.

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `refinement` | [`Refinement`](../interfaces/.Refinement.md)\<`A`, `B`\> |

#### Returns

`fn`

▸ (`self`): `B`[]

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |

##### Returns

`B`[]

**`Since`**

2.0.0

▸ **takeWhile**\<`B`, `A`\>(`predicate`): (`self`: `Iterable`\<`B`\>) => `B`[]

Calculate the longest initial subarray for which all element satisfy the specified predicate, creating a new `Array`.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `B` | `B` |
| `A` | `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | [`Predicate`](../interfaces/.Predicate.md)\<`A`\> |

#### Returns

`fn`

▸ (`self`): `B`[]

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`B`\> |

##### Returns

`B`[]

**`Since`**

2.0.0

▸ **takeWhile**\<`A`, `B`\>(`self`, `refinement`): `B`[]

Calculate the longest initial subarray for which all element satisfy the specified predicate, creating a new `Array`.

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |
| `refinement` | [`Refinement`](../interfaces/.Refinement.md)\<`A`, `B`\> |

#### Returns

`B`[]

**`Since`**

2.0.0

▸ **takeWhile**\<`A`\>(`self`, `predicate`): `A`[]

Calculate the longest initial subarray for which all element satisfy the specified predicate, creating a new `Array`.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |
| `predicate` | [`Predicate`](../interfaces/.Predicate.md)\<`A`\> |

#### Returns

`A`[]

**`Since`**

2.0.0

## grouping

### group

▸ **group**\<`A`\>(`self`): [[`A`, ...A[]], ...[A, ...A[]][]]

Group equal, consecutive elements of a `NonEmptyReadonlyArray` into `NonEmptyArray`s.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | readonly [`A`, `A`] |

#### Returns

[[`A`, ...A[]], ...[A, ...A[]][]]

**`Since`**

2.0.0

___

### groupBy

▸ **groupBy**\<`A`\>(`f`): (`self`: `Iterable`\<`A`\>) => `Record`\<`string`, [`A`, ...A[]]\>

Splits an `Iterable` into sub-non-empty-arrays stored in an object, based on the result of calling a `string`-returning
function on each element, and grouping the results according to values returned

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (`a`: `A`) => `string` |

#### Returns

`fn`

▸ (`self`): `Record`\<`string`, [`A`, ...A[]]\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |

##### Returns

`Record`\<`string`, [`A`, ...A[]]\>

**`Since`**

2.0.0

▸ **groupBy**\<`A`\>(`self`, `f`): `Record`\<`string`, [`A`, ...A[]]\>

Splits an `Iterable` into sub-non-empty-arrays stored in an object, based on the result of calling a `string`-returning
function on each element, and grouping the results according to values returned

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |
| `f` | (`a`: `A`) => `string` |

#### Returns

`Record`\<`string`, [`A`, ...A[]]\>

**`Since`**

2.0.0

___

### groupWith

▸ **groupWith**\<`A`\>(`isEquivalent`): (`self`: readonly [`A`, `A`]) => [[`A`, ...A[]], ...[A, ...A[]][]]

Group equal, consecutive elements of a `NonEmptyReadonlyArray` into `NonEmptyArray`s using the provided `isEquivalent` function.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `isEquivalent` | (`self`: `A`, `that`: `A`) => `boolean` |

#### Returns

`fn`

▸ (`self`): [[`A`, ...A[]], ...[A, ...A[]][]]

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | readonly [`A`, `A`] |

##### Returns

[[`A`, ...A[]], ...[A, ...A[]][]]

**`Since`**

2.0.0

▸ **groupWith**\<`A`\>(`self`, `isEquivalent`): [[`A`, ...A[]], ...[A, ...A[]][]]

Group equal, consecutive elements of a `NonEmptyReadonlyArray` into `NonEmptyArray`s using the provided `isEquivalent` function.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | readonly [`A`, `A`] |
| `isEquivalent` | (`self`: `A`, `that`: `A`) => `boolean` |

#### Returns

[[`A`, ...A[]], ...[A, ...A[]][]]

**`Since`**

2.0.0

## guards

### isEmptyArray

▸ **isEmptyArray**\<`A`\>(`self`): self is []

Determine if an `Array` is empty narrowing down the type to `[]`.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `self` | `A`[] | The `Array` to check. |

#### Returns

self is []

**`Example`**

```ts
import { isEmptyArray } from "effect/ReadonlyArray"

assert.deepStrictEqual(isEmptyArray([]), true);
assert.deepStrictEqual(isEmptyArray([1, 2, 3]), false);
```

**`Since`**

2.0.0

___

### isEmptyReadonlyArray

▸ **isEmptyReadonlyArray**\<`A`\>(`self`): self is readonly []

Determine if a `ReadonlyArray` is empty narrowing down the type to `readonly []`.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `self` | readonly `A`[] | The `ReadonlyArray` to check. |

#### Returns

self is readonly []

**`Example`**

```ts
import { isEmptyReadonlyArray } from "effect/ReadonlyArray"

assert.deepStrictEqual(isEmptyReadonlyArray([]), true);
assert.deepStrictEqual(isEmptyReadonlyArray([1, 2, 3]), false);
```

**`Since`**

2.0.0

___

### isNonEmptyArray

▸ **isNonEmptyArray**\<`A`\>(`self`): self is [A, ...A[]]

Determine if an `Array` is non empty narrowing down the type to `NonEmptyArray`.

An `Array` is considered to be a `NonEmptyArray` if it contains at least one element.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `self` | `A`[] | The `Array` to check. |

#### Returns

self is [A, ...A[]]

**`Example`**

```ts
import { isNonEmptyArray } from "effect/ReadonlyArray"

assert.deepStrictEqual(isNonEmptyArray([]), false);
assert.deepStrictEqual(isNonEmptyArray([1, 2, 3]), true);
```

**`Since`**

2.0.0

___

### isNonEmptyReadonlyArray

▸ **isNonEmptyReadonlyArray**\<`A`\>(`self`): self is readonly [A, A]

Determine if a `ReadonlyArray` is non empty narrowing down the type to `NonEmptyReadonlyArray`.

A `ReadonlyArray` is considered to be a `NonEmptyReadonlyArray` if it contains at least one element.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `self` | readonly `A`[] | The `ReadonlyArray` to check. |

#### Returns

self is readonly [A, A]

**`Example`**

```ts
import { isNonEmptyReadonlyArray } from "effect/ReadonlyArray"

assert.deepStrictEqual(isNonEmptyReadonlyArray([]), false);
assert.deepStrictEqual(isNonEmptyReadonlyArray([1, 2, 3]), true);
```

**`Since`**

2.0.0

## instances

### getEquivalence

▸ **getEquivalence**\<`A`\>(`isEquivalent`): `Equivalence`\<readonly `A`[]\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `isEquivalent` | `Equivalence`\<`A`\> |

#### Returns

`Equivalence`\<readonly `A`[]\>

**`Since`**

2.0.0

___

### getOrder

▸ **getOrder**\<`A`\>(`O`): [`Order`](../interfaces/Ord.Order.md)\<readonly `A`[]\>

This function creates and returns a new `Order` for an array of values based on a given `Order` for the elements of the array.
The returned `Order` compares two arrays by applying the given `Order` to each element in the arrays.
If all elements are equal, the arrays are then compared based on their length.
It is useful when you need to compare two arrays of the same type and you have a specific way of comparing each element of the array.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `O` | [`Order`](../interfaces/Ord.Order.md)\<`A`\> |

#### Returns

[`Order`](../interfaces/Ord.Order.md)\<readonly `A`[]\>

**`Since`**

2.0.0

## lifting

### liftEither

▸ **liftEither**\<`A`, `E`, `B`\>(`f`): (...`a`: `A`) => `B`[]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | extends `unknown`[] |
| `E` | `E` |
| `B` | `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (...`a`: `A`) => [`Either`](E.md#either)\<`E`, `B`\> |

#### Returns

`fn`

▸ (`...a`): `B`[]

##### Parameters

| Name | Type |
| :------ | :------ |
| `...a` | `A` |

##### Returns

`B`[]

**`Since`**

2.0.0

___

### liftNullable

▸ **liftNullable**\<`A`, `B`\>(`f`): (...`a`: `A`) => `NonNullable`\<`B`\>[]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | extends `unknown`[] |
| `B` | `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (...`a`: `A`) => `undefined` \| ``null`` \| `B` |

#### Returns

`fn`

▸ (`...a`): `NonNullable`\<`B`\>[]

##### Parameters

| Name | Type |
| :------ | :------ |
| `...a` | `A` |

##### Returns

`NonNullable`\<`B`\>[]

**`Since`**

2.0.0

___

### liftOption

▸ **liftOption**\<`A`, `B`\>(`f`): (...`a`: `A`) => `B`[]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | extends `unknown`[] |
| `B` | `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (...`a`: `A`) => [`Option`](O.md#option)\<`B`\> |

#### Returns

`fn`

▸ (`...a`): `B`[]

##### Parameters

| Name | Type |
| :------ | :------ |
| `...a` | `A` |

##### Returns

`B`[]

**`Since`**

2.0.0

___

### liftPredicate

▸ **liftPredicate**\<`A`, `B`\>(`refinement`): (`a`: `A`) => `B`[]

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `refinement` | [`Refinement`](../interfaces/.Refinement.md)\<`A`, `B`\> |

#### Returns

`fn`

▸ (`a`): `B`[]

##### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `A` |

##### Returns

`B`[]

**`Since`**

2.0.0

▸ **liftPredicate**\<`A`\>(`predicate`): \<B\>(`b`: `B`) => `B`[]

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | [`Predicate`](../interfaces/.Predicate.md)\<`A`\> |

#### Returns

`fn`

▸ \<`B`\>(`b`): `B`[]

##### Type parameters

| Name |
| :------ |
| `B` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `b` | `B` |

##### Returns

`B`[]

**`Since`**

2.0.0

## mapping

### map

▸ **map**\<`S`, `B`\>(`f`): (`self`: `S`) => [`With`](Array.ReadonlyArray.md#with)\<`S`, `B`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends readonly `any`[] |
| `B` | `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (`a`: [`Infer`](Array.ReadonlyArray.md#infer)\<`S`\>, `i`: `number`) => `B` |

#### Returns

`fn`

▸ (`self`): [`With`](Array.ReadonlyArray.md#with)\<`S`, `B`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `S` |

##### Returns

[`With`](Array.ReadonlyArray.md#with)\<`S`, `B`\>

**`Since`**

2.0.0

▸ **map**\<`S`, `B`\>(`self`, `f`): [`With`](Array.ReadonlyArray.md#with)\<`S`, `B`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends readonly `any`[] |
| `B` | `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `S` |
| `f` | (`a`: [`Infer`](Array.ReadonlyArray.md#infer)\<`S`\>, `i`: `number`) => `B` |

#### Returns

[`With`](Array.ReadonlyArray.md#with)\<`S`, `B`\>

**`Since`**

2.0.0

## models

### NonEmptyArray

Ƭ **NonEmptyArray**\<`A`\>: [`A`, ...A[]]

**`Since`**

2.0.0

#### Type parameters

| Name |
| :------ |
| `A` |

___

### NonEmptyReadonlyArray

Ƭ **NonEmptyReadonlyArray**\<`A`\>: readonly [`A`, ...A[]]

**`Since`**

2.0.0

#### Type parameters

| Name |
| :------ |
| `A` |

## pattern matching

### match

▸ **match**\<`B`, `A`, `C`\>(`options`): (`self`: readonly `A`[]) => `B` \| `C`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `B` | `B` |
| `A` | `A` |
| `C` | `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.onEmpty` | [`LazyArg`](../interfaces/F.LazyArg.md)\<`B`\> |
| `options.onNonEmpty` | (`self`: readonly [`A`, `A`]) => `C` |

#### Returns

`fn`

▸ (`self`): `B` \| `C`

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | readonly `A`[] |

##### Returns

`B` \| `C`

**`Since`**

2.0.0

▸ **match**\<`A`, `B`, `C`\>(`self`, `options`): `B` \| `C`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | `A` |
| `B` | `B` |
| `C` | `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | readonly `A`[] |
| `options` | `Object` |
| `options.onEmpty` | [`LazyArg`](../interfaces/F.LazyArg.md)\<`B`\> |
| `options.onNonEmpty` | (`self`: readonly [`A`, `A`]) => `C` |

#### Returns

`B` \| `C`

**`Since`**

2.0.0

___

### matchLeft

▸ **matchLeft**\<`B`, `A`, `C`\>(`options`): (`self`: readonly `A`[]) => `B` \| `C`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `B` | `B` |
| `A` | `A` |
| `C` | `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.onEmpty` | [`LazyArg`](../interfaces/F.LazyArg.md)\<`B`\> |
| `options.onNonEmpty` | (`head`: `A`, `tail`: `A`[]) => `C` |

#### Returns

`fn`

▸ (`self`): `B` \| `C`

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | readonly `A`[] |

##### Returns

`B` \| `C`

**`Since`**

2.0.0

▸ **matchLeft**\<`A`, `B`, `C`\>(`self`, `options`): `B` \| `C`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | `A` |
| `B` | `B` |
| `C` | `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | readonly `A`[] |
| `options` | `Object` |
| `options.onEmpty` | [`LazyArg`](../interfaces/F.LazyArg.md)\<`B`\> |
| `options.onNonEmpty` | (`head`: `A`, `tail`: `A`[]) => `C` |

#### Returns

`B` \| `C`

**`Since`**

2.0.0

___

### matchRight

▸ **matchRight**\<`B`, `A`, `C`\>(`options`): (`self`: readonly `A`[]) => `B` \| `C`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `B` | `B` |
| `A` | `A` |
| `C` | `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.onEmpty` | [`LazyArg`](../interfaces/F.LazyArg.md)\<`B`\> |
| `options.onNonEmpty` | (`init`: `A`[], `last`: `A`) => `C` |

#### Returns

`fn`

▸ (`self`): `B` \| `C`

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | readonly `A`[] |

##### Returns

`B` \| `C`

**`Since`**

2.0.0

▸ **matchRight**\<`A`, `B`, `C`\>(`self`, `options`): `B` \| `C`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | `A` |
| `B` | `B` |
| `C` | `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | readonly `A`[] |
| `options` | `Object` |
| `options.onEmpty` | [`LazyArg`](../interfaces/F.LazyArg.md)\<`B`\> |
| `options.onNonEmpty` | (`init`: `A`[], `last`: `A`) => `C` |

#### Returns

`B` \| `C`

**`Since`**

2.0.0

## sequencing

### flatMap

▸ **flatMap**\<`S`, `T`\>(`f`): (`self`: `S`) => [`AndNonEmpty`](Array.ReadonlyArray.md#andnonempty)\<`S`, `T`, [`Infer`](Array.ReadonlyArray.md#infer)\<`T`\>\>

Applies a function to each element in an array and returns a new array containing the concatenated mapped elements.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends readonly `any`[] |
| `T` | extends readonly `any`[] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (`a`: [`Infer`](Array.ReadonlyArray.md#infer)\<`S`\>, `i`: `number`) => `T` |

#### Returns

`fn`

▸ (`self`): [`AndNonEmpty`](Array.ReadonlyArray.md#andnonempty)\<`S`, `T`, [`Infer`](Array.ReadonlyArray.md#infer)\<`T`\>\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `S` |

##### Returns

[`AndNonEmpty`](Array.ReadonlyArray.md#andnonempty)\<`S`, `T`, [`Infer`](Array.ReadonlyArray.md#infer)\<`T`\>\>

**`Since`**

2.0.0

▸ **flatMap**\<`A`, `B`\>(`self`, `f`): [`B`, ...B[]]

Applies a function to each element in an array and returns a new array containing the concatenated mapped elements.

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | readonly [`A`, `A`] |
| `f` | (`a`: `A`, `i`: `number`) => readonly [`B`, `B`] |

#### Returns

[`B`, ...B[]]

**`Since`**

2.0.0

▸ **flatMap**\<`A`, `B`\>(`self`, `f`): `B`[]

Applies a function to each element in an array and returns a new array containing the concatenated mapped elements.

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | readonly `A`[] |
| `f` | (`a`: `A`, `i`: `number`) => readonly `B`[] |

#### Returns

`B`[]

**`Since`**

2.0.0

___

### flatMapNullable

▸ **flatMapNullable**\<`A`, `B`\>(`f`): (`self`: readonly `A`[]) => `NonNullable`\<`B`\>[]

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (`a`: `A`) => `undefined` \| ``null`` \| `B` |

#### Returns

`fn`

▸ (`self`): `NonNullable`\<`B`\>[]

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | readonly `A`[] |

##### Returns

`NonNullable`\<`B`\>[]

**`Since`**

2.0.0

▸ **flatMapNullable**\<`A`, `B`\>(`self`, `f`): `NonNullable`\<`B`\>[]

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | readonly `A`[] |
| `f` | (`a`: `A`) => `undefined` \| ``null`` \| `B` |

#### Returns

`NonNullable`\<`B`\>[]

**`Since`**

2.0.0

___

### flatten

▸ **flatten**\<`S`\>(`self`): [`Flatten`](Array.ReadonlyArray.md#flatten)\<`S`\>

Flattens an array of arrays into a single array by concatenating all arrays.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends readonly readonly `any`[][] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `S` |

#### Returns

[`Flatten`](Array.ReadonlyArray.md#flatten)\<`S`\>

**`Since`**

2.0.0

## sorting

### sort

▸ **sort**\<`B`\>(`O`): \<S\>(`self`: `S`) => [`With`](Array.ReadonlyArray.md#with)\<`S`, [`Infer`](Array.ReadonlyArray.md#infer)\<`S`\>\>

Create a new array with elements sorted in increasing order based on the specified comparator.
If the input is a `NonEmptyReadonlyArray`, the output will also be a `NonEmptyReadonlyArray`.

#### Type parameters

| Name |
| :------ |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `O` | [`Order`](../interfaces/Ord.Order.md)\<`B`\> |

#### Returns

`fn`

▸ \<`S`\>(`self`): [`With`](Array.ReadonlyArray.md#with)\<`S`, [`Infer`](Array.ReadonlyArray.md#infer)\<`S`\>\>

##### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends readonly `any`[] \| `Iterable`\<`any`\> |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `S` |

##### Returns

[`With`](Array.ReadonlyArray.md#with)\<`S`, [`Infer`](Array.ReadonlyArray.md#infer)\<`S`\>\>

**`Since`**

2.0.0

▸ **sort**\<`A`, `B`\>(`self`, `O`): [`A`, ...A[]]

Create a new array with elements sorted in increasing order based on the specified comparator.
If the input is a `NonEmptyReadonlyArray`, the output will also be a `NonEmptyReadonlyArray`.

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | readonly [`A`, `A`] |
| `O` | [`Order`](../interfaces/Ord.Order.md)\<`B`\> |

#### Returns

[`A`, ...A[]]

**`Since`**

2.0.0

▸ **sort**\<`A`, `B`\>(`self`, `O`): `A`[]

Create a new array with elements sorted in increasing order based on the specified comparator.
If the input is a `NonEmptyReadonlyArray`, the output will also be a `NonEmptyReadonlyArray`.

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |
| `O` | [`Order`](../interfaces/Ord.Order.md)\<`B`\> |

#### Returns

`A`[]

**`Since`**

2.0.0

___

### sortBy

▸ **sortBy**\<`S`\>(`...orders`): (`self`: `S`) => `S` extends readonly [`A`, `A`] ? [`A`, ...A[]] : `S` extends `Iterable`\<`A_1`\> ? `A_1`[] : `never`

Sort the elements of an `Iterable` in increasing order, where elements are compared
using first `orders[0]`, then `orders[1]`, etc...

#### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends readonly [`any`, `any`] \| `Iterable`\<`any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `...orders` | readonly [`Order`](../interfaces/Ord.Order.md)\<[`Infer`](Array.ReadonlyArray.md#infer)\<`S`\>\>[] |

#### Returns

`fn`

▸ (`self`): `S` extends readonly [`A`, `A`] ? [`A`, ...A[]] : `S` extends `Iterable`\<`A_1`\> ? `A_1`[] : `never`

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `S` |

##### Returns

`S` extends readonly [`A`, `A`] ? [`A`, ...A[]] : `S` extends `Iterable`\<`A_1`\> ? `A_1`[] : `never`

**`Since`**

2.0.0

## splitting

### chunksOf

▸ **chunksOf**(`n`): \<S\>(`self`: `S`) => [`With`](Array.ReadonlyArray.md#with)\<`S`, [[`Infer`](Array.ReadonlyArray.md#infer)\<`S`\>, ...Infer\<S\>[]]\>

Splits an `Iterable` into length-`n` pieces. The last piece will be shorter if `n` does not evenly divide the length of
the `Iterable`. Note that `chunksOf(n)([])` is `[]`, not `[[]]`. This is intentional, and is consistent with a recursive
definition of `chunksOf`; it satisfies the property that

```ts
chunksOf(n)(xs).concat(chunksOf(n)(ys)) == chunksOf(n)(xs.concat(ys)))
```

whenever `n` evenly divides the length of `self`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

`fn`

▸ \<`S`\>(`self`): [`With`](Array.ReadonlyArray.md#with)\<`S`, [[`Infer`](Array.ReadonlyArray.md#infer)\<`S`\>, ...Infer\<S\>[]]\>

##### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends readonly `any`[] \| `Iterable`\<`any`\> |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `S` |

##### Returns

[`With`](Array.ReadonlyArray.md#with)\<`S`, [[`Infer`](Array.ReadonlyArray.md#infer)\<`S`\>, ...Infer\<S\>[]]\>

**`Since`**

2.0.0

▸ **chunksOf**\<`A`\>(`self`, `n`): [[`A`, ...A[]], ...[A, ...A[]][]]

Splits an `Iterable` into length-`n` pieces. The last piece will be shorter if `n` does not evenly divide the length of
the `Iterable`. Note that `chunksOf(n)([])` is `[]`, not `[[]]`. This is intentional, and is consistent with a recursive
definition of `chunksOf`; it satisfies the property that

```ts
chunksOf(n)(xs).concat(chunksOf(n)(ys)) == chunksOf(n)(xs.concat(ys)))
```

whenever `n` evenly divides the length of `self`.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | readonly [`A`, `A`] |
| `n` | `number` |

#### Returns

[[`A`, ...A[]], ...[A, ...A[]][]]

**`Since`**

2.0.0

▸ **chunksOf**\<`A`\>(`self`, `n`): [`A`, ...A[]][]

Splits an `Iterable` into length-`n` pieces. The last piece will be shorter if `n` does not evenly divide the length of
the `Iterable`. Note that `chunksOf(n)([])` is `[]`, not `[[]]`. This is intentional, and is consistent with a recursive
definition of `chunksOf`; it satisfies the property that

```ts
chunksOf(n)(xs).concat(chunksOf(n)(ys)) == chunksOf(n)(xs.concat(ys)))
```

whenever `n` evenly divides the length of `self`.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |
| `n` | `number` |

#### Returns

[`A`, ...A[]][]

**`Since`**

2.0.0

___

### span

▸ **span**\<`C`, `B`, `A`\>(`refinement`): (`self`: `Iterable`\<`C`\>) => [init: B[], rest: Exclude\<C, B\>[]]

Split an `Iterable` into two parts:

1. the longest initial subarray for which all elements satisfy the specified predicate
2. the remaining elements

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | `C` |
| `B` | `B` |
| `A` | `C` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `refinement` | [`Refinement`](../interfaces/.Refinement.md)\<`A`, `B`\> |

#### Returns

`fn`

▸ (`self`): [init: B[], rest: Exclude\<C, B\>[]]

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`C`\> |

##### Returns

[init: B[], rest: Exclude\<C, B\>[]]

**`Since`**

2.0.0

▸ **span**\<`B`, `A`\>(`predicate`): (`self`: `Iterable`\<`B`\>) => [init: B[], rest: B[]]

Split an `Iterable` into two parts:

1. the longest initial subarray for which all elements satisfy the specified predicate
2. the remaining elements

#### Type parameters

| Name | Type |
| :------ | :------ |
| `B` | `B` |
| `A` | `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | [`Predicate`](../interfaces/.Predicate.md)\<`A`\> |

#### Returns

`fn`

▸ (`self`): [init: B[], rest: B[]]

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`B`\> |

##### Returns

[init: B[], rest: B[]]

**`Since`**

2.0.0

▸ **span**\<`A`, `B`\>(`self`, `refinement`): [init: B[], rest: Exclude\<A, B\>[]]

Split an `Iterable` into two parts:

1. the longest initial subarray for which all elements satisfy the specified predicate
2. the remaining elements

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |
| `refinement` | [`Refinement`](../interfaces/.Refinement.md)\<`A`, `B`\> |

#### Returns

[init: B[], rest: Exclude\<A, B\>[]]

**`Since`**

2.0.0

▸ **span**\<`A`\>(`self`, `predicate`): [init: A[], rest: A[]]

Split an `Iterable` into two parts:

1. the longest initial subarray for which all elements satisfy the specified predicate
2. the remaining elements

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |
| `predicate` | [`Predicate`](../interfaces/.Predicate.md)\<`A`\> |

#### Returns

[init: A[], rest: A[]]

**`Since`**

2.0.0

___

### split

▸ **split**(`n`): \<A\>(`self`: `Iterable`\<`A`\>) => `A`[][]

Splits this iterable into `n` equally sized arrays.

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

`fn`

▸ \<`A`\>(`self`): `A`[][]

##### Type parameters

| Name |
| :------ |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |

##### Returns

`A`[][]

**`Since`**

2.0.0

▸ **split**\<`A`\>(`self`, `n`): `A`[][]

Splits this iterable into `n` equally sized arrays.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |
| `n` | `number` |

#### Returns

`A`[][]

**`Since`**

2.0.0

___

### splitAt

▸ **splitAt**(`n`): \<A\>(`self`: `Iterable`\<`A`\>) => [beforeIndex: A[], fromIndex: A[]]

Splits an `Iterable` into two segments, with the first segment containing a maximum of `n` elements.
The value of `n` can be `0`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

`fn`

▸ \<`A`\>(`self`): [beforeIndex: A[], fromIndex: A[]]

##### Type parameters

| Name |
| :------ |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |

##### Returns

[beforeIndex: A[], fromIndex: A[]]

**`Since`**

2.0.0

▸ **splitAt**\<`A`\>(`self`, `n`): [beforeIndex: A[], fromIndex: A[]]

Splits an `Iterable` into two segments, with the first segment containing a maximum of `n` elements.
The value of `n` can be `0`.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |
| `n` | `number` |

#### Returns

[beforeIndex: A[], fromIndex: A[]]

**`Since`**

2.0.0

___

### splitNonEmptyAt

▸ **splitNonEmptyAt**(`n`): \<A\>(`self`: readonly [`A`, `A`]) => [beforeIndex: [A, ...A[]], fromIndex: A[]]

Splits a `NonEmptyReadonlyArray` into two segments, with the first segment containing a maximum of `n` elements.
The value of `n` must be `>= 1`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

`fn`

▸ \<`A`\>(`self`): [beforeIndex: [A, ...A[]], fromIndex: A[]]

##### Type parameters

| Name |
| :------ |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | readonly [`A`, `A`] |

##### Returns

[beforeIndex: [A, ...A[]], fromIndex: A[]]

**`Since`**

2.0.0

▸ **splitNonEmptyAt**\<`A`\>(`self`, `n`): [beforeIndex: [A, ...A[]], fromIndex: A[]]

Splits a `NonEmptyReadonlyArray` into two segments, with the first segment containing a maximum of `n` elements.
The value of `n` must be `>= 1`.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | readonly [`A`, `A`] |
| `n` | `number` |

#### Returns

[beforeIndex: [A, ...A[]], fromIndex: A[]]

**`Since`**

2.0.0

___

### splitWhere

▸ **splitWhere**\<`B`, `A`\>(`predicate`): (`self`: `Iterable`\<`B`\>) => [beforeMatch: B[], fromMatch: B[]]

Splits this iterable on the first element that matches this predicate.
Returns a tuple containing two arrays: the first one is before the match, and the second one is from the match onward.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `B` | `B` |
| `A` | `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | [`Predicate`](../interfaces/.Predicate.md)\<`A`\> |

#### Returns

`fn`

▸ (`self`): [beforeMatch: B[], fromMatch: B[]]

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`B`\> |

##### Returns

[beforeMatch: B[], fromMatch: B[]]

**`Since`**

2.0.0

▸ **splitWhere**\<`A`\>(`self`, `predicate`): [beforeMatch: A[], fromMatch: A[]]

Splits this iterable on the first element that matches this predicate.
Returns a tuple containing two arrays: the first one is before the match, and the second one is from the match onward.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |
| `predicate` | [`Predicate`](../interfaces/.Predicate.md)\<`A`\> |

#### Returns

[beforeMatch: A[], fromMatch: A[]]

**`Since`**

2.0.0

___

### unappend

▸ **unappend**\<`A`\>(`self`): [arrayWithoutLastElement: A[], lastElement: A]

Return a tuple containing a copy of the `NonEmptyReadonlyArray` without its last element, and that last element.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | readonly [`A`, `A`] |

#### Returns

[arrayWithoutLastElement: A[], lastElement: A]

**`Since`**

2.0.0

___

### unprepend

▸ **unprepend**\<`A`\>(`self`): [firstElement: A, remainingElements: A[]]

Return a tuple containing the first element, and a new `Array` of the remaining elements, if any.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | readonly [`A`, `A`] |

#### Returns

[firstElement: A, remainingElements: A[]]

**`Since`**

2.0.0

## unsafe

### unsafeGet

▸ **unsafeGet**(`index`): \<A\>(`self`: readonly `A`[]) => `A`

Gets an element unsafely, will throw on out of bounds.

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |

#### Returns

`fn`

▸ \<`A`\>(`self`): `A`

##### Type parameters

| Name |
| :------ |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | readonly `A`[] |

##### Returns

`A`

**`Since`**

2.0.0

▸ **unsafeGet**\<`A`\>(`self`, `index`): `A`

Gets an element unsafely, will throw on out of bounds.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | readonly `A`[] |
| `index` | `number` |

#### Returns

`A`

**`Since`**

2.0.0

## zipping

### zip

▸ **zip**\<`B`\>(`that`): \<A\>(`self`: readonly [`A`, `A`]) => [[`A`, `B`], ...[A, B][]]

Takes two `Iterable`s and returns an `Array` of corresponding pairs.
If one input `Iterable` is short, excess elements of the
longer `Iterable` are discarded.

#### Type parameters

| Name |
| :------ |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `that` | readonly [`B`, `B`] |

#### Returns

`fn`

▸ \<`A`\>(`self`): [[`A`, `B`], ...[A, B][]]

##### Type parameters

| Name |
| :------ |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | readonly [`A`, `A`] |

##### Returns

[[`A`, `B`], ...[A, B][]]

**`Since`**

2.0.0

▸ **zip**\<`B`\>(`that`): \<A\>(`self`: `Iterable`\<`A`\>) => [`A`, `B`][]

Takes two `Iterable`s and returns an `Array` of corresponding pairs.
If one input `Iterable` is short, excess elements of the
longer `Iterable` are discarded.

#### Type parameters

| Name |
| :------ |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `that` | `Iterable`\<`B`\> |

#### Returns

`fn`

▸ \<`A`\>(`self`): [`A`, `B`][]

##### Type parameters

| Name |
| :------ |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |

##### Returns

[`A`, `B`][]

**`Since`**

2.0.0

▸ **zip**\<`A`, `B`\>(`self`, `that`): [[`A`, `B`], ...[A, B][]]

Takes two `Iterable`s and returns an `Array` of corresponding pairs.
If one input `Iterable` is short, excess elements of the
longer `Iterable` are discarded.

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | readonly [`A`, `A`] |
| `that` | readonly [`B`, `B`] |

#### Returns

[[`A`, `B`], ...[A, B][]]

**`Since`**

2.0.0

▸ **zip**\<`A`, `B`\>(`self`, `that`): [`A`, `B`][]

Takes two `Iterable`s and returns an `Array` of corresponding pairs.
If one input `Iterable` is short, excess elements of the
longer `Iterable` are discarded.

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |
| `that` | `Iterable`\<`B`\> |

#### Returns

[`A`, `B`][]

**`Since`**

2.0.0

___

### zipWith

▸ **zipWith**\<`B`, `A`, `C`\>(`that`, `f`): (`self`: readonly [`A`, `A`]) => [`C`, ...C[]]

Apply a function to pairs of elements at the same index in two `Iterable`s, collecting the results in a new `Array`. If one
input `Iterable` is short, excess elements of the longer `Iterable` are discarded.

#### Type parameters

| Name |
| :------ |
| `B` |
| `A` |
| `C` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `that` | readonly [`B`, `B`] |
| `f` | (`a`: `A`, `b`: `B`) => `C` |

#### Returns

`fn`

▸ (`self`): [`C`, ...C[]]

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | readonly [`A`, `A`] |

##### Returns

[`C`, ...C[]]

**`Since`**

2.0.0

▸ **zipWith**\<`B`, `A`, `C`\>(`that`, `f`): (`self`: `Iterable`\<`A`\>) => `C`[]

Apply a function to pairs of elements at the same index in two `Iterable`s, collecting the results in a new `Array`. If one
input `Iterable` is short, excess elements of the longer `Iterable` are discarded.

#### Type parameters

| Name |
| :------ |
| `B` |
| `A` |
| `C` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `that` | `Iterable`\<`B`\> |
| `f` | (`a`: `A`, `b`: `B`) => `C` |

#### Returns

`fn`

▸ (`self`): `C`[]

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |

##### Returns

`C`[]

**`Since`**

2.0.0

▸ **zipWith**\<`A`, `B`, `C`\>(`self`, `that`, `f`): [`C`, ...C[]]

Apply a function to pairs of elements at the same index in two `Iterable`s, collecting the results in a new `Array`. If one
input `Iterable` is short, excess elements of the longer `Iterable` are discarded.

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | readonly [`A`, `A`] |
| `that` | readonly [`B`, `B`] |
| `f` | (`a`: `A`, `b`: `B`) => `C` |

#### Returns

[`C`, ...C[]]

**`Since`**

2.0.0

▸ **zipWith**\<`B`, `A`, `C`\>(`self`, `that`, `f`): `C`[]

Apply a function to pairs of elements at the same index in two `Iterable`s, collecting the results in a new `Array`. If one
input `Iterable` is short, excess elements of the longer `Iterable` are discarded.

#### Type parameters

| Name |
| :------ |
| `B` |
| `A` |
| `C` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |
| `that` | `Iterable`\<`B`\> |
| `f` | (`a`: `A`, `b`: `B`) => `C` |

#### Returns

`C`[]

**`Since`**

2.0.0
