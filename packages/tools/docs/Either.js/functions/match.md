[**@eslint-react/tools**](../../README.md)

***

[@eslint-react/tools](../../README.md) / [./Either.js](../README.md) / match

# Function: match()

Takes two functions and an `Either` value, if the value is a `Left` the inner value is applied to the `onLeft function,
if the value is a `Right` the inner value is applied to the `onRight` function.

@example
```ts
import { pipe, Either } from "effect"

const onLeft  = (strings: ReadonlyArray<string>): string => `strings: ${strings.join(', ')}`

const onRight = (value: number): string => `Ok: ${value}`

assert.deepStrictEqual(pipe(Either.right(1), Either.match({ onLeft, onRight })), 'Ok: 1')
assert.deepStrictEqual(
  pipe(Either.left(['string 1', 'string 2']), Either.match({ onLeft, onRight })),
  'strings: string 1, string 2'
)
```

@category pattern matching
@since 2.0.0

## Call Signature

> **match**\<`L`, `B`, `R`, `C`\>(`options`): (`self`) => `B` \| `C`

Takes two functions and an `Either` value, if the value is a `Left` the inner value is applied to the `onLeft function,
if the value is a `Right` the inner value is applied to the `onRight` function.

@example
```ts
import { pipe, Either } from "effect"

const onLeft  = (strings: ReadonlyArray<string>): string => `strings: ${strings.join(', ')}`

const onRight = (value: number): string => `Ok: ${value}`

assert.deepStrictEqual(pipe(Either.right(1), Either.match({ onLeft, onRight })), 'Ok: 1')
assert.deepStrictEqual(
  pipe(Either.left(['string 1', 'string 2']), Either.match({ onLeft, onRight })),
  'strings: string 1, string 2'
)
```

@category pattern matching
@since 2.0.0

### Type Parameters

• **L**

• **B**

• **R**

• **C** = `B`

### Parameters

#### options

##### options.onLeft

(`left`) => `B`

##### options.onRight

(`right`) => `C`

### Returns

`Function`

#### Parameters

##### self

[`Either`](../type-aliases/Either.md)\<`R`, `L`\>

#### Returns

`B` \| `C`

## Call Signature

> **match**\<`R`, `L`, `B`, `C`\>(`self`, `options`): `B` \| `C`

Takes two functions and an `Either` value, if the value is a `Left` the inner value is applied to the `onLeft function,
if the value is a `Right` the inner value is applied to the `onRight` function.

@example
```ts
import { pipe, Either } from "effect"

const onLeft  = (strings: ReadonlyArray<string>): string => `strings: ${strings.join(', ')}`

const onRight = (value: number): string => `Ok: ${value}`

assert.deepStrictEqual(pipe(Either.right(1), Either.match({ onLeft, onRight })), 'Ok: 1')
assert.deepStrictEqual(
  pipe(Either.left(['string 1', 'string 2']), Either.match({ onLeft, onRight })),
  'strings: string 1, string 2'
)
```

@category pattern matching
@since 2.0.0

### Type Parameters

• **R**

• **L**

• **B**

• **C** = `B`

### Parameters

#### self

[`Either`](../type-aliases/Either.md)\<`R`, `L`\>

#### options

##### options.onLeft

(`left`) => `B`

##### options.onRight

(`right`) => `C`

### Returns

`B` \| `C`
