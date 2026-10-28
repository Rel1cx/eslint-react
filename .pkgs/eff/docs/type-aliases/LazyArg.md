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
import { type LazyArg, constant } from "@local/eff";

const constNull: LazyArg<null> = constant(null);
constNull(); // => null
```

## Type Parameters

| Type Parameter                    |
| --------------------------------- |
| <a id="type-parameter-a"></a> `A` |

## Returns

`A`

## Since

2.0.0
