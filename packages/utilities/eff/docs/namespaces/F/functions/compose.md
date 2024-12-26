[**@eslint-react/eff**](../../../README.md)

***

[@eslint-react/eff](../../../README.md) / [F](../README.md) / compose

# Function: compose()

Composes two functions, `ab` and `bc` into a single function that takes in an argument `a` of type `A` and returns a result of type `C`.
The result is obtained by first applying the `ab` function to `a` and then applying the `bc` function to the result of `ab`.

## Param

A function that maps from `A` to `B`.

## Param

A function that maps from `B` to `C`.

## Example

```ts
import { compose } from "effect/Function"

const increment = (n: number) => n + 1;
const square = (n: number) => n * n;

assert.strictEqual(compose(increment, square)(2), 9);
```

## Since

2.0.0

## Call Signature

> **compose**\<`B`, `C`\>(`bc`): \<`A`\>(`self`) => (`a`) => `C`

Composes two functions, `ab` and `bc` into a single function that takes in an argument `a` of type `A` and returns a result of type `C`.
The result is obtained by first applying the `ab` function to `a` and then applying the `bc` function to the result of `ab`.

### Type Parameters

• **B**

• **C**

### Parameters

#### bc

(`b`) => `C`

A function that maps from `B` to `C`.

### Returns

`Function`

#### Type Parameters

• **A**

#### Parameters

##### self

(`a`) => `B`

#### Returns

`Function`

##### Parameters

###### a

`A`

##### Returns

`C`

### Param

A function that maps from `A` to `B`.

### Param

A function that maps from `B` to `C`.

### Examples

```ts
import { compose } from "effect/Function"

const increment = (n: number) => n + 1;
const square = (n: number) => n * n;

assert.strictEqual(compose(increment, square)(2), 9);
```

```ts
import { compose } from "effect/Function"

const increment = (n: number) => n + 1;
const square = (n: number) => n * n;

assert.strictEqual(compose(increment, square)(2), 9);
```

### Since

2.0.0

### Since

2.0.0

## Call Signature

> **compose**\<`A`, `B`, `C`\>(`self`, `bc`): (`a`) => `C`

Composes two functions, `ab` and `bc` into a single function that takes in an argument `a` of type `A` and returns a result of type `C`.
The result is obtained by first applying the `ab` function to `a` and then applying the `bc` function to the result of `ab`.

### Type Parameters

• **A**

• **B**

• **C**

### Parameters

#### self

(`a`) => `B`

#### bc

(`b`) => `C`

A function that maps from `B` to `C`.

### Returns

`Function`

#### Parameters

##### a

`A`

#### Returns

`C`

### Param

A function that maps from `A` to `B`.

### Param

A function that maps from `B` to `C`.

### Examples

```ts
import { compose } from "effect/Function"

const increment = (n: number) => n + 1;
const square = (n: number) => n * n;

assert.strictEqual(compose(increment, square)(2), 9);
```

```ts
import { compose } from "effect/Function"

const increment = (n: number) => n + 1;
const square = (n: number) => n * n;

assert.strictEqual(compose(increment, square)(2), 9);
```

### Since

2.0.0

### Since

2.0.0
