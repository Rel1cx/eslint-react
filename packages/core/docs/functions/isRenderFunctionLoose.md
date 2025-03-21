[**@eslint-react/core**](../README.md)

***

[@eslint-react/core](../README.md) / isRenderFunctionLoose

# Function: isRenderFunctionLoose()

> **isRenderFunctionLoose**(`context`, `node`): `boolean`

Unsafe check whether given node is a render function
```jsx
const renderRow = () => <div />
`                 ^^^^^^^^^^^^`
_ = <Component renderRow={() => <div />} />
`                         ^^^^^^^^^^^^^   `
```

## Parameters

### context

[`RuleContext`](../-internal-/type-aliases/RuleContext.md)

The rule context

### node

[`TSESTreeFunction`](../-internal-/type-aliases/TSESTreeFunction.md)

The AST node to check

## Returns

`boolean`

`true` if node is a render function, `false` if not
