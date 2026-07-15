[@local/eff](../README.md) / flow

# Function: flow()

## Call Signature

```ts
function flow<A, B>(ab: (...a: A) => B): (...a: A) => B;
```

Performs left-to-right function composition.

**When to use**

Use to build a reusable function from a left-to-right sequence of
transformations.

**Details**

The first function may have any arity. Every following function must be
unary.

**Example** (Composing functions left to right)

```ts
import { flow } from "effect";
import * as assert from "node:assert";

const len = (s: string): number => s.length;
const double = (n: number): number => n * 2;

const f = flow(len, double);

assert.strictEqual(f("aaa"), 6);
```

### Type Parameters

| Type Parameter                     | Default type |
| ---------------------------------- | ------------ |
| `A` _extends_ readonly `unknown`[] | -            |
| `B`                                | `never`      |

### Parameters

| Parameter | Type                 |
| --------- | -------------------- |
| `ab`      | (...`a`: `A`) => `B` |

### Returns

(...`a`: `A`) => `B`

### See

- [pipe](pipe.md) for applying a value through a left-to-right sequence immediately
- [compose](../variables/compose.md) for composing exactly two functions

### Since

2.0.0

## Call Signature

```ts
function flow<A, B, C>(ab: (...a: A) => B, bc: (b: B) => C): (...a: A) => C;
```

Performs left-to-right function composition.

**When to use**

Use to build a reusable function from a left-to-right sequence of
transformations.

**Details**

The first function may have any arity. Every following function must be
unary.

**Example** (Composing functions left to right)

```ts
import { flow } from "effect";
import * as assert from "node:assert";

const len = (s: string): number => s.length;
const double = (n: number): number => n * 2;

const f = flow(len, double);

assert.strictEqual(f("aaa"), 6);
```

### Type Parameters

| Type Parameter                     | Default type |
| ---------------------------------- | ------------ |
| `A` _extends_ readonly `unknown`[] | -            |
| `B`                                | `never`      |
| `C`                                | `never`      |

### Parameters

| Parameter | Type                 |
| --------- | -------------------- |
| `ab`      | (...`a`: `A`) => `B` |
| `bc`      | (`b`: `B`) => `C`    |

### Returns

(...`a`: `A`) => `C`

### See

- [pipe](pipe.md) for applying a value through a left-to-right sequence immediately
- [compose](../variables/compose.md) for composing exactly two functions

### Since

2.0.0

## Call Signature

```ts
function flow<A, B, C, D>(
  ab: (...a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
): (...a: A) => D;
```

Performs left-to-right function composition.

**When to use**

Use to build a reusable function from a left-to-right sequence of
transformations.

**Details**

The first function may have any arity. Every following function must be
unary.

**Example** (Composing functions left to right)

```ts
import { flow } from "effect";
import * as assert from "node:assert";

const len = (s: string): number => s.length;
const double = (n: number): number => n * 2;

const f = flow(len, double);

assert.strictEqual(f("aaa"), 6);
```

### Type Parameters

| Type Parameter                     | Default type |
| ---------------------------------- | ------------ |
| `A` _extends_ readonly `unknown`[] | -            |
| `B`                                | `never`      |
| `C`                                | `never`      |
| `D`                                | `never`      |

### Parameters

| Parameter | Type                 |
| --------- | -------------------- |
| `ab`      | (...`a`: `A`) => `B` |
| `bc`      | (`b`: `B`) => `C`    |
| `cd`      | (`c`: `C`) => `D`    |

### Returns

(...`a`: `A`) => `D`

### See

- [pipe](pipe.md) for applying a value through a left-to-right sequence immediately
- [compose](../variables/compose.md) for composing exactly two functions

### Since

2.0.0

## Call Signature

```ts
function flow<A, B, C, D, E>(
  ab: (...a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
): (...a: A) => E;
```

Performs left-to-right function composition.

**When to use**

Use to build a reusable function from a left-to-right sequence of
transformations.

**Details**

The first function may have any arity. Every following function must be
unary.

**Example** (Composing functions left to right)

```ts
import { flow } from "effect";
import * as assert from "node:assert";

const len = (s: string): number => s.length;
const double = (n: number): number => n * 2;

const f = flow(len, double);

assert.strictEqual(f("aaa"), 6);
```

### Type Parameters

| Type Parameter                     | Default type |
| ---------------------------------- | ------------ |
| `A` _extends_ readonly `unknown`[] | -            |
| `B`                                | `never`      |
| `C`                                | `never`      |
| `D`                                | `never`      |
| `E`                                | `never`      |

