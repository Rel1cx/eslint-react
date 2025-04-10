[**@eslint-react/eff**](../README.md)

***

[@eslint-react/eff](../README.md) / pipe

# Function: pipe()

## Call Signature

> **pipe**\<`A`\>(`a`): `A`

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

#### A

`A`

### Parameters

#### a

`A`

The value to pipe.

### Returns

`A`

### Since

1.0.0

## Call Signature

> **pipe**\<`A`, `B`\>(`a`, `ab`): `B`

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

#### A

`A`

#### B

`B` = `never`

### Parameters

#### a

`A`

The value to pipe.

#### ab

(`a`) => `B`

### Returns

`B`

### Since

1.0.0

## Call Signature

> **pipe**\<`A`, `B`, `C`\>(`a`, `ab`, `bc`): `C`

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

#### A

`A`

#### B

`B` = `never`

#### C

`C` = `never`

### Parameters

#### a

`A`

The value to pipe.

#### ab

(`a`) => `B`

#### bc

(`b`) => `C`

### Returns

`C`

### Since

1.0.0

## Call Signature

> **pipe**\<`A`, `B`, `C`, `D`\>(`a`, `ab`, `bc`, `cd`): `D`

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

#### A

`A`

#### B

`B` = `never`

#### C

`C` = `never`

#### D

`D` = `never`

### Parameters

#### a

`A`

The value to pipe.

#### ab

(`a`) => `B`

#### bc

(`b`) => `C`

#### cd

(`c`) => `D`

### Returns

`D`

### Since

1.0.0

## Call Signature

> **pipe**\<`A`, `B`, `C`, `D`, `E`\>(`a`, `ab`, `bc`, `cd`, `de`): `E`

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

#### A

`A`

#### B

`B` = `never`

#### C

`C` = `never`

#### D

`D` = `never`

#### E

`E` = `never`

### Parameters

#### a

`A`

The value to pipe.

#### ab

(`a`) => `B`

#### bc

(`b`) => `C`

#### cd

(`c`) => `D`

#### de

(`d`) => `E`

### Returns

`E`

### Since

1.0.0

## Call Signature

> **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`): `F`

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

#### A

`A`

#### B

`B` = `never`

#### C

`C` = `never`

#### D

`D` = `never`

#### E

`E` = `never`

#### F

`F` = `never`

### Parameters

#### a

`A`

The value to pipe.

#### ab

(`a`) => `B`

#### bc

(`b`) => `C`

#### cd

(`c`) => `D`

#### de

(`d`) => `E`

#### ef

(`e`) => `F`

### Returns

`F`

### Since

1.0.0

## Call Signature

> **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`): `G`

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

#### A

`A`

#### B

`B` = `never`

#### C

`C` = `never`

#### D

`D` = `never`

#### E

`E` = `never`

#### F

`F` = `never`

#### G

`G` = `never`

### Parameters

#### a

`A`

The value to pipe.

#### ab

(`a`) => `B`

#### bc

(`b`) => `C`

#### cd

(`c`) => `D`

#### de

(`d`) => `E`

#### ef

(`e`) => `F`

#### fg

(`f`) => `G`

### Returns

`G`

### Since

1.0.0

## Call Signature

> **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`): `H`

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

#### A

`A`

#### B

`B` = `never`

#### C

`C` = `never`

#### D

`D` = `never`

#### E

`E` = `never`

#### F

`F` = `never`

#### G

`G` = `never`

#### H

`H` = `never`

### Parameters

#### a

`A`

The value to pipe.

#### ab

(`a`) => `B`

#### bc

(`b`) => `C`

#### cd

(`c`) => `D`

#### de

(`d`) => `E`

#### ef

(`e`) => `F`

#### fg

(`f`) => `G`

#### gh

(`g`) => `H`

### Returns

`H`

### Since

1.0.0

## Call Signature

> **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`): `I`

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

#### A

`A`

#### B

`B` = `never`

#### C

`C` = `never`

#### D

`D` = `never`

#### E

`E` = `never`

#### F

`F` = `never`

#### G

`G` = `never`

#### H

`H` = `never`

#### I

`I` = `never`

### Parameters

#### a

`A`

The value to pipe.

#### ab

(`a`) => `B`

#### bc

(`b`) => `C`

#### cd

(`c`) => `D`

#### de

(`d`) => `E`

#### ef

(`e`) => `F`

