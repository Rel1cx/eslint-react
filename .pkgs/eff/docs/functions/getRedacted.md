[@local/eff](../README.md) / getRedacted

# Function: getRedacted()

```ts
function getRedacted(redactable: Redactable): unknown;
```

Returns the result of calling `[symbolRedactable]` on a value that is
already known to be [Redactable](../interfaces/Redactable.md).

**Details**

Reads the current fiber's `Context` from the global fiber reference when the
real `effect` runtime is present; otherwise an empty context placeholder is
passed to the redaction method.

## Parameters

| Parameter    | Type                                        |
| ------------ | ------------------------------------------- |
| `redactable` | [`Redactable`](../interfaces/Redactable.md) |

## Returns

`unknown`

## Since

4.0.0
