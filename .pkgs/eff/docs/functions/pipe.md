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

const result = pipe(
  1,
  (n) => n + 1,
  (n) => n * 2,
  (n) => `result: ${n}`,
);

console.log(result); // "result: 4"
```

**Example** (Chaining methods before conversion)

```ts
const numbers = [1, 2, 3, 4];
const double = (n: number) => n * 2;
const greaterThanFour = (n: number) => n > 4;

const result = numbers.map(double).filter(greaterThanFour);

console.log(result); // [6, 8]
```

**Example** (Rewriting method chains with pipe)

The same transformation can be written with data-last functions.

```ts
import { Array, pipe } from "effect";

const numbers = [1, 2, 3, 4];
const double = (n: number) => n * 2;
const greaterThanFour = (n: number) => n > 4;

const result = pipe(
  numbers,
  Array.map(double),
  Array.filter(greaterThanFour),
);

console.log(result); // [6, 8]
```

**Example** (Chaining arithmetic operations)

```ts
import { pipe } from "effect";

// Define simple arithmetic operations
const increment = (x: number) => x + 1;
const double = (x: number) => x * 2;
const subtractTen = (x: number) => x - 10;

// Sequentially apply these operations using `pipe`
const result = pipe(5, increment, double, subtractTen);

console.log(result);
// Output: 2
```

**Example** (Building a simple transformation pipeline)

```ts
import { pipe } from "effect";

// Simple transformation pipeline
const result = pipe(
  5,
  (x) => x * 2, // 10
  (x) => x + 1, // 11
  (x) => x.toString(), // "11"
);

console.log(result); // "11"
```

### Type Parameters

| Type Parameter |
| -------------- |
| `A`            |

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
function pipe<A, B>(a: A, ab: (a: A) => B): B;
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

const result = pipe(
  1,
  (n) => n + 1,
  (n) => n * 2,
  (n) => `result: ${n}`,
);

console.log(result); // "result: 4"
```

**Example** (Chaining methods before conversion)

```ts
const numbers = [1, 2, 3, 4];
const double = (n: number) => n * 2;
const greaterThanFour = (n: number) => n > 4;

const result = numbers.map(double).filter(greaterThanFour);

console.log(result); // [6, 8]
```

**Example** (Rewriting method chains with pipe)

The same transformation can be written with data-last functions.

```ts
import { Array, pipe } from "effect";

const numbers = [1, 2, 3, 4];
const double = (n: number) => n * 2;
const greaterThanFour = (n: number) => n > 4;

const result = pipe(
  numbers,
  Array.map(double),
  Array.filter(greaterThanFour),
);

console.log(result); // [6, 8]
```

**Example** (Chaining arithmetic operations)

```ts
import { pipe } from "effect";

// Define simple arithmetic operations
const increment = (x: number) => x + 1;
const double = (x: number) => x * 2;
const subtractTen = (x: number) => x - 10;

// Sequentially apply these operations using `pipe`
const result = pipe(5, increment, double, subtractTen);

console.log(result);
// Output: 2
```

**Example** (Building a simple transformation pipeline)

```ts
import { pipe } from "effect";

// Simple transformation pipeline
const result = pipe(
  5,
  (x) => x * 2, // 10
  (x) => x + 1, // 11
  (x) => x.toString(), // "11"
);

console.log(result); // "11"
```

### Type Parameters

| Type Parameter | Default type |
| -------------- | ------------ |
| `A`            | -            |
| `B`            | `never`      |

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
function pipe<A, B, C>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
): C;
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

const result = pipe(
  1,
  (n) => n + 1,
  (n) => n * 2,
  (n) => `result: ${n}`,
);

console.log(result); // "result: 4"
```

**Example** (Chaining methods before conversion)

```ts
const numbers = [1, 2, 3, 4];
const double = (n: number) => n * 2;
const greaterThanFour = (n: number) => n > 4;

const result = numbers.map(double).filter(greaterThanFour);

console.log(result); // [6, 8]
```

**Example** (Rewriting method chains with pipe)

The same transformation can be written with data-last functions.

```ts
import { Array, pipe } from "effect";

const numbers = [1, 2, 3, 4];
const double = (n: number) => n * 2;
const greaterThanFour = (n: number) => n > 4;

const result = pipe(
  numbers,
  Array.map(double),
  Array.filter(greaterThanFour),
);

console.log(result); // [6, 8]
```

**Example** (Chaining arithmetic operations)

```ts
import { pipe } from "effect";

// Define simple arithmetic operations
const increment = (x: number) => x + 1;
const double = (x: number) => x * 2;
const subtractTen = (x: number) => x - 10;

// Sequentially apply these operations using `pipe`
const result = pipe(5, increment, double, subtractTen);

console.log(result);
// Output: 2
```

**Example** (Building a simple transformation pipeline)

```ts
import { pipe } from "effect";

// Simple transformation pipeline
const result = pipe(
  5,
  (x) => x * 2, // 10
  (x) => x + 1, // 11
  (x) => x.toString(), // "11"
);

