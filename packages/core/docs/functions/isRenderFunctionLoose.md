[**@eslint-react/core**](../README.md)

***

[@eslint-react/core](../README.md) / isRenderFunctionLoose

# Function: isRenderFunctionLoose()

> **isRenderFunctionLoose**(`node`, `context`): `boolean`

Unsafe check whether given node is a render function
```jsx
const renderRow = () => <div />
`                 ^^^^^^^^^^^^`
_ = <Component renderRow={() => <div />} />
`                         ^^^^^^^^^^^^^   `
```

## Parameters

### node

`TSESTreeFunction`

The AST node to check

### context

`Readonly`

The rule context

## Returns

`boolean`

`true` if node is a render function, `false` if not
