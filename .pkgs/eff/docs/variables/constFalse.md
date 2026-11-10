[@local/eff](../README.md) / constFalse

# Variable: constFalse

```ts
const constFalse: LazyArg<boolean>;
```

Returns `false` when called.

**When to use**

Use when you need a thunk that returns `false` on every invocation.

**Example** (Returning false from a thunk)

```ts
import { constFalse } from "@local/eff";

constFalse(); // => false
```

## Since

2.0.0
