[@local/samples](../README.md) / JsxNoLiteralsOptions

# Type Alias: JsxNoLiteralsOptions

```ts
type JsxNoLiteralsOptions = {
  allowedStrings?: string[];
  ignoreProps?: boolean;
  noStrings?: boolean;
};
```

Options for [jsxNoLiterals](../functions/jsxNoLiterals.md).

## Properties

| Property                                               | Type       | Description                                                                      |
| ------------------------------------------------------ | ---------- | -------------------------------------------------------------------------------- |
| <a id="property-allowedstrings"></a> `allowedStrings?` | `string`[] | An array of unique string values that would otherwise warn, but will be ignored. |
| <a id="property-ignoreprops"></a> `ignoreProps?`       | `boolean`  | When `true` the rule ignores literals used in props.                             |
| <a id="property-nostrings"></a> `noStrings?`           | `boolean`  | Enforces no string literals used as children, wrapped or unwrapped.              |
