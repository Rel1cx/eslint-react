[@local/eff](../README.md) / format

# Function: format()

```ts
function format(input: unknown, options?: {
  ignoreToString?: boolean;
  space?: string | number;
}): string;
```

Converts any JavaScript value into a human-readable string.

**Details**

- Output is **not** valid JSON; use [formatJson](formatJson.md) when you need
  parseable JSON.
- Handles `BigInt`, `Symbol`, `Set`, `Map`, `Date`, `RegExp`, and class
  instances that `JSON.stringify` cannot represent.
- Circular references are shown as `"[Circular]"` instead of throwing.
- Failures while inspecting a value are rendered as diagnostic placeholders instead of throwing.
- Objects with a custom `toString` (not `Object.prototype.toString`):
  `toString()` is called unless `ignoreToString` is `true`.
- `Redactable` values are automatically redacted.
- `space` — indentation unit (number of spaces, or a string like
  `"\t"`). Defaults to `0` (compact).
- `ignoreToString` — skip calling `toString()`. Defaults to `false`.

## Parameters

| Parameter                 | Type                                                                |
| ------------------------- | ------------------------------------------------------------------- |
| `input`                   | `unknown`                                                           |
| `options?`                | \{ `ignoreToString?`: `boolean`; `space?`: `string` \| `number`; \} |
| `options.ignoreToString?` | `boolean`                                                           |
| `options.space?`          | `string` \| `number`                                                |

## Returns

`string`

## Since

2.0.0
