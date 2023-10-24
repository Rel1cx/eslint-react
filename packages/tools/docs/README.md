@eslint-react/tools

# @eslint-react/tools

## Table of contents

### Namespaces

- [Chunk](modules/Chunk.md)
- [Data](modules/Data.md)
- [E](modules/E.md)
- [Equal](modules/Equal.md)
- [F](modules/F.md)
- [List](modules/List.md)
- [MutList](modules/MutList.md)
- [MutRef](modules/MutRef.md)
- [O](modules/O.md)
- [Record](modules/Record.md)

### Type Aliases

- [ArrayElement](README.md#arrayelement)
- [Cast](README.md#cast)
- [Combine](README.md#combine)
- [DeepWriteable](README.md#deepwriteable)
- [FieldDiff](README.md#fielddiff)
- [FromEntries](README.md#fromentries)
- [FromEntriesWithReadOnly](README.md#fromentrieswithreadonly)
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
- [keys](README.md#keys)
- [narrow](README.md#narrow-1)
- [noop](README.md#noop)
- [uniqueBy](README.md#uniqueby)
- [values](README.md#values)

## Type Aliases

### ArrayElement

Ƭ **ArrayElement**<`A`\>: `A` extends readonly infer T[] ? `T` : `never`

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

### Cast

Ƭ **Cast**<`X`, `Y`\>: `X` extends `Y` ? `X` : `Y`

**`Since`**

0.4.0

#### Type parameters

| Name |
| :--- |
| `X`  |
| `Y`  |

---

### Combine

Ƭ **Combine**<`T1`, `T2`\>: [`Pretty`](README.md#pretty)<{ [K in keyof (T1 \| T2)]: T1[K] \| T2[K] } & `Partial`<`T1` & `T2`\>\>

**`Since`**

0.3.4

#### Type parameters

| Name |
| :--- |
| `T1` |
| `T2` |

---

### DeepWriteable

Ƭ **DeepWriteable**<`T`\>: { -readonly [P in keyof T]: DeepWriteable<T[P]\> }

#### Type parameters

| Name |
| :--- |
| `T`  |

---

### FieldDiff

Ƭ **FieldDiff**<`T1`, `T2`\>: `Omit`<`T1`, keyof `T2`\> \| `Omit`<`T2`, keyof `T1`\>

**`Since`**

0.3.4

#### Type parameters

| Name |
| :--- |
| `T1` |
| `T2` |

---

### FromEntries

Ƭ **FromEntries**<`T`\>: `T` extends [infer Key, `any`][] ? { [K in Cast<Key, string\>]: Extract<ArrayElement<T\>, [K, any]\>[1] } : { [key in string]: any }

#### Type parameters

| Name |
| :--- |
| `T`  |

---

### FromEntriesWithReadOnly

Ƭ **FromEntriesWithReadOnly**<`T`\>: [`FromEntries`](README.md#fromentries)<[`DeepWriteable`](README.md#deepwriteable)<`T`\>\>

#### Type parameters

| Name |
| :--- |
| `T`  |

---

### LooseRecord

Ƭ **LooseRecord**<`T`\>: `Record`<`PropertyKey`, `T`\>

A record with loose keys.

**`Since`**

0.4.0

#### Type parameters

| Name | Description             |
| :--- | :---------------------- |
| `T`  | The type of the values. |

---

### Narrow

Ƭ **Narrow**<`TType`\>: { [K in keyof TType]: Narrow<TType[K]\> } \| `TType` extends [] ? [] : `never` \| `TType` extends `Function` ? `TType` : `never` \| `TType` extends `bigint` \| `boolean` \| `number` \| `string` ? `TType` : `never`

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

Ƭ **Pretty**<`T`\>: { [P in keyof T]: T[P] } & {}

**`Since`**

0.0.1

#### Type parameters

| Name |
| :--- |
| `T`  |

---

### Remap

Ƭ **Remap**<`T`\>: { [P in keyof T]: T[P] }

**`Since`**

0.0.1

#### Type parameters

| Name |
| :--- |
| `T`  |

---

### UnionFromTuple

Ƭ **UnionFromTuple**<`T`\>: `T` extends infer U[] ? `U` : `never`

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

Ƭ **UnionToIntersection**<`U`\>: `U` extends `any` ? (`k`: `U`) => `void` : `never` extends (`k`: infer I) => `void` ? `I` : `never`

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

▸ **asConst**<`T`\>(`a`): `T`

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

▸ **entries**<`T`\>(`value`): { [K in string \| number \| symbol]-?: [K, T[K]] }[keyof `T`][]

type-safe version of Object.entries

#### Type parameters

| Name | Type                                                       |
| :--- | :--------------------------------------------------------- |
| `T`  | extends [`LooseRecord`](README.md#looserecord)<`unknown`\> |

#### Parameters

| Name    | Type | Description                        |
| :------ | :--- | :--------------------------------- |
| `value` | `T`  | The value to get the entries from. |

#### Returns

{ [K in string \| number \| symbol]-?: [K, T[K]] }[keyof `T`][]

The entries of the value.

**`Since`**

0.4.0

---

### fromEntries

▸ **fromEntries**<`T`\>(`entries`): [`FromEntries`](README.md#fromentries)<`T`\>

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

[`FromEntries`](README.md#fromentries)<`T`\>

The object created from the entries.

**`Since`**

0.4.0

---

### fromEntriesWithReadOnly

▸ **fromEntriesWithReadOnly**<`T`\>(`entries`): [`FromEntries`](README.md#fromentries)<[`DeepWriteable`](README.md#deepwriteable)<`T`\>\>

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

[`FromEntries`](README.md#fromentries)<[`DeepWriteable`](README.md#deepwriteable)<`T`\>\>

The object created from the entries.

**`Since`**

0.4.0

---

### identity

▸ **identity**<`T`\>(`a`): `T`

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

### keys

▸ **keys**<`T`\>(`value`): keyof `T`[]

type-safe version of Object.keys

#### Type parameters

| Name | Type                                                       |
| :--- | :--------------------------------------------------------- |
| `T`  | extends [`LooseRecord`](README.md#looserecord)<`unknown`\> |

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

▸ **narrow**<`TType`\>(`a`): [`Narrow`](README.md#narrow)<`TType`\>

Infers embedded primitive type of any type
Same as `as const` but without setting the object as readonly and without needing the user to use it.

#### Type parameters

| Name    |
| :------ |
| `TType` |

#### Parameters

| Name | Type                                   | Description    |
| :--- | :------------------------------------- | :------------- |
| `a`  | [`Narrow`](README.md#narrow)<`TType`\> | Value to infer |

#### Returns

[`Narrow`](README.md#narrow)<`TType`\>

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

▸ **uniqueBy**<`T`\>(`arr`, `fn`): `T`[]

Returns a new array with unique values based on the given function.

#### Type parameters

| Name | Description                 |
| :--- | :-------------------------- |
| `T`  | type of the array elements. |

#### Parameters

| Name  | Type                    | Description                               |
| :---- | :---------------------- | :---------------------------------------- |
| `arr` | `T`[]                   | The array to filter.                      |
| `fn`  | (`x`: `T`) => `unknown` | The function to get the value to compare. |

#### Returns

`T`[]

new array with unique values.

**`Since`**

0.0.1

---

### values

▸ **values**<`T`\>(`value`): `T`[keyof `T`][]

type-safe version of Object.values

#### Type parameters

| Name | Type                                                       |
| :--- | :--------------------------------------------------------- |
| `T`  | extends [`LooseRecord`](README.md#looserecord)<`unknown`\> |

#### Parameters

| Name    | Type | Description                       |
| :------ | :--- | :-------------------------------- |
| `value` | `T`  | The value to get the values from. |

#### Returns

`T`[keyof `T`][]

The values of the value.

**`Since`**

0.4.0
