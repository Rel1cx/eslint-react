[@eslint-react/eff](../README.md) / pipe

# Function: pipe()

## Call Signature

```ts
function pipe<A>(a: A): A;
```

Pipes the value of an expression into a pipeline of functions.

**Details**

The `pipe` function is a utility that allows us to compose functions in a
readable and sequential manner. It takes the output of one function and
passes it as the input to the next function in the pipeline. This enables us
to build complex transformations by chaining multiple functions together.

```ts skip-type-checking
import { pipe } from "effect"

const result = pipe(input, func1, func2, ..., funcN)
```

In this syntax, `input` is the initial value, and `func1`, `func2`, ...,
`funcN` are the functions to be applied in sequence. The result of each
function becomes the input for the next function, and the final result is
returned.

Here's an illustration of how `pipe` works:

```
┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐    ┌────────┐
│ input │───►│ func1 │───►│ func2 │───►│  ...  │───►│ funcN │───►│ result │
└───────┘    └───────┘    └───────┘    └───────┘    └───────┘    └────────┘
```

It's important to note that functions passed to `pipe` must have a **single
argument** because they are only called with a single argument.

**When to Use**

This is useful in combination with data-last functions as a simulation of
methods:

```ts skip-type-checking
as.map(f).filter(g)
```

becomes:

```ts skip-type-checking
import { pipe, Array } from "effect"

pipe(as, Array.map(f), Array.filter(g))
```

**Example** (Chaining Arithmetic Operations)

```ts
import { pipe } from "effect"

// Define simple arithmetic operations
const increment = (x: number) => x + 1
const double = (x: number) => x * 2
const subtractTen = (x: number) => x - 10

// Sequentially apply these operations using `pipe`
const result = pipe(5, increment, double, subtractTen)

console.log(result)
// Output: 2
```

### Type Parameters

| Type Parameter |
| ------ |
| `A` |

### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `a` | `A` | The value to pipe. |

### Returns

`A`

The result of applying all functions in sequence to the initial value.

### Since

1.0.0

## Call Signature

```ts
function pipe<A, B>(a: A, ab: (a: A) => B): B;
```

Pipes the value of an expression into a pipeline of functions.

**Details**

The `pipe` function is a utility that allows us to compose functions in a
readable and sequential manner. It takes the output of one function and
passes it as the input to the next function in the pipeline. This enables us
to build complex transformations by chaining multiple functions together.

```ts skip-type-checking
import { pipe } from "effect"

const result = pipe(input, func1, func2, ..., funcN)
```

In this syntax, `input` is the initial value, and `func1`, `func2`, ...,
`funcN` are the functions to be applied in sequence. The result of each
function becomes the input for the next function, and the final result is
returned.

Here's an illustration of how `pipe` works:

```
┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐    ┌────────┐
│ input │───►│ func1 │───►│ func2 │───►│  ...  │───►│ funcN │───►│ result │
└───────┘    └───────┘    └───────┘    └───────┘    └───────┘    └────────┘
```

It's important to note that functions passed to `pipe` must have a **single
argument** because they are only called with a single argument.

**When to Use**

This is useful in combination with data-last functions as a simulation of
methods:

```ts skip-type-checking
as.map(f).filter(g)
```

becomes:

```ts skip-type-checking
import { pipe, Array } from "effect"

pipe(as, Array.map(f), Array.filter(g))
```

**Example** (Chaining Arithmetic Operations)

```ts
import { pipe } from "effect"

// Define simple arithmetic operations
const increment = (x: number) => x + 1
const double = (x: number) => x * 2
const subtractTen = (x: number) => x - 10

// Sequentially apply these operations using `pipe`
const result = pipe(5, increment, double, subtractTen)

console.log(result)
// Output: 2
```

### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `A` | - |
| `B` | `never` |

### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `a` | `A` | The value to pipe. |
| `ab` | (`a`: `A`) => `B` | - |

### Returns

`B`

The result of applying all functions in sequence to the initial value.

### Since

1.0.0

## Call Signature

```ts
function pipe<A, B, C>(
   a: A, 
   ab: (a: A) => B, 
   bc: (b: B) => C): C;
```

Pipes the value of an expression into a pipeline of functions.

**Details**

The `pipe` function is a utility that allows us to compose functions in a
readable and sequential manner. It takes the output of one function and
passes it as the input to the next function in the pipeline. This enables us
to build complex transformations by chaining multiple functions together.

```ts skip-type-checking
import { pipe } from "effect"

const result = pipe(input, func1, func2, ..., funcN)
```

In this syntax, `input` is the initial value, and `func1`, `func2`, ...,
`funcN` are the functions to be applied in sequence. The result of each
function becomes the input for the next function, and the final result is
returned.

Here's an illustration of how `pipe` works:

```
┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐    ┌────────┐
│ input │───►│ func1 │───►│ func2 │───►│  ...  │───►│ funcN │───►│ result │
└───────┘    └───────┘    └───────┘    └───────┘    └───────┘    └────────┘
```

It's important to note that functions passed to `pipe` must have a **single
argument** because they are only called with a single argument.

**When to Use**

This is useful in combination with data-last functions as a simulation of
methods:

```ts skip-type-checking
as.map(f).filter(g)
```

becomes:

```ts skip-type-checking
import { pipe, Array } from "effect"

pipe(as, Array.map(f), Array.filter(g))
```

**Example** (Chaining Arithmetic Operations)

```ts
import { pipe } from "effect"

// Define simple arithmetic operations
const increment = (x: number) => x + 1
const double = (x: number) => x * 2
const subtractTen = (x: number) => x - 10

// Sequentially apply these operations using `pipe`
const result = pipe(5, increment, double, subtractTen)

console.log(result)
// Output: 2
```

### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `A` | - |
| `B` | `never` |
| `C` | `never` |

### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `a` | `A` | The value to pipe. |
| `ab` | (`a`: `A`) => `B` | - |
| `bc` | (`b`: `B`) => `C` | - |

### Returns

`C`

The result of applying all functions in sequence to the initial value.

### Since

1.0.0

## Call Signature

```ts
function pipe<A, B, C, D>(
   a: A, 
   ab: (a: A) => B, 
   bc: (b: B) => C, 
   cd: (c: C) => D): D;
```

Pipes the value of an expression into a pipeline of functions.

**Details**

The `pipe` function is a utility that allows us to compose functions in a
readable and sequential manner. It takes the output of one function and
passes it as the input to the next function in the pipeline. This enables us
to build complex transformations by chaining multiple functions together.

