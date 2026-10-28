[@eslint-react/ast](../../../../README.md) / [Collect](../README.md) / getNewExpressions

# Variable: getNewExpressions

```ts
const getNewExpressions: (node: Node) => NewExpression[];
```

Get all `new` expressions within a node, in source order.

The root is included when it is a `new` expression. Function and class nodes are not traversed,
and statement roots contribute only their listed expression-bearing keys.

## Parameters

| Parameter | Type   | Description                                 |
| --------- | ------ | ------------------------------------------- |
| `node`    | `Node` | The node to collect `new` expressions from. |

## Returns

`NewExpression`[]

All matching `new` expressions.
