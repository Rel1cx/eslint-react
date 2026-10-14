[@local/eff](../README.md) / pipe

# Function: pipe()

## Call Signature

```ts
function pipe<A>(a: A): A;
```

Pipes the value of an expression through a left-to-right sequence of
functions.

**When to use**

Use when you need to compose data-last functions into readable
transformation pipelines instead of method-style chains.

**Details**

Takes an initial value, passes it to the first function, then passes each
result to the next function in order. The final function result is returned.

**Gotchas**

Each function passed after the initial value must accept a single argument,
because `pipe` calls each step with only the previous result.

**Example** (Piping values through functions)

In this example, `1` is passed to the first function, and each result becomes
the input for the next function.

```ts
import { pipe } from "effect";

pipe(
  1,
  (n) => n + 1,
  (n) => n * 2,
  (n) => `result: ${n}`,
); // => "result: 4"
```

**Example** (Rewriting method chains with pipe)

The same transformation can be written with data-last functions.

```ts
import { Array, pipe } from "effect";

const numbers = [1, 2, 3, 4];
const double = (n: number) => n * 2;
const greaterThanFour = (n: number) => n > 4;

pipe(
  numbers,
  Array.map(double),
  Array.filter(greaterThanFour),
); // => [6, 8]
```

### Type Parameters

| Type Parameter                    |
| --------------------------------- |
| <a id="type-parameter-a"></a> `A` |

### Parameters

| Parameter | Type |
| --------- | ---- |
| `a`       | `A`  |

### Returns

`A`

### Since

2.0.0

## Call Signature

```ts
function pipe<A, B = never>(a: A, ab: (a: A) => B): B;
```

Pipes the value of an expression through a left-to-right sequence of
functions.

**When to use**

Use when you need to compose data-last functions into readable
transformation pipelines instead of method-style chains.

**Details**

Takes an initial value, passes it to the first function, then passes each
result to the next function in order. The final function result is returned.

**Gotchas**

Each function passed after the initial value must accept a single argument,
because `pipe` calls each step with only the previous result.

**Example** (Piping values through functions)

In this example, `1` is passed to the first function, and each result becomes
the input for the next function.

```ts
import { pipe } from "effect";

pipe(
  1,
  (n) => n + 1,
  (n) => n * 2,
  (n) => `result: ${n}`,
); // => "result: 4"
```

**Example** (Rewriting method chains with pipe)

The same transformation can be written with data-last functions.

```ts
import { Array, pipe } from "effect";

const numbers = [1, 2, 3, 4];
const double = (n: number) => n * 2;
const greaterThanFour = (n: number) => n > 4;

pipe(
  numbers,
  Array.map(double),
  Array.filter(greaterThanFour),
); // => [6, 8]
```

### Type Parameters

| Type Parameter                      | Default type |
| ----------------------------------- | ------------ |
| <a id="type-parameter-a-1"></a> `A` | -            |
| <a id="type-parameter-b"></a> `B`   | `never`      |

### Parameters

| Parameter | Type              |
| --------- | ----------------- |
| `a`       | `A`               |
| `ab`      | (`a`: `A`) => `B` |

### Returns

`B`

### Since

2.0.0

## Call Signature

```ts
function pipe<A, B = never, C = never>(a: A, ab: (a: A) => B, bc: (b: B) => C): C;
```

Pipes the value of an expression through a left-to-right sequence of
functions.

**When to use**

Use when you need to compose data-last functions into readable
transformation pipelines instead of method-style chains.

**Details**

Takes an initial value, passes it to the first function, then passes each
result to the next function in order. The final function result is returned.

**Gotchas**

Each function passed after the initial value must accept a single argument,
because `pipe` calls each step with only the previous result.

**Example** (Piping values through functions)

In this example, `1` is passed to the first function, and each result becomes
the input for the next function.

```ts
import { pipe } from "effect";

pipe(
  1,
  (n) => n + 1,
  (n) => n * 2,
  (n) => `result: ${n}`,
); // => "result: 4"
```

**Example** (Rewriting method chains with pipe)

The same transformation can be written with data-last functions.

```ts
import { Array, pipe } from "effect";

const numbers = [1, 2, 3, 4];
const double = (n: number) => n * 2;
const greaterThanFour = (n: number) => n > 4;

pipe(
  numbers,
  Array.map(double),
  Array.filter(greaterThanFour),
); // => [6, 8]
```

### Type Parameters

| Type Parameter                      | Default type |
| ----------------------------------- | ------------ |
| <a id="type-parameter-a-2"></a> `A` | -            |
| <a id="type-parameter-b-1"></a> `B` | `never`      |
| <a id="type-parameter-c"></a> `C`   | `never`      |

### Parameters

| Parameter | Type              |
| --------- | ----------------- |
| `a`       | `A`               |
| `ab`      | (`a`: `A`) => `B` |
| `bc`      | (`b`: `B`) => `C` |

### Returns

`C`

### Since

2.0.0

## Call Signature

```ts
function pipe<A, B = never, C = never, D = never>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D): D;
```

Pipes the value of an expression through a left-to-right sequence of
functions.

**When to use**

Use when you need to compose data-last functions into readable
transformation pipelines instead of method-style chains.

**Details**

Takes an initial value, passes it to the first function, then passes each
result to the next function in order. The final function result is returned.

**Gotchas**

Each function passed after the initial value must accept a single argument,
because `pipe` calls each step with only the previous result.

**Example** (Piping values through functions)

In this example, `1` is passed to the first function, and each result becomes
the input for the next function.

```ts
import { pipe } from "effect";

pipe(
  1,
  (n) => n + 1,
  (n) => n * 2,
  (n) => `result: ${n}`,
); // => "result: 4"
```

**Example** (Rewriting method chains with pipe)

The same transformation can be written with data-last functions.

```ts
import { Array, pipe } from "effect";

const numbers = [1, 2, 3, 4];
const double = (n: number) => n * 2;
const greaterThanFour = (n: number) => n > 4;

pipe(
  numbers,
  Array.map(double),
  Array.filter(greaterThanFour),
); // => [6, 8]
```

### Type Parameters

| Type Parameter                      | Default type |
| ----------------------------------- | ------------ |
| <a id="type-parameter-a-3"></a> `A` | -            |
| <a id="type-parameter-b-2"></a> `B` | `never`      |
| <a id="type-parameter-c-1"></a> `C` | `never`      |
| <a id="type-parameter-d"></a> `D`   | `never`      |

### Parameters

| Parameter | Type              |
| --------- | ----------------- |
| `a`       | `A`               |
| `ab`      | (`a`: `A`) => `B` |
| `bc`      | (`b`: `B`) => `C` |
| `cd`      | (`c`: `C`) => `D` |

### Returns

`D`

### Since

2.0.0

## Call Signature

```ts
function pipe<A, B = never, C = never, D = never, E = never>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E): E;
```

Pipes the value of an expression through a left-to-right sequence of
functions.

**When to use**

Use when you need to compose data-last functions into readable
transformation pipelines instead of method-style chains.

**Details**

Takes an initial value, passes it to the first function, then passes each
result to the next function in order. The final function result is returned.

