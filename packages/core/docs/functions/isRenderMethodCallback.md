[@eslint-react/core](../README.md) / isRenderMethodCallback

# Function: isRenderMethodCallback()

```ts
function isRenderMethodCallback(node: TSESTreeFunction): boolean;
```

Check if the given node is a function within a render method of a class component

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `node` | `TSESTreeFunction` | The AST node to check |

## Returns

`boolean`

`true` if the node is a render function inside a class component

## Example

```tsx
class Component extends React.Component {
  renderHeader = () => <div />; // Returns true
}
```
