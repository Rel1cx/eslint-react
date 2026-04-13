[@eslint-react/core](../README.md) / getFunctionInitPath

# Function: getFunctionInitPath()

```ts
function getFunctionInitPath(node: FunctionExpression): FunctionInitPath | null;
```

Identifies the initialization path of a function node in the AST.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `node` | `FunctionExpression` | The function node to analyze. |

## Returns

[`FunctionInitPath`](../type-aliases/FunctionInitPath.md) \| `null`

The function initialization path or `null` if not identifiable.
