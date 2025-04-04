[**@eslint-react/core**](../README.md)

***

[@eslint-react/core](../README.md) / isFunctionOfRender

# Function: isFunctionOfRender()

> **isFunctionOfRender**(`node`): `boolean`

Check whether given node is a function of a render function of a class component

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
  render = () => <div />;
```
