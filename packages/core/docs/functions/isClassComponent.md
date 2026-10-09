[@eslint-react/core](../README.md) / isClassComponent

# Function: isClassComponent()

```ts
function isClassComponent(node: Node): node is TSESTreeClass;
```

Check if the node is a class component (extends `Component` or `PureComponent`).

## Parameters

| Parameter | Type   | Description        |
| --------- | ------ | ------------------ |
| `node`    | `Node` | The node to check. |

## Returns

`node is TSESTreeClass`

`true` if the node is a class component.
