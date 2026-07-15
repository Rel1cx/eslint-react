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
import { Function } from "effect";
import * as assert from "node:assert";

assert.deepStrictEqual(Function.constFalse(), false);
```

## Since

2.0.0
