[eslint-plugin-react-ts](../README.md) / [src/lib/primitives](src_lib_primitives.md) / Rec

# Namespace: Rec

[src/lib/primitives](src_lib_primitives.md).Rec

## Table of contents

### Interfaces

- [ReadonlyRecord](../interfaces/src_lib_primitives.Rec.ReadonlyRecord.md)
- [ReadonlyRecordTypeLambda](../interfaces/src_lib_primitives.Rec.ReadonlyRecordTypeLambda.md)

### Functions

- [collect](src_lib_primitives.Rec.md#collect)
- [compact](src_lib_primitives.Rec.md#compact)
- [empty](src_lib_primitives.Rec.md#empty)
- [filter](src_lib_primitives.Rec.md#filter)
- [filterMap](src_lib_primitives.Rec.md#filtermap)
- [fromEntries](src_lib_primitives.Rec.md#fromentries)
- [fromIterable](src_lib_primitives.Rec.md#fromiterable)
- [get](src_lib_primitives.Rec.md#get)
- [has](src_lib_primitives.Rec.md#has)
- [isEmptyReadonlyRecord](src_lib_primitives.Rec.md#isemptyreadonlyrecord)
- [isEmptyRecord](src_lib_primitives.Rec.md#isemptyrecord)
- [map](src_lib_primitives.Rec.md#map)
- [modifyOption](src_lib_primitives.Rec.md#modifyoption)
- [partition](src_lib_primitives.Rec.md#partition)
- [partitionMap](src_lib_primitives.Rec.md#partitionmap)
- [pop](src_lib_primitives.Rec.md#pop)
- [remove](src_lib_primitives.Rec.md#remove)
- [replaceOption](src_lib_primitives.Rec.md#replaceoption)
- [separate](src_lib_primitives.Rec.md#separate)
- [size](src_lib_primitives.Rec.md#size)
- [toArray](src_lib_primitives.Rec.md#toarray)
- [toEntries](src_lib_primitives.Rec.md#toentries)

## Other

### filterMap

▸ **filterMap**<`K`, `A`, `B`\>(`f`): (`self`: `Record`<`K`, `A`\>) => `Record`<`string`, `B`\>

Transforms a `ReadonlyRecord` into a `Record` by applying the function `f` to each key and value in the original `ReadonlyRecord`.
If the function returns `Some`, the key-value pair is included in the output `Record`.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends `string` |
| `A` | `A` |
| `B` | `B` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `f` | (`a`: `A`, `key`: `K`) => [`Option`](src_lib_primitives.O.md#option)<`B`\> | The transformation function. |

#### Returns

`fn`

▸ (`self`): `Record`<`string`, `B`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Record`<`K`, `A`\> |

##### Returns

`Record`<`string`, `B`\>

**`Example`**

```ts
import { filterMap } from '@effect/data/ReadonlyRecord'
import { some, none } from '@effect/data/Option'

const x = { a: 1, b: 2, c: 3 }
const f = (a: number, key: string) => a > 2 ? some(a * 2) : none()
assert.deepStrictEqual(filterMap(x, f), { c: 6 })
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/ReadonlyRecord.d.ts:338

▸ **filterMap**<`K`, `A`, `B`\>(`self`, `f`): `Record`<`string`, `B`\>

Transforms a `ReadonlyRecord` into a `Record` by applying the function `f` to each key and value in the original `ReadonlyRecord`.
If the function returns `Some`, the key-value pair is included in the output `Record`.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends `string` |
| `A` | `A` |
| `B` | `B` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `self` | `Record`<`K`, `A`\> | The input `ReadonlyRecord`. |
| `f` | (`a`: `A`, `key`: `K`) => [`Option`](src_lib_primitives.O.md#option)<`B`\> | The transformation function. |

#### Returns

`Record`<`string`, `B`\>

**`Example`**

```ts
import { filterMap } from '@effect/data/ReadonlyRecord'
import { some, none } from '@effect/data/Option'

const x = { a: 1, b: 2, c: 3 }
const f = (a: number, key: string) => a > 2 ? some(a * 2) : none()
assert.deepStrictEqual(filterMap(x, f), { c: 6 })
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/ReadonlyRecord.d.ts:339

___

### get

▸ **get**(`key`): <A\>(`self`: [`ReadonlyRecord`](../interfaces/src_lib_primitives.Rec.ReadonlyRecord.md)<`A`\>) => [`Option`](src_lib_primitives.O.md#option)<`A`\>

Retrieve a value at a particular key from a `ReadonlyRecord`, returning it wrapped in an `Option`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | Key to retrieve from `ReadonlyRecord`. |

#### Returns

`fn`

▸ <`A`\>(`self`): [`Option`](src_lib_primitives.O.md#option)<`A`\>

##### Type parameters

| Name |
| :------ |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`ReadonlyRecord`](../interfaces/src_lib_primitives.Rec.ReadonlyRecord.md)<`A`\> |

##### Returns

[`Option`](src_lib_primitives.O.md#option)<`A`\>

**`Example`**

```ts
import { get } from "@effect/data/ReadonlyRecord"
import { some, none } from "@effect/data/Option"

const person = { name: "John Doe", age: 35 }

assert.deepStrictEqual(get(person, "name"), some("John Doe"))
assert.deepStrictEqual(get(person, "email"), none())
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/ReadonlyRecord.d.ts:203

▸ **get**<`A`\>(`self`, `key`): [`Option`](src_lib_primitives.O.md#option)<`A`\>

Retrieve a value at a particular key from a `ReadonlyRecord`, returning it wrapped in an `Option`.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `self` | [`ReadonlyRecord`](../interfaces/src_lib_primitives.Rec.ReadonlyRecord.md)<`A`\> | The `ReadonlyRecord` to retrieve value from. |
| `key` | `string` | Key to retrieve from `ReadonlyRecord`. |

#### Returns

[`Option`](src_lib_primitives.O.md#option)<`A`\>

**`Example`**

```ts
import { get } from "@effect/data/ReadonlyRecord"
import { some, none } from "@effect/data/Option"

const person = { name: "John Doe", age: 35 }

assert.deepStrictEqual(get(person, "name"), some("John Doe"))
assert.deepStrictEqual(get(person, "email"), none())
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/ReadonlyRecord.d.ts:204

___

### has

▸ **has**(`key`): <A\>(`self`: [`ReadonlyRecord`](../interfaces/src_lib_primitives.Rec.ReadonlyRecord.md)<`A`\>) => `boolean`

Check if a given `key` exists in a `ReadonlyRecord`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | the key to look for in the `ReadonlyRecord`. |

#### Returns

`fn`

▸ <`A`\>(`self`): `boolean`

##### Type parameters

| Name |
| :------ |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`ReadonlyRecord`](../interfaces/src_lib_primitives.Rec.ReadonlyRecord.md)<`A`\> |

##### Returns

`boolean`

**`Example`**

```ts
import { has } from '@effect/data/ReadonlyRecord'

assert.deepStrictEqual(has({ a: 1, b: 2 }, "a"), true);
assert.deepStrictEqual(has({ a: 1, b: 2 }, "c"), false);
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/ReadonlyRecord.d.ts:182

▸ **has**<`A`\>(`self`, `key`): `boolean`

Check if a given `key` exists in a `ReadonlyRecord`.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `self` | [`ReadonlyRecord`](../interfaces/src_lib_primitives.Rec.ReadonlyRecord.md)<`A`\> | the `ReadonlyRecord` to look in. |
| `key` | `string` | the key to look for in the `ReadonlyRecord`. |

#### Returns

`boolean`

**`Example`**

```ts
import { has } from '@effect/data/ReadonlyRecord'

assert.deepStrictEqual(has({ a: 1, b: 2 }, "a"), true);
assert.deepStrictEqual(has({ a: 1, b: 2 }, "c"), false);
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/ReadonlyRecord.d.ts:183

___

### map

▸ **map**<`K`, `A`, `B`\>(`f`): (`self`: `Record`<`K`, `A`\>) => `Record`<`K`, `B`\>

Maps a `ReadonlyRecord` into another `Record` by applying a transformation function to each of its values.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends `string` |
| `A` | `A` |
| `B` | `B` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `f` | (`a`: `A`, `key`: `K`) => `B` | A transformation function that will be applied to each of the values in the `ReadonlyRecord`. |

#### Returns

`fn`

▸ (`self`): `Record`<`K`, `B`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Record`<`K`, `A`\> |

##### Returns

`Record`<`K`, `B`\>

**`Example`**

```ts
import { map } from "@effect/data/ReadonlyRecord"

const f = (n: number) => `-${n}`

assert.deepStrictEqual(map({ a: 3, b: 5 }, f), { a: "-3", b: "-5" })

const g = (n: number, key: string) => `${key.toUpperCase()}-${n}`

assert.deepStrictEqual(map({ a: 3, b: 5 }, g), { a: "A-3", b: "B-5" })
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/ReadonlyRecord.d.ts:317

▸ **map**<`K`, `A`, `B`\>(`self`, `f`): `Record`<`K`, `B`\>

Maps a `ReadonlyRecord` into another `Record` by applying a transformation function to each of its values.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends `string` |
| `A` | `A` |
| `B` | `B` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `self` | `Record`<`K`, `A`\> | The `ReadonlyRecord` to be mapped. |
| `f` | (`a`: `A`, `key`: `K`) => `B` | A transformation function that will be applied to each of the values in the `ReadonlyRecord`. |

#### Returns

`Record`<`K`, `B`\>

**`Example`**

```ts
import { map } from "@effect/data/ReadonlyRecord"

const f = (n: number) => `-${n}`

assert.deepStrictEqual(map({ a: 3, b: 5 }, f), { a: "-3", b: "-5" })

const g = (n: number, key: string) => `${key.toUpperCase()}-${n}`

assert.deepStrictEqual(map({ a: 3, b: 5 }, g), { a: "A-3", b: "B-5" })
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/ReadonlyRecord.d.ts:318

___

### modifyOption

▸ **modifyOption**<`A`, `B`\>(`key`, `f`): (`self`: [`ReadonlyRecord`](../interfaces/src_lib_primitives.Rec.ReadonlyRecord.md)<`A`\>) => [`Option`](src_lib_primitives.O.md#option)<`Record`<`string`, `A` \| `B`\>\>

Apply a function to the element at the specified key, creating a new record,
or return `None` if the key doesn't exist.

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The key of the element to modify. |
| `f` | (`a`: `A`) => `B` | The function to apply to the element. |

#### Returns

`fn`

▸ (`self`): [`Option`](src_lib_primitives.O.md#option)<`Record`<`string`, `A` \| `B`\>\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`ReadonlyRecord`](../interfaces/src_lib_primitives.Rec.ReadonlyRecord.md)<`A`\> |

##### Returns

[`Option`](src_lib_primitives.O.md#option)<`Record`<`string`, `A` \| `B`\>\>

**`Example`**

```ts
import { modifyOption } from "@effect/data/ReadonlyRecord"
import { some, none } from "@effect/data/Option"

const f = (x: number) => x * 2

assert.deepStrictEqual(
 modifyOption({ a: 3 }, 'a', f),
 some({ a: 6 })
)
assert.deepStrictEqual(
 modifyOption({ a: 3 }, 'b', f),
 none()
)
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/ReadonlyRecord.d.ts:232

▸ **modifyOption**<`A`, `B`\>(`self`, `key`, `f`): [`Option`](src_lib_primitives.O.md#option)<`Record`<`string`, `A` \| `B`\>\>

Apply a function to the element at the specified key, creating a new record,
or return `None` if the key doesn't exist.

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `self` | [`ReadonlyRecord`](../interfaces/src_lib_primitives.Rec.ReadonlyRecord.md)<`A`\> | The `ReadonlyRecord` to be updated. |
| `key` | `string` | The key of the element to modify. |
| `f` | (`a`: `A`) => `B` | The function to apply to the element. |

#### Returns

[`Option`](src_lib_primitives.O.md#option)<`Record`<`string`, `A` \| `B`\>\>

**`Example`**

```ts
import { modifyOption } from "@effect/data/ReadonlyRecord"
import { some, none } from "@effect/data/Option"

const f = (x: number) => x * 2

assert.deepStrictEqual(
 modifyOption({ a: 3 }, 'a', f),
 some({ a: 6 })
)
assert.deepStrictEqual(
 modifyOption({ a: 3 }, 'b', f),
 none()
)
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/ReadonlyRecord.d.ts:233

___

### remove

▸ **remove**(`key`): <A\>(`self`: [`ReadonlyRecord`](../interfaces/src_lib_primitives.Rec.ReadonlyRecord.md)<`A`\>) => `Record`<`string`, `A`\>

Removes a key from a `ReadonlyRecord` and returns a new `Record`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | the key to remove from the `ReadonlyRecord`. |

#### Returns

`fn`

▸ <`A`\>(`self`): `Record`<`string`, `A`\>

##### Type parameters

| Name |
| :------ |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`ReadonlyRecord`](../interfaces/src_lib_primitives.Rec.ReadonlyRecord.md)<`A`\> |

##### Returns

`Record`<`string`, `A`\>

**`Example`**

```ts
import { remove } from '@effect/data/ReadonlyRecord'

assert.deepStrictEqual(remove({ a: 1, b: 2 }, "a"), { b: 2 })
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/ReadonlyRecord.d.ts:272

▸ **remove**<`A`\>(`self`, `key`): `Record`<`string`, `A`\>

Removes a key from a `ReadonlyRecord` and returns a new `Record`

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `self` | [`ReadonlyRecord`](../interfaces/src_lib_primitives.Rec.ReadonlyRecord.md)<`A`\> | the `ReadonlyRecord` to remove the key from. |
| `key` | `string` | the key to remove from the `ReadonlyRecord`. |

#### Returns

`Record`<`string`, `A`\>

**`Example`**

```ts
import { remove } from '@effect/data/ReadonlyRecord'

assert.deepStrictEqual(remove({ a: 1, b: 2 }, "a"), { b: 2 })
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/ReadonlyRecord.d.ts:273

___

### replaceOption

▸ **replaceOption**<`B`\>(`key`, `b`): <A\>(`self`: [`ReadonlyRecord`](../interfaces/src_lib_primitives.Rec.ReadonlyRecord.md)<`A`\>) => [`Option`](src_lib_primitives.O.md#option)<`Record`<`string`, `B` \| `A`\>\>

Replaces a value in the record with the new value passed as parameter.

#### Type parameters

| Name |
| :------ |
| `B` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The key to search for in the record. |
| `b` | `B` | The new value to replace the existing value with. |

#### Returns

`fn`

▸ <`A`\>(`self`): [`Option`](src_lib_primitives.O.md#option)<`Record`<`string`, `B` \| `A`\>\>

##### Type parameters

| Name |
| :------ |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`ReadonlyRecord`](../interfaces/src_lib_primitives.Rec.ReadonlyRecord.md)<`A`\> |

##### Returns

[`Option`](src_lib_primitives.O.md#option)<`Record`<`string`, `B` \| `A`\>\>

**`Example`**

```ts
import { replaceOption } from "@effect/data/ReadonlyRecord"
import { some, none } from "@effect/data/Option"

assert.deepStrictEqual(
  replaceOption({ a: 1, b: 2, c: 3 }, 'a', 10),
  some({ a: 10, b: 2, c: 3 })
)
assert.deepStrictEqual(replaceOption({}, 'a', 10), none())
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/ReadonlyRecord.d.ts:255

▸ **replaceOption**<`A`, `B`\>(`self`, `key`, `b`): [`Option`](src_lib_primitives.O.md#option)<`Record`<`string`, `A` \| `B`\>\>

Replaces a value in the record with the new value passed as parameter.

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `self` | [`ReadonlyRecord`](../interfaces/src_lib_primitives.Rec.ReadonlyRecord.md)<`A`\> | The `ReadonlyRecord` to be updated. |
| `key` | `string` | The key to search for in the record. |
| `b` | `B` | The new value to replace the existing value with. |

#### Returns

[`Option`](src_lib_primitives.O.md#option)<`Record`<`string`, `A` \| `B`\>\>

**`Example`**

```ts
import { replaceOption } from "@effect/data/ReadonlyRecord"
import { some, none } from "@effect/data/Option"

assert.deepStrictEqual(
  replaceOption({ a: 1, b: 2, c: 3 }, 'a', 10),
  some({ a: 10, b: 2, c: 3 })
)
assert.deepStrictEqual(replaceOption({}, 'a', 10), none())
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/ReadonlyRecord.d.ts:256

___

### size

▸ **size**<`A`\>(`self`): `number`

Returns the number of key/value pairs in a `ReadonlyRecord`.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `self` | [`ReadonlyRecord`](../interfaces/src_lib_primitives.Rec.ReadonlyRecord.md)<`A`\> | A `ReadonlyRecord` to calculate the number of key/value pairs in. |

#### Returns

`number`

**`Example`**

```ts
import { size } from "@effect/data/ReadonlyRecord";

assert.deepStrictEqual(size({ a: "a", b: 1, c: true }), 3);
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/ReadonlyRecord.d.ts:166

## constructors

### empty

▸ **empty**<`A`\>(): `Record`<`string`, `A`\>

Creates a new, empty record.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Returns

`Record`<`string`, `A`\>

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/ReadonlyRecord.d.ts:29

## conversions

### collect

▸ **collect**<`K`, `A`, `B`\>(`f`): (`self`: `Record`<`K`, `A`\>) => `B`[]

Transforms the values of a `ReadonlyRecord` into an `Array` with a custom mapping function.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends `string` |
| `A` | `A` |
| `B` | `B` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `f` | (`key`: `K`, `a`: `A`) => `B` | The custom mapping function to apply to each key/value of the `ReadonlyRecord`. |

#### Returns

`fn`

▸ (`self`): `B`[]

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Record`<`K`, `A`\> |

##### Returns

`B`[]

**`Example`**

```ts
import { collect } from "@effect/data/ReadonlyRecord"

const x = { a: 1, b: 2, c: 3 }
assert.deepStrictEqual(collect(x, (key, n) => [key, n]), [["a", 1], ["b", 2], ["c", 3]])
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/ReadonlyRecord.d.ts:119

▸ **collect**<`K`, `A`, `B`\>(`self`, `f`): `B`[]

Transforms the values of a `ReadonlyRecord` into an `Array` with a custom mapping function.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends `string` |
| `A` | `A` |
| `B` | `B` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `self` | `Record`<`K`, `A`\> | The `ReadonlyRecord` to transform. |
| `f` | (`key`: `K`, `a`: `A`) => `B` | The custom mapping function to apply to each key/value of the `ReadonlyRecord`. |

#### Returns

`B`[]

**`Example`**

```ts
import { collect } from "@effect/data/ReadonlyRecord"

const x = { a: 1, b: 2, c: 3 }
assert.deepStrictEqual(collect(x, (key, n) => [key, n]), [["a", 1], ["b", 2], ["c", 3]])
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/ReadonlyRecord.d.ts:120

___

### fromEntries

▸ **fromEntries**<`A`\>(`self`): `Record`<`string`, `A`\>

Builds a record from an iterable of key-value pairs.

If there are conflicting keys when using `fromEntries`, the last occurrence of the key/value pair will overwrite the
previous ones. So the resulting record will only have the value of the last occurrence of each key.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `self` | `Iterable`<readonly [`string`, `A`]\> | The iterable of key-value pairs. |

#### Returns

`Record`<`string`, `A`\>

**`Example`**

```ts
import { fromEntries } from '@effect/data/ReadonlyRecord'

const input: Array<[string, number]> = [["a", 1], ["b", 2]]

assert.deepStrictEqual(fromEntries(input), { a: 1, b: 2 })
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/ReadonlyRecord.d.ts:102

___

### fromIterable

▸ **fromIterable**<`A`, `B`\>(`f`): (`self`: `Iterable`<`A`\>) => `Record`<`string`, `B`\>

Takes an iterable and a projection function and returns a record.
The projection function maps each value of the iterable to a tuple of a key and a value, which is then added to the resulting record.

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `f` | (`a`: `A`) => readonly [`string`, `B`] | A projection function that maps values of the iterable to a tuple of a key and a value. |

#### Returns

`fn`

▸ (`self`): `Record`<`string`, `B`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`<`A`\> |

##### Returns

`Record`<`string`, `B`\>

**`Example`**

```ts
import { fromIterable } from '@effect/data/ReadonlyRecord'

const input = [1, 2, 3, 4]

assert.deepStrictEqual(
  fromIterable(input, a => [String(a), a * 2]),
  { '1': 2, '2': 4, '3': 6, '4': 8 }
)
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/ReadonlyRecord.d.ts:81

▸ **fromIterable**<`A`, `B`\>(`self`, `f`): `Record`<`string`, `B`\>

Takes an iterable and a projection function and returns a record.
The projection function maps each value of the iterable to a tuple of a key and a value, which is then added to the resulting record.

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `self` | `Iterable`<`A`\> | An iterable of values to be mapped to a record. |
| `f` | (`a`: `A`) => readonly [`string`, `B`] | A projection function that maps values of the iterable to a tuple of a key and a value. |

#### Returns

`Record`<`string`, `B`\>

**`Example`**

```ts
import { fromIterable } from '@effect/data/ReadonlyRecord'

const input = [1, 2, 3, 4]

assert.deepStrictEqual(
  fromIterable(input, a => [String(a), a * 2]),
  { '1': 2, '2': 4, '3': 6, '4': 8 }
)
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/ReadonlyRecord.d.ts:82

___

### toArray

▸ **toArray**<`K`, `A`\>(`self`): [`K`, `A`][]

Takes a record and returns an array of tuples containing its keys and values.

Alias of [toEntries](src_lib_primitives.Rec.md#toentries).

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends `string` |
| `A` | `A` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `self` | `Record`<`K`, `A`\> | The record to transform. |

#### Returns

[`K`, `A`][]

**`Example`**

```ts
import { toArray } from "@effect/data/ReadonlyRecord"

const x = { a: 1, b: 2, c: 3 }
assert.deepStrictEqual(toArray(x), [["a", 1], ["b", 2], ["c", 3]])
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/ReadonlyRecord.d.ts:153

___

### toEntries

▸ **toEntries**<`K`, `A`\>(`self`): [`K`, `A`][]

Takes a record and returns an array of tuples containing its keys and values.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends `string` |
| `A` | `A` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `self` | `Record`<`K`, `A`\> | The record to transform. |

#### Returns

[`K`, `A`][]

**`Example`**

```ts
import { toEntries } from "@effect/data/ReadonlyRecord"

const x = { a: 1, b: 2, c: 3 }
assert.deepStrictEqual(toEntries(x), [["a", 1], ["b", 2], ["c", 3]])
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/ReadonlyRecord.d.ts:136

## filtering

### compact

▸ **compact**<`A`\>(`self`): `Record`<`string`, `A`\>

Given a `ReadonlyRecord` with `Option` values, returns a `Record` with only the `Some` values, with the same keys.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `self` | [`ReadonlyRecord`](../interfaces/src_lib_primitives.Rec.ReadonlyRecord.md)<[`Option`](src_lib_primitives.O.md#option)<`A`\>\> | A `ReadonlyRecord` with `Option` values. |

#### Returns

`Record`<`string`, `A`\>

**`Example`**

```ts
import { compact } from '@effect/data/ReadonlyRecord'
import { some, none } from '@effect/data/Option'

assert.deepStrictEqual(
  compact({ a: some(1), b: none(), c: some(2) }),
  { a: 1, c: 2 }
)
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/ReadonlyRecord.d.ts:379

___

### filter

▸ **filter**<`K`, `C`, `B`, `A`\>(`refinement`): (`self`: `Record`<`K`, `C`\>) => `Record`<`string`, `B`\>

Selects properties from a record whose values match the given predicate.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends `string` |
| `C` | `C` |
| `B` | `B` |
| `A` | `C` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `refinement` | (`a`: `A`, `key`: `K`) => a is B |

#### Returns

`fn`

▸ (`self`): `Record`<`string`, `B`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Record`<`K`, `C`\> |

##### Returns

`Record`<`string`, `B`\>

**`Example`**

```ts
import { filter } from '@effect/data/ReadonlyRecord'

const x = { a: 1, b: 2, c: 3, d: 4 }
assert.deepStrictEqual(filter(x, (n) => n > 2), { c: 3, d: 4 })
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/ReadonlyRecord.d.ts:357

▸ **filter**<`K`, `B`, `A`\>(`predicate`): (`self`: `Record`<`K`, `B`\>) => `Record`<`string`, `B`\>

Selects properties from a record whose values match the given predicate.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends `string` |
| `B` | `B` |
| `A` | `B` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `predicate` | (`a`: `A`, `key`: `K`) => `boolean` | A function that returns a `boolean` value to determine if the entry should be included in the new record. |

#### Returns

`fn`

▸ (`self`): `Record`<`string`, `B`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Record`<`K`, `B`\> |

##### Returns

`Record`<`string`, `B`\>

**`Example`**

```ts
import { filter } from '@effect/data/ReadonlyRecord'

const x = { a: 1, b: 2, c: 3, d: 4 }
assert.deepStrictEqual(filter(x, (n) => n > 2), { c: 3, d: 4 })
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/ReadonlyRecord.d.ts:358

▸ **filter**<`K`, `C`, `B`, `A`\>(`self`, `refinement`): `Record`<`string`, `B`\>

Selects properties from a record whose values match the given predicate.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends `string` |
| `C` | `C` |
| `B` | `B` |
| `A` | `C` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `self` | `Record`<`K`, `C`\> | The `ReadonlyRecord` to filter. |
| `refinement` | (`a`: `A`, `key`: `K`) => a is B | - |

#### Returns

`Record`<`string`, `B`\>

**`Example`**

```ts
import { filter } from '@effect/data/ReadonlyRecord'

const x = { a: 1, b: 2, c: 3, d: 4 }
assert.deepStrictEqual(filter(x, (n) => n > 2), { c: 3, d: 4 })
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/ReadonlyRecord.d.ts:359

▸ **filter**<`K`, `B`, `A`\>(`self`, `predicate`): `Record`<`string`, `B`\>

Selects properties from a record whose values match the given predicate.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends `string` |
| `B` | `B` |
| `A` | `B` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `self` | `Record`<`K`, `B`\> | The `ReadonlyRecord` to filter. |
| `predicate` | (`a`: `A`, `key`: `K`) => `boolean` | A function that returns a `boolean` value to determine if the entry should be included in the new record. |

#### Returns

`Record`<`string`, `B`\>

**`Example`**

```ts
import { filter } from '@effect/data/ReadonlyRecord'

const x = { a: 1, b: 2, c: 3, d: 4 }
assert.deepStrictEqual(filter(x, (n) => n > 2), { c: 3, d: 4 })
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/ReadonlyRecord.d.ts:360

___

### partition

▸ **partition**<`K`, `C`, `B`, `A`\>(`refinement`): (`self`: `Record`<`K`, `C`\>) => [`Record`<`string`, `C`\>, `Record`<`string`, `B`\>]

Partitions a `ReadonlyRecord` into two separate `Record`s based on the result of a predicate function.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends `string` |
| `C` | `C` |
| `B` | `B` |
| `A` | `C` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `refinement` | (`a`: `A`, `key`: `K`) => a is B |

#### Returns

`fn`

▸ (`self`): [`Record`<`string`, `C`\>, `Record`<`string`, `B`\>]

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Record`<`K`, `C`\> |

##### Returns

[`Record`<`string`, `C`\>, `Record`<`string`, `B`\>]

**`Example`**

```ts
import { partition } from '@effect/data/ReadonlyRecord'

assert.deepStrictEqual(
  partition({ a: 1, b: 3 }, (n) => n > 2),
  [{ a: 1 }, { b: 3 }]
)
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/ReadonlyRecord.d.ts:438

▸ **partition**<`K`, `B`, `A`\>(`predicate`): (`self`: `Record`<`K`, `B`\>) => [`Record`<`string`, `B`\>, `Record`<`string`, `B`\>]

Partitions a `ReadonlyRecord` into two separate `Record`s based on the result of a predicate function.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends `string` |
| `B` | `B` |
| `A` | `B` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `predicate` | (`a`: `A`, `key`: `K`) => `boolean` | The partitioning function to determine the partitioning of each value of the `ReadonlyRecord`. |

#### Returns

`fn`

▸ (`self`): [`Record`<`string`, `B`\>, `Record`<`string`, `B`\>]

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Record`<`K`, `B`\> |

##### Returns

[`Record`<`string`, `B`\>, `Record`<`string`, `B`\>]

**`Example`**

```ts
import { partition } from '@effect/data/ReadonlyRecord'

assert.deepStrictEqual(
  partition({ a: 1, b: 3 }, (n) => n > 2),
  [{ a: 1 }, { b: 3 }]
)
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/ReadonlyRecord.d.ts:439

▸ **partition**<`K`, `C`, `B`, `A`\>(`self`, `refinement`): [`Record`<`string`, `C`\>, `Record`<`string`, `B`\>]

Partitions a `ReadonlyRecord` into two separate `Record`s based on the result of a predicate function.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends `string` |
| `C` | `C` |
| `B` | `B` |
| `A` | `C` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `self` | `Record`<`K`, `C`\> | The input `ReadonlyRecord` to partition. |
| `refinement` | (`a`: `A`, `key`: `K`) => a is B | - |

#### Returns

[`Record`<`string`, `C`\>, `Record`<`string`, `B`\>]

**`Example`**

```ts
import { partition } from '@effect/data/ReadonlyRecord'

assert.deepStrictEqual(
  partition({ a: 1, b: 3 }, (n) => n > 2),
  [{ a: 1 }, { b: 3 }]
)
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/ReadonlyRecord.d.ts:440

▸ **partition**<`K`, `B`, `A`\>(`self`, `predicate`): [`Record`<`string`, `B`\>, `Record`<`string`, `B`\>]

Partitions a `ReadonlyRecord` into two separate `Record`s based on the result of a predicate function.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends `string` |
| `B` | `B` |
| `A` | `B` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `self` | `Record`<`K`, `B`\> | The input `ReadonlyRecord` to partition. |
| `predicate` | (`a`: `A`, `key`: `K`) => `boolean` | The partitioning function to determine the partitioning of each value of the `ReadonlyRecord`. |

#### Returns

[`Record`<`string`, `B`\>, `Record`<`string`, `B`\>]

**`Example`**

```ts
import { partition } from '@effect/data/ReadonlyRecord'

assert.deepStrictEqual(
  partition({ a: 1, b: 3 }, (n) => n > 2),
  [{ a: 1 }, { b: 3 }]
)
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/ReadonlyRecord.d.ts:441

___

### partitionMap

▸ **partitionMap**<`K`, `A`, `B`, `C`\>(`f`): (`self`: `Record`<`K`, `A`\>) => [`Record`<`string`, `B`\>, `Record`<`string`, `C`\>]

Partitions the elements of a `ReadonlyRecord` into two groups: those that match a predicate, and those that don't.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends `string` |
| `A` | `A` |
| `B` | `B` |
| `C` | `C` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `f` | (`a`: `A`, `key`: `K`) => [`Either`](src_lib_primitives.E.md#either)<`B`, `C`\> | The predicate function to apply to each element. |

#### Returns

`fn`

▸ (`self`): [`Record`<`string`, `B`\>, `Record`<`string`, `C`\>]

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Record`<`K`, `A`\> |

##### Returns

[`Record`<`string`, `B`\>, `Record`<`string`, `C`\>]

**`Example`**

```ts
import { partitionMap } from '@effect/data/ReadonlyRecord'
import { left, right } from '@effect/data/Either'

const x = { a: 1, b: 2, c: 3 }
const f = (n: number) => (n % 2 === 0 ? right(n) : left(n))
assert.deepStrictEqual(partitionMap(x, f), [{ a: 1, c: 3 }, { b: 2}])
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/ReadonlyRecord.d.ts:398

▸ **partitionMap**<`K`, `A`, `B`, `C`\>(`self`, `f`): [`Record`<`string`, `B`\>, `Record`<`string`, `C`\>]

Partitions the elements of a `ReadonlyRecord` into two groups: those that match a predicate, and those that don't.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends `string` |
| `A` | `A` |
| `B` | `B` |
| `C` | `C` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `self` | `Record`<`K`, `A`\> | The `ReadonlyRecord` to partition. |
| `f` | (`a`: `A`, `key`: `K`) => [`Either`](src_lib_primitives.E.md#either)<`B`, `C`\> | The predicate function to apply to each element. |

#### Returns

[`Record`<`string`, `B`\>, `Record`<`string`, `C`\>]

**`Example`**

```ts
import { partitionMap } from '@effect/data/ReadonlyRecord'
import { left, right } from '@effect/data/Either'

const x = { a: 1, b: 2, c: 3 }
const f = (n: number) => (n % 2 === 0 ? right(n) : left(n))
assert.deepStrictEqual(partitionMap(x, f), [{ a: 1, c: 3 }, { b: 2}])
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/ReadonlyRecord.d.ts:399

___

### separate

▸ **separate**<`A`, `B`\>(`self`): [`Record`<`string`, `A`\>, `Record`<`string`, `B`\>]

Partitions a `ReadonlyRecord` of `Either` values into two separate records,
one with the `Left` values and one with the `Right` values.

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `self` | [`ReadonlyRecord`](../interfaces/src_lib_primitives.Rec.ReadonlyRecord.md)<[`Either`](src_lib_primitives.E.md#either)<`A`, `B`\>\> | the `ReadonlyRecord` to partition. |

#### Returns

[`Record`<`string`, `A`\>, `Record`<`string`, `B`\>]

**`Example`**

```ts
import { separate } from '@effect/data/ReadonlyRecord'
import { left, right } from '@effect/data/Either'

assert.deepStrictEqual(
  separate({ a: left("e"), b: right(1) }),
  [{ a: "e" }, { b: 1 }]
)
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/ReadonlyRecord.d.ts:419

## guards

### isEmptyReadonlyRecord

▸ **isEmptyReadonlyRecord**<`A`\>(`self`): self is ReadonlyRecord<never\>

Determine if a `ReadonlyRecord` is empty.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `self` | [`ReadonlyRecord`](../interfaces/src_lib_primitives.Rec.ReadonlyRecord.md)<`A`\> | `ReadonlyRecord` to test for emptiness. |

#### Returns

self is ReadonlyRecord<never\>

**`Example`**

```ts
import { isEmptyReadonlyRecord } from "@effect/data/ReadonlyRecord"

assert.deepStrictEqual(isEmptyReadonlyRecord({}), true);
assert.deepStrictEqual(isEmptyReadonlyRecord({ a: 3 }), false);
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/ReadonlyRecord.d.ts:59

___

### isEmptyRecord

▸ **isEmptyRecord**<`A`\>(`self`): self is Record<string, never\>

Determine if a `Record` is empty.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `self` | `Record`<`string`, `A`\> | `Record` to test for emptiness. |

#### Returns

self is Record<string, never\>

**`Example`**

```ts
import { isEmptyRecord } from "@effect/data/ReadonlyRecord"

assert.deepStrictEqual(isEmptyRecord({}), true);
assert.deepStrictEqual(isEmptyRecord({ a: 3 }), false);
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/ReadonlyRecord.d.ts:44

## record

### pop

▸ **pop**(`key`): <A\>(`self`: [`ReadonlyRecord`](../interfaces/src_lib_primitives.Rec.ReadonlyRecord.md)<`A`\>) => [`Option`](src_lib_primitives.O.md#option)<readonly [`A`, [`ReadonlyRecord`](../interfaces/src_lib_primitives.Rec.ReadonlyRecord.md)<`A`\>]\>

Retrieves the value of the property with the given `key` from a `ReadonlyRecord` and returns an `Option`
of a tuple with the value and the `ReadonlyRecord` with the removed property.
If the key is not present, returns `O.none`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The key of the property to retrieve. |

#### Returns

`fn`

▸ <`A`\>(`self`): [`Option`](src_lib_primitives.O.md#option)<readonly [`A`, [`ReadonlyRecord`](../interfaces/src_lib_primitives.Rec.ReadonlyRecord.md)<`A`\>]\>

##### Type parameters

| Name |
| :------ |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`ReadonlyRecord`](../interfaces/src_lib_primitives.Rec.ReadonlyRecord.md)<`A`\> |

##### Returns

[`Option`](src_lib_primitives.O.md#option)<readonly [`A`, [`ReadonlyRecord`](../interfaces/src_lib_primitives.Rec.ReadonlyRecord.md)<`A`\>]\>

**`Example`**

```ts
import { pop } from '@effect/data/ReadonlyRecord'
import { some, none } from '@effect/data/Option'

assert.deepStrictEqual(pop({ a: 1, b: 2 }, "a"), some([1, { b: 2 }]))
assert.deepStrictEqual(pop({ a: 1, b: 2 }, "c"), none())
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/ReadonlyRecord.d.ts:294

▸ **pop**<`A`\>(`self`, `key`): [`Option`](src_lib_primitives.O.md#option)<readonly [`A`, [`ReadonlyRecord`](../interfaces/src_lib_primitives.Rec.ReadonlyRecord.md)<`A`\>]\>

Retrieves the value of the property with the given `key` from a `ReadonlyRecord` and returns an `Option`
of a tuple with the value and the `ReadonlyRecord` with the removed property.
If the key is not present, returns `O.none`.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `self` | [`ReadonlyRecord`](../interfaces/src_lib_primitives.Rec.ReadonlyRecord.md)<`A`\> | The input `ReadonlyRecord`. |
| `key` | `string` | The key of the property to retrieve. |

#### Returns

[`Option`](src_lib_primitives.O.md#option)<readonly [`A`, [`ReadonlyRecord`](../interfaces/src_lib_primitives.Rec.ReadonlyRecord.md)<`A`\>]\>

**`Example`**

```ts
import { pop } from '@effect/data/ReadonlyRecord'
import { some, none } from '@effect/data/Option'

assert.deepStrictEqual(pop({ a: 1, b: 2 }, "a"), some([1, { b: 2 }]))
assert.deepStrictEqual(pop({ a: 1, b: 2 }, "c"), none())
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/ReadonlyRecord.d.ts:295
