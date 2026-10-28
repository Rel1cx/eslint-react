[@eslint-react/ast](../../../../README.md) / [Check](../README.md) / isDirective

# Function: isDirective()

```ts
function isDirective(node: Node, name?: string): node is TSESTreeDirective;
```

Check if a node is a directive (an expression statement in a directive prologue,
ex: `"use client"`), optionally matching a specific name.

## Parameters

| Parameter | Type     | Description                                                       |
| --------- | -------- | ----------------------------------------------------------------- |
| `node`    | `Node`   | The node to check.                                                |
| `name?`   | `string` | The directive name to match. When omitted, any directive matches. |

## Returns

`node is TSESTreeDirective`

`true` if the node is a directive and, when `name` is given, has that name.
