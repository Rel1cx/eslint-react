[@local/eff](../README.md) / formatJson

# Function: formatJson()

```ts
function formatJson(input: unknown, options?: {
  space?: string | number;
}): string;
```

Stringifies a value to JSON safely, silently dropping circular references.

**Details**

Uses `JSON.stringify` internally with a replacer that tracks the current
object ancestry. Circular references are replaced with `undefined`, which
omits them from object output. `Redactable` values are automatically redacted
before serialization. `BigInt` values are stringified with an `n` suffix.
`Error` instances without a `toJSON` property include their enumerable
properties plus `name` and `message`.

**Gotchas**

When the root input is `undefined`, a symbol, or a function, `formatJson`
returns `"null"` instead of the `undefined` returned by `JSON.stringify`.

## Parameters

| Parameter        | Type                                  |
| ---------------- | ------------------------------------- |
| `input`          | `unknown`                             |
| `options?`       | \{ `space?`: `string` \| `number`; \} |
| `options.space?` | `string` \| `number`                  |

## Returns

`string`

## Since

4.0.0
