[**@eslint-react/eff**](../README.md)

***

[@eslint-react/eff](../README.md) / compose

# Variable: compose()

> `const` **compose**: \{\<`B`, `C`\>(`bc`): \<`A`\>(`self`) => (`a`) => `C`; \<`A`, `B`, `C`\>(`self`, `bc`): (`a`) => `C`; \}

Composes two functions, `ab` and `bc` into a single function that takes in an argument `a` of type `A` and returns a result of type `C`.
The result is obtained by first applying the `ab` function to `a` and then applying the `bc` function to the result of `ab`.

## Call Signature

> \<`B`, `C`\>(`bc`): \<`A`\>(`self`) => (`a`) => `C`

### Type Parameters

#### B

`B`

#### C

`C`

### Parameters

#### bc

(`b`) => `C`

### Returns

> \<`A`\>(`self`): (`a`) => `C`

#### Type Parameters

##### A

`A`

#### Parameters

##### self

(`a`) => `B`

#### Returns

> (`a`): `C`

##### Parameters

###### a

`A`

##### Returns

`C`

## Call Signature

> \<`A`, `B`, `C`\>(`self`, `bc`): (`a`) => `C`

### Type Parameters

#### A

`A`

#### B

`B`

#### C

`C`

### Parameters

#### self

(`a`) => `B`

#### bc

(`b`) => `C`

### Returns

> (`a`): `C`

#### Parameters

##### a

`A`

#### Returns

`C`

## Example

```ts
import * as assert from "node:assert"
import { compose } from "effect/Function"

const increment = (n: number) => n + 1;
const square = (n: number) => n * n;

assert.strictEqual(compose(increment, square)(2), 9);
```

## Since

1.0.0
