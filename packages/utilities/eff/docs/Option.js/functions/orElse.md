[**@eslint-react/eff**](../../README.md)

***

[@eslint-react/eff](../../README.md) / [./Option.js](../README.md) / orElse

# Function: orElse()

Returns the provided `Option` `that` if `self` is `None`, otherwise returns `self`.

## Param

The first `Option` to be checked.

## Param

The `Option` to return if `self` is `None`.

## Example

```ts
import { pipe, Option } from "effect"

assert.deepStrictEqual(
  pipe(
    Option.none(),
    Option.orElse(() => Option.none())
  ),
  Option.none()
)
assert.deepStrictEqual(
  pipe(
    Option.some('a'),
    Option.orElse(() => Option.none())
  ),
  Option.some('a')
)
assert.deepStrictEqual(
  pipe(
    Option.none(),
    Option.orElse(() => Option.some('b'))
  ),
  Option.some('b')
)
assert.deepStrictEqual(
  pipe(
    Option.some('a'),
    Option.orElse(() => Option.some('b'))
  ),
  Option.some('a')
)
```

## Since

2.0.0

## Call Signature

> **orElse**\<`B`\>(`that`): \<`A`\>(`self`) => [`Option`](../type-aliases/Option.md)\<`B` \| `A`\>

Returns the provided `Option` `that` if `self` is `None`, otherwise returns `self`.

### Type Parameters

• **B**

### Parameters

#### that

[`LazyArg`](../../namespaces/F/interfaces/LazyArg.md)\<[`Option`](../type-aliases/Option.md)\<`B`\>\>

The `Option` to return if `self` is `None`.

### Returns

`Function`

#### Type Parameters

• **A**

#### Parameters

##### self

[`Option`](../type-aliases/Option.md)\<`A`\>

#### Returns

[`Option`](../type-aliases/Option.md)\<`B` \| `A`\>

### Param

The first `Option` to be checked.

### Param

The `Option` to return if `self` is `None`.

### Examples

```ts
import { pipe, Option } from "effect"

assert.deepStrictEqual(
  pipe(
    Option.none(),
    Option.orElse(() => Option.none())
  ),
  Option.none()
)
assert.deepStrictEqual(
  pipe(
    Option.some('a'),
    Option.orElse(() => Option.none())
  ),
  Option.some('a')
)
assert.deepStrictEqual(
  pipe(
    Option.none(),
    Option.orElse(() => Option.some('b'))
  ),
  Option.some('b')
)
assert.deepStrictEqual(
  pipe(
    Option.some('a'),
    Option.orElse(() => Option.some('b'))
  ),
  Option.some('a')
)
```

```ts
import { pipe, Option } from "effect"

assert.deepStrictEqual(
  pipe(
    Option.none(),
    Option.orElse(() => Option.none())
  ),
  Option.none()
)
assert.deepStrictEqual(
  pipe(
    Option.some('a'),
    Option.orElse(() => Option.none())
  ),
  Option.some('a')
)
assert.deepStrictEqual(
  pipe(
    Option.none(),
    Option.orElse(() => Option.some('b'))
  ),
  Option.some('b')
)
assert.deepStrictEqual(
  pipe(
    Option.some('a'),
    Option.orElse(() => Option.some('b'))
  ),
  Option.some('a')
)
```

### Since

2.0.0

### Since

2.0.0

## Call Signature

> **orElse**\<`A`, `B`\>(`self`, `that`): [`Option`](../type-aliases/Option.md)\<`A` \| `B`\>

Returns the provided `Option` `that` if `self` is `None`, otherwise returns `self`.

### Type Parameters

• **A**

• **B**

### Parameters

#### self

[`Option`](../type-aliases/Option.md)\<`A`\>

The first `Option` to be checked.

#### that

[`LazyArg`](../../namespaces/F/interfaces/LazyArg.md)\<[`Option`](../type-aliases/Option.md)\<`B`\>\>

The `Option` to return if `self` is `None`.

### Returns

[`Option`](../type-aliases/Option.md)\<`A` \| `B`\>

### Param

The first `Option` to be checked.

### Param

The `Option` to return if `self` is `None`.

### Examples

```ts
import { pipe, Option } from "effect"

assert.deepStrictEqual(
  pipe(
    Option.none(),
    Option.orElse(() => Option.none())
  ),
  Option.none()
)
assert.deepStrictEqual(
  pipe(
    Option.some('a'),
    Option.orElse(() => Option.none())
  ),
  Option.some('a')
)
assert.deepStrictEqual(
  pipe(
    Option.none(),
    Option.orElse(() => Option.some('b'))
  ),
  Option.some('b')
)
assert.deepStrictEqual(
  pipe(
    Option.some('a'),
    Option.orElse(() => Option.some('b'))
  ),
  Option.some('a')
)
```

```ts
import { pipe, Option } from "effect"

assert.deepStrictEqual(
  pipe(
    Option.none(),
    Option.orElse(() => Option.none())
  ),
  Option.none()
)
assert.deepStrictEqual(
  pipe(
    Option.some('a'),
    Option.orElse(() => Option.none())
  ),
  Option.some('a')
)
assert.deepStrictEqual(
  pipe(
    Option.none(),
    Option.orElse(() => Option.some('b'))
  ),
  Option.some('b')
)
assert.deepStrictEqual(
  pipe(
    Option.some('a'),
    Option.orElse(() => Option.some('b'))
  ),
  Option.some('a')
)
```

### Since

2.0.0

### Since

2.0.0
