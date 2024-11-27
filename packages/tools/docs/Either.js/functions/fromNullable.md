[**@eslint-react/tools**](../../README.md) • **Docs**

***

[@eslint-react/tools](../../README.md) / [./Either.js](../README.md) / fromNullable

# Function: fromNullable()

Takes a lazy default and a nullable value, if the value is not nully (`null` or `undefined`), turn it into a `Right`, if the value is nully use
the provided default as a `Left`.

## Example

```ts
import { Either } from "effect"

assert.deepStrictEqual(Either.fromNullable(1, () => 'fallback'), Either.right(1))
assert.deepStrictEqual(Either.fromNullable(null, () => 'fallback'), Either.left('fallback'))
```

## Category

constructors

## Since

2.0.0

## fromNullable(onNullable)

> **fromNullable**\<`R`, `L`\>(`onNullable`): (`self`) => [`Either`](../type-aliases/Either.md)\<`NonNullable`\<`R`\>, `L`\>

Takes a lazy default and a nullable value, if the value is not nully (`null` or `undefined`), turn it into a `Right`, if the value is nully use
the provided default as a `Left`.

### Type Parameters

• **R**

• **L**

### Parameters

• **onNullable**

### Returns

`Function`

#### Parameters

• **self**: `R`

#### Returns

[`Either`](../type-aliases/Either.md)\<`NonNullable`\<`R`\>, `L`\>

### Examples

```ts
import { Either } from "effect"

assert.deepStrictEqual(Either.fromNullable(1, () => 'fallback'), Either.right(1))
assert.deepStrictEqual(Either.fromNullable(null, () => 'fallback'), Either.left('fallback'))
```

```ts
import { Either } from "effect"

assert.deepStrictEqual(Either.fromNullable(1, () => 'fallback'), Either.right(1))
assert.deepStrictEqual(Either.fromNullable(null, () => 'fallback'), Either.left('fallback'))
```

### Category

constructors

### Since

2.0.0

### Category

constructors

### Since

2.0.0

## fromNullable(self, onNullable)

> **fromNullable**\<`R`, `L`\>(`self`, `onNullable`): [`Either`](../type-aliases/Either.md)\<`NonNullable`\<`R`\>, `L`\>

Takes a lazy default and a nullable value, if the value is not nully (`null` or `undefined`), turn it into a `Right`, if the value is nully use
the provided default as a `Left`.

### Type Parameters

• **R**

• **L**

### Parameters

• **self**: `R`

• **onNullable**

### Returns

[`Either`](../type-aliases/Either.md)\<`NonNullable`\<`R`\>, `L`\>

### Examples

```ts
import { Either } from "effect"

assert.deepStrictEqual(Either.fromNullable(1, () => 'fallback'), Either.right(1))
assert.deepStrictEqual(Either.fromNullable(null, () => 'fallback'), Either.left('fallback'))
```

```ts
import { Either } from "effect"

assert.deepStrictEqual(Either.fromNullable(1, () => 'fallback'), Either.right(1))
assert.deepStrictEqual(Either.fromNullable(null, () => 'fallback'), Either.left('fallback'))
```

### Category

constructors

### Since

2.0.0

### Category

constructors

### Since

2.0.0
