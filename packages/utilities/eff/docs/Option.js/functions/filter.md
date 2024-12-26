[**@eslint-react/eff**](../../README.md)

***

[@eslint-react/eff](../../README.md) / [./Option.js](../README.md) / filter

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

## Call Signature

> **filter**\<`A`, `B`\>(`refinement`): (`self`) => [`Option`](../type-aliases/Option.md)\<`B`\>

Filters an `Option` using a predicate. If the predicate is not satisfied or the `Option` is `None` returns `None`.

If you need to change the type of the `Option` in addition to filtering, see `filterMap`.

### Type Parameters

• **A**

• **B**

### Parameters

#### refinement

[`Refinement`](../../interfaces/Refinement.md)\<`NoInfer`\<`A`\>, `B`\>

### Returns

`Function`

#### Parameters

##### self

[`Option`](../type-aliases/Option.md)\<`A`\>

#### Returns

[`Option`](../type-aliases/Option.md)\<`B`\>

### Param

A predicate function to apply to the `Option` value.

### Param

The `Option` to filter.

### Examples

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

### Since

2.0.0

## Call Signature

> **filter**\<`A`\>(`predicate`): (`self`) => [`Option`](../type-aliases/Option.md)\<`A`\>

Filters an `Option` using a predicate. If the predicate is not satisfied or the `Option` is `None` returns `None`.

If you need to change the type of the `Option` in addition to filtering, see `filterMap`.

### Type Parameters

• **A**

### Parameters

#### predicate

[`Predicate`](../../interfaces/Predicate.md)\<`NoInfer`\<`A`\>\>

A predicate function to apply to the `Option` value.

### Returns

`Function`

#### Parameters

##### self

[`Option`](../type-aliases/Option.md)\<`A`\>

#### Returns

[`Option`](../type-aliases/Option.md)\<`A`\>

### Param

A predicate function to apply to the `Option` value.

### Param

The `Option` to filter.

### Examples

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

### Since

2.0.0

## Call Signature

> **filter**\<`A`, `B`\>(`self`, `refinement`): [`Option`](../type-aliases/Option.md)\<`B`\>

Filters an `Option` using a predicate. If the predicate is not satisfied or the `Option` is `None` returns `None`.

If you need to change the type of the `Option` in addition to filtering, see `filterMap`.

### Type Parameters

• **A**

• **B**

### Parameters

#### self

[`Option`](../type-aliases/Option.md)\<`A`\>

#### refinement

[`Refinement`](../../interfaces/Refinement.md)\<`A`, `B`\>

### Returns

[`Option`](../type-aliases/Option.md)\<`B`\>

### Param

A predicate function to apply to the `Option` value.

### Param

The `Option` to filter.

### Examples

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

### Since

2.0.0

## Call Signature

> **filter**\<`A`\>(`self`, `predicate`): [`Option`](../type-aliases/Option.md)\<`A`\>

Filters an `Option` using a predicate. If the predicate is not satisfied or the `Option` is `None` returns `None`.

If you need to change the type of the `Option` in addition to filtering, see `filterMap`.

### Type Parameters

• **A**

### Parameters

#### self

[`Option`](../type-aliases/Option.md)\<`A`\>

#### predicate

[`Predicate`](../../interfaces/Predicate.md)\<`A`\>

A predicate function to apply to the `Option` value.

### Returns

[`Option`](../type-aliases/Option.md)\<`A`\>

### Param

A predicate function to apply to the `Option` value.

### Param

The `Option` to filter.

### Examples

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

### Since

2.0.0
