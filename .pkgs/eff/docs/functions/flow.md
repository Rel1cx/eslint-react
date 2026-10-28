[@local/eff](../README.md) / flow

# Function: flow()

## Call Signature

```ts
function flow<A extends readonly unknown[], B = never>(ab: (...a: A) => B): (...a: A) => B;
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
import { flow } from "@local/eff";

const len = (s: string): number => s.length;
const double = (n: number): number => n * 2;

const f = flow(len, double);

f("aaa"); // => 6
```

### Type Parameters

| Type Parameter                                                   | Default type |
| ---------------------------------------------------------------- | ------------ |
| <a id="type-parameter-a"></a> `A` _extends_ readonly `unknown`[] | -            |
| <a id="type-parameter-b"></a> `B`                                | `never`      |

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
function flow<A extends readonly unknown[], B = never, C = never>(ab: (...a: A) => B, bc: (b: B) => C): (...a: A) => C;
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
import { flow } from "@local/eff";

const len = (s: string): number => s.length;
const double = (n: number): number => n * 2;

const f = flow(len, double);

f("aaa"); // => 6
```

### Type Parameters

| Type Parameter                                                     | Default type |
| ------------------------------------------------------------------ | ------------ |
| <a id="type-parameter-a-1"></a> `A` _extends_ readonly `unknown`[] | -            |
| <a id="type-parameter-b-1"></a> `B`                                | `never`      |
| <a id="type-parameter-c"></a> `C`                                  | `never`      |

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
function flow<A extends readonly unknown[], B = never, C = never, D = never>(ab: (...a: A) => B, bc: (b: B) => C, cd: (c: C) => D): (...a: A) => D;
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
import { flow } from "@local/eff";

const len = (s: string): number => s.length;
const double = (n: number): number => n * 2;

const f = flow(len, double);

f("aaa"); // => 6
```

### Type Parameters

