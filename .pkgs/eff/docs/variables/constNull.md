[@local/eff](../README.md) / constNull

# Variable: constNull

```ts
const constNull: LazyArg<null>;
```

Returns `null` when called.

**When to use**

Use when you need a thunk that returns `null` on every invocation.

**Example** (Returning null from a thunk)

```ts
import { Function } from "effect";
import * as assert from "node:assert";

assert.deepStrictEqual(Function.constNull(), null);
```

## Since

2.0.0
