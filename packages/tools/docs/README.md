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

- [Combine](README.md#combine)
- [FieldDiff](README.md#fielddiff)
- [Narrow](README.md#narrow)
- [Pretty](README.md#pretty)
- [Remap](README.md#remap)
- [UnionFromTuple](README.md#unionfromtuple)
- [UnionToIntersection](README.md#uniontointersection)

### Functions

- [asConst](README.md#asconst)
- [identity](README.md#identity)
- [narrow](README.md#narrow-1)
- [noop](README.md#noop)
- [uniqueBy](README.md#uniqueby)

## Type Aliases

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
