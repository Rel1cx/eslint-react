[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [F](../README.md) / pipe

# Function: pipe()

## pipe(a)

> **pipe**\<`A`\>(`a`): `A`

Pipes the value of an expression into a pipeline of functions.

**When to Use**

This is useful in combination with data-last functions as a simulation of
methods:

```ts
as.map(f).filter(g)
```

becomes:

```ts
import { pipe, Array } from "effect"

pipe(as, Array.map(f), Array.filter(g))
```

**Details**

The `pipe` function is a utility that allows us to compose functions in a
readable and sequential manner. It takes the output of one function and
passes it as the input to the next function in the pipeline. This enables us
to build complex transformations by chaining multiple functions together.

```ts
import { pipe } from "effect"

const result = pipe(input, func1, func2, ..., funcN)
```

In this syntax, `input` is the initial value, and `func1`, `func2`, ...,
`funcN` are the functions to be applied in sequence. The result of each
function becomes the input for the next function, and the final result is
returned.

Here's an illustration of how `pipe` works:

```text
┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐    ┌────────┐
│ input │───►│ func1 │───►│ func2 │───►│  ...  │───►│ funcN │───►│ result │
└───────┘    └───────┘    └───────┘    └───────┘    └───────┘    └────────┘
```

It's important to note that functions passed to `pipe` must have a **single
argument** because they are only called with a single argument.

### Type Parameters

• **A**

### Parameters

• **a**: `A`

### Returns

`A`

### Example

```ts
// Example: Chaining Arithmetic Operations
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

### Since

2.0.0

## pipe(a, ab)

> **pipe**\<`A`, `B`\>(`a`, `ab`): `B`

Pipes the value of an expression into a pipeline of functions.

**When to Use**

This is useful in combination with data-last functions as a simulation of
methods:

```ts
as.map(f).filter(g)
```

becomes:

```ts
import { pipe, Array } from "effect"

pipe(as, Array.map(f), Array.filter(g))
```

**Details**

The `pipe` function is a utility that allows us to compose functions in a
readable and sequential manner. It takes the output of one function and
passes it as the input to the next function in the pipeline. This enables us
to build complex transformations by chaining multiple functions together.

```ts
import { pipe } from "effect"

const result = pipe(input, func1, func2, ..., funcN)
```

In this syntax, `input` is the initial value, and `func1`, `func2`, ...,
`funcN` are the functions to be applied in sequence. The result of each
function becomes the input for the next function, and the final result is
returned.

Here's an illustration of how `pipe` works:

```text
┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐    ┌────────┐
│ input │───►│ func1 │───►│ func2 │───►│  ...  │───►│ funcN │───►│ result │
└───────┘    └───────┘    └───────┘    └───────┘    └───────┘    └────────┘
```

It's important to note that functions passed to `pipe` must have a **single
argument** because they are only called with a single argument.

### Type Parameters

• **A**

• **B** = `never`

### Parameters

• **a**: `A`

• **ab**

### Returns

`B`

### Example

```ts
// Example: Chaining Arithmetic Operations
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

### Since

2.0.0

## pipe(a, ab, bc)

> **pipe**\<`A`, `B`, `C`\>(`a`, `ab`, `bc`): `C`

Pipes the value of an expression into a pipeline of functions.

**When to Use**

This is useful in combination with data-last functions as a simulation of
methods:

```ts
as.map(f).filter(g)
```

becomes:

```ts
import { pipe, Array } from "effect"

pipe(as, Array.map(f), Array.filter(g))
```

**Details**

The `pipe` function is a utility that allows us to compose functions in a
readable and sequential manner. It takes the output of one function and
passes it as the input to the next function in the pipeline. This enables us
to build complex transformations by chaining multiple functions together.

```ts
import { pipe } from "effect"

const result = pipe(input, func1, func2, ..., funcN)
```

In this syntax, `input` is the initial value, and `func1`, `func2`, ...,
`funcN` are the functions to be applied in sequence. The result of each
function becomes the input for the next function, and the final result is
returned.

Here's an illustration of how `pipe` works:

```text
┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐    ┌────────┐
│ input │───►│ func1 │───►│ func2 │───►│  ...  │───►│ funcN │───►│ result │
└───────┘    └───────┘    └───────┘    └───────┘    └───────┘    └────────┘
```

It's important to note that functions passed to `pipe` must have a **single
argument** because they are only called with a single argument.

### Type Parameters

• **A**

• **B** = `never`

• **C** = `never`

### Parameters

• **a**: `A`

• **ab**

• **bc**

### Returns

`C`

### Example

```ts
// Example: Chaining Arithmetic Operations
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

### Since

2.0.0

## pipe(a, ab, bc, cd)

> **pipe**\<`A`, `B`, `C`, `D`\>(`a`, `ab`, `bc`, `cd`): `D`

Pipes the value of an expression into a pipeline of functions.

**When to Use**

This is useful in combination with data-last functions as a simulation of
methods:

```ts
as.map(f).filter(g)
```

becomes:

```ts
import { pipe, Array } from "effect"

pipe(as, Array.map(f), Array.filter(g))
```

**Details**

The `pipe` function is a utility that allows us to compose functions in a
readable and sequential manner. It takes the output of one function and
passes it as the input to the next function in the pipeline. This enables us
to build complex transformations by chaining multiple functions together.

```ts
import { pipe } from "effect"

const result = pipe(input, func1, func2, ..., funcN)
```

In this syntax, `input` is the initial value, and `func1`, `func2`, ...,
`funcN` are the functions to be applied in sequence. The result of each
function becomes the input for the next function, and the final result is
returned.

Here's an illustration of how `pipe` works:

```text
┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐    ┌────────┐
│ input │───►│ func1 │───►│ func2 │───►│  ...  │───►│ funcN │───►│ result │
└───────┘    └───────┘    └───────┘    └───────┘    └───────┘    └────────┘
```

It's important to note that functions passed to `pipe` must have a **single
argument** because they are only called with a single argument.

### Type Parameters

• **A**

• **B** = `never`

• **C** = `never`

• **D** = `never`

### Parameters

• **a**: `A`

• **ab**

• **bc**

• **cd**

### Returns

`D`

### Example

```ts
// Example: Chaining Arithmetic Operations
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

### Since

2.0.0

## pipe(a, ab, bc, cd, de)

> **pipe**\<`A`, `B`, `C`, `D`, `E`\>(`a`, `ab`, `bc`, `cd`, `de`): `E`

Pipes the value of an expression into a pipeline of functions.

**When to Use**

This is useful in combination with data-last functions as a simulation of
methods:

```ts
as.map(f).filter(g)
```

becomes:

```ts
import { pipe, Array } from "effect"

pipe(as, Array.map(f), Array.filter(g))
```

**Details**

The `pipe` function is a utility that allows us to compose functions in a
readable and sequential manner. It takes the output of one function and
passes it as the input to the next function in the pipeline. This enables us
to build complex transformations by chaining multiple functions together.

```ts
import { pipe } from "effect"

const result = pipe(input, func1, func2, ..., funcN)
```

In this syntax, `input` is the initial value, and `func1`, `func2`, ...,
`funcN` are the functions to be applied in sequence. The result of each
function becomes the input for the next function, and the final result is
returned.

Here's an illustration of how `pipe` works:

```text
┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐    ┌────────┐
│ input │───►│ func1 │───►│ func2 │───►│  ...  │───►│ funcN │───►│ result │
└───────┘    └───────┘    └───────┘    └───────┘    └───────┘    └────────┘
```

It's important to note that functions passed to `pipe` must have a **single
argument** because they are only called with a single argument.

### Type Parameters

• **A**

• **B** = `never`

• **C** = `never`

• **D** = `never`

• **E** = `never`

### Parameters

• **a**: `A`

• **ab**

• **bc**

• **cd**

• **de**

### Returns

`E`

### Example

```ts
// Example: Chaining Arithmetic Operations
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

### Since

2.0.0

## pipe(a, ab, bc, cd, de, ef)

> **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`): `F`

