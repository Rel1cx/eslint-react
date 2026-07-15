[@local/eff](../README.md) / constVoid

# Variable: constVoid

```ts
const constVoid: LazyArg<void> = constUndefined;
```

Returns no meaningful value when called.

**When to use**

Use when you need a thunk that is called only for its effect and has no
meaningful return value.

**Example** (Returning void from a thunk)

```ts
import { Function } from "effect";
import * as assert from "node:assert";

assert.deepStrictEqual(Function.constVoid(), undefined);
```

## Since

2.0.0
