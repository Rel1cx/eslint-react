[**@eslint-react/tools**](../../README.md) • **Docs**

***

[@eslint-react/tools](../../README.md) / [./Option.js](../README.md) / getOrElse

# Function: getOrElse()

Returns the value of the `Option` if it is `Some`, otherwise returns `onNone`

## Param

The `Option` to get the value of.

## Param

Function that returns the default value to return if the `Option` is `None`.

## Example

```ts
import { pipe, Option } from "effect"

assert.deepStrictEqual(pipe(Option.some(1), Option.getOrElse(() => 0)), 1)
assert.deepStrictEqual(pipe(Option.none(), Option.getOrElse(() => 0)), 0)
```

## Category

getters

## Since

2.0.0

## getOrElse(onNone)

> **getOrElse**\<`B`\>(`onNone`): \<`A`\>(`self`) => `B` \| `A`

Returns the value of the `Option` if it is `Some`, otherwise returns `onNone`

### Type Parameters

• **B**

### Parameters

• **onNone**: [`LazyArg`](../../namespaces/F/interfaces/LazyArg.md)\<`B`\>

Function that returns the default value to return if the `Option` is `None`.

### Returns

`Function`

#### Type Parameters

• **A**

#### Parameters

• **self**: [`Option`](../type-aliases/Option.md)\<`A`\>

#### Returns

`B` \| `A`

### Param

The `Option` to get the value of.

### Param

Function that returns the default value to return if the `Option` is `None`.

### Examples

```ts
import { pipe, Option } from "effect"

assert.deepStrictEqual(pipe(Option.some(1), Option.getOrElse(() => 0)), 1)
assert.deepStrictEqual(pipe(Option.none(), Option.getOrElse(() => 0)), 0)
```

```ts
import { pipe, Option } from "effect"

assert.deepStrictEqual(pipe(Option.some(1), Option.getOrElse(() => 0)), 1)
assert.deepStrictEqual(pipe(Option.none(), Option.getOrElse(() => 0)), 0)
```

### Category

getters

### Since

2.0.0

### Category

getters

### Since

2.0.0

## getOrElse(self, onNone)

> **getOrElse**\<`A`, `B`\>(`self`, `onNone`): `A` \| `B`

Returns the value of the `Option` if it is `Some`, otherwise returns `onNone`

### Type Parameters

• **A**

• **B**

### Parameters

• **self**: [`Option`](../type-aliases/Option.md)\<`A`\>

The `Option` to get the value of.

• **onNone**: [`LazyArg`](../../namespaces/F/interfaces/LazyArg.md)\<`B`\>

Function that returns the default value to return if the `Option` is `None`.

### Returns

`A` \| `B`

### Param

The `Option` to get the value of.

### Param

Function that returns the default value to return if the `Option` is `None`.

### Examples

```ts
import { pipe, Option } from "effect"

assert.deepStrictEqual(pipe(Option.some(1), Option.getOrElse(() => 0)), 1)
assert.deepStrictEqual(pipe(Option.none(), Option.getOrElse(() => 0)), 0)
```

```ts
import { pipe, Option } from "effect"

assert.deepStrictEqual(pipe(Option.some(1), Option.getOrElse(() => 0)), 1)
assert.deepStrictEqual(pipe(Option.none(), Option.getOrElse(() => 0)), 0)
```

### Category

getters

### Since

2.0.0

### Category

getters

### Since

2.0.0
