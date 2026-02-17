[@eslint-react/shared](../README.md) / decodeSettings

# Function: decodeSettings()

```ts
function decodeSettings(settings: unknown): {
  additionalStateHooks?: string;
  compilationMode?: "off" | "infer" | "annotation" | "syntax" | "all";
  importSource?: string;
  polymorphicPropName?: string;
  version?: string;
};
```

Decodes and validates ESLint React settings, using defaults if invalid

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `settings` | `unknown` | The settings object to decode |

## Returns

| Name | Type | Description |
| ------ | ------ | ------ |
| `additionalStateHooks?` | `string` | Regex pattern matching custom hooks that should be treated as state hooks **Example** `"useMyState|useCustomState"` |
| `compilationMode?` | `"off"` \| `"infer"` \| `"annotation"` \| `"syntax"` \| `"all"` | The React Compiler compilationMode that the project is using Used to inform the rule about how components and hooks will be picked up by the compiler **Default** `"annotation"` **Example** `"infer"` |
| `importSource?` | `string` | The source where React is imported from Allows specifying a custom import location for React **Default** `"react"` **Example** `"@pika/react"` |
| `polymorphicPropName?` | `string` | The prop name used for polymorphic components Used to determine the component's type **Example** `"as"` |
| `version?` | `string` | React version to use "detect" means auto-detect React version from project dependencies **Example** `"18.3.1"` **Default** `"detect"` |
