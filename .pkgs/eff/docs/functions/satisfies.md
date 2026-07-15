[@local/eff](../README.md) / satisfies

# Function: satisfies()

```ts
function satisfies<A>(): <B>(b: B) => B;
```

Ensures that the type of an expression matches some type,
without changing the resulting type of that expression.

**When to use**

Use to check assignability while preserving the expression's precise inferred
type.

**Example** (Checking an expression against a type)

```ts
import { Function } from "effect";
import * as assert from "node:assert";

const test1 = Function.satisfies<number>()(5 as const);
// ^? const test: 5
// @ts-expect-error
const test2 = Function.satisfies<string>()(5);
// ^? Argument of type 'number' is not assignable to parameter of type 'string'

assert.deepStrictEqual(Function.satisfies<number>()(5), 5);
```

## Type Parameters

| Type Parameter |
| -------------- |
| `A`            |

## Returns

\<`B`\>(`b`: `B`) => `B`

## See

[cast](../variables/cast.md) for changing only the static TypeScript type

## Since

2.0.0
