[**@eslint-react/tools**](../../README.md)

***

[@eslint-react/tools](../../README.md) / [./Either.js](../README.md) / fromOption

# Function: fromOption()

## Example

```ts
import { Either, Option } from "effect"

assert.deepStrictEqual(Either.fromOption(Option.some(1), () => 'error'), Either.right(1))
assert.deepStrictEqual(Either.fromOption(Option.none(), () => 'error'), Either.left('error'))
```

## Since

2.0.0

## Call Signature

> **fromOption**\<`L`\>(`onNone`): \<`R`\>(`self`) => [`Either`](../type-aliases/Either.md)\<`R`, `L`\>

### Type Parameters

• **L**

### Parameters

#### onNone

() => `L`

### Returns

`Function`

#### Type Parameters

• **R**

#### Parameters

##### self

[`Option`](../../Option.js/type-aliases/Option.md)\<`R`\>

#### Returns

[`Either`](../type-aliases/Either.md)\<`R`, `L`\>

### Examples

```ts
import { Either, Option } from "effect"

assert.deepStrictEqual(Either.fromOption(Option.some(1), () => 'error'), Either.right(1))
assert.deepStrictEqual(Either.fromOption(Option.none(), () => 'error'), Either.left('error'))
```

```ts
import { Either, Option } from "effect"

assert.deepStrictEqual(Either.fromOption(Option.some(1), () => 'error'), Either.right(1))
assert.deepStrictEqual(Either.fromOption(Option.none(), () => 'error'), Either.left('error'))
```

### Since

2.0.0

### Since

2.0.0

## Call Signature

> **fromOption**\<`R`, `L`\>(`self`, `onNone`): [`Either`](../type-aliases/Either.md)\<`R`, `L`\>

### Type Parameters

• **R**

• **L**

### Parameters

#### self

[`Option`](../../Option.js/type-aliases/Option.md)\<`R`\>

#### onNone

() => `L`

### Returns

[`Either`](../type-aliases/Either.md)\<`R`, `L`\>

### Examples

```ts
import { Either, Option } from "effect"

assert.deepStrictEqual(Either.fromOption(Option.some(1), () => 'error'), Either.right(1))
assert.deepStrictEqual(Either.fromOption(Option.none(), () => 'error'), Either.left('error'))
```

```ts
import { Either, Option } from "effect"

assert.deepStrictEqual(Either.fromOption(Option.some(1), () => 'error'), Either.right(1))
assert.deepStrictEqual(Either.fromOption(Option.none(), () => 'error'), Either.left('error'))
```

### Since

2.0.0

### Since

2.0.0
