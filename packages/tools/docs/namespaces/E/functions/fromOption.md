[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [E](../README.md) / fromOption

# Function: fromOption()

## Example

```ts
import { Either, Option } from "effect"

assert.deepStrictEqual(Either.fromOption(Option.some(1), () => 'error'), Either.right(1))
assert.deepStrictEqual(Either.fromOption(Option.none(), () => 'error'), Either.left('error'))
```

## Since

2.0.0

## fromOption(onNone)

> **fromOption**\<`L`\>(`onNone`): \<`R`\>(`self`) => [`Either`](../type-aliases/Either.md)\<`R`, `L`\>

### Type Parameters

• **L**

### Parameters

• **onNone**

### Returns

`Function`

#### Type Parameters

• **R**

#### Parameters

• **self**: [`Option`](../../O/type-aliases/Option.md)\<`R`\>

#### Returns

[`Either`](../type-aliases/Either.md)\<`R`, `L`\>

### Example

```ts
import { Either, Option } from "effect"

assert.deepStrictEqual(Either.fromOption(Option.some(1), () => 'error'), Either.right(1))
assert.deepStrictEqual(Either.fromOption(Option.none(), () => 'error'), Either.left('error'))
```

### Since

2.0.0

## fromOption(self, onNone)

> **fromOption**\<`R`, `L`\>(`self`, `onNone`): [`Either`](../type-aliases/Either.md)\<`R`, `L`\>

### Type Parameters

• **R**

• **L**

### Parameters

• **self**: [`Option`](../../O/type-aliases/Option.md)\<`R`\>

• **onNone**

### Returns

[`Either`](../type-aliases/Either.md)\<`R`, `L`\>

### Example

```ts
import { Either, Option } from "effect"

assert.deepStrictEqual(Either.fromOption(Option.some(1), () => 'error'), Either.right(1))
assert.deepStrictEqual(Either.fromOption(Option.none(), () => 'error'), Either.left('error'))
```

### Since

2.0.0
