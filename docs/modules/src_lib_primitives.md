[eslint-plugin-react-ts](../README.md) / src/lib/primitives

# Module: src/lib/primitives

## Table of contents

### Namespaces

- [Data](src_lib_primitives.Data.md)
- [E](src_lib_primitives.E.md)
- [Equal](src_lib_primitives.Equal.md)
- [F](src_lib_primitives.F.md)
- [MutList](src_lib_primitives.MutList.md)
- [MutRef](src_lib_primitives.MutRef.md)
- [Num](src_lib_primitives.Num.md)
- [O](src_lib_primitives.O.md)
- [Rec](src_lib_primitives.Rec.md)
- [Str](src_lib_primitives.Str.md)

### Type Aliases

- [Enum](src_lib_primitives.md#enum)
- [Narrow](src_lib_primitives.md#narrow)
- [Remap](src_lib_primitives.md#remap)
- [UnionFromTuple](src_lib_primitives.md#unionfromtuple)
- [UnionToIntersection](src_lib_primitives.md#uniontointersection)

### Functions

- [Enum](src_lib_primitives.md#enum-1)
- [asConst](src_lib_primitives.md#asconst)
- [identity](src_lib_primitives.md#identity)
- [isBigint](src_lib_primitives.md#isbigint)
- [isBoolean](src_lib_primitives.md#isboolean)
- [isDate](src_lib_primitives.md#isdate)
- [isEmpty](src_lib_primitives.md#isempty)
- [isError](src_lib_primitives.md#iserror)
- [isFunction](src_lib_primitives.md#isfunction)
- [isIterable](src_lib_primitives.md#isiterable)
- [isKeyOfEnum](src_lib_primitives.md#iskeyofenum)
- [isNever](src_lib_primitives.md#isnever)
- [isNil](src_lib_primitives.md#isnil)
- [isNumber](src_lib_primitives.md#isnumber)
- [isObject](src_lib_primitives.md#isobject)
- [isReadonlyRecord](src_lib_primitives.md#isreadonlyrecord)
- [isRecord](src_lib_primitives.md#isrecord)
- [isString](src_lib_primitives.md#isstring)
- [isSymbol](src_lib_primitives.md#issymbol)
- [isTagged](src_lib_primitives.md#istagged)
- [isUnknown](src_lib_primitives.md#isunknown)
- [narrow](src_lib_primitives.md#narrow-1)
- [noop](src_lib_primitives.md#noop)

## Other

### Enum

Ƭ **Enum**<`T`\>: `T`[keyof `T`]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` |

___

### Narrow

Ƭ **Narrow**<`TType`\>: { [K in keyof TType]: Narrow<TType[K]\> } \| `TType` extends [] ? [] : `never` \| `TType` extends `Function` ? `TType` : `never` \| `TType` extends `bigint` \| `boolean` \| `number` \| `string` ? `TType` : `never`

Infers embedded primitive type of any type

**`Param`**

Type to infer

**`Example`**

```ts
type Result = Narrow<['foo', 'bar', 1]>
```

#### Type parameters

| Name |
| :------ |
| `TType` |

___

### Remap

Ƭ **Remap**<`T`\>: { [P in keyof T]: T[P] } & {}

#### Type parameters

| Name |
| :------ |
| `T` |

___

### UnionFromTuple

Ƭ **UnionFromTuple**<`T`\>: `T` extends infer U[] ? `U` : `never`

#### Type parameters

| Name |
| :------ |
| `T` |

___

### UnionToIntersection

Ƭ **UnionToIntersection**<`U`\>: `U` extends `any` ? (`k`: `U`) => `void` : `never` extends (`k`: infer I) => `void` ? `I` : `never`

#### Type parameters

| Name |
| :------ |
| `U` |

___

### Enum

▸ **Enum**<`T`\>(`...args`): `Readonly`<{ [P in string]: P }\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string`[] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `T` |

#### Returns

`Readonly`<{ [P in string]: P }\>

___

### asConst

▸ **asConst**<`T`\>(`a`): `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `T` |

#### Returns

`T`

___

### identity

▸ **identity**<`T`\>(`a`): `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `T` |

#### Returns

`T`

___

### isEmpty

▸ **isEmpty**<`T`\>(`x`): `boolean`

It returns `true` if `x` is `empty`.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `T` |

#### Returns

`boolean`

___

### isKeyOfEnum

▸ **isKeyOfEnum**<`T`\>(`e`, `value`): value is Enum<T\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `T` |
| `value` | `unknown` |

#### Returns

value is Enum<T\>

___

### isNil

▸ **isNil**(`x`): x is undefined \| null

It returns `true` if `x` is either `null` or `undefined`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `any` |

#### Returns

x is undefined \| null

___

### narrow

▸ **narrow**<`TType`\>(`a`): [`Narrow`](src_lib_primitives.md#narrow)<`TType`\>

Infers embedded primitive type of any type
Same as `as const` but without setting the object as readonly and without needing the user to use it.

#### Type parameters

| Name |
| :------ |
| `TType` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | [`Narrow`](src_lib_primitives.md#narrow)<`TType`\> |

#### Returns

[`Narrow`](src_lib_primitives.md#narrow)<`TType`\>

Value with embedded type inferred

**`Example`**

```ts
const result = narrow(['foo', 'bar', 1])
```

___

### noop

▸ **noop**(): `void`

#### Returns

`void`

## guards

### isBigint

▸ **isBigint**(`input`): input is bigint

Tests if a value is a `bigint`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `unknown` | The value to test. |

#### Returns

input is bigint

**`Example`**

```ts
import { isBigint } from "@effect/data/Predicate"

assert.deepStrictEqual(isBigint(1n), true)

assert.deepStrictEqual(isBigint(1), false)
```

**`Since`**

1.0.0

___

### isBoolean

▸ **isBoolean**(`input`): input is boolean

Tests if a value is a `boolean`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `unknown` | The value to test. |

#### Returns

input is boolean

**`Example`**

```ts
import { isBoolean } from "@effect/data/Predicate"

assert.deepStrictEqual(isBoolean(true), true)

assert.deepStrictEqual(isBoolean("true"), false)
```

**`Since`**

1.0.0

___

### isDate

▸ **isDate**(`input`): input is Date

A guard that succeeds when the input is a `Date`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `unknown` | The value to test. |

#### Returns

input is Date

**`Example`**

```ts
import { isDate } from "@effect/data/Predicate"

assert.deepStrictEqual(isDate(new Date()), true)

assert.deepStrictEqual(isDate(null), false)
assert.deepStrictEqual(isDate({}), false)
```

**`Since`**

1.0.0

___

### isError

▸ **isError**(`input`): input is Error

A guard that succeeds when the input is an `Error`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `unknown` | The value to test. |

#### Returns

input is Error

**`Example`**

```ts
import { isError } from "@effect/data/Predicate"

assert.deepStrictEqual(isError(new Error()), true)

assert.deepStrictEqual(isError(null), false)
assert.deepStrictEqual(isError({}), false)
```

**`Since`**

1.0.0

___

### isFunction

▸ **isFunction**(`input`): input is Function

Tests if a value is a `function`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `unknown` | The value to test. |

#### Returns

input is Function

**`Example`**

```ts
import { isFunction } from "@effect/data/Predicate"

assert.deepStrictEqual(isFunction(isFunction), true)

assert.deepStrictEqual(isFunction("function"), false)
```

**`Since`**

1.0.0

___

### isIterable

▸ **isIterable**(`input`): input is Iterable<unknown\>

A guard that succeeds when the input is an `Iterable`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `unknown` | The value to test. |

#### Returns

input is Iterable<unknown\>

**`Example`**

```ts
import { isIterable } from "@effect/data/Predicate"

assert.deepStrictEqual(isIterable([]), true)
assert.deepStrictEqual(isIterable(new Set()), true)

assert.deepStrictEqual(isIterable(null), false)
assert.deepStrictEqual(isIterable({}), false)
```

**`Since`**

1.0.0

___

### isNever

▸ **isNever**(`input`): input is never

A guard that always fails.

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `unknown` |

#### Returns

input is never

**`Example`**

```ts
import { isNever } from "@effect/data/Predicate"

assert.deepStrictEqual(isNever(null), false)
assert.deepStrictEqual(isNever(undefined), false)
assert.deepStrictEqual(isNever({}), false)
assert.deepStrictEqual(isNever([]), false)
```

**`Since`**

1.0.0

___

### isNumber

▸ **isNumber**(`input`): input is number

Tests if a value is a `number`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `unknown` | The value to test. |

#### Returns

input is number

**`Example`**

```ts
import { isNumber } from "@effect/data/Predicate"

assert.deepStrictEqual(isNumber(2), true)

assert.deepStrictEqual(isNumber("2"), false)
```

**`Since`**

1.0.0

___

### isObject

▸ **isObject**(`input`): input is object

Tests if a value is an `object`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `unknown` | The value to test. |

#### Returns

input is object

**`Example`**

```ts
import { isObject } from "@effect/data/Predicate"

assert.deepStrictEqual(isObject({}), true)
assert.deepStrictEqual(isObject([]), true)

assert.deepStrictEqual(isObject(null), false)
assert.deepStrictEqual(isObject(undefined), false)
```

**`Since`**

1.0.0

___

### isReadonlyRecord

▸ **isReadonlyRecord**(`input`): input is Object

A guard that succeeds when the input is a readonly record.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `unknown` | The value to test. |

#### Returns

input is Object

**`Example`**

```ts
import { isReadonlyRecord } from "@effect/data/Predicate"

assert.deepStrictEqual(isReadonlyRecord({}), true)
assert.deepStrictEqual(isReadonlyRecord({ a: 1 }), true)

assert.deepStrictEqual(isReadonlyRecord([]), false)
assert.deepStrictEqual(isReadonlyRecord([1, 2, 3]), false)
assert.deepStrictEqual(isReadonlyRecord(null), false)
assert.deepStrictEqual(isReadonlyRecord(undefined), false)
```

**`Since`**

1.0.0

___

### isRecord

▸ **isRecord**(`input`): input is Object

A guard that succeeds when the input is a record.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `unknown` | The value to test. |

#### Returns

input is Object

**`Example`**

```ts
import { isRecord } from "@effect/data/Predicate"

assert.deepStrictEqual(isRecord({}), true)
assert.deepStrictEqual(isRecord({ a: 1 }), true)

assert.deepStrictEqual(isRecord([]), false)
assert.deepStrictEqual(isRecord([1, 2, 3]), false)
assert.deepStrictEqual(isRecord(null), false)
assert.deepStrictEqual(isRecord(undefined), false)
```

**`Since`**

1.0.0

___

### isString

▸ **isString**(`input`): input is string

Tests if a value is a `string`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `unknown` | The value to test. |

#### Returns

input is string

**`Example`**

```ts
import { isString } from "@effect/data/Predicate"

assert.deepStrictEqual(isString("a"), true)

assert.deepStrictEqual(isString(1), false)
```

**`Since`**

1.0.0

___

### isSymbol

▸ **isSymbol**(`input`): input is symbol

Tests if a value is a `symbol`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `unknown` | The value to test. |

#### Returns

input is symbol

**`Example`**

```ts
import { isSymbol } from "@effect/data/Predicate"

assert.deepStrictEqual(isSymbol(Symbol.for("a")), true)

assert.deepStrictEqual(isSymbol("a"), false)
```

**`Since`**

1.0.0

___

### isTagged

▸ **isTagged**<`K`\>(`tag`): (`self`: `unknown`) => self is Object

Tests if a value is an `object` with a property `_tag` that matches the given tag.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends `string` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tag` | `K` | The tag to test for. |

#### Returns

`fn`

▸ (`self`): self is Object

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `unknown` |

##### Returns

self is Object

**`Example`**

```ts
import { isTagged } from "@effect/data/Predicate"

assert.deepStrictEqual(isTagged(1, "a"), false)
assert.deepStrictEqual(isTagged(null, "a"), false)
assert.deepStrictEqual(isTagged({}, "a"), false)
assert.deepStrictEqual(isTagged({ a: "a" }, "a"), false)
assert.deepStrictEqual(isTagged({ _tag: "a" }, "a"), true)
assert.deepStrictEqual(isTagged("a")({ _tag: "a" }), true)
```

**`Since`**

1.0.0

▸ **isTagged**<`K`\>(`self`, `tag`): self is Object

Tests if a value is an `object` with a property `_tag` that matches the given tag.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends `string` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `self` | `unknown` | - |
| `tag` | `K` | The tag to test for. |

#### Returns

self is Object

**`Example`**

```ts
import { isTagged } from "@effect/data/Predicate"

assert.deepStrictEqual(isTagged(1, "a"), false)
assert.deepStrictEqual(isTagged(null, "a"), false)
assert.deepStrictEqual(isTagged({}, "a"), false)
assert.deepStrictEqual(isTagged({ a: "a" }, "a"), false)
assert.deepStrictEqual(isTagged({ _tag: "a" }, "a"), true)
assert.deepStrictEqual(isTagged("a")({ _tag: "a" }), true)
```

**`Since`**

1.0.0

___

### isUnknown

▸ **isUnknown**(`input`): input is unknown

A guard that always succeeds.

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `unknown` |

#### Returns

input is unknown

**`Example`**

```ts
import { isUnknown } from "@effect/data/Predicate"

assert.deepStrictEqual(isUnknown(null), true)
assert.deepStrictEqual(isUnknown(undefined), true)

assert.deepStrictEqual(isUnknown({}), true)
assert.deepStrictEqual(isUnknown([]), true)
```

**`Since`**

1.0.0