```ts skip-type-checking
import { pipe } from "effect"

const result = pipe(input, func1, func2, ..., funcN)
```

In this syntax, `input` is the initial value, and `func1`, `func2`, ...,
`funcN` are the functions to be applied in sequence. The result of each
function becomes the input for the next function, and the final result is
returned.

Here's an illustration of how `pipe` works:

```
┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐    ┌────────┐
│ input │───►│ func1 │───►│ func2 │───►│  ...  │───►│ funcN │───►│ result │
└───────┘    └───────┘    └───────┘    └───────┘    └───────┘    └────────┘
```

It's important to note that functions passed to `pipe` must have a **single
argument** because they are only called with a single argument.

**When to Use**

This is useful in combination with data-last functions as a simulation of
methods:

```ts skip-type-checking
as.map(f).filter(g)
```

becomes:

```ts skip-type-checking
import { pipe, Array } from "effect"

pipe(as, Array.map(f), Array.filter(g))
```

**Example** (Chaining Arithmetic Operations)

```ts
import { pipe } from "effect"

// Define simple arithmetic operations
const increment = (x: number) => x + 1
const double = (x: number) => x * 2
const subtractTen = (x: number) => x - 10

// Sequentially apply these operations using `pipe`
const result = pipe(5, increment, double, subtractTen)

console.log(result)
// Output: 2
```

### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `A` | - |
| `B` | `never` |
| `C` | `never` |
| `D` | `never` |

### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `a` | `A` | The value to pipe. |
| `ab` | (`a`: `A`) => `B` | - |
| `bc` | (`b`: `B`) => `C` | - |
| `cd` | (`c`: `C`) => `D` | - |

### Returns

`D`

The result of applying all functions in sequence to the initial value.

### Since

1.0.0

## Call Signature

```ts
function pipe<A, B, C, D, E>(
   a: A, 
   ab: (a: A) => B, 
   bc: (b: B) => C, 
   cd: (c: C) => D, 
   de: (d: D) => E): E;
```

Pipes the value of an expression into a pipeline of functions.

**Details**

The `pipe` function is a utility that allows us to compose functions in a
readable and sequential manner. It takes the output of one function and
passes it as the input to the next function in the pipeline. This enables us
to build complex transformations by chaining multiple functions together.

```ts skip-type-checking
import { pipe } from "effect"

const result = pipe(input, func1, func2, ..., funcN)
```

In this syntax, `input` is the initial value, and `func1`, `func2`, ...,
`funcN` are the functions to be applied in sequence. The result of each
function becomes the input for the next function, and the final result is
returned.

Here's an illustration of how `pipe` works:

```
┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐    ┌────────┐
│ input │───►│ func1 │───►│ func2 │───►│  ...  │───►│ funcN │───►│ result │
└───────┘    └───────┘    └───────┘    └───────┘    └───────┘    └────────┘
```

It's important to note that functions passed to `pipe` must have a **single
argument** because they are only called with a single argument.

**When to Use**

This is useful in combination with data-last functions as a simulation of
methods:

```ts skip-type-checking
as.map(f).filter(g)
```

becomes:

```ts skip-type-checking
import { pipe, Array } from "effect"

pipe(as, Array.map(f), Array.filter(g))
```

**Example** (Chaining Arithmetic Operations)

```ts
import { pipe } from "effect"

// Define simple arithmetic operations
const increment = (x: number) => x + 1
const double = (x: number) => x * 2
const subtractTen = (x: number) => x - 10

// Sequentially apply these operations using `pipe`
const result = pipe(5, increment, double, subtractTen)

console.log(result)
// Output: 2
```

### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `A` | - |
| `B` | `never` |
| `C` | `never` |
| `D` | `never` |
| `E` | `never` |

### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `a` | `A` | The value to pipe. |
| `ab` | (`a`: `A`) => `B` | - |
| `bc` | (`b`: `B`) => `C` | - |
| `cd` | (`c`: `C`) => `D` | - |
| `de` | (`d`: `D`) => `E` | - |

### Returns

`E`

The result of applying all functions in sequence to the initial value.

### Since

1.0.0

## Call Signature

```ts
function pipe<A, B, C, D, E, F>(
   a: A, 
   ab: (a: A) => B, 
   bc: (b: B) => C, 
   cd: (c: C) => D, 
   de: (d: D) => E, 
   ef: (e: E) => F): F;
```

Pipes the value of an expression into a pipeline of functions.

**Details**

The `pipe` function is a utility that allows us to compose functions in a
readable and sequential manner. It takes the output of one function and
passes it as the input to the next function in the pipeline. This enables us
to build complex transformations by chaining multiple functions together.

```ts skip-type-checking
import { pipe } from "effect"

const result = pipe(input, func1, func2, ..., funcN)
```

In this syntax, `input` is the initial value, and `func1`, `func2`, ...,
`funcN` are the functions to be applied in sequence. The result of each
function becomes the input for the next function, and the final result is
returned.

Here's an illustration of how `pipe` works:

```
┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐    ┌────────┐
│ input │───►│ func1 │───►│ func2 │───►│  ...  │───►│ funcN │───►│ result │
└───────┘    └───────┘    └───────┘    └───────┘    └───────┘    └────────┘
```

It's important to note that functions passed to `pipe` must have a **single
argument** because they are only called with a single argument.

**When to Use**

This is useful in combination with data-last functions as a simulation of
methods:

```ts skip-type-checking
as.map(f).filter(g)
```

becomes:

```ts skip-type-checking
import { pipe, Array } from "effect"

pipe(as, Array.map(f), Array.filter(g))
```

**Example** (Chaining Arithmetic Operations)

```ts
import { pipe } from "effect"

// Define simple arithmetic operations
const increment = (x: number) => x + 1
const double = (x: number) => x * 2
const subtractTen = (x: number) => x - 10

// Sequentially apply these operations using `pipe`
const result = pipe(5, increment, double, subtractTen)

console.log(result)
// Output: 2
```

### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `A` | - |
| `B` | `never` |
| `C` | `never` |
| `D` | `never` |
| `E` | `never` |
| `F` | `never` |

### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `a` | `A` | The value to pipe. |
| `ab` | (`a`: `A`) => `B` | - |
| `bc` | (`b`: `B`) => `C` | - |
| `cd` | (`c`: `C`) => `D` | - |
| `de` | (`d`: `D`) => `E` | - |
| `ef` | (`e`: `E`) => `F` | - |

### Returns

`F`

The result of applying all functions in sequence to the initial value.

### Since

1.0.0

## Call Signature

