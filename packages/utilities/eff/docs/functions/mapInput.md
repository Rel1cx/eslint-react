[**@eslint-react/eff**](../README.md)

***

[@eslint-react/eff](../README.md) / mapInput

# Function: mapInput()

Given a `Predicate<A>` returns a `Predicate<B>`

## Param

the `Predicate<A>` to be transformed to `Predicate<B>`.

## Param

a function to transform `B` to `A`.

## Example

```ts
import { Predicate, Number } from "effect"

const minLength3 = Predicate.mapInput(Number.greaterThan(2), (s: string) => s.length)

assert.deepStrictEqual(minLength3("a"), false)
assert.deepStrictEqual(minLength3("aa"), false)
assert.deepStrictEqual(minLength3("aaa"), true)
assert.deepStrictEqual(minLength3("aaaa"), true)
```

## Since

2.0.0

## Call Signature

> **mapInput**\<`B`, `A`\>(`f`): (`self`) => [`Predicate`](../interfaces/Predicate.md)\<`B`\>

Given a `Predicate<A>` returns a `Predicate<B>`

### Type Parameters

• **B**

• **A**

### Parameters

#### f

(`b`) => `A`

a function to transform `B` to `A`.

### Returns

`Function`

#### Parameters

##### self

[`Predicate`](../interfaces/Predicate.md)\<`A`\>

#### Returns

[`Predicate`](../interfaces/Predicate.md)\<`B`\>

### Param

the `Predicate<A>` to be transformed to `Predicate<B>`.

### Param

a function to transform `B` to `A`.

### Examples

```ts
import { Predicate, Number } from "effect"

const minLength3 = Predicate.mapInput(Number.greaterThan(2), (s: string) => s.length)

assert.deepStrictEqual(minLength3("a"), false)
assert.deepStrictEqual(minLength3("aa"), false)
assert.deepStrictEqual(minLength3("aaa"), true)
assert.deepStrictEqual(minLength3("aaaa"), true)
```

```ts
import { Predicate, Number } from "effect"

const minLength3 = Predicate.mapInput(Number.greaterThan(2), (s: string) => s.length)

assert.deepStrictEqual(minLength3("a"), false)
assert.deepStrictEqual(minLength3("aa"), false)
assert.deepStrictEqual(minLength3("aaa"), true)
assert.deepStrictEqual(minLength3("aaaa"), true)
```

### Since

2.0.0

### Since

2.0.0

## Call Signature

> **mapInput**\<`A`, `B`\>(`self`, `f`): [`Predicate`](../interfaces/Predicate.md)\<`B`\>

Given a `Predicate<A>` returns a `Predicate<B>`

### Type Parameters

• **A**

• **B**

### Parameters

#### self

[`Predicate`](../interfaces/Predicate.md)\<`A`\>

the `Predicate<A>` to be transformed to `Predicate<B>`.

#### f

(`b`) => `A`

a function to transform `B` to `A`.

### Returns

[`Predicate`](../interfaces/Predicate.md)\<`B`\>

### Param

the `Predicate<A>` to be transformed to `Predicate<B>`.

### Param

a function to transform `B` to `A`.

### Examples

```ts
import { Predicate, Number } from "effect"

const minLength3 = Predicate.mapInput(Number.greaterThan(2), (s: string) => s.length)

assert.deepStrictEqual(minLength3("a"), false)
assert.deepStrictEqual(minLength3("aa"), false)
assert.deepStrictEqual(minLength3("aaa"), true)
assert.deepStrictEqual(minLength3("aaaa"), true)
```

```ts
import { Predicate, Number } from "effect"

const minLength3 = Predicate.mapInput(Number.greaterThan(2), (s: string) => s.length)

assert.deepStrictEqual(minLength3("a"), false)
assert.deepStrictEqual(minLength3("aa"), false)
assert.deepStrictEqual(minLength3("aaa"), true)
assert.deepStrictEqual(minLength3("aaaa"), true)
```

### Since

2.0.0

### Since

2.0.0
