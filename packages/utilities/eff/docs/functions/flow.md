[@eslint-react/eff](../README.md) / flow

# Function: flow()

## Call Signature

```ts
function flow<A, B>(ab: (...a: A) => B): (...a: A) => B;
```

Performs left-to-right function composition. The first argument may have any arity, the remaining arguments must be unary.

See also [`pipe`](#pipe).

### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `A` *extends* readonly `unknown`[] | - |
| `B` | `never` |

### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `ab` | (...`a`: `A`) => `B` | The first function to apply. |

### Returns

```ts
(...a: A): B;
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| ...`a` | `A` |

#### Returns

`B`

### Example

```ts
import * as assert from "node:assert"
import { flow } from "effect/Function"

const len = (s: string): number => s.length
const double = (n: number): number => n * 2

const f = flow(len, double)

assert.strictEqual(f('aaa'), 6)
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

| Type Parameter | Default type |
| ------ | ------ |
| `A` *extends* readonly `unknown`[] | - |
| `B` | `never` |
| `C` | `never` |

### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `ab` | (...`a`: `A`) => `B` | The first function to apply. |
| `bc` | (`b`: `B`) => `C` |  |

### Returns

```ts
(...a: A): C;
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| ...`a` | `A` |

#### Returns

`C`

### Example

```ts
import * as assert from "node:assert"
import { flow } from "effect/Function"

const len = (s: string): number => s.length
const double = (n: number): number => n * 2

const f = flow(len, double)

assert.strictEqual(f('aaa'), 6)
```

### Since

1.0.0

## Call Signature

```ts
function flow<A, B, C, D>(
   ab: (...a: A) => B, 
   bc: (b: B) => C, 
   cd: (c: C) => D): (...a: A) => D;
```

Performs left-to-right function composition. The first argument may have any arity, the remaining arguments must be unary.

See also [`pipe`](#pipe).

### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `A` *extends* readonly `unknown`[] | - |
| `B` | `never` |
| `C` | `never` |
| `D` | `never` |

### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `ab` | (...`a`: `A`) => `B` | The first function to apply. |
| `bc` | (`b`: `B`) => `C` |  |
| `cd` | (`c`: `C`) => `D` |  |

### Returns

```ts
(...a: A): D;
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| ...`a` | `A` |

#### Returns

`D`

### Example

```ts
import * as assert from "node:assert"
import { flow } from "effect/Function"

const len = (s: string): number => s.length
const double = (n: number): number => n * 2

const f = flow(len, double)

assert.strictEqual(f('aaa'), 6)
```

### Since

1.0.0

## Call Signature

```ts
function flow<A, B, C, D, E>(
   ab: (...a: A) => B, 
   bc: (b: B) => C, 
   cd: (c: C) => D, 
   de: (d: D) => E): (...a: A) => E;
```

Performs left-to-right function composition. The first argument may have any arity, the remaining arguments must be unary.

See also [`pipe`](#pipe).

### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `A` *extends* readonly `unknown`[] | - |
| `B` | `never` |
| `C` | `never` |
| `D` | `never` |
| `E` | `never` |

### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `ab` | (...`a`: `A`) => `B` | The first function to apply. |
| `bc` | (`b`: `B`) => `C` |  |
| `cd` | (`c`: `C`) => `D` |  |
| `de` | (`d`: `D`) => `E` |  |

### Returns

```ts
(...a: A): E;
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| ...`a` | `A` |

#### Returns

`E`

### Example

```ts
import * as assert from "node:assert"
import { flow } from "effect/Function"

const len = (s: string): number => s.length
const double = (n: number): number => n * 2

const f = flow(len, double)

assert.strictEqual(f('aaa'), 6)
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
   ef: (e: E) => F): (...a: A) => F;
```

Performs left-to-right function composition. The first argument may have any arity, the remaining arguments must be unary.

See also [`pipe`](#pipe).

### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `A` *extends* readonly `unknown`[] | - |
| `B` | `never` |
| `C` | `never` |
| `D` | `never` |
| `E` | `never` |
| `F` | `never` |

### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `ab` | (...`a`: `A`) => `B` | The first function to apply. |
| `bc` | (`b`: `B`) => `C` |  |
| `cd` | (`c`: `C`) => `D` |  |
| `de` | (`d`: `D`) => `E` |  |
| `ef` | (`e`: `E`) => `F` |  |

### Returns

```ts
(...a: A): F;
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| ...`a` | `A` |

#### Returns

`F`

### Example

```ts
import * as assert from "node:assert"
import { flow } from "effect/Function"

const len = (s: string): number => s.length
const double = (n: number): number => n * 2

const f = flow(len, double)

assert.strictEqual(f('aaa'), 6)
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
   fg: (f: F) => G): (...a: A) => G;
```

Performs left-to-right function composition. The first argument may have any arity, the remaining arguments must be unary.

See also [`pipe`](#pipe).

### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `A` *extends* readonly `unknown`[] | - |
| `B` | `never` |
| `C` | `never` |
| `D` | `never` |
| `E` | `never` |
| `F` | `never` |
| `G` | `never` |

### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `ab` | (...`a`: `A`) => `B` | The first function to apply. |
| `bc` | (`b`: `B`) => `C` |  |
| `cd` | (`c`: `C`) => `D` |  |
| `de` | (`d`: `D`) => `E` |  |
| `ef` | (`e`: `E`) => `F` |  |
| `fg` | (`f`: `F`) => `G` |  |

### Returns

```ts
(...a: A): G;
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| ...`a` | `A` |

#### Returns

`G`

### Example

```ts
import * as assert from "node:assert"
import { flow } from "effect/Function"

const len = (s: string): number => s.length
const double = (n: number): number => n * 2

const f = flow(len, double)

assert.strictEqual(f('aaa'), 6)
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
   gh: (g: G) => H): (...a: A) => H;
```

Performs left-to-right function composition. The first argument may have any arity, the remaining arguments must be unary.

See also [`pipe`](#pipe).

### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `A` *extends* readonly `unknown`[] | - |
| `B` | `never` |
| `C` | `never` |
| `D` | `never` |
| `E` | `never` |
| `F` | `never` |
| `G` | `never` |
| `H` | `never` |

### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `ab` | (...`a`: `A`) => `B` | The first function to apply. |
| `bc` | (`b`: `B`) => `C` |  |
| `cd` | (`c`: `C`) => `D` |  |
| `de` | (`d`: `D`) => `E` |  |
| `ef` | (`e`: `E`) => `F` |  |
| `fg` | (`f`: `F`) => `G` |  |
| `gh` | (`g`: `G`) => `H` |  |

### Returns

```ts
(...a: A): H;
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| ...`a` | `A` |

#### Returns

`H`

### Example

```ts
import * as assert from "node:assert"
import { flow } from "effect/Function"

const len = (s: string): number => s.length
const double = (n: number): number => n * 2

const f = flow(len, double)

assert.strictEqual(f('aaa'), 6)
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
   hi: (h: H) => I): (...a: A) => I;
```

Performs left-to-right function composition. The first argument may have any arity, the remaining arguments must be unary.

See also [`pipe`](#pipe).

### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `A` *extends* readonly `unknown`[] | - |
| `B` | `never` |
| `C` | `never` |
| `D` | `never` |
| `E` | `never` |
| `F` | `never` |
| `G` | `never` |
| `H` | `never` |
| `I` | `never` |

### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `ab` | (...`a`: `A`) => `B` | The first function to apply. |
| `bc` | (`b`: `B`) => `C` |  |
| `cd` | (`c`: `C`) => `D` |  |
| `de` | (`d`: `D`) => `E` |  |
| `ef` | (`e`: `E`) => `F` |  |
| `fg` | (`f`: `F`) => `G` |  |
| `gh` | (`g`: `G`) => `H` |  |
| `hi` | (`h`: `H`) => `I` |  |

### Returns

```ts
(...a: A): I;
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| ...`a` | `A` |

#### Returns

`I`

### Example

```ts
import * as assert from "node:assert"
import { flow } from "effect/Function"

const len = (s: string): number => s.length
const double = (n: number): number => n * 2

const f = flow(len, double)

assert.strictEqual(f('aaa'), 6)
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
   ij: (i: I) => J): (...a: A) => J;
```

Performs left-to-right function composition. The first argument may have any arity, the remaining arguments must be unary.

See also [`pipe`](#pipe).

### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `A` *extends* readonly `unknown`[] | - |
| `B` | `never` |
| `C` | `never` |
| `D` | `never` |
| `E` | `never` |
| `F` | `never` |
| `G` | `never` |
| `H` | `never` |
| `I` | `never` |
| `J` | `never` |

### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `ab` | (...`a`: `A`) => `B` | The first function to apply. |
| `bc` | (`b`: `B`) => `C` |  |
| `cd` | (`c`: `C`) => `D` |  |
| `de` | (`d`: `D`) => `E` |  |
| `ef` | (`e`: `E`) => `F` |  |
| `fg` | (`f`: `F`) => `G` |  |
| `gh` | (`g`: `G`) => `H` |  |
| `hi` | (`h`: `H`) => `I` |  |
| `ij` | (`i`: `I`) => `J` |  |

### Returns

```ts
(...a: A): J;
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| ...`a` | `A` |

#### Returns

`J`

### Example

```ts
import * as assert from "node:assert"
import { flow } from "effect/Function"

const len = (s: string): number => s.length
const double = (n: number): number => n * 2

const f = flow(len, double)

assert.strictEqual(f('aaa'), 6)
```

### Since

1.0.0
