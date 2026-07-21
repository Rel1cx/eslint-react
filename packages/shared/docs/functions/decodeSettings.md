[@eslint-react/shared](../README.md) / decodeSettings

# Function: decodeSettings()

```ts
function decodeSettings(settings: unknown): {
  additionalEffectHooks?: string;
  additionalStateHooks?: string;
  compilationMode?: "infer" | "annotation" | "syntax" | "all";
  importSource?: string;
  polymorphicPropName?: string;
  version?: string;
};
```

Decode the ESLint React settings, falling back to the defaults when invalid.

## Parameters

| Parameter  | Type      | Description          |
| ---------- | --------- | -------------------- |
| `settings` | `unknown` | The value to decode. |

## Returns

The decoded ESLint React settings.

| Name                     | Type                                                 | Description                                                                                                                                                                   |
| ------------------------ | ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `additionalEffectHooks?` | `string`                                             | Regex pattern matching custom hooks that should be treated as effect hooks. **Example** `"useMyEffect                                                                         |
| `additionalStateHooks?`  | `string`                                             | Regex pattern matching custom hooks that should be treated as state hooks. **Example** `"useMyState                                                                           |
| `compilationMode?`       | `"infer"` \| `"annotation"` \| `"syntax"` \| `"all"` | The React Compiler compilationMode that the project is using. Used to inform the rule about how components and hooks will be picked up by the compiler. **Example** `"infer"` |
| `importSource?`          | `string`                                             | The source where React is imported from. Allows specifying a custom import location for React. **Default** `"react"` **Example** `"@pika/react"`                              |
| `polymorphicPropName?`   | `string`                                             | The prop name used for polymorphic components. Used to determine the component's type. **Example** `"as"`                                                                     |
| `version?`               | `string`                                             | React version to use. "detect" means auto-detect React version from project dependencies. **Example** `"18.3.1"` **Default** `"detect"`                                       |
