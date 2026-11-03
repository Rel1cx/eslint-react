[@local/testkit](../README.md) / getTestRuleLanguageOptions

# Function: getTestRuleLanguageOptions()

```ts
function getTestRuleLanguageOptions(options: RuleRunOptions): {
  ecmaVersion: "latest";
  parser: __module;
  parserOptions:
    | {
      disallowAutomaticSingleRunInference: boolean;
      ecmaFeatures: {
        jsx: boolean;
      };
      jsx: boolean;
      project: false;
      projectService: false;
      warnOnUnsupportedTypeScriptVersion: false;
    }
    | {
      ecmaFeatures: {
        jsx: boolean;
      };
      jsx: boolean;
      projectService: true;
      tsconfigRootDir: string;
      warnOnUnsupportedTypeScriptVersion: false;
    }
    | {
      ecmaFeatures: {
        jsx: boolean;
      };
      jsx: boolean;
      project: string;
      projectService: false;
      tsconfigRootDir: string;
      warnOnUnsupportedTypeScriptVersion: false;
    };
  sourceType: "commonjs" | "module" | "script";
};
```

## Parameters

| Parameter | Type                                                  |
| --------- | ----------------------------------------------------- |
| `options` | [`RuleRunOptions`](../type-aliases/RuleRunOptions.md) |

## Returns

```ts
{
  ecmaVersion: "latest";
  parser: __module;
  parserOptions:   | {
     disallowAutomaticSingleRunInference: boolean;
     ecmaFeatures: {
        jsx: boolean;
     };
     jsx: boolean;
     project: false;
     projectService: false;
     warnOnUnsupportedTypeScriptVersion: false;
   }
     | {
     ecmaFeatures: {
        jsx: boolean;
     };
     jsx: boolean;
     projectService: true;
     tsconfigRootDir: string;
     warnOnUnsupportedTypeScriptVersion: false;
   }
     | {
     ecmaFeatures: {
        jsx: boolean;
     };
     jsx: boolean;
     project: string;
     projectService: false;
     tsconfigRootDir: string;
     warnOnUnsupportedTypeScriptVersion: false;
   };
  sourceType: "commonjs" | "module" | "script";
}
```

| Name            | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Default value |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `ecmaVersion`   | `"latest"`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | `"latest"`    |
| `parser`        | `__module`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | `tsParser`    |
| `parserOptions` | \| \{ `disallowAutomaticSingleRunInference`: `boolean`; `ecmaFeatures`: \{ `jsx`: `boolean`; \}; `jsx`: `boolean`; `project`: `false`; `projectService`: `false`; `warnOnUnsupportedTypeScriptVersion`: `false`; \} \| \{ `ecmaFeatures`: \{ `jsx`: `boolean`; \}; `jsx`: `boolean`; `projectService`: `true`; `tsconfigRootDir`: `string`; `warnOnUnsupportedTypeScriptVersion`: `false`; \} \| \{ `ecmaFeatures`: \{ `jsx`: `boolean`; \}; `jsx`: `boolean`; `project`: `string`; `projectService`: `false`; `tsconfigRootDir`: `string`; `warnOnUnsupportedTypeScriptVersion`: `false`; \} | -             |
| `sourceType`    | `"commonjs"` \| `"module"` \| `"script"`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | -             |
