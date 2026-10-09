[@local/eff](../README.md) / isTruthy

# Function: isTruthy()

```ts
function isTruthy(input: unknown): boolean;
```

Checks whether a value is truthy.

**When to use**

Use when you want a predicate that mirrors JavaScript truthiness and filters
out falsy values like `0`, `""`, and `false`.

**Details**

This uses `Boolean(input)` and treats `0`, `""`, `false`, `null`, and
`undefined` as false.

**Example** (Filtering truthy values)

```ts
import { Predicate } from "effect"

const values = [0, 1, "", "ok", false]
const truthy = values.filter(Predicate.isTruthy) // => [1, "ok"]
```

## Parameters

| Parameter | Type |
| ------ | ------ |
| `input` | `unknown` |

## Returns

`boolean`

## See

 - [isNullish](isNullish.md)
 - [isNotNullish](isNotNullish.md)

## Since

2.0.0
