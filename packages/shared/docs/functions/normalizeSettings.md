[@eslint-react/shared](../README.md) / normalizeSettings

# Function: normalizeSettings()

```ts
function normalizeSettings(settings: {
  additionalEffectHooks?: string;
  additionalStateHooks?: string;
  compilationMode?: "infer" | "annotation" | "syntax" | "all";
  importSource?: string;
  polymorphicPropName?: string;
  version?: string;
}): {
  additionalEffectHooks: RegExpLike;
  additionalStateHooks: RegExpLike;
  compilationMode: "infer" | "annotation" | "syntax" | "all" | "off";
  importSource: string;
  polymorphicPropName: string;
  version: string;
};
```

Normalize the ESLint React settings to the form used by rules.

## Parameters

| Parameter                         | Type                                                                                                                                                                                                                                      | Description                                                                                                                                                                   |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `settings`                        | \{ `additionalEffectHooks?`: `string`; `additionalStateHooks?`: `string`; `compilationMode?`: `"infer"` \| `"annotation"` \| `"syntax"` \| `"all"`; `importSource?`: `string`; `polymorphicPropName?`: `string`; `version?`: `string`; \} | The ESLint React settings to normalize.                                                                                                                                       |
| `settings.additionalEffectHooks?` | `string`                                                                                                                                                                                                                                  | Regex pattern matching custom hooks that should be treated as effect hooks. **Example** `"useMyEffect                                                                         |
| `settings.additionalStateHooks?`  | `string`                                                                                                                                                                                                                                  | Regex pattern matching custom hooks that should be treated as state hooks. **Example** `"useMyState                                                                           |
| `settings.compilationMode?`       | `"infer"` \| `"annotation"` \| `"syntax"` \| `"all"`                                                                                                                                                                                      | The React Compiler compilationMode that the project is using. Used to inform the rule about how components and hooks will be picked up by the compiler. **Example** `"infer"` |
| `settings.importSource?`          | `string`                                                                                                                                                                                                                                  | The source where React is imported from. Allows specifying a custom import location for React. **Default** `"react"` **Example** `"@pika/react"`                              |
| `settings.polymorphicPropName?`   | `string`                                                                                                                                                                                                                                  | The prop name used for polymorphic components. Used to determine the component's type. **Example** `"as"`                                                                     |
| `settings.version?`               | `string`                                                                                                                                                                                                                                  | React version to use. "detect" means auto-detect React version from project dependencies. **Example** `"18.3.1"` **Default** `"detect"`                                       |

## Returns

```ts
{
  additionalEffectHooks: RegExpLike;
  additionalStateHooks: RegExpLike;
  compilationMode: "infer" | "annotation" | "syntax" | "all" | "off";
  importSource: string;
  polymorphicPropName: string;
  version: string;
}
```

The normalized ESLint React settings.

| Name                    | Type                                                            |
| ----------------------- | --------------------------------------------------------------- |
| `additionalEffectHooks` | [`RegExpLike`](../type-aliases/RegExpLike.md)                   |
| `additionalStateHooks`  | [`RegExpLike`](../type-aliases/RegExpLike.md)                   |
| `compilationMode`       | `"infer"` \| `"annotation"` \| `"syntax"` \| `"all"` \| `"off"` |
| `importSource`          | `string`                                                        |
| `polymorphicPropName`   | `string`                                                        |
| `version`               | `string`                                                        |
