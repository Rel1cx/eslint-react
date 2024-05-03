[**@eslint-react/core**](../README.md) • **Docs**

***

[@eslint-react/core](../README.md) / unsafeIsRenderProp

# Function: unsafeIsRenderProp()

> **unsafeIsRenderProp**(`node`, `context`): `boolean`

Unsafe check whether given JSXAttribute is a render prop
```jsx
_ = <Component renderRow={() => <div />} />
`              ^^^^^^^^^^^^^^^^^^^^^^^^^  `
```

## Parameters

• **node**: `JSXAttribute`

The AST node to check

• **context**: `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\>

The rule context

## Returns

`boolean`

`true` if node is a render prop, `false` if not
