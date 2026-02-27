[@eslint-react/eff](../README.md) / isFunction

# Function: isFunction()

```ts
function isFunction(input: unknown): input is Function;
```

Tests if a value is a `function`.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | `unknown` | The value to test. |

## Returns

`input is Function`

`true` if the input is a function, `false` otherwise.

## Example

```ts
import * as assert from "node:assert"
import { isFunction } from "effect/Predicate"

assert.deepStrictEqual(isFunction(isFunction), true)
assert.deepStrictEqual(isFunction("function"), false)
```

## Since

1.0.0