#### fg

(`f`) => `G`

#### gh

(`g`) => `H`

#### hi

(`h`) => `I`

### Returns

`I`

### Since

1.0.0

## Call Signature

> **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`): `J`

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

#### A

`A`

#### B

`B` = `never`

#### C

`C` = `never`

#### D

`D` = `never`

#### E

`E` = `never`

#### F

`F` = `never`

#### G

`G` = `never`

#### H

`H` = `never`

#### I

`I` = `never`

#### J

`J` = `never`

### Parameters

#### a

`A`

The value to pipe.

#### ab

(`a`) => `B`

#### bc

(`b`) => `C`

#### cd

(`c`) => `D`

#### de

(`d`) => `E`

#### ef

(`e`) => `F`

#### fg

(`f`) => `G`

#### gh

(`g`) => `H`

#### hi

(`h`) => `I`

#### ij

(`i`) => `J`

### Returns

`J`

### Since

1.0.0

## Call Signature

> **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`): `K`

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

#### A

`A`

#### B

`B` = `never`

#### C

`C` = `never`

#### D

`D` = `never`

#### E

`E` = `never`

#### F

`F` = `never`

#### G

`G` = `never`

#### H

`H` = `never`

#### I

`I` = `never`

#### J

`J` = `never`

#### K

`K` = `never`

### Parameters

#### a

`A`

The value to pipe.

#### ab

(`a`) => `B`

#### bc

(`b`) => `C`

#### cd

(`c`) => `D`

#### de

(`d`) => `E`

#### ef

(`e`) => `F`

#### fg

(`f`) => `G`

#### gh

(`g`) => `H`

#### hi

(`h`) => `I`

#### ij

(`i`) => `J`

#### jk

(`j`) => `K`

### Returns

`K`

### Since

1.0.0

## Call Signature

> **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`): `L`

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

#### A

`A`

#### B

`B` = `never`

#### C

`C` = `never`

#### D

`D` = `never`

#### E

`E` = `never`

#### F

`F` = `never`

#### G

`G` = `never`

#### H

`H` = `never`

#### I

`I` = `never`

#### J

`J` = `never`

#### K

`K` = `never`

#### L

`L` = `never`

### Parameters

#### a

`A`

The value to pipe.

#### ab

(`a`) => `B`

#### bc

(`b`) => `C`

#### cd

(`c`) => `D`

#### de

(`d`) => `E`

#### ef

(`e`) => `F`

#### fg

(`f`) => `G`

#### gh

(`g`) => `H`

#### hi

(`h`) => `I`

#### ij

(`i`) => `J`

#### jk

(`j`) => `K`

#### kl

(`k`) => `L`

### Returns

`L`

### Since

1.0.0

## Call Signature

> **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`, `lm`): `M`

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

#### A

`A`

#### B

`B` = `never`

#### C

`C` = `never`

#### D

`D` = `never`

#### E

`E` = `never`

#### F

`F` = `never`

#### G

`G` = `never`

#### H

`H` = `never`

#### I

`I` = `never`

#### J

`J` = `never`

#### K

`K` = `never`

#### L

`L` = `never`

#### M

`M` = `never`

### Parameters

#### a

`A`

The value to pipe.

#### ab

(`a`) => `B`

#### bc

(`b`) => `C`

#### cd

(`c`) => `D`

#### de

(`d`) => `E`

#### ef

(`e`) => `F`

#### fg

(`f`) => `G`

#### gh

(`g`) => `H`

#### hi

(`h`) => `I`

#### ij

(`i`) => `J`

#### jk

(`j`) => `K`

#### kl

(`k`) => `L`

#### lm

(`l`) => `M`

### Returns

`M`

### Since

1.0.0

## Call Signature

