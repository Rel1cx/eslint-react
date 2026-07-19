[@eslint-react/shared](../README.md) / isESLintReactSettings

# Function: isESLintReactSettings()

```ts
function isESLintReactSettings(
  settings: unknown,
): settings is {
  additionalEffectHooks?: string;
  additionalStateHooks?: string;
  compilationMode?: "infer" | "annotation" | "syntax" | "all";
  environment?: {
    customHooks: Map<
      string,
      {
        effectKind: "<unknown>" | "capture" | "freeze" | "mutate" | "mutate-iterator?" | "mutate?" | "read" | "store";
        noAlias: boolean;
        transitiveMixedData: boolean;
        valueKind: "maybefrozen" | "frozen" | "primitive" | "global" | "mutable" | "context";
      }
    >;
  };
  importSource?: string;
  polymorphicPropName?: string;
  version?: string;
};
```

## Parameters

| Parameter  | Type      |
| ---------- | --------- |
| `settings` | `unknown` |

## Returns

settings is \{ additionalEffectHooks?: string; additionalStateHooks?: string; compilationMode?: "infer" \| "annotation" \| "syntax" \| "all"; environment?: \{ customHooks: Map\<string, \{ effectKind: "\<unknown\>" \| "capture" \| "freeze" \| "mutate" \| "mutate-iterator?" \| "mutate?" \| "read" \| "store"; noAlias: boolean; transitiveMixedData: boolean; valueKind: "maybefrozen" \| "frozen" \| "primitive" \| "global" \| "mutable" \| "context" \}\> \}; importSource?: string; polymorphicPropName?: string; version?: string \}
