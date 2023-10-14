[@eslint-react/tools](../README.md) / Data

# Namespace: Data

## Table of contents

### Namespaces

- [Case](Data.Case.md)
- [TaggedEnum](Data.TaggedEnum.md)

### Interfaces

- [Case](../interfaces/Data.Case-1.md)
- [YieldableError](../interfaces/Data.YieldableError.md)

### Type Aliases

- [Data](Data.md#data)
- [TaggedEnum](Data.md#taggedenum)

### Variables

- [Class](Data.md#class)
- [Error](Data.md#error)
- [Structural](Data.md#structural)

### Functions

- [TaggedClass](Data.md#taggedclass)
- [TaggedError](Data.md#taggederror)
- [array](Data.md#array)
- [case](Data.md#case)
- [struct](Data.md#struct)
- [tagged](Data.md#tagged)
- [taggedEnum](Data.md#taggedenum-1)
- [tuple](Data.md#tuple)
- [unsafeArray](Data.md#unsafearray)
- [unsafeStruct](Data.md#unsafestruct)

## Other

### case

▸ **case**<`A`\>(): [`Constructor`](../interfaces/Data.Case.Constructor.md)<`A`, `never`\>

#### Type parameters

| Name | Type                                           |
| :--- | :--------------------------------------------- |
| `A`  | extends [`Case`](../interfaces/Data.Case-1.md) |

#### Returns

[`Constructor`](../interfaces/Data.Case.Constructor.md)<`A`, `never`\>

## constructors

### Class

• `Const` **Class**: <A\>(`args`: `Types.Equals`<`Omit`<`A`, keyof [`Equal`](../interfaces/Equal.Equal.md)\>, {}\> extends `true` ? `void` : `Omit`<`A`, keyof [`Equal`](../interfaces/Equal.Equal.md)\>) => [`Data`](Data.md#data)<`A`\>

#### Type declaration

• <`A`\>(`args`)

Provides a constructor for a Case Class.

##### Type parameters

| Name | Type                               |
| :--- | :--------------------------------- |
| `A`  | extends `Record`<`string`, `any`\> |

##### Parameters

| Name   | Type                                                                                                                                                                   |
| :----- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `args` | `Types.Equals`<`Omit`<`A`, keyof [`Equal`](../interfaces/Equal.Equal.md)\>, {}\> extends `true` ? `void` : `Omit`<`A`, keyof [`Equal`](../interfaces/Equal.Equal.md)\> |

**`Since`**

2.0.0

---

### Error

• `Const` **Error**: <A\>(`args`: `Types.Equals`<`Omit`<`A`, keyof [`Equal`](../interfaces/Equal.Equal.md)\>, {}\> extends `true` ? `void` : `Omit`<`A`, keyof [`Equal`](../interfaces/Equal.Equal.md)\>) => [`YieldableError`](../interfaces/Data.YieldableError.md) & `A`

#### Type declaration

• <`A`\>(`args`)

Provides a constructor for a Case Class.

##### Type parameters

| Name | Type                               |
| :--- | :--------------------------------- |
| `A`  | extends `Record`<`string`, `any`\> |

##### Parameters

| Name   | Type                                                                                                                                                                   |
| :----- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `args` | `Types.Equals`<`Omit`<`A`, keyof [`Equal`](../interfaces/Equal.Equal.md)\>, {}\> extends `true` ? `void` : `Omit`<`A`, keyof [`Equal`](../interfaces/Equal.Equal.md)\> |

**`Since`**

2.0.0

---

### Structural

• `Const` **Structural**: <A\>(`args`: `Types.Equals`<`Omit`<`A`, keyof [`Equal`](../interfaces/Equal.Equal.md)\>, {}\> extends `true` ? `void` : `Omit`<`A`, keyof [`Equal`](../interfaces/Equal.Equal.md)\>) => [`Case`](../interfaces/Data.Case-1.md)

#### Type declaration

• <`A`\>(`args`)

##### Type parameters

| Name |
| :--- |
| `A`  |

##### Parameters

| Name   | Type                                                                                                                                                                   |
| :----- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `args` | `Types.Equals`<`Omit`<`A`, keyof [`Equal`](../interfaces/Equal.Equal.md)\>, {}\> extends `true` ? `void` : `Omit`<`A`, keyof [`Equal`](../interfaces/Equal.Equal.md)\> |

**`Since`**

2.0.0

---

### TaggedClass

▸ **TaggedClass**<`Tag`\>(`tag`): <A\>(`args`: `Equals`<`Omit`<`A`, keyof [`Equal`](../interfaces/Equal.Equal.md)\>, {}\> extends `true` ? `void` : `Omit`<`A`, keyof [`Equal`](../interfaces/Equal.Equal.md)\>) => [`Data`](Data.md#data)<`A` & { `_tag`: `Tag` }\>

Provides a Tagged constructor for a Case Class.

#### Type parameters

| Name  | Type             |
| :---- | :--------------- |
| `Tag` | extends `string` |

#### Parameters

| Name  | Type  |
| :---- | :---- |
| `tag` | `Tag` |

#### Returns

`fn`

• **new TaggedClass**<`A`\>(`args`)

##### Type parameters

| Name | Type                               |
| :--- | :--------------------------------- |
| `A`  | extends `Record`<`string`, `any`\> |

##### Parameters

| Name   | Type                                                                                                                                                             |
| :----- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `args` | `Equals`<`Omit`<`A`, keyof [`Equal`](../interfaces/Equal.Equal.md)\>, {}\> extends `true` ? `void` : `Omit`<`A`, keyof [`Equal`](../interfaces/Equal.Equal.md)\> |

**`Since`**

2.0.0

---

### TaggedError

▸ **TaggedError**<`Tag`\>(`tag`): <A\>(`args`: `Equals`<`Omit`<`A`, keyof [`Equal`](../interfaces/Equal.Equal.md)\>, {}\> extends `true` ? `void` : `Omit`<`A`, keyof [`Equal`](../interfaces/Equal.Equal.md)\>) => [`YieldableError`](../interfaces/Data.YieldableError.md) & { `_tag`: `Tag` } & `A`

#### Type parameters

| Name  | Type             |
| :---- | :--------------- |
| `Tag` | extends `string` |

#### Parameters

| Name  | Type  |
| :---- | :---- |
| `tag` | `Tag` |

#### Returns

`fn`

• **new TaggedError**<`A`\>(`args`)

##### Type parameters

| Name | Type                               |
| :--- | :--------------------------------- |
| `A`  | extends `Record`<`string`, `any`\> |

##### Parameters

| Name   | Type                                                                                                                                                             |
| :----- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `args` | `Equals`<`Omit`<`A`, keyof [`Equal`](../interfaces/Equal.Equal.md)\>, {}\> extends `true` ? `void` : `Omit`<`A`, keyof [`Equal`](../interfaces/Equal.Equal.md)\> |

**`Since`**

2.0.0

---

### array

▸ **array**<`As`\>(`as`): [`Data`](Data.md#data)<`As`\>

#### Type parameters

| Name | Type                     |
| :--- | :----------------------- |
| `As` | extends readonly `any`[] |

#### Parameters

| Name | Type |
| :--- | :--- |
| `as` | `As` |

#### Returns

[`Data`](Data.md#data)<`As`\>

**`Since`**

2.0.0

---

### struct

▸ **struct**<`As`\>(`as`): [`Data`](Data.md#data)<`As`\>

#### Type parameters

| Name | Type                                            |
| :--- | :---------------------------------------------- |
| `As` | extends `Readonly`<`Record`<`string`, `any`\>\> |

#### Parameters

| Name | Type |
| :--- | :--- |
| `as` | `As` |

#### Returns

[`Data`](Data.md#data)<`As`\>

**`Since`**

2.0.0

---

### tagged

▸ **tagged**<`A`\>(`tag`): [`Constructor`](../interfaces/Data.Case.Constructor.md)<`A`, `"_tag"`\>

Provides a tagged constructor for the specified `Case`.

#### Type parameters

| Name | Type                                                                  |
| :--- | :-------------------------------------------------------------------- |
| `A`  | extends [`Case`](../interfaces/Data.Case-1.md) & { `_tag`: `string` } |

#### Parameters

| Name  | Type          |
| :---- | :------------ |
| `tag` | `A`[`"_tag"`] |

#### Returns

[`Constructor`](../interfaces/Data.Case.Constructor.md)<`A`, `"_tag"`\>

**`Since`**

2.0.0

---

### taggedEnum

▸ **taggedEnum**<`Z`\>(): <K\>(`tag`: `K`) => <A\>(`args`: [`Args`](Data.TaggedEnum.md#args)<[`Kind`](Data.TaggedEnum.md#kind)<`Z`, `A`, `unknown`, `unknown`, `unknown`\>, `K`\>) => `Extract`<[`Kind`](Data.TaggedEnum.md#kind)<`Z`, `A`, `unknown`, `unknown`, `unknown`\>, { `_tag`: `K` }\>

Create a constructor for a tagged union of `Data` structs.

You can also pass a `TaggedEnum.WithGenerics` if you want to add generics to
the constructor.

#### Type parameters

| Name | Type                                                                          |
| :--- | :---------------------------------------------------------------------------- |
| `Z`  | extends [`WithGenerics`](../interfaces/Data.TaggedEnum.WithGenerics.md)<`1`\> |

#### Returns

`fn`

▸ <`K`\>(`tag`): <A\>(`args`: [`Args`](Data.TaggedEnum.md#args)<[`Kind`](Data.TaggedEnum.md#kind)<`Z`, `A`, `unknown`, `unknown`, `unknown`\>, `K`\>) => `Extract`<[`Kind`](Data.TaggedEnum.md#kind)<`Z`, `A`, `unknown`, `unknown`, `unknown`\>, { `_tag`: `K` }\>

##### Type parameters

| Name | Type             |
| :--- | :--------------- |
| `K`  | extends `string` |

##### Parameters

| Name  | Type |
| :---- | :--- |
| `tag` | `K`  |

##### Returns

`fn`

▸ <`A`\>(`args`): `Extract`<[`Kind`](Data.TaggedEnum.md#kind)<`Z`, `A`, `unknown`, `unknown`, `unknown`\>, { `_tag`: `K` }\>

##### Type parameters

| Name |
| :--- |
| `A`  |

##### Parameters

| Name   | Type                                                                                                                   |
| :----- | :--------------------------------------------------------------------------------------------------------------------- |
| `args` | [`Args`](Data.TaggedEnum.md#args)<[`Kind`](Data.TaggedEnum.md#kind)<`Z`, `A`, `unknown`, `unknown`, `unknown`\>, `K`\> |

##### Returns

`Extract`<[`Kind`](Data.TaggedEnum.md#kind)<`Z`, `A`, `unknown`, `unknown`, `unknown`\>, { `_tag`: `K` }\>

**`Example`**

```ts
import * as Data from "effect/Data";

const HttpError = Data.taggedEnum<
    | Data.Data<{ _tag: "BadRequest"; status: 400; message: string }>
    | Data.Data<{ _tag: "NotFound"; status: 404; message: string }>
>();

const notFound = HttpError("NotFound")({ status: 404, message: "Not Found" });
```

**`Example`**

```ts
import * as Data from "effect/Data";

type MyResult<E, A> = Data.TaggedEnum<{
    Failure: { error: E };
    Success: { value: A };
}>;
interface MyResultDefinition extends Data.TaggedEnum.WithGenerics<2> {
    readonly taggedEnum: MyResult<this["A"], this["B"]>;
}
const MyResult = Data.taggedEnum<MyResultDefinition>();

const success = MyResult("Success")({ value: 1 });
```

**`Since`**

2.0.0

▸ **taggedEnum**<`Z`\>(): <K\>(`tag`: `K`) => <A, B\>(`args`: [`Args`](Data.TaggedEnum.md#args)<[`Kind`](Data.TaggedEnum.md#kind)<`Z`, `A`, `B`, `unknown`, `unknown`\>, `K`\>) => `Extract`<[`Kind`](Data.TaggedEnum.md#kind)<`Z`, `A`, `B`, `unknown`, `unknown`\>, { `_tag`: `K` }\>

Create a constructor for a tagged union of `Data` structs.

You can also pass a `TaggedEnum.WithGenerics` if you want to add generics to
the constructor.

#### Type parameters

| Name | Type                                                                          |
| :--- | :---------------------------------------------------------------------------- |
| `Z`  | extends [`WithGenerics`](../interfaces/Data.TaggedEnum.WithGenerics.md)<`2`\> |

#### Returns

`fn`

▸ <`K`\>(`tag`): <A, B\>(`args`: [`Args`](Data.TaggedEnum.md#args)<[`Kind`](Data.TaggedEnum.md#kind)<`Z`, `A`, `B`, `unknown`, `unknown`\>, `K`\>) => `Extract`<[`Kind`](Data.TaggedEnum.md#kind)<`Z`, `A`, `B`, `unknown`, `unknown`\>, { `_tag`: `K` }\>

##### Type parameters

| Name | Type             |
| :--- | :--------------- |
| `K`  | extends `string` |

##### Parameters

| Name  | Type |
| :---- | :--- |
| `tag` | `K`  |

##### Returns

`fn`

▸ <`A`, `B`\>(`args`): `Extract`<[`Kind`](Data.TaggedEnum.md#kind)<`Z`, `A`, `B`, `unknown`, `unknown`\>, { `_tag`: `K` }\>

##### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |

##### Parameters

| Name   | Type                                                                                                             |
| :----- | :--------------------------------------------------------------------------------------------------------------- |
| `args` | [`Args`](Data.TaggedEnum.md#args)<[`Kind`](Data.TaggedEnum.md#kind)<`Z`, `A`, `B`, `unknown`, `unknown`\>, `K`\> |

##### Returns

`Extract`<[`Kind`](Data.TaggedEnum.md#kind)<`Z`, `A`, `B`, `unknown`, `unknown`\>, { `_tag`: `K` }\>

**`Example`**

```ts
import * as Data from "effect/Data";

const HttpError = Data.taggedEnum<
    | Data.Data<{ _tag: "BadRequest"; status: 400; message: string }>
    | Data.Data<{ _tag: "NotFound"; status: 404; message: string }>
>();

const notFound = HttpError("NotFound")({ status: 404, message: "Not Found" });
```

**`Example`**

```ts
import * as Data from "effect/Data";

type MyResult<E, A> = Data.TaggedEnum<{
    Failure: { error: E };
    Success: { value: A };
}>;
interface MyResultDefinition extends Data.TaggedEnum.WithGenerics<2> {
    readonly taggedEnum: MyResult<this["A"], this["B"]>;
}
const MyResult = Data.taggedEnum<MyResultDefinition>();

const success = MyResult("Success")({ value: 1 });
```

**`Since`**

2.0.0

▸ **taggedEnum**<`Z`\>(): <K\>(`tag`: `K`) => <A, B, C\>(`args`: [`Args`](Data.TaggedEnum.md#args)<[`Kind`](Data.TaggedEnum.md#kind)<`Z`, `A`, `B`, `C`, `unknown`\>, `K`\>) => `Extract`<[`Kind`](Data.TaggedEnum.md#kind)<`Z`, `A`, `B`, `C`, `unknown`\>, { `_tag`: `K` }\>

Create a constructor for a tagged union of `Data` structs.

You can also pass a `TaggedEnum.WithGenerics` if you want to add generics to
the constructor.

#### Type parameters

| Name | Type                                                                          |
| :--- | :---------------------------------------------------------------------------- |
| `Z`  | extends [`WithGenerics`](../interfaces/Data.TaggedEnum.WithGenerics.md)<`3`\> |

#### Returns

`fn`

▸ <`K`\>(`tag`): <A, B, C\>(`args`: [`Args`](Data.TaggedEnum.md#args)<[`Kind`](Data.TaggedEnum.md#kind)<`Z`, `A`, `B`, `C`, `unknown`\>, `K`\>) => `Extract`<[`Kind`](Data.TaggedEnum.md#kind)<`Z`, `A`, `B`, `C`, `unknown`\>, { `_tag`: `K` }\>

##### Type parameters

| Name | Type             |
| :--- | :--------------- |
| `K`  | extends `string` |

##### Parameters

| Name  | Type |
| :---- | :--- |
| `tag` | `K`  |

##### Returns

`fn`

▸ <`A`, `B`, `C`\>(`args`): `Extract`<[`Kind`](Data.TaggedEnum.md#kind)<`Z`, `A`, `B`, `C`, `unknown`\>, { `_tag`: `K` }\>

##### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |
| `C`  |

##### Parameters

| Name   | Type                                                                                                       |
| :----- | :--------------------------------------------------------------------------------------------------------- |
| `args` | [`Args`](Data.TaggedEnum.md#args)<[`Kind`](Data.TaggedEnum.md#kind)<`Z`, `A`, `B`, `C`, `unknown`\>, `K`\> |

##### Returns

`Extract`<[`Kind`](Data.TaggedEnum.md#kind)<`Z`, `A`, `B`, `C`, `unknown`\>, { `_tag`: `K` }\>

**`Example`**

```ts
import * as Data from "effect/Data";

const HttpError = Data.taggedEnum<
    | Data.Data<{ _tag: "BadRequest"; status: 400; message: string }>
    | Data.Data<{ _tag: "NotFound"; status: 404; message: string }>
>();

const notFound = HttpError("NotFound")({ status: 404, message: "Not Found" });
```

**`Example`**

```ts
import * as Data from "effect/Data";

type MyResult<E, A> = Data.TaggedEnum<{
    Failure: { error: E };
    Success: { value: A };
}>;
interface MyResultDefinition extends Data.TaggedEnum.WithGenerics<2> {
    readonly taggedEnum: MyResult<this["A"], this["B"]>;
}
const MyResult = Data.taggedEnum<MyResultDefinition>();

const success = MyResult("Success")({ value: 1 });
```

**`Since`**

2.0.0

▸ **taggedEnum**<`Z`\>(): <K\>(`tag`: `K`) => <A, B, C, D\>(`args`: [`Args`](Data.TaggedEnum.md#args)<[`Kind`](Data.TaggedEnum.md#kind)<`Z`, `A`, `B`, `C`, `D`\>, `K`\>) => `Extract`<[`Kind`](Data.TaggedEnum.md#kind)<`Z`, `A`, `B`, `C`, `D`\>, { `_tag`: `K` }\>

Create a constructor for a tagged union of `Data` structs.

You can also pass a `TaggedEnum.WithGenerics` if you want to add generics to
the constructor.

#### Type parameters

| Name | Type                                                                          |
| :--- | :---------------------------------------------------------------------------- |
| `Z`  | extends [`WithGenerics`](../interfaces/Data.TaggedEnum.WithGenerics.md)<`4`\> |

#### Returns

`fn`

▸ <`K`\>(`tag`): <A, B, C, D\>(`args`: [`Args`](Data.TaggedEnum.md#args)<[`Kind`](Data.TaggedEnum.md#kind)<`Z`, `A`, `B`, `C`, `D`\>, `K`\>) => `Extract`<[`Kind`](Data.TaggedEnum.md#kind)<`Z`, `A`, `B`, `C`, `D`\>, { `_tag`: `K` }\>

##### Type parameters

| Name | Type             |
| :--- | :--------------- |
| `K`  | extends `string` |

##### Parameters

| Name  | Type |
| :---- | :--- |
| `tag` | `K`  |

##### Returns

`fn`

▸ <`A`, `B`, `C`, `D`\>(`args`): `Extract`<[`Kind`](Data.TaggedEnum.md#kind)<`Z`, `A`, `B`, `C`, `D`\>, { `_tag`: `K` }\>

##### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |
| `C`  |
| `D`  |

##### Parameters

| Name   | Type                                                                                                 |
| :----- | :--------------------------------------------------------------------------------------------------- |
| `args` | [`Args`](Data.TaggedEnum.md#args)<[`Kind`](Data.TaggedEnum.md#kind)<`Z`, `A`, `B`, `C`, `D`\>, `K`\> |

##### Returns

`Extract`<[`Kind`](Data.TaggedEnum.md#kind)<`Z`, `A`, `B`, `C`, `D`\>, { `_tag`: `K` }\>

**`Example`**

```ts
import * as Data from "effect/Data";

const HttpError = Data.taggedEnum<
    | Data.Data<{ _tag: "BadRequest"; status: 400; message: string }>
    | Data.Data<{ _tag: "NotFound"; status: 404; message: string }>
>();

const notFound = HttpError("NotFound")({ status: 404, message: "Not Found" });
```

**`Example`**

```ts
import * as Data from "effect/Data";

type MyResult<E, A> = Data.TaggedEnum<{
    Failure: { error: E };
    Success: { value: A };
}>;
interface MyResultDefinition extends Data.TaggedEnum.WithGenerics<2> {
    readonly taggedEnum: MyResult<this["A"], this["B"]>;
}
const MyResult = Data.taggedEnum<MyResultDefinition>();

const success = MyResult("Success")({ value: 1 });
```

**`Since`**

2.0.0

▸ **taggedEnum**<`A`\>(): <K\>(`tag`: `K`) => [`Constructor`](../interfaces/Data.Case.Constructor.md)<`Extract`<`A`, { `_tag`: `K` }\>, `"_tag"`\>

Create a constructor for a tagged union of `Data` structs.

You can also pass a `TaggedEnum.WithGenerics` if you want to add generics to
the constructor.

#### Type parameters

| Name | Type                                                  |
| :--- | :---------------------------------------------------- |
| `A`  | extends [`Data`](Data.md#data)<{ `_tag`: `string` }\> |

#### Returns

`fn`

▸ <`K`\>(`tag`): [`Constructor`](../interfaces/Data.Case.Constructor.md)<`Extract`<`A`, { `_tag`: `K` }\>, `"_tag"`\>

##### Type parameters

| Name | Type             |
| :--- | :--------------- |
| `K`  | extends `string` |

##### Parameters

| Name  | Type |
| :---- | :--- |
| `tag` | `K`  |

##### Returns

[`Constructor`](../interfaces/Data.Case.Constructor.md)<`Extract`<`A`, { `_tag`: `K` }\>, `"_tag"`\>

**`Example`**

```ts
import * as Data from "effect/Data";

const HttpError = Data.taggedEnum<
    | Data.Data<{ _tag: "BadRequest"; status: 400; message: string }>
    | Data.Data<{ _tag: "NotFound"; status: 404; message: string }>
>();

const notFound = HttpError("NotFound")({ status: 404, message: "Not Found" });
```

**`Example`**

```ts
import * as Data from "effect/Data";

type MyResult<E, A> = Data.TaggedEnum<{
    Failure: { error: E };
    Success: { value: A };
}>;
interface MyResultDefinition extends Data.TaggedEnum.WithGenerics<2> {
    readonly taggedEnum: MyResult<this["A"], this["B"]>;
}
const MyResult = Data.taggedEnum<MyResultDefinition>();

const success = MyResult("Success")({ value: 1 });
```

**`Since`**

2.0.0

---

### tuple

▸ **tuple**<`As`\>(`...as`): [`Data`](Data.md#data)<`As`\>

#### Type parameters

| Name | Type                     |
| :--- | :----------------------- |
| `As` | extends readonly `any`[] |

#### Parameters

| Name    | Type |
| :------ | :--- |
| `...as` | `As` |

#### Returns

[`Data`](Data.md#data)<`As`\>

**`Since`**

2.0.0

---

### unsafeArray

▸ **unsafeArray**<`As`\>(`as`): [`Data`](Data.md#data)<`As`\>

#### Type parameters

| Name | Type                     |
| :--- | :----------------------- |
| `As` | extends readonly `any`[] |

#### Parameters

| Name | Type |
| :--- | :--- |
| `as` | `As` |

#### Returns

[`Data`](Data.md#data)<`As`\>

**`Since`**

2.0.0

---

### unsafeStruct

▸ **unsafeStruct**<`As`\>(`as`): [`Data`](Data.md#data)<`As`\>

#### Type parameters

| Name | Type                                            |
| :--- | :---------------------------------------------- |
| `As` | extends `Readonly`<`Record`<`string`, `any`\>\> |

#### Parameters

| Name | Type |
| :--- | :--- |
| `as` | `As` |

#### Returns

[`Data`](Data.md#data)<`As`\>

**`Since`**

2.0.0

## models

### Data

Ƭ **Data**<`A`\>: `Readonly`<`A`\> & [`Equal`](../interfaces/Equal.Equal.md)

**`Since`**

2.0.0

#### Type parameters

| Name | Type                                                                       |
| :--- | :------------------------------------------------------------------------- |
| `A`  | extends `Readonly`<`Record`<`string`, `any`\>\> \| `ReadonlyArray`<`any`\> |

---

### TaggedEnum

Ƭ **TaggedEnum**<`A`\>: { readonly [Tag in keyof A]: Data<Readonly<Types.Simplify<A[Tag] & Object\>\>\> }[keyof `A`]

Create a tagged enum data type, which is a union of `Data` structs.

```ts
import * as Data from "effect/Data";

type HttpError = Data.TaggedEnum<{
    BadRequest: { status: 400; message: string };
    NotFound: { status: 404; message: string };
}>;

// Equivalent to:
type HttpErrorPlain =
    | Data.Data<{
        readonly _tag: "BadRequest";
        readonly status: 400;
        readonly message: string;
    }>
    | Data.Data<{
        readonly _tag: "NotFound";
        readonly status: 404;
        readonly message: string;
    }>;
```

**`Since`**

2.0.0

#### Type parameters

| Name | Type                                                    |
| :--- | :------------------------------------------------------ |
| `A`  | extends `Record`<`string`, `Record`<`string`, `any`\>\> |