> **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`, `lm`, `mn`): `N`

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

#### A

`A`

#### B

`B` = `never`

#### C

`C` = `never`

#### D

`D` = `never`

#### E

`E` = `never`

#### F

`F` = `never`

#### G

`G` = `never`

#### H

`H` = `never`

#### I

`I` = `never`

#### J

`J` = `never`

#### K

`K` = `never`

#### L

`L` = `never`

#### M

`M` = `never`

#### N

`N` = `never`

### Parameters

#### a

`A`

The value to pipe.

#### ab

(`a`) => `B`

#### bc

(`b`) => `C`

#### cd

(`c`) => `D`

#### de

(`d`) => `E`

#### ef

(`e`) => `F`

#### fg

(`f`) => `G`

#### gh

(`g`) => `H`

#### hi

(`h`) => `I`

#### ij

(`i`) => `J`

#### jk

(`j`) => `K`

#### kl

(`k`) => `L`

#### lm

(`l`) => `M`

#### mn

(`m`) => `N`

### Returns

`N`

### Since

1.0.0

## Call Signature

> **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`, `O`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`, `lm`, `mn`, `no`): `O`

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

#### A

`A`

#### B

`B` = `never`

#### C

`C` = `never`

#### D

`D` = `never`

#### E

`E` = `never`

#### F

`F` = `never`

#### G

`G` = `never`

#### H

`H` = `never`

#### I

`I` = `never`

#### J

`J` = `never`

#### K

`K` = `never`

#### L

`L` = `never`

#### M

`M` = `never`

#### N

`N` = `never`

#### O

`O` = `never`

### Parameters

#### a

`A`

The value to pipe.

#### ab

(`a`) => `B`

#### bc

(`b`) => `C`

#### cd

(`c`) => `D`

#### de

(`d`) => `E`

#### ef

(`e`) => `F`

#### fg

(`f`) => `G`

#### gh

(`g`) => `H`

#### hi

(`h`) => `I`

#### ij

(`i`) => `J`

#### jk

(`j`) => `K`

#### kl

(`k`) => `L`

#### lm

(`l`) => `M`

#### mn

(`m`) => `N`

#### no

(`n`) => `O`

### Returns

`O`

### Since

1.0.0

## Call Signature

> **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`, `O`, `P`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`, `lm`, `mn`, `no`, `op`): `P`

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

#### A

`A`

#### B

`B` = `never`

#### C

`C` = `never`

#### D

`D` = `never`

#### E

`E` = `never`

#### F

`F` = `never`

#### G

`G` = `never`

#### H

`H` = `never`

#### I

`I` = `never`

#### J

`J` = `never`

#### K

`K` = `never`

#### L

`L` = `never`

#### M

`M` = `never`

#### N

`N` = `never`

#### O

`O` = `never`

#### P

`P` = `never`

### Parameters

#### a

`A`

The value to pipe.

#### ab

(`a`) => `B`

#### bc

(`b`) => `C`

#### cd

(`c`) => `D`

#### de

(`d`) => `E`

#### ef

(`e`) => `F`

#### fg

(`f`) => `G`

#### gh

(`g`) => `H`

#### hi

(`h`) => `I`

#### ij

(`i`) => `J`

#### jk

(`j`) => `K`

#### kl

(`k`) => `L`

#### lm

(`l`) => `M`

#### mn

(`m`) => `N`

#### no

(`n`) => `O`

#### op

(`o`) => `P`

### Returns

`P`

### Since

1.0.0

## Call Signature

> **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`, `O`, `P`, `Q`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`, `lm`, `mn`, `no`, `op`, `pq`): `Q`

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

#### A

`A`

#### B

`B` = `never`

#### C

`C` = `never`

#### D

`D` = `never`

#### E

`E` = `never`

#### F

`F` = `never`

#### G

`G` = `never`

#### H

`H` = `never`

#### I

`I` = `never`

#### J

`J` = `never`

#### K

`K` = `never`

#### L

`L` = `never`

#### M

`M` = `never`

#### N

`N` = `never`

#### O

`O` = `never`

#### P

`P` = `never`

#### Q

`Q` = `never`

### Parameters

#### a

`A`

The value to pipe.

#### ab

(`a`) => `B`

#### bc

(`b`) => `C`

#### cd

(`c`) => `D`

#### de

(`d`) => `E`

#### ef

(`e`) => `F`

#### fg

(`f`) => `G`

#### gh

(`g`) => `H`

#### hi

(`h`) => `I`

#### ij

(`i`) => `J`

#### jk

(`j`) => `K`

#### kl

(`k`) => `L`

#### lm

(`l`) => `M`

#### mn

(`m`) => `N`

#### no

(`n`) => `O`

#### op

(`o`) => `P`

#### pq

(`p`) => `Q`

### Returns

`Q`

### Since

1.0.0

## Call Signature

> **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`, `O`, `P`, `Q`, `R`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`, `lm`, `mn`, `no`, `op`, `pq`, `qr`): `R`

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

#### A

`A`

#### B

`B` = `never`

#### C

`C` = `never`

#### D

`D` = `never`

#### E

`E` = `never`

#### F

`F` = `never`

#### G

`G` = `never`

#### H

`H` = `never`

#### I

`I` = `never`

#### J

`J` = `never`

#### K

`K` = `never`

#### L

`L` = `never`

#### M

`M` = `never`

#### N

`N` = `never`

#### O

`O` = `never`

#### P

`P` = `never`

#### Q

`Q` = `never`

#### R

`R` = `never`

### Parameters

#### a

`A`

The value to pipe.

#### ab

(`a`) => `B`

#### bc

(`b`) => `C`

#### cd

(`c`) => `D`

#### de

(`d`) => `E`

#### ef

(`e`) => `F`

#### fg

(`f`) => `G`

#### gh

(`g`) => `H`

#### hi

(`h`) => `I`

#### ij

(`i`) => `J`

#### jk

(`j`) => `K`

#### kl

(`k`) => `L`

#### lm

(`l`) => `M`

#### mn

(`m`) => `N`

#### no

(`n`) => `O`

#### op

(`o`) => `P`

#### pq

(`p`) => `Q`

#### qr

(`q`) => `R`

### Returns

`R`

### Since

1.0.0

## Call Signature

> **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`, `O`, `P`, `Q`, `R`, `S`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`, `lm`, `mn`, `no`, `op`, `pq`, `qr`, `rs`): `S`

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

#### A

`A`

#### B

`B` = `never`

#### C

`C` = `never`

#### D

`D` = `never`

#### E

`E` = `never`

#### F

`F` = `never`

#### G

`G` = `never`

#### H

`H` = `never`

#### I

`I` = `never`

#### J

`J` = `never`

#### K

`K` = `never`

#### L

`L` = `never`

#### M

`M` = `never`

#### N

`N` = `never`

#### O

`O` = `never`

#### P

`P` = `never`

#### Q

`Q` = `never`

#### R

`R` = `never`

#### S

`S` = `never`

### Parameters

#### a

`A`

The value to pipe.

#### ab

(`a`) => `B`

#### bc

(`b`) => `C`

#### cd

(`c`) => `D`

#### de

(`d`) => `E`

#### ef

(`e`) => `F`

#### fg

(`f`) => `G`

#### gh

(`g`) => `H`

#### hi

(`h`) => `I`

#### ij

(`i`) => `J`

#### jk

(`j`) => `K`

#### kl

(`k`) => `L`

#### lm

(`l`) => `M`

#### mn

(`m`) => `N`

#### no

(`n`) => `O`

#### op

(`o`) => `P`

#### pq

(`p`) => `Q`

#### qr

(`q`) => `R`

#### rs

(`r`) => `S`

### Returns

`S`

### Since

1.0.0

## Call Signature

> **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`, `O`, `P`, `Q`, `R`, `S`, `T`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`, `lm`, `mn`, `no`, `op`, `pq`, `qr`, `rs`, `st`): `T`

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

#### A

`A`

#### B

`B` = `never`

#### C

`C` = `never`

#### D

`D` = `never`

#### E

`E` = `never`

#### F

`F` = `never`

#### G

`G` = `never`

#### H

`H` = `never`

#### I

`I` = `never`

#### J

`J` = `never`

#### K

`K` = `never`

#### L

`L` = `never`

#### M

`M` = `never`

#### N

`N` = `never`

#### O

`O` = `never`

#### P

`P` = `never`

#### Q

`Q` = `never`

#### R

`R` = `never`

#### S

`S` = `never`

#### T

`T` = `never`

### Parameters

#### a

`A`

The value to pipe.

#### ab

(`a`) => `B`

#### bc

(`b`) => `C`

#### cd

(`c`) => `D`

#### de

(`d`) => `E`

#### ef

(`e`) => `F`

#### fg

(`f`) => `G`

#### gh

(`g`) => `H`

#### hi

(`h`) => `I`

#### ij

(`i`) => `J`

#### jk

(`j`) => `K`

#### kl

(`k`) => `L`

#### lm

(`l`) => `M`

#### mn

(`m`) => `N`

#### no

(`n`) => `O`

#### op

(`o`) => `P`

#### pq

(`p`) => `Q`

#### qr

(`q`) => `R`

#### rs

(`r`) => `S`

#### st

(`s`) => `T`

### Returns

`T`

### Since

1.0.0
