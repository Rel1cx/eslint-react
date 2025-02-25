[**@eslint-react/core**](../README.md)

***

[@eslint-react/core](../README.md) / isRenderPropLoose

# Function: isRenderPropLoose()

> **isRenderPropLoose**(`context`, `node`): `boolean`

Unsafe check whether given JSXAttribute is a render prop
```jsx
_ = <Component renderRow={() => <div />} />
`              ^^^^^^^^^^^^^^^^^^^^^^^^^  `
```

## Parameters

### context

[`Readonly`](../-internal-/type-aliases/Readonly.md)

The rule context

### node

`JSXAttribute`

The AST node to check

## Returns

`boolean`

`true` if node is a render prop, `false` if not
