[@eslint-react/shared](../README.md) / coerceESLintSettings

# Function: coerceESLintSettings()

```ts
function coerceESLintSettings(settings: unknown): Partial<
  | {
  react-x?: unknown;
}
| undefined>;
```

Coerces unknown input to ESLintSettings type

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `settings` | `unknown` | The settings object to coerce |

## Returns

[`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<
  \| \{
  `react-x?`: `unknown`;
\}
  \| `undefined`\>
