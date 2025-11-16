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

## Example

```ts
import * as assert from "node:assert"
import { isFunction } from "effect/Predicate"

assert.deepStrictEqual(isFunction(isFunction), true)
assert.deepStrictEqual(isFunction("function"), false)
```

## Since

1.0.0