| Type Parameter                                                     | Default type |
| ------------------------------------------------------------------ | ------------ |
| <a id="type-parameter-a-2"></a> `A` _extends_ readonly `unknown`[] | -            |
| <a id="type-parameter-b-2"></a> `B`                                | `never`      |
| <a id="type-parameter-c-1"></a> `C`                                | `never`      |
| <a id="type-parameter-d"></a> `D`                                  | `never`      |

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
function flow<A extends readonly unknown[], B = never, C = never, D = never, E = never>(
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
import { flow } from "@local/eff";

const len = (s: string): number => s.length;
const double = (n: number): number => n * 2;

const f = flow(len, double);

f("aaa"); // => 6
```

### Type Parameters

| Type Parameter                                                     | Default type |
| ------------------------------------------------------------------ | ------------ |
| <a id="type-parameter-a-3"></a> `A` _extends_ readonly `unknown`[] | -            |
| <a id="type-parameter-b-3"></a> `B`                                | `never`      |
| <a id="type-parameter-c-2"></a> `C`                                | `never`      |
| <a id="type-parameter-d-1"></a> `D`                                | `never`      |
| <a id="type-parameter-e"></a> `E`                                  | `never`      |

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
function flow<A extends readonly unknown[], B = never, C = never, D = never, E = never, F = never>(
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
import { flow } from "@local/eff";

const len = (s: string): number => s.length;
const double = (n: number): number => n * 2;

const f = flow(len, double);

f("aaa"); // => 6
```

### Type Parameters

| Type Parameter                                                     | Default type |
| ------------------------------------------------------------------ | ------------ |
| <a id="type-parameter-a-4"></a> `A` _extends_ readonly `unknown`[] | -            |
| <a id="type-parameter-b-4"></a> `B`                                | `never`      |
| <a id="type-parameter-c-3"></a> `C`                                | `never`      |
| <a id="type-parameter-d-2"></a> `D`                                | `never`      |
| <a id="type-parameter-e-1"></a> `E`                                | `never`      |
| <a id="type-parameter-f"></a> `F`                                  | `never`      |

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
function flow<A extends readonly unknown[], B = never, C = never, D = never, E = never, F = never, G = never>(
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
import { flow } from "@local/eff";

const len = (s: string): number => s.length;
const double = (n: number): number => n * 2;

const f = flow(len, double);

f("aaa"); // => 6
```

### Type Parameters

| Type Parameter                                                     | Default type |
| ------------------------------------------------------------------ | ------------ |
| <a id="type-parameter-a-5"></a> `A` _extends_ readonly `unknown`[] | -            |
| <a id="type-parameter-b-5"></a> `B`                                | `never`      |
| <a id="type-parameter-c-4"></a> `C`                                | `never`      |
| <a id="type-parameter-d-3"></a> `D`                                | `never`      |
| <a id="type-parameter-e-2"></a> `E`                                | `never`      |
| <a id="type-parameter-f-1"></a> `F`                                | `never`      |
| <a id="type-parameter-g"></a> `G`                                  | `never`      |

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
function flow<A extends readonly unknown[], B = never, C = never, D = never, E = never, F = never, G = never, H = never>(
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
import { flow } from "@local/eff";

const len = (s: string): number => s.length;
const double = (n: number): number => n * 2;

const f = flow(len, double);

f("aaa"); // => 6
```

### Type Parameters

| Type Parameter                                                     | Default type |
| ------------------------------------------------------------------ | ------------ |
| <a id="type-parameter-a-6"></a> `A` _extends_ readonly `unknown`[] | -            |
| <a id="type-parameter-b-6"></a> `B`                                | `never`      |
| <a id="type-parameter-c-5"></a> `C`                                | `never`      |
| <a id="type-parameter-d-4"></a> `D`                                | `never`      |
| <a id="type-parameter-e-3"></a> `E`                                | `never`      |
| <a id="type-parameter-f-2"></a> `F`                                | `never`      |
| <a id="type-parameter-g-1"></a> `G`                                | `never`      |
| <a id="type-parameter-h"></a> `H`                                  | `never`      |

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
function flow<A extends readonly unknown[], B = never, C = never, D = never, E = never, F = never, G = never, H = never, I = never>(
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
import { flow } from "@local/eff";

const len = (s: string): number => s.length;
const double = (n: number): number => n * 2;

const f = flow(len, double);

f("aaa"); // => 6
```

### Type Parameters

| Type Parameter                                                     | Default type |
| ------------------------------------------------------------------ | ------------ |
| <a id="type-parameter-a-7"></a> `A` _extends_ readonly `unknown`[] | -            |
| <a id="type-parameter-b-7"></a> `B`                                | `never`      |
| <a id="type-parameter-c-6"></a> `C`                                | `never`      |
| <a id="type-parameter-d-5"></a> `D`                                | `never`      |
| <a id="type-parameter-e-4"></a> `E`                                | `never`      |
| <a id="type-parameter-f-3"></a> `F`                                | `never`      |
| <a id="type-parameter-g-2"></a> `G`                                | `never`      |
| <a id="type-parameter-h-1"></a> `H`                                | `never`      |
| <a id="type-parameter-i"></a> `I`                                  | `never`      |

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
function flow<A extends readonly unknown[], B = never, C = never, D = never, E = never, F = never, G = never, H = never, I = never, J = never>(
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
import { flow } from "@local/eff";

const len = (s: string): number => s.length;
const double = (n: number): number => n * 2;

const f = flow(len, double);

f("aaa"); // => 6
```

### Type Parameters

| Type Parameter                                                     | Default type |
| ------------------------------------------------------------------ | ------------ |
| <a id="type-parameter-a-8"></a> `A` _extends_ readonly `unknown`[] | -            |
| <a id="type-parameter-b-8"></a> `B`                                | `never`      |
| <a id="type-parameter-c-7"></a> `C`                                | `never`      |
| <a id="type-parameter-d-6"></a> `D`                                | `never`      |
| <a id="type-parameter-e-5"></a> `E`                                | `never`      |
| <a id="type-parameter-f-4"></a> `F`                                | `never`      |
| <a id="type-parameter-g-3"></a> `G`                                | `never`      |
| <a id="type-parameter-h-2"></a> `H`                                | `never`      |
| <a id="type-parameter-i-1"></a> `I`                                | `never`      |
| <a id="type-parameter-j"></a> `J`                                  | `never`      |

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