**Gotchas**

Each function passed after the initial value must accept a single argument,
because `pipe` calls each step with only the previous result.

**Example** (Piping values through functions)

In this example, `1` is passed to the first function, and each result becomes
the input for the next function.

```ts
import { pipe } from "effect";

pipe(
  1,
  (n) => n + 1,
  (n) => n * 2,
  (n) => `result: ${n}`,
); // => "result: 4"
```

**Example** (Rewriting method chains with pipe)

The same transformation can be written with data-last functions.

```ts
import { Array, pipe } from "effect";

const numbers = [1, 2, 3, 4];
const double = (n: number) => n * 2;
const greaterThanFour = (n: number) => n > 4;

pipe(
  numbers,
  Array.map(double),
  Array.filter(greaterThanFour),
); // => [6, 8]
```

### Type Parameters

| Type Parameter                      | Default type |
| ----------------------------------- | ------------ |
| <a id="type-parameter-a-4"></a> `A` | -            |
| <a id="type-parameter-b-3"></a> `B` | `never`      |
| <a id="type-parameter-c-2"></a> `C` | `never`      |
| <a id="type-parameter-d-1"></a> `D` | `never`      |
| <a id="type-parameter-e"></a> `E`   | `never`      |

### Parameters

| Parameter | Type              |
| --------- | ----------------- |
| `a`       | `A`               |
| `ab`      | (`a`: `A`) => `B` |
| `bc`      | (`b`: `B`) => `C` |
| `cd`      | (`c`: `C`) => `D` |
| `de`      | (`d`: `D`) => `E` |

### Returns

`E`

### Since

2.0.0

## Call Signature

```ts
function pipe<A, B = never, C = never, D = never, E = never, F = never>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
): F;
```

Pipes the value of an expression through a left-to-right sequence of
functions.

**When to use**

Use when you need to compose data-last functions into readable
transformation pipelines instead of method-style chains.

**Details**

Takes an initial value, passes it to the first function, then passes each
result to the next function in order. The final function result is returned.

**Gotchas**

Each function passed after the initial value must accept a single argument,
because `pipe` calls each step with only the previous result.

**Example** (Piping values through functions)

In this example, `1` is passed to the first function, and each result becomes
the input for the next function.

```ts
import { pipe } from "effect";

pipe(
  1,
  (n) => n + 1,
  (n) => n * 2,
  (n) => `result: ${n}`,
); // => "result: 4"
```

**Example** (Rewriting method chains with pipe)

The same transformation can be written with data-last functions.

```ts
import { Array, pipe } from "effect";

const numbers = [1, 2, 3, 4];
const double = (n: number) => n * 2;
const greaterThanFour = (n: number) => n > 4;

pipe(
  numbers,
  Array.map(double),
  Array.filter(greaterThanFour),
); // => [6, 8]
```

### Type Parameters

| Type Parameter                      | Default type |
| ----------------------------------- | ------------ |
| <a id="type-parameter-a-5"></a> `A` | -            |
| <a id="type-parameter-b-4"></a> `B` | `never`      |
| <a id="type-parameter-c-3"></a> `C` | `never`      |
| <a id="type-parameter-d-2"></a> `D` | `never`      |
| <a id="type-parameter-e-1"></a> `E` | `never`      |
| <a id="type-parameter-f"></a> `F`   | `never`      |

### Parameters

| Parameter | Type              |
| --------- | ----------------- |
| `a`       | `A`               |
| `ab`      | (`a`: `A`) => `B` |
| `bc`      | (`b`: `B`) => `C` |
| `cd`      | (`c`: `C`) => `D` |
| `de`      | (`d`: `D`) => `E` |
| `ef`      | (`e`: `E`) => `F` |

### Returns

`F`

### Since

2.0.0

## Call Signature

```ts
function pipe<A, B = never, C = never, D = never, E = never, F = never, G = never>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
): G;
```

Pipes the value of an expression through a left-to-right sequence of
functions.

**When to use**

Use when you need to compose data-last functions into readable
transformation pipelines instead of method-style chains.

**Details**

Takes an initial value, passes it to the first function, then passes each
result to the next function in order. The final function result is returned.

**Gotchas**

Each function passed after the initial value must accept a single argument,
because `pipe` calls each step with only the previous result.

**Example** (Piping values through functions)

In this example, `1` is passed to the first function, and each result becomes
the input for the next function.

```ts
import { pipe } from "effect";

pipe(
  1,
  (n) => n + 1,
  (n) => n * 2,
  (n) => `result: ${n}`,
); // => "result: 4"
```

**Example** (Rewriting method chains with pipe)

The same transformation can be written with data-last functions.

```ts
import { Array, pipe } from "effect";

const numbers = [1, 2, 3, 4];
const double = (n: number) => n * 2;
const greaterThanFour = (n: number) => n > 4;

pipe(
  numbers,
  Array.map(double),
  Array.filter(greaterThanFour),
); // => [6, 8]
```

### Type Parameters

| Type Parameter                      | Default type |
| ----------------------------------- | ------------ |
| <a id="type-parameter-a-6"></a> `A` | -            |
| <a id="type-parameter-b-5"></a> `B` | `never`      |
| <a id="type-parameter-c-4"></a> `C` | `never`      |
| <a id="type-parameter-d-3"></a> `D` | `never`      |
| <a id="type-parameter-e-2"></a> `E` | `never`      |
| <a id="type-parameter-f-1"></a> `F` | `never`      |
| <a id="type-parameter-g"></a> `G`   | `never`      |

### Parameters

| Parameter | Type              |
| --------- | ----------------- |
| `a`       | `A`               |
| `ab`      | (`a`: `A`) => `B` |
| `bc`      | (`b`: `B`) => `C` |
| `cd`      | (`c`: `C`) => `D` |
| `de`      | (`d`: `D`) => `E` |
| `ef`      | (`e`: `E`) => `F` |
| `fg`      | (`f`: `F`) => `G` |

### Returns

`G`

### Since

2.0.0

## Call Signature

```ts
function pipe<A, B = never, C = never, D = never, E = never, F = never, G = never, H = never>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
): H;
```

Pipes the value of an expression through a left-to-right sequence of
functions.

**When to use**

Use when you need to compose data-last functions into readable
transformation pipelines instead of method-style chains.

**Details**

Takes an initial value, passes it to the first function, then passes each
result to the next function in order. The final function result is returned.

**Gotchas**

Each function passed after the initial value must accept a single argument,
because `pipe` calls each step with only the previous result.

**Example** (Piping values through functions)

In this example, `1` is passed to the first function, and each result becomes
the input for the next function.

```ts
import { pipe } from "effect";

pipe(
  1,
  (n) => n + 1,
  (n) => n * 2,
  (n) => `result: ${n}`,
); // => "result: 4"
```

**Example** (Rewriting method chains with pipe)

The same transformation can be written with data-last functions.

```ts
import { Array, pipe } from "effect";

const numbers = [1, 2, 3, 4];
const double = (n: number) => n * 2;
const greaterThanFour = (n: number) => n > 4;

pipe(
  numbers,
  Array.map(double),
  Array.filter(greaterThanFour),
); // => [6, 8]
```

