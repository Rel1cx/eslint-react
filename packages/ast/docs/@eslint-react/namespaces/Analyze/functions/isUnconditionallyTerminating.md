[@eslint-react/ast](../../../../README.md) / [Analyze](../README.md) / isUnconditionallyTerminating

# Function: isUnconditionallyTerminating()

```ts
function isUnconditionallyTerminating(node: Node): boolean;
```

Check if every path through a statement exits the current function with a `return` or `throw`.

- Treats only `return` and `throw` as terminating; unlike [isTerminatingStatement](isTerminatingStatement.md), `break` and `continue` are not.
- Inspects only the last statement of a block: `{ foo(); return; }` terminates, while `{ return; foo(); }` does not; earlier `break`/`continue` paths are not modeled.
- Treats an `if` as terminating only when it has an `else` and both branches terminate.
- Treats a `try` as terminating when its finalizer terminates, or when its try block terminates and, if present, its catch body terminates.
- Treats a `while (true)` or `for (;;)` loop as terminating when its body terminates and contains no exiting `break`.
- Treats a `do...while` loop as terminating when its body terminates and contains no exiting `break` or `continue`.
- Treats a `switch` with a `default` clause as terminating when every clause's statements terminate and no clause contains an exiting `break`/`continue`; fall-through clause groups are not recognized.
- Does not analyze labeled statements, and any labeled `break`/`continue` disqualifies the enclosing loop or switch conservatively.
- Is purely syntactic: conditions are not evaluated and no reachability analysis is performed.

## Parameters

| Parameter | Type   | Description        |
| --------- | ------ | ------------------ |
| `node`    | `Node` | The node to check. |

## Returns

`boolean`

`true` if the statement unconditionally terminates.
