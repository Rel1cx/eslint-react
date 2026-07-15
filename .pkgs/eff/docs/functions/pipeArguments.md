[@local/eff](../README.md) / pipeArguments

# Function: pipeArguments()

```ts
function pipeArguments<A>(self: A, args: IArguments): unknown;
```

Applies a `pipe` method's variadic arguments to an initial value from left
to right.

**When to use**

Use to implement a custom `.pipe(...)` method from JavaScript's `arguments`
object.

**Details**

This helper is intended for implementing `Pipeable.pipe` methods that
receive JavaScript's `arguments` object. With no functions it returns the
original value; otherwise it feeds each result into the next function.

**Example** (Implementing a pipe method)

```ts
import { Pipeable } from "effect";

class NumberBox {
  constructor(readonly value: number) {}

  pipe(..._fns: ReadonlyArray<(value: number) => number>): number {
    return Pipeable.pipeArguments(this.value, arguments) as number;
  }
}

const result = new NumberBox(5).pipe(
  (n) => n + 2,
  (n) => n * 3,
);
console.log(result); // 21
```

## Type Parameters

| Type Parameter |
| -------------- |
| `A`            |

## Parameters

| Parameter | Type         |
| --------- | ------------ |
| `self`    | `A`          |
| `args`    | `IArguments` |

## Returns

`unknown`

## Since

2.0.0
