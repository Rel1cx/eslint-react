[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [E](../README.md) / getOrThrowWith

# Function: getOrThrowWith()

Extracts the value of an `Either` or throws if the `Either` is `Left`.

If a default error is sufficient for your use case and you don't need to configure the thrown error, see [getOrThrow](getOrThrow.md).

## Param

The `Either` to extract the value from.

## Param

A function that will be called if the `Either` is `Left`. It returns the error to be thrown.

## Example

```ts
import { Either } from "effect"

assert.deepStrictEqual(
  Either.getOrThrowWith(Either.right(1), () => new Error('Unexpected Left')),
  1
)
assert.throws(() => Either.getOrThrowWith(Either.left("error"), () => new Error('Unexpected Left')))
```

## Since

2.0.0

## getOrThrowWith(onLeft)

> **getOrThrowWith**\<`L`\>(`onLeft`): \<`A`\>(`self`) => `A`

Extracts the value of an `Either` or throws if the `Either` is `Left`.

If a default error is sufficient for your use case and you don't need to configure the thrown error, see [getOrThrow](getOrThrow.md).

### Type Parameters

• **L**

### Parameters

• **onLeft**

A function that will be called if the `Either` is `Left`. It returns the error to be thrown.

### Returns

`Function`

#### Type Parameters

• **A**

#### Parameters

• **self**: [`Either`](../type-aliases/Either.md)\<`A`, `L`\>

#### Returns

`A`

### Param

The `Either` to extract the value from.

### Param

A function that will be called if the `Either` is `Left`. It returns the error to be thrown.

### Examples

```ts
import { Either } from "effect"

assert.deepStrictEqual(
  Either.getOrThrowWith(Either.right(1), () => new Error('Unexpected Left')),
  1
)
assert.throws(() => Either.getOrThrowWith(Either.left("error"), () => new Error('Unexpected Left')))
```

```ts
import { Either } from "effect"

assert.deepStrictEqual(
  Either.getOrThrowWith(Either.right(1), () => new Error('Unexpected Left')),
  1
)
assert.throws(() => Either.getOrThrowWith(Either.left("error"), () => new Error('Unexpected Left')))
```

### Since

2.0.0

### Since

2.0.0

## getOrThrowWith(self, onLeft)

> **getOrThrowWith**\<`R`, `L`\>(`self`, `onLeft`): `R`

Extracts the value of an `Either` or throws if the `Either` is `Left`.

If a default error is sufficient for your use case and you don't need to configure the thrown error, see [getOrThrow](getOrThrow.md).

### Type Parameters

• **R**

• **L**

### Parameters

• **self**: [`Either`](../type-aliases/Either.md)\<`R`, `L`\>

The `Either` to extract the value from.

• **onLeft**

A function that will be called if the `Either` is `Left`. It returns the error to be thrown.

### Returns

`R`

### Param

The `Either` to extract the value from.

### Param

A function that will be called if the `Either` is `Left`. It returns the error to be thrown.

### Examples

```ts
import { Either } from "effect"

assert.deepStrictEqual(
  Either.getOrThrowWith(Either.right(1), () => new Error('Unexpected Left')),
  1
)
assert.throws(() => Either.getOrThrowWith(Either.left("error"), () => new Error('Unexpected Left')))
```

```ts
import { Either } from "effect"

assert.deepStrictEqual(
  Either.getOrThrowWith(Either.right(1), () => new Error('Unexpected Left')),
  1
)
assert.throws(() => Either.getOrThrowWith(Either.left("error"), () => new Error('Unexpected Left')))
```

### Since

2.0.0

### Since

2.0.0
