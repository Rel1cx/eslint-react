[@local/eff](../README.md) / toStringUnknown

# Function: toStringUnknown()

```ts
function toStringUnknown(u: unknown, whitespace?: string | number | undefined): string;
```

Converts an unknown value to a string for diagnostics.

**Details**

Strings are returned unchanged. Objects are formatted as JSON using the
provided whitespace setting when possible, and values that cannot be
formatted are converted with `String`.

## Parameters

| Parameter    | Type                                | Default value |
| ------------ | ----------------------------------- | ------------- |
| `u`          | `unknown`                           | `undefined`   |
| `whitespace` | `string` \| `number` \| `undefined` | `2`           |

## Returns

`string`

## Since

2.0.0
