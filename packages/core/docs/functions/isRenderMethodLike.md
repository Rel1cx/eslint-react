[**@eslint-react/core**](../README.md)

***

[@eslint-react/core](../README.md) / isRenderMethodLike

# Function: isRenderMethodLike()

> **isRenderMethodLike**(`node`): `node is TSESTreeMethodOrProperty`

Check whether given node is a render method of a class component

## Parameters

### node

`Node`

The AST node to check

## Returns

`node is TSESTreeMethodOrProperty`

`true` if node is a render function, `false` if not

## Example

```tsx
class Component extends React.Component {
  renderHeader = () => <div />;
  renderFooter = () => <div />;
}
```