### Parameters

| Parameter | Type                 |
| --------- | -------------------- |
| `ab`      | (...`a`: `A`) => `B` |
| `bc`      | (`b`: `B`) => `C`    |
| `cd`      | (`c`: `C`) => `D`    |
| `de`      | (`d`: `D`) => `E`    |

### Returns

(...`a`: `A`) => `E`

### See

- [pipe](pipe.md) for applying a value through a left-to-right sequence immediately
- [compose](../variables/compose.md) for composing exactly two functions

### Since

2.0.0

## Call Signature

```ts
function flow<A, B, C, D, E, F>(
  ab: (...a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
): (...a: A) => F;
```

Performs left-to-right function composition.

**When to use**

Use to build a reusable function from a left-to-right sequence of
transformations.

**Details**

The first function may have any arity. Every following function must be
unary.

**Example** (Composing functions left to right)

```ts
import { flow } from "effect";
import * as assert from "node:assert";

const len = (s: string): number => s.length;
const double = (n: number): number => n * 2;

const f = flow(len, double);

assert.strictEqual(f("aaa"), 6);
```

### Type Parameters

| Type Parameter                     | Default type |
| ---------------------------------- | ------------ |
| `A` _extends_ readonly `unknown`[] | -            |
| `B`                                | `never`      |
| `C`                                | `never`      |
| `D`                                | `never`      |
| `E`                                | `never`      |
| `F`                                | `never`      |

### Parameters

| Parameter | Type                 |
| --------- | -------------------- |
| `ab`      | (...`a`: `A`) => `B` |
| `bc`      | (`b`: `B`) => `C`    |
| `cd`      | (`c`: `C`) => `D`    |
| `de`      | (`d`: `D`) => `E`    |
| `ef`      | (`e`: `E`) => `F`    |

### Returns

(...`a`: `A`) => `F`

### See

- [pipe](pipe.md) for applying a value through a left-to-right sequence immediately
- [compose](../variables/compose.md) for composing exactly two functions

### Since

2.0.0

## Call Signature

```ts
function flow<A, B, C, D, E, F, G>(
  ab: (...a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
): (...a: A) => G;
```

Performs left-to-right function composition.

**When to use**

Use to build a reusable function from a left-to-right sequence of
transformations.

**Details**

The first function may have any arity. Every following function must be
unary.

**Example** (Composing functions left to right)

```ts
import { flow } from "effect";
import * as assert from "node:assert";

const len = (s: string): number => s.length;
const double = (n: number): number => n * 2;

const f = flow(len, double);

assert.strictEqual(f("aaa"), 6);
```

### Type Parameters

| Type Parameter                     | Default type |
| ---------------------------------- | ------------ |
| `A` _extends_ readonly `unknown`[] | -            |
| `B`                                | `never`      |
| `C`                                | `never`      |
| `D`                                | `never`      |
| `E`                                | `never`      |
| `F`                                | `never`      |
| `G`                                | `never`      |

### Parameters

| Parameter | Type                 |
| --------- | -------------------- |
| `ab`      | (...`a`: `A`) => `B` |
| `bc`      | (`b`: `B`) => `C`    |
| `cd`      | (`c`: `C`) => `D`    |
| `de`      | (`d`: `D`) => `E`    |
| `ef`      | (`e`: `E`) => `F`    |
| `fg`      | (`f`: `F`) => `G`    |

### Returns

(...`a`: `A`) => `G`

### See

- [pipe](pipe.md) for applying a value through a left-to-right sequence immediately
- [compose](../variables/compose.md) for composing exactly two functions

### Since

2.0.0

## Call Signature

```ts
function flow<A, B, C, D, E, F, G, H>(
  ab: (...a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
): (...a: A) => H;
```

Performs left-to-right function composition.

**When to use**

Use to build a reusable function from a left-to-right sequence of
transformations.

**Details**

The first function may have any arity. Every following function must be
unary.

**Example** (Composing functions left to right)

```ts
import { flow } from "effect";
import * as assert from "node:assert";

const len = (s: string): number => s.length;
const double = (n: number): number => n * 2;

const f = flow(len, double);

assert.strictEqual(f("aaa"), 6);
```

### Type Parameters

| Type Parameter                     | Default type |
| ---------------------------------- | ------------ |
| `A` _extends_ readonly `unknown`[] | -            |
| `B`                                | `never`      |
| `C`                                | `never`      |
| `D`                                | `never`      |
| `E`                                | `never`      |
| `F`                                | `never`      |
| `G`                                | `never`      |
| `H`                                | `never`      |

