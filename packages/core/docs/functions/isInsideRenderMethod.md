[**@eslint-react/core**](../README.md) • **Docs**

***

[@eslint-react/core](../README.md) / isInsideRenderMethod

# Function: isInsideRenderMethod()

> **isInsideRenderMethod**(`node`): `boolean`

Check whether given node is declared inside class component's render block
```jsx
class Component extends React.Component {
  render() {
    class NestedClassComponent extends React.Component {
     render() { return <div />; }
    }
    const nestedFunctionComponent = () => <div />;
 }
}
```

## Parameters

• **node**: `Node`

The AST node being checked

## Returns

`boolean`

`true` if node is inside class component's render block, `false` if not
