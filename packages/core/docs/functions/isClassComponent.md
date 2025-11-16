[@eslint-react/core](../README.md) / isClassComponent

# Function: isClassComponent()

```ts
function isClassComponent(node: Node): node is TSESTreeClass;
```

Check if a node is a React class component

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `node` | `Node` | The AST node to check |

## Returns

`node is TSESTreeClass`

`true` if the node is a class component, `false` otherwise