console.log(result); // "11"
```

### Type Parameters

| Type Parameter | Default type |
| -------------- | ------------ |
| `A`            | -            |
| `B`            | `never`      |
| `C`            | `never`      |

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
function pipe<A, B, C, D>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
): D;
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

const result = pipe(
  1,
  (n) => n + 1,
  (n) => n * 2,
  (n) => `result: ${n}`,
);

console.log(result); // "result: 4"
```

**Example** (Chaining methods before conversion)

```ts
const numbers = [1, 2, 3, 4];
const double = (n: number) => n * 2;
const greaterThanFour = (n: number) => n > 4;

const result = numbers.map(double).filter(greaterThanFour);

console.log(result); // [6, 8]
```

**Example** (Rewriting method chains with pipe)

The same transformation can be written with data-last functions.

```ts
import { Array, pipe } from "effect";

const numbers = [1, 2, 3, 4];
const double = (n: number) => n * 2;
const greaterThanFour = (n: number) => n > 4;

const result = pipe(
  numbers,
  Array.map(double),
  Array.filter(greaterThanFour),
);

console.log(result); // [6, 8]
```

**Example** (Chaining arithmetic operations)

```ts
import { pipe } from "effect";

// Define simple arithmetic operations
const increment = (x: number) => x + 1;
const double = (x: number) => x * 2;
const subtractTen = (x: number) => x - 10;

// Sequentially apply these operations using `pipe`
const result = pipe(5, increment, double, subtractTen);

console.log(result);
// Output: 2
```

**Example** (Building a simple transformation pipeline)

```ts
import { pipe } from "effect";

// Simple transformation pipeline
const result = pipe(
  5,
  (x) => x * 2, // 10
  (x) => x + 1, // 11
  (x) => x.toString(), // "11"
);

console.log(result); // "11"
```

### Type Parameters

| Type Parameter | Default type |
| -------------- | ------------ |
| `A`            | -            |
| `B`            | `never`      |
| `C`            | `never`      |
| `D`            | `never`      |

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
function pipe<A, B, C, D, E>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
): E;
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

const result = pipe(
  1,
  (n) => n + 1,
  (n) => n * 2,
  (n) => `result: ${n}`,
);

console.log(result); // "result: 4"
```

**Example** (Chaining methods before conversion)

```ts
const numbers = [1, 2, 3, 4];
const double = (n: number) => n * 2;
const greaterThanFour = (n: number) => n > 4;

const result = numbers.map(double).filter(greaterThanFour);

console.log(result); // [6, 8]
```

**Example** (Rewriting method chains with pipe)

The same transformation can be written with data-last functions.

```ts
import { Array, pipe } from "effect";

const numbers = [1, 2, 3, 4];
const double = (n: number) => n * 2;
const greaterThanFour = (n: number) => n > 4;

const result = pipe(
  numbers,
  Array.map(double),
  Array.filter(greaterThanFour),
);

console.log(result); // [6, 8]
```

**Example** (Chaining arithmetic operations)

```ts
import { pipe } from "effect";

// Define simple arithmetic operations
const increment = (x: number) => x + 1;
const double = (x: number) => x * 2;
const subtractTen = (x: number) => x - 10;

// Sequentially apply these operations using `pipe`
const result = pipe(5, increment, double, subtractTen);

console.log(result);
// Output: 2
```

**Example** (Building a simple transformation pipeline)

```ts
import { pipe } from "effect";

// Simple transformation pipeline
const result = pipe(
  5,
  (x) => x * 2, // 10
  (x) => x + 1, // 11
  (x) => x.toString(), // "11"
);

console.log(result); // "11"
```

### Type Parameters

| Type Parameter | Default type |
| -------------- | ------------ |
| `A`            | -            |
| `B`            | `never`      |
| `C`            | `never`      |
| `D`            | `never`      |
| `E`            | `never`      |

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
function pipe<A, B, C, D, E, F>(
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

const result = pipe(
  1,
  (n) => n + 1,
  (n) => n * 2,
  (n) => `result: ${n}`,
);

console.log(result); // "result: 4"
```

**Example** (Chaining methods before conversion)

```ts
const numbers = [1, 2, 3, 4];
const double = (n: number) => n * 2;
const greaterThanFour = (n: number) => n > 4;

const result = numbers.map(double).filter(greaterThanFour);

console.log(result); // [6, 8]
```

**Example** (Rewriting method chains with pipe)

The same transformation can be written with data-last functions.

```ts
import { Array, pipe } from "effect";

const numbers = [1, 2, 3, 4];
const double = (n: number) => n * 2;
const greaterThanFour = (n: number) => n > 4;

const result = pipe(
  numbers,
  Array.map(double),
  Array.filter(greaterThanFour),
);

console.log(result); // [6, 8]
```

**Example** (Chaining arithmetic operations)

