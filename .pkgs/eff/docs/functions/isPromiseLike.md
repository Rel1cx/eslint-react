[@local/eff](../README.md) / isPromiseLike

# Function: isPromiseLike()

```ts
function isPromiseLike(input: unknown): input is PromiseLike<unknown>;
```

Checks whether a value is `PromiseLike` (has a `then` method).

**When to use**

Use when you need a `Predicate` guard for promise-like values with a
callable `then` method.

**Details**

Performs a structural check for a callable `then`.

**Example** (Guarding promise-like values)

```ts
import { Predicate } from "effect";

const data: unknown = { then: () => {} };

Predicate.isPromiseLike(data); // => true
```

## Parameters

| Parameter | Type      |
| --------- | --------- |
| `input`   | `unknown` |

## Returns

`input is PromiseLike<unknown>`

## See

[isPromise](isPromise.md)

## Since

2.0.0
