[**@eslint-react/tools**](../../README.md) • **Docs**

***

[@eslint-react/tools](../../README.md) / [./Either.js](../README.md) / match

# Function: match()

Takes two functions and an `Either` value, if the value is a `Left` the inner value is applied to the `onLeft function,
if the value is a `Right` the inner value is applied to the `onRight` function.

@example
import { pipe, Either } from "effect"

const onLeft  = (strings: ReadonlyArray<string>): string => `strings: ${strings.join(', ')}`

const onRight = (value: number): string => `Ok: ${value}`

assert.deepStrictEqual(pipe(Either.right(1), Either.match({ onLeft, onRight })), 'Ok: 1')
assert.deepStrictEqual(
  pipe(Either.left(['string 1', 'string 2']), Either.match({ onLeft, onRight })),
  'strings: string 1, string 2'
)

## Category

pattern matching

## Since

2.0.0

## match(options)

> **match**\<`L`, `B`, `R`, `C`\>(`options`): (`self`) => `B` \| `C`

Takes two functions and an `Either` value, if the value is a `Left` the inner value is applied to the `onLeft function,
if the value is a `Right` the inner value is applied to the `onRight` function.

@example
import { pipe, Either } from "effect"

const onLeft  = (strings: ReadonlyArray<string>): string => `strings: ${strings.join(', ')}`

const onRight = (value: number): string => `Ok: ${value}`

assert.deepStrictEqual(pipe(Either.right(1), Either.match({ onLeft, onRight })), 'Ok: 1')
assert.deepStrictEqual(
  pipe(Either.left(['string 1', 'string 2']), Either.match({ onLeft, onRight })),
  'strings: string 1, string 2'
)

### Type Parameters

• **L**

• **B**

• **R**

• **C** = `B`

### Parameters

• **options**

• **options.onLeft**

• **options.onRight**

### Returns

`Function`

#### Parameters

• **self**: [`Either`](../type-aliases/Either.md)\<`R`, `L`\>

#### Returns

`B` \| `C`

### Category

pattern matching

### Since

2.0.0

### Category

pattern matching

### Since

2.0.0

## match(self, options)

> **match**\<`R`, `L`, `B`, `C`\>(`self`, `options`): `B` \| `C`

Takes two functions and an `Either` value, if the value is a `Left` the inner value is applied to the `onLeft function,
if the value is a `Right` the inner value is applied to the `onRight` function.

@example
import { pipe, Either } from "effect"

const onLeft  = (strings: ReadonlyArray<string>): string => `strings: ${strings.join(', ')}`

const onRight = (value: number): string => `Ok: ${value}`

assert.deepStrictEqual(pipe(Either.right(1), Either.match({ onLeft, onRight })), 'Ok: 1')
assert.deepStrictEqual(
  pipe(Either.left(['string 1', 'string 2']), Either.match({ onLeft, onRight })),
  'strings: string 1, string 2'
)

### Type Parameters

• **R**

• **L**

• **B**

• **C** = `B`

### Parameters

• **self**: [`Either`](../type-aliases/Either.md)\<`R`, `L`\>

• **options**

• **options.onLeft**

• **options.onRight**

### Returns

`B` \| `C`

### Category

pattern matching

### Since

2.0.0

### Category

pattern matching

### Since

2.0.0