Pipes the value of an expression into a pipeline of functions.

**When to Use**

This is useful in combination with data-last functions as a simulation of
methods:

```ts
as.map(f).filter(g)
```

becomes:

```ts
import { pipe, Array } from "effect"

pipe(as, Array.map(f), Array.filter(g))
```

**Details**

The `pipe` function is a utility that allows us to compose functions in a
readable and sequential manner. It takes the output of one function and
passes it as the input to the next function in the pipeline. This enables us
to build complex transformations by chaining multiple functions together.

```ts
import { pipe } from "effect"

const result = pipe(input, func1, func2, ..., funcN)
```

In this syntax, `input` is the initial value, and `func1`, `func2`, ...,
`funcN` are the functions to be applied in sequence. The result of each
function becomes the input for the next function, and the final result is
returned.

Here's an illustration of how `pipe` works:

```text
┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐    ┌────────┐
│ input │───►│ func1 │───►│ func2 │───►│  ...  │───►│ funcN │───►│ result │
└───────┘    └───────┘    └───────┘    └───────┘    └───────┘    └────────┘
```

It's important to note that functions passed to `pipe` must have a **single
argument** because they are only called with a single argument.

### Type Parameters

• **A**

• **B** = `never`

• **C** = `never`

• **D** = `never`

• **E** = `never`

• **F** = `never`

### Parameters

• **a**: `A`

• **ab**

• **bc**

