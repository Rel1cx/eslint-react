[@local/eff](../README.md) / isPromiseLike

# Function: isPromiseLike()

```ts
function isPromiseLike(input: unknown): input is PromiseLike<unknown>;
```

Checks whether a value is `PromiseLike` (has a `then` method).

**When to use**

Use when you need a type guard for promise-like values with a
callable `then` method.

**Details**

Performs a structural check for a callable `then`.

**Example** (Guarding promise-like values)

```ts
import { isPromiseLike } from "@local/eff";

const data: unknown = { then: () => {} };

isPromiseLike(data); // => true
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
