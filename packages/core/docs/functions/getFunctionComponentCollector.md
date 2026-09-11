[@eslint-react/core](../README.md) / getFunctionComponentCollector

# Function: getFunctionComponentCollector()

```ts
function getFunctionComponentCollector(context: RichContext, options?: Options): ReturnType;
```

Get an api and visitor object for the rule to collect function components.

## Parameters

| Parameter | Type                                                                                           | Description            |
| --------- | ---------------------------------------------------------------------------------------------- | ---------------------- |
| `context` | [`RichContext`](../type-aliases/RichContext.md)                                                | The rich rule context. |
| `options` | [`Options`](../@eslint-react/namespaces/getFunctionComponentCollector/type-aliases/Options.md) | The options to use.    |

## Returns

[`ReturnType`](../@eslint-react/namespaces/getFunctionComponentCollector/type-aliases/ReturnType.md)

The api and visitor of the collector.