• **cd**

• **de**

• **ef**

### Returns

`F`

### Example

```ts
// Example: Chaining Arithmetic Operations
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

### Since

2.0.0

## pipe(a, ab, bc, cd, de, ef, fg)

> **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`): `G`

Pipes the value of an expression into a pipeline of functions.

**When to Use**

This is useful in combination with data-last functions as a simulation of
methods:

```ts
as.map(f).filter(g)
```

becomes:

```ts
import { pipe, Array } from "effect"

pipe(as, Array.map(f), Array.filter(g))
```

**Details**

The `pipe` function is a utility that allows us to compose functions in a
readable and sequential manner. It takes the output of one function and
passes it as the input to the next function in the pipeline. This enables us
to build complex transformations by chaining multiple functions together.

```ts
import { pipe } from "effect"

const result = pipe(input, func1, func2, ..., funcN)
```

In this syntax, `input` is the initial value, and `func1`, `func2`, ...,
`funcN` are the functions to be applied in sequence. The result of each
function becomes the input for the next function, and the final result is
returned.

Here's an illustration of how `pipe` works:

```text
┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐    ┌────────┐
│ input │───►│ func1 │───►│ func2 │───►│  ...  │───►│ funcN │───►│ result │
└───────┘    └───────┘    └───────┘    └───────┘    └───────┘    └────────┘
```

It's important to note that functions passed to `pipe` must have a **single
argument** because they are only called with a single argument.

### Type Parameters

• **A**

• **B** = `never`

• **C** = `never`

• **D** = `never`

• **E** = `never`

• **F** = `never`

• **G** = `never`

### Parameters

• **a**: `A`

• **ab**

• **bc**

• **cd**

• **de**

• **ef**

• **fg**

### Returns

`G`

### Example

```ts
// Example: Chaining Arithmetic Operations
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

### Since

2.0.0

## pipe(a, ab, bc, cd, de, ef, fg, gh)

> **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`): `H`

Pipes the value of an expression into a pipeline of functions.

**When to Use**

This is useful in combination with data-last functions as a simulation of
methods:

```ts
as.map(f).filter(g)
```

becomes:

```ts
import { pipe, Array } from "effect"

pipe(as, Array.map(f), Array.filter(g))
```

**Details**

The `pipe` function is a utility that allows us to compose functions in a
readable and sequential manner. It takes the output of one function and
passes it as the input to the next function in the pipeline. This enables us
to build complex transformations by chaining multiple functions together.

```ts
import { pipe } from "effect"

const result = pipe(input, func1, func2, ..., funcN)
```

In this syntax, `input` is the initial value, and `func1`, `func2`, ...,
`funcN` are the functions to be applied in sequence. The result of each
function becomes the input for the next function, and the final result is
returned.

Here's an illustration of how `pipe` works:

```text
┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐    ┌────────┐
│ input │───►│ func1 │───►│ func2 │───►│  ...  │───►│ funcN │───►│ result │
└───────┘    └───────┘    └───────┘    └───────┘    └───────┘    └────────┘
```

It's important to note that functions passed to `pipe` must have a **single
argument** because they are only called with a single argument.

### Type Parameters

• **A**

• **B** = `never`

• **C** = `never`

• **D** = `never`

• **E** = `never`

• **F** = `never`

• **G** = `never`

• **H** = `never`

### Parameters

• **a**: `A`

• **ab**

• **bc**

• **cd**

• **de**

• **ef**

• **fg**

• **gh**

### Returns

`H`

### Example

```ts
// Example: Chaining Arithmetic Operations
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

### Since

2.0.0

## pipe(a, ab, bc, cd, de, ef, fg, gh, hi)

> **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`): `I`

Pipes the value of an expression into a pipeline of functions.

**When to Use**

This is useful in combination with data-last functions as a simulation of
methods:

```ts
as.map(f).filter(g)
```

becomes:

```ts
import { pipe, Array } from "effect"

pipe(as, Array.map(f), Array.filter(g))
```

**Details**

The `pipe` function is a utility that allows us to compose functions in a
readable and sequential manner. It takes the output of one function and
passes it as the input to the next function in the pipeline. This enables us
to build complex transformations by chaining multiple functions together.

```ts
import { pipe } from "effect"

const result = pipe(input, func1, func2, ..., funcN)
```

In this syntax, `input` is the initial value, and `func1`, `func2`, ...,
`funcN` are the functions to be applied in sequence. The result of each
function becomes the input for the next function, and the final result is
returned.

Here's an illustration of how `pipe` works:

```text
┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐    ┌────────┐
│ input │───►│ func1 │───►│ func2 │───►│  ...  │───►│ funcN │───►│ result │
└───────┘    └───────┘    └───────┘    └───────┘    └───────┘    └────────┘
```

