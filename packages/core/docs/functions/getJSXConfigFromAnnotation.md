[@eslint-react/core](../README.md) / getJSXConfigFromAnnotation

# Function: getJSXConfigFromAnnotation()

```ts
function getJSXConfigFromAnnotation(context: RuleContext): JSXConfig;
```

Extract JSX configuration from `@jsx`, `@jsxFrag`, `@jsxRuntime` and
`@jsxImportSource` pragma comments in the source file.

The result is cached per `sourceCode` instance via a `WeakMap` so that
repeated calls from different rules analysing the same file are free.

## Parameters

| Parameter | Type          | Description              |
| --------- | ------------- | ------------------------ |
| `context` | `RuleContext` | The ESLint rule context. |

## Returns

[`JSXConfig`](../interfaces/JSXConfig.md)

Partial `JSXConfig` containing only the values found in pragmas.
