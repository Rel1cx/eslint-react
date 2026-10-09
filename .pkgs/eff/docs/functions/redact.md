[@local/eff](../README.md) / redact

# Function: redact()

```ts
function redact(u: unknown): unknown;
```

Returns a redacted value if it implements [Redactable](../interfaces/Redactable.md), otherwise returns it
unchanged.

**Gotchas**

Redaction is not recursive. Nested redactable values inside the returned
object are not automatically redacted.

## Parameters

| Parameter | Type      |
| --------- | --------- |
| `u`       | `unknown` |

## Returns

`unknown`

## Since

3.10.0
