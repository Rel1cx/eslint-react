[@eslint-react/ast](../../../../README.md) / [Check](../README.md) / isIdentifier

# Function: isIdentifier()

```ts
function isIdentifier(node: Node, name?: string): node is Identifier;
```

Check if a node is an identifier, optionally matching a specific name.

## Parameters

| Parameter | Type     | Description                                                         |
| --------- | -------- | ------------------------------------------------------------------- |
| `node`    | `Node`   | The node to check.                                                  |
| `name?`   | `string` | The identifier name to match. When omitted, any identifier matches. |

## Returns

`node is Identifier`

`true` if the node is a matching identifier.
