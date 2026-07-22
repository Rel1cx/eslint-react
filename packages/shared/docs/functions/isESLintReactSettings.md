[@eslint-react/shared](../README.md) / isESLintReactSettings

# Function: isESLintReactSettings()

```ts
function isESLintReactSettings(
  settings: unknown,
): settings is {
  additionalEffectHooks?: string;
  additionalRefHooks?: string;
  additionalStateHooks?: string;
  compilationMode?: "infer" | "annotation" | "syntax" | "all";
  importSource?: string;
  polymorphicPropName?: string;
  version?: string;
};
```

Check if the value is valid ESLint React settings.

## Parameters

| Parameter  | Type      | Description         |
| ---------- | --------- | ------------------- |
| `settings` | `unknown` | The value to check. |

## Returns

settings is \{ additionalEffectHooks?: string; additionalRefHooks?: string; additionalStateHooks?: string; compilationMode?: "infer" \| "annotation" \| "syntax" \| "all"; importSource?: string; polymorphicPropName?: string; version?: string \}

`true` if the value is valid ESLint React settings.
