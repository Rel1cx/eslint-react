[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [O](../README.md) / reduceCompact

# Function: reduceCompact()

Reduces an `Iterable` of `Option<A>` to a single value of type `B`, elements that are `None` are ignored.

## Param

The Iterable of `Option<A>` to be reduced.

## Param

The initial value of the accumulator.

## Param

The reducing function that takes the current accumulator value and the unwrapped value of an `Option<A>`.

## Example

```ts
import { pipe, Option } from "effect"

const iterable = [Option.some(1), Option.none(), Option.some(2), Option.none()]
assert.deepStrictEqual(pipe(iterable, Option.reduceCompact(0, (b, a) => b + a)), 3)
```

## Since

2.0.0

## reduceCompact(b, f)

> **reduceCompact**\<`B`, `A`\>(`b`, `f`): (`self`) => `B`

Reduces an `Iterable` of `Option<A>` to a single value of type `B`, elements that are `None` are ignored.

### Type Parameters

• **B**

• **A**

### Parameters

• **b**: `B`

• **f**

### Returns

`Function`

#### Parameters

• **self**: `Iterable`\<[`Option`](../type-aliases/Option.md)\<`A`\>, `any`, `any`\>

#### Returns

`B`

### Param

The Iterable of `Option<A>` to be reduced.

### Param

The initial value of the accumulator.

### Param

The reducing function that takes the current accumulator value and the unwrapped value of an `Option<A>`.

### Example

```ts
import { pipe, Option } from "effect"

const iterable = [Option.some(1), Option.none(), Option.some(2), Option.none()]
assert.deepStrictEqual(pipe(iterable, Option.reduceCompact(0, (b, a) => b + a)), 3)
```

### Since

2.0.0

## reduceCompact(self, b, f)

> **reduceCompact**\<`A`, `B`\>(`self`, `b`, `f`): `B`

Reduces an `Iterable` of `Option<A>` to a single value of type `B`, elements that are `None` are ignored.

### Type Parameters

• **A**

• **B**

### Parameters

• **self**: `Iterable`\<[`Option`](../type-aliases/Option.md)\<`A`\>, `any`, `any`\>

• **b**: `B`

• **f**

### Returns

`B`

### Param

The Iterable of `Option<A>` to be reduced.

### Param

The initial value of the accumulator.

### Param

The reducing function that takes the current accumulator value and the unwrapped value of an `Option<A>`.

### Example

```ts
import { pipe, Option } from "effect"

const iterable = [Option.some(1), Option.none(), Option.some(2), Option.none()]
assert.deepStrictEqual(pipe(iterable, Option.reduceCompact(0, (b, a) => b + a)), 3)
```

### Since

2.0.0
