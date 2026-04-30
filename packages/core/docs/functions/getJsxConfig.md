[@eslint-react/core](../README.md) / getJsxConfig

# Function: getJsxConfig()

```ts
function getJsxConfig(context: RuleContext): Required<JsxConfig>;
```

Get the fully‑merged JSX configuration for the current file.

Compiler options provide the base values; pragma annotations found in the
source override them where present.  The result is cached per `sourceCode`.

This is the main entry‑point most consumers should use.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `context` | `RuleContext` | The ESLint rule context. |

## Returns

[`Required`](https://www.typescriptlang.org/docs/handbook/utility-types.html#requiredtype)\<[`JsxConfig`](../interfaces/JsxConfig.md)\>

Fully‑populated, merged `JsxConfig`.
