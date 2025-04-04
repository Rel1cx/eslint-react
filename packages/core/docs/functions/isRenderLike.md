[**@eslint-react/core**](../README.md)

***

[@eslint-react/core](../README.md) / isRenderLike

# Function: isRenderLike()

> **isRenderLike**(`node`): `node is TSESTreeMethodOrProperty`

Check whether given node is a render function of a class component

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
  render() {
   return <div />;
 }
}
```
