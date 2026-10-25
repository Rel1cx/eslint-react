[@eslint-react/ast](../../../../README.md) / [Collect](../README.md) / getNewExpressions

# Variable: getNewExpressions

```ts
const getNewExpressions: (node: Node) => NewExpression[];
```

Get all nested `new` expressions within an expression-like node, in source order.

Function and class bodies are not traversed; statement roots contribute only their
expression-bearing parts.

## Parameters

| Parameter | Type   | Description                                                 |
| --------- | ------ | ----------------------------------------------------------- |
| `node`    | `Node` | The expression-like node to collect `new` expressions from. |

## Returns

`NewExpression`[]

All nested `new` expressions.
