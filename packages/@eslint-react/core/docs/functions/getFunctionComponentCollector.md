[@eslint-react/core](../README.md) / getFunctionComponentCollector

# Function: getFunctionComponentCollector()

```ts
function getFunctionComponentCollector(context: RuleContext, options?: Options): ReturnType;
```

Get an api and visitor object for the rule to collect function components

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `context` | `RuleContext` | The ESLint rule context |
| `options` | [`Options`](../@eslint-react/namespaces/getFunctionComponentCollector/type-aliases/Options.md) | The options to use |

## Returns

[`ReturnType`](../@eslint-react/namespaces/getFunctionComponentCollector/type-aliases/ReturnType.md)

The api and visitor of the collector
