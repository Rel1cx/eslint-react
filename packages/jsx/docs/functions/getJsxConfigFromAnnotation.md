[@eslint-react/jsx](../README.md) / getJsxConfigFromAnnotation

# Function: getJsxConfigFromAnnotation()

```ts
function getJsxConfigFromAnnotation(context: RuleContext): JsxConfig;
```

Extract JSX configuration from `@jsx`, `@jsxFrag`, `@jsxRuntime` and
`@jsxImportSource` pragma comments in the source file.

The result is cached per `sourceCode` instance via a `WeakMap` so that
repeated calls from different rules analysing the same file are free.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `context` | `RuleContext` | The ESLint rule context. |

## Returns

[`JsxConfig`](../interfaces/JsxConfig.md)

Partial `JsxConfig` containing only the values found in pragmas.
