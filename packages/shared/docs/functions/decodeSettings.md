[@eslint-react/shared](../README.md) / decodeSettings

# Function: decodeSettings()

```ts
function decodeSettings(settings: unknown): {
  additionalEffectHooks?: string;
  additionalStateHooks?: string;
  compilationMode?: "infer" | "annotation" | "syntax" | "all";
  environment?: {
    customHooks: Map<string, {
      effectKind:
        | "<unknown>"
        | "capture"
        | "freeze"
        | "mutate"
        | "mutate-iterator?"
        | "mutate?"
        | "read"
        | "store";
      noAlias: boolean;
      transitiveMixedData: boolean;
      valueKind: "maybefrozen" | "frozen" | "primitive" | "global" | "mutable" | "context";
    }>;
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

| Name                      | Type                                                                                                                                                                                                                                                                                                                                                                                                                                         | Description                                                                                                                                                                     |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `additionalEffectHooks?`  | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                     | Regex pattern matching custom hooks that should be treated as effect hooks. **Example** `"useMyEffect                                                                           |
| `additionalStateHooks?`   | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                     | Regex pattern matching custom hooks that should be treated as state hooks. **Example** `"useMyState                                                                             |
| `compilationMode?`        | `"infer"` \| `"annotation"` \| `"syntax"` \| `"all"`                                                                                                                                                                                                                                                                                                                                                                                         | The React Compiler compilationMode that the project is using **Example** `"infer"`                                                                                              |
| `environment?`            | \{ `customHooks`: [`Map`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map)\<`string`, \{ `effectKind`: \| `"<unknown>"` \| `"capture"` \| `"freeze"` \| `"mutate"` \| `"mutate-iterator?"` \| `"mutate?"` \| `"read"` \| `"store"`; `noAlias`: `boolean`; `transitiveMixedData`: `boolean`; `valueKind`: `"maybefrozen"` \| `"frozen"` \| `"primitive"` \| `"global"` \| `"mutable"` \| `"context"`; \}\>; \} | The React Compiler environment configuration that the project is using. **Example** `{ customHooks: new Map([["useRouter", { effectKind: "freeze", valueKind: "mutable" }]]) }` |
| `environment.customHooks` | [`Map`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map)\<`string`, \{ `effectKind`: \| `"<unknown>"` \| `"capture"` \| `"freeze"` \| `"mutate"` \| `"mutate-iterator?"` \| `"mutate?"` \| `"read"` \| `"store"`; `noAlias`: `boolean`; `transitiveMixedData`: `boolean`; `valueKind`: `"maybefrozen"` \| `"frozen"` \| `"primitive"` \| `"global"` \| `"mutable"` \| `"context"`; \}\>                       | -                                                                                                                                                                               |
| `importSource?`           | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                     | The source where React is imported from Allows specifying a custom import location for React. **Default** `"react"` **Example** `"@pika/react"`                                 |
| `polymorphicPropName?`    | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                     | The prop name used for polymorphic components Used to determine the component's type. **Example** `"as"`                                                                        |
| `version?`                | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                     | React version to use "detect" means auto-detect React version from project dependencies. **Example** `"18.3.1"` **Default** `"detect"`                                          |
