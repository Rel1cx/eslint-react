[@eslint-react/tools](../README.md) / Data

# Namespace: Data

## Table of contents

### Namespaces

- [Case](Data.Case.md)
- [TaggedEnum](Data.TaggedEnum.md)

### Interfaces

- [Case](../interfaces/Data.Case-1.md)

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

▸ **case**\<`A`\>(): [`Constructor`](../interfaces/Data.Case.Constructor.md)\<`A`, `never`\>

#### Type parameters

| Name | Type                                           |
| :--- | :--------------------------------------------- |
| `A`  | extends [`Case`](../interfaces/Data.Case-1.md) |

#### Returns

[`Constructor`](../interfaces/Data.Case.Constructor.md)\<`A`, `never`\>

## constructors

### Class

• `Const` **Class**: \<A\>(`args`: `Types.Equals`\<`Omit`\<`A`, keyof [`Equal`](../interfaces/Equal.Equal.md)\>, {}\> extends `true` ? `void` : \{ readonly [P in keyof A as P extends keyof Equal ? never : P]: A[P] }) => [`Data`](Data.md#data)\<`Readonly`\<`A`\>\>

#### Type declaration

• \<`A`\>(`args`): [`Data`](Data.md#data)\<`Readonly`\<`A`\>\>

Provides a constructor for a Case Class.

##### Type parameters

| Name | Type                                     |
| :--- | :--------------------------------------- |
| `A`  | extends `Record`\<`string`, `any`\> = {} |

##### Parameters

| Name   | Type                                                                                                                                                                                 |
| :----- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `args` | `Types.Equals`\<`Omit`\<`A`, keyof [`Equal`](../interfaces/Equal.Equal.md)\>, {}\> extends `true` ? `void` : \{ readonly [P in keyof A as P extends keyof Equal ? never : P]: A[P] } |

##### Returns

[`Data`](Data.md#data)\<`Readonly`\<`A`\>\>

**`Example`**

```ts
import * as Data from "effect/Data";
import * as Equal from "effect/Equal";

class Person extends Data.Class<{ readonly name: string }> {}

// Creating instances of Person
const mike1 = new Person({ name: "Mike" });
const mike2 = new Person({ name: "Mike" });
const john = new Person({ name: "John" });

// Checking equality
assert.deepStrictEqual(Equal.equals(mike1, mike2), true);
assert.deepStrictEqual(Equal.equals(mike1, john), false);
```

**`Since`**

2.0.0

---

### Error

• `Const` **Error**: \<A\>(`args`: `Types.Equals`\<`Omit`\<`A`, keyof [`Equal`](../interfaces/Equal.Equal.md)\>, {}\> extends `true` ? `void` : \{ readonly [P in keyof A as P extends keyof Equal ? never : P]: A[P] }) => `Cause.YieldableError` & `Readonly`\<`A`\>

#### Type declaration

• \<`A`\>(`args`): `Cause.YieldableError` & `Readonly`\<`A`\>

Provides a constructor for a Case Class.

##### Type parameters

| Name | Type                                     |
| :--- | :--------------------------------------- |
| `A`  | extends `Record`\<`string`, `any`\> = {} |

##### Parameters

| Name   | Type                                                                                                                                                                                 |
| :----- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `args` | `Types.Equals`\<`Omit`\<`A`, keyof [`Equal`](../interfaces/Equal.Equal.md)\>, {}\> extends `true` ? `void` : \{ readonly [P in keyof A as P extends keyof Equal ? never : P]: A[P] } |

##### Returns

`Cause.YieldableError` & `Readonly`\<`A`\>

**`Since`**

2.0.0

---

### Structural

• `Const` **Structural**: \<A\>(`args`: `Types.Equals`\<`Omit`\<`A`, keyof [`Equal`](../interfaces/Equal.Equal.md)\>, {}\> extends `true` ? `void` : \{ readonly [P in keyof A as P extends keyof Equal ? never : P]: A[P] }) => [`Case`](../interfaces/Data.Case-1.md)

#### Type declaration

• \<`A`\>(`args`): [`Case`](../interfaces/Data.Case-1.md)

##### Type parameters

| Name |
| :--- |
| `A`  |

##### Parameters

| Name   | Type                                                                                                                                                                                 |
| :----- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `args` | `Types.Equals`\<`Omit`\<`A`, keyof [`Equal`](../interfaces/Equal.Equal.md)\>, {}\> extends `true` ? `void` : \{ readonly [P in keyof A as P extends keyof Equal ? never : P]: A[P] } |

##### Returns

[`Case`](../interfaces/Data.Case-1.md)

**`Since`**

2.0.0

---

### TaggedClass

▸ **TaggedClass**\<`Tag`\>(`tag`): \<A\>(`args`: `Equals`\<`Omit`\<`A`, keyof [`Equal`](../interfaces/Equal.Equal.md)\>, {}\> extends `true` ? `void` : \{ readonly [P in string \| number \| symbol as P extends keyof Equal \| "\_tag" ? never : P]: A[P] }) => [`Data`](Data.md#data)\<`Readonly`\<`A`\> & \{ `_tag`: `Tag` }\>

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

• **new TaggedClass**\<`A`\>(`args`): [`Data`](Data.md#data)\<`Readonly`\<`A`\> & \{ `_tag`: `Tag` }\>

##### Type parameters

| Name | Type                                     |
| :--- | :--------------------------------------- |
| `A`  | extends `Record`\<`string`, `any`\> = {} |

##### Parameters

| Name   | Type                                                                                                                                                                                                         |
| :----- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `args` | `Equals`\<`Omit`\<`A`, keyof [`Equal`](../interfaces/Equal.Equal.md)\>, {}\> extends `true` ? `void` : \{ readonly [P in string \| number \| symbol as P extends keyof Equal \| "\_tag" ? never : P]: A[P] } |

##### Returns

[`Data`](Data.md#data)\<`Readonly`\<`A`\> & \{ `_tag`: `Tag` }\>

**`Example`**

```ts
import * as Data from "effect/Data";
import * as Equal from "effect/Equal";

class Person extends Data.TaggedClass("Person")<{ readonly name: string }> {}

// Creating instances of Person
const mike1 = new Person({ name: "Mike" });
const mike2 = new Person({ name: "Mike" });
const john = new Person({ name: "John" });

// Checking equality
assert.deepStrictEqual(Equal.equals(mike1, mike2), true);
assert.deepStrictEqual(Equal.equals(mike1, john), false);

assert.deepStrictEqual(mike1._tag, "Person");
```

**`Since`**

2.0.0

---

### TaggedError

▸ **TaggedError**\<`Tag`\>(`tag`): \<A\>(`args`: `Equals`\<`Omit`\<`A`, keyof [`Equal`](../interfaces/Equal.Equal.md)\>, {}\> extends `true` ? `void` : \{ readonly [P in string \| number \| symbol as P extends keyof Equal \| "\_tag" ? never : P]: A[P] }) => `YieldableError` & \{ `_tag`: `Tag` } & `Readonly`\<`A`\>

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

• **new TaggedError**\<`A`\>(`args`): `YieldableError` & \{ `_tag`: `Tag` } & `Readonly`\<`A`\>

##### Type parameters

| Name | Type                                     |
| :--- | :--------------------------------------- |
| `A`  | extends `Record`\<`string`, `any`\> = {} |

##### Parameters

| Name   | Type                                                                                                                                                                                                         |
| :----- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `args` | `Equals`\<`Omit`\<`A`, keyof [`Equal`](../interfaces/Equal.Equal.md)\>, {}\> extends `true` ? `void` : \{ readonly [P in string \| number \| symbol as P extends keyof Equal \| "\_tag" ? never : P]: A[P] } |

##### Returns

`YieldableError` & \{ `_tag`: `Tag` } & `Readonly`\<`A`\>

**`Since`**

2.0.0

---

### array

▸ **array**\<`As`\>(`as`): [`Data`](Data.md#data)\<`Readonly`\<`As`\>\>

#### Type parameters

| Name | Type                     |
| :--- | :----------------------- |
| `As` | extends readonly `any`[] |

#### Parameters

| Name | Type |
| :--- | :--- |
| `as` | `As` |

#### Returns

[`Data`](Data.md#data)\<`Readonly`\<`As`\>\>

**`Example`**

```ts
import * as Data from "effect/Data";
import * as Equal from "effect/Equal";

const alice = Data.struct({ name: "Alice", age: 30 });
const bob = Data.struct({ name: "Bob", age: 40 });

const persons = Data.array([alice, bob]);

assert.deepStrictEqual(
  Equal.equals(
    persons,
    Data.array([
      Data.struct({ name: "Alice", age: 30 }),
      Data.struct({ name: "Bob", age: 40 }),
    ]),
  ),
  true,
);
```

**`Since`**

2.0.0

---

### struct

▸ **struct**\<`A`\>(`a`): [`Data`](Data.md#data)\<\{ readonly [P in string \| number \| symbol]: A[P] }\>

#### Type parameters

| Name | Type                                |
| :--- | :---------------------------------- |
| `A`  | extends `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :--- | :--- |
| `a`  | `A`  |

#### Returns

[`Data`](Data.md#data)\<\{ readonly [P in string \| number \| symbol]: A[P] }\>

**`Example`**

```ts
import * as Data from "effect/Data";
import * as Equal from "effect/Equal";

const alice = Data.struct({ name: "Alice", age: 30 });

const bob = Data.struct({ name: "Bob", age: 40 });

assert.deepStrictEqual(Equal.equals(alice, alice), true);
assert.deepStrictEqual(Equal.equals(alice, Data.struct({ name: "Alice", age: 30 })), true);

assert.deepStrictEqual(Equal.equals(alice, { name: "Alice", age: 30 }), false);
assert.deepStrictEqual(Equal.equals(alice, bob), false);
```

**`Since`**

2.0.0

---

### tagged

▸ **tagged**\<`A`\>(`tag`): [`Constructor`](../interfaces/Data.Case.Constructor.md)\<`A`, `"_tag"`\>

Provides a tagged constructor for the specified `Case`.

#### Type parameters

| Name | Type                                                                   |
| :--- | :--------------------------------------------------------------------- |
| `A`  | extends [`Case`](../interfaces/Data.Case-1.md) & \{ `_tag`: `string` } |

#### Parameters

| Name  | Type          |
| :---- | :------------ |
| `tag` | `A`[`"_tag"`] |

#### Returns

[`Constructor`](../interfaces/Data.Case.Constructor.md)\<`A`, `"_tag"`\>

**`Example`**

```ts
import * as Data from "effect/Data";

interface Person extends Data.Case {
  readonly _tag: "Person"; // the tag
  readonly name: string;
}

const Person = Data.tagged<Person>("Person");

const mike = Person({ name: "Mike" });

assert.deepEqual(mike, { _tag: "Person", name: "Mike" });
```

**`Since`**

2.0.0

---

### taggedEnum

▸ **taggedEnum**\<`Z`\>(): \{ readonly [Tag in string]: Function }

Create a constructor for a tagged union of `Data` structs.

You can also pass a `TaggedEnum.WithGenerics` if you want to add generics to
the constructor.

#### Type parameters

| Name | Type                                                                           |
| :--- | :----------------------------------------------------------------------------- |
| `Z`  | extends [`WithGenerics`](../interfaces/Data.TaggedEnum.WithGenerics.md)\<`1`\> |

#### Returns

\{ readonly [Tag in string]: Function }

**`Example`**

```ts
import * as Data from "effect/Data";

const { BadRequest, NotFound } = Data.taggedEnum<
  | Data.Data<{ readonly _tag: "BadRequest"; readonly status: 400; readonly message: string }>
  | Data.Data<{ readonly _tag: "NotFound"; readonly status: 404; readonly message: string }>
>();

const notFound = NotFound({ status: 404, message: "Not Found" });
```

**`Example`**

```ts
import * as Data from "effect/Data";

type MyResult<E, A> = Data.TaggedEnum<{
  Failure: { readonly error: E };
  Success: { readonly value: A };
}>;
interface MyResultDefinition extends Data.TaggedEnum.WithGenerics<2> {
  readonly taggedEnum: MyResult<this["A"], this["B"]>;
}
const { Failure, Success } = Data.taggedEnum<MyResultDefinition>();

const success = Success({ value: 1 });
```

**`Since`**

2.0.0

▸ **taggedEnum**\<`Z`\>(): \{ readonly [Tag in string]: Function }

Create a constructor for a tagged union of `Data` structs.

You can also pass a `TaggedEnum.WithGenerics` if you want to add generics to
the constructor.

#### Type parameters

| Name | Type                                                                           |
| :--- | :----------------------------------------------------------------------------- |
| `Z`  | extends [`WithGenerics`](../interfaces/Data.TaggedEnum.WithGenerics.md)\<`2`\> |

#### Returns

\{ readonly [Tag in string]: Function }

**`Example`**

```ts
import * as Data from "effect/Data";

const { BadRequest, NotFound } = Data.taggedEnum<
  | Data.Data<{ readonly _tag: "BadRequest"; readonly status: 400; readonly message: string }>
  | Data.Data<{ readonly _tag: "NotFound"; readonly status: 404; readonly message: string }>
>();

const notFound = NotFound({ status: 404, message: "Not Found" });
```

**`Example`**

```ts
import * as Data from "effect/Data";

type MyResult<E, A> = Data.TaggedEnum<{
  Failure: { readonly error: E };
  Success: { readonly value: A };
}>;
interface MyResultDefinition extends Data.TaggedEnum.WithGenerics<2> {
  readonly taggedEnum: MyResult<this["A"], this["B"]>;
}
const { Failure, Success } = Data.taggedEnum<MyResultDefinition>();

const success = Success({ value: 1 });
```

**`Since`**

2.0.0

▸ **taggedEnum**\<`Z`\>(): \{ readonly [Tag in string]: Function }

Create a constructor for a tagged union of `Data` structs.

You can also pass a `TaggedEnum.WithGenerics` if you want to add generics to
the constructor.

#### Type parameters

| Name | Type                                                                           |
| :--- | :----------------------------------------------------------------------------- |
| `Z`  | extends [`WithGenerics`](../interfaces/Data.TaggedEnum.WithGenerics.md)\<`3`\> |

#### Returns

\{ readonly [Tag in string]: Function }

**`Example`**

```ts
import * as Data from "effect/Data";

const { BadRequest, NotFound } = Data.taggedEnum<
  | Data.Data<{ readonly _tag: "BadRequest"; readonly status: 400; readonly message: string }>
  | Data.Data<{ readonly _tag: "NotFound"; readonly status: 404; readonly message: string }>
>();

const notFound = NotFound({ status: 404, message: "Not Found" });
```

**`Example`**

```ts
import * as Data from "effect/Data";

type MyResult<E, A> = Data.TaggedEnum<{
  Failure: { readonly error: E };
  Success: { readonly value: A };
}>;
interface MyResultDefinition extends Data.TaggedEnum.WithGenerics<2> {
  readonly taggedEnum: MyResult<this["A"], this["B"]>;
}
const { Failure, Success } = Data.taggedEnum<MyResultDefinition>();

const success = Success({ value: 1 });
```

**`Since`**

2.0.0

▸ **taggedEnum**\<`Z`\>(): \{ readonly [Tag in string]: Function }

Create a constructor for a tagged union of `Data` structs.

You can also pass a `TaggedEnum.WithGenerics` if you want to add generics to
the constructor.

#### Type parameters

| Name | Type                                                                           |
| :--- | :----------------------------------------------------------------------------- |
| `Z`  | extends [`WithGenerics`](../interfaces/Data.TaggedEnum.WithGenerics.md)\<`4`\> |

#### Returns

\{ readonly [Tag in string]: Function }

**`Example`**

```ts
import * as Data from "effect/Data";

const { BadRequest, NotFound } = Data.taggedEnum<
  | Data.Data<{ readonly _tag: "BadRequest"; readonly status: 400; readonly message: string }>
  | Data.Data<{ readonly _tag: "NotFound"; readonly status: 404; readonly message: string }>
>();

const notFound = NotFound({ status: 404, message: "Not Found" });
```

**`Example`**

```ts
import * as Data from "effect/Data";

type MyResult<E, A> = Data.TaggedEnum<{
  Failure: { readonly error: E };
  Success: { readonly value: A };
}>;
interface MyResultDefinition extends Data.TaggedEnum.WithGenerics<2> {
  readonly taggedEnum: MyResult<this["A"], this["B"]>;
}
const { Failure, Success } = Data.taggedEnum<MyResultDefinition>();

const success = Success({ value: 1 });
```

**`Since`**

2.0.0

▸ **taggedEnum**\<`A`\>(): \{ readonly [Tag in string]: Constructor\<Extract\<A, Object\>, "\_tag"\> }

Create a constructor for a tagged union of `Data` structs.

You can also pass a `TaggedEnum.WithGenerics` if you want to add generics to
the constructor.

#### Type parameters

| Name | Type                                                                    |
| :--- | :---------------------------------------------------------------------- |
| `A`  | extends \{ `_tag`: `string` } & [`Equal`](../interfaces/Equal.Equal.md) |

#### Returns

\{ readonly [Tag in string]: Constructor\<Extract\<A, Object\>, "\_tag"\> }

**`Example`**

```ts
import * as Data from "effect/Data";

const { BadRequest, NotFound } = Data.taggedEnum<
  | Data.Data<{ readonly _tag: "BadRequest"; readonly status: 400; readonly message: string }>
  | Data.Data<{ readonly _tag: "NotFound"; readonly status: 404; readonly message: string }>
>();

const notFound = NotFound({ status: 404, message: "Not Found" });
```

**`Example`**

```ts
import * as Data from "effect/Data";

type MyResult<E, A> = Data.TaggedEnum<{
  Failure: { readonly error: E };
  Success: { readonly value: A };
}>;
interface MyResultDefinition extends Data.TaggedEnum.WithGenerics<2> {
  readonly taggedEnum: MyResult<this["A"], this["B"]>;
}
const { Failure, Success } = Data.taggedEnum<MyResultDefinition>();

const success = Success({ value: 1 });
```

**`Since`**

2.0.0

---

### tuple

▸ **tuple**\<`As`\>(`...as`): [`Data`](Data.md#data)\<`Readonly`\<`As`\>\>

#### Type parameters

| Name | Type                     |
| :--- | :----------------------- |
| `As` | extends readonly `any`[] |

#### Parameters

| Name    | Type |
| :------ | :--- |
| `...as` | `As` |

#### Returns

[`Data`](Data.md#data)\<`Readonly`\<`As`\>\>

**`Example`**

```ts
import * as Data from "effect/Data";
import * as Equal from "effect/Equal";

const alice = Data.tuple("Alice", 30);

const bob = Data.tuple("Bob", 40);

assert.deepStrictEqual(Equal.equals(alice, alice), true);
assert.deepStrictEqual(Equal.equals(alice, Data.tuple("Alice", 30)), true);

assert.deepStrictEqual(Equal.equals(alice, ["Alice", 30]), false);
assert.deepStrictEqual(Equal.equals(alice, bob), false);
```

**`Since`**

2.0.0

---

### unsafeArray

▸ **unsafeArray**\<`As`\>(`as`): [`Data`](Data.md#data)\<`Readonly`\<`As`\>\>

#### Type parameters

| Name | Type                     |
| :--- | :----------------------- |
| `As` | extends readonly `any`[] |

#### Parameters

| Name | Type |
| :--- | :--- |
| `as` | `As` |

#### Returns

[`Data`](Data.md#data)\<`Readonly`\<`As`\>\>

**`Since`**

2.0.0

---

### unsafeStruct

▸ **unsafeStruct**\<`A`\>(`as`): [`Data`](Data.md#data)\<\{ readonly [P in string \| number \| symbol]: A[P] }\>

#### Type parameters

| Name | Type                                |
| :--- | :---------------------------------- |
| `A`  | extends `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type |
| :--- | :--- |
| `as` | `A`  |

#### Returns

[`Data`](Data.md#data)\<\{ readonly [P in string \| number \| symbol]: A[P] }\>

**`Since`**

2.0.0

## models

### Data

Ƭ **Data**\<`A`\>: \{ readonly [P in keyof A]: A[P] } & [`Equal`](../interfaces/Equal.Equal.md)

**`Since`**

2.0.0

#### Type parameters

| Name |
| :--- |
| `A`  |

---

### TaggedEnum

Ƭ **TaggedEnum**\<`A`\>: keyof `A` extends infer Tag ? `Tag` extends keyof `A` ? [`Data`](Data.md#data)\<`Types.Simplify`\<\{ `_tag`: `Tag` } & \{ readonly [K in keyof A[Tag]]: A[Tag][K] }\>\> : `never` : `never`

Create a tagged enum data type, which is a union of `Data` structs.

```ts
import * as Data from "effect/Data";

type HttpError = Data.TaggedEnum<{
  BadRequest: { readonly status: 400; readonly message: string };
  NotFound: { readonly status: 404; readonly message: string };
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

| Name | Type                                                                                  |
| :--- | :------------------------------------------------------------------------------------ |
| `A`  | extends `Record`\<`string`, `Record`\<`string`, `any`\>\> & `UntaggedChildren`\<`A`\> |
