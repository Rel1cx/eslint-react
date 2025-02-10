[**@eslint-react/core**](../README.md)

***

[@eslint-react/core](../README.md) / isRenderPropLoose

# Function: isRenderPropLoose()

> **isRenderPropLoose**(`node`, `context`): `boolean`

Unsafe check whether given JSXAttribute is a render prop
```jsx
_ = <Component renderRow={() => <div />} />
`              ^^^^^^^^^^^^^^^^^^^^^^^^^  `
```

## Parameters

### node

`JSXAttribute`

The AST node to check

### context

`Readonly`

The rule context

## Returns

`boolean`

`true` if node is a render prop, `false` if not
