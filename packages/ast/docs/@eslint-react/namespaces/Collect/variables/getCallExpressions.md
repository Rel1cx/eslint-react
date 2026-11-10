[@eslint-react/ast](../../../../README.md) / [Collect](../README.md) / getCallExpressions

# Variable: getCallExpressions

```ts
const getCallExpressions: (node: Node) => CallExpression[];
```

Get all call expressions within a node, in source order.

The root is included when it is a call expression. Function and class nodes are not traversed,
and statement roots contribute only their listed expression-bearing keys.

## Parameters

| Parameter | Type   | Description                                |
| --------- | ------ | ------------------------------------------ |
| `node`    | `Node` | The node to collect call expressions from. |

## Returns

`CallExpression`[]

All matching call expressions.
