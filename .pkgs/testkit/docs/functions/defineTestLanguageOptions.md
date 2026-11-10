[@local/testkit](../README.md) / defineTestLanguageOptions

# Function: defineTestLanguageOptions()

```ts
function defineTestLanguageOptions(input?: TestLanguageOptionsInput): {
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

The single construction site for the language options used by every
harness in this package (rule tester, inline-rule runner, fix runner).

## Parameters

| Parameter | Type                                                                    |
| --------- | ----------------------------------------------------------------------- |
| `input?`  | [`TestLanguageOptionsInput`](../interfaces/TestLanguageOptionsInput.md) |

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
