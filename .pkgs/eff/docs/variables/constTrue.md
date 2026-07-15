[@local/eff](../README.md) / constTrue

# Variable: constTrue

```ts
const constTrue: LazyArg<boolean>;
```

Returns `true` when called.

**When to use**

Use when you need a thunk that returns `true` on every invocation.

**Example** (Returning true from a thunk)

```ts
import { Function } from "effect";
import * as assert from "node:assert";

assert.deepStrictEqual(Function.constTrue(), true);
```

## Since

2.0.0
