[@local/eff](../README.md) / LazyArg

# Type Alias: LazyArg\<A\>

```ts
type LazyArg<A> = () => A;
```

A zero-argument function that produces a value when invoked.

**When to use**

Use to type a lazy value provider that should not run until called.

**Example** (Creating a lazy argument)

```ts
import { Function } from "effect";

const constNull: Function.LazyArg<null> = Function.constant(null);
```

## Type Parameters

| Type Parameter |
| -------------- |
| `A`            |

## Returns

`A`

## Since

2.0.0