It's important to note that functions passed to `pipe` must have a **single
argument** because they are only called with a single argument.

### Type Parameters

• **A**

• **B** = `never`

• **C** = `never`

• **D** = `never`

• **E** = `never`

• **F** = `never`

• **G** = `never`

• **H** = `never`

• **I** = `never`

### Parameters

• **a**: `A`

• **ab**

• **bc**

• **cd**

• **de**

• **ef**

• **fg**

• **gh**

• **hi**

### Returns

`I`

### Example

```ts
// Example: Chaining Arithmetic Operations
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

### Since

2.0.0

## pipe(a, ab, bc, cd, de, ef, fg, gh, hi, ij)

> **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`): `J`

Pipes the value of an expression into a pipeline of functions.

**When to Use**

This is useful in combination with data-last functions as a simulation of
methods:

```ts
as.map(f).filter(g)
```

becomes:

```ts
import { pipe, Array } from "effect"

pipe(as, Array.map(f), Array.filter(g))
```

**Details**

The `pipe` function is a utility that allows us to compose functions in a
readable and sequential manner. It takes the output of one function and
passes it as the input to the next function in the pipeline. This enables us
to build complex transformations by chaining multiple functions together.

```ts
import { pipe } from "effect"

const result = pipe(input, func1, func2, ..., funcN)
```

In this syntax, `input` is the initial value, and `func1`, `func2`, ...,
`funcN` are the functions to be applied in sequence. The result of each
function becomes the input for the next function, and the final result is
returned.

Here's an illustration of how `pipe` works:

```text
┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐    ┌────────┐
│ input │───►│ func1 │───►│ func2 │───►│  ...  │───►│ funcN │───►│ result │
└───────┘    └───────┘    └───────┘    └───────┘    └───────┘    └────────┘
```

It's important to note that functions passed to `pipe` must have a **single
argument** because they are only called with a single argument.

### Type Parameters

• **A**

• **B** = `never`

• **C** = `never`

• **D** = `never`

• **E** = `never`

• **F** = `never`

• **G** = `never`

• **H** = `never`

• **I** = `never`

• **J** = `never`

### Parameters

• **a**: `A`

• **ab**

• **bc**

• **cd**

• **de**

• **ef**

• **fg**

• **gh**

• **hi**

• **ij**

### Returns

`J`

### Example

```ts
// Example: Chaining Arithmetic Operations
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

### Since

2.0.0

## pipe(a, ab, bc, cd, de, ef, fg, gh, hi, ij, jk)

> **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`): `K`

Pipes the value of an expression into a pipeline of functions.

**When to Use**

This is useful in combination with data-last functions as a simulation of
methods:

```ts
as.map(f).filter(g)
```

becomes:

```ts
import { pipe, Array } from "effect"

pipe(as, Array.map(f), Array.filter(g))
```

**Details**

The `pipe` function is a utility that allows us to compose functions in a
readable and sequential manner. It takes the output of one function and
passes it as the input to the next function in the pipeline. This enables us
to build complex transformations by chaining multiple functions together.

```ts
import { pipe } from "effect"

const result = pipe(input, func1, func2, ..., funcN)
```

In this syntax, `input` is the initial value, and `func1`, `func2`, ...,
`funcN` are the functions to be applied in sequence. The result of each
function becomes the input for the next function, and the final result is
returned.

Here's an illustration of how `pipe` works:

```text
┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐    ┌────────┐
│ input │───►│ func1 │───►│ func2 │───►│  ...  │───►│ funcN │───►│ result │
└───────┘    └───────┘    └───────┘    └───────┘    └───────┘    └────────┘
```

It's important to note that functions passed to `pipe` must have a **single
argument** because they are only called with a single argument.

### Type Parameters

• **A**

• **B** = `never`

• **C** = `never`

• **D** = `never`

• **E** = `never`

• **F** = `never`

• **G** = `never`

• **H** = `never`

• **I** = `never`

• **J** = `never`

• **K** = `never`

### Parameters

• **a**: `A`

• **ab**

• **bc**

• **cd**

• **de**

• **ef**

• **fg**

• **gh**

• **hi**

• **ij**

• **jk**

### Returns

`K`

### Example

```ts
// Example: Chaining Arithmetic Operations
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

### Since

2.0.0

## pipe(a, ab, bc, cd, de, ef, fg, gh, hi, ij, jk, kl)

> **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`): `L`

Pipes the value of an expression into a pipeline of functions.

**When to Use**

This is useful in combination with data-last functions as a simulation of
methods:

```ts
as.map(f).filter(g)
```

becomes:

```ts
import { pipe, Array } from "effect"

pipe(as, Array.map(f), Array.filter(g))
```

**Details**

