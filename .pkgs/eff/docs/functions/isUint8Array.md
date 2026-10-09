[@local/eff](../README.md) / isUint8Array

# Function: isUint8Array()

```ts
function isUint8Array(input: unknown): input is Uint8Array<ArrayBufferLike>;
```

Checks whether a value is a `Uint8Array`.

**When to use**

Use when you need a `Predicate` runtime guard for binary data.

**Details**

Uses `instanceof Uint8Array`.

**Example** (Guarding Uint8Array values)

```ts
import { Predicate } from "effect"

const data: unknown = new Uint8Array([1, 2])

Predicate.isUint8Array(data) // => true
```

## Parameters

| Parameter | Type |
| ------ | ------ |
| `input` | `unknown` |

## Returns

`input is Uint8Array<ArrayBufferLike>`

## See

 - [isIterable](isIterable.md)
 - [isSet](isSet.md)

## Since

2.0.0
