[@eslint-react/ast](../../../../README.md) / [Check](../README.md) / isDirective

# Function: isDirective()

```ts
function isDirective(node: Node, name?: string): node is TSESTreeDirective;
```

Check if a node is a directive statement (ex: `"use client"`), optionally matching a specific directive name.

## Parameters

| Parameter | Type     | Description                                                       |
| --------- | -------- | ----------------------------------------------------------------- |
| `node`    | `Node`   | The node to check.                                                |
| `name?`   | `string` | The directive name to match. When omitted, any directive matches. |

## Returns

`node is TSESTreeDirective`

`true` if the node is a matching directive statement.
