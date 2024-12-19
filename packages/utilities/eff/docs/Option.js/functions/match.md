[**@eslint-react/tools**](../../README.md)

***

[@eslint-react/tools](../../README.md) / [./Option.js](../README.md) / match

# Function: match()

Matches the given `Option` and returns either the provided `onNone` value or the result of the provided `onSome`
function when passed the `Option`'s value.

## Param

The `Option` to match

## Param

The value to be returned if the `Option` is `None`

## Param

The function to be called if the `Option` is `Some`, it will be passed the `Option`'s value and its result will be returned

## Example

```ts
import { pipe, Option } from "effect"

assert.deepStrictEqual(
  pipe(Option.some(1), Option.match({ onNone: () => 'a none', onSome: (a) => `a some containing ${a}` })),
  'a some containing 1'
)

assert.deepStrictEqual(
  pipe(Option.none(), Option.match({ onNone: () => 'a none', onSome: (a) => `a some containing ${a}` })),
  'a none'
)
```

## Since

2.0.0

## Call Signature

> **match**\<`B`, `A`, `C`\>(`options`): (`self`) => `B` \| `C`

Matches the given `Option` and returns either the provided `onNone` value or the result of the provided `onSome`
function when passed the `Option`'s value.

### Type Parameters

• **B**

• **A**

• **C** = `B`

### Parameters

#### options

##### onNone

[`LazyArg`](../../namespaces/F/interfaces/LazyArg.md)\<`B`\>

##### onSome

(`a`) => `C`

### Returns

`Function`

#### Parameters

##### self

[`Option`](../type-aliases/Option.md)\<`A`\>

#### Returns

`B` \| `C`

### Param

The `Option` to match

### Param

The value to be returned if the `Option` is `None`

### Param

The function to be called if the `Option` is `Some`, it will be passed the `Option`'s value and its result will be returned

### Examples

```ts
import { pipe, Option } from "effect"

assert.deepStrictEqual(
  pipe(Option.some(1), Option.match({ onNone: () => 'a none', onSome: (a) => `a some containing ${a}` })),
  'a some containing 1'
)

assert.deepStrictEqual(
  pipe(Option.none(), Option.match({ onNone: () => 'a none', onSome: (a) => `a some containing ${a}` })),
  'a none'
)
```

```ts
import { pipe, Option } from "effect"

assert.deepStrictEqual(
  pipe(Option.some(1), Option.match({ onNone: () => 'a none', onSome: (a) => `a some containing ${a}` })),
  'a some containing 1'
)

assert.deepStrictEqual(
  pipe(Option.none(), Option.match({ onNone: () => 'a none', onSome: (a) => `a some containing ${a}` })),
  'a none'
)
```

### Since

2.0.0

### Since

2.0.0

## Call Signature

> **match**\<`A`, `B`, `C`\>(`self`, `options`): `B` \| `C`

Matches the given `Option` and returns either the provided `onNone` value or the result of the provided `onSome`
function when passed the `Option`'s value.

### Type Parameters

• **A**

• **B**

• **C** = `B`

### Parameters

#### self

[`Option`](../type-aliases/Option.md)\<`A`\>

The `Option` to match

#### options

##### onNone

[`LazyArg`](../../namespaces/F/interfaces/LazyArg.md)\<`B`\>

##### onSome

(`a`) => `C`

### Returns

`B` \| `C`

### Param

The `Option` to match

### Param

The value to be returned if the `Option` is `None`

### Param

The function to be called if the `Option` is `Some`, it will be passed the `Option`'s value and its result will be returned

### Examples

```ts
import { pipe, Option } from "effect"

assert.deepStrictEqual(
  pipe(Option.some(1), Option.match({ onNone: () => 'a none', onSome: (a) => `a some containing ${a}` })),
  'a some containing 1'
)

assert.deepStrictEqual(
  pipe(Option.none(), Option.match({ onNone: () => 'a none', onSome: (a) => `a some containing ${a}` })),
  'a none'
)
```

```ts
import { pipe, Option } from "effect"

assert.deepStrictEqual(
  pipe(Option.some(1), Option.match({ onNone: () => 'a none', onSome: (a) => `a some containing ${a}` })),
  'a some containing 1'
)

assert.deepStrictEqual(
  pipe(Option.none(), Option.match({ onNone: () => 'a none', onSome: (a) => `a some containing ${a}` })),
  'a none'
)
```

### Since

2.0.0

### Since

2.0.0
