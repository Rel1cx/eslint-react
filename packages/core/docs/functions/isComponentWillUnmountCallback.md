[@eslint-react/core](../README.md) / isComponentWillUnmountCallback

# Function: isComponentWillUnmountCallback()

```ts
function isComponentWillUnmountCallback(node: Node): boolean;
```

Checks if the node is a function of `componentWillUnmount`

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `node` | `Node` | The AST node to check |

## Returns

`boolean`

`true` if the node is a function of `componentWillUnmount`