```ts
function pipe<A, B, C, D, E, F, G>(
   a: A, 
   ab: (a: A) => B, 
   bc: (b: B) => C, 
   cd: (c: C) => D, 
   de: (d: D) => E, 
   ef: (e: E) => F, 
   fg: (f: F) => G): G;
```

Pipes the value of an expression into a pipeline of functions.

**Details**

The `pipe` function is a utility that allows us to compose functions in a
readable and sequential manner. It takes the output of one function and
passes it as the input to the next function in the pipeline. This enables us
to build complex transformations by chaining multiple functions together.

```ts skip-type-checking
import { pipe } from "effect"

const result = pipe(input, func1, func2, ..., funcN)
```

In this syntax, `input` is the initial value, and `func1`, `func2`, ...,
`funcN` are the functions to be applied in sequence. The result of each
function becomes the input for the next function, and the final result is
returned.

Here's an illustration of how `pipe` works:

```
┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐    ┌────────┐
│ input │───►│ func1 │───►│ func2 │───►│  ...  │───►│ funcN │───►│ result │
└───────┘    └───────┘    └───────┘    └───────┘    └───────┘    └────────┘
```

It's important to note that functions passed to `pipe` must have a **single
argument** because they are only called with a single argument.

**When to Use**

This is useful in combination with data-last functions as a simulation of
methods:

```ts skip-type-checking
as.map(f).filter(g)
```

becomes:

```ts skip-type-checking
import { pipe, Array } from "effect"

pipe(as, Array.map(f), Array.filter(g))
```

**Example** (Chaining Arithmetic Operations)

```ts
import { pipe } from "effect"

// Define simple arithmetic operations
const increment = (x: number) => x + 1
const double = (x: number) => x * 2
const subtractTen = (x: number) => x - 10

// Sequentially apply these operations using `pipe`
const result = pipe(5, increment, double, subtractTen)

console.log(result)
// Output: 2
```

### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `A` | - |
| `B` | `never` |
| `C` | `never` |
| `D` | `never` |
| `E` | `never` |
| `F` | `never` |
| `G` | `never` |

### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `a` | `A` | The value to pipe. |
| `ab` | (`a`: `A`) => `B` | - |
| `bc` | (`b`: `B`) => `C` | - |
| `cd` | (`c`: `C`) => `D` | - |
| `de` | (`d`: `D`) => `E` | - |
| `ef` | (`e`: `E`) => `F` | - |
| `fg` | (`f`: `F`) => `G` | - |

### Returns

`G`

The result of applying all functions in sequence to the initial value.

### Since

1.0.0

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
   gh: (g: G) => H): H;
```

Pipes the value of an expression into a pipeline of functions.

**Details**

The `pipe` function is a utility that allows us to compose functions in a
readable and sequential manner. It takes the output of one function and
passes it as the input to the next function in the pipeline. This enables us
to build complex transformations by chaining multiple functions together.

```ts skip-type-checking
import { pipe } from "effect"

const result = pipe(input, func1, func2, ..., funcN)
```

In this syntax, `input` is the initial value, and `func1`, `func2`, ...,
`funcN` are the functions to be applied in sequence. The result of each
function becomes the input for the next function, and the final result is
returned.

Here's an illustration of how `pipe` works:

```
┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐    ┌────────┐
│ input │───►│ func1 │───►│ func2 │───►│  ...  │───►│ funcN │───►│ result │
└───────┘    └───────┘    └───────┘    └───────┘    └───────┘    └────────┘
```

It's important to note that functions passed to `pipe` must have a **single
argument** because they are only called with a single argument.

**When to Use**

This is useful in combination with data-last functions as a simulation of
methods:

```ts skip-type-checking
as.map(f).filter(g)
```

becomes:

```ts skip-type-checking
import { pipe, Array } from "effect"

pipe(as, Array.map(f), Array.filter(g))
```

**Example** (Chaining Arithmetic Operations)

```ts
import { pipe } from "effect"

// Define simple arithmetic operations
const increment = (x: number) => x + 1
const double = (x: number) => x * 2
const subtractTen = (x: number) => x - 10

// Sequentially apply these operations using `pipe`
const result = pipe(5, increment, double, subtractTen)

console.log(result)
// Output: 2
```

### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `A` | - |
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
| `a` | `A` | The value to pipe. |
| `ab` | (`a`: `A`) => `B` | - |
| `bc` | (`b`: `B`) => `C` | - |
| `cd` | (`c`: `C`) => `D` | - |
| `de` | (`d`: `D`) => `E` | - |
| `ef` | (`e`: `E`) => `F` | - |
| `fg` | (`f`: `F`) => `G` | - |
| `gh` | (`g`: `G`) => `H` | - |

### Returns

`H`

The result of applying all functions in sequence to the initial value.

### Since

1.0.0

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
   hi: (h: H) => I): I;
```

Pipes the value of an expression into a pipeline of functions.

**Details**

The `pipe` function is a utility that allows us to compose functions in a
readable and sequential manner. It takes the output of one function and
passes it as the input to the next function in the pipeline. This enables us
to build complex transformations by chaining multiple functions together.

```ts skip-type-checking
import { pipe } from "effect"

const result = pipe(input, func1, func2, ..., funcN)
```

In this syntax, `input` is the initial value, and `func1`, `func2`, ...,
`funcN` are the functions to be applied in sequence. The result of each
function becomes the input for the next function, and the final result is
returned.

Here's an illustration of how `pipe` works:

```
┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐    ┌────────┐
│ input │───►│ func1 │───►│ func2 │───►│  ...  │───►│ funcN │───►│ result │
└───────┘    └───────┘    └───────┘    └───────┘    └───────┘    └────────┘
```

It's important to note that functions passed to `pipe` must have a **single
argument** because they are only called with a single argument.

**When to Use**

This is useful in combination with data-last functions as a simulation of
methods:

```ts skip-type-checking
as.map(f).filter(g)
```

becomes:

```ts skip-type-checking
import { pipe, Array } from "effect"

pipe(as, Array.map(f), Array.filter(g))
```

**Example** (Chaining Arithmetic Operations)

```ts
import { pipe } from "effect"

// Define simple arithmetic operations
const increment = (x: number) => x + 1
const double = (x: number) => x * 2
const subtractTen = (x: number) => x - 10

// Sequentially apply these operations using `pipe`
const result = pipe(5, increment, double, subtractTen)

console.log(result)
// Output: 2
```

### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `A` | - |
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
| `a` | `A` | The value to pipe. |
| `ab` | (`a`: `A`) => `B` | - |
| `bc` | (`b`: `B`) => `C` | - |
| `cd` | (`c`: `C`) => `D` | - |
| `de` | (`d`: `D`) => `E` | - |
| `ef` | (`e`: `E`) => `F` | - |
| `fg` | (`f`: `F`) => `G` | - |
| `gh` | (`g`: `G`) => `H` | - |
| `hi` | (`h`: `H`) => `I` | - |

### Returns

`I`

The result of applying all functions in sequence to the initial value.

### Since

1.0.0

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
   ij: (i: I) => J): J;
```

Pipes the value of an expression into a pipeline of functions.

**Details**

The `pipe` function is a utility that allows us to compose functions in a
readable and sequential manner. It takes the output of one function and
passes it as the input to the next function in the pipeline. This enables us
to build complex transformations by chaining multiple functions together.

```ts skip-type-checking
import { pipe } from "effect"

const result = pipe(input, func1, func2, ..., funcN)
```

In this syntax, `input` is the initial value, and `func1`, `func2`, ...,
`funcN` are the functions to be applied in sequence. The result of each
function becomes the input for the next function, and the final result is
returned.

Here's an illustration of how `pipe` works:

```
┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐    ┌────────┐
│ input │───►│ func1 │───►│ func2 │───►│  ...  │───►│ funcN │───►│ result │
└───────┘    └───────┘    └───────┘    └───────┘    └───────┘    └────────┘
```

It's important to note that functions passed to `pipe` must have a **single
argument** because they are only called with a single argument.

**When to Use**

This is useful in combination with data-last functions as a simulation of
methods:

```ts skip-type-checking
as.map(f).filter(g)
```

becomes:

```ts skip-type-checking
import { pipe, Array } from "effect"

pipe(as, Array.map(f), Array.filter(g))
```

**Example** (Chaining Arithmetic Operations)

```ts
import { pipe } from "effect"

// Define simple arithmetic operations
const increment = (x: number) => x + 1
const double = (x: number) => x * 2
const subtractTen = (x: number) => x - 10

// Sequentially apply these operations using `pipe`
const result = pipe(5, increment, double, subtractTen)

console.log(result)
// Output: 2
```

### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `A` | - |
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
| `a` | `A` | The value to pipe. |
| `ab` | (`a`: `A`) => `B` | - |
| `bc` | (`b`: `B`) => `C` | - |
| `cd` | (`c`: `C`) => `D` | - |
| `de` | (`d`: `D`) => `E` | - |
| `ef` | (`e`: `E`) => `F` | - |
| `fg` | (`f`: `F`) => `G` | - |
| `gh` | (`g`: `G`) => `H` | - |
| `hi` | (`h`: `H`) => `I` | - |
| `ij` | (`i`: `I`) => `J` | - |

### Returns

`J`

The result of applying all functions in sequence to the initial value.

### Since

1.0.0

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
   jk: (j: J) => K): K;
```

Pipes the value of an expression into a pipeline of functions.

**Details**

The `pipe` function is a utility that allows us to compose functions in a
readable and sequential manner. It takes the output of one function and
passes it as the input to the next function in the pipeline. This enables us
to build complex transformations by chaining multiple functions together.

```ts skip-type-checking
import { pipe } from "effect"

const result = pipe(input, func1, func2, ..., funcN)
```

In this syntax, `input` is the initial value, and `func1`, `func2`, ...,
`funcN` are the functions to be applied in sequence. The result of each
function becomes the input for the next function, and the final result is
returned.

Here's an illustration of how `pipe` works:

```
┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐    ┌────────┐
│ input │───►│ func1 │───►│ func2 │───►│  ...  │───►│ funcN │───►│ result │
└───────┘    └───────┘    └───────┘    └───────┘    └───────┘    └────────┘
```

It's important to note that functions passed to `pipe` must have a **single
argument** because they are only called with a single argument.

**When to Use**

This is useful in combination with data-last functions as a simulation of
methods:

```ts skip-type-checking
as.map(f).filter(g)
```

becomes:

```ts skip-type-checking
import { pipe, Array } from "effect"

pipe(as, Array.map(f), Array.filter(g))
```

**Example** (Chaining Arithmetic Operations)

```ts
import { pipe } from "effect"

// Define simple arithmetic operations
const increment = (x: number) => x + 1
const double = (x: number) => x * 2
const subtractTen = (x: number) => x - 10

// Sequentially apply these operations using `pipe`
const result = pipe(5, increment, double, subtractTen)

console.log(result)
// Output: 2
```

### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `A` | - |
| `B` | `never` |
| `C` | `never` |
| `D` | `never` |
| `E` | `never` |
| `F` | `never` |
| `G` | `never` |
| `H` | `never` |
| `I` | `never` |
| `J` | `never` |
| `K` | `never` |

### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `a` | `A` | The value to pipe. |
| `ab` | (`a`: `A`) => `B` | - |
| `bc` | (`b`: `B`) => `C` | - |
| `cd` | (`c`: `C`) => `D` | - |
| `de` | (`d`: `D`) => `E` | - |
| `ef` | (`e`: `E`) => `F` | - |
| `fg` | (`f`: `F`) => `G` | - |
| `gh` | (`g`: `G`) => `H` | - |
| `hi` | (`h`: `H`) => `I` | - |
| `ij` | (`i`: `I`) => `J` | - |
| `jk` | (`j`: `J`) => `K` | - |

### Returns

`K`

The result of applying all functions in sequence to the initial value.

### Since

1.0.0

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
   kl: (k: K) => L): L;
```

Pipes the value of an expression into a pipeline of functions.

**Details**

The `pipe` function is a utility that allows us to compose functions in a
readable and sequential manner. It takes the output of one function and
passes it as the input to the next function in the pipeline. This enables us
to build complex transformations by chaining multiple functions together.

```ts skip-type-checking
import { pipe } from "effect"

const result = pipe(input, func1, func2, ..., funcN)
```

In this syntax, `input` is the initial value, and `func1`, `func2`, ...,
`funcN` are the functions to be applied in sequence. The result of each
function becomes the input for the next function, and the final result is
returned.

Here's an illustration of how `pipe` works:

```
┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐    ┌────────┐
│ input │───►│ func1 │───►│ func2 │───►│  ...  │───►│ funcN │───►│ result │
└───────┘    └───────┘    └───────┘    └───────┘    └───────┘    └────────┘
```

It's important to note that functions passed to `pipe` must have a **single
argument** because they are only called with a single argument.

**When to Use**

This is useful in combination with data-last functions as a simulation of
methods:

```ts skip-type-checking
as.map(f).filter(g)
```

becomes:

```ts skip-type-checking
import { pipe, Array } from "effect"

