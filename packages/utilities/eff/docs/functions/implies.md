[**@eslint-react/eff**](../README.md)

***

[@eslint-react/eff](../README.md) / implies

# Function: implies()

Represents the logical implication combinator for predicates. In formal
logic, the implication operator `->` denotes that if the first proposition
(antecedent) is true, then the second proposition (consequent) must also be
true. In simpler terms, `p implies q` can be interpreted as "if p then q". If
the first predicate holds, then the second predicate must hold
for the given context.

In practical terms within TypeScript, `p implies q` is equivalent to `!p || (p && q)`.

Note that if the antecedent is `false`, the result is `true` by default
because the outcome of the consequent cannot be determined.

This function is useful in situations where you need to enforce rules or
constraints that are contingent on certain conditions.
It proves especially helpful in defining property tests.

The example below illustrates the transitive property of order using the
`implies` function. In simple terms, if `a <= b` and `b <= c`, then `a <= c`
must be true.

## Example

```ts
import { Predicate } from "effect"

type Triple = {
  readonly a: number
  readonly b: number
  readonly c: number
}

const transitivity = Predicate.implies(
  // antecedent
  (input: Triple) => input.a <= input.b && input.b <= input.c,
  // consequent
  (input: Triple) => input.a <= input.c
)

assert.equal(transitivity({ a: 1, b: 2, c: 3 }), true)
// antecedent is `false`, so the result is `true`
assert.equal(transitivity({ a: 1, b: 0, c: 0 }), true)
```

## Since

2.0.0

## Call Signature

> **implies**\<`A`\>(`consequent`): (`antecedent`) => [`Predicate`](../interfaces/Predicate.md)\<`A`\>

Represents the logical implication combinator for predicates. In formal
logic, the implication operator `->` denotes that if the first proposition
(antecedent) is true, then the second proposition (consequent) must also be
true. In simpler terms, `p implies q` can be interpreted as "if p then q". If
the first predicate holds, then the second predicate must hold
for the given context.

In practical terms within TypeScript, `p implies q` is equivalent to `!p || (p && q)`.

Note that if the antecedent is `false`, the result is `true` by default
because the outcome of the consequent cannot be determined.

This function is useful in situations where you need to enforce rules or
constraints that are contingent on certain conditions.
It proves especially helpful in defining property tests.

The example below illustrates the transitive property of order using the
`implies` function. In simple terms, if `a <= b` and `b <= c`, then `a <= c`
must be true.

### Type Parameters

• **A**

### Parameters

#### consequent

[`Predicate`](../interfaces/Predicate.md)\<`A`\>

### Returns

`Function`

#### Parameters

##### antecedent

[`Predicate`](../interfaces/Predicate.md)\<`A`\>

#### Returns

[`Predicate`](../interfaces/Predicate.md)\<`A`\>

### Examples

```ts
import { Predicate } from "effect"

type Triple = {
  readonly a: number
  readonly b: number
  readonly c: number
}

const transitivity = Predicate.implies(
  // antecedent
  (input: Triple) => input.a <= input.b && input.b <= input.c,
  // consequent
  (input: Triple) => input.a <= input.c
)

assert.equal(transitivity({ a: 1, b: 2, c: 3 }), true)
// antecedent is `false`, so the result is `true`
assert.equal(transitivity({ a: 1, b: 0, c: 0 }), true)
```

```ts
import { Predicate } from "effect"

type Triple = {
  readonly a: number
  readonly b: number
  readonly c: number
}

const transitivity = Predicate.implies(
  // antecedent
  (input: Triple) => input.a <= input.b && input.b <= input.c,
  // consequent
  (input: Triple) => input.a <= input.c
)

assert.equal(transitivity({ a: 1, b: 2, c: 3 }), true)
// antecedent is `false`, so the result is `true`
assert.equal(transitivity({ a: 1, b: 0, c: 0 }), true)
```

### Since

2.0.0

### Since

2.0.0

## Call Signature

> **implies**\<`A`\>(`antecedent`, `consequent`): [`Predicate`](../interfaces/Predicate.md)\<`A`\>

Represents the logical implication combinator for predicates. In formal
logic, the implication operator `->` denotes that if the first proposition
(antecedent) is true, then the second proposition (consequent) must also be
true. In simpler terms, `p implies q` can be interpreted as "if p then q". If
the first predicate holds, then the second predicate must hold
for the given context.

In practical terms within TypeScript, `p implies q` is equivalent to `!p || (p && q)`.

Note that if the antecedent is `false`, the result is `true` by default
because the outcome of the consequent cannot be determined.

This function is useful in situations where you need to enforce rules or
constraints that are contingent on certain conditions.
It proves especially helpful in defining property tests.

The example below illustrates the transitive property of order using the
`implies` function. In simple terms, if `a <= b` and `b <= c`, then `a <= c`
must be true.

### Type Parameters

• **A**

### Parameters

#### antecedent

[`Predicate`](../interfaces/Predicate.md)\<`A`\>

#### consequent

[`Predicate`](../interfaces/Predicate.md)\<`A`\>

### Returns

[`Predicate`](../interfaces/Predicate.md)\<`A`\>

### Examples

```ts
import { Predicate } from "effect"

type Triple = {
  readonly a: number
  readonly b: number
  readonly c: number
}

const transitivity = Predicate.implies(
  // antecedent
  (input: Triple) => input.a <= input.b && input.b <= input.c,
  // consequent
  (input: Triple) => input.a <= input.c
)

assert.equal(transitivity({ a: 1, b: 2, c: 3 }), true)
// antecedent is `false`, so the result is `true`
assert.equal(transitivity({ a: 1, b: 0, c: 0 }), true)
```

```ts
import { Predicate } from "effect"

type Triple = {
  readonly a: number
  readonly b: number
  readonly c: number
}

const transitivity = Predicate.implies(
  // antecedent
  (input: Triple) => input.a <= input.b && input.b <= input.c,
  // consequent
  (input: Triple) => input.a <= input.c
)

assert.equal(transitivity({ a: 1, b: 2, c: 3 }), true)
// antecedent is `false`, so the result is `true`
assert.equal(transitivity({ a: 1, b: 0, c: 0 }), true)
```

### Since

2.0.0

### Since

2.0.0
