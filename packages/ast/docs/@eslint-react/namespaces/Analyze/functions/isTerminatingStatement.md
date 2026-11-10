[@eslint-react/ast](../../../../README.md) / [Analyze](../README.md) / isTerminatingStatement

# Function: isTerminatingStatement()

```ts
function isTerminatingStatement(node: Node): boolean;
```

Check if a statement terminates the control flow of its block.

- Treats `return`, `throw`, `break`, and `continue` as terminating.
- Treats a block as terminating when any direct statement terminates (uses `some`), so unreachable trailing code does not matter.
- Treats an `if` as terminating only when it has an `else` and both branches terminate.
- Treats a `try` as terminating when its finalizer terminates, or when its try block terminates and, if present, its catch body terminates.
- Does not analyze `switch` statements, loops, or labeled statements, so an all-terminating `switch` or an infinite loop is not recognized.
- Is purely syntactic: conditions are not evaluated and no reachability analysis is performed.

## Parameters

| Parameter | Type   | Description        |
| --------- | ------ | ------------------ |
| `node`    | `Node` | The node to check. |

## Returns

`boolean`

`true` if the statement terminates the control flow.