### Type Parameters

| Type Parameter                      | Default type |
| ----------------------------------- | ------------ |
| <a id="type-parameter-a-7"></a> `A` | -            |
| <a id="type-parameter-b-6"></a> `B` | `never`      |
| <a id="type-parameter-c-5"></a> `C` | `never`      |
| <a id="type-parameter-d-4"></a> `D` | `never`      |
| <a id="type-parameter-e-3"></a> `E` | `never`      |
| <a id="type-parameter-f-2"></a> `F` | `never`      |
| <a id="type-parameter-g-1"></a> `G` | `never`      |
| <a id="type-parameter-h"></a> `H`   | `never`      |

### Parameters

| Parameter | Type              |
| --------- | ----------------- |
| `a`       | `A`               |
| `ab`      | (`a`: `A`) => `B` |
| `bc`      | (`b`: `B`) => `C` |
| `cd`      | (`c`: `C`) => `D` |
| `de`      | (`d`: `D`) => `E` |
| `ef`      | (`e`: `E`) => `F` |
| `fg`      | (`f`: `F`) => `G` |
| `gh`      | (`g`: `G`) => `H` |

### Returns

`H`

### Since

2.0.0

## Call Signature

```ts
function pipe<A, B = never, C = never, D = never, E = never, F = never, G = never, H = never, I = never>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
): I;
```

Pipes the value of an expression through a left-to-right sequence of
functions.

**When to use**

Use when you need to compose data-last functions into readable
transformation pipelines instead of method-style chains.

**Details**

Takes an initial value, passes it to the first function, then passes each
result to the next function in order. The final function result is returned.

**Gotchas**

Each function passed after the initial value must accept a single argument,
because `pipe` calls each step with only the previous result.

**Example** (Piping values through functions)

In this example, `1` is passed to the first function, and each result becomes
the input for the next function.

```ts
import { pipe } from "effect";

pipe(
  1,
  (n) => n + 1,
  (n) => n * 2,
  (n) => `result: ${n}`,
); // => "result: 4"
```

**Example** (Rewriting method chains with pipe)

The same transformation can be written with data-last functions.

```ts
import { Array, pipe } from "effect";

const numbers = [1, 2, 3, 4];
const double = (n: number) => n * 2;
const greaterThanFour = (n: number) => n > 4;

pipe(
  numbers,
  Array.map(double),
  Array.filter(greaterThanFour),
); // => [6, 8]
```

### Type Parameters

| Type Parameter                      | Default type |
| ----------------------------------- | ------------ |
| <a id="type-parameter-a-8"></a> `A` | -            |
| <a id="type-parameter-b-7"></a> `B` | `never`      |
| <a id="type-parameter-c-6"></a> `C` | `never`      |
| <a id="type-parameter-d-5"></a> `D` | `never`      |
| <a id="type-parameter-e-4"></a> `E` | `never`      |
| <a id="type-parameter-f-3"></a> `F` | `never`      |
| <a id="type-parameter-g-2"></a> `G` | `never`      |
| <a id="type-parameter-h-1"></a> `H` | `never`      |
| <a id="type-parameter-i"></a> `I`   | `never`      |

### Parameters

| Parameter | Type              |
| --------- | ----------------- |
| `a`       | `A`               |
| `ab`      | (`a`: `A`) => `B` |
| `bc`      | (`b`: `B`) => `C` |
| `cd`      | (`c`: `C`) => `D` |
| `de`      | (`d`: `D`) => `E` |
| `ef`      | (`e`: `E`) => `F` |
| `fg`      | (`f`: `F`) => `G` |
| `gh`      | (`g`: `G`) => `H` |
| `hi`      | (`h`: `H`) => `I` |

### Returns

`I`

### Since

2.0.0

## Call Signature

```ts
function pipe<A, B = never, C = never, D = never, E = never, F = never, G = never, H = never, I = never, J = never>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
): J;
```

Pipes the value of an expression through a left-to-right sequence of
functions.

**When to use**

Use when you need to compose data-last functions into readable
transformation pipelines instead of method-style chains.

**Details**

Takes an initial value, passes it to the first function, then passes each
result to the next function in order. The final function result is returned.

**Gotchas**

Each function passed after the initial value must accept a single argument,
because `pipe` calls each step with only the previous result.

**Example** (Piping values through functions)

In this example, `1` is passed to the first function, and each result becomes
the input for the next function.

```ts
import { pipe } from "effect";

pipe(
  1,
  (n) => n + 1,
  (n) => n * 2,
  (n) => `result: ${n}`,
); // => "result: 4"
```

**Example** (Rewriting method chains with pipe)

The same transformation can be written with data-last functions.

```ts
import { Array, pipe } from "effect";

const numbers = [1, 2, 3, 4];
const double = (n: number) => n * 2;
const greaterThanFour = (n: number) => n > 4;

pipe(
  numbers,
  Array.map(double),
  Array.filter(greaterThanFour),
); // => [6, 8]
```

### Type Parameters

| Type Parameter                      | Default type |
| ----------------------------------- | ------------ |
| <a id="type-parameter-a-9"></a> `A` | -            |
| <a id="type-parameter-b-8"></a> `B` | `never`      |
| <a id="type-parameter-c-7"></a> `C` | `never`      |
| <a id="type-parameter-d-6"></a> `D` | `never`      |
| <a id="type-parameter-e-5"></a> `E` | `never`      |
| <a id="type-parameter-f-4"></a> `F` | `never`      |
| <a id="type-parameter-g-3"></a> `G` | `never`      |
| <a id="type-parameter-h-2"></a> `H` | `never`      |
| <a id="type-parameter-i-1"></a> `I` | `never`      |
| <a id="type-parameter-j"></a> `J`   | `never`      |

### Parameters

| Parameter | Type              |
| --------- | ----------------- |
| `a`       | `A`               |
| `ab`      | (`a`: `A`) => `B` |
| `bc`      | (`b`: `B`) => `C` |
| `cd`      | (`c`: `C`) => `D` |
| `de`      | (`d`: `D`) => `E` |
| `ef`      | (`e`: `E`) => `F` |
| `fg`      | (`f`: `F`) => `G` |
| `gh`      | (`g`: `G`) => `H` |
| `hi`      | (`h`: `H`) => `I` |
| `ij`      | (`i`: `I`) => `J` |

### Returns

`J`

### Since

2.0.0

## Call Signature

```ts
function pipe<A, B = never, C = never, D = never, E = never, F = never, G = never, H = never, I = never, J = never, K = never>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K,
): K;
```

Pipes the value of an expression through a left-to-right sequence of
functions.

**When to use**

Use when you need to compose data-last functions into readable
transformation pipelines instead of method-style chains.

**Details**

Takes an initial value, passes it to the first function, then passes each
result to the next function in order. The final function result is returned.

**Gotchas**

Each function passed after the initial value must accept a single argument,
because `pipe` calls each step with only the previous result.

**Example** (Piping values through functions)

In this example, `1` is passed to the first function, and each result becomes
the input for the next function.