The `pipe` function is a utility that allows us to compose functions in a
readable and sequential manner. It takes the output of one function and
passes it as the input to the next function in the pipeline. This enables us
to build complex transformations by chaining multiple functions together.

```ts
import { pipe } from "effect"

const result = pipe(input, func1, func2, ..., funcN)
```

In this syntax, `input` is the initial value, and `func1`, `func2`, ...,
`funcN` are the functions to be applied in sequence. The result of each
function becomes the input for the next function, and the final result is
returned.

Here's an illustration of how `pipe` works:

```text
┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐    ┌────────┐
│ input │───►│ func1 │───►│ func2 │───►│  ...  │───►│ funcN │───►│ result │
└───────┘    └───────┘    └───────┘    └───────┘    └───────┘    └────────┘
```

It's important to note that functions passed to `pipe` must have a **single
argument** because they are only called with a single argument.

### Type Parameters

• **A**

• **B** = `never`

• **C** = `never`

• **D** = `never`

• **E** = `never`

• **F** = `never`

• **G** = `never`

• **H** = `never`

• **I** = `never`

• **J** = `never`

• **K** = `never`

• **L** = `never`

### Parameters

• **a**: `A`

• **ab**

• **bc**

• **cd**

• **de**

• **ef**

• **fg**

• **gh**

• **hi**

• **ij**

• **jk**

• **kl**

### Returns

`L`

### Example

```ts
// Example: Chaining Arithmetic Operations
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

### Since

2.0.0

## pipe(a, ab, bc, cd, de, ef, fg, gh, hi, ij, jk, kl, lm)

> **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`, `lm`): `M`

Pipes the value of an expression into a pipeline of functions.

**When to Use**

This is useful in combination with data-last functions as a simulation of
methods:

```ts
as.map(f).filter(g)
```

becomes:

```ts
import { pipe, Array } from "effect"

pipe(as, Array.map(f), Array.filter(g))
```

**Details**

The `pipe` function is a utility that allows us to compose functions in a
readable and sequential manner. It takes the output of one function and
passes it as the input to the next function in the pipeline. This enables us
to build complex transformations by chaining multiple functions together.

```ts
import { pipe } from "effect"

const result = pipe(input, func1, func2, ..., funcN)
```

In this syntax, `input` is the initial value, and `func1`, `func2`, ...,
`funcN` are the functions to be applied in sequence. The result of each
function becomes the input for the next function, and the final result is
returned.

Here's an illustration of how `pipe` works:

```text
┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐    ┌────────┐
│ input │───►│ func1 │───►│ func2 │───►│  ...  │───►│ funcN │───►│ result │
└───────┘    └───────┘    └───────┘    └───────┘    └───────┘    └────────┘
```

It's important to note that functions passed to `pipe` must have a **single
argument** because they are only called with a single argument.

### Type Parameters

• **A**

• **B** = `never`

• **C** = `never`

• **D** = `never`

• **E** = `never`

• **F** = `never`

• **G** = `never`

• **H** = `never`

• **I** = `never`

• **J** = `never`

• **K** = `never`

• **L** = `never`

• **M** = `never`

### Parameters

• **a**: `A`

• **ab**

• **bc**

• **cd**

• **de**

• **ef**

• **fg**

• **gh**

• **hi**

• **ij**

• **jk**

• **kl**

• **lm**

### Returns

`M`

### Example

```ts
// Example: Chaining Arithmetic Operations
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

### Since

2.0.0

## pipe(a, ab, bc, cd, de, ef, fg, gh, hi, ij, jk, kl, lm, mn)

> **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`, `lm`, `mn`): `N`

Pipes the value of an expression into a pipeline of functions.

**When to Use**

This is useful in combination with data-last functions as a simulation of
methods:

```ts
as.map(f).filter(g)
```

becomes:

```ts
import { pipe, Array } from "effect"

pipe(as, Array.map(f), Array.filter(g))
```

**Details**

The `pipe` function is a utility that allows us to compose functions in a
readable and sequential manner. It takes the output of one function and
passes it as the input to the next function in the pipeline. This enables us
to build complex transformations by chaining multiple functions together.

```ts
import { pipe } from "effect"

const result = pipe(input, func1, func2, ..., funcN)
```

In this syntax, `input` is the initial value, and `func1`, `func2`, ...,
`funcN` are the functions to be applied in sequence. The result of each
function becomes the input for the next function, and the final result is
returned.

Here's an illustration of how `pipe` works:

```text
┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐    ┌────────┐
│ input │───►│ func1 │───►│ func2 │───►│  ...  │───►│ funcN │───►│ result │
└───────┘    └───────┘    └───────┘    └───────┘    └───────┘    └────────┘
```

It's important to note that functions passed to `pipe` must have a **single
argument** because they are only called with a single argument.

