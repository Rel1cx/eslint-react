[@local/eff](../README.md) / takeWhile

# Variable: takeWhile

```ts
const takeWhile: {
  <S>(pred: (x: S) => boolean): <T>(xs: T[]) => T[];
  <S, T>(xs: T[], pred: (x: S) => boolean): T[];
};
```

Takes the longest prefix of elements from an array that satisfy the given predicate.

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

A new array containing only the matching prefix.

## Example

```ts
import { pipe, takeWhile } from "@local/eff";
import * as assert from "node:assert";

// data-first
assert.deepStrictEqual(takeWhile([1, 2, 3, 2, 1], (n: number) => n < 3), [1, 2]);

// data-last
assert.deepStrictEqual(pipe([1, 2, 3, 2, 1], takeWhile((n: number) => n < 3)), [1, 2]);
```
