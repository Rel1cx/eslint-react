[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [O](../README.md) / filter

# Function: filter()

Filters an `Option` using a predicate. If the predicate is not satisfied or the `Option` is `None` returns `None`.

If you need to change the type of the `Option` in addition to filtering, see `filterMap`.

## Param

A predicate function to apply to the `Option` value.

## Param

The `Option` to filter.

## Example

```ts
import { Option } from "effect"

// predicate
const isEven = (n: number) => n % 2 === 0

assert.deepStrictEqual(Option.filter(Option.none(), isEven), Option.none())
assert.deepStrictEqual(Option.filter(Option.some(3), isEven), Option.none())
assert.deepStrictEqual(Option.filter(Option.some(2), isEven), Option.some(2))

// refinement
const isNumber = (v: unknown): v is number => typeof v === "number"

assert.deepStrictEqual(Option.filter(Option.none(), isNumber), Option.none())
assert.deepStrictEqual(Option.filter(Option.some('hello'), isNumber), Option.none())
assert.deepStrictEqual(Option.filter(Option.some(2), isNumber), Option.some(2))
```

## Since

2.0.0

## filter(refinement)

> **filter**\<`A`, `B`\>(`refinement`): (`self`) => [`Option`](../type-aliases/Option.md)\<`B`\>

Filters an `Option` using a predicate. If the predicate is not satisfied or the `Option` is `None` returns `None`.

If you need to change the type of the `Option` in addition to filtering, see `filterMap`.

### Type Parameters

• **A**

• **B**

### Parameters

• **refinement**: [`Refinement`](../../Pred/interfaces/Refinement.md)\<`NoInfer`\<`A`\>, `B`\>

### Returns

`Function`

#### Parameters

• **self**: [`Option`](../type-aliases/Option.md)\<`A`\>

#### Returns

[`Option`](../type-aliases/Option.md)\<`B`\>

### Param

A predicate function to apply to the `Option` value.

### Param

The `Option` to filter.

### Example

```ts
import { Option } from "effect"

// predicate
const isEven = (n: number) => n % 2 === 0

assert.deepStrictEqual(Option.filter(Option.none(), isEven), Option.none())
assert.deepStrictEqual(Option.filter(Option.some(3), isEven), Option.none())
assert.deepStrictEqual(Option.filter(Option.some(2), isEven), Option.some(2))

// refinement
const isNumber = (v: unknown): v is number => typeof v === "number"

assert.deepStrictEqual(Option.filter(Option.none(), isNumber), Option.none())
assert.deepStrictEqual(Option.filter(Option.some('hello'), isNumber), Option.none())
assert.deepStrictEqual(Option.filter(Option.some(2), isNumber), Option.some(2))
```

### Since

2.0.0

## filter(predicate)

> **filter**\<`A`\>(`predicate`): (`self`) => [`Option`](../type-aliases/Option.md)\<`A`\>

Filters an `Option` using a predicate. If the predicate is not satisfied or the `Option` is `None` returns `None`.

If you need to change the type of the `Option` in addition to filtering, see `filterMap`.

### Type Parameters

• **A**

### Parameters

• **predicate**: [`Predicate`](../../Pred/interfaces/Predicate.md)\<`NoInfer`\<`A`\>\>

### Returns

`Function`

#### Parameters

• **self**: [`Option`](../type-aliases/Option.md)\<`A`\>

#### Returns

[`Option`](../type-aliases/Option.md)\<`A`\>

### Param

A predicate function to apply to the `Option` value.

### Param

The `Option` to filter.

### Example

```ts
import { Option } from "effect"

// predicate
const isEven = (n: number) => n % 2 === 0

assert.deepStrictEqual(Option.filter(Option.none(), isEven), Option.none())
assert.deepStrictEqual(Option.filter(Option.some(3), isEven), Option.none())
assert.deepStrictEqual(Option.filter(Option.some(2), isEven), Option.some(2))

// refinement
const isNumber = (v: unknown): v is number => typeof v === "number"

assert.deepStrictEqual(Option.filter(Option.none(), isNumber), Option.none())
assert.deepStrictEqual(Option.filter(Option.some('hello'), isNumber), Option.none())
assert.deepStrictEqual(Option.filter(Option.some(2), isNumber), Option.some(2))
```

### Since

2.0.0

## filter(self, refinement)

> **filter**\<`A`, `B`\>(`self`, `refinement`): [`Option`](../type-aliases/Option.md)\<`B`\>

Filters an `Option` using a predicate. If the predicate is not satisfied or the `Option` is `None` returns `None`.

If you need to change the type of the `Option` in addition to filtering, see `filterMap`.

### Type Parameters

• **A**

• **B**

### Parameters

• **self**: [`Option`](../type-aliases/Option.md)\<`A`\>

• **refinement**: [`Refinement`](../../Pred/interfaces/Refinement.md)\<`A`, `B`\>

### Returns

[`Option`](../type-aliases/Option.md)\<`B`\>

### Param

A predicate function to apply to the `Option` value.

### Param

The `Option` to filter.

### Example

```ts
import { Option } from "effect"

// predicate
const isEven = (n: number) => n % 2 === 0

assert.deepStrictEqual(Option.filter(Option.none(), isEven), Option.none())
assert.deepStrictEqual(Option.filter(Option.some(3), isEven), Option.none())
assert.deepStrictEqual(Option.filter(Option.some(2), isEven), Option.some(2))

// refinement
const isNumber = (v: unknown): v is number => typeof v === "number"

assert.deepStrictEqual(Option.filter(Option.none(), isNumber), Option.none())
assert.deepStrictEqual(Option.filter(Option.some('hello'), isNumber), Option.none())
assert.deepStrictEqual(Option.filter(Option.some(2), isNumber), Option.some(2))
```

### Since

2.0.0

## filter(self, predicate)

> **filter**\<`A`\>(`self`, `predicate`): [`Option`](../type-aliases/Option.md)\<`A`\>

Filters an `Option` using a predicate. If the predicate is not satisfied or the `Option` is `None` returns `None`.

If you need to change the type of the `Option` in addition to filtering, see `filterMap`.

### Type Parameters

• **A**

### Parameters

• **self**: [`Option`](../type-aliases/Option.md)\<`A`\>

• **predicate**: [`Predicate`](../../Pred/interfaces/Predicate.md)\<`A`\>

### Returns

[`Option`](../type-aliases/Option.md)\<`A`\>

### Param

A predicate function to apply to the `Option` value.

### Param

The `Option` to filter.

### Example

```ts
import { Option } from "effect"

// predicate
const isEven = (n: number) => n % 2 === 0

assert.deepStrictEqual(Option.filter(Option.none(), isEven), Option.none())
assert.deepStrictEqual(Option.filter(Option.some(3), isEven), Option.none())
assert.deepStrictEqual(Option.filter(Option.some(2), isEven), Option.some(2))

// refinement
const isNumber = (v: unknown): v is number => typeof v === "number"

assert.deepStrictEqual(Option.filter(Option.none(), isNumber), Option.none())
assert.deepStrictEqual(Option.filter(Option.some('hello'), isNumber), Option.none())
assert.deepStrictEqual(Option.filter(Option.some(2), isNumber), Option.some(2))
```

### Since

2.0.0
