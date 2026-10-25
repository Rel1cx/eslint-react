[@local/testkit](../README.md) / getTestRuleLanguageOptions

# Function: getTestRuleLanguageOptions()

```ts
function getTestRuleLanguageOptions(options: RuleRunOptions): {
  parser: __module;
  parserOptions: {
    ecmaFeatures: {
      jsx: boolean;
    };
    jsx: boolean;
    sourceType?: "commonjs" | "module" | "script";
  };
};
```

## Parameters

| Parameter | Type                                                  |
| --------- | ----------------------------------------------------- |
| `options` | [`RuleRunOptions`](../type-aliases/RuleRunOptions.md) |

## Returns

```ts
{
  parser: __module;
  parserOptions: {
     ecmaFeatures: {
        jsx: boolean;
     };
     jsx: boolean;
     sourceType?: "commonjs" | "module" | "script";
  };
}
```

| Name                             | Type                                                                                                                      | Default value |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `parser`                         | `__module`                                                                                                                | `tsParser`    |
| `parserOptions`                  | \{ `ecmaFeatures`: \{ `jsx`: `boolean`; \}; `jsx`: `boolean`; `sourceType?`: `"commonjs"` \| `"module"` \| `"script"`; \} | -             |
| `parserOptions.ecmaFeatures`     | \{ `jsx`: `boolean`; \}                                                                                                   | -             |
| `parserOptions.ecmaFeatures.jsx` | `boolean`                                                                                                                 | -             |
| `parserOptions.jsx`              | `boolean`                                                                                                                 | -             |
| `parserOptions.sourceType?`      | `"commonjs"` \| `"module"` \| `"script"`                                                                                  | -             |