pipe(as, Array.map(f), Array.filter(g))
```

**Example** (Chaining Arithmetic Operations)

```ts
import { pipe } from "effect"

// Define simple arithmetic operations
const increment = (x: number) => x + 1
const double = (x: number) => x * 2
const subtractTen = (x: number) => x - 10

// Sequentially apply these operations using `pipe`
const result = pipe(5, increment, double, subtractTen)

console.log(result)
// Output: 2
```

### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `A` | - |
| `B` | `never` |
| `C` | `never` |
| `D` | `never` |
| `E` | `never` |
| `F` | `never` |
| `G` | `never` |
| `H` | `never` |
| `I` | `never` |
| `J` | `never` |
| `K` | `never` |
| `L` | `never` |

### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `a` | `A` | The value to pipe. |
| `ab` | (`a`: `A`) => `B` | - |
| `bc` | (`b`: `B`) => `C` | - |
| `cd` | (`c`: `C`) => `D` | - |
| `de` | (`d`: `D`) => `E` | - |
| `ef` | (`e`: `E`) => `F` | - |
| `fg` | (`f`: `F`) => `G` | - |
| `gh` | (`g`: `G`) => `H` | - |
| `hi` | (`h`: `H`) => `I` | - |
| `ij` | (`i`: `I`) => `J` | - |
| `jk` | (`j`: `J`) => `K` | - |
| `kl` | (`k`: `K`) => `L` | - |

### Returns

`L`

The result of applying all functions in sequence to the initial value.

### Since

1.0.0

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
   lm: (l: L) => M): M;
```

Pipes the value of an expression into a pipeline of functions.

**Details**

The `pipe` function is a utility that allows us to compose functions in a
readable and sequential manner. It takes the output of one function and
passes it as the input to the next function in the pipeline. This enables us
to build complex transformations by chaining multiple functions together.

```ts skip-type-checking
import { pipe } from "effect"

const result = pipe(input, func1, func2, ..., funcN)
```

In this syntax, `input` is the initial value, and `func1`, `func2`, ...,
`funcN` are the functions to be applied in sequence. The result of each
function becomes the input for the next function, and the final result is
returned.

Here's an illustration of how `pipe` works:

```
┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐    ┌────────┐
│ input │───►│ func1 │───►│ func2 │───►│  ...  │───►│ funcN │───►│ result │
└───────┘    └───────┘    └───────┘    └───────┘    └───────┘    └────────┘
```

It's important to note that functions passed to `pipe` must have a **single
argument** because they are only called with a single argument.

**When to Use**

This is useful in combination with data-last functions as a simulation of
methods:

```ts skip-type-checking
as.map(f).filter(g)
```

becomes:

```ts skip-type-checking
import { pipe, Array } from "effect"

pipe(as, Array.map(f), Array.filter(g))
```

**Example** (Chaining Arithmetic Operations)

```ts
import { pipe } from "effect"

// Define simple arithmetic operations
const increment = (x: number) => x + 1
const double = (x: number) => x * 2
const subtractTen = (x: number) => x - 10

// Sequentially apply these operations using `pipe`
const result = pipe(5, increment, double, subtractTen)

console.log(result)
// Output: 2
```

### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `A` | - |
| `B` | `never` |
| `C` | `never` |
| `D` | `never` |
| `E` | `never` |
| `F` | `never` |
| `G` | `never` |
| `H` | `never` |
| `I` | `never` |
| `J` | `never` |
| `K` | `never` |
| `L` | `never` |
| `M` | `never` |

### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `a` | `A` | The value to pipe. |
| `ab` | (`a`: `A`) => `B` | - |
| `bc` | (`b`: `B`) => `C` | - |
| `cd` | (`c`: `C`) => `D` | - |
| `de` | (`d`: `D`) => `E` | - |
| `ef` | (`e`: `E`) => `F` | - |
| `fg` | (`f`: `F`) => `G` | - |
| `gh` | (`g`: `G`) => `H` | - |
| `hi` | (`h`: `H`) => `I` | - |
| `ij` | (`i`: `I`) => `J` | - |
| `jk` | (`j`: `J`) => `K` | - |
| `kl` | (`k`: `K`) => `L` | - |
| `lm` | (`l`: `L`) => `M` | - |

### Returns

`M`

The result of applying all functions in sequence to the initial value.

### Since

1.0.0

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
   mn: (m: M) => N): N;
```

Pipes the value of an expression into a pipeline of functions.

**Details**

The `pipe` function is a utility that allows us to compose functions in a
readable and sequential manner. It takes the output of one function and
passes it as the input to the next function in the pipeline. This enables us
to build complex transformations by chaining multiple functions together.

```ts skip-type-checking
import { pipe } from "effect"

const result = pipe(input, func1, func2, ..., funcN)
```

In this syntax, `input` is the initial value, and `func1`, `func2`, ...,
`funcN` are the functions to be applied in sequence. The result of each
function becomes the input for the next function, and the final result is
returned.

Here's an illustration of how `pipe` works:

```
┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐    ┌────────┐
│ input │───►│ func1 │───►│ func2 │───►│  ...  │───►│ funcN │───►│ result │
└───────┘    └───────┘    └───────┘    └───────┘    └───────┘    └────────┘
```

It's important to note that functions passed to `pipe` must have a **single
argument** because they are only called with a single argument.

**When to Use**

This is useful in combination with data-last functions as a simulation of
methods:

```ts skip-type-checking
as.map(f).filter(g)
```

becomes:

```ts skip-type-checking
import { pipe, Array } from "effect"

pipe(as, Array.map(f), Array.filter(g))
```

**Example** (Chaining Arithmetic Operations)

```ts
import { pipe } from "effect"

// Define simple arithmetic operations
const increment = (x: number) => x + 1
const double = (x: number) => x * 2
const subtractTen = (x: number) => x - 10

// Sequentially apply these operations using `pipe`
const result = pipe(5, increment, double, subtractTen)

