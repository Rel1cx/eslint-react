[**@eslint-react/tools**](../README.md)

***

[@eslint-react/tools](../README.md) / isTupleOf

# Function: isTupleOf()

Determine if an `Array` is a tuple with exactly `N` elements, narrowing down the type to `TupleOf`.

An `Array` is considered to be a `TupleOf` if its length is exactly `N`.

## Param

The `Array` to check.

## Param

The exact number of elements that the `Array` should have to be considered a `TupleOf`.

## Example

```ts
import { isTupleOf } from "effect/Predicate"

assert.deepStrictEqual(isTupleOf([1, 2, 3], 3), true);
assert.deepStrictEqual(isTupleOf([1, 2, 3], 2), false);
assert.deepStrictEqual(isTupleOf([1, 2, 3], 4), false);

const arr: number[] = [1, 2, 3];
if (isTupleOf(arr, 3)) {
  console.log(arr);
  // ^? [number, number, number]
}
```

## Since

3.3.0

## Call Signature

> **isTupleOf**\<`N`\>(`n`): \<`T`\>(`self`) => `self is TupleOf<N, T>`

Determine if an `Array` is a tuple with exactly `N` elements, narrowing down the type to `TupleOf`.

An `Array` is considered to be a `TupleOf` if its length is exactly `N`.

### Type Parameters

• **N** *extends* `number`

### Parameters

#### n

`N`

The exact number of elements that the `Array` should have to be considered a `TupleOf`.

### Returns

`Function`

#### Type Parameters

• **T**

#### Parameters

##### self

readonly `T`[]

#### Returns

`self is TupleOf<N, T>`

### Param

The `Array` to check.

### Param

The exact number of elements that the `Array` should have to be considered a `TupleOf`.

### Examples

```ts
import { isTupleOf } from "effect/Predicate"

assert.deepStrictEqual(isTupleOf([1, 2, 3], 3), true);
assert.deepStrictEqual(isTupleOf([1, 2, 3], 2), false);
assert.deepStrictEqual(isTupleOf([1, 2, 3], 4), false);

const arr: number[] = [1, 2, 3];
if (isTupleOf(arr, 3)) {
  console.log(arr);
  // ^? [number, number, number]
}
```

```ts
import { isTupleOf } from "effect/Predicate"

assert.deepStrictEqual(isTupleOf([1, 2, 3], 3), true);
assert.deepStrictEqual(isTupleOf([1, 2, 3], 2), false);
assert.deepStrictEqual(isTupleOf([1, 2, 3], 4), false);

const arr: number[] = [1, 2, 3];
if (isTupleOf(arr, 3)) {
  console.log(arr);
  // ^? [number, number, number]
}
```

### Since

3.3.0

### Since

3.3.0

## Call Signature

> **isTupleOf**\<`T`, `N`\>(`self`, `n`): `self is TupleOf<N, T>`

Determine if an `Array` is a tuple with exactly `N` elements, narrowing down the type to `TupleOf`.

An `Array` is considered to be a `TupleOf` if its length is exactly `N`.

### Type Parameters

• **T**

• **N** *extends* `number`

### Parameters

#### self

readonly `T`[]

The `Array` to check.

#### n

`N`

The exact number of elements that the `Array` should have to be considered a `TupleOf`.

### Returns

`self is TupleOf<N, T>`

### Param

The `Array` to check.

### Param

The exact number of elements that the `Array` should have to be considered a `TupleOf`.

### Examples

```ts
import { isTupleOf } from "effect/Predicate"

assert.deepStrictEqual(isTupleOf([1, 2, 3], 3), true);
assert.deepStrictEqual(isTupleOf([1, 2, 3], 2), false);
assert.deepStrictEqual(isTupleOf([1, 2, 3], 4), false);

const arr: number[] = [1, 2, 3];
if (isTupleOf(arr, 3)) {
  console.log(arr);
  // ^? [number, number, number]
}
```

```ts
import { isTupleOf } from "effect/Predicate"

assert.deepStrictEqual(isTupleOf([1, 2, 3], 3), true);
assert.deepStrictEqual(isTupleOf([1, 2, 3], 2), false);
assert.deepStrictEqual(isTupleOf([1, 2, 3], 4), false);

const arr: number[] = [1, 2, 3];
if (isTupleOf(arr, 3)) {
  console.log(arr);
  // ^? [number, number, number]
}
```

### Since

3.3.0

### Since

3.3.0
