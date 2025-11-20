[@eslint-react/core](../README.md) / isChildrenOfCreateElement

# Function: isChildrenOfCreateElement()

```ts
function isChildrenOfCreateElement(context: RuleContext, node: Node): boolean;
```

Determines whether inside `createElement`'s children.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `context` | `RuleContext` | The rule context |
| `node` | `Node` | The AST node to check |

## Returns

`boolean`

`true` if the node is inside createElement's children