```ts
import { pipe } from "effect";

pipe(
  1,
  (n) => n + 1,
  (n) => n * 2,
  (n) => `result: ${n}`,
); // => "result: 4"
```

**Example** (Rewriting method chains with pipe)

The same transformation can be written with data-last functions.

```ts
import { Array, pipe } from "effect";

const numbers = [1, 2, 3, 4];
const double = (n: number) => n * 2;
const greaterThanFour = (n: number) => n > 4;

pipe(
  numbers,
  Array.map(double),
  Array.filter(greaterThanFour),
); // => [6, 8]
```

### Type Parameters

| Type Parameter                       | Default type |
| ------------------------------------ | ------------ |
| <a id="type-parameter-a-10"></a> `A` | -            |
| <a id="type-parameter-b-9"></a> `B`  | `never`      |
| <a id="type-parameter-c-8"></a> `C`  | `never`      |
| <a id="type-parameter-d-7"></a> `D`  | `never`      |
| <a id="type-parameter-e-6"></a> `E`  | `never`      |
| <a id="type-parameter-f-5"></a> `F`  | `never`      |
| <a id="type-parameter-g-4"></a> `G`  | `never`      |
| <a id="type-parameter-h-3"></a> `H`  | `never`      |
| <a id="type-parameter-i-2"></a> `I`  | `never`      |
| <a id="type-parameter-j-1"></a> `J`  | `never`      |
| <a id="type-parameter-k"></a> `K`    | `never`      |

### Parameters

| Parameter | Type              |
| --------- | ----------------- |
| `a`       | `A`               |
| `ab`      | (`a`: `A`) => `B` |
| `bc`      | (`b`: `B`) => `C` |
| `cd`      | (`c`: `C`) => `D` |
| `de`      | (`d`: `D`) => `E` |
| `ef`      | (`e`: `E`) => `F` |
| `fg`      | (`f`: `F`) => `G` |
| `gh`      | (`g`: `G`) => `H` |
| `hi`      | (`h`: `H`) => `I` |
| `ij`      | (`i`: `I`) => `J` |
| `jk`      | (`j`: `J`) => `K` |

### Returns

`K`

### Since

2.0.0

## Call Signature

```ts
function pipe<A, B = never, C = never, D = never, E = never, F = never, G = never, H = never, I = never, J = never, K = never, L = never>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K,
  kl: (k: K) => L,
): L;
```

Pipes the value of an expression through a left-to-right sequence of
functions.

**When to use**

Use when you need to compose data-last functions into readable
transformation pipelines instead of method-style chains.

**Details**

Takes an initial value, passes it to the first function, then passes each
result to the next function in order. The final function result is returned.

**Gotchas**

Each function passed after the initial value must accept a single argument,
because `pipe` calls each step with only the previous result.

**Example** (Piping values through functions)

In this example, `1` is passed to the first function, and each result becomes
the input for the next function.

```ts
import { pipe } from "effect";

pipe(
  1,
  (n) => n + 1,
  (n) => n * 2,
  (n) => `result: ${n}`,
); // => "result: 4"
```

**Example** (Rewriting method chains with pipe)

The same transformation can be written with data-last functions.

```ts
import { Array, pipe } from "effect";

const numbers = [1, 2, 3, 4];
const double = (n: number) => n * 2;
const greaterThanFour = (n: number) => n > 4;

pipe(
  numbers,
  Array.map(double),
  Array.filter(greaterThanFour),
); // => [6, 8]
```

### Type Parameters

| Type Parameter                       | Default type |
| ------------------------------------ | ------------ |
| <a id="type-parameter-a-11"></a> `A` | -            |
| <a id="type-parameter-b-10"></a> `B` | `never`      |
| <a id="type-parameter-c-9"></a> `C`  | `never`      |
| <a id="type-parameter-d-8"></a> `D`  | `never`      |
| <a id="type-parameter-e-7"></a> `E`  | `never`      |
| <a id="type-parameter-f-6"></a> `F`  | `never`      |
| <a id="type-parameter-g-5"></a> `G`  | `never`      |
| <a id="type-parameter-h-4"></a> `H`  | `never`      |
| <a id="type-parameter-i-3"></a> `I`  | `never`      |
| <a id="type-parameter-j-2"></a> `J`  | `never`      |
| <a id="type-parameter-k-1"></a> `K`  | `never`      |
| <a id="type-parameter-l"></a> `L`    | `never`      |

### Parameters

| Parameter | Type              |
| --------- | ----------------- |
| `a`       | `A`               |
| `ab`      | (`a`: `A`) => `B` |
| `bc`      | (`b`: `B`) => `C` |
| `cd`      | (`c`: `C`) => `D` |
| `de`      | (`d`: `D`) => `E` |
| `ef`      | (`e`: `E`) => `F` |
| `fg`      | (`f`: `F`) => `G` |
| `gh`      | (`g`: `G`) => `H` |
| `hi`      | (`h`: `H`) => `I` |
| `ij`      | (`i`: `I`) => `J` |
| `jk`      | (`j`: `J`) => `K` |
| `kl`      | (`k`: `K`) => `L` |

### Returns

`L`

### Since

2.0.0

## Call Signature

```ts
function pipe<A, B = never, C = never, D = never, E = never, F = never, G = never, H = never, I = never, J = never, K = never, L = never, M = never>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K,
  kl: (k: K) => L,
  lm: (l: L) => M,
): M;
```

Pipes the value of an expression through a left-to-right sequence of
functions.

**When to use**

Use when you need to compose data-last functions into readable
transformation pipelines instead of method-style chains.

**Details**

Takes an initial value, passes it to the first function, then passes each
result to the next function in order. The final function result is returned.

**Gotchas**

Each function passed after the initial value must accept a single argument,
because `pipe` calls each step with only the previous result.

**Example** (Piping values through functions)

In this example, `1` is passed to the first function, and each result becomes
the input for the next function.

```ts
import { pipe } from "effect";

pipe(
  1,
  (n) => n + 1,
  (n) => n * 2,
  (n) => `result: ${n}`,
); // => "result: 4"
```

**Example** (Rewriting method chains with pipe)

The same transformation can be written with data-last functions.

```ts
import { Array, pipe } from "effect";

const numbers = [1, 2, 3, 4];
const double = (n: number) => n * 2;
const greaterThanFour = (n: number) => n > 4;

pipe(
  numbers,
  Array.map(double),
  Array.filter(greaterThanFour),
); // => [6, 8]
```

### Type Parameters

| Type Parameter                       | Default type |
| ------------------------------------ | ------------ |
| <a id="type-parameter-a-12"></a> `A` | -            |
| <a id="type-parameter-b-11"></a> `B` | `never`      |
| <a id="type-parameter-c-10"></a> `C` | `never`      |
| <a id="type-parameter-d-9"></a> `D`  | `never`      |
| <a id="type-parameter-e-8"></a> `E`  | `never`      |
| <a id="type-parameter-f-7"></a> `F`  | `never`      |
| <a id="type-parameter-g-6"></a> `G`  | `never`      |
| <a id="type-parameter-h-5"></a> `H`  | `never`      |
| <a id="type-parameter-i-4"></a> `I`  | `never`      |
| <a id="type-parameter-j-3"></a> `J`  | `never`      |
| <a id="type-parameter-k-2"></a> `K`  | `never`      |
| <a id="type-parameter-l-1"></a> `L`  | `never`      |
| <a id="type-parameter-m"></a> `M`    | `never`      |

