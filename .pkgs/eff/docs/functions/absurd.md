[@local/eff](../README.md) / absurd

# Function: absurd()

```ts
function absurd<A>(_: never): A;
```

Marks an impossible branch by accepting a `never` value and returning any
type.

**When to use**

Use when you need a return value in a branch that exhaustive checks prove
cannot be reached.

**Gotchas**

Calling `absurd` throws, because a value of type `never` should be
impossible at runtime.

**Example** (Handling impossible values)

```ts
import { absurd } from "effect";

const handleNever = (value: never) => {
  return absurd(value); // This will throw an error if called
};
```

## Type Parameters

| Type Parameter |
| -------------- |
| `A`            |

## Parameters

| Parameter | Type    |
| --------- | ------- |
| `_`       | `never` |

## Returns

`A`

## Since

2.0.0
