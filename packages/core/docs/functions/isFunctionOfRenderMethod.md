[**@eslint-react/core**](../README.md)

***

[@eslint-react/core](../README.md) / isFunctionOfRenderMethod

# Function: isFunctionOfRenderMethod()

> **isFunctionOfRenderMethod**(`node`): `boolean`

Check whether given node is a function of a render method of a class component

## Parameters

### node

`TSESTreeFunction`

The AST node to check

## Returns

`boolean`

`true` if node is a render function, `false` if not

## Example

```tsx
class Component extends React.Component {
  renderHeader = () => <div />;
  renderFooter = () => <div />;
}
```
