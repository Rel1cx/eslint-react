[eslint-plugin-react-ts](../README.md) / [src/lib/primitives](src_lib_primitives.md) / Data

# Namespace: Data

[src/lib/primitives](src_lib_primitives.md).Data

## Table of contents

### Namespaces

- [Case](src_lib_primitives.Data.Case.md)
- [TaggedEnum](src_lib_primitives.Data.TaggedEnum.md)

### Classes

- [Structural](../classes/src_lib_primitives.Data.Structural.md)

### Interfaces

- [Case](../interfaces/src_lib_primitives.Data.Case-1.md)

### Type Aliases

- [Data](src_lib_primitives.Data.md#data)
- [TaggedEnum](src_lib_primitives.Data.md#taggedenum)

### Variables

- [Class](src_lib_primitives.Data.md#class)

### Functions

- [TaggedClass](src_lib_primitives.Data.md#taggedclass)
- [array](src_lib_primitives.Data.md#array)
- [case](src_lib_primitives.Data.md#case)
- [struct](src_lib_primitives.Data.md#struct)
- [tagged](src_lib_primitives.Data.md#tagged)
- [taggedEnum](src_lib_primitives.Data.md#taggedenum-1)
- [tuple](src_lib_primitives.Data.md#tuple)
- [unsafeArray](src_lib_primitives.Data.md#unsafearray)
- [unsafeStruct](src_lib_primitives.Data.md#unsafestruct)

## Other

### case

▸ **case**<`A`\>(): [`Constructor`](../interfaces/src_lib_primitives.Data.Case.Constructor.md)<`A`, `never`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | extends [`Case`](../interfaces/src_lib_primitives.Data.Case-1.md) |

#### Returns

[`Constructor`](../interfaces/src_lib_primitives.Data.Case.Constructor.md)<`A`, `never`\>

## constructors

### Class

• `Const` **Class**: <A\>(`args`: `Types.Equals`<`Omit`<`A`, keyof `Equal.Equal`\>, {}\> extends ``true`` ? `void` : `Omit`<`A`, keyof `Equal.Equal`\>) => [`Data`](src_lib_primitives.Data.md#data)<`A`\>

#### Type declaration

• <`A`\>(`args`)

Provides a constructor for a Case Class.

##### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | extends `Record`<`string`, `any`\> |

##### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Types.Equals`<`Omit`<`A`, keyof `Equal.Equal`\>, {}\> extends ``true`` ? `void` : `Omit`<`A`, keyof `Equal.Equal`\> |

**`Since`**

1.0.0

___

### TaggedClass

▸ **TaggedClass**<`Key`\>(`tag`): <A\>(`args`: `Equals`<`Omit`<`A`, keyof `Equal`\>, {}\> extends ``true`` ? `void` : `Omit`<`A`, keyof `Equal`\>) => [`Data`](src_lib_primitives.Data.md#data)<`A` & { `_tag`: `Key`  }\>

Provides a Tagged constructor for a Case Class.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Key` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `tag` | `Key` |

#### Returns

`fn`

• **new TaggedClass**<`A`\>(`args`)

##### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | extends `Record`<`string`, `any`\> |

##### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Equals`<`Omit`<`A`, keyof `Equal`\>, {}\> extends ``true`` ? `void` : `Omit`<`A`, keyof `Equal`\> |

**`Since`**

1.0.0

___

### array

▸ **array**<`As`\>(`as`): [`Data`](src_lib_primitives.Data.md#data)<`As`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `As` | extends readonly `any`[] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `as` | `As` |

#### Returns

[`Data`](src_lib_primitives.Data.md#data)<`As`\>

**`Since`**

1.0.0

___

### struct

▸ **struct**<`As`\>(`as`): [`Data`](src_lib_primitives.Data.md#data)<`As`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `As` | extends `Readonly`<`Record`<`string`, `any`\>\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `as` | `As` |

#### Returns

[`Data`](src_lib_primitives.Data.md#data)<`As`\>

**`Since`**

1.0.0

___

### tagged

▸ **tagged**<`A`\>(`tag`): [`Constructor`](../interfaces/src_lib_primitives.Data.Case.Constructor.md)<`A`, ``"_tag"``\>

Provides a tagged constructor for the specified `Case`.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | extends [`Case`](../interfaces/src_lib_primitives.Data.Case-1.md) & { `_tag`: `string`  } |

#### Parameters

| Name | Type |
| :------ | :------ |
| `tag` | `A`[``"_tag"``] |

#### Returns

[`Constructor`](../interfaces/src_lib_primitives.Data.Case.Constructor.md)<`A`, ``"_tag"``\>

**`Since`**

1.0.0

___

### taggedEnum

▸ **taggedEnum**<`Z`\>(): <K\>(`tag`: `K`) => <A\>(`args`: [`Args`](src_lib_primitives.Data.TaggedEnum.md#args)<[`Kind`](src_lib_primitives.Data.TaggedEnum.md#kind)<`Z`, `A`, `unknown`, `unknown`, `unknown`\>, `K`\>) => `Extract`<[`Kind`](src_lib_primitives.Data.TaggedEnum.md#kind)<`Z`, `A`, `unknown`, `unknown`, `unknown`\>, { `_tag`: `K`  }\>

Create a constructor for a tagged union of `Data` structs.

You can also pass a `TaggedEnum.WithGenerics` if you want to add generics to
the constructor.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Z` | extends [`WithGenerics`](../interfaces/src_lib_primitives.Data.TaggedEnum.WithGenerics.md)<``1``\> |

#### Returns

`fn`

▸ <`K`\>(`tag`): <A\>(`args`: [`Args`](src_lib_primitives.Data.TaggedEnum.md#args)<[`Kind`](src_lib_primitives.Data.TaggedEnum.md#kind)<`Z`, `A`, `unknown`, `unknown`, `unknown`\>, `K`\>) => `Extract`<[`Kind`](src_lib_primitives.Data.TaggedEnum.md#kind)<`Z`, `A`, `unknown`, `unknown`, `unknown`\>, { `_tag`: `K`  }\>

##### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends `string` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `tag` | `K` |

##### Returns

`fn`

▸ <`A`\>(`args`): `Extract`<[`Kind`](src_lib_primitives.Data.TaggedEnum.md#kind)<`Z`, `A`, `unknown`, `unknown`, `unknown`\>, { `_tag`: `K`  }\>

##### Type parameters

| Name |
| :------ |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `args` | [`Args`](src_lib_primitives.Data.TaggedEnum.md#args)<[`Kind`](src_lib_primitives.Data.TaggedEnum.md#kind)<`Z`, `A`, `unknown`, `unknown`, `unknown`\>, `K`\> |

##### Returns

`Extract`<[`Kind`](src_lib_primitives.Data.TaggedEnum.md#kind)<`Z`, `A`, `unknown`, `unknown`, `unknown`\>, { `_tag`: `K`  }\>

**`Example`**

```ts
import * as Data from "@effect/data/Data"

const HttpError = Data.taggedEnum<
  | Data.Data<{ _tag: "BadRequest"; status: 400; message: string }>
  | Data.Data<{ _tag: "NotFound"; status: 404; message: string }>
>()

const notFound = HttpError("NotFound")({ status: 404, message: "Not Found" })
```

**`Example`**

```ts
import * as Data from "@effect/data/Data"

type MyResult<E, A> = Data.TaggedEnum<{
  Failure: { error: E }
  Success: { value: A }
}>
interface MyResultDefinition extends Data.TaggedEnum.WithGenerics<2> {
  readonly taggedEnum: MyResult<this["A"], this["B"]>
}
const MyResult = Data.taggedEnum<MyResultDefinition>()

const success = MyResult("Success")({ value: 1 })
```

**`Since`**

1.0.0

▸ **taggedEnum**<`Z`\>(): <K\>(`tag`: `K`) => <A, B\>(`args`: [`Args`](src_lib_primitives.Data.TaggedEnum.md#args)<[`Kind`](src_lib_primitives.Data.TaggedEnum.md#kind)<`Z`, `A`, `B`, `unknown`, `unknown`\>, `K`\>) => `Extract`<[`Kind`](src_lib_primitives.Data.TaggedEnum.md#kind)<`Z`, `A`, `B`, `unknown`, `unknown`\>, { `_tag`: `K`  }\>

Create a constructor for a tagged union of `Data` structs.

You can also pass a `TaggedEnum.WithGenerics` if you want to add generics to
the constructor.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Z` | extends [`WithGenerics`](../interfaces/src_lib_primitives.Data.TaggedEnum.WithGenerics.md)<``2``\> |

#### Returns

`fn`

▸ <`K`\>(`tag`): <A, B\>(`args`: [`Args`](src_lib_primitives.Data.TaggedEnum.md#args)<[`Kind`](src_lib_primitives.Data.TaggedEnum.md#kind)<`Z`, `A`, `B`, `unknown`, `unknown`\>, `K`\>) => `Extract`<[`Kind`](src_lib_primitives.Data.TaggedEnum.md#kind)<`Z`, `A`, `B`, `unknown`, `unknown`\>, { `_tag`: `K`  }\>

##### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends `string` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `tag` | `K` |

##### Returns

`fn`

▸ <`A`, `B`\>(`args`): `Extract`<[`Kind`](src_lib_primitives.Data.TaggedEnum.md#kind)<`Z`, `A`, `B`, `unknown`, `unknown`\>, { `_tag`: `K`  }\>

##### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `args` | [`Args`](src_lib_primitives.Data.TaggedEnum.md#args)<[`Kind`](src_lib_primitives.Data.TaggedEnum.md#kind)<`Z`, `A`, `B`, `unknown`, `unknown`\>, `K`\> |

##### Returns

`Extract`<[`Kind`](src_lib_primitives.Data.TaggedEnum.md#kind)<`Z`, `A`, `B`, `unknown`, `unknown`\>, { `_tag`: `K`  }\>

**`Example`**

```ts
import * as Data from "@effect/data/Data"

const HttpError = Data.taggedEnum<
  | Data.Data<{ _tag: "BadRequest"; status: 400; message: string }>
  | Data.Data<{ _tag: "NotFound"; status: 404; message: string }>
>()

const notFound = HttpError("NotFound")({ status: 404, message: "Not Found" })
```

**`Example`**

```ts
import * as Data from "@effect/data/Data"

type MyResult<E, A> = Data.TaggedEnum<{
  Failure: { error: E }
  Success: { value: A }
}>
interface MyResultDefinition extends Data.TaggedEnum.WithGenerics<2> {
  readonly taggedEnum: MyResult<this["A"], this["B"]>
}
const MyResult = Data.taggedEnum<MyResultDefinition>()

const success = MyResult("Success")({ value: 1 })
```

**`Since`**

1.0.0

▸ **taggedEnum**<`Z`\>(): <K\>(`tag`: `K`) => <A, B, C\>(`args`: [`Args`](src_lib_primitives.Data.TaggedEnum.md#args)<[`Kind`](src_lib_primitives.Data.TaggedEnum.md#kind)<`Z`, `A`, `B`, `C`, `unknown`\>, `K`\>) => `Extract`<[`Kind`](src_lib_primitives.Data.TaggedEnum.md#kind)<`Z`, `A`, `B`, `C`, `unknown`\>, { `_tag`: `K`  }\>

Create a constructor for a tagged union of `Data` structs.

You can also pass a `TaggedEnum.WithGenerics` if you want to add generics to
the constructor.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Z` | extends [`WithGenerics`](../interfaces/src_lib_primitives.Data.TaggedEnum.WithGenerics.md)<``3``\> |

#### Returns

`fn`

▸ <`K`\>(`tag`): <A, B, C\>(`args`: [`Args`](src_lib_primitives.Data.TaggedEnum.md#args)<[`Kind`](src_lib_primitives.Data.TaggedEnum.md#kind)<`Z`, `A`, `B`, `C`, `unknown`\>, `K`\>) => `Extract`<[`Kind`](src_lib_primitives.Data.TaggedEnum.md#kind)<`Z`, `A`, `B`, `C`, `unknown`\>, { `_tag`: `K`  }\>

##### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends `string` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `tag` | `K` |

##### Returns

`fn`

▸ <`A`, `B`, `C`\>(`args`): `Extract`<[`Kind`](src_lib_primitives.Data.TaggedEnum.md#kind)<`Z`, `A`, `B`, `C`, `unknown`\>, { `_tag`: `K`  }\>

##### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `args` | [`Args`](src_lib_primitives.Data.TaggedEnum.md#args)<[`Kind`](src_lib_primitives.Data.TaggedEnum.md#kind)<`Z`, `A`, `B`, `C`, `unknown`\>, `K`\> |

##### Returns

`Extract`<[`Kind`](src_lib_primitives.Data.TaggedEnum.md#kind)<`Z`, `A`, `B`, `C`, `unknown`\>, { `_tag`: `K`  }\>

**`Example`**

```ts
import * as Data from "@effect/data/Data"

const HttpError = Data.taggedEnum<
  | Data.Data<{ _tag: "BadRequest"; status: 400; message: string }>
  | Data.Data<{ _tag: "NotFound"; status: 404; message: string }>
>()

const notFound = HttpError("NotFound")({ status: 404, message: "Not Found" })
```

**`Example`**

```ts
import * as Data from "@effect/data/Data"

type MyResult<E, A> = Data.TaggedEnum<{
  Failure: { error: E }
  Success: { value: A }
}>
interface MyResultDefinition extends Data.TaggedEnum.WithGenerics<2> {
  readonly taggedEnum: MyResult<this["A"], this["B"]>
}
const MyResult = Data.taggedEnum<MyResultDefinition>()

const success = MyResult("Success")({ value: 1 })
```

**`Since`**

1.0.0

▸ **taggedEnum**<`Z`\>(): <K\>(`tag`: `K`) => <A, B, C, D\>(`args`: [`Args`](src_lib_primitives.Data.TaggedEnum.md#args)<[`Kind`](src_lib_primitives.Data.TaggedEnum.md#kind)<`Z`, `A`, `B`, `C`, `D`\>, `K`\>) => `Extract`<[`Kind`](src_lib_primitives.Data.TaggedEnum.md#kind)<`Z`, `A`, `B`, `C`, `D`\>, { `_tag`: `K`  }\>

Create a constructor for a tagged union of `Data` structs.

You can also pass a `TaggedEnum.WithGenerics` if you want to add generics to
the constructor.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Z` | extends [`WithGenerics`](../interfaces/src_lib_primitives.Data.TaggedEnum.WithGenerics.md)<``4``\> |

#### Returns

`fn`

▸ <`K`\>(`tag`): <A, B, C, D\>(`args`: [`Args`](src_lib_primitives.Data.TaggedEnum.md#args)<[`Kind`](src_lib_primitives.Data.TaggedEnum.md#kind)<`Z`, `A`, `B`, `C`, `D`\>, `K`\>) => `Extract`<[`Kind`](src_lib_primitives.Data.TaggedEnum.md#kind)<`Z`, `A`, `B`, `C`, `D`\>, { `_tag`: `K`  }\>

##### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends `string` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `tag` | `K` |

##### Returns

`fn`

▸ <`A`, `B`, `C`, `D`\>(`args`): `Extract`<[`Kind`](src_lib_primitives.Data.TaggedEnum.md#kind)<`Z`, `A`, `B`, `C`, `D`\>, { `_tag`: `K`  }\>

##### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `args` | [`Args`](src_lib_primitives.Data.TaggedEnum.md#args)<[`Kind`](src_lib_primitives.Data.TaggedEnum.md#kind)<`Z`, `A`, `B`, `C`, `D`\>, `K`\> |

##### Returns

`Extract`<[`Kind`](src_lib_primitives.Data.TaggedEnum.md#kind)<`Z`, `A`, `B`, `C`, `D`\>, { `_tag`: `K`  }\>

**`Example`**

```ts
import * as Data from "@effect/data/Data"

const HttpError = Data.taggedEnum<
  | Data.Data<{ _tag: "BadRequest"; status: 400; message: string }>
  | Data.Data<{ _tag: "NotFound"; status: 404; message: string }>
>()

const notFound = HttpError("NotFound")({ status: 404, message: "Not Found" })
```

**`Example`**

```ts
import * as Data from "@effect/data/Data"

type MyResult<E, A> = Data.TaggedEnum<{
  Failure: { error: E }
  Success: { value: A }
}>
interface MyResultDefinition extends Data.TaggedEnum.WithGenerics<2> {
  readonly taggedEnum: MyResult<this["A"], this["B"]>
}
const MyResult = Data.taggedEnum<MyResultDefinition>()

const success = MyResult("Success")({ value: 1 })
```

**`Since`**

1.0.0

▸ **taggedEnum**<`A`\>(): <K\>(`tag`: `K`) => [`Constructor`](../interfaces/src_lib_primitives.Data.Case.Constructor.md)<`Extract`<`A`, { `_tag`: `K`  }\>, ``"_tag"``\>

Create a constructor for a tagged union of `Data` structs.

You can also pass a `TaggedEnum.WithGenerics` if you want to add generics to
the constructor.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | extends [`Data`](src_lib_primitives.Data.md#data)<{ `_tag`: `string`  }\> |

#### Returns

`fn`

▸ <`K`\>(`tag`): [`Constructor`](../interfaces/src_lib_primitives.Data.Case.Constructor.md)<`Extract`<`A`, { `_tag`: `K`  }\>, ``"_tag"``\>

##### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends `string` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `tag` | `K` |

##### Returns

[`Constructor`](../interfaces/src_lib_primitives.Data.Case.Constructor.md)<`Extract`<`A`, { `_tag`: `K`  }\>, ``"_tag"``\>

**`Example`**

```ts
import * as Data from "@effect/data/Data"

const HttpError = Data.taggedEnum<
  | Data.Data<{ _tag: "BadRequest"; status: 400; message: string }>
  | Data.Data<{ _tag: "NotFound"; status: 404; message: string }>
>()

const notFound = HttpError("NotFound")({ status: 404, message: "Not Found" })
```

**`Example`**

```ts
import * as Data from "@effect/data/Data"

type MyResult<E, A> = Data.TaggedEnum<{
  Failure: { error: E }
  Success: { value: A }
}>
interface MyResultDefinition extends Data.TaggedEnum.WithGenerics<2> {
  readonly taggedEnum: MyResult<this["A"], this["B"]>
}
const MyResult = Data.taggedEnum<MyResultDefinition>()

const success = MyResult("Success")({ value: 1 })
```

**`Since`**

1.0.0

___

### tuple

▸ **tuple**<`As`\>(`...as`): [`Data`](src_lib_primitives.Data.md#data)<`As`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `As` | extends readonly `any`[] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `...as` | `As` |

#### Returns

[`Data`](src_lib_primitives.Data.md#data)<`As`\>

**`Since`**

1.0.0

___

### unsafeArray

▸ **unsafeArray**<`As`\>(`as`): [`Data`](src_lib_primitives.Data.md#data)<`As`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `As` | extends readonly `any`[] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `as` | `As` |

#### Returns

[`Data`](src_lib_primitives.Data.md#data)<`As`\>

**`Since`**

1.0.0

___

### unsafeStruct

▸ **unsafeStruct**<`As`\>(`as`): [`Data`](src_lib_primitives.Data.md#data)<`As`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `As` | extends `Readonly`<`Record`<`string`, `any`\>\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `as` | `As` |

#### Returns

[`Data`](src_lib_primitives.Data.md#data)<`As`\>

**`Since`**

1.0.0

## models

### Data

Ƭ **Data**<`A`\>: `Readonly`<`A`\> & `Equal.Equal`

**`Since`**

1.0.0

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | extends `Readonly`<`Record`<`string`, `any`\>\> \| `ReadonlyArray`<`any`\> |

___

### TaggedEnum

Ƭ **TaggedEnum**<`A`\>: { readonly [Tag in keyof A]: Data<Readonly<Types.Simplify<A[Tag] & Object\>\>\> }[keyof `A`]

Create a tagged enum data type, which is a union of `Data` structs.

```ts
import * as Data from "@effect/data/Data"

type HttpError = Data.TaggedEnum<{
  BadRequest: { status: 400, message: string }
  NotFound: { status: 404, message: string }
}>

// Equivalent to:
type HttpErrorPlain =
  | Data.Data<{
    readonly _tag: "BadRequest"
    readonly status: 400
    readonly message: string
  }>
  | Data.Data<{
    readonly _tag: "NotFound"
    readonly status: 404
    readonly message: string
  }>
```

**`Since`**

1.0.0

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | extends `Record`<`string`, `Record`<`string`, `any`\>\> |
