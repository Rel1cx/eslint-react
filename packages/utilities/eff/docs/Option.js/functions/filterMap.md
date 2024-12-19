[**@eslint-react/tools**](../../README.md)

***

[@eslint-react/tools](../../README.md) / [./Option.js](../README.md) / filterMap

# Function: filterMap()

Maps over the value of an `Option` and filters out `None`s.

Useful when in addition to filtering you also want to change the type of the `Option`.

## Param

The `Option` to map over.

## Param

A function to apply to the value of the `Option`.

## Example

```ts
import { Option } from "effect"

const evenNumber = (n: number) => n % 2 === 0 ? Option.some(n) : Option.none()

assert.deepStrictEqual(Option.filterMap(Option.none(), evenNumber), Option.none())
assert.deepStrictEqual(Option.filterMap(Option.some(3), evenNumber), Option.none())
assert.deepStrictEqual(Option.filterMap(Option.some(2), evenNumber), Option.some(2))
```

## Since

2.0.0

## Call Signature

> **filterMap**\<`A`, `B`\>(`f`): (`self`) => [`Option`](../type-aliases/Option.md)\<`B`\>

Maps over the value of an `Option` and filters out `None`s.

Useful when in addition to filtering you also want to change the type of the `Option`.

### Type Parameters

• **A**

• **B**

### Parameters

#### f

(`a`) => [`Option`](../type-aliases/Option.md)\<`B`\>

A function to apply to the value of the `Option`.

### Returns

`Function`

#### Parameters

##### self

[`Option`](../type-aliases/Option.md)\<`A`\>

#### Returns

[`Option`](../type-aliases/Option.md)\<`B`\>

### Param

The `Option` to map over.

### Param

A function to apply to the value of the `Option`.

### Examples

```ts
import { Option } from "effect"

const evenNumber = (n: number) => n % 2 === 0 ? Option.some(n) : Option.none()

assert.deepStrictEqual(Option.filterMap(Option.none(), evenNumber), Option.none())
assert.deepStrictEqual(Option.filterMap(Option.some(3), evenNumber), Option.none())
assert.deepStrictEqual(Option.filterMap(Option.some(2), evenNumber), Option.some(2))
```

```ts
import { Option } from "effect"

const evenNumber = (n: number) => n % 2 === 0 ? Option.some(n) : Option.none()

assert.deepStrictEqual(Option.filterMap(Option.none(), evenNumber), Option.none())
assert.deepStrictEqual(Option.filterMap(Option.some(3), evenNumber), Option.none())
assert.deepStrictEqual(Option.filterMap(Option.some(2), evenNumber), Option.some(2))
```

### Since

2.0.0

### Since

2.0.0

## Call Signature

> **filterMap**\<`A`, `B`\>(`self`, `f`): [`Option`](../type-aliases/Option.md)\<`B`\>

Maps over the value of an `Option` and filters out `None`s.

Useful when in addition to filtering you also want to change the type of the `Option`.

### Type Parameters

• **A**

• **B**

### Parameters

#### self

[`Option`](../type-aliases/Option.md)\<`A`\>

The `Option` to map over.

#### f

(`a`) => [`Option`](../type-aliases/Option.md)\<`B`\>

A function to apply to the value of the `Option`.

### Returns

[`Option`](../type-aliases/Option.md)\<`B`\>

### Param

The `Option` to map over.

### Param

A function to apply to the value of the `Option`.

### Examples

```ts
import { Option } from "effect"

const evenNumber = (n: number) => n % 2 === 0 ? Option.some(n) : Option.none()

assert.deepStrictEqual(Option.filterMap(Option.none(), evenNumber), Option.none())
assert.deepStrictEqual(Option.filterMap(Option.some(3), evenNumber), Option.none())
assert.deepStrictEqual(Option.filterMap(Option.some(2), evenNumber), Option.some(2))
```

```ts
import { Option } from "effect"

const evenNumber = (n: number) => n % 2 === 0 ? Option.some(n) : Option.none()

assert.deepStrictEqual(Option.filterMap(Option.none(), evenNumber), Option.none())
assert.deepStrictEqual(Option.filterMap(Option.some(3), evenNumber), Option.none())
assert.deepStrictEqual(Option.filterMap(Option.some(2), evenNumber), Option.some(2))
```

### Since

2.0.0

### Since

2.0.0
