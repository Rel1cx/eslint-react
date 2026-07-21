[@eslint-react/shared](../README.md) / isESLintSettings

# Function: isESLintSettings()

```ts
function isESLintSettings(settings: unknown): settings is { react-x?: unknown } | undefined;
```

Check if the value is valid ESLint settings.

## Parameters

| Parameter  | Type      | Description         |
| ---------- | --------- | ------------------- |
| `settings` | `unknown` | The value to check. |

## Returns

settings is \{ react-x?: unknown \} \| undefined

`true` if the value is valid ESLint settings.
