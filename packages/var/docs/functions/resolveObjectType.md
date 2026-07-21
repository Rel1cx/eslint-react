[@eslint-react/var](../README.md) / resolveObjectType

# Function: resolveObjectType()

```ts
function resolveObjectType(context: RuleContext, node: Node | null): ObjectType | null;
```

Resolve the object type of the given node.

## Parameters

| Parameter | Type             | Description          |
| --------- | ---------------- | -------------------- |
| `context` | `RuleContext`    | The rule context.    |
| `node`    | `Node` \| `null` | The node to resolve. |

## Returns

[`ObjectType`](../type-aliases/ObjectType.md) \| `null`

The object type of the node, or `null` if it cannot be resolved.