### Parameters

| Parameter | Type              |
| --------- | ----------------- |
| `a`       | `A`               |
| `ab`      | (`a`: `A`) => `B` |
| `bc`      | (`b`: `B`) => `C` |
| `cd`      | (`c`: `C`) => `D` |
| `de`      | (`d`: `D`) => `E` |
| `ef`      | (`e`: `E`) => `F` |
| `fg`      | (`f`: `F`) => `G` |
| `gh`      | (`g`: `G`) => `H` |
| `hi`      | (`h`: `H`) => `I` |
| `ij`      | (`i`: `I`) => `J` |
| `jk`      | (`j`: `J`) => `K` |
| `kl`      | (`k`: `K`) => `L` |
| `lm`      | (`l`: `L`) => `M` |

### Returns

`M`

### Since

2.0.0

## Call Signature

```ts
function pipe<A, B = never, C = never, D = never, E = never, F = never, G = never, H = never, I = never, J = never, K = never, L = never, M = never, N = never>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K,
  kl: (k: K) => L,
  lm: (l: L) => M,
  mn: (m: M) => N,
): N;
```

Pipes the value of an expression through a left-to-right sequence of
functions.

**When to use**

Use when you need to compose data-last functions into readable
transformation pipelines instead of method-style chains.

**Details**

Takes an initial value, passes it to the first function, then passes each
result to the next function in order. The final function result is returned.

**Gotchas**

Each function passed after the initial value must accept a single argument,
because `pipe` calls each step with only the previous result.

**Example** (Piping values through functions)

In this example, `1` is passed to the first function, and each result becomes
the input for the next function.

```ts
import { pipe } from "effect";

pipe(
  1,
  (n) => n + 1,
  (n) => n * 2,
  (n) => `result: ${n}`,
); // => "result: 4"
```

**Example** (Rewriting method chains with pipe)

The same transformation can be written with data-last functions.

```ts
import { Array, pipe } from "effect";

const numbers = [1, 2, 3, 4];
const double = (n: number) => n * 2;
const greaterThanFour = (n: number) => n > 4;

pipe(
  numbers,
  Array.map(double),
  Array.filter(greaterThanFour),
); // => [6, 8]
```

### Type Parameters

| Type Parameter                       | Default type |
| ------------------------------------ | ------------ |
| <a id="type-parameter-a-13"></a> `A` | -            |
| <a id="type-parameter-b-12"></a> `B` | `never`      |
| <a id="type-parameter-c-11"></a> `C` | `never`      |
| <a id="type-parameter-d-10"></a> `D` | `never`      |
| <a id="type-parameter-e-9"></a> `E`  | `never`      |
| <a id="type-parameter-f-8"></a> `F`  | `never`      |
| <a id="type-parameter-g-7"></a> `G`  | `never`      |
| <a id="type-parameter-h-6"></a> `H`  | `never`      |
| <a id="type-parameter-i-5"></a> `I`  | `never`      |
| <a id="type-parameter-j-4"></a> `J`  | `never`      |
| <a id="type-parameter-k-3"></a> `K`  | `never`      |
| <a id="type-parameter-l-2"></a> `L`  | `never`      |
| <a id="type-parameter-m-1"></a> `M`  | `never`      |
| <a id="type-parameter-n"></a> `N`    | `never`      |

### Parameters

| Parameter | Type              |
| --------- | ----------------- |
| `a`       | `A`               |
| `ab`      | (`a`: `A`) => `B` |
| `bc`      | (`b`: `B`) => `C` |
| `cd`      | (`c`: `C`) => `D` |
| `de`      | (`d`: `D`) => `E` |
| `ef`      | (`e`: `E`) => `F` |
| `fg`      | (`f`: `F`) => `G` |
| `gh`      | (`g`: `G`) => `H` |
| `hi`      | (`h`: `H`) => `I` |
| `ij`      | (`i`: `I`) => `J` |
| `jk`      | (`j`: `J`) => `K` |
| `kl`      | (`k`: `K`) => `L` |
| `lm`      | (`l`: `L`) => `M` |
| `mn`      | (`m`: `M`) => `N` |

### Returns

`N`

### Since

2.0.0

## Call Signature

```ts
function pipe<
  A,
  B = never,
  C = never,
  D = never,
  E = never,
  F = never,
  G = never,
  H = never,
  I = never,
  J = never,
  K = never,
  L = never,
  M = never,
  N = never,
  O = never,
>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K,
  kl: (k: K) => L,
  lm: (l: L) => M,
  mn: (m: M) => N,
  no: (n: N) => O,
): O;
```

Pipes the value of an expression through a left-to-right sequence of
functions.

**When to use**

Use when you need to compose data-last functions into readable
transformation pipelines instead of method-style chains.

**Details**

Takes an initial value, passes it to the first function, then passes each
result to the next function in order. The final function result is returned.

**Gotchas**

Each function passed after the initial value must accept a single argument,
because `pipe` calls each step with only the previous result.

**Example** (Piping values through functions)

In this example, `1` is passed to the first function, and each result becomes
the input for the next function.

```ts
import { pipe } from "effect";

pipe(
  1,
  (n) => n + 1,
  (n) => n * 2,
  (n) => `result: ${n}`,
); // => "result: 4"
```

**Example** (Rewriting method chains with pipe)

The same transformation can be written with data-last functions.

```ts
import { Array, pipe } from "effect";

const numbers = [1, 2, 3, 4];
const double = (n: number) => n * 2;
const greaterThanFour = (n: number) => n > 4;

pipe(
  numbers,
  Array.map(double),
  Array.filter(greaterThanFour),
); // => [6, 8]
```

### Type Parameters

| Type Parameter                       | Default type |
| ------------------------------------ | ------------ |
| <a id="type-parameter-a-14"></a> `A` | -            |
| <a id="type-parameter-b-13"></a> `B` | `never`      |
| <a id="type-parameter-c-12"></a> `C` | `never`      |
| <a id="type-parameter-d-11"></a> `D` | `never`      |
| <a id="type-parameter-e-10"></a> `E` | `never`      |
| <a id="type-parameter-f-9"></a> `F`  | `never`      |
| <a id="type-parameter-g-8"></a> `G`  | `never`      |
| <a id="type-parameter-h-7"></a> `H`  | `never`      |
| <a id="type-parameter-i-6"></a> `I`  | `never`      |
| <a id="type-parameter-j-5"></a> `J`  | `never`      |
| <a id="type-parameter-k-4"></a> `K`  | `never`      |
| <a id="type-parameter-l-3"></a> `L`  | `never`      |
| <a id="type-parameter-m-2"></a> `M`  | `never`      |
| <a id="type-parameter-n-1"></a> `N`  | `never`      |
| <a id="type-parameter-o"></a> `O`    | `never`      |