console.log(result)
// Output: 2
```

### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `A` | - |
| `B` | `never` |
| `C` | `never` |
| `D` | `never` |
| `E` | `never` |
| `F` | `never` |
| `G` | `never` |
| `H` | `never` |
| `I` | `never` |
| `J` | `never` |
| `K` | `never` |
| `L` | `never` |
| `M` | `never` |
| `N` | `never` |

### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `a` | `A` | The value to pipe. |
| `ab` | (`a`: `A`) => `B` | - |
| `bc` | (`b`: `B`) => `C` | - |
| `cd` | (`c`: `C`) => `D` | - |
| `de` | (`d`: `D`) => `E` | - |
| `ef` | (`e`: `E`) => `F` | - |
| `fg` | (`f`: `F`) => `G` | - |
| `gh` | (`g`: `G`) => `H` | - |
| `hi` | (`h`: `H`) => `I` | - |
| `ij` | (`i`: `I`) => `J` | - |
| `jk` | (`j`: `J`) => `K` | - |
| `kl` | (`k`: `K`) => `L` | - |
| `lm` | (`l`: `L`) => `M` | - |
| `mn` | (`m`: `M`) => `N` | - |

### Returns

`N`

The result of applying all functions in sequence to the initial value.

### Since

1.0.0

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
   no: (n: N) => O): O;
```

Pipes the value of an expression into a pipeline of functions.

**Details**

The `pipe` function is a utility that allows us to compose functions in a
readable and sequential manner. It takes the output of one function and
passes it as the input to the next function in the pipeline. This enables us
to build complex transformations by chaining multiple functions together.

```ts skip-type-checking
import { pipe } from "effect"

const result = pipe(input, func1, func2, ..., funcN)
```

In this syntax, `input` is the initial value, and `func1`, `func2`, ...,
`funcN` are the functions to be applied in sequence. The result of each
function becomes the input for the next function, and the final result is
returned.

Here's an illustration of how `pipe` works:

```
┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐    ┌────────┐
│ input │───►│ func1 │───►│ func2 │───►│  ...  │───►│ funcN │───►│ result │
└───────┘    └───────┘    └───────┘    └───────┘    └───────┘    └────────┘
```

It's important to note that functions passed to `pipe` must have a **single
argument** because they are only called with a single argument.

**When to Use**

This is useful in combination with data-last functions as a simulation of
methods:

```ts skip-type-checking
as.map(f).filter(g)
```

becomes:

```ts skip-type-checking
import { pipe, Array } from "effect"

pipe(as, Array.map(f), Array.filter(g))
```

**Example** (Chaining Arithmetic Operations)

```ts
import { pipe } from "effect"

// Define simple arithmetic operations
const increment = (x: number) => x + 1
const double = (x: number) => x * 2
const subtractTen = (x: number) => x - 10

// Sequentially apply these operations using `pipe`
const result = pipe(5, increment, double, subtractTen)

console.log(result)
// Output: 2
```

### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `A` | - |
| `B` | `never` |
| `C` | `never` |
| `D` | `never` |
| `E` | `never` |
| `F` | `never` |
| `G` | `never` |
| `H` | `never` |
| `I` | `never` |
| `J` | `never` |
| `K` | `never` |
| `L` | `never` |
| `M` | `never` |
| `N` | `never` |
| `O` | `never` |

### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `a` | `A` | The value to pipe. |
| `ab` | (`a`: `A`) => `B` | - |
| `bc` | (`b`: `B`) => `C` | - |
| `cd` | (`c`: `C`) => `D` | - |
| `de` | (`d`: `D`) => `E` | - |
| `ef` | (`e`: `E`) => `F` | - |
| `fg` | (`f`: `F`) => `G` | - |
| `gh` | (`g`: `G`) => `H` | - |
| `hi` | (`h`: `H`) => `I` | - |
| `ij` | (`i`: `I`) => `J` | - |
| `jk` | (`j`: `J`) => `K` | - |
| `kl` | (`k`: `K`) => `L` | - |
| `lm` | (`l`: `L`) => `M` | - |
| `mn` | (`m`: `M`) => `N` | - |
| `no` | (`n`: `N`) => `O` | - |

### Returns

`O`

The result of applying all functions in sequence to the initial value.

### Since

1.0.0

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
   op: (o: O) => P): P;
```

Pipes the value of an expression into a pipeline of functions.

**Details**

The `pipe` function is a utility that allows us to compose functions in a
readable and sequential manner. It takes the output of one function and
passes it as the input to the next function in the pipeline. This enables us
to build complex transformations by chaining multiple functions together.

```ts skip-type-checking
import { pipe } from "effect"

const result = pipe(input, func1, func2, ..., funcN)
```

In this syntax, `input` is the initial value, and `func1`, `func2`, ...,
`funcN` are the functions to be applied in sequence. The result of each
function becomes the input for the next function, and the final result is
returned.

Here's an illustration of how `pipe` works:

```
┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐    ┌────────┐
│ input │───►│ func1 │───►│ func2 │───►│  ...  │───►│ funcN │───►│ result │
└───────┘    └───────┘    └───────┘    └───────┘    └───────┘    └────────┘
```

It's important to note that functions passed to `pipe` must have a **single
argument** because they are only called with a single argument.

**When to Use**

This is useful in combination with data-last functions as a simulation of
methods:

```ts skip-type-checking
as.map(f).filter(g)
```

becomes:

```ts skip-type-checking
import { pipe, Array } from "effect"

pipe(as, Array.map(f), Array.filter(g))
```

**Example** (Chaining Arithmetic Operations)

```ts
import { pipe } from "effect"

// Define simple arithmetic operations
const increment = (x: number) => x + 1
const double = (x: number) => x * 2
const subtractTen = (x: number) => x - 10

// Sequentially apply these operations using `pipe`
const result = pipe(5, increment, double, subtractTen)

console.log(result)
// Output: 2
```

### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `A` | - |
| `B` | `never` |
| `C` | `never` |
| `D` | `never` |
| `E` | `never` |
| `F` | `never` |
| `G` | `never` |
| `H` | `never` |
| `I` | `never` |
| `J` | `never` |
| `K` | `never` |
| `L` | `never` |
| `M` | `never` |
| `N` | `never` |
| `O` | `never` |
| `P` | `never` |

### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `a` | `A` | The value to pipe. |
| `ab` | (`a`: `A`) => `B` | - |
| `bc` | (`b`: `B`) => `C` | - |
| `cd` | (`c`: `C`) => `D` | - |
| `de` | (`d`: `D`) => `E` | - |
| `ef` | (`e`: `E`) => `F` | - |
| `fg` | (`f`: `F`) => `G` | - |
| `gh` | (`g`: `G`) => `H` | - |
| `hi` | (`h`: `H`) => `I` | - |
| `ij` | (`i`: `I`) => `J` | - |
| `jk` | (`j`: `J`) => `K` | - |
| `kl` | (`k`: `K`) => `L` | - |
| `lm` | (`l`: `L`) => `M` | - |
| `mn` | (`m`: `M`) => `N` | - |
| `no` | (`n`: `N`) => `O` | - |
| `op` | (`o`: `O`) => `P` | - |

### Returns

`P`

The result of applying all functions in sequence to the initial value.

### Since

1.0.0

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
   pq: (p: P) => Q): Q;
```

