[@local/eff](../README.md) / flow

# Function: flow()

## Call Signature

```ts
function flow<A, B>(ab: (...a: A) => B): (...a: A) => B;
```

Performs left-to-right function composition. The first argument may have any arity, the remaining arguments must be unary.

See also [`pipe`](#pipe).

### Type Parameters

| Type Parameter                     | Default type |
| ---------------------------------- | ------------ |
| `A` _extends_ readonly `unknown`[] | -            |
| `B`                                | `never`      |

### Parameters

| Parameter | Type                 | Description                  |
| --------- | -------------------- | ---------------------------- |
| `ab`      | (...`a`: `A`) => `B` | The first function to apply. |

### Returns

A composed function that applies all given functions in sequence.

(...`a`: `A`) => `B`

### Example

```ts
import { flow } from "effect/Function";
import * as assert from "node:assert";

const len = (s: string): number => s.length;
const double = (n: number): number => n * 2;

const f = flow(len, double);

assert.strictEqual(f("aaa"), 6);
```

### Since

1.0.0

## Call Signature

```ts
function flow<A, B, C>(ab: (...a: A) => B, bc: (b: B) => C): (...a: A) => C;
```

Performs left-to-right function composition. The first argument may have any arity, the remaining arguments must be unary.

See also [`pipe`](#pipe).

### Type Parameters

| Type Parameter                     | Default type |
| ---------------------------------- | ------------ |
| `A` _extends_ readonly `unknown`[] | -            |
| `B`                                | `never`      |
| `C`                                | `never`      |

### Parameters

| Parameter | Type                 | Description                   |
| --------- | -------------------- | ----------------------------- |
| `ab`      | (...`a`: `A`) => `B` | The first function to apply.  |
| `bc`      | (`b`: `B`) => `C`    | The second function to apply. |

### Returns

A composed function that applies all given functions in sequence.

(...`a`: `A`) => `C`

### Example

```ts
import { flow } from "effect/Function";
import * as assert from "node:assert";

const len = (s: string): number => s.length;
const double = (n: number): number => n * 2;

const f = flow(len, double);

assert.strictEqual(f("aaa"), 6);
```

### Since

1.0.0

## Call Signature

```ts
function flow<A, B, C, D>(
  ab: (...a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
): (...a: A) => D;
```

Performs left-to-right function composition. The first argument may have any arity, the remaining arguments must be unary.

See also [`pipe`](#pipe).

### Type Parameters

| Type Parameter                     | Default type |
| ---------------------------------- | ------------ |
| `A` _extends_ readonly `unknown`[] | -            |
| `B`                                | `never`      |
| `C`                                | `never`      |
| `D`                                | `never`      |

### Parameters

| Parameter | Type                 | Description                   |
| --------- | -------------------- | ----------------------------- |
| `ab`      | (...`a`: `A`) => `B` | The first function to apply.  |
| `bc`      | (`b`: `B`) => `C`    | The second function to apply. |
| `cd`      | (`c`: `C`) => `D`    | The third function to apply.  |

### Returns

A composed function that applies all given functions in sequence.

(...`a`: `A`) => `D`

### Example

```ts
import { flow } from "effect/Function";
import * as assert from "node:assert";

const len = (s: string): number => s.length;
const double = (n: number): number => n * 2;

const f = flow(len, double);

assert.strictEqual(f("aaa"), 6);
```

### Since

1.0.0

## Call Signature

```ts
function flow<A, B, C, D, E>(
  ab: (...a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
): (...a: A) => E;
```

Performs left-to-right function composition. The first argument may have any arity, the remaining arguments must be unary.

See also [`pipe`](#pipe).

### Type Parameters

| Type Parameter                     | Default type |
| ---------------------------------- | ------------ |
| `A` _extends_ readonly `unknown`[] | -            |
| `B`                                | `never`      |
| `C`                                | `never`      |
| `D`                                | `never`      |
| `E`                                | `never`      |

### Parameters

| Parameter | Type                 | Description                   |
| --------- | -------------------- | ----------------------------- |
| `ab`      | (...`a`: `A`) => `B` | The first function to apply.  |
| `bc`      | (`b`: `B`) => `C`    | The second function to apply. |
| `cd`      | (`c`: `C`) => `D`    | The third function to apply.  |
| `de`      | (`d`: `D`) => `E`    | The fourth function to apply. |

### Returns

A composed function that applies all given functions in sequence.

(...`a`: `A`) => `E`

### Example

```ts
import { flow } from "effect/Function";
import * as assert from "node:assert";

const len = (s: string): number => s.length;
const double = (n: number): number => n * 2;

const f = flow(len, double);

assert.strictEqual(f("aaa"), 6);
```

### Since

1.0.0

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

Performs left-to-right function composition. The first argument may have any arity, the remaining arguments must be unary.

See also [`pipe`](#pipe).

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

| Parameter | Type                 | Description                   |
| --------- | -------------------- | ----------------------------- |
| `ab`      | (...`a`: `A`) => `B` | The first function to apply.  |
| `bc`      | (`b`: `B`) => `C`    | The second function to apply. |
| `cd`      | (`c`: `C`) => `D`    | The third function to apply.  |
| `de`      | (`d`: `D`) => `E`    | The fourth function to apply. |
| `ef`      | (`e`: `E`) => `F`    | The fifth function to apply.  |

### Returns

A composed function that applies all given functions in sequence.

(...`a`: `A`) => `F`

### Example

```ts
import { flow } from "effect/Function";
import * as assert from "node:assert";

const len = (s: string): number => s.length;
const double = (n: number): number => n * 2;

const f = flow(len, double);

assert.strictEqual(f("aaa"), 6);
```

### Since

1.0.0

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

Performs left-to-right function composition. The first argument may have any arity, the remaining arguments must be unary.

See also [`pipe`](#pipe).

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

| Parameter | Type                 | Description                   |
| --------- | -------------------- | ----------------------------- |
| `ab`      | (...`a`: `A`) => `B` | The first function to apply.  |
| `bc`      | (`b`: `B`) => `C`    | The second function to apply. |
| `cd`      | (`c`: `C`) => `D`    | The third function to apply.  |
| `de`      | (`d`: `D`) => `E`    | The fourth function to apply. |
| `ef`      | (`e`: `E`) => `F`    | The fifth function to apply.  |
| `fg`      | (`f`: `F`) => `G`    | The sixth function to apply.  |

### Returns

A composed function that applies all given functions in sequence.

(...`a`: `A`) => `G`

### Example

```ts
import { flow } from "effect/Function";
import * as assert from "node:assert";

const len = (s: string): number => s.length;
const double = (n: number): number => n * 2;

const f = flow(len, double);

assert.strictEqual(f("aaa"), 6);
```

### Since

1.0.0

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

Performs left-to-right function composition. The first argument may have any arity, the remaining arguments must be unary.

See also [`pipe`](#pipe).

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

| Parameter | Type                 | Description                    |
| --------- | -------------------- | ------------------------------ |
| `ab`      | (...`a`: `A`) => `B` | The first function to apply.   |
| `bc`      | (`b`: `B`) => `C`    | The second function to apply.  |
| `cd`      | (`c`: `C`) => `D`    | The third function to apply.   |
| `de`      | (`d`: `D`) => `E`    | The fourth function to apply.  |
| `ef`      | (`e`: `E`) => `F`    | The fifth function to apply.   |
| `fg`      | (`f`: `F`) => `G`    | The sixth function to apply.   |
| `gh`      | (`g`: `G`) => `H`    | The seventh function to apply. |

### Returns

A composed function that applies all given functions in sequence.

(...`a`: `A`) => `H`

### Example

```ts
import { flow } from "effect/Function";
import * as assert from "node:assert";

const len = (s: string): number => s.length;
const double = (n: number): number => n * 2;

const f = flow(len, double);

assert.strictEqual(f("aaa"), 6);
```

### Since

1.0.0

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

Performs left-to-right function composition. The first argument may have any arity, the remaining arguments must be unary.

See also [`pipe`](#pipe).

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

| Parameter | Type                 | Description                    |
| --------- | -------------------- | ------------------------------ |
| `ab`      | (...`a`: `A`) => `B` | The first function to apply.   |
| `bc`      | (`b`: `B`) => `C`    | The second function to apply.  |
| `cd`      | (`c`: `C`) => `D`    | The third function to apply.   |
| `de`      | (`d`: `D`) => `E`    | The fourth function to apply.  |
| `ef`      | (`e`: `E`) => `F`    | The fifth function to apply.   |
| `fg`      | (`f`: `F`) => `G`    | The sixth function to apply.   |
| `gh`      | (`g`: `G`) => `H`    | The seventh function to apply. |
| `hi`      | (`h`: `H`) => `I`    | The eighth function to apply.  |

### Returns

A composed function that applies all given functions in sequence.

(...`a`: `A`) => `I`

### Example

```ts
import { flow } from "effect/Function";
import * as assert from "node:assert";

const len = (s: string): number => s.length;
const double = (n: number): number => n * 2;

const f = flow(len, double);

assert.strictEqual(f("aaa"), 6);
```

### Since

1.0.0

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

Performs left-to-right function composition. The first argument may have any arity, the remaining arguments must be unary.

See also [`pipe`](#pipe).

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

| Parameter | Type                 | Description                    |
| --------- | -------------------- | ------------------------------ |
| `ab`      | (...`a`: `A`) => `B` | The first function to apply.   |
| `bc`      | (`b`: `B`) => `C`    | The second function to apply.  |
| `cd`      | (`c`: `C`) => `D`    | The third function to apply.   |
| `de`      | (`d`: `D`) => `E`    | The fourth function to apply.  |
| `ef`      | (`e`: `E`) => `F`    | The fifth function to apply.   |
| `fg`      | (`f`: `F`) => `G`    | The sixth function to apply.   |
| `gh`      | (`g`: `G`) => `H`    | The seventh function to apply. |
| `hi`      | (`h`: `H`) => `I`    | The eighth function to apply.  |
| `ij`      | (`i`: `I`) => `J`    | The ninth function to apply.   |

### Returns

A composed function that applies all given functions in sequence.

(...`a`: `A`) => `J`

### Example

```ts
import { flow } from "effect/Function";
import * as assert from "node:assert";

const len = (s: string): number => s.length;
const double = (n: number): number => n * 2;

const f = flow(len, double);

assert.strictEqual(f("aaa"), 6);
```

### Since

1.0.0
