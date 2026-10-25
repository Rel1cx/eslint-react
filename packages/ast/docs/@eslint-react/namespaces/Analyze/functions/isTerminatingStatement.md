[@eslint-react/ast](../../../../README.md) / [Analyze](../README.md) / isTerminatingStatement

# Function: isTerminatingStatement()

```ts
function isTerminatingStatement(node: Node): boolean;
```

Check if a statement terminates the control flow of its block.

A statement terminates when it cannot complete normally: a `return`, `throw`,
`break`, or `continue`, a block containing such a statement, an `if` whose
branches both terminate, or a `try` whose paths all terminate. `switch`
statements are not analyzed, so a `switch` whose entry paths all terminate is
not treated as terminating.

## Parameters

| Parameter | Type   | Description        |
| --------- | ------ | ------------------ |
| `node`    | `Node` | The node to check. |

## Returns

`boolean`

`true` if the statement terminates the control flow.
