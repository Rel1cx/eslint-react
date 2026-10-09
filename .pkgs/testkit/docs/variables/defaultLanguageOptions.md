[@local/testkit](../README.md) / defaultLanguageOptions

# Variable: defaultLanguageOptions

```ts
const defaultLanguageOptions: {
  ecmaVersion: "latest";
  parserOptions: {
    ecmaFeatures: {
      jsx: true;
    };
    project: false;
    projectService: false;
    warnOnUnsupportedTypeScriptVersion: false;
  };
  sourceType: "module";
};
```

## Type Declaration

| Name                                                | Type                                                                                                                                      | Default value |
| --------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| <a id="property-ecmaversion"></a> `ecmaVersion`     | `"latest"`                                                                                                                                | `"latest"`    |
| <a id="property-parseroptions"></a> `parserOptions` | \{ `ecmaFeatures`: \{ `jsx`: `true`; \}; `project`: `false`; `projectService`: `false`; `warnOnUnsupportedTypeScriptVersion`: `false`; \} | -             |
| `parserOptions.ecmaFeatures`                        | \{ `jsx`: `true`; \}                                                                                                                      | -             |
| `parserOptions.ecmaFeatures.jsx`                    | `true`                                                                                                                                    | `true`        |
| `parserOptions.project`                             | `false`                                                                                                                                   | `false`       |
| `parserOptions.projectService`                      | `false`                                                                                                                                   | `false`       |
| `parserOptions.warnOnUnsupportedTypeScriptVersion`  | `false`                                                                                                                                   | `false`       |
| <a id="property-sourcetype"></a> `sourceType`       | `"module"`                                                                                                                                | `"module"`    |
