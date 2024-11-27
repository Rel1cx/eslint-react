[**@eslint-react/tools**](../../README.md) • **Docs**

***

[@eslint-react/tools](../../README.md) / [./Option.js](../README.md) / orElseSome

# Function: orElseSome()

Returns the provided default value as `Some` if `self` is `None`, otherwise returns `self`.

## Param

The first `Option` to be checked.

## Param

Function that returns the default value to return if the `Option` is `None`.

## Example

```ts
import { pipe, Option } from "effect"

assert.deepStrictEqual(
  pipe(
    Option.none(),
    Option.orElseSome(() => 'b')
  ),
  Option.some('b')
)
assert.deepStrictEqual(
  pipe(
    Option.some('a'),
    Option.orElseSome(() => 'b')
  ),
  Option.some('a')
)
```

## Category

error handling

## Since

2.0.0

## orElseSome(onNone)

> **orElseSome**\<`B`\>(`onNone`): \<`A`\>(`self`) => [`Option`](../type-aliases/Option.md)\<`B` \| `A`\>

Returns the provided default value as `Some` if `self` is `None`, otherwise returns `self`.

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

[`Option`](../type-aliases/Option.md)\<`B` \| `A`\>

### Param

The first `Option` to be checked.

### Param

Function that returns the default value to return if the `Option` is `None`.

### Examples

```ts
import { pipe, Option } from "effect"

assert.deepStrictEqual(
  pipe(
    Option.none(),
    Option.orElseSome(() => 'b')
  ),
  Option.some('b')
)
assert.deepStrictEqual(
  pipe(
    Option.some('a'),
    Option.orElseSome(() => 'b')
  ),
  Option.some('a')
)
```

```ts
import { pipe, Option } from "effect"

assert.deepStrictEqual(
  pipe(
    Option.none(),
    Option.orElseSome(() => 'b')
  ),
  Option.some('b')
)
assert.deepStrictEqual(
  pipe(
    Option.some('a'),
    Option.orElseSome(() => 'b')
  ),
  Option.some('a')
)
```

### Category

error handling

### Since

2.0.0

### Category

error handling

### Since

2.0.0

## orElseSome(self, onNone)

> **orElseSome**\<`A`, `B`\>(`self`, `onNone`): [`Option`](../type-aliases/Option.md)\<`A` \| `B`\>

Returns the provided default value as `Some` if `self` is `None`, otherwise returns `self`.

### Type Parameters

• **A**

• **B**

### Parameters

• **self**: [`Option`](../type-aliases/Option.md)\<`A`\>

The first `Option` to be checked.

• **onNone**: [`LazyArg`](../../namespaces/F/interfaces/LazyArg.md)\<`B`\>

Function that returns the default value to return if the `Option` is `None`.

### Returns

[`Option`](../type-aliases/Option.md)\<`A` \| `B`\>

### Param

The first `Option` to be checked.

### Param

Function that returns the default value to return if the `Option` is `None`.

### Examples

```ts
import { pipe, Option } from "effect"

assert.deepStrictEqual(
  pipe(
    Option.none(),
    Option.orElseSome(() => 'b')
  ),
  Option.some('b')
)
assert.deepStrictEqual(
  pipe(
    Option.some('a'),
    Option.orElseSome(() => 'b')
  ),
  Option.some('a')
)
```

```ts
import { pipe, Option } from "effect"

assert.deepStrictEqual(
  pipe(
    Option.none(),
    Option.orElseSome(() => 'b')
  ),
  Option.some('b')
)
assert.deepStrictEqual(
  pipe(
    Option.some('a'),
    Option.orElseSome(() => 'b')
  ),
  Option.some('a')
)
```

### Category

error handling

### Since

2.0.0

### Category

error handling

### Since

2.0.0
