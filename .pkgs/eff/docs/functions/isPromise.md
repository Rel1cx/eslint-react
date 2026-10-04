[@local/eff](../README.md) / isPromise

# Function: isPromise()

```ts
function isPromise(input: unknown): input is Promise<unknown>;
```

Checks whether a value is a `Promise`-like object with `then` and `catch`.

**When to use**

Use when you need a `Predicate` guard for promise instances across realms.

**Details**

Performs a structural check for `then` and `catch` functions.

**Example** (Guarding promises)

```ts
import { Predicate } from "effect";

const data: unknown = Promise.resolve(1);

Predicate.isPromise(data); // => true
```

## Parameters

| Parameter | Type      |
| --------- | --------- |
| `input`   | `unknown` |

## Returns

`input is Promise<unknown>`

## See

[isPromiseLike](isPromiseLike.md)

## Since

2.0.0
