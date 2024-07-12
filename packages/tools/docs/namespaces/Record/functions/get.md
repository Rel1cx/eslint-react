[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [Record](../README.md) / get

# Function: get()

Retrieve a value at a particular key from a record, returning it wrapped in an `Option`.

## Param

The record to retrieve value from.

## Param

Key to retrieve from record.

## Example

```ts
import { Record as R, Option } from "effect"

const person: Record<string, unknown> = { name: "John Doe", age: 35 }

assert.deepStrictEqual(R.get(person, "name"), Option.some("John Doe"))
assert.deepStrictEqual(R.get(person, "email"), Option.none())
```

## Since

2.0.0

## get(key)

> **get**\<`K`\>(`key`): \<`A`\>(`self`) => [`Option`](../../O/type-aliases/Option.md)\<`A`\>

Retrieve a value at a particular key from a record, returning it wrapped in an `Option`.

### Type Parameters

• **K** *extends* `string` \| `symbol`

### Parameters

• **key**: `NoInfer`\<`K`\>

### Returns

`Function`

#### Type Parameters

• **A**

#### Parameters

• **self**: [`ReadonlyRecord`](../type-aliases/ReadonlyRecord.md)\<`K`, `A`\>

#### Returns

[`Option`](../../O/type-aliases/Option.md)\<`A`\>

### Param

The record to retrieve value from.

### Param

Key to retrieve from record.

### Example

```ts
import { Record as R, Option } from "effect"

const person: Record<string, unknown> = { name: "John Doe", age: 35 }

assert.deepStrictEqual(R.get(person, "name"), Option.some("John Doe"))
assert.deepStrictEqual(R.get(person, "email"), Option.none())
```

### Since

2.0.0

## get(self, key)

> **get**\<`K`, `A`\>(`self`, `key`): [`Option`](../../O/type-aliases/Option.md)\<`A`\>

Retrieve a value at a particular key from a record, returning it wrapped in an `Option`.

### Type Parameters

• **K** *extends* `string` \| `symbol`

• **A**

### Parameters

• **self**: [`ReadonlyRecord`](../type-aliases/ReadonlyRecord.md)\<`K`, `A`\>

• **key**: `NoInfer`\<`K`\>

### Returns

[`Option`](../../O/type-aliases/Option.md)\<`A`\>

### Param

The record to retrieve value from.

### Param

Key to retrieve from record.

### Example

```ts
import { Record as R, Option } from "effect"

const person: Record<string, unknown> = { name: "John Doe", age: 35 }

assert.deepStrictEqual(R.get(person, "name"), Option.some("John Doe"))
assert.deepStrictEqual(R.get(person, "email"), Option.none())
```

### Since

2.0.0
