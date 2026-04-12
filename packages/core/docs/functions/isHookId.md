[@eslint-react/core](../README.md) / isHookId

# Function: isHookId()

```ts
function isHookId(id: Node): id is Identifier | MemberExpression;
```

Checks if the given node is a hook identifier

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `id` | `Node` | The AST node to check |

## Returns

id is Identifier \| MemberExpression

`true` if the node is a hook identifier or member expression with hook name, `false` otherwise
