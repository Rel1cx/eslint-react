[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [F](../README.md) / pipe

# Function: pipe()

## pipe(a)

> **pipe**\<`A`\>(`a`): `A`

Pipes the value of an expression into a pipeline of functions.

This is useful in combination with data-last functions as a simulation of methods:

```
as.map(f).filter(g) -> pipe(as, map(f), filter(g))
```

### Type Parameters

• **A**

### Parameters

• **a**: `A`

### Returns

`A`

### Example

```ts
import { pipe } from "effect/Function"
// Alternatively, you can use the following import syntax, as `pipe` is also conveniently exported from the `effect` entry point:
// import { pipe } from "effect"

const length = (s: string): number => s.length
const double = (n: number): number => n * 2
const decrement = (n: number): number => n - 1

assert.deepStrictEqual(pipe(length("hello"), double, decrement), 9)
```

### Since

2.0.0

## pipe(a, ab)

> **pipe**\<`A`, `B`\>(`a`, `ab`): `B`

### Type Parameters

• **A**

• **B**

### Parameters

• **a**: `A`

• **ab**

### Returns

`B`

## pipe(a, ab, bc)

> **pipe**\<`A`, `B`, `C`\>(`a`, `ab`, `bc`): `C`

### Type Parameters

• **A**

• **B**

• **C**

### Parameters

• **a**: `A`

• **ab**

• **bc**

### Returns

`C`

## pipe(a, ab, bc, cd)

> **pipe**\<`A`, `B`, `C`, `D`\>(`a`, `ab`, `bc`, `cd`): `D`

### Type Parameters

• **A**

• **B**

• **C**

• **D**

### Parameters

• **a**: `A`

• **ab**

• **bc**

• **cd**

### Returns

`D`

## pipe(a, ab, bc, cd, de)

> **pipe**\<`A`, `B`, `C`, `D`, `E`\>(`a`, `ab`, `bc`, `cd`, `de`): `E`

### Type Parameters

• **A**

• **B**

• **C**

• **D**

• **E**

### Parameters

• **a**: `A`

• **ab**

• **bc**

• **cd**

• **de**

### Returns

`E`

## pipe(a, ab, bc, cd, de, ef)

> **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`): `F`

### Type Parameters

• **A**

• **B**

• **C**

• **D**

• **E**

• **F**

### Parameters

• **a**: `A`

• **ab**

• **bc**

• **cd**

• **de**

• **ef**

### Returns

`F`

## pipe(a, ab, bc, cd, de, ef, fg)

> **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`): `G`

### Type Parameters

• **A**

• **B**

• **C**

• **D**

• **E**

• **F**

• **G**

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

## pipe(a, ab, bc, cd, de, ef, fg, gh)

> **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`): `H`

### Type Parameters

• **A**

• **B**

• **C**

• **D**

• **E**

• **F**

• **G**

• **H**

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

## pipe(a, ab, bc, cd, de, ef, fg, gh, hi)

> **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`): `I`

### Type Parameters

• **A**

• **B**

• **C**

• **D**

• **E**

• **F**

• **G**

• **H**

• **I**

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

## pipe(a, ab, bc, cd, de, ef, fg, gh, hi, ij)

> **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`): `J`

### Type Parameters

• **A**

• **B**

• **C**

• **D**

• **E**

• **F**

• **G**

• **H**

• **I**

• **J**

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

## pipe(a, ab, bc, cd, de, ef, fg, gh, hi, ij, jk)

> **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`): `K`

### Type Parameters

• **A**

• **B**

• **C**

• **D**

• **E**

• **F**

• **G**

• **H**

• **I**

• **J**

• **K**

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

## pipe(a, ab, bc, cd, de, ef, fg, gh, hi, ij, jk, kl)

> **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`): `L`

### Type Parameters

• **A**

• **B**

• **C**

• **D**

• **E**

• **F**

• **G**

• **H**

• **I**

• **J**

• **K**

• **L**

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

## pipe(a, ab, bc, cd, de, ef, fg, gh, hi, ij, jk, kl, lm)

> **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`, `lm`): `M`

### Type Parameters

• **A**

• **B**

• **C**

• **D**

• **E**

• **F**

• **G**

• **H**

• **I**

• **J**

• **K**

• **L**

• **M**

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

## pipe(a, ab, bc, cd, de, ef, fg, gh, hi, ij, jk, kl, lm, mn)

> **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`, `lm`, `mn`): `N`

### Type Parameters

• **A**

• **B**

• **C**

• **D**

• **E**

• **F**

• **G**

• **H**

• **I**

• **J**

• **K**

• **L**

• **M**

• **N**

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

## pipe(a, ab, bc, cd, de, ef, fg, gh, hi, ij, jk, kl, lm, mn, no)

> **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`, `O`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`, `lm`, `mn`, `no`): `O`

### Type Parameters

• **A**

• **B**

• **C**

• **D**

• **E**

• **F**

• **G**

• **H**

• **I**

• **J**

• **K**

• **L**

• **M**

• **N**

• **O**

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

## pipe(a, ab, bc, cd, de, ef, fg, gh, hi, ij, jk, kl, lm, mn, no, op)

> **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`, `O`, `P`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`, `lm`, `mn`, `no`, `op`): `P`

### Type Parameters

• **A**

• **B**

• **C**

• **D**

• **E**

• **F**

• **G**

• **H**

• **I**

• **J**

• **K**

• **L**

• **M**

• **N**

• **O**

• **P**

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

## pipe(a, ab, bc, cd, de, ef, fg, gh, hi, ij, jk, kl, lm, mn, no, op, pq)

> **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`, `O`, `P`, `Q`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`, `lm`, `mn`, `no`, `op`, `pq`): `Q`

### Type Parameters

• **A**

• **B**

• **C**

• **D**

• **E**

• **F**

• **G**

• **H**

• **I**

• **J**

• **K**

• **L**

• **M**

• **N**

• **O**

• **P**

• **Q**

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

## pipe(a, ab, bc, cd, de, ef, fg, gh, hi, ij, jk, kl, lm, mn, no, op, pq, qr)

> **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`, `O`, `P`, `Q`, `R`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`, `lm`, `mn`, `no`, `op`, `pq`, `qr`): `R`

### Type Parameters

• **A**

• **B**

• **C**

• **D**

• **E**

• **F**

• **G**

• **H**

• **I**

• **J**

• **K**

• **L**

• **M**

• **N**

• **O**

• **P**

• **Q**

• **R**

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

## pipe(a, ab, bc, cd, de, ef, fg, gh, hi, ij, jk, kl, lm, mn, no, op, pq, qr, rs)

> **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`, `O`, `P`, `Q`, `R`, `S`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`, `lm`, `mn`, `no`, `op`, `pq`, `qr`, `rs`): `S`

### Type Parameters

• **A**

• **B**

• **C**

• **D**

• **E**

• **F**

• **G**

• **H**

• **I**

• **J**

• **K**

• **L**

• **M**

• **N**

• **O**

• **P**

• **Q**

• **R**

• **S**

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

## pipe(a, ab, bc, cd, de, ef, fg, gh, hi, ij, jk, kl, lm, mn, no, op, pq, qr, rs, st)

> **pipe**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`, `O`, `P`, `Q`, `R`, `S`, `T`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`, `lm`, `mn`, `no`, `op`, `pq`, `qr`, `rs`, `st`): `T`

### Type Parameters

• **A**

• **B**

• **C**

• **D**

• **E**

• **F**

• **G**

• **H**

• **I**

• **J**

• **K**

• **L**

• **M**

• **N**

• **O**

• **P**

• **Q**

• **R**

• **S**

• **T**

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
