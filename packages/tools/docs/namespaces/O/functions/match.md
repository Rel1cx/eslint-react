[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [O](../README.md) / match

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

## match(options)

> **match**\<`B`, `A`, `C`\>(`options`): (`self`) => `B` \| `C`

Matches the given `Option` and returns either the provided `onNone` value or the result of the provided `onSome`
function when passed the `Option`'s value.

### Type Parameters

• **B**

• **A**

• **C** = `B`

### Parameters

• **options**

• **options.onNone**: [`LazyArg`](../../F/interfaces/LazyArg.md)\<`B`\>

• **options.onSome**

### Returns

`Function`

#### Parameters

• **self**: [`Option`](../type-aliases/Option.md)\<`A`\>

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

## match(self, options)

> **match**\<`A`, `B`, `C`\>(`self`, `options`): `B` \| `C`

Matches the given `Option` and returns either the provided `onNone` value or the result of the provided `onSome`
function when passed the `Option`'s value.

### Type Parameters

• **A**

• **B**

• **C** = `B`

### Parameters

• **self**: [`Option`](../type-aliases/Option.md)\<`A`\>

The `Option` to match

• **options**

• **options.onNone**: [`LazyArg`](../../F/interfaces/LazyArg.md)\<`B`\>

• **options.onSome**

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