Pipes the value of an expression into a pipeline of functions.

**Details**

The `pipe` function is a utility that allows us to compose functions in a
readable and sequential manner. It takes the output of one function and
passes it as the input to the next function in the pipeline. This enables us
to build complex transformations by chaining multiple functions together.

```ts skip-type-checking
import { pipe } from "effect"

const result = pipe(input, func1, func2, ..., funcN)
```

In this syntax, `input` is the initial value, and `func1`, `func2`, ...,
`funcN` are the functions to be applied in sequence. The result of each
function becomes the input for the next function, and the final result is
returned.

Here's an illustration of how `pipe` works:

```
┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐    ┌────────┐
│ input │───►│ func1 │───►│ func2 │───►│  ...  │───►│ funcN │───►│ result │
└───────┘    └───────┘    └───────┘    └───────┘    └───────┘    └────────┘
```

It's important to note that functions passed to `pipe` must have a **single
argument** because they are only called with a single argument.

**When to Use**

This is useful in combination with data-last functions as a simulation of
methods:

```ts skip-type-checking
as.map(f).filter(g)
```

becomes:

```ts skip-type-checking
import { pipe, Array } from "effect"

pipe(as, Array.map(f), Array.filter(g))
```

**Example** (Chaining Arithmetic Operations)

```ts
import { pipe } from "effect"

// Define simple arithmetic operations
const increment = (x: number) => x + 1
const double = (x: number) => x * 2
const subtractTen = (x: number) => x - 10

// Sequentially apply these operations using `pipe`
const result = pipe(5, increment, double, subtractTen)

console.log(result)
// Output: 2
```

### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `A` | - |
| `B` | `never` |
| `C` | `never` |
| `D` | `never` |
| `E` | `never` |
| `F` | `never` |
| `G` | `never` |
| `H` | `never` |
| `I` | `never` |
| `J` | `never` |
| `K` | `never` |
| `L` | `never` |
| `M` | `never` |
| `N` | `never` |
| `O` | `never` |
| `P` | `never` |
| `Q` | `never` |

### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `a` | `A` | The value to pipe. |
| `ab` | (`a`: `A`) => `B` | - |
| `bc` | (`b`: `B`) => `C` | - |
| `cd` | (`c`: `C`) => `D` | - |
| `de` | (`d`: `D`) => `E` | - |
| `ef` | (`e`: `E`) => `F` | - |
| `fg` | (`f`: `F`) => `G` | - |
| `gh` | (`g`: `G`) => `H` | - |
| `hi` | (`h`: `H`) => `I` | - |
| `ij` | (`i`: `I`) => `J` | - |
| `jk` | (`j`: `J`) => `K` | - |
| `kl` | (`k`: `K`) => `L` | - |
| `lm` | (`l`: `L`) => `M` | - |
| `mn` | (`m`: `M`) => `N` | - |
| `no` | (`n`: `N`) => `O` | - |
| `op` | (`o`: `O`) => `P` | - |
| `pq` | (`p`: `P`) => `Q` | - |

### Returns

`Q`

The result of applying all functions in sequence to the initial value.

### Since

1.0.0

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
   qr: (q: Q) => R): R;
```

Pipes the value of an expression into a pipeline of functions.

**Details**

The `pipe` function is a utility that allows us to compose functions in a
readable and sequential manner. It takes the output of one function and
passes it as the input to the next function in the pipeline. This enables us
to build complex transformations by chaining multiple functions together.

```ts skip-type-checking
import { pipe } from "effect"

const result = pipe(input, func1, func2, ..., funcN)
```

In this syntax, `input` is the initial value, and `func1`, `func2`, ...,
`funcN` are the functions to be applied in sequence. The result of each
function becomes the input for the next function, and the final result is
returned.

Here's an illustration of how `pipe` works:

```
┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐    ┌────────┐
│ input │───►│ func1 │───►│ func2 │───►│  ...  │───►│ funcN │───►│ result │
└───────┘    └───────┘    └───────┘    └───────┘    └───────┘    └────────┘
```

It's important to note that functions passed to `pipe` must have a **single
argument** because they are only called with a single argument.

**When to Use**

This is useful in combination with data-last functions as a simulation of
methods:

```ts skip-type-checking
as.map(f).filter(g)
```

becomes:

```ts skip-type-checking
import { pipe, Array } from "effect"

pipe(as, Array.map(f), Array.filter(g))
```

**Example** (Chaining Arithmetic Operations)

```ts
import { pipe } from "effect"

// Define simple arithmetic operations
const increment = (x: number) => x + 1
const double = (x: number) => x * 2
const subtractTen = (x: number) => x - 10

// Sequentially apply these operations using `pipe`
const result = pipe(5, increment, double, subtractTen)

console.log(result)
// Output: 2
```

### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `A` | - |
| `B` | `never` |
| `C` | `never` |
| `D` | `never` |
| `E` | `never` |
| `F` | `never` |
| `G` | `never` |
| `H` | `never` |
| `I` | `never` |
| `J` | `never` |
| `K` | `never` |
| `L` | `never` |
| `M` | `never` |
| `N` | `never` |
| `O` | `never` |
| `P` | `never` |
| `Q` | `never` |
| `R` | `never` |

### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `a` | `A` | The value to pipe. |
| `ab` | (`a`: `A`) => `B` | - |
| `bc` | (`b`: `B`) => `C` | - |
| `cd` | (`c`: `C`) => `D` | - |
| `de` | (`d`: `D`) => `E` | - |
| `ef` | (`e`: `E`) => `F` | - |
| `fg` | (`f`: `F`) => `G` | - |
| `gh` | (`g`: `G`) => `H` | - |
| `hi` | (`h`: `H`) => `I` | - |
| `ij` | (`i`: `I`) => `J` | - |
| `jk` | (`j`: `J`) => `K` | - |
| `kl` | (`k`: `K`) => `L` | - |
| `lm` | (`l`: `L`) => `M` | - |
| `mn` | (`m`: `M`) => `N` | - |
| `no` | (`n`: `N`) => `O` | - |
| `op` | (`o`: `O`) => `P` | - |
| `pq` | (`p`: `P`) => `Q` | - |
| `qr` | (`q`: `Q`) => `R` | - |

### Returns

`R`

The result of applying all functions in sequence to the initial value.

### Since

1.0.0

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
   rs: (r: R) => S): S;
```

Pipes the value of an expression into a pipeline of functions.

**Details**

