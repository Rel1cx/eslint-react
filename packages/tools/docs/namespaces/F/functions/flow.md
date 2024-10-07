[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [F](../README.md) / flow

# Function: flow()

## flow(ab)

> **flow**\<`A`, `B`\>(`ab`): (...`a`) => `B`

Performs left-to-right function composition. The first argument may have any arity, the remaining arguments must be unary.

See also [`pipe`](#pipe).

### Type Parameters

• **A** *extends* readonly `unknown`[]

• **B** = `never`

### Parameters

• **ab**

### Returns

`Function`

#### Parameters

• ...**a**: `A`

#### Returns

`B`

### Example

```ts
import { flow } from "effect/Function"

const len = (s: string): number => s.length
const double = (n: number): number => n * 2

const f = flow(len, double)

assert.strictEqual(f('aaa'), 6)
```

### Since

2.0.0

## flow(ab, bc)

> **flow**\<`A`, `B`, `C`\>(`ab`, `bc`): (...`a`) => `C`

### Type Parameters

• **A** *extends* readonly `unknown`[]

• **B** = `never`

• **C** = `never`

### Parameters

• **ab**

• **bc**

### Returns

`Function`

#### Parameters

• ...**a**: `A`

#### Returns

`C`

## flow(ab, bc, cd)

> **flow**\<`A`, `B`, `C`, `D`\>(`ab`, `bc`, `cd`): (...`a`) => `D`

### Type Parameters

• **A** *extends* readonly `unknown`[]

• **B** = `never`

• **C** = `never`

• **D** = `never`

### Parameters

• **ab**

• **bc**

• **cd**

### Returns

`Function`

#### Parameters

• ...**a**: `A`

#### Returns

`D`

## flow(ab, bc, cd, de)

> **flow**\<`A`, `B`, `C`, `D`, `E`\>(`ab`, `bc`, `cd`, `de`): (...`a`) => `E`

### Type Parameters

• **A** *extends* readonly `unknown`[]

• **B** = `never`

• **C** = `never`

• **D** = `never`

• **E** = `never`

### Parameters

• **ab**

• **bc**

• **cd**

• **de**

### Returns

`Function`

#### Parameters

• ...**a**: `A`

#### Returns

`E`

## flow(ab, bc, cd, de, ef)

> **flow**\<`A`, `B`, `C`, `D`, `E`, `F`\>(`ab`, `bc`, `cd`, `de`, `ef`): (...`a`) => `F`

### Type Parameters

• **A** *extends* readonly `unknown`[]

• **B** = `never`

• **C** = `never`

• **D** = `never`

• **E** = `never`

• **F** = `never`

### Parameters

• **ab**

• **bc**

• **cd**

• **de**

• **ef**

### Returns

`Function`

#### Parameters

• ...**a**: `A`

#### Returns

`F`

## flow(ab, bc, cd, de, ef, fg)

> **flow**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`\>(`ab`, `bc`, `cd`, `de`, `ef`, `fg`): (...`a`) => `G`

### Type Parameters

• **A** *extends* readonly `unknown`[]

• **B** = `never`

• **C** = `never`

• **D** = `never`

• **E** = `never`

• **F** = `never`

• **G** = `never`

### Parameters

• **ab**

• **bc**

• **cd**

• **de**

• **ef**

• **fg**

### Returns

`Function`

#### Parameters

• ...**a**: `A`

#### Returns

`G`

## flow(ab, bc, cd, de, ef, fg, gh)

> **flow**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`\>(`ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`): (...`a`) => `H`

### Type Parameters

• **A** *extends* readonly `unknown`[]

• **B** = `never`

• **C** = `never`

• **D** = `never`

• **E** = `never`

• **F** = `never`

• **G** = `never`

• **H** = `never`

### Parameters

• **ab**

• **bc**

• **cd**

• **de**

• **ef**

• **fg**

• **gh**

### Returns

`Function`

#### Parameters

• ...**a**: `A`

#### Returns

`H`

## flow(ab, bc, cd, de, ef, fg, gh, hi)

> **flow**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`\>(`ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`): (...`a`) => `I`

### Type Parameters

• **A** *extends* readonly `unknown`[]

• **B** = `never`

• **C** = `never`

• **D** = `never`

• **E** = `never`

• **F** = `never`

• **G** = `never`

• **H** = `never`

• **I** = `never`

### Parameters

• **ab**

• **bc**

• **cd**

• **de**

• **ef**

• **fg**

• **gh**

• **hi**

### Returns

`Function`

#### Parameters

• ...**a**: `A`

#### Returns

`I`

## flow(ab, bc, cd, de, ef, fg, gh, hi, ij)

> **flow**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`\>(`ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`): (...`a`) => `J`

### Type Parameters

• **A** *extends* readonly `unknown`[]

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

`Function`

#### Parameters

• ...**a**: `A`

#### Returns

`J`
