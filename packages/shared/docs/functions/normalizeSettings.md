[@eslint-react/shared](../README.md) / normalizeSettings

# Function: normalizeSettings()

```ts
function normalizeSettings(__namedParameters: {
  additionalStateHooks?: string;
  compilationMode?: "off" | "infer" | "annotation" | "syntax" | "all";
  importSource?: string;
  polymorphicPropName?: string;
  version?: string;
}): {
  additionalStateHooks: RegExpLike;
  compilationMode: "off" | "infer" | "annotation" | "syntax" | "all";
  importSource: string;
  isCompilerEnabled: boolean;
  polymorphicPropName: string;
  version: string;
};
```

Normalizes ESLint React settings to a consistent internal format
Transforms component definitions and resolves version information

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `__namedParameters` | \{ `additionalStateHooks?`: `string`; `compilationMode?`: `"off"` \| `"infer"` \| `"annotation"` \| `"syntax"` \| `"all"`; `importSource?`: `string`; `polymorphicPropName?`: `string`; `version?`: `string`; \} | - |
| `__namedParameters.additionalStateHooks?` | `string` | Regex pattern matching custom hooks that should be treated as state hooks **Example** `"useMyState|useCustomState"` |
| `__namedParameters.compilationMode?` | `"off"` \| `"infer"` \| `"annotation"` \| `"syntax"` \| `"all"` | The React Compiler compilationMode that the project is using Used to inform the rule about how components and hooks will be picked up by the compiler **Default** `"annotation"` **Example** `"infer"` |
| `__namedParameters.importSource?` | `string` | The source where React is imported from Allows specifying a custom import location for React **Default** `"react"` **Example** `"@pika/react"` |
| `__namedParameters.polymorphicPropName?` | `string` | The prop name used for polymorphic components Used to determine the component's type **Example** `"as"` |
| `__namedParameters.version?` | `string` | React version to use "detect" means auto-detect React version from project dependencies **Example** `"18.3.1"` **Default** `"detect"` |

## Returns

```ts
{
  additionalStateHooks: RegExpLike;
  compilationMode: "off" | "infer" | "annotation" | "syntax" | "all";
  importSource: string;
  isCompilerEnabled: boolean;
  polymorphicPropName: string;
  version: string;
}
```

| Name | Type |
| ------ | ------ |
| `additionalStateHooks` | [`RegExpLike`](../type-aliases/RegExpLike.md) |
| `compilationMode` | `"off"` \| `"infer"` \| `"annotation"` \| `"syntax"` \| `"all"` |
| `importSource` | `string` |
| `isCompilerEnabled` | `boolean` |
| `polymorphicPropName` | `string` |
| `version` | `string` |
