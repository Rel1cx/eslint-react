[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [O](../README.md) / getOrThrowWith

# Function: getOrThrowWith()

Extracts the value of an `Option` or throws if the `Option` is `None`.

If a default error is sufficient for your use case and you don't need to configure the thrown error, see [getOrThrow](getOrThrow.md).

## Param

The `Option` to extract the value from.

## Param

A function that will be called if the `Option` is `None`. It returns the error to be thrown.

## Example

```ts
import { Option } from "effect"

assert.deepStrictEqual(
  Option.getOrThrowWith(Option.some(1), () => new Error('Unexpected None')),
  1
)
assert.throws(() => Option.getOrThrowWith(Option.none(), () => new Error('Unexpected None')))
```

## Since

2.0.0

## getOrThrowWith(onNone)

> **getOrThrowWith**(`onNone`): \<`A`\>(`self`) => `A`

Extracts the value of an `Option` or throws if the `Option` is `None`.

If a default error is sufficient for your use case and you don't need to configure the thrown error, see [getOrThrow](getOrThrow.md).

### Parameters

• **onNone**

### Returns

`Function`

#### Type Parameters

• **A**

#### Parameters

• **self**: [`Option`](../type-aliases/Option.md)\<`A`\>

#### Returns

`A`

### Param

The `Option` to extract the value from.

### Param

A function that will be called if the `Option` is `None`. It returns the error to be thrown.

### Example

```ts
import { Option } from "effect"

assert.deepStrictEqual(
  Option.getOrThrowWith(Option.some(1), () => new Error('Unexpected None')),
  1
)
assert.throws(() => Option.getOrThrowWith(Option.none(), () => new Error('Unexpected None')))
```

### Since

2.0.0

## getOrThrowWith(self, onNone)

> **getOrThrowWith**\<`A`\>(`self`, `onNone`): `A`

Extracts the value of an `Option` or throws if the `Option` is `None`.

If a default error is sufficient for your use case and you don't need to configure the thrown error, see [getOrThrow](getOrThrow.md).

### Type Parameters

• **A**

### Parameters

• **self**: [`Option`](../type-aliases/Option.md)\<`A`\>

• **onNone**

### Returns

`A`

### Param

The `Option` to extract the value from.

### Param

A function that will be called if the `Option` is `None`. It returns the error to be thrown.

### Example

```ts
import { Option } from "effect"

assert.deepStrictEqual(
  Option.getOrThrowWith(Option.some(1), () => new Error('Unexpected None')),
  1
)
assert.throws(() => Option.getOrThrowWith(Option.none(), () => new Error('Unexpected None')))
```

### Since

2.0.0
