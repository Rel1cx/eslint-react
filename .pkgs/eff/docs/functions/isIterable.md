[@local/eff](../README.md) / isIterable

# Function: isIterable()

```ts
function isIterable(input: unknown): input is Iterable<unknown, any, any>;
```

Checks whether a value is iterable.

**When to use**

Use when you need a `Predicate` guard before iterating an unknown value.

**Details**

Accepts strings as iterable and uses `hasProperty` for `Symbol.iterator`.

**Example** (Guarding iterables)

```ts
import { Predicate } from "effect"

const data: unknown = [1, 2, 3]

Predicate.isIterable(data) // => true
```

## Parameters

| Parameter | Type |
| ------ | ------ |
| `input` | `unknown` |

## Returns

`input is Iterable<unknown, any, any>`

## See

 - [isSet](isSet.md)
 - [isMap](isMap.md)

## Since

2.0.0
