[@eslint-react/ast](../../../../README.md) / [Collect](../README.md) / getCallExpressions

# Variable: getCallExpressions

```ts
const getCallExpressions: (node: Node) => CallExpression[];
```

Get all nested call expressions within an expression-like node, in source order.

Function and class bodies are not traversed; statement roots contribute only their
expression-bearing parts.

## Parameters

| Parameter | Type   | Description                                                |
| --------- | ------ | ---------------------------------------------------------- |
| `node`    | `Node` | The expression-like node to collect call expressions from. |

## Returns

`CallExpression`[]

All nested call expressions.