### Parameters

| Parameter | Type                 |
| --------- | -------------------- |
| `ab`      | (...`a`: `A`) => `B` |
| `bc`      | (`b`: `B`) => `C`    |
| `cd`      | (`c`: `C`) => `D`    |
| `de`      | (`d`: `D`) => `E`    |
| `ef`      | (`e`: `E`) => `F`    |
| `fg`      | (`f`: `F`) => `G`    |
| `gh`      | (`g`: `G`) => `H`    |

### Returns

(...`a`: `A`) => `H`

### See

- [pipe](pipe.md) for applying a value through a left-to-right sequence immediately
- [compose](../variables/compose.md) for composing exactly two functions

### Since

2.0.0

## Call Signature

```ts
function flow<A, B, C, D, E, F, G, H, I>(
  ab: (...a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
): (...a: A) => I;
```

Performs left-to-right function composition.

**When to use**

Use to build a reusable function from a left-to-right sequence of
transformations.

**Details**

The first function may have any arity. Every following function must be
unary.

**Example** (Composing functions left to right)

```ts
import { flow } from "effect";
import * as assert from "node:assert";

const len = (s: string): number => s.length;
const double = (n: number): number => n * 2;

const f = flow(len, double);

assert.strictEqual(f("aaa"), 6);
```

### Type Parameters

| Type Parameter                     | Default type |
| ---------------------------------- | ------------ |
| `A` _extends_ readonly `unknown`[] | -            |
| `B`                                | `never`      |
| `C`                                | `never`      |
| `D`                                | `never`      |
| `E`                                | `never`      |
| `F`                                | `never`      |
| `G`                                | `never`      |
| `H`                                | `never`      |
| `I`                                | `never`      |

### Parameters

| Parameter | Type                 |
| --------- | -------------------- |
| `ab`      | (...`a`: `A`) => `B` |
| `bc`      | (`b`: `B`) => `C`    |
| `cd`      | (`c`: `C`) => `D`    |
| `de`      | (`d`: `D`) => `E`    |
| `ef`      | (`e`: `E`) => `F`    |
| `fg`      | (`f`: `F`) => `G`    |
| `gh`      | (`g`: `G`) => `H`    |
| `hi`      | (`h`: `H`) => `I`    |

### Returns

(...`a`: `A`) => `I`

### See

- [pipe](pipe.md) for applying a value through a left-to-right sequence immediately
- [compose](../variables/compose.md) for composing exactly two functions

### Since

2.0.0

## Call Signature

```ts
function flow<A, B, C, D, E, F, G, H, I, J>(
  ab: (...a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
): (...a: A) => J;
```

Performs left-to-right function composition.

**When to use**

Use to build a reusable function from a left-to-right sequence of
transformations.

**Details**

The first function may have any arity. Every following function must be
unary.

**Example** (Composing functions left to right)

```ts
import { flow } from "effect";
import * as assert from "node:assert";

const len = (s: string): number => s.length;
const double = (n: number): number => n * 2;

const f = flow(len, double);

assert.strictEqual(f("aaa"), 6);
```

### Type Parameters

| Type Parameter                     | Default type |
| ---------------------------------- | ------------ |
| `A` _extends_ readonly `unknown`[] | -            |
| `B`                                | `never`      |
| `C`                                | `never`      |
| `D`                                | `never`      |
| `E`                                | `never`      |
| `F`                                | `never`      |
| `G`                                | `never`      |
| `H`                                | `never`      |
| `I`                                | `never`      |
| `J`                                | `never`      |

### Parameters

| Parameter | Type                 |
| --------- | -------------------- |
| `ab`      | (...`a`: `A`) => `B` |
| `bc`      | (`b`: `B`) => `C`    |
| `cd`      | (`c`: `C`) => `D`    |
| `de`      | (`d`: `D`) => `E`    |
| `ef`      | (`e`: `E`) => `F`    |
| `fg`      | (`f`: `F`) => `G`    |
| `gh`      | (`g`: `G`) => `H`    |
| `hi`      | (`h`: `H`) => `I`    |
| `ij`      | (`i`: `I`) => `J`    |

### Returns

(...`a`: `A`) => `J`

### See

- [pipe](pipe.md) for applying a value through a left-to-right sequence immediately
- [compose](../variables/compose.md) for composing exactly two functions

### Since

2.0.0
