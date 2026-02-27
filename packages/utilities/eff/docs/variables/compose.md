[@eslint-react/eff](../README.md) / compose

# Variable: compose()

```ts
const compose: {
<B, C>  (bc: (b: B) => C): <A>(self: (a: A) => B) => (a: A) => C;
<A, B, C>  (self: (a: A) => B, bc: (b: B) => C): (a: A) => C;
};
```

Composes two functions, `ab` and `bc` into a single function that takes in an argument `a` of type `A` and returns a result of type `C`.
The result is obtained by first applying the `ab` function to `a` and then applying the `bc` function to the result of `ab`.

## Call Signature

```ts
<B, C>(bc: (b: B) => C): <A>(self: (a: A) => B) => (a: A) => C;
```

### Type Parameters

| Type Parameter |
| ------ |
| `B` |
| `C` |

### Parameters

| Parameter | Type |
| ------ | ------ |
| `bc` | (`b`: `B`) => `C` |

### Returns

```ts
<A>(self: (a: A) => B): (a: A) => C;
```

#### Type Parameters

| Type Parameter |
| ------ |
| `A` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `self` | (`a`: `A`) => `B` |

#### Returns

```ts
(a: A): C;
```

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `a` | `A` |

##### Returns

`C`

## Call Signature

```ts
<A, B, C>(self: (a: A) => B, bc: (b: B) => C): (a: A) => C;
```

### Type Parameters

| Type Parameter |
| ------ |
| `A` |
| `B` |
| `C` |

### Parameters

| Parameter | Type |
| ------ | ------ |
| `self` | (`a`: `A`) => `B` |
| `bc` | (`b`: `B`) => `C` |

### Returns

```ts
(a: A): C;
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `a` | `A` |

#### Returns

`C`

## Param

The first function to apply (or the composed function in data-last style).

## Param

The second function to apply.

## Returns

A composed function that applies both functions in sequence.

## Example

```ts
import * as assert from "node:assert"
import { compose } from "effect/Function"

const increment = (n: number) => n + 1;
const square = (n: number) => n * n;

assert.strictEqual(compose(increment, square)(2), 9);
```

## Since

1.0.0
