[**@eslint-react/core**](../README.md) • **Docs**

***

[@eslint-react/core](../README.md) / unsafeIsDeclaredInRenderProp

# Function: unsafeIsDeclaredInRenderProp()

> **unsafeIsDeclaredInRenderProp**(`node`): `boolean`

Unsafe check whether given node is declared inside a render prop
```jsx
_ = <Component renderRow={"node"} />
`                         ^^^^^^   `
_ = <Component rows={ [{ render: "node" }] } />
`                                ^^^^^^       `
```

## Parameters

• **node**: `Node`

The AST node to check

## Returns

`boolean`

`true` if component is declared inside a render prop, `false` if not
