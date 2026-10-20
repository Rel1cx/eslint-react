[@eslint-react/core](../README.md) / getJSXConfigFromCompilerOptions

# Function: getJSXConfigFromCompilerOptions()

```ts
function getJSXConfigFromCompilerOptions(context: RuleContext): Required<JSXConfig>;
```

Read JSX configuration from the TypeScript compiler options exposed by the
parser services.

Falls back to sensible React defaults when no compiler options are
available (e.g. when the file is parsed without type information).

## Parameters

| Parameter | Type          | Description              |
| --------- | ------------- | ------------------------ |
| `context` | `RuleContext` | The ESLint rule context. |

## Returns

[`Required`](https://www.typescriptlang.org/docs/handbook/utility-types.html#requiredtype)\<[`JSXConfig`](../interfaces/JSXConfig.md)\>

Fully‑populated `JSXConfig` derived from compiler options.