### Type Parameters

• **A**

• **B** = `never`

• **C** = `never`

• **D** = `never`

• **E** = `never`

• **F** = `never`

• **G** = `never`

• **H** = `never`

• **I** = `never`

• **J** = `never`

• **K** = `never`

• **L** = `never`

• **M** = `never`

• **N** = `never`

### Parameters

• **a**: `A`

• **ab**

• **bc**

• **cd**

• **de**

• **ef**

• **fg**

• **gh**

• **hi**

• **ij**

• **jk**

• **kl**

• **lm**

• **mn**

### Returns

`N`

### Example

```ts
// Example: Chaining Arithmetic Operations
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

### Since

2.0.0

## pipe(a, ab, bc, cd, de, ef, fg, gh, hi, ij, jk, kl, lm, mn, no)

> **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`, `O`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`, `lm`, `mn`, `no`): `O`

Pipes the value of an expression into a pipeline of functions.

**When to Use**

This is useful in combination with data-last functions as a simulation of
methods:

```ts
as.map(f).filter(g)
```

becomes:

```ts
import { pipe, Array } from "effect"

pipe(as, Array.map(f), Array.filter(g))
```

**Details**

The `pipe` function is a utility that allows us to compose functions in a
readable and sequential manner. It takes the output of one function and
passes it as the input to the next function in the pipeline. This enables us
to build complex transformations by chaining multiple functions together.

```ts
import { pipe } from "effect"

const result = pipe(input, func1, func2, ..., funcN)
```

In this syntax, `input` is the initial value, and `func1`, `func2`, ...,
`funcN` are the functions to be applied in sequence. The result of each
function becomes the input for the next function, and the final result is
returned.

Here's an illustration of how `pipe` works:

```text
┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐    ┌────────┐
│ input │───►│ func1 │───►│ func2 │───►│  ...  │───►│ funcN │───►│ result │
└───────┘    └───────┘    └───────┘    └───────┘    └───────┘    └────────┘
```

It's important to note that functions passed to `pipe` must have a **single
argument** because they are only called with a single argument.

### Type Parameters

• **A**

• **B** = `never`

• **C** = `never`

• **D** = `never`

• **E** = `never`

• **F** = `never`

• **G** = `never`

• **H** = `never`

• **I** = `never`

• **J** = `never`

• **K** = `never`

• **L** = `never`

• **M** = `never`

• **N** = `never`

• **O** = `never`

### Parameters

• **a**: `A`

• **ab**

• **bc**

• **cd**

• **de**

• **ef**

• **fg**

• **gh**

• **hi**

• **ij**

• **jk**

• **kl**

• **lm**

• **mn**

• **no**

### Returns

`O`

### Example

```ts
// Example: Chaining Arithmetic Operations
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

### Since

2.0.0

## pipe(a, ab, bc, cd, de, ef, fg, gh, hi, ij, jk, kl, lm, mn, no, op)

> **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`, `O`, `P`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`, `lm`, `mn`, `no`, `op`): `P`

Pipes the value of an expression into a pipeline of functions.

**When to Use**

This is useful in combination with data-last functions as a simulation of
methods:

```ts
as.map(f).filter(g)
```

becomes:

```ts
import { pipe, Array } from "effect"

pipe(as, Array.map(f), Array.filter(g))
```

**Details**

The `pipe` function is a utility that allows us to compose functions in a
readable and sequential manner. It takes the output of one function and
passes it as the input to the next function in the pipeline. This enables us
to build complex transformations by chaining multiple functions together.

```ts
import { pipe } from "effect"

const result = pipe(input, func1, func2, ..., funcN)
```

In this syntax, `input` is the initial value, and `func1`, `func2`, ...,
`funcN` are the functions to be applied in sequence. The result of each
function becomes the input for the next function, and the final result is
returned.

Here's an illustration of how `pipe` works:

```text
┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐    ┌────────┐
│ input │───►│ func1 │───►│ func2 │───►│  ...  │───►│ funcN │───►│ result │
└───────┘    └───────┘    └───────┘    └───────┘    └───────┘    └────────┘
```

It's important to note that functions passed to `pipe` must have a **single
argument** because they are only called with a single argument.

### Type Parameters

• **A**

• **B** = `never`

• **C** = `never`

• **D** = `never`

• **E** = `never`

• **F** = `never`

• **G** = `never`

• **H** = `never`

• **I** = `never`

• **J** = `never`

• **K** = `never`

• **L** = `never`

• **M** = `never`

• **N** = `never`

• **O** = `never`

• **P** = `never`

### Parameters

• **a**: `A`

• **ab**

• **bc**

• **cd**

• **de**

• **ef**

• **fg**

• **gh**

• **hi**

• **ij**

• **jk**

• **kl**

