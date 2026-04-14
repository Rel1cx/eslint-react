[@eslint-react/var](../README.md) / computeObjectType

# Function: computeObjectType()

```ts
function computeObjectType(context: RuleContext, node: Node | null): ObjectType | null;
```

Detect the ObjectType of a given node

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `context` | `RuleContext` | The context of the rule |
| `node` | `Node` \| `null` | The node to check |

## Returns

[`ObjectType`](../type-aliases/ObjectType.md) \| `null`

The ObjectType of the node, or undefined if not detected
