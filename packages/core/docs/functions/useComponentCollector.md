[@eslint-react/core](../README.md) / useComponentCollector

# Function: useComponentCollector()

```ts
function useComponentCollector(context: RuleContext, options?: Options): ReturnType;
```

Get a ctx and visitor object for the rule to collect function components

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `context` | `RuleContext` | The ESLint rule context |
| `options` | [`Options`](../@eslint-react/namespaces/useComponentCollector/type-aliases/Options.md) | The options to use |

## Returns

[`ReturnType`](../@eslint-react/namespaces/useComponentCollector/type-aliases/ReturnType.md)

The ctx and visitor of the collector