### Parameters

| Parameter | Type              |
| --------- | ----------------- |
| `a`       | `A`               |
| `ab`      | (`a`: `A`) => `B` |
| `bc`      | (`b`: `B`) => `C` |
| `cd`      | (`c`: `C`) => `D` |
| `de`      | (`d`: `D`) => `E` |
| `ef`      | (`e`: `E`) => `F` |
| `fg`      | (`f`: `F`) => `G` |
| `gh`      | (`g`: `G`) => `H` |
| `hi`      | (`h`: `H`) => `I` |
| `ij`      | (`i`: `I`) => `J` |
| `jk`      | (`j`: `J`) => `K` |
| `kl`      | (`k`: `K`) => `L` |
| `lm`      | (`l`: `L`) => `M` |
| `mn`      | (`m`: `M`) => `N` |
| `no`      | (`n`: `N`) => `O` |

### Returns

`O`

### Since

2.0.0

## Call Signature

```ts
function pipe<
  A,
  B = never,
  C = never,
  D = never,
  E = never,
  F = never,
  G = never,
  H = never,
  I = never,
  J = never,
  K = never,
  L = never,
  M = never,
  N = never,
  O = never,
  P = never,
>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K,
  kl: (k: K) => L,
  lm: (l: L) => M,
  mn: (m: M) => N,
  no: (n: N) => O,
  op: (o: O) => P,
): P;
```

Pipes the value of an expression through a left-to-right sequence of
functions.

**When to use**

Use when you need to compose data-last functions into readable
transformation pipelines instead of method-style chains.

**Details**

Takes an initial value, passes it to the first function, then passes each
result to the next function in order. The final function result is returned.

**Gotchas**

Each function passed after the initial value must accept a single argument,
because `pipe` calls each step with only the previous result.

**Example** (Piping values through functions)

In this example, `1` is passed to the first function, and each result becomes
the input for the next function.

```ts
import { pipe } from "effect";

pipe(
  1,
  (n) => n + 1,
  (n) => n * 2,
  (n) => `result: ${n}`,
); // => "result: 4"
```

**Example** (Rewriting method chains with pipe)

The same transformation can be written with data-last functions.

```ts
import { Array, pipe } from "effect";

const numbers = [1, 2, 3, 4];
const double = (n: number) => n * 2;
const greaterThanFour = (n: number) => n > 4;

pipe(
  numbers,
  Array.map(double),
  Array.filter(greaterThanFour),
); // => [6, 8]
```

### Type Parameters

| Type Parameter                       | Default type |
| ------------------------------------ | ------------ |
| <a id="type-parameter-a-15"></a> `A` | -            |
| <a id="type-parameter-b-14"></a> `B` | `never`      |
| <a id="type-parameter-c-13"></a> `C` | `never`      |
| <a id="type-parameter-d-12"></a> `D` | `never`      |
| <a id="type-parameter-e-11"></a> `E` | `never`      |
| <a id="type-parameter-f-10"></a> `F` | `never`      |
| <a id="type-parameter-g-9"></a> `G`  | `never`      |
| <a id="type-parameter-h-8"></a> `H`  | `never`      |
| <a id="type-parameter-i-7"></a> `I`  | `never`      |
| <a id="type-parameter-j-6"></a> `J`  | `never`      |
| <a id="type-parameter-k-5"></a> `K`  | `never`      |
| <a id="type-parameter-l-4"></a> `L`  | `never`      |
| <a id="type-parameter-m-3"></a> `M`  | `never`      |
| <a id="type-parameter-n-2"></a> `N`  | `never`      |
| <a id="type-parameter-o-1"></a> `O`  | `never`      |
| <a id="type-parameter-p"></a> `P`    | `never`      |

### Parameters

| Parameter | Type              |
| --------- | ----------------- |
| `a`       | `A`               |
| `ab`      | (`a`: `A`) => `B` |
| `bc`      | (`b`: `B`) => `C` |
| `cd`      | (`c`: `C`) => `D` |
| `de`      | (`d`: `D`) => `E` |
| `ef`      | (`e`: `E`) => `F` |
| `fg`      | (`f`: `F`) => `G` |
| `gh`      | (`g`: `G`) => `H` |
| `hi`      | (`h`: `H`) => `I` |
| `ij`      | (`i`: `I`) => `J` |
| `jk`      | (`j`: `J`) => `K` |
| `kl`      | (`k`: `K`) => `L` |
| `lm`      | (`l`: `L`) => `M` |
| `mn`      | (`m`: `M`) => `N` |
| `no`      | (`n`: `N`) => `O` |
| `op`      | (`o`: `O`) => `P` |

### Returns

`P`

### Since

2.0.0

## Call Signature

```ts
function pipe<
  A,
  B = never,
  C = never,
  D = never,
  E = never,
  F = never,
  G = never,
  H = never,
  I = never,
  J = never,
  K = never,
  L = never,
  M = never,
  N = never,
  O = never,
  P = never,
  Q = never,
>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K,
  kl: (k: K) => L,
  lm: (l: L) => M,
  mn: (m: M) => N,
  no: (n: N) => O,
  op: (o: O) => P,
  pq: (p: P) => Q,
): Q;
```

Pipes the value of an expression through a left-to-right sequence of
functions.

**When to use**

Use when you need to compose data-last functions into readable
transformation pipelines instead of method-style chains.

**Details**

Takes an initial value, passes it to the first function, then passes each
result to the next function in order. The final function result is returned.

**Gotchas**

Each function passed after the initial value must accept a single argument,
because `pipe` calls each step with only the previous result.

**Example** (Piping values through functions)

In this example, `1` is passed to the first function, and each result becomes
the input for the next function.

```ts
import { pipe } from "effect";

pipe(
  1,
  (n) => n + 1,
  (n) => n * 2,
  (n) => `result: ${n}`,
); // => "result: 4"
```

**Example** (Rewriting method chains with pipe)

The same transformation can be written with data-last functions.

```ts
import { Array, pipe } from "effect";

const numbers = [1, 2, 3, 4];
const double = (n: number) => n * 2;
const greaterThanFour = (n: number) => n > 4;

pipe(
  numbers,
  Array.map(double),
  Array.filter(greaterThanFour),
); // => [6, 8]
```

### Type Parameters

| Type Parameter                       | Default type |
| ------------------------------------ | ------------ |
| <a id="type-parameter-a-16"></a> `A` | -            |
| <a id="type-parameter-b-15"></a> `B` | `never`      |
| <a id="type-parameter-c-14"></a> `C` | `never`      |
| <a id="type-parameter-d-13"></a> `D` | `never`      |
| <a id="type-parameter-e-12"></a> `E` | `never`      |
| <a id="type-parameter-f-11"></a> `F` | `never`      |
| <a id="type-parameter-g-10"></a> `G` | `never`      |
| <a id="type-parameter-h-9"></a> `H`  | `never`      |
| <a id="type-parameter-i-8"></a> `I`  | `never`      |
| <a id="type-parameter-j-7"></a> `J`  | `never`      |
| <a id="type-parameter-k-6"></a> `K`  | `never`      |
| <a id="type-parameter-l-5"></a> `L`  | `never`      |
| <a id="type-parameter-m-4"></a> `M`  | `never`      |
| <a id="type-parameter-n-3"></a> `N`  | `never`      |
| <a id="type-parameter-o-2"></a> `O`  | `never`      |
| <a id="type-parameter-p-1"></a> `P`  | `never`      |
| <a id="type-parameter-q"></a> `Q`    | `never`      |

