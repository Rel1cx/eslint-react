[@eslint-react/tools](../README.md) / Record

# Namespace: Record

## Table of contents

### Interfaces

- [ReadonlyRecord](../interfaces/Record.ReadonlyRecord.md)
- [ReadonlyRecordTypeLambda](../interfaces/Record.ReadonlyRecordTypeLambda.md)

### Functions

- [collect](Record.md#collect)
- [difference](Record.md#difference)
- [empty](Record.md#empty)
- [every](Record.md#every)
- [filter](Record.md#filter)
- [filterMap](Record.md#filtermap)
- [fromEntries](Record.md#fromentries)
- [fromIterable](Record.md#fromiterable)
- [get](Record.md#get)
- [getEquivalence](Record.md#getequivalence)
- [getLefts](Record.md#getlefts)
- [getRights](Record.md#getrights)
- [getSomes](Record.md#getsomes)
- [has](Record.md#has)
- [intersection](Record.md#intersection)
- [isEmptyReadonlyRecord](Record.md#isemptyreadonlyrecord)
- [isEmptyRecord](Record.md#isemptyrecord)
- [isSubrecord](Record.md#issubrecord)
- [isSubrecordBy](Record.md#issubrecordby)
- [keys](Record.md#keys)
- [map](Record.md#map)
- [modifyOption](Record.md#modifyoption)
- [partition](Record.md#partition)
- [partitionMap](Record.md#partitionmap)
- [pop](Record.md#pop)
- [reduce](Record.md#reduce)
- [remove](Record.md#remove)
- [replaceOption](Record.md#replaceoption)
- [separate](Record.md#separate)
- [singleton](Record.md#singleton)
- [size](Record.md#size)
- [some](Record.md#some)
- [toEntries](Record.md#toentries)
- [union](Record.md#union)
- [update](Record.md#update)
- [upsert](Record.md#upsert)
- [values](Record.md#values)

## Other

### difference

▸ **difference**\<`A`\>(`that`): (`self`: [`ReadonlyRecord`](../interfaces/Record.ReadonlyRecord.md)\<`A`\>) => `Record`\<`string`, `A`\>

Merge two records, preserving only the entries that are unique to each record.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name   | Type                                                              | Description                                  |
| :----- | :---------------------------------------------------------------- | :------------------------------------------- |
| `that` | [`ReadonlyRecord`](../interfaces/Record.ReadonlyRecord.md)\<`A`\> | The second record to compare with the first. |

#### Returns

`fn`

▸ (`self`): `Record`\<`string`, `A`\>

##### Parameters

| Name   | Type                                                              |
| :----- | :---------------------------------------------------------------- |
| `self` | [`ReadonlyRecord`](../interfaces/Record.ReadonlyRecord.md)\<`A`\> |

##### Returns

`Record`\<`string`, `A`\>

**`Since`**

2.0.0

▸ **difference**\<`A`\>(`self`, `that`): `Record`\<`string`, `A`\>

Merge two records, preserving only the entries that are unique to each record.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name   | Type                                                              | Description                                  |
| :----- | :---------------------------------------------------------------- | :------------------------------------------- |
| `self` | [`ReadonlyRecord`](../interfaces/Record.ReadonlyRecord.md)\<`A`\> | The first record.                            |
| `that` | [`ReadonlyRecord`](../interfaces/Record.ReadonlyRecord.md)\<`A`\> | The second record to compare with the first. |

#### Returns

`Record`\<`string`, `A`\>

**`Since`**

2.0.0

---

### every

▸ **every**\<`A`, `K`, `B`\>(`refinement`): (`self`: `Record`\<`K`, `A`\>) => self is Readonly\<Record\<K, B\>\>

Check if all entries in a record meet a specific condition.

#### Type parameters

| Name | Type             |
| :--- | :--------------- |
| `A`  | `A`              |
| `K`  | extends `string` |
| `B`  | `B`              |

#### Parameters

| Name         | Type                                     |
| :----------- | :--------------------------------------- |
| `refinement` | (`value`: `A`, `key`: `K`) => value is B |

#### Returns

`fn`

▸ (`self`): self is Readonly\<Record\<K, B\>\>

##### Parameters

| Name   | Type                 |
| :----- | :------------------- |
| `self` | `Record`\<`K`, `A`\> |

##### Returns

self is Readonly\<Record\<K, B\>\>

**`Since`**

2.0.0

▸ **every**\<`A`, `K`\>(`predicate`): (`self`: `Record`\<`K`, `A`\>) => `boolean`

Check if all entries in a record meet a specific condition.

#### Type parameters

| Name | Type             |
| :--- | :--------------- |
| `A`  | `A`              |
| `K`  | extends `string` |

#### Parameters

| Name        | Type                                    | Description                                 |
| :---------- | :-------------------------------------- | :------------------------------------------ |
| `predicate` | (`value`: `A`, `key`: `K`) => `boolean` | The condition to test entries (value, key). |

#### Returns

`fn`

▸ (`self`): `boolean`

##### Parameters

| Name   | Type                 |
| :----- | :------------------- |
| `self` | `Record`\<`K`, `A`\> |

##### Returns

`boolean`

**`Since`**

2.0.0

▸ **every**\<`A`, `K`, `B`\>(`self`, `refinement`): self is Readonly\<Record\<K, B\>\>

Check if all entries in a record meet a specific condition.

#### Type parameters

| Name | Type             |
| :--- | :--------------- |
| `A`  | `A`              |
| `K`  | extends `string` |
| `B`  | `B`              |

#### Parameters

| Name         | Type                                     | Description          |
| :----------- | :--------------------------------------- | :------------------- |
| `self`       | `Record`\<`K`, `A`\>                     | The record to check. |
| `refinement` | (`value`: `A`, `key`: `K`) => value is B | -                    |

#### Returns

self is Readonly\<Record\<K, B\>\>

**`Since`**

2.0.0

▸ **every**\<`K`, `A`\>(`self`, `predicate`): `boolean`

Check if all entries in a record meet a specific condition.

#### Type parameters

| Name | Type             |
| :--- | :--------------- |
| `K`  | extends `string` |
| `A`  | `A`              |

#### Parameters

| Name        | Type                                    | Description                                 |
| :---------- | :-------------------------------------- | :------------------------------------------ |
| `self`      | `Record`\<`K`, `A`\>                    | The record to check.                        |
| `predicate` | (`value`: `A`, `key`: `K`) => `boolean` | The condition to test entries (value, key). |

#### Returns

`boolean`

**`Since`**

2.0.0

---

### filterMap

▸ **filterMap**\<`K`, `A`, `B`\>(`f`): (`self`: `Record`\<`K`, `A`\>) => `Record`\<`string`, `B`\>

Transforms a record into a record by applying the function `f` to each key and value in the original record.
If the function returns `Some`, the key-value pair is included in the output record.

#### Type parameters

| Name | Type             |
| :--- | :--------------- |
| `K`  | extends `string` |
| `A`  | `A`              |
| `B`  | `B`              |

#### Parameters

| Name | Type                                                     | Description                  |
| :--- | :------------------------------------------------------- | :--------------------------- |
| `f`  | (`a`: `A`, `key`: `K`) => [`Option`](O.md#option)\<`B`\> | The transformation function. |

#### Returns

`fn`

▸ (`self`): `Record`\<`string`, `B`\>

##### Parameters

| Name   | Type                 |
| :----- | :------------------- |
| `self` | `Record`\<`K`, `A`\> |

##### Returns

`Record`\<`string`, `B`\>

**`Example`**

```ts
import { filterMap } from "effect/ReadonlyRecord";
import { some, none } from "effect/Option";

const x = { a: 1, b: 2, c: 3 };
const f = (a: number, key: string) => a > 2 ? some(a * 2) : none();
assert.deepStrictEqual(filterMap(x, f), { c: 6 });
```

**`Since`**

2.0.0

▸ **filterMap**\<`K`, `A`, `B`\>(`self`, `f`): `Record`\<`string`, `B`\>

Transforms a record into a record by applying the function `f` to each key and value in the original record.
If the function returns `Some`, the key-value pair is included in the output record.

#### Type parameters

| Name | Type             |
| :--- | :--------------- |
| `K`  | extends `string` |
| `A`  | `A`              |
| `B`  | `B`              |

#### Parameters

| Name   | Type                                                     | Description                  |
| :----- | :------------------------------------------------------- | :--------------------------- |
| `self` | `Record`\<`K`, `A`\>                                     | The input record.            |
| `f`    | (`a`: `A`, `key`: `K`) => [`Option`](O.md#option)\<`B`\> | The transformation function. |

#### Returns

`Record`\<`string`, `B`\>

**`Example`**

```ts
import { filterMap } from "effect/ReadonlyRecord";
import { some, none } from "effect/Option";

const x = { a: 1, b: 2, c: 3 };
const f = (a: number, key: string) => a > 2 ? some(a * 2) : none();
assert.deepStrictEqual(filterMap(x, f), { c: 6 });
```

**`Since`**

2.0.0

---

### get

▸ **get**(`key`): \<A\>(`self`: [`ReadonlyRecord`](../interfaces/Record.ReadonlyRecord.md)\<`A`\>) => [`Option`](O.md#option)\<`A`\>

Retrieve a value at a particular key from a record, returning it wrapped in an `Option`.

#### Parameters

| Name  | Type     | Description                  |
| :---- | :------- | :--------------------------- |
| `key` | `string` | Key to retrieve from record. |

#### Returns

`fn`

▸ \<`A`\>(`self`): [`Option`](O.md#option)\<`A`\>

##### Type parameters

| Name |
| :--- |
| `A`  |

##### Parameters

| Name   | Type                                                              |
| :----- | :---------------------------------------------------------------- |
| `self` | [`ReadonlyRecord`](../interfaces/Record.ReadonlyRecord.md)\<`A`\> |

##### Returns

[`Option`](O.md#option)\<`A`\>

**`Example`**

```ts
import { get } from "effect/ReadonlyRecord";
import { some, none } from "effect/Option";

const person = { name: "John Doe", age: 35 };

assert.deepStrictEqual(get(person, "name"), some("John Doe"));
assert.deepStrictEqual(get(person, "email"), none());
```

**`Since`**

2.0.0

▸ **get**\<`A`\>(`self`, `key`): [`Option`](O.md#option)\<`A`\>

Retrieve a value at a particular key from a record, returning it wrapped in an `Option`.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name   | Type                                                              | Description                        |
| :----- | :---------------------------------------------------------------- | :--------------------------------- |
| `self` | [`ReadonlyRecord`](../interfaces/Record.ReadonlyRecord.md)\<`A`\> | The record to retrieve value from. |
| `key`  | `string`                                                          | Key to retrieve from record.       |

#### Returns

[`Option`](O.md#option)\<`A`\>

**`Example`**

```ts
import { get } from "effect/ReadonlyRecord";
import { some, none } from "effect/Option";

const person = { name: "John Doe", age: 35 };

assert.deepStrictEqual(get(person, "name"), some("John Doe"));
assert.deepStrictEqual(get(person, "email"), none());
```

**`Since`**

2.0.0

---

### has

▸ **has**(`key`): \<A\>(`self`: [`ReadonlyRecord`](../interfaces/Record.ReadonlyRecord.md)\<`A`\>) => `boolean`

Check if a given `key` exists in a record.

#### Parameters

| Name  | Type     | Description                        |
| :---- | :------- | :--------------------------------- |
| `key` | `string` | the key to look for in the record. |

#### Returns

`fn`

▸ \<`A`\>(`self`): `boolean`

##### Type parameters

| Name |
| :--- |
| `A`  |

##### Parameters

| Name   | Type                                                              |
| :----- | :---------------------------------------------------------------- |
| `self` | [`ReadonlyRecord`](../interfaces/Record.ReadonlyRecord.md)\<`A`\> |

##### Returns

`boolean`

**`Example`**

```ts
import { has } from "effect/ReadonlyRecord";

assert.deepStrictEqual(has({ a: 1, b: 2 }, "a"), true);
assert.deepStrictEqual(has({ a: 1, b: 2 }, "c"), false);
```

**`Since`**

2.0.0

▸ **has**\<`A`\>(`self`, `key`): `boolean`

Check if a given `key` exists in a record.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name   | Type                                                              | Description                        |
| :----- | :---------------------------------------------------------------- | :--------------------------------- |
| `self` | [`ReadonlyRecord`](../interfaces/Record.ReadonlyRecord.md)\<`A`\> | the record to look in.             |
| `key`  | `string`                                                          | the key to look for in the record. |

#### Returns

`boolean`

**`Example`**

```ts
import { has } from "effect/ReadonlyRecord";

assert.deepStrictEqual(has({ a: 1, b: 2 }, "a"), true);
assert.deepStrictEqual(has({ a: 1, b: 2 }, "c"), false);
```

**`Since`**

2.0.0

---

### intersection

▸ **intersection**\<`A`\>(`that`, `combine`): (`self`: [`ReadonlyRecord`](../interfaces/Record.ReadonlyRecord.md)\<`A`\>) => `Record`\<`string`, `A`\>

Merge two records, retaining only the entries that exist in both records.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name      | Type                                                              | Description                                                   |
| :-------- | :---------------------------------------------------------------- | :------------------------------------------------------------ |
| `that`    | [`ReadonlyRecord`](../interfaces/Record.ReadonlyRecord.md)\<`A`\> | The second record to merge with the first.                    |
| `combine` | (`selfValue`: `A`, `thatValue`: `A`) => `A`                       | A function to specify how to merge entries with the same key. |

#### Returns

`fn`

▸ (`self`): `Record`\<`string`, `A`\>

##### Parameters

| Name   | Type                                                              |
| :----- | :---------------------------------------------------------------- |
| `self` | [`ReadonlyRecord`](../interfaces/Record.ReadonlyRecord.md)\<`A`\> |

##### Returns

`Record`\<`string`, `A`\>

**`Since`**

2.0.0

▸ **intersection**\<`A`\>(`self`, `that`, `combine`): `Record`\<`string`, `A`\>

Merge two records, retaining only the entries that exist in both records.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name      | Type                                                              | Description                                                   |
| :-------- | :---------------------------------------------------------------- | :------------------------------------------------------------ |
| `self`    | [`ReadonlyRecord`](../interfaces/Record.ReadonlyRecord.md)\<`A`\> | The first record.                                             |
| `that`    | [`ReadonlyRecord`](../interfaces/Record.ReadonlyRecord.md)\<`A`\> | The second record to merge with the first.                    |
| `combine` | (`selfValue`: `A`, `thatValue`: `A`) => `A`                       | A function to specify how to merge entries with the same key. |

#### Returns

`Record`\<`string`, `A`\>

**`Since`**

2.0.0

---

### isSubrecord

▸ **isSubrecord**\<`A`\>(`that`): (`self`: [`ReadonlyRecord`](../interfaces/Record.ReadonlyRecord.md)\<`A`\>) => `boolean`

Check if one record is a subrecord of another, meaning it contains all the keys and values found in the second record.
This comparison uses default equality checks (`Equal.equivalence()`).

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name   | Type                                                              | Description                           |
| :----- | :---------------------------------------------------------------- | :------------------------------------ |
| `that` | [`ReadonlyRecord`](../interfaces/Record.ReadonlyRecord.md)\<`A`\> | The second record to compare against. |

#### Returns

`fn`

▸ (`self`): `boolean`

##### Parameters

| Name   | Type                                                              |
| :----- | :---------------------------------------------------------------- |
| `self` | [`ReadonlyRecord`](../interfaces/Record.ReadonlyRecord.md)\<`A`\> |

##### Returns

`boolean`

**`Since`**

2.0.0

▸ **isSubrecord**\<`A`\>(`self`, `that`): `boolean`

Check if one record is a subrecord of another, meaning it contains all the keys and values found in the second record.
This comparison uses default equality checks (`Equal.equivalence()`).

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name   | Type                                                              | Description                           |
| :----- | :---------------------------------------------------------------- | :------------------------------------ |
| `self` | [`ReadonlyRecord`](../interfaces/Record.ReadonlyRecord.md)\<`A`\> | The first record to check.            |
| `that` | [`ReadonlyRecord`](../interfaces/Record.ReadonlyRecord.md)\<`A`\> | The second record to compare against. |

#### Returns

`boolean`

**`Since`**

2.0.0

---

### isSubrecordBy

▸ **isSubrecordBy**\<`A`\>(`equivalence`): (`that`: [`ReadonlyRecord`](../interfaces/Record.ReadonlyRecord.md)\<`A`\>) => (`self`: [`ReadonlyRecord`](../interfaces/Record.ReadonlyRecord.md)\<`A`\>) => `boolean`(`self`: [`ReadonlyRecord`](../interfaces/Record.ReadonlyRecord.md)\<`A`\>, `that`: [`ReadonlyRecord`](../interfaces/Record.ReadonlyRecord.md)\<`A`\>) => `boolean`

Check if all the keys and values in one record are also found in another record.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name          | Type                 | Description                   |
| :------------ | :------------------- | :---------------------------- |
| `equivalence` | `Equivalence`\<`A`\> | A function to compare values. |

#### Returns

`fn`

▸ (`that`): (`self`: [`ReadonlyRecord`](../interfaces/Record.ReadonlyRecord.md)\<`A`\>) => `boolean`

##### Parameters

| Name   | Type                                                              |
| :----- | :---------------------------------------------------------------- |
| `that` | [`ReadonlyRecord`](../interfaces/Record.ReadonlyRecord.md)\<`A`\> |

##### Returns

`fn`

▸ (`self`): `boolean`

##### Parameters

| Name   | Type                                                              |
| :----- | :---------------------------------------------------------------- |
| `self` | [`ReadonlyRecord`](../interfaces/Record.ReadonlyRecord.md)\<`A`\> |

##### Returns

`boolean`

▸ (`self`, `that`): `boolean`

##### Parameters

| Name   | Type                                                              |
| :----- | :---------------------------------------------------------------- |
| `self` | [`ReadonlyRecord`](../interfaces/Record.ReadonlyRecord.md)\<`A`\> |
| `that` | [`ReadonlyRecord`](../interfaces/Record.ReadonlyRecord.md)\<`A`\> |

##### Returns

`boolean`

**`Since`**

2.0.0

---

### keys

▸ **keys**\<`A`\>(`self`): `string`[]

Retrieve the keys of a given record as an array.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name   | Type                                                              | Description                                    |
| :----- | :---------------------------------------------------------------- | :--------------------------------------------- |
| `self` | [`ReadonlyRecord`](../interfaces/Record.ReadonlyRecord.md)\<`A`\> | The object for which you want to get the keys. |

#### Returns

`string`[]

**`Since`**

2.0.0

---

### modifyOption

▸ **modifyOption**\<`A`, `B`\>(`key`, `f`): (`self`: [`ReadonlyRecord`](../interfaces/Record.ReadonlyRecord.md)\<`A`\>) => [`Option`](O.md#option)\<`Record`\<`string`, `A` \| `B`\>\>

Apply a function to the element at the specified key, creating a new record,
or return `None` if the key doesn't exist.

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |

#### Parameters

| Name  | Type              | Description                           |
| :---- | :---------------- | :------------------------------------ |
| `key` | `string`          | The key of the element to modify.     |
| `f`   | (`a`: `A`) => `B` | The function to apply to the element. |

#### Returns

`fn`

▸ (`self`): [`Option`](O.md#option)\<`Record`\<`string`, `A` \| `B`\>\>

##### Parameters

| Name   | Type                                                              |
| :----- | :---------------------------------------------------------------- |
| `self` | [`ReadonlyRecord`](../interfaces/Record.ReadonlyRecord.md)\<`A`\> |

##### Returns

[`Option`](O.md#option)\<`Record`\<`string`, `A` \| `B`\>\>

**`Example`**

```ts
import { modifyOption } from "effect/ReadonlyRecord";
import { some, none } from "effect/Option";

const f = (x: number) => x * 2;

assert.deepStrictEqual(
  modifyOption({ a: 3 }, "a", f),
  some({ a: 6 }),
);
assert.deepStrictEqual(
  modifyOption({ a: 3 }, "b", f),
  none(),
);
```

**`Since`**

2.0.0

▸ **modifyOption**\<`A`, `B`\>(`self`, `key`, `f`): [`Option`](O.md#option)\<`Record`\<`string`, `A` \| `B`\>\>

Apply a function to the element at the specified key, creating a new record,
or return `None` if the key doesn't exist.

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |

#### Parameters

| Name   | Type                                                              | Description                           |
| :----- | :---------------------------------------------------------------- | :------------------------------------ |
| `self` | [`ReadonlyRecord`](../interfaces/Record.ReadonlyRecord.md)\<`A`\> | The record to be updated.             |
| `key`  | `string`                                                          | The key of the element to modify.     |
| `f`    | (`a`: `A`) => `B`                                                 | The function to apply to the element. |

#### Returns

[`Option`](O.md#option)\<`Record`\<`string`, `A` \| `B`\>\>

**`Example`**

```ts
import { modifyOption } from "effect/ReadonlyRecord";
import { some, none } from "effect/Option";

const f = (x: number) => x * 2;

assert.deepStrictEqual(
  modifyOption({ a: 3 }, "a", f),
  some({ a: 6 }),
);
assert.deepStrictEqual(
  modifyOption({ a: 3 }, "b", f),
  none(),
);
```

**`Since`**

2.0.0

---

### remove

▸ **remove**(`key`): \<A\>(`self`: [`ReadonlyRecord`](../interfaces/Record.ReadonlyRecord.md)\<`A`\>) => `Record`\<`string`, `A`\>

Removes a key from a record and returns a new record

#### Parameters

| Name  | Type     | Description                        |
| :---- | :------- | :--------------------------------- |
| `key` | `string` | the key to remove from the record. |

#### Returns

`fn`

▸ \<`A`\>(`self`): `Record`\<`string`, `A`\>

##### Type parameters

| Name |
| :--- |
| `A`  |

##### Parameters

| Name   | Type                                                              |
| :----- | :---------------------------------------------------------------- |
| `self` | [`ReadonlyRecord`](../interfaces/Record.ReadonlyRecord.md)\<`A`\> |

##### Returns

`Record`\<`string`, `A`\>

**`Example`**

```ts
import { remove } from "effect/ReadonlyRecord";

assert.deepStrictEqual(remove({ a: 1, b: 2 }, "a"), { b: 2 });
```

**`Since`**

2.0.0

▸ **remove**\<`A`\>(`self`, `key`): `Record`\<`string`, `A`\>

Removes a key from a record and returns a new record

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name   | Type                                                              | Description                        |
| :----- | :---------------------------------------------------------------- | :--------------------------------- |
| `self` | [`ReadonlyRecord`](../interfaces/Record.ReadonlyRecord.md)\<`A`\> | the record to remove the key from. |
| `key`  | `string`                                                          | the key to remove from the record. |

#### Returns

`Record`\<`string`, `A`\>

**`Example`**

```ts
import { remove } from "effect/ReadonlyRecord";

assert.deepStrictEqual(remove({ a: 1, b: 2 }, "a"), { b: 2 });
```

**`Since`**

2.0.0

---

### replaceOption

▸ **replaceOption**\<`B`\>(`key`, `b`): \<A\>(`self`: [`ReadonlyRecord`](../interfaces/Record.ReadonlyRecord.md)\<`A`\>) => [`Option`](O.md#option)\<`Record`\<`string`, `B` \| `A`\>\>

Replaces a value in the record with the new value passed as parameter.

#### Type parameters

| Name |
| :--- |
| `B`  |

#### Parameters

| Name  | Type     | Description                                       |
| :---- | :------- | :------------------------------------------------ |
| `key` | `string` | The key to search for in the record.              |
| `b`   | `B`      | The new value to replace the existing value with. |

#### Returns

`fn`

▸ \<`A`\>(`self`): [`Option`](O.md#option)\<`Record`\<`string`, `B` \| `A`\>\>

##### Type parameters

| Name |
| :--- |
| `A`  |

##### Parameters

| Name   | Type                                                              |
| :----- | :---------------------------------------------------------------- |
| `self` | [`ReadonlyRecord`](../interfaces/Record.ReadonlyRecord.md)\<`A`\> |

##### Returns

[`Option`](O.md#option)\<`Record`\<`string`, `B` \| `A`\>\>

**`Example`**

```ts
import { replaceOption } from "effect/ReadonlyRecord";
import { some, none } from "effect/Option";

assert.deepStrictEqual(
  replaceOption({ a: 1, b: 2, c: 3 }, "a", 10),
  some({ a: 10, b: 2, c: 3 }),
);
assert.deepStrictEqual(replaceOption({}, "a", 10), none());
```

**`Since`**

2.0.0

▸ **replaceOption**\<`A`, `B`\>(`self`, `key`, `b`): [`Option`](O.md#option)\<`Record`\<`string`, `A` \| `B`\>\>

Replaces a value in the record with the new value passed as parameter.

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |

#### Parameters

| Name   | Type                                                              | Description                                       |
| :----- | :---------------------------------------------------------------- | :------------------------------------------------ |
| `self` | [`ReadonlyRecord`](../interfaces/Record.ReadonlyRecord.md)\<`A`\> | The record to be updated.                         |
| `key`  | `string`                                                          | The key to search for in the record.              |
| `b`    | `B`                                                               | The new value to replace the existing value with. |

#### Returns

[`Option`](O.md#option)\<`Record`\<`string`, `A` \| `B`\>\>

**`Example`**

```ts
import { replaceOption } from "effect/ReadonlyRecord";
import { some, none } from "effect/Option";

assert.deepStrictEqual(
  replaceOption({ a: 1, b: 2, c: 3 }, "a", 10),
  some({ a: 10, b: 2, c: 3 }),
);
assert.deepStrictEqual(replaceOption({}, "a", 10), none());
```

**`Since`**

2.0.0

---

### size

▸ **size**\<`A`\>(`self`): `number`

Returns the number of key/value pairs in a record.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name   | Type                                                              | Description                                             |
| :----- | :---------------------------------------------------------------- | :------------------------------------------------------ |
| `self` | [`ReadonlyRecord`](../interfaces/Record.ReadonlyRecord.md)\<`A`\> | A record to calculate the number of key/value pairs in. |

#### Returns

`number`

**`Example`**

```ts
import { size } from "effect/ReadonlyRecord";

assert.deepStrictEqual(size({ a: "a", b: 1, c: true }), 3);
```

**`Since`**

2.0.0

---

### some

▸ **some**\<`A`, `K`\>(`predicate`): (`self`: `Record`\<`K`, `A`\>) => `boolean`

Check if any entry in a record meets a specific condition.

#### Type parameters

| Name | Type             |
| :--- | :--------------- |
| `A`  | `A`              |
| `K`  | extends `string` |

#### Parameters

| Name        | Type                                    | Description                                 |
| :---------- | :-------------------------------------- | :------------------------------------------ |
| `predicate` | (`value`: `A`, `key`: `K`) => `boolean` | The condition to test entries (value, key). |

#### Returns

`fn`

▸ (`self`): `boolean`

##### Parameters

| Name   | Type                 |
| :----- | :------------------- |
| `self` | `Record`\<`K`, `A`\> |

##### Returns

`boolean`

**`Since`**

2.0.0

▸ **some**\<`K`, `A`\>(`self`, `predicate`): `boolean`

Check if any entry in a record meets a specific condition.

#### Type parameters

| Name | Type             |
| :--- | :--------------- |
| `K`  | extends `string` |
| `A`  | `A`              |

#### Parameters

| Name        | Type                                    | Description                                 |
| :---------- | :-------------------------------------- | :------------------------------------------ |
| `self`      | `Record`\<`K`, `A`\>                    | The record to check.                        |
| `predicate` | (`value`: `A`, `key`: `K`) => `boolean` | The condition to test entries (value, key). |

#### Returns

`boolean`

**`Since`**

2.0.0

---

### union

▸ **union**\<`K1`, `V0`, `V1`\>(`that`, `combine`): \<K0\>(`self`: `Record`\<`K0`, `V0`\>) => `Record`\<`K1` \| `K0`, `V0` \| `V1`\>

Merge two records, preserving entries that exist in either of the records.

#### Type parameters

| Name | Type             |
| :--- | :--------------- |
| `K1` | extends `string` |
| `V0` | `V0`             |
| `V1` | `V1`             |

#### Parameters

| Name      | Type                                                   | Description                                                   |
| :-------- | :----------------------------------------------------- | :------------------------------------------------------------ |
| `that`    | `Record`\<`K1`, `V1`\>                                 | The second record to combine with the first.                  |
| `combine` | (`selfValue`: `V0`, `thatValue`: `V1`) => `V0` \| `V1` | A function to specify how to merge entries with the same key. |

#### Returns

`fn`

▸ \<`K0`\>(`self`): `Record`\<`K1` \| `K0`, `V0` \| `V1`\>

##### Type parameters

| Name | Type             |
| :--- | :--------------- |
| `K0` | extends `string` |

##### Parameters

| Name   | Type                   |
| :----- | :--------------------- |
| `self` | `Record`\<`K0`, `V0`\> |

##### Returns

`Record`\<`K1` \| `K0`, `V0` \| `V1`\>

**`Since`**

2.0.0

▸ **union**\<`K0`, `V0`, `K1`, `V1`\>(`self`, `that`, `combine`): `Record`\<`K0` \| `K1`, `V0` \| `V1`\>

Merge two records, preserving entries that exist in either of the records.

#### Type parameters

| Name | Type             |
| :--- | :--------------- |
| `K0` | extends `string` |
| `V0` | `V0`             |
| `K1` | extends `string` |
| `V1` | `V1`             |

#### Parameters

| Name      | Type                                                   | Description                                                   |
| :-------- | :----------------------------------------------------- | :------------------------------------------------------------ |
| `self`    | `Record`\<`K0`, `V0`\>                                 | The first record.                                             |
| `that`    | `Record`\<`K1`, `V1`\>                                 | The second record to combine with the first.                  |
| `combine` | (`selfValue`: `V0`, `thatValue`: `V1`) => `V0` \| `V1` | A function to specify how to merge entries with the same key. |

#### Returns

`Record`\<`K0` \| `K1`, `V0` \| `V1`\>

**`Since`**

2.0.0

---

### update

▸ **update**\<`B`\>(`key`, `value`): \<A\>(`self`: [`ReadonlyRecord`](../interfaces/Record.ReadonlyRecord.md)\<`A`\>) => `Record`\<`string`, `B` \| `A`\>

Replace a key's value in a record and return the updated record.

#### Type parameters

| Name |
| :--- |
| `B`  |

#### Parameters

| Name    | Type     | Description                              |
| :------ | :------- | :--------------------------------------- |
| `key`   | `string` | The key to replace.                      |
| `value` | `B`      | The new value to associate with the key. |

#### Returns

`fn`

▸ \<`A`\>(`self`): `Record`\<`string`, `B` \| `A`\>

##### Type parameters

| Name |
| :--- |
| `A`  |

##### Parameters

| Name   | Type                                                              |
| :----- | :---------------------------------------------------------------- |
| `self` | [`ReadonlyRecord`](../interfaces/Record.ReadonlyRecord.md)\<`A`\> |

##### Returns

`Record`\<`string`, `B` \| `A`\>

**`Example`**

```ts
import { update } from "effect/ReadonlyRecord";
import { some, none } from "effect/Option";

assert.deepStrictEqual(update("a", 3)({ a: 1, b: 2 }), { a: 3, b: 2 });
assert.deepStrictEqual(update("c", 3)({ a: 1, b: 2 }), { a: 1, b: 2 });
```

**`Since`**

2.0.0

▸ **update**\<`A`, `B`\>(`self`, `key`, `value`): `Record`\<`string`, `A` \| `B`\>

Replace a key's value in a record and return the updated record.

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |

#### Parameters

| Name    | Type                                                              | Description                              |
| :------ | :---------------------------------------------------------------- | :--------------------------------------- |
| `self`  | [`ReadonlyRecord`](../interfaces/Record.ReadonlyRecord.md)\<`A`\> | The original record.                     |
| `key`   | `string`                                                          | The key to replace.                      |
| `value` | `B`                                                               | The new value to associate with the key. |

#### Returns

`Record`\<`string`, `A` \| `B`\>

**`Example`**

```ts
import { update } from "effect/ReadonlyRecord";
import { some, none } from "effect/Option";

assert.deepStrictEqual(update("a", 3)({ a: 1, b: 2 }), { a: 3, b: 2 });
assert.deepStrictEqual(update("c", 3)({ a: 1, b: 2 }), { a: 1, b: 2 });
```

**`Since`**

2.0.0

---

### upsert

▸ **upsert**\<`B`\>(`key`, `value`): \<A\>(`self`: [`ReadonlyRecord`](../interfaces/Record.ReadonlyRecord.md)\<`A`\>) => `Record`\<`string`, `B` \| `A`\>

Add a new key-value pair or update an existing key's value in a record.

#### Type parameters

| Name |
| :--- |
| `B`  |

#### Parameters

| Name    | Type     | Description                        |
| :------ | :------- | :--------------------------------- |
| `key`   | `string` | The key you want to add or update. |
| `value` | `B`      | -                                  |

#### Returns

`fn`

▸ \<`A`\>(`self`): `Record`\<`string`, `B` \| `A`\>

##### Type parameters

| Name |
| :--- |
| `A`  |

##### Parameters

| Name   | Type                                                              |
| :----- | :---------------------------------------------------------------- |
| `self` | [`ReadonlyRecord`](../interfaces/Record.ReadonlyRecord.md)\<`A`\> |

##### Returns

`Record`\<`string`, `B` \| `A`\>

**`Example`**

```ts
import { upsert } from "effect/ReadonlyRecord";

assert.deepStrictEqual(upsert("a", 5)({ a: 1, b: 2 }), { a: 5, b: 2 });
assert.deepStrictEqual(upsert("c", 5)({ a: 1, b: 2 }), { a: 1, b: 2, c: 5 });
```

**`Since`**

2.0.0

▸ **upsert**\<`A`, `B`\>(`self`, `key`, `value`): `Record`\<`string`, `A` \| `B`\>

Add a new key-value pair or update an existing key's value in a record.

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |

#### Parameters

| Name    | Type                                                              | Description                                                     |
| :------ | :---------------------------------------------------------------- | :-------------------------------------------------------------- |
| `self`  | [`ReadonlyRecord`](../interfaces/Record.ReadonlyRecord.md)\<`A`\> | The record to which you want to add or update a key-value pair. |
| `key`   | `string`                                                          | The key you want to add or update.                              |
| `value` | `B`                                                               | -                                                               |

#### Returns

`Record`\<`string`, `A` \| `B`\>

**`Example`**

```ts
import { upsert } from "effect/ReadonlyRecord";

assert.deepStrictEqual(upsert("a", 5)({ a: 1, b: 2 }), { a: 5, b: 2 });
assert.deepStrictEqual(upsert("c", 5)({ a: 1, b: 2 }), { a: 1, b: 2, c: 5 });
```

**`Since`**

2.0.0

---

### values

▸ **values**\<`A`\>(`self`): `A`[]

Retrieve the values of a given record as an array.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name   | Type                                                              | Description                                      |
| :----- | :---------------------------------------------------------------- | :----------------------------------------------- |
| `self` | [`ReadonlyRecord`](../interfaces/Record.ReadonlyRecord.md)\<`A`\> | The object for which you want to get the values. |

#### Returns

`A`[]

**`Since`**

2.0.0

## constructors

### empty

▸ **empty**\<`A`\>(): `Record`\<`string`, `A`\>

Creates a new, empty record.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Returns

`Record`\<`string`, `A`\>

**`Since`**

2.0.0

---

### singleton

▸ **singleton**\<`K`, `A`\>(`key`, `value`): `Record`\<`K`, `A`\>

Create a non-empty record from a single element.

#### Type parameters

| Name | Type             |
| :--- | :--------------- |
| `K`  | extends `string` |
| `A`  | `A`              |

#### Parameters

| Name    | Type | Description                        |
| :------ | :--- | :--------------------------------- |
| `key`   | `K`  | The key for the element.           |
| `value` | `A`  | The value associated with the key. |

#### Returns

`Record`\<`K`, `A`\>

**`Since`**

2.0.0

## conversions

### collect

▸ **collect**\<`K`, `A`, `B`\>(`f`): (`self`: `Record`\<`K`, `A`\>) => `B`[]

Transforms the values of a record into an `Array` with a custom mapping function.

#### Type parameters

| Name | Type             |
| :--- | :--------------- |
| `K`  | extends `string` |
| `A`  | `A`              |
| `B`  | `B`              |

#### Parameters

| Name | Type                          | Description                                                           |
| :--- | :---------------------------- | :-------------------------------------------------------------------- |
| `f`  | (`key`: `K`, `a`: `A`) => `B` | The custom mapping function to apply to each key/value of the record. |

#### Returns

`fn`

▸ (`self`): `B`[]

##### Parameters

| Name   | Type                 |
| :----- | :------------------- |
| `self` | `Record`\<`K`, `A`\> |

##### Returns

`B`[]

**`Example`**

```ts
import { collect } from "effect/ReadonlyRecord";

const x = { a: 1, b: 2, c: 3 };
assert.deepStrictEqual(collect(x, (key, n) => [key, n]), [["a", 1], ["b", 2], ["c", 3]]);
```

**`Since`**

2.0.0

▸ **collect**\<`K`, `A`, `B`\>(`self`, `f`): `B`[]

Transforms the values of a record into an `Array` with a custom mapping function.

#### Type parameters

| Name | Type             |
| :--- | :--------------- |
| `K`  | extends `string` |
| `A`  | `A`              |
| `B`  | `B`              |

#### Parameters

| Name   | Type                          | Description                                                           |
| :----- | :---------------------------- | :-------------------------------------------------------------------- |
| `self` | `Record`\<`K`, `A`\>          | The record to transform.                                              |
| `f`    | (`key`: `K`, `a`: `A`) => `B` | The custom mapping function to apply to each key/value of the record. |

#### Returns

`B`[]

**`Example`**

```ts
import { collect } from "effect/ReadonlyRecord";

const x = { a: 1, b: 2, c: 3 };
assert.deepStrictEqual(collect(x, (key, n) => [key, n]), [["a", 1], ["b", 2], ["c", 3]]);
```

**`Since`**

2.0.0

---

### fromEntries

▸ **fromEntries**\<`A`\>(`self`): `Record`\<`string`, `A`\>

Builds a record from an iterable of key-value pairs.

If there are conflicting keys when using `fromEntries`, the last occurrence of the key/value pair will overwrite the
previous ones. So the resulting record will only have the value of the last occurrence of each key.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name   | Type                                   | Description                      |
| :----- | :------------------------------------- | :------------------------------- |
| `self` | `Iterable`\<readonly [`string`, `A`]\> | The iterable of key-value pairs. |

#### Returns

`Record`\<`string`, `A`\>

**`Example`**

```ts
import { fromEntries } from "effect/ReadonlyRecord";

const input: Array<[string, number]> = [["a", 1], ["b", 2]];

assert.deepStrictEqual(fromEntries(input), { a: 1, b: 2 });
```

**`Since`**

2.0.0

---

### fromIterable

▸ **fromIterable**\<`A`, `B`\>(`f`): (`self`: `Iterable`\<`A`\>) => `Record`\<`string`, `B`\>

Takes an iterable and a projection function and returns a record.
The projection function maps each value of the iterable to a tuple of a key and a value, which is then added to the resulting record.

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |

#### Parameters

| Name | Type                                   | Description                                                                             |
| :--- | :------------------------------------- | :-------------------------------------------------------------------------------------- |
| `f`  | (`a`: `A`) => readonly [`string`, `B`] | A projection function that maps values of the iterable to a tuple of a key and a value. |

#### Returns

`fn`

▸ (`self`): `Record`\<`string`, `B`\>

##### Parameters

| Name   | Type              |
| :----- | :---------------- |
| `self` | `Iterable`\<`A`\> |

##### Returns

`Record`\<`string`, `B`\>

**`Example`**

```ts
import { fromIterable } from "effect/ReadonlyRecord";

const input = [1, 2, 3, 4];

assert.deepStrictEqual(
  fromIterable(input, a => [String(a), a * 2]),
  { "1": 2, "2": 4, "3": 6, "4": 8 },
);
```

**`Since`**

2.0.0

▸ **fromIterable**\<`A`, `B`\>(`self`, `f`): `Record`\<`string`, `B`\>

Takes an iterable and a projection function and returns a record.
The projection function maps each value of the iterable to a tuple of a key and a value, which is then added to the resulting record.

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |

#### Parameters

| Name   | Type                                   | Description                                                                             |
| :----- | :------------------------------------- | :-------------------------------------------------------------------------------------- |
| `self` | `Iterable`\<`A`\>                      | An iterable of values to be mapped to a record.                                         |
| `f`    | (`a`: `A`) => readonly [`string`, `B`] | A projection function that maps values of the iterable to a tuple of a key and a value. |

#### Returns

`Record`\<`string`, `B`\>

**`Example`**

```ts
import { fromIterable } from "effect/ReadonlyRecord";

const input = [1, 2, 3, 4];

assert.deepStrictEqual(
  fromIterable(input, a => [String(a), a * 2]),
  { "1": 2, "2": 4, "3": 6, "4": 8 },
);
```

**`Since`**

2.0.0

---

### toEntries

▸ **toEntries**\<`K`, `A`\>(`self`): [`K`, `A`][]

Takes a record and returns an array of tuples containing its keys and values.

#### Type parameters

| Name | Type             |
| :--- | :--------------- |
| `K`  | extends `string` |
| `A`  | `A`              |

#### Parameters

| Name   | Type                 | Description              |
| :----- | :------------------- | :----------------------- |
| `self` | `Record`\<`K`, `A`\> | The record to transform. |

#### Returns

[`K`, `A`][]

**`Example`**

```ts
import { toEntries } from "effect/ReadonlyRecord";

const x = { a: 1, b: 2, c: 3 };
assert.deepStrictEqual(toEntries(x), [["a", 1], ["b", 2], ["c", 3]]);
```

**`Since`**

2.0.0

## filtering

### filter

▸ **filter**\<`K`, `A`, `B`\>(`refinement`): (`self`: `Record`\<`K`, `A`\>) => `Record`\<`string`, `B`\>

Selects properties from a record whose values match the given predicate.

#### Type parameters

| Name | Type             |
| :--- | :--------------- |
| `K`  | extends `string` |
| `A`  | `A`              |
| `B`  | `B`              |

#### Parameters

| Name         | Type                             |
| :----------- | :------------------------------- |
| `refinement` | (`a`: `A`, `key`: `K`) => a is B |

#### Returns

`fn`

▸ (`self`): `Record`\<`string`, `B`\>

##### Parameters

| Name   | Type                 |
| :----- | :------------------- |
| `self` | `Record`\<`K`, `A`\> |

##### Returns

`Record`\<`string`, `B`\>

**`Example`**

```ts
import { filter } from "effect/ReadonlyRecord";

const x = { a: 1, b: 2, c: 3, d: 4 };
assert.deepStrictEqual(filter(x, (n) => n > 2), { c: 3, d: 4 });
```

**`Since`**

2.0.0

▸ **filter**\<`K`, `B`, `A`\>(`predicate`): (`self`: `Record`\<`K`, `B`\>) => `Record`\<`string`, `B`\>

Selects properties from a record whose values match the given predicate.

#### Type parameters

| Name | Type             |
| :--- | :--------------- |
| `K`  | extends `string` |
| `B`  | `B`              |
| `A`  | `B`              |

#### Parameters

| Name        | Type                                | Description                                                                                               |
| :---------- | :---------------------------------- | :-------------------------------------------------------------------------------------------------------- |
| `predicate` | (`A`: `A`, `key`: `K`) => `boolean` | A function that returns a `boolean` value to determine if the entry should be included in the new record. |

#### Returns

`fn`

▸ (`self`): `Record`\<`string`, `B`\>

##### Parameters

| Name   | Type                 |
| :----- | :------------------- |
| `self` | `Record`\<`K`, `B`\> |

##### Returns

`Record`\<`string`, `B`\>

**`Example`**

```ts
import { filter } from "effect/ReadonlyRecord";

const x = { a: 1, b: 2, c: 3, d: 4 };
assert.deepStrictEqual(filter(x, (n) => n > 2), { c: 3, d: 4 });
```

**`Since`**

2.0.0

▸ **filter**\<`K`, `A`, `B`\>(`self`, `refinement`): `Record`\<`string`, `B`\>

Selects properties from a record whose values match the given predicate.

#### Type parameters

| Name | Type             |
| :--- | :--------------- |
| `K`  | extends `string` |
| `A`  | `A`              |
| `B`  | `B`              |

#### Parameters

| Name         | Type                             | Description           |
| :----------- | :------------------------------- | :-------------------- |
| `self`       | `Record`\<`K`, `A`\>             | The record to filter. |
| `refinement` | (`a`: `A`, `key`: `K`) => a is B | -                     |

#### Returns

`Record`\<`string`, `B`\>

**`Example`**

```ts
import { filter } from "effect/ReadonlyRecord";

const x = { a: 1, b: 2, c: 3, d: 4 };
assert.deepStrictEqual(filter(x, (n) => n > 2), { c: 3, d: 4 });
```

**`Since`**

2.0.0

▸ **filter**\<`K`, `A`\>(`self`, `predicate`): `Record`\<`string`, `A`\>

Selects properties from a record whose values match the given predicate.

#### Type parameters

| Name | Type             |
| :--- | :--------------- |
| `K`  | extends `string` |
| `A`  | `A`              |

#### Parameters

| Name        | Type                                | Description                                                                                               |
| :---------- | :---------------------------------- | :-------------------------------------------------------------------------------------------------------- |
| `self`      | `Record`\<`K`, `A`\>                | The record to filter.                                                                                     |
| `predicate` | (`a`: `A`, `key`: `K`) => `boolean` | A function that returns a `boolean` value to determine if the entry should be included in the new record. |

#### Returns

`Record`\<`string`, `A`\>

**`Example`**

```ts
import { filter } from "effect/ReadonlyRecord";

const x = { a: 1, b: 2, c: 3, d: 4 };
assert.deepStrictEqual(filter(x, (n) => n > 2), { c: 3, d: 4 });
```

**`Since`**

2.0.0

---

### getLefts

▸ **getLefts**\<`E`, `A`\>(`self`): `Record`\<`string`, `E`\>

Given a record with `Either` values, returns a new record containing only the `Left` values, preserving the original keys.

#### Type parameters

| Name |
| :--- |
| `E`  |
| `A`  |

#### Parameters

| Name   | Type                                                                                              |
| :----- | :------------------------------------------------------------------------------------------------ |
| `self` | [`ReadonlyRecord`](../interfaces/Record.ReadonlyRecord.md)\<[`Either`](E.md#either)\<`E`, `A`\>\> |

#### Returns

`Record`\<`string`, `E`\>

**`Example`**

```ts
import { getLefts } from "effect/ReadonlyRecord";
import { right, left } from "effect/Either";

assert.deepStrictEqual(
  getLefts({ a: right(1), b: left("err"), c: right(2) }),
  { b: "err" },
);
```

**`Since`**

2.0.0

---

### getRights

▸ **getRights**\<`E`, `A`\>(`self`): `Record`\<`string`, `A`\>

Given a record with `Either` values, returns a new record containing only the `Right` values, preserving the original keys.

#### Type parameters

| Name |
| :--- |
| `E`  |
| `A`  |

#### Parameters

| Name   | Type                                                                                              |
| :----- | :------------------------------------------------------------------------------------------------ |
| `self` | [`ReadonlyRecord`](../interfaces/Record.ReadonlyRecord.md)\<[`Either`](E.md#either)\<`E`, `A`\>\> |

#### Returns

`Record`\<`string`, `A`\>

**`Example`**

```ts
import { getRights } from "effect/ReadonlyRecord";
import { right, left } from "effect/Either";

assert.deepStrictEqual(
  getRights({ a: right(1), b: left("err"), c: right(2) }),
  { a: 1, c: 2 },
);
```

**`Since`**

2.0.0

---

### getSomes

▸ **getSomes**\<`A`\>(`self`): `Record`\<`string`, `A`\>

Given a record with `Option` values, returns a new record containing only the `Some` values, preserving the original keys.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name   | Type                                                                                         | Description                    |
| :----- | :------------------------------------------------------------------------------------------- | :----------------------------- |
| `self` | [`ReadonlyRecord`](../interfaces/Record.ReadonlyRecord.md)\<[`Option`](O.md#option)\<`A`\>\> | A record with `Option` values. |

#### Returns

`Record`\<`string`, `A`\>

**`Example`**

```ts
import { getSomes } from "effect/ReadonlyRecord";
import { some, none } from "effect/Option";

assert.deepStrictEqual(
  getSomes({ a: some(1), b: none(), c: some(2) }),
  { a: 1, c: 2 },
);
```

**`Since`**

2.0.0

---

### partition

▸ **partition**\<`K`, `C`, `B`, `A`\>(`refinement`): (`self`: `Record`\<`K`, `C`\>) => [excluded: Record\<string, Exclude\<C, B\>\>, satisfying: Record\<string, B\>]

Partitions a record into two separate records based on the result of a predicate function.

#### Type parameters

| Name | Type             |
| :--- | :--------------- |
| `K`  | extends `string` |
| `C`  | `C`              |
| `B`  | `B`              |
| `A`  | `C`              |

#### Parameters

| Name         | Type                             |
| :----------- | :------------------------------- |
| `refinement` | (`a`: `A`, `key`: `K`) => a is B |

#### Returns

`fn`

▸ (`self`): [excluded: Record\<string, Exclude\<C, B\>\>, satisfying: Record\<string, B\>]

##### Parameters

| Name   | Type                 |
| :----- | :------------------- |
| `self` | `Record`\<`K`, `C`\> |

##### Returns

[excluded: Record\<string, Exclude\<C, B\>\>, satisfying: Record\<string, B\>]

**`Example`**

```ts
import { partition } from "effect/ReadonlyRecord";

assert.deepStrictEqual(
  partition({ a: 1, b: 3 }, (n) => n > 2),
  [{ a: 1 }, { b: 3 }],
);
```

**`Since`**

2.0.0

▸ **partition**\<`K`, `B`, `A`\>(`predicate`): (`self`: `Record`\<`K`, `B`\>) => [excluded: Record\<string, B\>, satisfying: Record\<string, B\>]

Partitions a record into two separate records based on the result of a predicate function.

#### Type parameters

| Name | Type             |
| :--- | :--------------- |
| `K`  | extends `string` |
| `B`  | `B`              |
| `A`  | `B`              |

#### Parameters

| Name        | Type                                | Description                                                                          |
| :---------- | :---------------------------------- | :----------------------------------------------------------------------------------- |
| `predicate` | (`a`: `A`, `key`: `K`) => `boolean` | The partitioning function to determine the partitioning of each value of the record. |

#### Returns

`fn`

▸ (`self`): [excluded: Record\<string, B\>, satisfying: Record\<string, B\>]

##### Parameters

| Name   | Type                 |
| :----- | :------------------- |
| `self` | `Record`\<`K`, `B`\> |

##### Returns

[excluded: Record\<string, B\>, satisfying: Record\<string, B\>]

**`Example`**

```ts
import { partition } from "effect/ReadonlyRecord";

assert.deepStrictEqual(
  partition({ a: 1, b: 3 }, (n) => n > 2),
  [{ a: 1 }, { b: 3 }],
);
```

**`Since`**

2.0.0

▸ **partition**\<`K`, `A`, `B`\>(`self`, `refinement`): [excluded: Record\<string, Exclude\<A, B\>\>, satisfying: Record\<string, B\>]

Partitions a record into two separate records based on the result of a predicate function.

#### Type parameters

| Name | Type             |
| :--- | :--------------- |
| `K`  | extends `string` |
| `A`  | `A`              |
| `B`  | `B`              |

#### Parameters

| Name         | Type                             | Description                    |
| :----------- | :------------------------------- | :----------------------------- |
| `self`       | `Record`\<`K`, `A`\>             | The input record to partition. |
| `refinement` | (`a`: `A`, `key`: `K`) => a is B | -                              |

#### Returns

[excluded: Record\<string, Exclude\<A, B\>\>, satisfying: Record\<string, B\>]

**`Example`**

```ts
import { partition } from "effect/ReadonlyRecord";

assert.deepStrictEqual(
  partition({ a: 1, b: 3 }, (n) => n > 2),
  [{ a: 1 }, { b: 3 }],
);
```

**`Since`**

2.0.0

▸ **partition**\<`K`, `A`\>(`self`, `predicate`): [excluded: Record\<string, A\>, satisfying: Record\<string, A\>]

Partitions a record into two separate records based on the result of a predicate function.

#### Type parameters

| Name | Type             |
| :--- | :--------------- |
| `K`  | extends `string` |
| `A`  | `A`              |

#### Parameters

| Name        | Type                                | Description                                                                          |
| :---------- | :---------------------------------- | :----------------------------------------------------------------------------------- |
| `self`      | `Record`\<`K`, `A`\>                | The input record to partition.                                                       |
| `predicate` | (`a`: `A`, `key`: `K`) => `boolean` | The partitioning function to determine the partitioning of each value of the record. |

#### Returns

[excluded: Record\<string, A\>, satisfying: Record\<string, A\>]

**`Example`**

```ts
import { partition } from "effect/ReadonlyRecord";

assert.deepStrictEqual(
  partition({ a: 1, b: 3 }, (n) => n > 2),
  [{ a: 1 }, { b: 3 }],
);
```

**`Since`**

2.0.0

---

### partitionMap

▸ **partitionMap**\<`K`, `A`, `B`, `C`\>(`f`): (`self`: `Record`\<`K`, `A`\>) => [left: Record\<string, B\>, right: Record\<string, C\>]

Partitions the elements of a record into two groups: those that match a predicate, and those that don't.

#### Type parameters

| Name | Type             |
| :--- | :--------------- |
| `K`  | extends `string` |
| `A`  | `A`              |
| `B`  | `B`              |
| `C`  | `C`              |

#### Parameters

| Name | Type                                                          | Description                                      |
| :--- | :------------------------------------------------------------ | :----------------------------------------------- |
| `f`  | (`a`: `A`, `key`: `K`) => [`Either`](E.md#either)\<`B`, `C`\> | The predicate function to apply to each element. |

#### Returns

`fn`

▸ (`self`): [left: Record\<string, B\>, right: Record\<string, C\>]

##### Parameters

| Name   | Type                 |
| :----- | :------------------- |
| `self` | `Record`\<`K`, `A`\> |

##### Returns

[left: Record\<string, B\>, right: Record\<string, C\>]

**`Example`**

```ts
import { partitionMap } from "effect/ReadonlyRecord";
import { left, right } from "effect/Either";

const x = { a: 1, b: 2, c: 3 };
const f = (n: number) => (n % 2 === 0 ? right(n) : left(n));
assert.deepStrictEqual(partitionMap(x, f), [{ a: 1, c: 3 }, { b: 2 }]);
```

**`Since`**

2.0.0

▸ **partitionMap**\<`K`, `A`, `B`, `C`\>(`self`, `f`): [left: Record\<string, B\>, right: Record\<string, C\>]

Partitions the elements of a record into two groups: those that match a predicate, and those that don't.

#### Type parameters

| Name | Type             |
| :--- | :--------------- |
| `K`  | extends `string` |
| `A`  | `A`              |
| `B`  | `B`              |
| `C`  | `C`              |

#### Parameters

| Name   | Type                                                          | Description                                      |
| :----- | :------------------------------------------------------------ | :----------------------------------------------- |
| `self` | `Record`\<`K`, `A`\>                                          | The record to partition.                         |
| `f`    | (`a`: `A`, `key`: `K`) => [`Either`](E.md#either)\<`B`, `C`\> | The predicate function to apply to each element. |

#### Returns

[left: Record\<string, B\>, right: Record\<string, C\>]

**`Example`**

```ts
import { partitionMap } from "effect/ReadonlyRecord";
import { left, right } from "effect/Either";

const x = { a: 1, b: 2, c: 3 };
const f = (n: number) => (n % 2 === 0 ? right(n) : left(n));
assert.deepStrictEqual(partitionMap(x, f), [{ a: 1, c: 3 }, { b: 2 }]);
```

**`Since`**

2.0.0

---

### separate

▸ **separate**\<`A`, `B`\>(`self`): [`Record`\<`string`, `A`\>, `Record`\<`string`, `B`\>]

Partitions a record of `Either` values into two separate records,
one with the `Left` values and one with the `Right` values.

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |

#### Parameters

| Name   | Type                                                                                              | Description              |
| :----- | :------------------------------------------------------------------------------------------------ | :----------------------- |
| `self` | [`ReadonlyRecord`](../interfaces/Record.ReadonlyRecord.md)\<[`Either`](E.md#either)\<`A`, `B`\>\> | the record to partition. |

#### Returns

[`Record`\<`string`, `A`\>, `Record`\<`string`, `B`\>]

**`Example`**

```ts
import { separate } from "effect/ReadonlyRecord";
import { left, right } from "effect/Either";

assert.deepStrictEqual(
  separate({ a: left("e"), b: right(1) }),
  [{ a: "e" }, { b: 1 }],
);
```

**`Since`**

2.0.0

## folding

### reduce

▸ **reduce**\<`Z`, `V`, `K`\>(`zero`, `f`): (`self`: `Record`\<`K`, `V`\>) => `Z`

Reduce a record to a single value by combining its entries with a specified function.

#### Type parameters

| Name | Type             |
| :--- | :--------------- |
| `Z`  | `Z`              |
| `V`  | `V`              |
| `K`  | extends `string` |

#### Parameters

| Name   | Type                                                  | Description                                                |
| :----- | :---------------------------------------------------- | :--------------------------------------------------------- |
| `zero` | `Z`                                                   | The initial value of the accumulator.                      |
| `f`    | (`accumulator`: `Z`, `value`: `V`, `key`: `K`) => `Z` | The function to combine entries (accumulator, value, key). |

#### Returns

`fn`

▸ (`self`): `Z`

##### Parameters

| Name   | Type                 |
| :----- | :------------------- |
| `self` | `Record`\<`K`, `V`\> |

##### Returns

`Z`

**`Since`**

2.0.0

▸ **reduce**\<`K`, `V`, `Z`\>(`self`, `zero`, `f`): `Z`

Reduce a record to a single value by combining its entries with a specified function.

#### Type parameters

| Name | Type             |
| :--- | :--------------- |
| `K`  | extends `string` |
| `V`  | `V`              |
| `Z`  | `Z`              |

#### Parameters

| Name   | Type                                                  | Description                                                |
| :----- | :---------------------------------------------------- | :--------------------------------------------------------- |
| `self` | `Record`\<`K`, `V`\>                                  | The record to reduce.                                      |
| `zero` | `Z`                                                   | The initial value of the accumulator.                      |
| `f`    | (`accumulator`: `Z`, `value`: `V`, `key`: `K`) => `Z` | The function to combine entries (accumulator, value, key). |

#### Returns

`Z`

**`Since`**

2.0.0

## guards

### isEmptyReadonlyRecord

▸ **isEmptyReadonlyRecord**\<`A`\>(`self`): self is ReadonlyRecord\<never\>

Determine if a record is empty.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name   | Type                                                              | Description                   |
| :----- | :---------------------------------------------------------------- | :---------------------------- |
| `self` | [`ReadonlyRecord`](../interfaces/Record.ReadonlyRecord.md)\<`A`\> | record to test for emptiness. |

#### Returns

self is ReadonlyRecord\<never\>

**`Example`**

```ts
import { isEmptyReadonlyRecord } from "effect/ReadonlyRecord";

assert.deepStrictEqual(isEmptyReadonlyRecord({}), true);
assert.deepStrictEqual(isEmptyReadonlyRecord({ a: 3 }), false);
```

**`Since`**

2.0.0

---

### isEmptyRecord

▸ **isEmptyRecord**\<`A`\>(`self`): self is Record\<string, never\>

Determine if a record is empty.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name   | Type                      | Description                   |
| :----- | :------------------------ | :---------------------------- |
| `self` | `Record`\<`string`, `A`\> | record to test for emptiness. |

#### Returns

self is Record\<string, never\>

**`Example`**

```ts
import { isEmptyRecord } from "effect/ReadonlyRecord";

assert.deepStrictEqual(isEmptyRecord({}), true);
assert.deepStrictEqual(isEmptyRecord({ a: 3 }), false);
```

**`Since`**

2.0.0

## instances

### getEquivalence

▸ **getEquivalence**\<`A`\>(`equivalence`): `Equivalence`\<[`ReadonlyRecord`](../interfaces/Record.ReadonlyRecord.md)\<`A`\>\>

Create an `Equivalence` for records using the provided `Equivalence` for values.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name          | Type                 | Description                                               |
| :------------ | :------------------- | :-------------------------------------------------------- |
| `equivalence` | `Equivalence`\<`A`\> | An `Equivalence` for the values contained in the records. |

#### Returns

`Equivalence`\<[`ReadonlyRecord`](../interfaces/Record.ReadonlyRecord.md)\<`A`\>\>

**`Since`**

2.0.0

## mapping

### map

▸ **map**\<`K`, `A`, `B`\>(`f`): (`self`: `Record`\<`K`, `A`\>) => `Record`\<`K`, `B`\>

Maps a record into another record by applying a transformation function to each of its values.

#### Type parameters

| Name | Type             |
| :--- | :--------------- |
| `K`  | extends `string` |
| `A`  | `A`              |
| `B`  | `B`              |

#### Parameters

| Name | Type                          | Description                                                                         |
| :--- | :---------------------------- | :---------------------------------------------------------------------------------- |
| `f`  | (`a`: `A`, `key`: `K`) => `B` | A transformation function that will be applied to each of the values in the record. |

#### Returns

`fn`

▸ (`self`): `Record`\<`K`, `B`\>

##### Parameters

| Name   | Type                 |
| :----- | :------------------- |
| `self` | `Record`\<`K`, `A`\> |

##### Returns

`Record`\<`K`, `B`\>

**`Example`**

```ts
import { map } from "effect/ReadonlyRecord";

const f = (n: number) => `-${n}`;

assert.deepStrictEqual(map({ a: 3, b: 5 }, f), { a: "-3", b: "-5" });

const g = (n: number, key: string) => `${key.toUpperCase()}-${n}`;

assert.deepStrictEqual(map({ a: 3, b: 5 }, g), { a: "A-3", b: "B-5" });
```

**`Since`**

2.0.0

▸ **map**\<`K`, `A`, `B`\>(`self`, `f`): `Record`\<`K`, `B`\>

Maps a record into another record by applying a transformation function to each of its values.

#### Type parameters

| Name | Type             |
| :--- | :--------------- |
| `K`  | extends `string` |
| `A`  | `A`              |
| `B`  | `B`              |

#### Parameters

| Name   | Type                          | Description                                                                         |
| :----- | :---------------------------- | :---------------------------------------------------------------------------------- |
| `self` | `Record`\<`K`, `A`\>          | The record to be mapped.                                                            |
| `f`    | (`a`: `A`, `key`: `K`) => `B` | A transformation function that will be applied to each of the values in the record. |

#### Returns

`Record`\<`K`, `B`\>

**`Example`**

```ts
import { map } from "effect/ReadonlyRecord";

const f = (n: number) => `-${n}`;

assert.deepStrictEqual(map({ a: 3, b: 5 }, f), { a: "-3", b: "-5" });

const g = (n: number, key: string) => `${key.toUpperCase()}-${n}`;

assert.deepStrictEqual(map({ a: 3, b: 5 }, g), { a: "A-3", b: "B-5" });
```

**`Since`**

2.0.0

## record

### pop

▸ **pop**(`key`): \<A\>(`self`: [`ReadonlyRecord`](../interfaces/Record.ReadonlyRecord.md)\<`A`\>) => [`Option`](O.md#option)\<[`A`, `Record`\<`string`, `A`\>]\>

Retrieves the value of the property with the given `key` from a record and returns an `Option`
of a tuple with the value and the record with the removed property.
If the key is not present, returns `O.none`.

#### Parameters

| Name  | Type     | Description                          |
| :---- | :------- | :----------------------------------- |
| `key` | `string` | The key of the property to retrieve. |

#### Returns

`fn`

▸ \<`A`\>(`self`): [`Option`](O.md#option)\<[`A`, `Record`\<`string`, `A`\>]\>

##### Type parameters

| Name |
| :--- |
| `A`  |

##### Parameters

| Name   | Type                                                              |
| :----- | :---------------------------------------------------------------- |
| `self` | [`ReadonlyRecord`](../interfaces/Record.ReadonlyRecord.md)\<`A`\> |

##### Returns

[`Option`](O.md#option)\<[`A`, `Record`\<`string`, `A`\>]\>

**`Example`**

```ts
import { pop } from "effect/ReadonlyRecord";
import { some, none } from "effect/Option";

assert.deepStrictEqual(pop({ a: 1, b: 2 }, "a"), some([1, { b: 2 }]));
assert.deepStrictEqual(pop({ a: 1, b: 2 }, "c"), none());
```

**`Since`**

2.0.0

▸ **pop**\<`A`\>(`self`, `key`): [`Option`](O.md#option)\<[`A`, `Record`\<`string`, `A`\>]\>

Retrieves the value of the property with the given `key` from a record and returns an `Option`
of a tuple with the value and the record with the removed property.
If the key is not present, returns `O.none`.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name   | Type                                                              | Description                          |
| :----- | :---------------------------------------------------------------- | :----------------------------------- |
| `self` | [`ReadonlyRecord`](../interfaces/Record.ReadonlyRecord.md)\<`A`\> | The input record.                    |
| `key`  | `string`                                                          | The key of the property to retrieve. |

#### Returns

[`Option`](O.md#option)\<[`A`, `Record`\<`string`, `A`\>]\>

**`Example`**

```ts
import { pop } from "effect/ReadonlyRecord";
import { some, none } from "effect/Option";

assert.deepStrictEqual(pop({ a: 1, b: 2 }, "a"), some([1, { b: 2 }]));
assert.deepStrictEqual(pop({ a: 1, b: 2 }, "c"), none());
```

**`Since`**

2.0.0
