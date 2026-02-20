[@eslint-react/shared](../README.md) / isESLintReactSettings

# Function: isESLintReactSettings()

```ts
function isESLintReactSettings(settings: unknown): settings is { additionalStateHooks?: string; compilationMode?: "infer" | "annotation" | "syntax" | "all"; importSource?: string; polymorphicPropName?: string; version?: string };
```

Check if the provided settings conform to ESLintReactSettings schema

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `settings` | `unknown` | The settings object to validate |

## Returns

settings is \{ additionalStateHooks?: string; compilationMode?: "infer" \| "annotation" \| "syntax" \| "all"; importSource?: string; polymorphicPropName?: string; version?: string \}
