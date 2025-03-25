[**@eslint-react/core**](../README.md)

***

[@eslint-react/core](../README.md) / isRenderPropLoose

# Function: isRenderPropLoose()

> **isRenderPropLoose**(`context`, `node`): `boolean`

Unsafe check whether given JSXAttribute is a render prop
```tsx
_ = <Component renderRow={() => <div />} />
`              ^^^^^^^^^^^^^^^^^^^^^^^^^  `
```

## Parameters

### context

[`RuleContext`](../-internal-/type-aliases/RuleContext.md)

The rule context

### node

`JSXAttribute`

The AST node to check

## Returns

`boolean`

`true` if node is a render prop, `false` if not