The `pipe` function is a utility that allows us to compose functions in a
readable and sequential manner. It takes the output of one function and
passes it as the input to the next function in the pipeline. This enables us
to build complex transformations by chaining multiple functions together.

```ts skip-type-checking
import { pipe } from "effect"

const result = pipe(input, func1, func2, ..., funcN)
```

In this syntax, `input` is the initial value, and `func1`, `func2`, ...,
`funcN` are the functions to be applied in sequence. The result of each
function becomes the input for the next function, and the final result is
returned.

Here's an illustration of how `pipe` works:

```
┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐    ┌────────┐
│ input │───►│ func1 │───►│ func2 │───►│  ...  │───►│ funcN │───►│ result │
└───────┘    └───────┘    └───────┘    └───────┘    └───────┘    └────────┘
```

It's important to note that functions passed to `pipe` must have a **single
argument** because they are only called with a single argument.

**When to Use**

This is useful in combination with data-last functions as a simulation of
methods:

```ts skip-type-checking
as.map(f).filter(g)
```

becomes:

```ts skip-type-checking
import { pipe, Array } from "effect"

pipe(as, Array.map(f), Array.filter(g))
```

**Example** (Chaining Arithmetic Operations)

```ts
import { pipe } from "effect"

// Define simple arithmetic operations
const increment = (x: number) => x + 1
const double = (x: number) => x * 2
const subtractTen = (x: number) => x - 10

// Sequentially apply these operations using `pipe`
const result = pipe(5, increment, double, subtractTen)

console.log(result)
// Output: 2
```

### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `A` | - |
| `B` | `never` |
| `C` | `never` |
| `D` | `never` |
| `E` | `never` |
| `F` | `never` |
| `G` | `never` |
| `H` | `never` |
| `I` | `never` |
| `J` | `never` |
| `K` | `never` |
| `L` | `never` |
| `M` | `never` |
| `N` | `never` |
| `O` | `never` |
| `P` | `never` |
| `Q` | `never` |
| `R` | `never` |
| `S` | `never` |

### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `a` | `A` | The value to pipe. |
| `ab` | (`a`: `A`) => `B` | - |
| `bc` | (`b`: `B`) => `C` | - |
| `cd` | (`c`: `C`) => `D` | - |
| `de` | (`d`: `D`) => `E` | - |
| `ef` | (`e`: `E`) => `F` | - |
| `fg` | (`f`: `F`) => `G` | - |
| `gh` | (`g`: `G`) => `H` | - |
| `hi` | (`h`: `H`) => `I` | - |
| `ij` | (`i`: `I`) => `J` | - |
| `jk` | (`j`: `J`) => `K` | - |
| `kl` | (`k`: `K`) => `L` | - |
| `lm` | (`l`: `L`) => `M` | - |
| `mn` | (`m`: `M`) => `N` | - |
| `no` | (`n`: `N`) => `O` | - |
| `op` | (`o`: `O`) => `P` | - |
| `pq` | (`p`: `P`) => `Q` | - |
| `qr` | (`q`: `Q`) => `R` | - |
| `rs` | (`r`: `R`) => `S` | - |

### Returns

`S`

The result of applying all functions in sequence to the initial value.

### Since

1.0.0

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
   st: (s: S) => T): T;
```

Pipes the value of an expression into a pipeline of functions.

**Details**

The `pipe` function is a utility that allows us to compose functions in a
readable and sequential manner. It takes the output of one function and
passes it as the input to the next function in the pipeline. This enables us
to build complex transformations by chaining multiple functions together.

```ts skip-type-checking
import { pipe } from "effect"

const result = pipe(input, func1, func2, ..., funcN)
```

In this syntax, `input` is the initial value, and `func1`, `func2`, ...,
`funcN` are the functions to be applied in sequence. The result of each
function becomes the input for the next function, and the final result is
returned.

Here's an illustration of how `pipe` works:

```
┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐    ┌────────┐
│ input │───►│ func1 │───►│ func2 │───►│  ...  │───►│ funcN │───►│ result │
└───────┘    └───────┘    └───────┘    └───────┘    └───────┘    └────────┘
```

It's important to note that functions passed to `pipe` must have a **single
argument** because they are only called with a single argument.

**When to Use**

This is useful in combination with data-last functions as a simulation of
methods:

```ts skip-type-checking
as.map(f).filter(g)
```

becomes:

```ts skip-type-checking
import { pipe, Array } from "effect"

pipe(as, Array.map(f), Array.filter(g))
```

**Example** (Chaining Arithmetic Operations)

```ts
import { pipe } from "effect"

// Define simple arithmetic operations
const increment = (x: number) => x + 1
const double = (x: number) => x * 2
const subtractTen = (x: number) => x - 10

// Sequentially apply these operations using `pipe`
const result = pipe(5, increment, double, subtractTen)

console.log(result)
// Output: 2
```

### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `A` | - |
| `B` | `never` |
| `C` | `never` |
| `D` | `never` |
| `E` | `never` |
| `F` | `never` |
| `G` | `never` |
| `H` | `never` |
| `I` | `never` |
| `J` | `never` |
| `K` | `never` |
| `L` | `never` |
| `M` | `never` |
| `N` | `never` |
| `O` | `never` |
| `P` | `never` |
| `Q` | `never` |
| `R` | `never` |
| `S` | `never` |
| `T` | `never` |

### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `a` | `A` | The value to pipe. |
| `ab` | (`a`: `A`) => `B` | - |
| `bc` | (`b`: `B`) => `C` | - |
| `cd` | (`c`: `C`) => `D` | - |
| `de` | (`d`: `D`) => `E` | - |
| `ef` | (`e`: `E`) => `F` | - |
| `fg` | (`f`: `F`) => `G` | - |
| `gh` | (`g`: `G`) => `H` | - |
| `hi` | (`h`: `H`) => `I` | - |
| `ij` | (`i`: `I`) => `J` | - |
| `jk` | (`j`: `J`) => `K` | - |
| `kl` | (`k`: `K`) => `L` | - |
| `lm` | (`l`: `L`) => `M` | - |
| `mn` | (`m`: `M`) => `N` | - |
| `no` | (`n`: `N`) => `O` | - |
| `op` | (`o`: `O`) => `P` | - |
| `pq` | (`p`: `P`) => `Q` | - |
| `qr` | (`q`: `Q`) => `R` | - |
| `rs` | (`r`: `R`) => `S` | - |
| `st` | (`s`: `S`) => `T` | - |

### Returns

`T`

The result of applying all functions in sequence to the initial value.

### Since

1.0.0