### Parameters

| Parameter | Type              |
| --------- | ----------------- |
| `a`       | `A`               |
| `ab`      | (`a`: `A`) => `B` |
| `bc`      | (`b`: `B`) => `C` |
| `cd`      | (`c`: `C`) => `D` |
| `de`      | (`d`: `D`) => `E` |
| `ef`      | (`e`: `E`) => `F` |
| `fg`      | (`f`: `F`) => `G` |
| `gh`      | (`g`: `G`) => `H` |
| `hi`      | (`h`: `H`) => `I` |
| `ij`      | (`i`: `I`) => `J` |
| `jk`      | (`j`: `J`) => `K` |
| `kl`      | (`k`: `K`) => `L` |
| `lm`      | (`l`: `L`) => `M` |
| `mn`      | (`m`: `M`) => `N` |
| `no`      | (`n`: `N`) => `O` |
| `op`      | (`o`: `O`) => `P` |
| `pq`      | (`p`: `P`) => `Q` |

### Returns

`Q`

### Since

2.0.0

## Call Signature

```ts
function pipe<
  A,
  B = never,
  C = never,
  D = never,
  E = never,
  F = never,
  G = never,
  H = never,
  I = never,
  J = never,
  K = never,
  L = never,
  M = never,
  N = never,
  O = never,
  P = never,
  Q = never,
  R = never,
>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K,
  kl: (k: K) => L,
  lm: (l: L) => M,
  mn: (m: M) => N,
  no: (n: N) => O,
  op: (o: O) => P,
  pq: (p: P) => Q,
  qr: (q: Q) => R,
): R;
```

Pipes the value of an expression through a left-to-right sequence of
functions.

**When to use**

Use when you need to compose data-last functions into readable
transformation pipelines instead of method-style chains.

**Details**

Takes an initial value, passes it to the first function, then passes each
result to the next function in order. The final function result is returned.

**Gotchas**

Each function passed after the initial value must accept a single argument,
because `pipe` calls each step with only the previous result.

**Example** (Piping values through functions)

In this example, `1` is passed to the first function, and each result becomes
the input for the next function.

```ts
import { pipe } from "effect";

pipe(
  1,
  (n) => n + 1,
  (n) => n * 2,
  (n) => `result: ${n}`,
); // => "result: 4"
```

**Example** (Rewriting method chains with pipe)

The same transformation can be written with data-last functions.

```ts
import { Array, pipe } from "effect";

const numbers = [1, 2, 3, 4];
const double = (n: number) => n * 2;
const greaterThanFour = (n: number) => n > 4;

pipe(
  numbers,
  Array.map(double),
  Array.filter(greaterThanFour),
); // => [6, 8]
```

### Type Parameters

| Type Parameter                       | Default type |
| ------------------------------------ | ------------ |
| <a id="type-parameter-a-17"></a> `A` | -            |
| <a id="type-parameter-b-16"></a> `B` | `never`      |
| <a id="type-parameter-c-15"></a> `C` | `never`      |
| <a id="type-parameter-d-14"></a> `D` | `never`      |
| <a id="type-parameter-e-13"></a> `E` | `never`      |
| <a id="type-parameter-f-12"></a> `F` | `never`      |
| <a id="type-parameter-g-11"></a> `G` | `never`      |
| <a id="type-parameter-h-10"></a> `H` | `never`      |
| <a id="type-parameter-i-9"></a> `I`  | `never`      |
| <a id="type-parameter-j-8"></a> `J`  | `never`      |
| <a id="type-parameter-k-7"></a> `K`  | `never`      |
| <a id="type-parameter-l-6"></a> `L`  | `never`      |
| <a id="type-parameter-m-5"></a> `M`  | `never`      |
| <a id="type-parameter-n-4"></a> `N`  | `never`      |
| <a id="type-parameter-o-3"></a> `O`  | `never`      |
| <a id="type-parameter-p-2"></a> `P`  | `never`      |
| <a id="type-parameter-q-1"></a> `Q`  | `never`      |
| <a id="type-parameter-r"></a> `R`    | `never`      |

### Parameters

| Parameter | Type              |
| --------- | ----------------- |
| `a`       | `A`               |
| `ab`      | (`a`: `A`) => `B` |
| `bc`      | (`b`: `B`) => `C` |
| `cd`      | (`c`: `C`) => `D` |
| `de`      | (`d`: `D`) => `E` |
| `ef`      | (`e`: `E`) => `F` |
| `fg`      | (`f`: `F`) => `G` |
| `gh`      | (`g`: `G`) => `H` |
| `hi`      | (`h`: `H`) => `I` |
| `ij`      | (`i`: `I`) => `J` |
| `jk`      | (`j`: `J`) => `K` |
| `kl`      | (`k`: `K`) => `L` |
| `lm`      | (`l`: `L`) => `M` |
| `mn`      | (`m`: `M`) => `N` |
| `no`      | (`n`: `N`) => `O` |
| `op`      | (`o`: `O`) => `P` |
| `pq`      | (`p`: `P`) => `Q` |
| `qr`      | (`q`: `Q`) => `R` |

### Returns

`R`

### Since

2.0.0

## Call Signature

```ts
function pipe<
  A,
  B = never,
  C = never,
  D = never,
  E = never,
  F = never,
  G = never,
  H = never,
  I = never,
  J = never,
  K = never,
  L = never,
  M = never,
  N = never,
  O = never,
  P = never,
  Q = never,
  R = never,
  S = never,
>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K,
  kl: (k: K) => L,
  lm: (l: L) => M,
  mn: (m: M) => N,
  no: (n: N) => O,
  op: (o: O) => P,
  pq: (p: P) => Q,
  qr: (q: Q) => R,
  rs: (r: R) => S,
): S;
```

Pipes the value of an expression through a left-to-right sequence of
functions.

**When to use**

Use when you need to compose data-last functions into readable
transformation pipelines instead of method-style chains.

**Details**

Takes an initial value, passes it to the first function, then passes each
result to the next function in order. The final function result is returned.

**Gotchas**

Each function passed after the initial value must accept a single argument,
because `pipe` calls each step with only the previous result.

**Example** (Piping values through functions)

In this example, `1` is passed to the first function, and each result becomes
the input for the next function.

```ts
import { pipe } from "effect";

pipe(
  1,
  (n) => n + 1,
  (n) => n * 2,
  (n) => `result: ${n}`,
); // => "result: 4"
```

**Example** (Rewriting method chains with pipe)

The same transformation can be written with data-last functions.

```ts
import { Array, pipe } from "effect";

const numbers = [1, 2, 3, 4];
const double = (n: number) => n * 2;
const greaterThanFour = (n: number) => n > 4;

pipe(
  numbers,
  Array.map(double),
  Array.filter(greaterThanFour),
); // => [6, 8]
```

