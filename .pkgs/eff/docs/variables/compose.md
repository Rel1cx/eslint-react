[@local/eff](../README.md) / compose

# Variable: compose

```ts
const compose: {
  <B, C>(bc: (b: B) => C): <A>(self: (a: A) => B) => (a: A) => C;
  <A, B, C>(self: (a: A) => B, bc: (b: B) => C): (a: A) => C;
};
```

Composes two functions, `ab` and `bc` into a single function that takes in an argument `a` of type `A` and returns a result of type `C`.
The result is obtained by first applying the `ab` function to `a` and then applying the `bc` function to the result of `ab`.

**When to use**

Use to compose exactly two unary functions into a reusable unary function.

**Example** (Composing two functions)

```ts
import { Function } from "effect";
import * as assert from "node:assert";

const increment = (n: number) => n + 1;
const square = (n: number) => n * n;

assert.strictEqual(Function.compose(increment, square)(2), 9);
```

## Call Signature

```ts
<B, C>(bc: (b: B) => C): <A>(self: (a: A) => B) => (a: A) => C;
```

### Type Parameters

| Type Parameter |
| -------------- |
| `B`            |
| `C`            |

### Parameters

| Parameter | Type              |
| --------- | ----------------- |
| `bc`      | (`b`: `B`) => `C` |

### Returns

\<`A`\>(`self`: (`a`: `A`) => `B`) => (`a`: `A`) => `C`

## Call Signature

```ts
<A, B, C>(self: (a: A) => B, bc: (b: B) => C): (a: A) => C;
```

### Type Parameters

| Type Parameter |
| -------------- |
| `A`            |
| `B`            |
| `C`            |

### Parameters

| Parameter | Type              |
| --------- | ----------------- |
| `self`    | (`a`: `A`) => `B` |
| `bc`      | (`b`: `B`) => `C` |

### Returns

(`a`: `A`) => `C`

## See

- [flow](../functions/flow.md) for composing a left-to-right sequence of functions
- [pipe](../functions/pipe.md) for applying a value through a left-to-right sequence immediately

## Since

2.0.0
