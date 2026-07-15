[@local/eff](../README.md) / constUndefined

# Variable: constUndefined

```ts
const constUndefined: LazyArg<undefined>;
```

Returns `undefined` when called.

**When to use**

Use when you need a thunk that returns `undefined` on every invocation.

**Example** (Returning undefined from a thunk)

```ts
import { Function } from "effect";
import * as assert from "node:assert";

assert.deepStrictEqual(Function.constUndefined(), undefined);
```

## Since

2.0.0