### Type Parameters

| Type Parameter                       | Default type |
| ------------------------------------ | ------------ |
| <a id="type-parameter-a-18"></a> `A` | -            |
| <a id="type-parameter-b-17"></a> `B` | `never`      |
| <a id="type-parameter-c-16"></a> `C` | `never`      |
| <a id="type-parameter-d-15"></a> `D` | `never`      |
| <a id="type-parameter-e-14"></a> `E` | `never`      |
| <a id="type-parameter-f-13"></a> `F` | `never`      |
| <a id="type-parameter-g-12"></a> `G` | `never`      |
| <a id="type-parameter-h-11"></a> `H` | `never`      |
| <a id="type-parameter-i-10"></a> `I` | `never`      |
| <a id="type-parameter-j-9"></a> `J`  | `never`      |
| <a id="type-parameter-k-8"></a> `K`  | `never`      |
| <a id="type-parameter-l-7"></a> `L`  | `never`      |
| <a id="type-parameter-m-6"></a> `M`  | `never`      |
| <a id="type-parameter-n-5"></a> `N`  | `never`      |
| <a id="type-parameter-o-4"></a> `O`  | `never`      |
| <a id="type-parameter-p-3"></a> `P`  | `never`      |
| <a id="type-parameter-q-2"></a> `Q`  | `never`      |
| <a id="type-parameter-r-1"></a> `R`  | `never`      |
| <a id="type-parameter-s"></a> `S`    | `never`      |

### Parameters

| Parameter | Type              |
| --------- | ----------------- |
| `a`       | `A`               |
| `ab`      | (`a`: `A`) => `B` |
| `bc`      | (`b`: `B`) => `C` |
| `cd`      | (`c`: `C`) => `D` |
| `de`      | (`d`: `D`) => `E` |
| `ef`      | (`e`: `E`) => `F` |
| `fg`      | (`f`: `F`) => `G` |
| `gh`      | (`g`: `G`) => `H` |
| `hi`      | (`h`: `H`) => `I` |
| `ij`      | (`i`: `I`) => `J` |
| `jk`      | (`j`: `J`) => `K` |
| `kl`      | (`k`: `K`) => `L` |
| `lm`      | (`l`: `L`) => `M` |
| `mn`      | (`m`: `M`) => `N` |
| `no`      | (`n`: `N`) => `O` |
| `op`      | (`o`: `O`) => `P` |
| `pq`      | (`p`: `P`) => `Q` |
| `qr`      | (`q`: `Q`) => `R` |
| `rs`      | (`r`: `R`) => `S` |

### Returns

`S`

### Since

2.0.0

## Call Signature

```ts
function pipe<
  A,
  B = never,
  C = never,
  D = never,
  E = never,
  F = never,
  G = never,
  H = never,
  I = never,
  J = never,
  K = never,
  L = never,
  M = never,
  N = never,
  O = never,
  P = never,
  Q = never,
  R = never,
  S = never,
  T = never,
>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K,
  kl: (k: K) => L,
  lm: (l: L) => M,
  mn: (m: M) => N,
  no: (n: N) => O,
  op: (o: O) => P,
  pq: (p: P) => Q,
  qr: (q: Q) => R,
  rs: (r: R) => S,
  st: (s: S) => T,
): T;
```

Pipes the value of an expression through a left-to-right sequence of
functions.

**When to use**

Use when you need to compose data-last functions into readable
transformation pipelines instead of method-style chains.

**Details**

Takes an initial value, passes it to the first function, then passes each
result to the next function in order. The final function result is returned.

**Gotchas**

Each function passed after the initial value must accept a single argument,
because `pipe` calls each step with only the previous result.

**Example** (Piping values through functions)

In this example, `1` is passed to the first function, and each result becomes
the input for the next function.

```ts
import { pipe } from "effect";

pipe(
  1,
  (n) => n + 1,
  (n) => n * 2,
  (n) => `result: ${n}`,
); // => "result: 4"
```

**Example** (Rewriting method chains with pipe)

The same transformation can be written with data-last functions.

```ts
import { Array, pipe } from "effect";

const numbers = [1, 2, 3, 4];
const double = (n: number) => n * 2;
const greaterThanFour = (n: number) => n > 4;

pipe(
  numbers,
  Array.map(double),
  Array.filter(greaterThanFour),
); // => [6, 8]
```

### Type Parameters

| Type Parameter                       | Default type |
| ------------------------------------ | ------------ |
| <a id="type-parameter-a-19"></a> `A` | -            |
| <a id="type-parameter-b-18"></a> `B` | `never`      |
| <a id="type-parameter-c-17"></a> `C` | `never`      |
| <a id="type-parameter-d-16"></a> `D` | `never`      |
| <a id="type-parameter-e-15"></a> `E` | `never`      |
| <a id="type-parameter-f-14"></a> `F` | `never`      |
| <a id="type-parameter-g-13"></a> `G` | `never`      |
| <a id="type-parameter-h-12"></a> `H` | `never`      |
| <a id="type-parameter-i-11"></a> `I` | `never`      |
| <a id="type-parameter-j-10"></a> `J` | `never`      |
| <a id="type-parameter-k-9"></a> `K`  | `never`      |
| <a id="type-parameter-l-8"></a> `L`  | `never`      |
| <a id="type-parameter-m-7"></a> `M`  | `never`      |
| <a id="type-parameter-n-6"></a> `N`  | `never`      |
| <a id="type-parameter-o-5"></a> `O`  | `never`      |
| <a id="type-parameter-p-4"></a> `P`  | `never`      |
| <a id="type-parameter-q-3"></a> `Q`  | `never`      |
| <a id="type-parameter-r-2"></a> `R`  | `never`      |
| <a id="type-parameter-s-1"></a> `S`  | `never`      |
| <a id="type-parameter-t"></a> `T`    | `never`      |

### Parameters

| Parameter | Type              |
| --------- | ----------------- |
| `a`       | `A`               |
| `ab`      | (`a`: `A`) => `B` |
| `bc`      | (`b`: `B`) => `C` |
| `cd`      | (`c`: `C`) => `D` |
| `de`      | (`d`: `D`) => `E` |
| `ef`      | (`e`: `E`) => `F` |
| `fg`      | (`f`: `F`) => `G` |
| `gh`      | (`g`: `G`) => `H` |
| `hi`      | (`h`: `H`) => `I` |
| `ij`      | (`i`: `I`) => `J` |
| `jk`      | (`j`: `J`) => `K` |
| `kl`      | (`k`: `K`) => `L` |
| `lm`      | (`l`: `L`) => `M` |
| `mn`      | (`m`: `M`) => `N` |
| `no`      | (`n`: `N`) => `O` |
| `op`      | (`o`: `O`) => `P` |
| `pq`      | (`p`: `P`) => `Q` |
| `qr`      | (`q`: `Q`) => `R` |
| `rs`      | (`r`: `R`) => `S` |
| `st`      | (`s`: `S`) => `T` |

### Returns

`T`

### Since

2.0.0
