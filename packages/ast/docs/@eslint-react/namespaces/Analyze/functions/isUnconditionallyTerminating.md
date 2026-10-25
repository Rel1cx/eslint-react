[@eslint-react/ast](../../../../README.md) / [Analyze](../README.md) / isUnconditionallyTerminating

# Function: isUnconditionallyTerminating()

```ts
function isUnconditionallyTerminating(node: Node): boolean;
```

Check if every path through a statement exits the current function with a
`return` or `throw`. Unlike [isTerminatingStatement](isTerminatingStatement.md), `break` and
`continue` are not considered terminating.

## Parameters

| Parameter | Type   | Description        |
| --------- | ------ | ------------------ |
| `node`    | `Node` | The node to check. |

## Returns

`boolean`

`true` if the statement unconditionally terminates.
