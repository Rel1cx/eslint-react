[**@eslint-react/eff**](../README.md)

***

[@eslint-react/eff](../README.md) / flow

# Function: flow()

## Call Signature

> **flow**\<`A`, `B`\>(`ab`): (...`a`) => `B`

Performs left-to-right function composition. The first argument may have any arity, the remaining arguments must be unary.

See also [`pipe`](#pipe).

### Type Parameters

#### A

`A` *extends* readonly `unknown`[]

#### B

`B` = `never`

### Parameters

#### ab

(...`a`) => `B`

The first function to apply.

### Returns

> (...`a`): `B`

#### Parameters

##### a

...`A`

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

> **flow**\<`A`, `B`, `C`\>(`ab`, `bc`): (...`a`) => `C`

Performs left-to-right function composition. The first argument may have any arity, the remaining arguments must be unary.

See also [`pipe`](#pipe).

### Type Parameters

#### A

`A` *extends* readonly `unknown`[]

#### B

`B` = `never`

#### C

`C` = `never`

### Parameters

#### ab

(...`a`) => `B`

The first function to apply.

#### bc

(`b`) => `C`

### Returns

> (...`a`): `C`

#### Parameters

##### a

...`A`

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

> **flow**\<`A`, `B`, `C`, `D`\>(`ab`, `bc`, `cd`): (...`a`) => `D`

Performs left-to-right function composition. The first argument may have any arity, the remaining arguments must be unary.

See also [`pipe`](#pipe).

### Type Parameters

#### A

`A` *extends* readonly `unknown`[]

#### B

`B` = `never`

#### C

`C` = `never`

#### D

`D` = `never`

### Parameters

#### ab

(...`a`) => `B`

The first function to apply.

#### bc

(`b`) => `C`

#### cd

(`c`) => `D`

### Returns

> (...`a`): `D`

#### Parameters

##### a

...`A`

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

> **flow**\<`A`, `B`, `C`, `D`, `E`\>(`ab`, `bc`, `cd`, `de`): (...`a`) => `E`

Performs left-to-right function composition. The first argument may have any arity, the remaining arguments must be unary.

See also [`pipe`](#pipe).

### Type Parameters

#### A

`A` *extends* readonly `unknown`[]

#### B

`B` = `never`

#### C

`C` = `never`

#### D

`D` = `never`

#### E

`E` = `never`

### Parameters

#### ab

(...`a`) => `B`

The first function to apply.

#### bc

(`b`) => `C`

#### cd

(`c`) => `D`

#### de

(`d`) => `E`

### Returns

> (...`a`): `E`

#### Parameters

##### a

...`A`

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

> **flow**\<`A`, `B`, `C`, `D`, `E`, `F`\>(`ab`, `bc`, `cd`, `de`, `ef`): (...`a`) => `F`

Performs left-to-right function composition. The first argument may have any arity, the remaining arguments must be unary.

See also [`pipe`](#pipe).

### Type Parameters

#### A

`A` *extends* readonly `unknown`[]

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

#### ab

(...`a`) => `B`

The first function to apply.

#### bc

(`b`) => `C`

#### cd

(`c`) => `D`

#### de

(`d`) => `E`

#### ef

(`e`) => `F`

### Returns

> (...`a`): `F`

#### Parameters

##### a

...`A`

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

> **flow**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`\>(`ab`, `bc`, `cd`, `de`, `ef`, `fg`): (...`a`) => `G`

Performs left-to-right function composition. The first argument may have any arity, the remaining arguments must be unary.

See also [`pipe`](#pipe).

### Type Parameters

#### A

`A` *extends* readonly `unknown`[]

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

#### ab

(...`a`) => `B`

The first function to apply.

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

> (...`a`): `G`

#### Parameters

##### a

...`A`

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

> **flow**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`\>(`ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`): (...`a`) => `H`

Performs left-to-right function composition. The first argument may have any arity, the remaining arguments must be unary.

See also [`pipe`](#pipe).

### Type Parameters

#### A

`A` *extends* readonly `unknown`[]

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

#### ab

(...`a`) => `B`

The first function to apply.

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

> (...`a`): `H`

#### Parameters

##### a

...`A`

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

> **flow**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`\>(`ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`): (...`a`) => `I`

Performs left-to-right function composition. The first argument may have any arity, the remaining arguments must be unary.

See also [`pipe`](#pipe).

### Type Parameters

#### A

`A` *extends* readonly `unknown`[]

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

#### ab

(...`a`) => `B`

The first function to apply.

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

> (...`a`): `I`

#### Parameters

##### a

...`A`

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

> **flow**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`\>(`ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`): (...`a`) => `J`

Performs left-to-right function composition. The first argument may have any arity, the remaining arguments must be unary.

See also [`pipe`](#pipe).

### Type Parameters

#### A

`A` *extends* readonly `unknown`[]

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

#### ab

(...`a`) => `B`

The first function to apply.

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

> (...`a`): `J`

#### Parameters

##### a

...`A`

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
