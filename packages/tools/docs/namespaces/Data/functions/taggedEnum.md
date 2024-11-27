[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [Data](../README.md) / taggedEnum

# Function: taggedEnum()

Create a constructor for a tagged union of `Data` structs.

You can also pass a `TaggedEnum.WithGenerics` if you want to add generics to
the constructor.

## Examples

```ts
import { Data } from "effect"

const { BadRequest, NotFound } = Data.taggedEnum<
  | { readonly _tag: "BadRequest"; readonly status: 400; readonly message: string }
  | { readonly _tag: "NotFound"; readonly status: 404; readonly message: string }
>()

const notFound = NotFound({ status: 404, message: "Not Found" })
```

```ts
import { Data } from "effect"

type MyResult<E, A> = Data.TaggedEnum<{
  Failure: { readonly error: E }
  Success: { readonly value: A }
}>
interface MyResultDefinition extends Data.TaggedEnum.WithGenerics<2> {
  readonly taggedEnum: MyResult<this["A"], this["B"]>
}
const { Failure, Success } = Data.taggedEnum<MyResultDefinition>()

const success = Success({ value: 1 })
```

## Category

constructors

## Since

2.0.0

## taggedEnum()

> **taggedEnum**\<`Z`\>(): `Simplify`\<`{ readonly [Tag in string]: (args: Args<Kind<Z, A, unknown, unknown, unknown>, Tag, Extract<Kind<Z, A, unknown, unknown, unknown>, { _tag: Tag }>>) => Extract<Kind<Z, A, unknown, unknown, unknown>, { _tag: Tag }> }` & [`GenericMatchers`](../namespaces/TaggedEnum/interfaces/GenericMatchers.md)\<`Z`\>\>

Create a constructor for a tagged union of `Data` structs.

You can also pass a `TaggedEnum.WithGenerics` if you want to add generics to
the constructor.

### Type Parameters

• **Z** *extends* [`WithGenerics`](../namespaces/TaggedEnum/interfaces/WithGenerics.md)\<`1`\>

### Returns

`Simplify`\<`{ readonly [Tag in string]: (args: Args<Kind<Z, A, unknown, unknown, unknown>, Tag, Extract<Kind<Z, A, unknown, unknown, unknown>, { _tag: Tag }>>) => Extract<Kind<Z, A, unknown, unknown, unknown>, { _tag: Tag }> }` & [`GenericMatchers`](../namespaces/TaggedEnum/interfaces/GenericMatchers.md)\<`Z`\>\>

### Examples

```ts
import { Data } from "effect"

const { BadRequest, NotFound } = Data.taggedEnum<
  | { readonly _tag: "BadRequest"; readonly status: 400; readonly message: string }
  | { readonly _tag: "NotFound"; readonly status: 404; readonly message: string }
>()

const notFound = NotFound({ status: 404, message: "Not Found" })
```

```ts
import { Data } from "effect"

type MyResult<E, A> = Data.TaggedEnum<{
  Failure: { readonly error: E }
  Success: { readonly value: A }
}>
interface MyResultDefinition extends Data.TaggedEnum.WithGenerics<2> {
  readonly taggedEnum: MyResult<this["A"], this["B"]>
}
const { Failure, Success } = Data.taggedEnum<MyResultDefinition>()

const success = Success({ value: 1 })
```

```ts
import { Data } from "effect"

const { BadRequest, NotFound } = Data.taggedEnum<
  | { readonly _tag: "BadRequest"; readonly status: 400; readonly message: string }
  | { readonly _tag: "NotFound"; readonly status: 404; readonly message: string }
>()

const notFound = NotFound({ status: 404, message: "Not Found" })
```

```ts
import { Data } from "effect"

type MyResult<E, A> = Data.TaggedEnum<{
  Failure: { readonly error: E }
  Success: { readonly value: A }
}>
interface MyResultDefinition extends Data.TaggedEnum.WithGenerics<2> {
  readonly taggedEnum: MyResult<this["A"], this["B"]>
}
const { Failure, Success } = Data.taggedEnum<MyResultDefinition>()

const success = Success({ value: 1 })
```

### Category

constructors

### Since

2.0.0

### Category

constructors

### Since

2.0.0

## taggedEnum()

> **taggedEnum**\<`Z`\>(): `Simplify`\<`{ readonly [Tag in string]: (args: Args<Kind<Z, A, B, unknown, unknown>, Tag, Extract<Kind<Z, A, B, unknown, unknown>, { _tag: Tag }>>) => Extract<Kind<Z, A, B, unknown, unknown>, { _tag: Tag }> }` & [`GenericMatchers`](../namespaces/TaggedEnum/interfaces/GenericMatchers.md)\<`Z`\>\>

Create a constructor for a tagged union of `Data` structs.

You can also pass a `TaggedEnum.WithGenerics` if you want to add generics to
the constructor.

### Type Parameters

• **Z** *extends* [`WithGenerics`](../namespaces/TaggedEnum/interfaces/WithGenerics.md)\<`2`\>

### Returns

`Simplify`\<`{ readonly [Tag in string]: (args: Args<Kind<Z, A, B, unknown, unknown>, Tag, Extract<Kind<Z, A, B, unknown, unknown>, { _tag: Tag }>>) => Extract<Kind<Z, A, B, unknown, unknown>, { _tag: Tag }> }` & [`GenericMatchers`](../namespaces/TaggedEnum/interfaces/GenericMatchers.md)\<`Z`\>\>

### Examples

```ts
import { Data } from "effect"

const { BadRequest, NotFound } = Data.taggedEnum<
  | { readonly _tag: "BadRequest"; readonly status: 400; readonly message: string }
  | { readonly _tag: "NotFound"; readonly status: 404; readonly message: string }
>()

const notFound = NotFound({ status: 404, message: "Not Found" })
```

```ts
import { Data } from "effect"

type MyResult<E, A> = Data.TaggedEnum<{
  Failure: { readonly error: E }
  Success: { readonly value: A }
}>
interface MyResultDefinition extends Data.TaggedEnum.WithGenerics<2> {
  readonly taggedEnum: MyResult<this["A"], this["B"]>
}
const { Failure, Success } = Data.taggedEnum<MyResultDefinition>()

const success = Success({ value: 1 })
```

```ts
import { Data } from "effect"

const { BadRequest, NotFound } = Data.taggedEnum<
  | { readonly _tag: "BadRequest"; readonly status: 400; readonly message: string }
  | { readonly _tag: "NotFound"; readonly status: 404; readonly message: string }
>()

const notFound = NotFound({ status: 404, message: "Not Found" })
```

```ts
import { Data } from "effect"

type MyResult<E, A> = Data.TaggedEnum<{
  Failure: { readonly error: E }
  Success: { readonly value: A }
}>
interface MyResultDefinition extends Data.TaggedEnum.WithGenerics<2> {
  readonly taggedEnum: MyResult<this["A"], this["B"]>
}
const { Failure, Success } = Data.taggedEnum<MyResultDefinition>()

const success = Success({ value: 1 })
```

### Category

constructors

### Since

2.0.0

### Category

constructors

### Since

2.0.0

## taggedEnum()

> **taggedEnum**\<`Z`\>(): `Simplify`\<`{ readonly [Tag in string]: (args: Args<Kind<Z, A, B, C, unknown>, Tag, Extract<Kind<Z, A, B, C, unknown>, { _tag: Tag }>>) => Extract<Kind<Z, A, B, C, unknown>, { _tag: Tag }> }` & [`GenericMatchers`](../namespaces/TaggedEnum/interfaces/GenericMatchers.md)\<`Z`\>\>

Create a constructor for a tagged union of `Data` structs.

You can also pass a `TaggedEnum.WithGenerics` if you want to add generics to
the constructor.

### Type Parameters

• **Z** *extends* [`WithGenerics`](../namespaces/TaggedEnum/interfaces/WithGenerics.md)\<`3`\>

### Returns

`Simplify`\<`{ readonly [Tag in string]: (args: Args<Kind<Z, A, B, C, unknown>, Tag, Extract<Kind<Z, A, B, C, unknown>, { _tag: Tag }>>) => Extract<Kind<Z, A, B, C, unknown>, { _tag: Tag }> }` & [`GenericMatchers`](../namespaces/TaggedEnum/interfaces/GenericMatchers.md)\<`Z`\>\>

### Examples

```ts
import { Data } from "effect"

const { BadRequest, NotFound } = Data.taggedEnum<
  | { readonly _tag: "BadRequest"; readonly status: 400; readonly message: string }
  | { readonly _tag: "NotFound"; readonly status: 404; readonly message: string }
>()

const notFound = NotFound({ status: 404, message: "Not Found" })
```

```ts
import { Data } from "effect"

type MyResult<E, A> = Data.TaggedEnum<{
  Failure: { readonly error: E }
  Success: { readonly value: A }
}>
interface MyResultDefinition extends Data.TaggedEnum.WithGenerics<2> {
  readonly taggedEnum: MyResult<this["A"], this["B"]>
}
const { Failure, Success } = Data.taggedEnum<MyResultDefinition>()

const success = Success({ value: 1 })
```

```ts
import { Data } from "effect"

const { BadRequest, NotFound } = Data.taggedEnum<
  | { readonly _tag: "BadRequest"; readonly status: 400; readonly message: string }
  | { readonly _tag: "NotFound"; readonly status: 404; readonly message: string }
>()

const notFound = NotFound({ status: 404, message: "Not Found" })
```

```ts
import { Data } from "effect"

type MyResult<E, A> = Data.TaggedEnum<{
  Failure: { readonly error: E }
  Success: { readonly value: A }
}>
interface MyResultDefinition extends Data.TaggedEnum.WithGenerics<2> {
  readonly taggedEnum: MyResult<this["A"], this["B"]>
}
const { Failure, Success } = Data.taggedEnum<MyResultDefinition>()

const success = Success({ value: 1 })
```

### Category

constructors

### Since

2.0.0

### Category

constructors

### Since

2.0.0

## taggedEnum()

> **taggedEnum**\<`Z`\>(): `Simplify`\<`{ readonly [Tag in string]: (args: Args<Kind<Z, A, B, C, D>, Tag, Extract<Kind<Z, A, B, C, D>, { _tag: Tag }>>) => Extract<Kind<Z, A, B, C, D>, { _tag: Tag }> }` & [`GenericMatchers`](../namespaces/TaggedEnum/interfaces/GenericMatchers.md)\<`Z`\>\>

Create a constructor for a tagged union of `Data` structs.

You can also pass a `TaggedEnum.WithGenerics` if you want to add generics to
the constructor.

### Type Parameters

• **Z** *extends* [`WithGenerics`](../namespaces/TaggedEnum/interfaces/WithGenerics.md)\<`4`\>

### Returns

`Simplify`\<`{ readonly [Tag in string]: (args: Args<Kind<Z, A, B, C, D>, Tag, Extract<Kind<Z, A, B, C, D>, { _tag: Tag }>>) => Extract<Kind<Z, A, B, C, D>, { _tag: Tag }> }` & [`GenericMatchers`](../namespaces/TaggedEnum/interfaces/GenericMatchers.md)\<`Z`\>\>

### Examples

```ts
import { Data } from "effect"

const { BadRequest, NotFound } = Data.taggedEnum<
  | { readonly _tag: "BadRequest"; readonly status: 400; readonly message: string }
  | { readonly _tag: "NotFound"; readonly status: 404; readonly message: string }
>()

const notFound = NotFound({ status: 404, message: "Not Found" })
```

```ts
import { Data } from "effect"

type MyResult<E, A> = Data.TaggedEnum<{
  Failure: { readonly error: E }
  Success: { readonly value: A }
}>
interface MyResultDefinition extends Data.TaggedEnum.WithGenerics<2> {
  readonly taggedEnum: MyResult<this["A"], this["B"]>
}
const { Failure, Success } = Data.taggedEnum<MyResultDefinition>()

const success = Success({ value: 1 })
```

```ts
import { Data } from "effect"

const { BadRequest, NotFound } = Data.taggedEnum<
  | { readonly _tag: "BadRequest"; readonly status: 400; readonly message: string }
  | { readonly _tag: "NotFound"; readonly status: 404; readonly message: string }
>()

const notFound = NotFound({ status: 404, message: "Not Found" })
```

```ts
import { Data } from "effect"

type MyResult<E, A> = Data.TaggedEnum<{
  Failure: { readonly error: E }
  Success: { readonly value: A }
}>
interface MyResultDefinition extends Data.TaggedEnum.WithGenerics<2> {
  readonly taggedEnum: MyResult<this["A"], this["B"]>
}
const { Failure, Success } = Data.taggedEnum<MyResultDefinition>()

const success = Success({ value: 1 })
```

### Category

constructors

### Since

2.0.0

### Category

constructors

### Since

2.0.0

## taggedEnum()

> **taggedEnum**\<`A`\>(): `Simplify`\<`{ readonly [Tag in string]: Constructor<Extract<A, { _tag: Tag }>, "_tag"> }` & `object`\>

Create a constructor for a tagged union of `Data` structs.

You can also pass a `TaggedEnum.WithGenerics` if you want to add generics to
the constructor.

### Type Parameters

• **A** *extends* `object`

### Returns

`Simplify`\<`{ readonly [Tag in string]: Constructor<Extract<A, { _tag: Tag }>, "_tag"> }` & `object`\>

### Examples

```ts
import { Data } from "effect"

const { BadRequest, NotFound } = Data.taggedEnum<
  | { readonly _tag: "BadRequest"; readonly status: 400; readonly message: string }
  | { readonly _tag: "NotFound"; readonly status: 404; readonly message: string }
>()

const notFound = NotFound({ status: 404, message: "Not Found" })
```

```ts
import { Data } from "effect"

type MyResult<E, A> = Data.TaggedEnum<{
  Failure: { readonly error: E }
  Success: { readonly value: A }
}>
interface MyResultDefinition extends Data.TaggedEnum.WithGenerics<2> {
  readonly taggedEnum: MyResult<this["A"], this["B"]>
}
const { Failure, Success } = Data.taggedEnum<MyResultDefinition>()

const success = Success({ value: 1 })
```

```ts
import { Data } from "effect"

const { BadRequest, NotFound } = Data.taggedEnum<
  | { readonly _tag: "BadRequest"; readonly status: 400; readonly message: string }
  | { readonly _tag: "NotFound"; readonly status: 404; readonly message: string }
>()

const notFound = NotFound({ status: 404, message: "Not Found" })
```

```ts
import { Data } from "effect"

type MyResult<E, A> = Data.TaggedEnum<{
  Failure: { readonly error: E }
  Success: { readonly value: A }
}>
interface MyResultDefinition extends Data.TaggedEnum.WithGenerics<2> {
  readonly taggedEnum: MyResult<this["A"], this["B"]>
}
const { Failure, Success } = Data.taggedEnum<MyResultDefinition>()

const success = Success({ value: 1 })
```

### Category

constructors

### Since

2.0.0

### Category

constructors

### Since

2.0.0
