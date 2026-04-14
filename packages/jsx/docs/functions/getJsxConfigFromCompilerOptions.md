[@eslint-react/jsx](../README.md) / getJsxConfigFromCompilerOptions

# Function: getJsxConfigFromCompilerOptions()

```ts
function getJsxConfigFromCompilerOptions(context: RuleContext): Required<JsxConfig>;
```

Read JSX configuration from the TypeScript compiler options exposed by the
parser services.

Falls back to sensible React defaults when no compiler options are
available (e.g. when the file is parsed without type information).

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `context` | `RuleContext` | The ESLint rule context. |

## Returns

[`Required`](https://www.typescriptlang.org/docs/handbook/utility-types.html#requiredtype)\<[`JsxConfig`](../interfaces/JsxConfig.md)\>

Fully‑populated `JsxConfig` derived from compiler options.
