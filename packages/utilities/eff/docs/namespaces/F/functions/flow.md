[**@eslint-react/eff**](../../../README.md)

***

[@eslint-react/eff](../../../README.md) / [F](../README.md) / flow

# Function: flow()

## Call Signature

> **flow**\<`A`, `B`\>(`ab`): (...`a`) => `B`

Performs left-to-right function composition. The first argument may have any arity, the remaining arguments must be unary.

See also [`pipe`](#pipe).

### Type Parameters

• **A** *extends* readonly `unknown`[]

• **B** = `never`

### Parameters

#### ab

(...`a`) => `B`

### Returns

`Function`

#### Parameters

##### a

...`A`

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

## Call Signature

> **flow**\<`A`, `B`, `C`\>(`ab`, `bc`): (...`a`) => `C`

Performs left-to-right function composition. The first argument may have any arity, the remaining arguments must be unary.

See also [`pipe`](#pipe).

### Type Parameters

• **A** *extends* readonly `unknown`[]

• **B** = `never`

• **C** = `never`

### Parameters

#### ab

(...`a`) => `B`

#### bc

(`b`) => `C`

### Returns

`Function`

#### Parameters

##### a

...`A`

#### Returns

`C`

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

## Call Signature

> **flow**\<`A`, `B`, `C`, `D`\>(`ab`, `bc`, `cd`): (...`a`) => `D`

Performs left-to-right function composition. The first argument may have any arity, the remaining arguments must be unary.

See also [`pipe`](#pipe).

### Type Parameters

• **A** *extends* readonly `unknown`[]

• **B** = `never`

• **C** = `never`

• **D** = `never`

### Parameters

#### ab

(...`a`) => `B`

#### bc

(`b`) => `C`

#### cd

(`c`) => `D`

### Returns

`Function`

#### Parameters

##### a

...`A`

#### Returns

`D`

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

## Call Signature

> **flow**\<`A`, `B`, `C`, `D`, `E`\>(`ab`, `bc`, `cd`, `de`): (...`a`) => `E`

Performs left-to-right function composition. The first argument may have any arity, the remaining arguments must be unary.

See also [`pipe`](#pipe).

### Type Parameters

• **A** *extends* readonly `unknown`[]

• **B** = `never`

• **C** = `never`

• **D** = `never`

• **E** = `never`

### Parameters

#### ab

(...`a`) => `B`

#### bc

(`b`) => `C`

#### cd

(`c`) => `D`

#### de

(`d`) => `E`

### Returns

`Function`

#### Parameters

##### a

...`A`

#### Returns

`E`

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

## Call Signature

> **flow**\<`A`, `B`, `C`, `D`, `E`, `F`\>(`ab`, `bc`, `cd`, `de`, `ef`): (...`a`) => `F`

Performs left-to-right function composition. The first argument may have any arity, the remaining arguments must be unary.

See also [`pipe`](#pipe).

### Type Parameters

• **A** *extends* readonly `unknown`[]

• **B** = `never`

• **C** = `never`

• **D** = `never`

• **E** = `never`

• **F** = `never`

### Parameters

#### ab

(...`a`) => `B`

#### bc

(`b`) => `C`

#### cd

(`c`) => `D`

#### de

(`d`) => `E`

#### ef

(`e`) => `F`

### Returns

`Function`

#### Parameters

##### a

...`A`

#### Returns

`F`

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

## Call Signature

> **flow**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`\>(`ab`, `bc`, `cd`, `de`, `ef`, `fg`): (...`a`) => `G`

Performs left-to-right function composition. The first argument may have any arity, the remaining arguments must be unary.

See also [`pipe`](#pipe).

### Type Parameters

• **A** *extends* readonly `unknown`[]

• **B** = `never`

• **C** = `never`

• **D** = `never`

• **E** = `never`

• **F** = `never`

• **G** = `never`

### Parameters

#### ab

(...`a`) => `B`

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

`Function`

#### Parameters

##### a

...`A`

#### Returns

`G`

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

## Call Signature

> **flow**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`\>(`ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`): (...`a`) => `H`

Performs left-to-right function composition. The first argument may have any arity, the remaining arguments must be unary.

See also [`pipe`](#pipe).

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

#### ab

(...`a`) => `B`

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

`Function`

#### Parameters

##### a

...`A`

#### Returns

`H`

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

## Call Signature

> **flow**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`\>(`ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`): (...`a`) => `I`

Performs left-to-right function composition. The first argument may have any arity, the remaining arguments must be unary.

See also [`pipe`](#pipe).

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

#### ab

(...`a`) => `B`

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

`Function`

#### Parameters

##### a

...`A`

#### Returns

`I`

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

## Call Signature

> **flow**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`\>(`ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`): (...`a`) => `J`

Performs left-to-right function composition. The first argument may have any arity, the remaining arguments must be unary.

See also [`pipe`](#pipe).

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

#### ab

(...`a`) => `B`

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

`Function`

#### Parameters

##### a

...`A`

#### Returns

`J`

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
