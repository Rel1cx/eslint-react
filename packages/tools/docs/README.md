@eslint-react/tools

# @eslint-react/tools

## Table of contents

### Namespaces

- [Array](modules/Array.md)
- [Chunk](modules/Chunk.md)
- [Data](modules/Data.md)
- [E](modules/E.md)
- [Equal](modules/Equal.md)
- [F](modules/F.md)
- [List](modules/List.md)
- [MutList](modules/MutList.md)
- [MutRef](modules/MutRef.md)
- [O](modules/O.md)
- [Ord](modules/Ord.md)
- [Pred](modules/Pred.md)
- [Record](modules/Record.md)
- [Ref](modules/Ref.md)

### Type Aliases

- [ArrayElement](README.md#arrayelement)
- [Assume](README.md#assume)
- [Cast](README.md#cast)
- [Combine](README.md#combine)
- [DeepWriteable](README.md#deepwriteable)
- [Defined](README.md#defined)
- [FieldDiff](README.md#fielddiff)
- [FromEntries](README.md#fromentries)
- [FromEntriesWithReadOnly](README.md#fromentrieswithreadonly)
- [Guard](README.md#guard)
- [GuardRecord](README.md#guardrecord)
- [GuardReturnType](README.md#guardreturntype)
- [KeyGuard](README.md#keyguard)
- [LazyGuardRecord](README.md#lazyguardrecord)
- [LooseRecord](README.md#looserecord)
- [Narrow](README.md#narrow)
- [Pretty](README.md#pretty)
- [Remap](README.md#remap)
- [UnionFromTuple](README.md#unionfromtuple)
- [UnionToIntersection](README.md#uniontointersection)

### Functions

- [asConst](README.md#asconst)
- [entries](README.md#entries)
- [fromEntries](README.md#fromentries-1)
- [fromEntriesWithReadOnly](README.md#fromentrieswithreadonly-1)
- [identity](README.md#identity)
- [isKindObjectLazy](README.md#iskindobjectlazy)
- [isKindOfArray](README.md#iskindofarray)
- [isKindOfObject](README.md#iskindofobject)
- [isKindOfOptional](README.md#iskindofoptional)
- [isKindOfRecord](README.md#iskindofrecord)
- [isKindOfTuple](README.md#iskindoftuple)
- [isKindOfUnion](README.md#iskindofunion)
- [keys](README.md#keys)
- [narrow](README.md#narrow-1)
- [noop](README.md#noop)
- [uniqueBy](README.md#uniqueby)
- [values](README.md#values)

## Type Aliases

### ArrayElement

Ƭ **ArrayElement**\<`A`\>: `A` extends readonly infer T[] ? `T` : `never`

Returns the element type of an array.

**`Since`**

0.4.0

**`Template`**

type of the array elements.

**`Param`**

The array to get the element type from.

#### Type parameters

| Name |
| :--- |
| `A`  |

---

### Assume

Ƭ **Assume**\<`T`, `U`\>: `T` extends `U` ? `T` : `never`

**`Since`**

0.9.0

#### Type parameters

| Name |
| :--- |
| `T`  |
| `U`  |

---

### Cast

Ƭ **Cast**\<`X`, `Y`\>: `X` extends `Y` ? `X` : `Y`

**`Since`**

0.4.0

#### Type parameters

| Name |
| :--- |
| `X`  |
| `Y`  |

---

### Combine

Ƭ **Combine**\<`T1`, `T2`\>: [`Pretty`](README.md#pretty)\<\{ [K in keyof (T1 \| T2)]: T1[K] \| T2[K] } & `Partial`\<`T1` & `T2`\>\>

**`Since`**

0.3.4

#### Type parameters

| Name |
| :--- |
| `T1` |
| `T2` |

---

### DeepWriteable

Ƭ **DeepWriteable**\<`T`\>: \{ -readonly [P in keyof T]: DeepWriteable\<T[P]\> }

#### Type parameters

| Name |
| :--- |
| `T`  |

---

### Defined

Ƭ **Defined**\<`T`\>: `T` extends `undefined` ? `never` : `T`

**`Since`**

0.9.0

#### Type parameters

| Name |
| :--- |
| `T`  |

---

### FieldDiff

Ƭ **FieldDiff**\<`T1`, `T2`\>: `Omit`\<`T1`, keyof `T2`\> \| `Omit`\<`T2`, keyof `T1`\>

**`Since`**

0.3.4

#### Type parameters

| Name |
| :--- |
| `T1` |
| `T2` |

---

### FromEntries

Ƭ **FromEntries**\<`T`\>: `T` extends [infer Key, `unknown`][] ? \{ [K in Cast\<Key, string\>]: Extract\<ArrayElement\<T\>, [K, unknown]\>[1] } : \{ [key in string]: unknown }

#### Type parameters

| Name |
| :--- |
| `T`  |

---

### FromEntriesWithReadOnly

Ƭ **FromEntriesWithReadOnly**\<`T`\>: [`FromEntries`](README.md#fromentries)\<[`DeepWriteable`](README.md#deepwriteable)\<`T`\>\>

#### Type parameters

| Name |
| :--- |
| `T`  |

---

### Guard

Ƭ **Guard**\<`T`\>: (`x`: `unknown`) => x is T

#### Type parameters

| Name | Type      |
| :--- | :-------- |
| `T`  | `unknown` |

#### Type declaration

▸ (`x`): x is T

##### Parameters

| Name | Type      |
| :--- | :-------- |
| `x`  | `unknown` |

##### Returns

x is T

**`Since`**

0.9.0

---

### GuardRecord

Ƭ **GuardRecord**: `Record`\<`PropertyKey`, [`Guard`](README.md#guard)\>

**`Since`**

0.9.0

---

### GuardReturnType

Ƭ **GuardReturnType**\<`T`\>: `T` extends [`Guard`](README.md#guard)\<infer U\> ? `U` : `never`

**`Since`**

0.9.0

#### Type parameters

| Name | Type                               |
| :--- | :--------------------------------- |
| `T`  | extends [`Guard`](README.md#guard) |

---

### KeyGuard

Ƭ **KeyGuard**: [`Guard`](README.md#guard)\<`number` \| `string` \| `symbol`\>

**`Since`**

0.9.0

---

### LazyGuardRecord

Ƭ **LazyGuardRecord**: `Record`\<`PropertyKey`, () => [`Guard`](README.md#guard)\>

**`Since`**

0.9.0

---

### LooseRecord

Ƭ **LooseRecord**\<`T`\>: `Record`\<`PropertyKey`, `T`\>

A record with loose keys.

**`Since`**

0.4.0

#### Type parameters

| Name | Description             |
| :--- | :---------------------- |
| `T`  | The type of the values. |

---

### Narrow

Ƭ **Narrow**\<`TType`\>: \{ [K in keyof TType]: Narrow\<TType[K]\> } \| `TType` extends [] ? [] : `never` \| `TType` extends `Function` ? `TType` : `never` \| `TType` extends `bigint` \| `boolean` \| `number` \| `string` ? `TType` : `never`

Infers embedded primitive type of any type

**`Since`**

0.0.1

**`Param`**

Type to infer

**`Example`**

```ts
type Result = Narrow<["foo", "bar", 1]>;
```

**`See`**

https://twitter.com/hd_nvim/status/1578567206190780417

#### Type parameters

| Name    |
| :------ |
| `TType` |

---

### Pretty

Ƭ **Pretty**\<`T`\>: \{ [P in keyof T]: T[P] } & {}

**`Since`**

0.0.1

#### Type parameters

| Name |
| :--- |
| `T`  |

---

### Remap

Ƭ **Remap**\<`T`\>: \{ [P in keyof T]: T[P] }

**`Since`**

0.0.1

#### Type parameters

| Name |
| :--- |
| `T`  |

---

### UnionFromTuple

Ƭ **UnionFromTuple**\<`T`\>: `T` extends infer U[] ? `U` : `never`

**`Since`**

0.0.1

**`Example`**

```ts
type Result = UnionFromTuple<["foo", "bar", 1]>;
// Result = 'foo' | 'bar' | 1
```

#### Type parameters

| Name | Description                    |
| :--- | :----------------------------- |
| `T`  | The type to get the union from |

---

### UnionToIntersection

Ƭ **UnionToIntersection**\<`U`\>: `U` extends `unknown` ? (`k`: `U`) => `void` : `never` extends (`k`: infer I) => `void` ? `I` : `never`

**`Since`**

0.0.1

**`Template`**

The type to get the intersection from

**`Example`**

```ts
type Result = IntersectionFromTuple<["foo", "bar", 1]>;
// Result = 'foo' & 'bar' & 1
```

#### Type parameters

| Name |
| :--- |
| `U`  |

## Functions

### asConst

▸ **asConst**\<`T`\>(`a`): `T`

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name | Type | Description         |
| :--- | :--- | :------------------ |
| `a`  | `T`  | The value to infer. |

#### Returns

`T`

**`Since`**

0.0.1

---

### entries

▸ **entries**\<`T`\>(`value`): \{ [K in string \| number \| symbol]-?: [K, T[K]] }[keyof `T`][]

type-safe version of Object.entries

#### Type parameters

| Name | Type                                                        |
| :--- | :---------------------------------------------------------- |
| `T`  | extends [`LooseRecord`](README.md#looserecord)\<`unknown`\> |

#### Parameters

| Name    | Type | Description                        |
| :------ | :--- | :--------------------------------- |
| `value` | `T`  | The value to get the entries from. |

#### Returns

\{ [K in string \| number \| symbol]-?: [K, T[K]] }[keyof `T`][]

The entries of the value.

**`Since`**

0.4.0

---

### fromEntries

▸ **fromEntries**\<`T`\>(`entries`): [`FromEntries`](README.md#fromentries)\<`T`\>

type-safe version of Object.fromEntries

#### Type parameters

| Name | Type                                 |
| :--- | :----------------------------------- |
| `T`  | extends [`PropertyKey`, `unknown`][] |

#### Parameters

| Name      | Type | Description                            |
| :-------- | :--- | :------------------------------------- |
| `entries` | `T`  | The entries to create the object from. |

#### Returns

[`FromEntries`](README.md#fromentries)\<`T`\>

The object created from the entries.

**`Since`**

0.4.0

---

### fromEntriesWithReadOnly

▸ **fromEntriesWithReadOnly**\<`T`\>(`entries`): [`FromEntries`](README.md#fromentries)\<[`DeepWriteable`](README.md#deepwriteable)\<`T`\>\>

type-safe version of Object.fromEntries

#### Type parameters

| Name | Type                                 |
| :--- | :----------------------------------- |
| `T`  | extends [`PropertyKey`, `unknown`][] |

#### Parameters

| Name      | Type | Description                            |
| :-------- | :--- | :------------------------------------- |
| `entries` | `T`  | The entries to create the object from. |

#### Returns

[`FromEntries`](README.md#fromentries)\<[`DeepWriteable`](README.md#deepwriteable)\<`T`\>\>

The object created from the entries.

**`Since`**

0.4.0

---

### identity

▸ **identity**\<`T`\>(`a`): `T`

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name | Type | Description          |
| :--- | :--- | :------------------- |
| `a`  | `T`  | The value to return. |

#### Returns

`T`

**`Since`**

0.0.1

---

### isKindObjectLazy

▸ **isKindObjectLazy**\<`T`\>(`guards`): (`x`: `unknown`) => x is \{ [key in string \| number \| symbol]: GuardReturnType\<ReturnType\<T[key]\>\> }

#### Type parameters

| Name | Type                                                   |
| :--- | :----------------------------------------------------- |
| `T`  | extends [`LazyGuardRecord`](README.md#lazyguardrecord) |

#### Parameters

| Name     | Type |
| :------- | :--- |
| `guards` | `T`  |

#### Returns

`fn`

▸ (`x`): x is \{ [key in string \| number \| symbol]: GuardReturnType\<ReturnType\<T[key]\>\> }

##### Parameters

| Name | Type      |
| :--- | :-------- |
| `x`  | `unknown` |

##### Returns

x is \{ [key in string \| number \| symbol]: GuardReturnType\<ReturnType\<T[key]\>\> }

**`Since`**

0.9.0

---

### isKindOfArray

▸ **isKindOfArray**\<`T`\>(`guard`): (`x`: `unknown`) => x is T[]

#### Type parameters

| Name | Type                               |
| :--- | :--------------------------------- |
| `T`  | extends [`Guard`](README.md#guard) |

#### Parameters

| Name    | Type | Description         |
| :------ | :--- | :------------------ |
| `guard` | `T`  | The guard to check. |

#### Returns

`fn`

A guard that checks if given value is the kind of array.

▸ (`x`): x is T[]

##### Parameters

| Name | Type      |
| :--- | :-------- |
| `x`  | `unknown` |

##### Returns

x is T[]

**`Since`**

0.9.0

---

### isKindOfObject

▸ **isKindOfObject**\<`T`\>(`guards`): (`x`: `unknown`) => x is \{ [key in string \| number \| symbol]: GuardReturnType\<T[key]\> }

#### Type parameters

| Name | Type                                           |
| :--- | :--------------------------------------------- |
| `T`  | extends [`GuardRecord`](README.md#guardrecord) |

#### Parameters

| Name     | Type | Description          |
| :------- | :--- | :------------------- |
| `guards` | `T`  | The guards to check. |

#### Returns

`fn`

A guard that checks if given value is the kind of object.

▸ (`x`): x is \{ [key in string \| number \| symbol]: GuardReturnType\<T[key]\> }

##### Parameters

| Name | Type      |
| :--- | :-------- |
| `x`  | `unknown` |

##### Returns

x is \{ [key in string \| number \| symbol]: GuardReturnType\<T[key]\> }

**`Since`**

0.9.0

---

### isKindOfOptional

▸ **isKindOfOptional**\<`T`\>(`guard`): (`x`: `unknown`) => x is undefined \| T

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name    | Type                              |
| :------ | :-------------------------------- |
| `guard` | [`Guard`](README.md#guard)\<`T`\> |

#### Returns

`fn`

▸ (`x`): x is undefined \| T

##### Parameters

| Name | Type      |
| :--- | :-------- |
| `x`  | `unknown` |

##### Returns

x is undefined \| T

**`Since`**

0.9.0

---

### isKindOfRecord

▸ **isKindOfRecord**\<`K`, `V`\>(`isK`, `isV`): (`x`: `unknown`) => x is Record\<GuardReturnType\<K\>, GuardReturnType\<V\>\>

#### Type parameters

| Name | Type                                     |
| :--- | :--------------------------------------- |
| `K`  | extends [`KeyGuard`](README.md#keyguard) |
| `V`  | extends [`Guard`](README.md#guard)       |

#### Parameters

| Name  | Type | Description              |
| :---- | :--- | :----------------------- |
| `isK` | `K`  | The guard for the key.   |
| `isV` | `V`  | The guard for the value. |

#### Returns

`fn`

A guard that checks if given value is the kind of record.

▸ (`x`): x is Record\<GuardReturnType\<K\>, GuardReturnType\<V\>\>

##### Parameters

| Name | Type      |
| :--- | :-------- |
| `x`  | `unknown` |

##### Returns

x is Record\<GuardReturnType\<K\>, GuardReturnType\<V\>\>

**`Since`**

0.9.0

---

### isKindOfTuple

▸ **isKindOfTuple**\<`T`\>(`guards`): (`x`: `unknown`) => x is \{ [key in string \| number \| symbol]: GuardReturnType\<T[key]\> }

#### Type parameters

| Name | Type                                 |
| :--- | :----------------------------------- |
| `T`  | extends [`Guard`](README.md#guard)[] |

#### Parameters

| Name     | Type | Description          |
| :------- | :--- | :------------------- |
| `guards` | `T`  | The guards to check. |

#### Returns

`fn`

A guard that checks if given value is the kind of tuple.

▸ (`x`): x is \{ [key in string \| number \| symbol]: GuardReturnType\<T[key]\> }

##### Parameters

| Name | Type      |
| :--- | :-------- |
| `x`  | `unknown` |

##### Returns

x is \{ [key in string \| number \| symbol]: GuardReturnType\<T[key]\> }

**`Since`**

0.9.0

---

### isKindOfUnion

▸ **isKindOfUnion**\<`T`\>(`...guards`): (`x`: `unknown`) => x is GuardReturnType\<T[number]\>

#### Type parameters

| Name | Type                                 |
| :--- | :----------------------------------- |
| `T`  | extends [`Guard`](README.md#guard)[] |

#### Parameters

| Name        | Type | Description          |
| :---------- | :--- | :------------------- |
| `...guards` | `T`  | The guards to check. |

#### Returns

`fn`

A guard that checks if given value is the kind of union.

▸ (`x`): x is GuardReturnType\<T[number]\>

##### Parameters

| Name | Type      |
| :--- | :-------- |
| `x`  | `unknown` |

##### Returns

x is GuardReturnType\<T[number]\>

**`Since`**

0.9.0

---

### keys

▸ **keys**\<`T`\>(`value`): keyof `T`[]

type-safe version of Object.keys

#### Type parameters

| Name | Type                                                        |
| :--- | :---------------------------------------------------------- |
| `T`  | extends [`LooseRecord`](README.md#looserecord)\<`unknown`\> |

#### Parameters

| Name    | Type | Description                     |
| :------ | :--- | :------------------------------ |
| `value` | `T`  | The value to get the keys from. |

#### Returns

keyof `T`[]

The keys of the value.

**`Since`**

0.4.0

---

### narrow

▸ **narrow**\<`TType`\>(`a`): [`Narrow`](README.md#narrow)\<`TType`\>

Infers embedded primitive type of any type
Same as `as const` but without setting the object as readonly and without needing the user to use it.

#### Type parameters

| Name    |
| :------ |
| `TType` |

#### Parameters

| Name | Type                                    | Description    |
| :--- | :-------------------------------------- | :------------- |
| `a`  | [`Narrow`](README.md#narrow)\<`TType`\> | Value to infer |

#### Returns

[`Narrow`](README.md#narrow)\<`TType`\>

Value with embedded type inferred

**`Since`**

0.0.1

**`Example`**

```ts
const result = narrow(["foo", "bar", 1]);
```

---

### noop

▸ **noop**(): `void`

#### Returns

`void`

**`Since`**

0.0.1

---

### uniqueBy

▸ **uniqueBy**\<`T`\>(`arr`, `fn`): `T`[]

Returns a new array with unique values based on the given function.

#### Type parameters

| Name | Description                 |
| :--- | :-------------------------- |
| `T`  | type of the array elements. |

#### Parameters

| Name  | Type                    | Description                               |
| :---- | :---------------------- | :---------------------------------------- |
| `arr` | readonly `T`[]          | The array to filter.                      |
| `fn`  | (`x`: `T`) => `unknown` | The function to get the value to compare. |

#### Returns

`T`[]

new array with unique values.

**`Since`**

0.0.1

---

### values

▸ **values**\<`T`\>(`value`): `T`[keyof `T`][]

type-safe version of Object.values

#### Type parameters

| Name | Type                                                        |
| :--- | :---------------------------------------------------------- |
| `T`  | extends [`LooseRecord`](README.md#looserecord)\<`unknown`\> |

#### Parameters

| Name    | Type | Description                       |
| :------ | :--- | :-------------------------------- |
| `value` | `T`  | The value to get the values from. |

#### Returns

`T`[keyof `T`][]

The values of the value.

**`Since`**

0.4.0
