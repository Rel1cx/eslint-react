[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [Record](../README.md) / modifyOption

# Function: modifyOption()

Apply a function to the element at the specified key, creating a new record,
or return `None` if the key doesn't exist.

## Param

The record to be updated.

## Param

The key of the element to modify.

## Param

The function to apply to the element.

## Example

```ts
import { Record as R, Option } from "effect"

const f = (x: number) => x * 2

assert.deepStrictEqual(
 R.modifyOption({ a: 3 }, 'a', f),
 Option.some({ a: 6 })
)
assert.deepStrictEqual(
 R.modifyOption({ a: 3 } as Record<string, number>, 'b', f),
 Option.none()
)
```

## Since

2.0.0

## modifyOption(key, f)

> **modifyOption**\<`K`, `A`, `B`\>(`key`, `f`): (`self`) => [`Option`](../../O/type-aliases/Option.md)\<`Record`\<`K`, `A` \| `B`\>\>

Apply a function to the element at the specified key, creating a new record,
or return `None` if the key doesn't exist.

### Type Parameters

• **K** *extends* `string` \| `symbol`

• **A**

• **B**

### Parameters

• **key**: `NoInfer`\<`K`\>

• **f**

### Returns

`Function`

#### Parameters

• **self**: [`ReadonlyRecord`](../type-aliases/ReadonlyRecord.md)\<`K`, `A`\>

#### Returns

[`Option`](../../O/type-aliases/Option.md)\<`Record`\<`K`, `A` \| `B`\>\>

### Param

The record to be updated.

### Param

The key of the element to modify.

### Param

The function to apply to the element.

### Example

```ts
import { Record as R, Option } from "effect"

const f = (x: number) => x * 2

assert.deepStrictEqual(
 R.modifyOption({ a: 3 }, 'a', f),
 Option.some({ a: 6 })
)
assert.deepStrictEqual(
 R.modifyOption({ a: 3 } as Record<string, number>, 'b', f),
 Option.none()
)
```

### Since

2.0.0

## modifyOption(self, key, f)

> **modifyOption**\<`K`, `A`, `B`\>(`self`, `key`, `f`): [`Option`](../../O/type-aliases/Option.md)\<`Record`\<`K`, `A` \| `B`\>\>

Apply a function to the element at the specified key, creating a new record,
or return `None` if the key doesn't exist.

### Type Parameters

• **K** *extends* `string` \| `symbol`

• **A**

• **B**

### Parameters

• **self**: [`ReadonlyRecord`](../type-aliases/ReadonlyRecord.md)\<`K`, `A`\>

• **key**: `NoInfer`\<`K`\>

• **f**

### Returns

[`Option`](../../O/type-aliases/Option.md)\<`Record`\<`K`, `A` \| `B`\>\>

### Param

The record to be updated.

### Param

The key of the element to modify.

### Param

The function to apply to the element.

### Example

```ts
import { Record as R, Option } from "effect"

const f = (x: number) => x * 2

assert.deepStrictEqual(
 R.modifyOption({ a: 3 }, 'a', f),
 Option.some({ a: 6 })
)
assert.deepStrictEqual(
 R.modifyOption({ a: 3 } as Record<string, number>, 'b', f),
 Option.none()
)
```

### Since

2.0.0