```ts
import { pipe } from "effect";

// Define simple arithmetic operations
const increment = (x: number) => x + 1;
const double = (x: number) => x * 2;
const subtractTen = (x: number) => x - 10;

// Sequentially apply these operations using `pipe`
const result = pipe(5, increment, double, subtractTen);

console.log(result);
// Output: 2
```

**Example** (Building a simple transformation pipeline)

```ts
import { pipe } from "effect";

// Simple transformation pipeline
const result = pipe(
  5,
  (x) => x * 2, // 10
  (x) => x + 1, // 11
  (x) => x.toString(), // "11"
);

console.log(result); // "11"
```

### Type Parameters

| Type Parameter | Default type |
| -------------- | ------------ |
| `A`            | -            |
| `B`            | `never`      |
| `C`            | `never`      |
| `D`            | `never`      |
| `E`            | `never`      |
| `F`            | `never`      |

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
function pipe<A, B, C, D, E, F, G>(
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

const result = pipe(
  1,
  (n) => n + 1,
  (n) => n * 2,
  (n) => `result: ${n}`,
);

console.log(result); // "result: 4"
```

**Example** (Chaining methods before conversion)

```ts
const numbers = [1, 2, 3, 4];
const double = (n: number) => n * 2;
const greaterThanFour = (n: number) => n > 4;

const result = numbers.map(double).filter(greaterThanFour);

console.log(result); // [6, 8]
```

**Example** (Rewriting method chains with pipe)

The same transformation can be written with data-last functions.

```ts
import { Array, pipe } from "effect";

const numbers = [1, 2, 3, 4];
const double = (n: number) => n * 2;
const greaterThanFour = (n: number) => n > 4;

const result = pipe(
  numbers,
  Array.map(double),
  Array.filter(greaterThanFour),
);

console.log(result); // [6, 8]
```

**Example** (Chaining arithmetic operations)

```ts
import { pipe } from "effect";

// Define simple arithmetic operations
const increment = (x: number) => x + 1;
const double = (x: number) => x * 2;
const subtractTen = (x: number) => x - 10;

// Sequentially apply these operations using `pipe`
const result = pipe(5, increment, double, subtractTen);

console.log(result);
// Output: 2
```

**Example** (Building a simple transformation pipeline)

```ts
import { pipe } from "effect";

// Simple transformation pipeline
const result = pipe(
  5,
  (x) => x * 2, // 10
  (x) => x + 1, // 11
  (x) => x.toString(), // "11"
);

console.log(result); // "11"
```

### Type Parameters

| Type Parameter | Default type |
| -------------- | ------------ |
| `A`            | -            |
| `B`            | `never`      |
| `C`            | `never`      |
| `D`            | `never`      |
| `E`            | `never`      |
| `F`            | `never`      |
| `G`            | `never`      |

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
function pipe<A, B, C, D, E, F, G, H>(
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

const result = pipe(
  1,
  (n) => n + 1,
  (n) => n * 2,
  (n) => `result: ${n}`,
);

console.log(result); // "result: 4"
```

**Example** (Chaining methods before conversion)

```ts
const numbers = [1, 2, 3, 4];
const double = (n: number) => n * 2;
const greaterThanFour = (n: number) => n > 4;

const result = numbers.map(double).filter(greaterThanFour);

console.log(result); // [6, 8]
```

**Example** (Rewriting method chains with pipe)

The same transformation can be written with data-last functions.

```ts
import { Array, pipe } from "effect";

const numbers = [1, 2, 3, 4];
const double = (n: number) => n * 2;
const greaterThanFour = (n: number) => n > 4;

const result = pipe(
  numbers,
  Array.map(double),
  Array.filter(greaterThanFour),
);

console.log(result); // [6, 8]
```

**Example** (Chaining arithmetic operations)

```ts
import { pipe } from "effect";

// Define simple arithmetic operations
const increment = (x: number) => x + 1;
const double = (x: number) => x * 2;
const subtractTen = (x: number) => x - 10;

// Sequentially apply these operations using `pipe`
const result = pipe(5, increment, double, subtractTen);

console.log(result);
// Output: 2
```

**Example** (Building a simple transformation pipeline)

```ts
import { pipe } from "effect";

// Simple transformation pipeline
const result = pipe(
  5,
  (x) => x * 2, // 10
  (x) => x + 1, // 11
  (x) => x.toString(), // "11"
);

console.log(result); // "11"
```

### Type Parameters

| Type Parameter | Default type |
| -------------- | ------------ |
| `A`            | -            |
| `B`            | `never`      |
| `C`            | `never`      |
| `D`            | `never`      |
| `E`            | `never`      |
| `F`            | `never`      |
| `G`            | `never`      |
| `H`            | `never`      |

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
function pipe<A, B, C, D, E, F, G, H, I>(
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

const result = pipe(
  1,
  (n) => n + 1,
  (n) => n * 2,
  (n) => `result: ${n}`,
);

console.log(result); // "result: 4"
```

**Example** (Chaining methods before conversion)

```ts
const numbers = [1, 2, 3, 4];
const double = (n: number) => n * 2;
const greaterThanFour = (n: number) => n > 4;

const result = numbers.map(double).filter(greaterThanFour);

console.log(result); // [6, 8]
```

**Example** (Rewriting method chains with pipe)

The same transformation can be written with data-last functions.

```ts
import { Array, pipe } from "effect";

const numbers = [1, 2, 3, 4];
const double = (n: number) => n * 2;
const greaterThanFour = (n: number) => n > 4;

const result = pipe(
  numbers,
  Array.map(double),
  Array.filter(greaterThanFour),
);

console.log(result); // [6, 8]
```

**Example** (Chaining arithmetic operations)

```ts
import { pipe } from "effect";

// Define simple arithmetic operations
const increment = (x: number) => x + 1;
const double = (x: number) => x * 2;
const subtractTen = (x: number) => x - 10;

// Sequentially apply these operations using `pipe`
const result = pipe(5, increment, double, subtractTen);

console.log(result);
// Output: 2
```

**Example** (Building a simple transformation pipeline)

```ts
import { pipe } from "effect";

// Simple transformation pipeline
const result = pipe(
  5,
  (x) => x * 2, // 10
  (x) => x + 1, // 11
  (x) => x.toString(), // "11"
);

console.log(result); // "11"
```

### Type Parameters

| Type Parameter | Default type |
| -------------- | ------------ |
| `A`            | -            |
| `B`            | `never`      |
| `C`            | `never`      |
| `D`            | `never`      |
| `E`            | `never`      |
| `F`            | `never`      |
| `G`            | `never`      |
| `H`            | `never`      |
| `I`            | `never`      |

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
function pipe<A, B, C, D, E, F, G, H, I, J>(
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

const result = pipe(
  1,
  (n) => n + 1,
  (n) => n * 2,
  (n) => `result: ${n}`,
);

console.log(result); // "result: 4"
```

**Example** (Chaining methods before conversion)

```ts
const numbers = [1, 2, 3, 4];
const double = (n: number) => n * 2;
const greaterThanFour = (n: number) => n > 4;

const result = numbers.map(double).filter(greaterThanFour);

console.log(result); // [6, 8]
```

**Example** (Rewriting method chains with pipe)

The same transformation can be written with data-last functions.

```ts
import { Array, pipe } from "effect";

const numbers = [1, 2, 3, 4];
const double = (n: number) => n * 2;
const greaterThanFour = (n: number) => n > 4;

const result = pipe(
  numbers,
  Array.map(double),
  Array.filter(greaterThanFour),
);

console.log(result); // [6, 8]
```

**Example** (Chaining arithmetic operations)

```ts
import { pipe } from "effect";

// Define simple arithmetic operations
const increment = (x: number) => x + 1;
const double = (x: number) => x * 2;
const subtractTen = (x: number) => x - 10;

// Sequentially apply these operations using `pipe`
const result = pipe(5, increment, double, subtractTen);

console.log(result);
// Output: 2
```

**Example** (Building a simple transformation pipeline)

```ts
import { pipe } from "effect";

// Simple transformation pipeline
const result = pipe(
  5,
  (x) => x * 2, // 10
  (x) => x + 1, // 11
  (x) => x.toString(), // "11"
);

console.log(result); // "11"
```

### Type Parameters

| Type Parameter | Default type |
| -------------- | ------------ |
| `A`            | -            |
| `B`            | `never`      |
| `C`            | `never`      |
| `D`            | `never`      |
| `E`            | `never`      |
| `F`            | `never`      |
| `G`            | `never`      |
| `H`            | `never`      |
| `I`            | `never`      |
| `J`            | `never`      |

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
function pipe<A, B, C, D, E, F, G, H, I, J, K>(
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

const result = pipe(
  1,
  (n) => n + 1,
  (n) => n * 2,
  (n) => `result: ${n}`,
);

console.log(result); // "result: 4"
```

**Example** (Chaining methods before conversion)

```ts
const numbers = [1, 2, 3, 4];
const double = (n: number) => n * 2;
const greaterThanFour = (n: number) => n > 4;

const result = numbers.map(double).filter(greaterThanFour);

console.log(result); // [6, 8]
```

**Example** (Rewriting method chains with pipe)

The same transformation can be written with data-last functions.

```ts
import { Array, pipe } from "effect";

const numbers = [1, 2, 3, 4];
const double = (n: number) => n * 2;
const greaterThanFour = (n: number) => n > 4;

const result = pipe(
  numbers,
  Array.map(double),
  Array.filter(greaterThanFour),
);

console.log(result); // [6, 8]
```

**Example** (Chaining arithmetic operations)

```ts
import { pipe } from "effect";

// Define simple arithmetic operations
const increment = (x: number) => x + 1;
const double = (x: number) => x * 2;
const subtractTen = (x: number) => x - 10;

// Sequentially apply these operations using `pipe`
const result = pipe(5, increment, double, subtractTen);

console.log(result);
// Output: 2
```

**Example** (Building a simple transformation pipeline)

```ts
import { pipe } from "effect";

// Simple transformation pipeline
const result = pipe(
  5,
  (x) => x * 2, // 10
  (x) => x + 1, // 11
  (x) => x.toString(), // "11"
);

console.log(result); // "11"
```

### Type Parameters

| Type Parameter | Default type |
| -------------- | ------------ |
| `A`            | -            |
| `B`            | `never`      |
| `C`            | `never`      |
| `D`            | `never`      |
| `E`            | `never`      |
| `F`            | `never`      |
| `G`            | `never`      |
| `H`            | `never`      |
| `I`            | `never`      |
| `J`            | `never`      |
| `K`            | `never`      |

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
function pipe<A, B, C, D, E, F, G, H, I, J, K, L>(
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

const result = pipe(
  1,
  (n) => n + 1,
  (n) => n * 2,
  (n) => `result: ${n}`,
);

console.log(result); // "result: 4"
```

**Example** (Chaining methods before conversion)

```ts
const numbers = [1, 2, 3, 4];
const double = (n: number) => n * 2;
const greaterThanFour = (n: number) => n > 4;

const result = numbers.map(double).filter(greaterThanFour);

console.log(result); // [6, 8]
```

**Example** (Rewriting method chains with pipe)

The same transformation can be written with data-last functions.

```ts
import { Array, pipe } from "effect";

const numbers = [1, 2, 3, 4];
const double = (n: number) => n * 2;
const greaterThanFour = (n: number) => n > 4;

const result = pipe(
  numbers,
  Array.map(double),
  Array.filter(greaterThanFour),
);

console.log(result); // [6, 8]
```

**Example** (Chaining arithmetic operations)

```ts
import { pipe } from "effect";

// Define simple arithmetic operations
const increment = (x: number) => x + 1;
const double = (x: number) => x * 2;
const subtractTen = (x: number) => x - 10;

// Sequentially apply these operations using `pipe`
const result = pipe(5, increment, double, subtractTen);

console.log(result);
// Output: 2
```

**Example** (Building a simple transformation pipeline)

```ts
import { pipe } from "effect";

// Simple transformation pipeline
const result = pipe(
  5,
  (x) => x * 2, // 10
  (x) => x + 1, // 11
  (x) => x.toString(), // "11"
);

console.log(result); // "11"
```

### Type Parameters

| Type Parameter | Default type |
| -------------- | ------------ |
| `A`            | -            |
| `B`            | `never`      |
| `C`            | `never`      |
| `D`            | `never`      |
| `E`            | `never`      |
| `F`            | `never`      |
| `G`            | `never`      |
| `H`            | `never`      |
| `I`            | `never`      |
| `J`            | `never`      |
| `K`            | `never`      |
| `L`            | `never`      |

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
function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M>(
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

const result = pipe(
  1,
  (n) => n + 1,
  (n) => n * 2,
  (n) => `result: ${n}`,
);

console.log(result); // "result: 4"
```

**Example** (Chaining methods before conversion)

```ts
const numbers = [1, 2, 3, 4];
const double = (n: number) => n * 2;
const greaterThanFour = (n: number) => n > 4;

const result = numbers.map(double).filter(greaterThanFour);

console.log(result); // [6, 8]
```

**Example** (Rewriting method chains with pipe)

The same transformation can be written with data-last functions.

```ts
import { Array, pipe } from "effect";

const numbers = [1, 2, 3, 4];
const double = (n: number) => n * 2;
const greaterThanFour = (n: number) => n > 4;

const result = pipe(
  numbers,
  Array.map(double),
  Array.filter(greaterThanFour),
);

console.log(result); // [6, 8]
```

**Example** (Chaining arithmetic operations)

```ts
import { pipe } from "effect";

// Define simple arithmetic operations
const increment = (x: number) => x + 1;
const double = (x: number) => x * 2;
const subtractTen = (x: number) => x - 10;

// Sequentially apply these operations using `pipe`
const result = pipe(5, increment, double, subtractTen);

console.log(result);
// Output: 2
```

**Example** (Building a simple transformation pipeline)

```ts
import { pipe } from "effect";

// Simple transformation pipeline
const result = pipe(
  5,
  (x) => x * 2, // 10
  (x) => x + 1, // 11
  (x) => x.toString(), // "11"
);

console.log(result); // "11"
```

### Type Parameters

| Type Parameter | Default type |
| -------------- | ------------ |
| `A`            | -            |
| `B`            | `never`      |
| `C`            | `never`      |
| `D`            | `never`      |
| `E`            | `never`      |
| `F`            | `never`      |
| `G`            | `never`      |
| `H`            | `never`      |
| `I`            | `never`      |
| `J`            | `never`      |
| `K`            | `never`      |
| `L`            | `never`      |
| `M`            | `never`      |

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
function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N>(
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

const result = pipe(
  1,
  (n) => n + 1,
  (n) => n * 2,
  (n) => `result: ${n}`,
);

console.log(result); // "result: 4"
```

**Example** (Chaining methods before conversion)

```ts
const numbers = [1, 2, 3, 4];
const double = (n: number) => n * 2;
const greaterThanFour = (n: number) => n > 4;

const result = numbers.map(double).filter(greaterThanFour);

console.log(result); // [6, 8]
```

**Example** (Rewriting method chains with pipe)

The same transformation can be written with data-last functions.

```ts
import { Array, pipe } from "effect";

const numbers = [1, 2, 3, 4];
const double = (n: number) => n * 2;
const greaterThanFour = (n: number) => n > 4;

const result = pipe(
  numbers,
  Array.map(double),
  Array.filter(greaterThanFour),
);

console.log(result); // [6, 8]
```

**Example** (Chaining arithmetic operations)

```ts
import { pipe } from "effect";

// Define simple arithmetic operations
const increment = (x: number) => x + 1;
const double = (x: number) => x * 2;
const subtractTen = (x: number) => x - 10;

// Sequentially apply these operations using `pipe`
const result = pipe(5, increment, double, subtractTen);

console.log(result);
// Output: 2
```

**Example** (Building a simple transformation pipeline)

```ts
import { pipe } from "effect";

// Simple transformation pipeline
const result = pipe(
  5,
  (x) => x * 2, // 10
  (x) => x + 1, // 11
  (x) => x.toString(), // "11"
);

console.log(result); // "11"
```

### Type Parameters

| Type Parameter | Default type |
| -------------- | ------------ |
| `A`            | -            |
| `B`            | `never`      |
| `C`            | `never`      |
| `D`            | `never`      |
| `E`            | `never`      |
| `F`            | `never`      |
| `G`            | `never`      |
| `H`            | `never`      |
| `I`            | `never`      |
| `J`            | `never`      |
| `K`            | `never`      |
| `L`            | `never`      |
| `M`            | `never`      |
| `N`            | `never`      |

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
function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O>(
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

const result = pipe(
  1,
  (n) => n + 1,
  (n) => n * 2,
  (n) => `result: ${n}`,
);

console.log(result); // "result: 4"
```

**Example** (Chaining methods before conversion)

```ts
const numbers = [1, 2, 3, 4];
const double = (n: number) => n * 2;
const greaterThanFour = (n: number) => n > 4;

const result = numbers.map(double).filter(greaterThanFour);

console.log(result); // [6, 8]
```

**Example** (Rewriting method chains with pipe)

The same transformation can be written with data-last functions.

```ts
import { Array, pipe } from "effect";

const numbers = [1, 2, 3, 4];
const double = (n: number) => n * 2;
const greaterThanFour = (n: number) => n > 4;

const result = pipe(
  numbers,
  Array.map(double),
  Array.filter(greaterThanFour),
);

console.log(result); // [6, 8]
```

**Example** (Chaining arithmetic operations)

```ts
import { pipe } from "effect";

// Define simple arithmetic operations
const increment = (x: number) => x + 1;
const double = (x: number) => x * 2;
const subtractTen = (x: number) => x - 10;

// Sequentially apply these operations using `pipe`
const result = pipe(5, increment, double, subtractTen);

console.log(result);
// Output: 2
```

**Example** (Building a simple transformation pipeline)

```ts
import { pipe } from "effect";

// Simple transformation pipeline
const result = pipe(
  5,
  (x) => x * 2, // 10
  (x) => x + 1, // 11
  (x) => x.toString(), // "11"
);

console.log(result); // "11"
```

### Type Parameters

| Type Parameter | Default type |
| -------------- | ------------ |
| `A`            | -            |
| `B`            | `never`      |
| `C`            | `never`      |
| `D`            | `never`      |
| `E`            | `never`      |
| `F`            | `never`      |
| `G`            | `never`      |
| `H`            | `never`      |
| `I`            | `never`      |
| `J`            | `never`      |
| `K`            | `never`      |
| `L`            | `never`      |
| `M`            | `never`      |
| `N`            | `never`      |
| `O`            | `never`      |

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
function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P>(
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

const result = pipe(
  1,
  (n) => n + 1,
  (n) => n * 2,
  (n) => `result: ${n}`,
);

console.log(result); // "result: 4"
```

**Example** (Chaining methods before conversion)

```ts
const numbers = [1, 2, 3, 4];
const double = (n: number) => n * 2;
const greaterThanFour = (n: number) => n > 4;

const result = numbers.map(double).filter(greaterThanFour);

console.log(result); // [6, 8]
```

**Example** (Rewriting method chains with pipe)

The same transformation can be written with data-last functions.

```ts
import { Array, pipe } from "effect";

const numbers = [1, 2, 3, 4];
const double = (n: number) => n * 2;
const greaterThanFour = (n: number) => n > 4;

const result = pipe(
  numbers,
  Array.map(double),
  Array.filter(greaterThanFour),
);

console.log(result); // [6, 8]
```

**Example** (Chaining arithmetic operations)

```ts
import { pipe } from "effect";

// Define simple arithmetic operations
const increment = (x: number) => x + 1;
const double = (x: number) => x * 2;
const subtractTen = (x: number) => x - 10;

// Sequentially apply these operations using `pipe`
const result = pipe(5, increment, double, subtractTen);

console.log(result);
// Output: 2
```

**Example** (Building a simple transformation pipeline)

```ts
import { pipe } from "effect";

// Simple transformation pipeline
const result = pipe(
  5,
  (x) => x * 2, // 10
  (x) => x + 1, // 11
  (x) => x.toString(), // "11"
);

console.log(result); // "11"
```

### Type Parameters

| Type Parameter | Default type |
| -------------- | ------------ |
| `A`            | -            |
| `B`            | `never`      |
| `C`            | `never`      |
| `D`            | `never`      |
| `E`            | `never`      |
| `F`            | `never`      |
| `G`            | `never`      |
| `H`            | `never`      |
| `I`            | `never`      |
| `J`            | `never`      |
| `K`            | `never`      |
| `L`            | `never`      |
| `M`            | `never`      |
| `N`            | `never`      |
| `O`            | `never`      |
| `P`            | `never`      |

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
function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q>(
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

const result = pipe(
  1,
  (n) => n + 1,
  (n) => n * 2,
  (n) => `result: ${n}`,
);

console.log(result); // "result: 4"
```

**Example** (Chaining methods before conversion)

```ts
const numbers = [1, 2, 3, 4];
const double = (n: number) => n * 2;
const greaterThanFour = (n: number) => n > 4;

const result = numbers.map(double).filter(greaterThanFour);

console.log(result); // [6, 8]
```

**Example** (Rewriting method chains with pipe)

The same transformation can be written with data-last functions.

```ts
import { Array, pipe } from "effect";

const numbers = [1, 2, 3, 4];
const double = (n: number) => n * 2;
const greaterThanFour = (n: number) => n > 4;

const result = pipe(
  numbers,
  Array.map(double),
  Array.filter(greaterThanFour),
);

console.log(result); // [6, 8]
```

**Example** (Chaining arithmetic operations)

```ts
import { pipe } from "effect";

// Define simple arithmetic operations
const increment = (x: number) => x + 1;
const double = (x: number) => x * 2;
const subtractTen = (x: number) => x - 10;

// Sequentially apply these operations using `pipe`
const result = pipe(5, increment, double, subtractTen);

console.log(result);
// Output: 2
```

**Example** (Building a simple transformation pipeline)

```ts
import { pipe } from "effect";

// Simple transformation pipeline
const result = pipe(
  5,
  (x) => x * 2, // 10
  (x) => x + 1, // 11
  (x) => x.toString(), // "11"
);

console.log(result); // "11"
```

### Type Parameters

| Type Parameter | Default type |
| -------------- | ------------ |
| `A`            | -            |
| `B`            | `never`      |
| `C`            | `never`      |
| `D`            | `never`      |
| `E`            | `never`      |
| `F`            | `never`      |
| `G`            | `never`      |
| `H`            | `never`      |
| `I`            | `never`      |
| `J`            | `never`      |
| `K`            | `never`      |
| `L`            | `never`      |
| `M`            | `never`      |
| `N`            | `never`      |
| `O`            | `never`      |
| `P`            | `never`      |
| `Q`            | `never`      |

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
function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R>(
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

const result = pipe(
  1,
  (n) => n + 1,
  (n) => n * 2,
  (n) => `result: ${n}`,
);

console.log(result); // "result: 4"
```

**Example** (Chaining methods before conversion)

```ts
const numbers = [1, 2, 3, 4];
const double = (n: number) => n * 2;
const greaterThanFour = (n: number) => n > 4;

const result = numbers.map(double).filter(greaterThanFour);

console.log(result); // [6, 8]
```

**Example** (Rewriting method chains with pipe)

The same transformation can be written with data-last functions.

```ts
import { Array, pipe } from "effect";

const numbers = [1, 2, 3, 4];
const double = (n: number) => n * 2;
const greaterThanFour = (n: number) => n > 4;

const result = pipe(
  numbers,
  Array.map(double),
  Array.filter(greaterThanFour),
);

console.log(result); // [6, 8]
```

**Example** (Chaining arithmetic operations)

```ts
import { pipe } from "effect";

// Define simple arithmetic operations
const increment = (x: number) => x + 1;
const double = (x: number) => x * 2;
const subtractTen = (x: number) => x - 10;

// Sequentially apply these operations using `pipe`
const result = pipe(5, increment, double, subtractTen);

console.log(result);
// Output: 2
```

**Example** (Building a simple transformation pipeline)

```ts
import { pipe } from "effect";

// Simple transformation pipeline
const result = pipe(
  5,
  (x) => x * 2, // 10
  (x) => x + 1, // 11
  (x) => x.toString(), // "11"
);

console.log(result); // "11"
```

### Type Parameters

| Type Parameter | Default type |
| -------------- | ------------ |
| `A`            | -            |
| `B`            | `never`      |
| `C`            | `never`      |
| `D`            | `never`      |
| `E`            | `never`      |
| `F`            | `never`      |
| `G`            | `never`      |
| `H`            | `never`      |
| `I`            | `never`      |
| `J`            | `never`      |
| `K`            | `never`      |
| `L`            | `never`      |
| `M`            | `never`      |
| `N`            | `never`      |
| `O`            | `never`      |
| `P`            | `never`      |
| `Q`            | `never`      |
| `R`            | `never`      |

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
function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S>(
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

const result = pipe(
  1,
  (n) => n + 1,
  (n) => n * 2,
  (n) => `result: ${n}`,
);

console.log(result); // "result: 4"
```

**Example** (Chaining methods before conversion)

```ts
const numbers = [1, 2, 3, 4];
const double = (n: number) => n * 2;
const greaterThanFour = (n: number) => n > 4;

const result = numbers.map(double).filter(greaterThanFour);

console.log(result); // [6, 8]
```

**Example** (Rewriting method chains with pipe)

The same transformation can be written with data-last functions.

```ts
import { Array, pipe } from "effect";

const numbers = [1, 2, 3, 4];
const double = (n: number) => n * 2;
const greaterThanFour = (n: number) => n > 4;

const result = pipe(
  numbers,
  Array.map(double),
  Array.filter(greaterThanFour),
);

console.log(result); // [6, 8]
```

**Example** (Chaining arithmetic operations)

```ts
import { pipe } from "effect";

// Define simple arithmetic operations
const increment = (x: number) => x + 1;
const double = (x: number) => x * 2;
const subtractTen = (x: number) => x - 10;

// Sequentially apply these operations using `pipe`
const result = pipe(5, increment, double, subtractTen);

console.log(result);
// Output: 2
```

**Example** (Building a simple transformation pipeline)

```ts
import { pipe } from "effect";

// Simple transformation pipeline
const result = pipe(
  5,
  (x) => x * 2, // 10
  (x) => x + 1, // 11
  (x) => x.toString(), // "11"
);

console.log(result); // "11"
```

### Type Parameters

| Type Parameter | Default type |
| -------------- | ------------ |
| `A`            | -            |
| `B`            | `never`      |
| `C`            | `never`      |
| `D`            | `never`      |
| `E`            | `never`      |
| `F`            | `never`      |
| `G`            | `never`      |
| `H`            | `never`      |
| `I`            | `never`      |
| `J`            | `never`      |
| `K`            | `never`      |
| `L`            | `never`      |
| `M`            | `never`      |
| `N`            | `never`      |
| `O`            | `never`      |
| `P`            | `never`      |
| `Q`            | `never`      |
| `R`            | `never`      |
| `S`            | `never`      |

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
function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T>(
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

const result = pipe(
  1,
  (n) => n + 1,
  (n) => n * 2,
  (n) => `result: ${n}`,
);

console.log(result); // "result: 4"
```

**Example** (Chaining methods before conversion)

```ts
const numbers = [1, 2, 3, 4];
const double = (n: number) => n * 2;
const greaterThanFour = (n: number) => n > 4;

const result = numbers.map(double).filter(greaterThanFour);

console.log(result); // [6, 8]
```

**Example** (Rewriting method chains with pipe)

The same transformation can be written with data-last functions.

```ts
import { Array, pipe } from "effect";

const numbers = [1, 2, 3, 4];
const double = (n: number) => n * 2;
const greaterThanFour = (n: number) => n > 4;

const result = pipe(
  numbers,
  Array.map(double),
  Array.filter(greaterThanFour),
);

console.log(result); // [6, 8]
```

**Example** (Chaining arithmetic operations)

```ts
import { pipe } from "effect";

// Define simple arithmetic operations
const increment = (x: number) => x + 1;
const double = (x: number) => x * 2;
const subtractTen = (x: number) => x - 10;

// Sequentially apply these operations using `pipe`
const result = pipe(5, increment, double, subtractTen);

console.log(result);
// Output: 2
```

**Example** (Building a simple transformation pipeline)

```ts
import { pipe } from "effect";

// Simple transformation pipeline
const result = pipe(
  5,
  (x) => x * 2, // 10
  (x) => x + 1, // 11
  (x) => x.toString(), // "11"
);

console.log(result); // "11"
```

### Type Parameters

| Type Parameter | Default type |
| -------------- | ------------ |
| `A`            | -            |
| `B`            | `never`      |
| `C`            | `never`      |
| `D`            | `never`      |
| `E`            | `never`      |
| `F`            | `never`      |
| `G`            | `never`      |
| `H`            | `never`      |
| `I`            | `never`      |
| `J`            | `never`      |
| `K`            | `never`      |
| `L`            | `never`      |
| `M`            | `never`      |
| `N`            | `never`      |
| `O`            | `never`      |
| `P`            | `never`      |
| `Q`            | `never`      |
| `R`            | `never`      |
| `S`            | `never`      |
| `T`            | `never`      |

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
