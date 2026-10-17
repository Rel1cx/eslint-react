[@eslint-react/ast](../../../../README.md) / [Check](../README.md) / isDirective

# Function: isDirective()

```ts
function isDirective(node: Node, name?: string): node is TSESTreeDirective;
```

Check if a node is an expression statement, optionally requiring it to be a directive
with a specific name (ex: `"use client"`).

## Parameters

| Parameter | Type     | Description                                                                  |
| --------- | -------- | ---------------------------------------------------------------------------- |
| `node`    | `Node`   | The node to check.                                                           |
| `name?`   | `string` | The directive name to match. When omitted, any expression statement matches. |

## Returns

`node is TSESTreeDirective`

`true` if the node is an expression statement and, when `name` is given, a directive with that name.
