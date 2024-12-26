[**@eslint-react/eff**](../README.md)

***

[@eslint-react/eff](../README.md) / and

# Function: and()

Combines two predicates into a new predicate that returns `true` if both of the predicates returns `true`.

## Param

A predicate.

## Param

A predicate.

## Example

```ts
import { Predicate } from "effect"

const minLength = (n: number) => (s: string) => s.length >= n
const maxLength = (n: number) => (s: string) => s.length <= n

const length = (n: number) => Predicate.and(minLength(n), maxLength(n))

assert.deepStrictEqual(length(2)("aa"), true)
assert.deepStrictEqual(length(2)("a"), false)
assert.deepStrictEqual(length(2)("aaa"), false)
```

## Since

2.0.0

## Call Signature

> **and**\<`A`, `C`\>(`that`): \<`B`\>(`self`) => [`Refinement`](../interfaces/Refinement.md)\<`A`, `B` & `C`\>

Combines two predicates into a new predicate that returns `true` if both of the predicates returns `true`.

### Type Parameters

• **A**

• **C**

### Parameters

#### that

[`Refinement`](../interfaces/Refinement.md)\<`A`, `C`\>

A predicate.

### Returns

`Function`

#### Type Parameters

• **B**

#### Parameters

##### self

[`Refinement`](../interfaces/Refinement.md)\<`A`, `B`\>

#### Returns

[`Refinement`](../interfaces/Refinement.md)\<`A`, `B` & `C`\>

### Param

A predicate.

### Param

A predicate.

### Examples

```ts
import { Predicate } from "effect"

const minLength = (n: number) => (s: string) => s.length >= n
const maxLength = (n: number) => (s: string) => s.length <= n

const length = (n: number) => Predicate.and(minLength(n), maxLength(n))

assert.deepStrictEqual(length(2)("aa"), true)
assert.deepStrictEqual(length(2)("a"), false)
assert.deepStrictEqual(length(2)("aaa"), false)
```

```ts
import { Predicate } from "effect"

const minLength = (n: number) => (s: string) => s.length >= n
const maxLength = (n: number) => (s: string) => s.length <= n

const length = (n: number) => Predicate.and(minLength(n), maxLength(n))

assert.deepStrictEqual(length(2)("aa"), true)
assert.deepStrictEqual(length(2)("a"), false)
assert.deepStrictEqual(length(2)("aaa"), false)
```

### Since

2.0.0

### Since

2.0.0

## Call Signature

> **and**\<`A`, `B`, `C`\>(`self`, `that`): [`Refinement`](../interfaces/Refinement.md)\<`A`, `B` & `C`\>

Combines two predicates into a new predicate that returns `true` if both of the predicates returns `true`.

### Type Parameters

• **A**

• **B**

• **C**

### Parameters

#### self

[`Refinement`](../interfaces/Refinement.md)\<`A`, `B`\>

A predicate.

#### that

[`Refinement`](../interfaces/Refinement.md)\<`A`, `C`\>

A predicate.

### Returns

[`Refinement`](../interfaces/Refinement.md)\<`A`, `B` & `C`\>

### Param

A predicate.

### Param

A predicate.

### Examples

```ts
import { Predicate } from "effect"

const minLength = (n: number) => (s: string) => s.length >= n
const maxLength = (n: number) => (s: string) => s.length <= n

const length = (n: number) => Predicate.and(minLength(n), maxLength(n))

assert.deepStrictEqual(length(2)("aa"), true)
assert.deepStrictEqual(length(2)("a"), false)
assert.deepStrictEqual(length(2)("aaa"), false)
```

```ts
import { Predicate } from "effect"

const minLength = (n: number) => (s: string) => s.length >= n
const maxLength = (n: number) => (s: string) => s.length <= n

const length = (n: number) => Predicate.and(minLength(n), maxLength(n))

assert.deepStrictEqual(length(2)("aa"), true)
assert.deepStrictEqual(length(2)("a"), false)
assert.deepStrictEqual(length(2)("aaa"), false)
```

### Since

2.0.0

### Since

2.0.0

## Call Signature

> **and**\<`A`\>(`that`): (`self`) => [`Predicate`](../interfaces/Predicate.md)\<`A`\>

Combines two predicates into a new predicate that returns `true` if both of the predicates returns `true`.

### Type Parameters

• **A**

### Parameters

#### that

[`Predicate`](../interfaces/Predicate.md)\<`A`\>

A predicate.

### Returns

`Function`

#### Parameters

##### self

[`Predicate`](../interfaces/Predicate.md)\<`A`\>

#### Returns

[`Predicate`](../interfaces/Predicate.md)\<`A`\>

### Param

A predicate.

### Param

A predicate.

### Examples

```ts
import { Predicate } from "effect"

const minLength = (n: number) => (s: string) => s.length >= n
const maxLength = (n: number) => (s: string) => s.length <= n

const length = (n: number) => Predicate.and(minLength(n), maxLength(n))

assert.deepStrictEqual(length(2)("aa"), true)
assert.deepStrictEqual(length(2)("a"), false)
assert.deepStrictEqual(length(2)("aaa"), false)
```

```ts
import { Predicate } from "effect"

const minLength = (n: number) => (s: string) => s.length >= n
const maxLength = (n: number) => (s: string) => s.length <= n

const length = (n: number) => Predicate.and(minLength(n), maxLength(n))

assert.deepStrictEqual(length(2)("aa"), true)
assert.deepStrictEqual(length(2)("a"), false)
assert.deepStrictEqual(length(2)("aaa"), false)
```

### Since

2.0.0

### Since

2.0.0

## Call Signature

> **and**\<`A`\>(`self`, `that`): [`Predicate`](../interfaces/Predicate.md)\<`A`\>

Combines two predicates into a new predicate that returns `true` if both of the predicates returns `true`.

### Type Parameters

• **A**

### Parameters

#### self

[`Predicate`](../interfaces/Predicate.md)\<`A`\>

A predicate.

#### that

[`Predicate`](../interfaces/Predicate.md)\<`A`\>

A predicate.

### Returns

[`Predicate`](../interfaces/Predicate.md)\<`A`\>

### Param

A predicate.

### Param

A predicate.

### Examples

```ts
import { Predicate } from "effect"

const minLength = (n: number) => (s: string) => s.length >= n
const maxLength = (n: number) => (s: string) => s.length <= n

const length = (n: number) => Predicate.and(minLength(n), maxLength(n))

assert.deepStrictEqual(length(2)("aa"), true)
assert.deepStrictEqual(length(2)("a"), false)
assert.deepStrictEqual(length(2)("aaa"), false)
```

```ts
import { Predicate } from "effect"

const minLength = (n: number) => (s: string) => s.length >= n
const maxLength = (n: number) => (s: string) => s.length <= n

const length = (n: number) => Predicate.and(minLength(n), maxLength(n))

assert.deepStrictEqual(length(2)("aa"), true)
assert.deepStrictEqual(length(2)("a"), false)
assert.deepStrictEqual(length(2)("aaa"), false)
```

### Since

2.0.0

### Since

2.0.0