• **lm**

• **mn**

• **no**

• **op**

### Returns

`P`

### Example

```ts
// Example: Chaining Arithmetic Operations
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

### Since

2.0.0

## pipe(a, ab, bc, cd, de, ef, fg, gh, hi, ij, jk, kl, lm, mn, no, op, pq)

> **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`, `O`, `P`, `Q`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`, `lm`, `mn`, `no`, `op`, `pq`): `Q`

Pipes the value of an expression into a pipeline of functions.

**When to Use**

This is useful in combination with data-last functions as a simulation of
methods:

```ts
as.map(f).filter(g)
```

becomes:

```ts
import { pipe, Array } from "effect"

pipe(as, Array.map(f), Array.filter(g))
```

**Details**

The `pipe` function is a utility that allows us to compose functions in a
readable and sequential manner. It takes the output of one function and
passes it as the input to the next function in the pipeline. This enables us
to build complex transformations by chaining multiple functions together.

```ts
import { pipe } from "effect"

const result = pipe(input, func1, func2, ..., funcN)
```

In this syntax, `input` is the initial value, and `func1`, `func2`, ...,
`funcN` are the functions to be applied in sequence. The result of each
function becomes the input for the next function, and the final result is
returned.

Here's an illustration of how `pipe` works:

```text
┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐    ┌────────┐
│ input │───►│ func1 │───►│ func2 │───►│  ...  │───►│ funcN │───►│ result │
└───────┘    └───────┘    └───────┘    └───────┘    └───────┘    └────────┘
```

It's important to note that functions passed to `pipe` must have a **single
argument** because they are only called with a single argument.

### Type Parameters

• **A**

• **B** = `never`

• **C** = `never`

• **D** = `never`

• **E** = `never`

• **F** = `never`

• **G** = `never`

• **H** = `never`

• **I** = `never`

• **J** = `never`

• **K** = `never`

• **L** = `never`

• **M** = `never`

• **N** = `never`

• **O** = `never`

• **P** = `never`

• **Q** = `never`

### Parameters

• **a**: `A`

• **ab**

• **bc**

• **cd**

• **de**

• **ef**

• **fg**

• **gh**

• **hi**

• **ij**

• **jk**

• **kl**

• **lm**

• **mn**

• **no**

• **op**

• **pq**

### Returns

`Q`

### Example

```ts
// Example: Chaining Arithmetic Operations
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

### Since

2.0.0

## pipe(a, ab, bc, cd, de, ef, fg, gh, hi, ij, jk, kl, lm, mn, no, op, pq, qr)

> **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`, `O`, `P`, `Q`, `R`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`, `lm`, `mn`, `no`, `op`, `pq`, `qr`): `R`

Pipes the value of an expression into a pipeline of functions.

**When to Use**

This is useful in combination with data-last functions as a simulation of
methods:

```ts
as.map(f).filter(g)
```

becomes:

```ts
import { pipe, Array } from "effect"

pipe(as, Array.map(f), Array.filter(g))
```

**Details**

The `pipe` function is a utility that allows us to compose functions in a
readable and sequential manner. It takes the output of one function and
passes it as the input to the next function in the pipeline. This enables us
to build complex transformations by chaining multiple functions together.

```ts
import { pipe } from "effect"

const result = pipe(input, func1, func2, ..., funcN)
```

In this syntax, `input` is the initial value, and `func1`, `func2`, ...,
`funcN` are the functions to be applied in sequence. The result of each
function becomes the input for the next function, and the final result is
returned.

Here's an illustration of how `pipe` works:

```text
┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐    ┌────────┐
│ input │───►│ func1 │───►│ func2 │───►│  ...  │───►│ funcN │───►│ result │
└───────┘    └───────┘    └───────┘    └───────┘    └───────┘    └────────┘
```

It's important to note that functions passed to `pipe` must have a **single
argument** because they are only called with a single argument.

### Type Parameters

• **A**

• **B** = `never`

• **C** = `never`

• **D** = `never`

• **E** = `never`

• **F** = `never`

• **G** = `never`

• **H** = `never`

• **I** = `never`

• **J** = `never`

• **K** = `never`

• **L** = `never`

• **M** = `never`

• **N** = `never`

• **O** = `never`

• **P** = `never`

• **Q** = `never`

• **R** = `never`

### Parameters

• **a**: `A`

• **ab**

• **bc**

• **cd**

• **de**

• **ef**

• **fg**

• **gh**

• **hi**

• **ij**

• **jk**

• **kl**

• **lm**

• **mn**

• **no**

• **op**

• **pq**

• **qr**

### Returns

`R`

### Example

