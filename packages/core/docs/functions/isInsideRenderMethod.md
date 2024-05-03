[**@eslint-react/core**](../README.md) • **Docs**

***

[@eslint-react/core](../README.md) / isInsideRenderMethod

# Function: ~~isInsideRenderMethod()~~

> **isInsideRenderMethod**(`node`, `context`): `boolean`

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

• **context**: `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\>

## Returns

`boolean`

`true` if node is inside class component's render block, `false` if not

## Deprecated

It will be removed in the future
