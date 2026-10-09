[@local/eff](../README.md) / toJson

# Function: toJson()

```ts
function toJson(input: unknown): unknown;
```

Converts a value to its structured inspection representation.

**Details**

This function applies redaction before extracting data from objects that
implement `toJSON`, recursively processes arrays, and handles errors
gracefully. Plain objects are returned unchanged, so the result is not
guaranteed to be accepted by `JSON.stringify`; it may still contain values
such as `BigInt`, functions, or circular references.

## Parameters

| Parameter | Type      |
| --------- | --------- |
| `input`   | `unknown` |

## Returns

`unknown`

## Since

4.0.0