```ts
// Example: Chaining Arithmetic Operations
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

### Since

2.0.0

## pipe(a, ab, bc, cd, de, ef, fg, gh, hi, ij, jk, kl, lm, mn, no, op, pq, qr, rs)

> **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`, `O`, `P`, `Q`, `R`, `S`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`, `lm`, `mn`, `no`, `op`, `pq`, `qr`, `rs`): `S`

Pipes the value of an expression into a pipeline of functions.

**When to Use**

This is useful in combination with data-last functions as a simulation of
methods:

```ts
as.map(f).filter(g)
```

becomes:

```ts
import { pipe, Array } from "effect"

pipe(as, Array.map(f), Array.filter(g))
```

**Details**

The `pipe` function is a utility that allows us to compose functions in a
readable and sequential manner. It takes the output of one function and
passes it as the input to the next function in the pipeline. This enables us
to build complex transformations by chaining multiple functions together.

```ts
import { pipe } from "effect"

const result = pipe(input, func1, func2, ..., funcN)
```

In this syntax, `input` is the initial value, and `func1`, `func2`, ...,
`funcN` are the functions to be applied in sequence. The result of each
function becomes the input for the next function, and the final result is
returned.

Here's an illustration of how `pipe` works:

```text
┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐    ┌────────┐
│ input │───►│ func1 │───►│ func2 │───►│  ...  │───►│ funcN │───►│ result │
└───────┘    └───────┘    └───────┘    └───────┘    └───────┘    └────────┘
```

It's important to note that functions passed to `pipe` must have a **single
argument** because they are only called with a single argument.

### Type Parameters

• **A**

• **B** = `never`

• **C** = `never`

• **D** = `never`

• **E** = `never`

• **F** = `never`

• **G** = `never`

• **H** = `never`

• **I** = `never`

• **J** = `never`

• **K** = `never`

• **L** = `never`

• **M** = `never`

• **N** = `never`

• **O** = `never`

• **P** = `never`

• **Q** = `never`

• **R** = `never`

• **S** = `never`

### Parameters

• **a**: `A`

• **ab**

• **bc**

• **cd**

• **de**

• **ef**

• **fg**

• **gh**

• **hi**

• **ij**

• **jk**

• **kl**

• **lm**

• **mn**

• **no**

• **op**

• **pq**

• **qr**

• **rs**

### Returns

`S`

### Example

```ts
// Example: Chaining Arithmetic Operations
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

### Since

2.0.0

## pipe(a, ab, bc, cd, de, ef, fg, gh, hi, ij, jk, kl, lm, mn, no, op, pq, qr, rs, st)

> **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`, `O`, `P`, `Q`, `R`, `S`, `T`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`, `lm`, `mn`, `no`, `op`, `pq`, `qr`, `rs`, `st`): `T`

Pipes the value of an expression into a pipeline of functions.

**When to Use**

This is useful in combination with data-last functions as a simulation of
methods:

```ts
as.map(f).filter(g)
```

becomes:

```ts
import { pipe, Array } from "effect"

pipe(as, Array.map(f), Array.filter(g))
```

**Details**

The `pipe` function is a utility that allows us to compose functions in a
readable and sequential manner. It takes the output of one function and
passes it as the input to the next function in the pipeline. This enables us
to build complex transformations by chaining multiple functions together.

```ts
import { pipe } from "effect"

const result = pipe(input, func1, func2, ..., funcN)
```

In this syntax, `input` is the initial value, and `func1`, `func2`, ...,
`funcN` are the functions to be applied in sequence. The result of each
function becomes the input for the next function, and the final result is
returned.

Here's an illustration of how `pipe` works:

```text
┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐    ┌───────┐    ┌────────┐
│ input │───►│ func1 │───►│ func2 │───►│  ...  │───►│ funcN │───►│ result │
└───────┘    └───────┘    └───────┘    └───────┘    └───────┘    └────────┘
```

It's important to note that functions passed to `pipe` must have a **single
argument** because they are only called with a single argument.

### Type Parameters

• **A**

• **B** = `never`

• **C** = `never`

• **D** = `never`

• **E** = `never`

• **F** = `never`

• **G** = `never`

• **H** = `never`

• **I** = `never`

• **J** = `never`

• **K** = `never`

• **L** = `never`

• **M** = `never`

• **N** = `never`

• **O** = `never`

• **P** = `never`

• **Q** = `never`

• **R** = `never`

• **S** = `never`

• **T** = `never`

### Parameters

• **a**: `A`

• **ab**

• **bc**

• **cd**

• **de**

• **ef**

• **fg**

• **gh**

• **hi**

• **ij**

• **jk**

• **kl**

• **lm**

• **mn**

• **no**

• **op**

• **pq**

• **qr**

• **rs**

• **st**

### Returns

`T`

### Example

```ts
// Example: Chaining Arithmetic Operations
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

### Since

2.0.0
