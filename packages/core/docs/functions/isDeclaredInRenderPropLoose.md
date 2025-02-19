[**@eslint-react/core**](../README.md)

***

[@eslint-react/core](../README.md) / isDeclaredInRenderPropLoose

# Function: isDeclaredInRenderPropLoose()

> **isDeclaredInRenderPropLoose**(`node`): `boolean`

Unsafe check whether given node is declared inside a render prop
```jsx
_ = <Component renderRow={"node"} />
`                         ^^^^^^   `
_ = <Component rows={ [{ render: "node" }] } />
`                                ^^^^^^       `
```

## Parameters

### node

[`Node`](../-internal-/type-aliases/Node.md)

The AST node to check

## Returns

`boolean`

`true` if component is declared inside a render prop, `false` if not
