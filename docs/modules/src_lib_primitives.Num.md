[eslint-plugin-react-ts](../README.md) / [src/lib/primitives](src_lib_primitives.md) / Num

# Namespace: Num

[src/lib/primitives](src_lib_primitives.md).Num

## Table of contents

### Functions

- [Equivalence](src_lib_primitives.Num.md#equivalence)
- [Order](src_lib_primitives.Num.md#order)
- [between](src_lib_primitives.Num.md#between)
- [clamp](src_lib_primitives.Num.md#clamp)
- [decrement](src_lib_primitives.Num.md#decrement)
- [divide](src_lib_primitives.Num.md#divide)
- [greaterThan](src_lib_primitives.Num.md#greaterthan)
- [greaterThanOrEqualTo](src_lib_primitives.Num.md#greaterthanorequalto)
- [increment](src_lib_primitives.Num.md#increment)
- [isNumber](src_lib_primitives.Num.md#isnumber)
- [lessThan](src_lib_primitives.Num.md#lessthan)
- [lessThanOrEqualTo](src_lib_primitives.Num.md#lessthanorequalto)
- [max](src_lib_primitives.Num.md#max)
- [min](src_lib_primitives.Num.md#min)
- [multiply](src_lib_primitives.Num.md#multiply)
- [multiplyAll](src_lib_primitives.Num.md#multiplyall)
- [remainder](src_lib_primitives.Num.md#remainder)
- [sign](src_lib_primitives.Num.md#sign)
- [subtract](src_lib_primitives.Num.md#subtract)
- [sum](src_lib_primitives.Num.md#sum)
- [sumAll](src_lib_primitives.Num.md#sumall)

## Other

### clamp

▸ **clamp**(`minimum`, `maximum`): (`self`: `number`) => `number`

Restricts the given `number` to be within the range specified by the `minimum` and `maximum` values.

- If the `number` is less than the `minimum` value, the function returns the `minimum` value.
- If the `number` is greater than the `maximum` value, the function returns the `maximum` value.
- Otherwise, it returns the original `number`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `minimum` | `number` | The lower end of the range. |
| `maximum` | `number` | The upper end of the range. |

#### Returns

`fn`

▸ (`self`): `number`

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `number` |

##### Returns

`number`

**`Example`**

```ts
import { clamp } from '@effect/data/Number'

assert.deepStrictEqual(clamp(0, 5)(3), 3)
assert.deepStrictEqual(clamp(0, 5)(-1), 0)
assert.deepStrictEqual(clamp(0, 5)(6), 5)
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Number.d.ts:258

▸ **clamp**(`self`, `minimum`, `maximum`): `number`

Restricts the given `number` to be within the range specified by the `minimum` and `maximum` values.

- If the `number` is less than the `minimum` value, the function returns the `minimum` value.
- If the `number` is greater than the `maximum` value, the function returns the `maximum` value.
- Otherwise, it returns the original `number`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `self` | `number` | The `number` to be clamped. |
| `minimum` | `number` | The lower end of the range. |
| `maximum` | `number` | The upper end of the range. |

#### Returns

`number`

**`Example`**

```ts
import { clamp } from '@effect/data/Number'

assert.deepStrictEqual(clamp(0, 5)(3), 3)
assert.deepStrictEqual(clamp(0, 5)(-1), 0)
assert.deepStrictEqual(clamp(0, 5)(6), 5)
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Number.d.ts:259

___

### max

▸ **max**(`that`): (`self`: `number`) => `number`

Returns the maximum between two `number`s.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `that` | `number` | The second `number`. |

#### Returns

`fn`

▸ (`self`): `number`

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `number` |

##### Returns

`number`

**`Example`**

```ts
import { max } from '@effect/data/Number'

assert.deepStrictEqual(max(2, 3), 3)
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Number.d.ts:292

▸ **max**(`self`, `that`): `number`

Returns the maximum between two `number`s.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `self` | `number` | The first `number`. |
| `that` | `number` | The second `number`. |

#### Returns

`number`

**`Example`**

```ts
import { max } from '@effect/data/Number'

assert.deepStrictEqual(max(2, 3), 3)
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Number.d.ts:293

___

### min

▸ **min**(`that`): (`self`: `number`) => `number`

Returns the minimum between two `number`s.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `that` | `number` | The second `number`. |

#### Returns

`fn`

▸ (`self`): `number`

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `number` |

##### Returns

`number`

**`Example`**

```ts
import { min } from '@effect/data/Number'

assert.deepStrictEqual(min(2, 3), 2)
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Number.d.ts:275

▸ **min**(`self`, `that`): `number`

Returns the minimum between two `number`s.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `self` | `number` | The first `number`. |
| `that` | `number` | The second `number`. |

#### Returns

`number`

**`Example`**

```ts
import { min } from '@effect/data/Number'

assert.deepStrictEqual(min(2, 3), 2)
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Number.d.ts:276

## guards

### isNumber

▸ **isNumber**(`input`): input is number

Tests if a value is a `number`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `unknown` | The value to test. |

#### Returns

input is number

**`Example`**

```ts
import { isNumber } from '@effect/data/Number'

assert.deepStrictEqual(isNumber(2), true)
assert.deepStrictEqual(isNumber("2"), false)
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Number.d.ts:25

## instances

### Equivalence

▸ **Equivalence**(`self`, `that`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `number` |
| `that` | `number` |

#### Returns

`boolean`

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Equivalence.d.ts:7

___

### Order

▸ **Order**(`self`, `that`): ``0`` \| ``1`` \| ``-1``

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `number` |
| `that` | `number` |

#### Returns

``0`` \| ``1`` \| ``-1``

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Order.d.ts:7

## math

### decrement

▸ **decrement**(`n`): `number`

Decrements a number by `1`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `n` | `number` | A `number` to be decremented. |

#### Returns

`number`

**`Example`**

```ts
import { decrement } from '@effect/data/Number'

assert.deepStrictEqual(decrement(3), 2)
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Number.d.ts:125

___

### divide

▸ **divide**(`that`): (`self`: `number`) => `number`

Provides a division operation on `number`s.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `that` | `number` | The divisor operand. |

#### Returns

`fn`

▸ (`self`): `number`

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `number` |

##### Returns

`number`

**`Example`**

```ts
import { divide } from '@effect/data/Number'

assert.deepStrictEqual(divide(6, 3), 2)
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Number.d.ts:95

▸ **divide**(`self`, `that`): `number`

Provides a division operation on `number`s.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `self` | `number` | The dividend operand. |
| `that` | `number` | The divisor operand. |

#### Returns

`number`

**`Example`**

```ts
import { divide } from '@effect/data/Number'

assert.deepStrictEqual(divide(6, 3), 2)
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Number.d.ts:96

___

### increment

▸ **increment**(`n`): `number`

Returns the result of adding `1` to a given number.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `n` | `number` | A `number` to be incremented. |

#### Returns

`number`

**`Example`**

```ts
import { increment } from '@effect/data/Number'

assert.deepStrictEqual(increment(2), 3)
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Number.d.ts:111

___

### multiply

▸ **multiply**(`that`): (`self`: `number`) => `number`

Provides a multiplication operation on `number`s.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `that` | `number` | The second operand. |

#### Returns

`fn`

▸ (`self`): `number`

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `number` |

##### Returns

`number`

**`Example`**

```ts
import { multiply } from '@effect/data/Number'

assert.deepStrictEqual(multiply(2, 3), 6)
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Number.d.ts:59

▸ **multiply**(`self`, `that`): `number`

Provides a multiplication operation on `number`s.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `self` | `number` | The first operand. |
| `that` | `number` | The second operand. |

#### Returns

`number`

**`Example`**

```ts
import { multiply } from '@effect/data/Number'

assert.deepStrictEqual(multiply(2, 3), 6)
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Number.d.ts:60

___

### multiplyAll

▸ **multiplyAll**(`collection`): `number`

Takes an `Iterable` of `number`s and returns their multiplication as a single `number`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `collection` | `Iterable`<`number`\> | The collection of `number`s to multiply. |

#### Returns

`number`

**`Example`**

```ts
import { multiplyAll } from '@effect/data/Number'

assert.deepStrictEqual(multiplyAll([2, 3, 4]), 24)
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Number.d.ts:338

___

### remainder

▸ **remainder**(`divisor`): (`self`: `number`) => `number`

Returns the remainder left over when one operand is divided by a second operand.

It always takes the sign of the dividend.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `divisor` | `number` | The divisor. |

#### Returns

`fn`

▸ (`self`): `number`

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `number` |

##### Returns

`number`

**`Example`**

```ts
import { remainder } from "@effect/data/Number"

assert.deepStrictEqual(remainder(2, 2), 0)
assert.deepStrictEqual(remainder(3, 2), 1)
assert.deepStrictEqual(remainder(-4, 2), -0)
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Number.d.ts:358

▸ **remainder**(`self`, `divisor`): `number`

Returns the remainder left over when one operand is divided by a second operand.

It always takes the sign of the dividend.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `self` | `number` | The dividend. |
| `divisor` | `number` | The divisor. |

#### Returns

`number`

**`Example`**

```ts
import { remainder } from "@effect/data/Number"

assert.deepStrictEqual(remainder(2, 2), 0)
assert.deepStrictEqual(remainder(3, 2), 1)
assert.deepStrictEqual(remainder(-4, 2), -0)
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Number.d.ts:359

___

### sign

▸ **sign**(`n`): `Ordering`

Determines the sign of a given `number`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `n` | `number` | The `number` to determine the sign of. |

#### Returns

`Ordering`

**`Example`**

```ts
import { sign } from '@effect/data/Number'

assert.deepStrictEqual(sign(-5), -1)
assert.deepStrictEqual(sign(0), 0)
assert.deepStrictEqual(sign(5), 1)
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Number.d.ts:310

___

### subtract

▸ **subtract**(`that`): (`self`: `number`) => `number`

Provides a subtraction operation on `number`s.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `that` | `number` | The second operand. |

#### Returns

`fn`

▸ (`self`): `number`

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `number` |

##### Returns

`number`

**`Example`**

```ts
import { subtract } from '@effect/data/Number'

assert.deepStrictEqual(subtract(2, 3), -1)
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Number.d.ts:77

▸ **subtract**(`self`, `that`): `number`

Provides a subtraction operation on `number`s.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `self` | `number` | The first operand. |
| `that` | `number` | The second operand. |

#### Returns

`number`

**`Example`**

```ts
import { subtract } from '@effect/data/Number'

assert.deepStrictEqual(subtract(2, 3), -1)
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Number.d.ts:78

___

### sum

▸ **sum**(`that`): (`self`: `number`) => `number`

Provides an addition operation on `number`s.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `that` | `number` | The second operand. |

#### Returns

`fn`

▸ (`self`): `number`

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `number` |

##### Returns

`number`

**`Example`**

```ts
import { sum } from '@effect/data/Number'

assert.deepStrictEqual(sum(2, 3), 5)
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Number.d.ts:41

▸ **sum**(`self`, `that`): `number`

Provides an addition operation on `number`s.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `self` | `number` | The first operand. |
| `that` | `number` | The second operand. |

#### Returns

`number`

**`Example`**

```ts
import { sum } from '@effect/data/Number'

assert.deepStrictEqual(sum(2, 3), 5)
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Number.d.ts:42

___

### sumAll

▸ **sumAll**(`collection`): `number`

Takes an `Iterable` of `number`s and returns their sum as a single `number`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `collection` | `Iterable`<`number`\> | The collection of `number`s to sum. |

#### Returns

`number`

**`Example`**

```ts
import { sumAll } from '@effect/data/Number'

assert.deepStrictEqual(sumAll([2, 3, 4]), 9)
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Number.d.ts:324

## predicates

### between

▸ **between**(`minimum`, `maximum`): (`self`: `number`) => `boolean`

Checks if a `number` is between a `minimum` and `maximum` value (inclusive).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `minimum` | `number` | The `minimum` value to check. |
| `maximum` | `number` | The `maximum` value to check. |

#### Returns

`fn`

▸ (`self`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `number` |

##### Returns

`boolean`

**`Example`**

```ts
import { between } from '@effect/data/Number'

assert.deepStrictEqual(between(0, 5)(3), true)
assert.deepStrictEqual(between(0, 5)(-1), false)
assert.deepStrictEqual(between(0, 5)(6), false)
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Number.d.ts:234

▸ **between**(`self`, `minimum`, `maximum`): `boolean`

Checks if a `number` is between a `minimum` and `maximum` value (inclusive).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `self` | `number` | The `number` to check. |
| `minimum` | `number` | The `minimum` value to check. |
| `maximum` | `number` | The `maximum` value to check. |

#### Returns

`boolean`

**`Example`**

```ts
import { between } from '@effect/data/Number'

assert.deepStrictEqual(between(0, 5)(3), true)
assert.deepStrictEqual(between(0, 5)(-1), false)
assert.deepStrictEqual(between(0, 5)(6), false)
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Number.d.ts:235

___

### greaterThan

▸ **greaterThan**(`that`): (`self`: `number`) => `boolean`

Returns `true` if the first argument is greater than the second, otherwise `false`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `that` | `number` | The second argument. |

#### Returns

`fn`

▸ (`self`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `number` |

##### Returns

`boolean`

**`Example`**

```ts
import { greaterThan } from '@effect/data/Number'

assert.deepStrictEqual(greaterThan(2, 3), false)
assert.deepStrictEqual(greaterThan(3, 3), false)
assert.deepStrictEqual(greaterThan(4, 3), true)
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Number.d.ts:193

▸ **greaterThan**(`self`, `that`): `boolean`

Returns `true` if the first argument is greater than the second, otherwise `false`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `self` | `number` | The first argument. |
| `that` | `number` | The second argument. |

#### Returns

`boolean`

**`Example`**

```ts
import { greaterThan } from '@effect/data/Number'

assert.deepStrictEqual(greaterThan(2, 3), false)
assert.deepStrictEqual(greaterThan(3, 3), false)
assert.deepStrictEqual(greaterThan(4, 3), true)
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Number.d.ts:194

___

### greaterThanOrEqualTo

▸ **greaterThanOrEqualTo**(`that`): (`self`: `number`) => `boolean`

Returns a function that checks if a given `number` is greater than or equal to the provided one.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `that` | `number` | The second `number` to compare with. |

#### Returns

`fn`

▸ (`self`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `number` |

##### Returns

`boolean`

**`Example`**

```ts
import { greaterThanOrEqualTo } from '@effect/data/Number'

assert.deepStrictEqual(greaterThanOrEqualTo(2, 3), false)
assert.deepStrictEqual(greaterThanOrEqualTo(3, 3), true)
assert.deepStrictEqual(greaterThanOrEqualTo(4, 3), true)
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Number.d.ts:213

▸ **greaterThanOrEqualTo**(`self`, `that`): `boolean`

Returns a function that checks if a given `number` is greater than or equal to the provided one.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `self` | `number` | The first `number` to compare with. |
| `that` | `number` | The second `number` to compare with. |

#### Returns

`boolean`

**`Example`**

```ts
import { greaterThanOrEqualTo } from '@effect/data/Number'

assert.deepStrictEqual(greaterThanOrEqualTo(2, 3), false)
assert.deepStrictEqual(greaterThanOrEqualTo(3, 3), true)
assert.deepStrictEqual(greaterThanOrEqualTo(4, 3), true)
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Number.d.ts:214

___

### lessThan

▸ **lessThan**(`that`): (`self`: `number`) => `boolean`

Returns `true` if the first argument is less than the second, otherwise `false`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `that` | `number` | The second argument. |

#### Returns

`fn`

▸ (`self`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `number` |

##### Returns

`boolean`

**`Example`**

```ts
import { lessThan } from '@effect/data/Number'

assert.deepStrictEqual(lessThan(2, 3), true)
assert.deepStrictEqual(lessThan(3, 3), false)
assert.deepStrictEqual(lessThan(4, 3), false)
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Number.d.ts:153

▸ **lessThan**(`self`, `that`): `boolean`

Returns `true` if the first argument is less than the second, otherwise `false`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `self` | `number` | The first argument. |
| `that` | `number` | The second argument. |

#### Returns

`boolean`

**`Example`**

```ts
import { lessThan } from '@effect/data/Number'

assert.deepStrictEqual(lessThan(2, 3), true)
assert.deepStrictEqual(lessThan(3, 3), false)
assert.deepStrictEqual(lessThan(4, 3), false)
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Number.d.ts:154

___

### lessThanOrEqualTo

▸ **lessThanOrEqualTo**(`that`): (`self`: `number`) => `boolean`

Returns a function that checks if a given `number` is less than or equal to the provided one.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `that` | `number` | The second `number` to compare with. |

#### Returns

`fn`

▸ (`self`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `number` |

##### Returns

`boolean`

**`Example`**

```ts
import { lessThanOrEqualTo } from '@effect/data/Number'

assert.deepStrictEqual(lessThanOrEqualTo(2, 3), true)
assert.deepStrictEqual(lessThanOrEqualTo(3, 3), true)
assert.deepStrictEqual(lessThanOrEqualTo(4, 3), false)
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Number.d.ts:173

▸ **lessThanOrEqualTo**(`self`, `that`): `boolean`

Returns a function that checks if a given `number` is less than or equal to the provided one.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `self` | `number` | The first `number` to compare with. |
| `that` | `number` | The second `number` to compare with. |

#### Returns

`boolean`

**`Example`**

```ts
import { lessThanOrEqualTo } from '@effect/data/Number'

assert.deepStrictEqual(lessThanOrEqualTo(2, 3), true)
assert.deepStrictEqual(lessThanOrEqualTo(3, 3), true)
assert.deepStrictEqual(lessThanOrEqualTo(4, 3), false)
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Number.d.ts:174
