[@eslint-react/shared](../README.md) / decodeESLintSettings

# Function: decodeESLintSettings()

```ts
function decodeESLintSettings(settings: unknown): 
  | {
  react-x?: unknown;
}
  | undefined;
```

Decode the ESLint settings, falling back to the defaults when invalid.

## Parameters

| Parameter  | Type      | Description          |
| ---------- | --------- | -------------------- |
| `settings` | `unknown` | The value to decode. |

## Returns

\| \{
`react-x?`: `unknown`;
\}
\| `undefined`

The decoded ESLint settings.
