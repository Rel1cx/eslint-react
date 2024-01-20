[@eslint-react/tools](../README.md) / Context

# Namespace: Context

## Table of contents

### Interfaces

- [Context](../interfaces/Context.Context.md)
- [Tag](../interfaces/Context.Tag.md)
- [TagUnify](../interfaces/Context.TagUnify.md)
- [TagUnifyIgnore](../interfaces/Context.TagUnifyIgnore.md)

### Type Aliases

- [TagTypeId](Context.md#tagtypeid)
- [TypeId](Context.md#typeid)
- [ValidTagsById](Context.md#validtagsbyid)

### Functions

- [Tag](Context.md#tag)
- [add](Context.md#add)
- [empty](Context.md#empty)
- [get](Context.md#get)
- [getOption](Context.md#getoption)
- [isContext](Context.md#iscontext)
- [isTag](Context.md#istag)
- [make](Context.md#make)
- [merge](Context.md#merge)
- [omit](Context.md#omit)
- [pick](Context.md#pick)
- [unsafeGet](Context.md#unsafeget)
- [unsafeMake](Context.md#unsafemake)

## Other

### add

▸ **add**\<`T`\>(`tag`, `service`): \<Services\>(`self`: [`Context`](../interfaces/Context.Context.md)\<`Services`\>) => [`Context`](../interfaces/Context.Context.md)\<`Services` \| `Identifier`\<`T`\>\>

Adds a service to a given `Context`.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Tag`](../interfaces/Context.Tag.md)\<`any`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `tag` | `T` |
| `service` | `Service`\<`T`\> |

#### Returns

`fn`

▸ \<`Services`\>(`self`): [`Context`](../interfaces/Context.Context.md)\<`Services` \| `Identifier`\<`T`\>\>

##### Type parameters

| Name |
| :------ |
| `Services` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Context`](../interfaces/Context.Context.md)\<`Services`\> |

##### Returns

[`Context`](../interfaces/Context.Context.md)\<`Services` \| `Identifier`\<`T`\>\>

**`Example`**

```ts
import * as Context from "effect/Context"
import { pipe } from "effect/Function"

const Port = Context.Tag<{ PORT: number }>()
const Timeout = Context.Tag<{ TIMEOUT: number }>()

const someContext = Context.make(Port, { PORT: 8080 })

const Services = pipe(
  someContext,
  Context.add(Timeout, { TIMEOUT: 5000 })
)

assert.deepStrictEqual(Context.get(Services, Port), { PORT: 8080 })
assert.deepStrictEqual(Context.get(Services, Timeout), { TIMEOUT: 5000 })
```

**`Since`**

2.0.0

▸ **add**\<`Services`, `T`\>(`self`, `tag`, `service`): [`Context`](../interfaces/Context.Context.md)\<`Services` \| `Identifier`\<`T`\>\>

Adds a service to a given `Context`.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Services` | `Services` |
| `T` | extends [`Tag`](../interfaces/Context.Tag.md)\<`any`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Context`](../interfaces/Context.Context.md)\<`Services`\> |
| `tag` | `T` |
| `service` | `Service`\<`T`\> |

#### Returns

[`Context`](../interfaces/Context.Context.md)\<`Services` \| `Identifier`\<`T`\>\>

**`Example`**

```ts
import * as Context from "effect/Context"
import { pipe } from "effect/Function"

const Port = Context.Tag<{ PORT: number }>()
const Timeout = Context.Tag<{ TIMEOUT: number }>()

const someContext = Context.make(Port, { PORT: 8080 })

const Services = pipe(
  someContext,
  Context.add(Timeout, { TIMEOUT: 5000 })
)

assert.deepStrictEqual(Context.get(Services, Port), { PORT: 8080 })
assert.deepStrictEqual(Context.get(Services, Timeout), { TIMEOUT: 5000 })
```

**`Since`**

2.0.0

___

### merge

▸ **merge**\<`R1`\>(`that`): \<Services\>(`self`: [`Context`](../interfaces/Context.Context.md)\<`Services`\>) => [`Context`](../interfaces/Context.Context.md)\<`R1` \| `Services`\>

Merges two `Context`s, returning a new `Context` containing the services of both.

#### Type parameters

| Name |
| :------ |
| `R1` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `that` | [`Context`](../interfaces/Context.Context.md)\<`R1`\> | The second `Context` to merge. |

#### Returns

`fn`

▸ \<`Services`\>(`self`): [`Context`](../interfaces/Context.Context.md)\<`R1` \| `Services`\>

##### Type parameters

| Name |
| :------ |
| `Services` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Context`](../interfaces/Context.Context.md)\<`Services`\> |

##### Returns

[`Context`](../interfaces/Context.Context.md)\<`R1` \| `Services`\>

**`Example`**

```ts
import * as Context from "effect/Context"

const Port = Context.Tag<{ PORT: number }>()
const Timeout = Context.Tag<{ TIMEOUT: number }>()

const firstContext = Context.make(Port, { PORT: 8080 })
const secondContext = Context.make(Timeout, { TIMEOUT: 5000 })

const Services = Context.merge(firstContext, secondContext)

assert.deepStrictEqual(Context.get(Services, Port), { PORT: 8080 })
assert.deepStrictEqual(Context.get(Services, Timeout), { TIMEOUT: 5000 })
```

**`Since`**

2.0.0

▸ **merge**\<`Services`, `R1`\>(`self`, `that`): [`Context`](../interfaces/Context.Context.md)\<`Services` \| `R1`\>

Merges two `Context`s, returning a new `Context` containing the services of both.

#### Type parameters

| Name |
| :------ |
| `Services` |
| `R1` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `self` | [`Context`](../interfaces/Context.Context.md)\<`Services`\> | The first `Context` to merge. |
| `that` | [`Context`](../interfaces/Context.Context.md)\<`R1`\> | The second `Context` to merge. |

#### Returns

[`Context`](../interfaces/Context.Context.md)\<`Services` \| `R1`\>

**`Example`**

```ts
import * as Context from "effect/Context"

const Port = Context.Tag<{ PORT: number }>()
const Timeout = Context.Tag<{ TIMEOUT: number }>()

const firstContext = Context.make(Port, { PORT: 8080 })
const secondContext = Context.make(Timeout, { TIMEOUT: 5000 })

const Services = Context.merge(firstContext, secondContext)

assert.deepStrictEqual(Context.get(Services, Port), { PORT: 8080 })
assert.deepStrictEqual(Context.get(Services, Timeout), { TIMEOUT: 5000 })
```

**`Since`**

2.0.0

___

### omit

▸ **omit**\<`Services`, `S`\>(`...tags`): (`self`: [`Context`](../interfaces/Context.Context.md)\<`Services`\>) => [`Context`](../interfaces/Context.Context.md)\<`Exclude`\<`Services`, \{ [k in string \| number \| symbol]: Identifier\<S[k]\> }[keyof `S`]\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Services` | `Services` |
| `S` | extends [`ValidTagsById`](Context.md#validtagsbyid)\<`Services`\>[] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `...tags` | `S` |

#### Returns

`fn`

▸ (`self`): [`Context`](../interfaces/Context.Context.md)\<`Exclude`\<`Services`, \{ [k in string \| number \| symbol]: Identifier\<S[k]\> }[keyof `S`]\>\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Context`](../interfaces/Context.Context.md)\<`Services`\> |

##### Returns

[`Context`](../interfaces/Context.Context.md)\<`Exclude`\<`Services`, \{ [k in string \| number \| symbol]: Identifier\<S[k]\> }[keyof `S`]\>\>

**`Since`**

2.0.0

___

### pick

▸ **pick**\<`Services`, `S`\>(`...tags`): (`self`: [`Context`](../interfaces/Context.Context.md)\<`Services`\>) => [`Context`](../interfaces/Context.Context.md)\<\{ [k in string \| number \| symbol]: Identifier\<S[k]\> }[`number`]\>

Returns a new `Context` that contains only the specified services.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Services` | `Services` |
| `S` | extends [`ValidTagsById`](Context.md#validtagsbyid)\<`Services`\>[] |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...tags` | `S` | The list of `Tag`s to be included in the new `Context`. |

#### Returns

`fn`

▸ (`self`): [`Context`](../interfaces/Context.Context.md)\<\{ [k in string \| number \| symbol]: Identifier\<S[k]\> }[`number`]\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Context`](../interfaces/Context.Context.md)\<`Services`\> |

##### Returns

[`Context`](../interfaces/Context.Context.md)\<\{ [k in string \| number \| symbol]: Identifier\<S[k]\> }[`number`]\>

**`Example`**

```ts
import * as Context from "effect/Context"
import { pipe } from "effect/Function"
import * as O from "effect/Option"

const Port = Context.Tag<{ PORT: number }>()
const Timeout = Context.Tag<{ TIMEOUT: number }>()

const someContext = pipe(
  Context.make(Port, { PORT: 8080 }),
  Context.add(Timeout, { TIMEOUT: 5000 })
)

const Services = pipe(someContext, Context.pick(Port))

assert.deepStrictEqual(Context.getOption(Services, Port), O.some({ PORT: 8080 }))
assert.deepStrictEqual(Context.getOption(Services, Timeout), O.none())
```

**`Since`**

2.0.0

## constructors

### Tag

▸ **Tag**\<`Identifier`, `Service`\>(`identifier?`): [`Tag`](../interfaces/Context.Tag.md)\<`Identifier`, `Service`\>

Creates a new `Tag` instance with an optional key parameter.

Specifying the `key` will make the `Tag` global, meaning two tags with the same
key will map to the same instance.

Note: this is useful for cases where live reload can happen and it is
desireable to preserve the instance across reloads.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Identifier` | `Identifier` |
| `Service` | `Identifier` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `identifier?` | `unknown` |

#### Returns

[`Tag`](../interfaces/Context.Tag.md)\<`Identifier`, `Service`\>

**`Example`**

```ts
import * as Context from "effect/Context"

assert.strictEqual(Context.Tag() === Context.Tag(), false)
assert.strictEqual(Context.Tag("PORT") === Context.Tag("PORT"), true)
```

**`Since`**

2.0.0

___

### empty

▸ **empty**(): [`Context`](../interfaces/Context.Context.md)\<`never`\>

Returns an empty `Context`.

#### Returns

[`Context`](../interfaces/Context.Context.md)\<`never`\>

**`Example`**

```ts
import * as Context from "effect/Context"

assert.strictEqual(Context.isContext(Context.empty()), true)
```

**`Since`**

2.0.0

___

### make

▸ **make**\<`T`\>(`tag`, `service`): [`Context`](../interfaces/Context.Context.md)\<`Identifier`\<`T`\>\>

Creates a new `Context` with a single service associated to the tag.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Tag`](../interfaces/Context.Tag.md)\<`any`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `tag` | `T` |
| `service` | `Service`\<`T`\> |

#### Returns

[`Context`](../interfaces/Context.Context.md)\<`Identifier`\<`T`\>\>

**`Example`**

```ts
import * as Context from "effect/Context"

const Port = Context.Tag<{ PORT: number }>()

const Services = Context.make(Port, { PORT: 8080 })

assert.deepStrictEqual(Context.get(Services, Port), { PORT: 8080 })
```

**`Since`**

2.0.0

___

### unsafeMake

▸ **unsafeMake**\<`Services`\>(`unsafeMap`): [`Context`](../interfaces/Context.Context.md)\<`Services`\>

#### Type parameters

| Name |
| :------ |
| `Services` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `unsafeMap` | `Map`\<[`Tag`](../interfaces/Context.Tag.md)\<`any`, `any`\>, `any`\> |

#### Returns

[`Context`](../interfaces/Context.Context.md)\<`Services`\>

**`Since`**

2.0.0

## getters

### get

▸ **get**\<`Services`, `T`\>(`tag`): (`self`: [`Context`](../interfaces/Context.Context.md)\<`Services`\>) => `Service`\<`T`\>

Get a service from the context that corresponds to the given tag.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Services` | `Services` |
| `T` | extends [`Tag`](../interfaces/Context.Tag.md)\<`unknown`, `any`\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tag` | `T` | The `Tag` of the service to retrieve. |

#### Returns

`fn`

▸ (`self`): `Service`\<`T`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Context`](../interfaces/Context.Context.md)\<`Services`\> |

##### Returns

`Service`\<`T`\>

**`Example`**

```ts
import * as Context from "effect/Context"
import { pipe } from "effect/Function"

const Port = Context.Tag<{ PORT: number }>()
const Timeout = Context.Tag<{ TIMEOUT: number }>()

const Services = pipe(
  Context.make(Port, { PORT: 8080 }),
  Context.add(Timeout, { TIMEOUT: 5000 })
)

assert.deepStrictEqual(Context.get(Services, Timeout), { TIMEOUT: 5000 })
```

**`Since`**

2.0.0

▸ **get**\<`Services`, `T`\>(`self`, `tag`): `Service`\<`T`\>

Get a service from the context that corresponds to the given tag.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Services` | `Services` |
| `T` | extends [`Tag`](../interfaces/Context.Tag.md)\<`unknown`, `any`\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `self` | [`Context`](../interfaces/Context.Context.md)\<`Services`\> | The `Context` to search for the service. |
| `tag` | `T` | The `Tag` of the service to retrieve. |

#### Returns

`Service`\<`T`\>

**`Example`**

```ts
import * as Context from "effect/Context"
import { pipe } from "effect/Function"

const Port = Context.Tag<{ PORT: number }>()
const Timeout = Context.Tag<{ TIMEOUT: number }>()

const Services = pipe(
  Context.make(Port, { PORT: 8080 }),
  Context.add(Timeout, { TIMEOUT: 5000 })
)

assert.deepStrictEqual(Context.get(Services, Timeout), { TIMEOUT: 5000 })
```

**`Since`**

2.0.0

___

### getOption

▸ **getOption**\<`S`, `I`\>(`tag`): \<Services\>(`self`: [`Context`](../interfaces/Context.Context.md)\<`Services`\>) => [`Option`](O.md#option)\<`S`\>

Get the value associated with the specified tag from the context wrapped in an `Option` object. If the tag is not
found, the `Option` object will be `None`.

#### Type parameters

| Name |
| :------ |
| `S` |
| `I` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tag` | [`Tag`](../interfaces/Context.Tag.md)\<`I`, `S`\> | The `Tag` of the service to retrieve. |

#### Returns

`fn`

▸ \<`Services`\>(`self`): [`Option`](O.md#option)\<`S`\>

##### Type parameters

| Name |
| :------ |
| `Services` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Context`](../interfaces/Context.Context.md)\<`Services`\> |

##### Returns

[`Option`](O.md#option)\<`S`\>

**`Example`**

```ts
import * as Context from "effect/Context"
import * as O from "effect/Option"

const Port = Context.Tag<{ PORT: number }>()
const Timeout = Context.Tag<{ TIMEOUT: number }>()

const Services = Context.make(Port, { PORT: 8080 })

assert.deepStrictEqual(Context.getOption(Services, Port), O.some({ PORT: 8080 }))
assert.deepStrictEqual(Context.getOption(Services, Timeout), O.none())
```

**`Since`**

2.0.0

▸ **getOption**\<`Services`, `S`, `I`\>(`self`, `tag`): [`Option`](O.md#option)\<`S`\>

Get the value associated with the specified tag from the context wrapped in an `Option` object. If the tag is not
found, the `Option` object will be `None`.

#### Type parameters

| Name |
| :------ |
| `Services` |
| `S` |
| `I` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `self` | [`Context`](../interfaces/Context.Context.md)\<`Services`\> | The `Context` to search for the service. |
| `tag` | [`Tag`](../interfaces/Context.Tag.md)\<`I`, `S`\> | The `Tag` of the service to retrieve. |

#### Returns

[`Option`](O.md#option)\<`S`\>

**`Example`**

```ts
import * as Context from "effect/Context"
import * as O from "effect/Option"

const Port = Context.Tag<{ PORT: number }>()
const Timeout = Context.Tag<{ TIMEOUT: number }>()

const Services = Context.make(Port, { PORT: 8080 })

assert.deepStrictEqual(Context.getOption(Services, Port), O.some({ PORT: 8080 }))
assert.deepStrictEqual(Context.getOption(Services, Timeout), O.none())
```

**`Since`**

2.0.0

## guards

### isContext

▸ **isContext**(`input`): input is Context\<never\>

Checks if the provided argument is a `Context`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `unknown` | The value to be checked if it is a `Context`. |

#### Returns

input is Context\<never\>

**`Example`**

```ts
import * as Context from "effect/Context"

assert.strictEqual(Context.isContext(Context.empty()), true)
```

**`Since`**

2.0.0

___

### isTag

▸ **isTag**(`input`): input is Tag\<any, any\>

Checks if the provided argument is a `Tag`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `unknown` | The value to be checked if it is a `Tag`. |

#### Returns

input is Tag\<any, any\>

**`Example`**

```ts
import * as Context from "effect/Context"

assert.strictEqual(Context.isTag(Context.Tag()), true)
```

**`Since`**

2.0.0

## models

### ValidTagsById

Ƭ **ValidTagsById**\<`R`\>: `R` extends infer S ? [`Tag`](../interfaces/Context.Tag.md)\<`S`, `any`\> : `never`

**`Since`**

2.0.0

#### Type parameters

| Name |
| :------ |
| `R` |

## symbol

### TagTypeId

Ƭ **TagTypeId**: typeof `TagTypeId`

**`Since`**

2.0.0

___

### TypeId

Ƭ **TypeId**: typeof `TypeId`

**`Since`**

2.0.0

## unsafe

### unsafeGet

▸ **unsafeGet**\<`S`, `I`\>(`tag`): \<Services\>(`self`: [`Context`](../interfaces/Context.Context.md)\<`Services`\>) => `S`

Get a service from the context that corresponds to the given tag.
This function is unsafe because if the tag is not present in the context, a runtime error will be thrown.

For a safer version see [getOption](Context.md#getoption).

#### Type parameters

| Name |
| :------ |
| `S` |
| `I` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tag` | [`Tag`](../interfaces/Context.Tag.md)\<`I`, `S`\> | The `Tag` of the service to retrieve. |

#### Returns

`fn`

▸ \<`Services`\>(`self`): `S`

##### Type parameters

| Name |
| :------ |
| `Services` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Context`](../interfaces/Context.Context.md)\<`Services`\> |

##### Returns

`S`

**`Example`**

```ts
import * as Context from "effect/Context"

const Port = Context.Tag<{ PORT: number }>()
const Timeout = Context.Tag<{ TIMEOUT: number }>()

const Services = Context.make(Port, { PORT: 8080 })

assert.deepStrictEqual(Context.unsafeGet(Services, Port), { PORT: 8080 })
assert.throws(() => Context.unsafeGet(Services, Timeout))
```

**`Since`**

2.0.0

▸ **unsafeGet**\<`Services`, `S`, `I`\>(`self`, `tag`): `S`

Get a service from the context that corresponds to the given tag.
This function is unsafe because if the tag is not present in the context, a runtime error will be thrown.

For a safer version see [getOption](Context.md#getoption).

#### Type parameters

| Name |
| :------ |
| `Services` |
| `S` |
| `I` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `self` | [`Context`](../interfaces/Context.Context.md)\<`Services`\> | The `Context` to search for the service. |
| `tag` | [`Tag`](../interfaces/Context.Tag.md)\<`I`, `S`\> | The `Tag` of the service to retrieve. |

#### Returns

`S`

**`Example`**

```ts
import * as Context from "effect/Context"

const Port = Context.Tag<{ PORT: number }>()
const Timeout = Context.Tag<{ TIMEOUT: number }>()

const Services = Context.make(Port, { PORT: 8080 })

assert.deepStrictEqual(Context.unsafeGet(Services, Port), { PORT: 8080 })
assert.throws(() => Context.unsafeGet(Services, Timeout))
```

**`Since`**

2.0.0
