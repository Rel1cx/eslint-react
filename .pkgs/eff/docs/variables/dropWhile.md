[@local/eff](../README.md) / dropWhile

# Variable: dropWhile

```ts
const dropWhile: {
  <S>(pred: (x: S) => boolean): <T>(xs: T[]) => T[];
  <S, T>(xs: T[], pred: (x: S) => boolean): T[];
};
```

Drops the longest prefix of elements from an array that satisfy the given predicate.

Supports both data-first and data-last (`pipe`-friendly) call styles.

## Call Signature

```ts
<S>(pred: (x: S) => boolean): <T>(xs: T[]) => T[];
```

### Type Parameters

| Type Parameter |
| -------------- |
| `S`            |

### Parameters

| Parameter | Type                    |
| --------- | ----------------------- |
| `pred`    | (`x`: `S`) => `boolean` |

### Returns

\<`T`\>(`xs`: `T`[]) => `T`[]

## Call Signature

```ts
<S, T>(xs: T[], pred: (x: S) => boolean): T[];
```

### Type Parameters

| Type Parameter |
| -------------- |
| `S`            |
| `T`            |

### Parameters

| Parameter | Type                    |
| --------- | ----------------------- |
| `xs`      | `T`[]                   |
| `pred`    | (`x`: `S`) => `boolean` |

### Returns

`T`[]

## Param

**pred**

The predicate to test each element with.

## Returns

A new array without the matching prefix.

## Example

```ts
import { dropWhile, pipe } from "@local/eff";
import * as assert from "node:assert";

// data-first
assert.deepStrictEqual(dropWhile([1, 2, 3, 2, 1], (n: number) => n < 3), [3, 2, 1]);

// data-last
assert.deepStrictEqual(pipe([1, 2, 3, 2, 1], dropWhile((n: number) => n < 3)), [3, 2, 1]);
```
