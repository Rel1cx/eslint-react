[**@eslint-react/core**](../README.md) • **Docs**

***

[@eslint-react/core](../README.md) / unsafeIsRenderFunction

# Function: unsafeIsRenderFunction()

> **unsafeIsRenderFunction**(`node`, `context`): `boolean`

Unsafe check whether given node is a render function
```jsx
const renderRow = () => <div />
`                 ^^^^^^^^^^^^`
_ = <Component renderRow={() => <div />} />
`                         ^^^^^^^^^^^^^   `
```

## Parameters

• **node**: `TSESTreeFunction`

The AST node to check

• **context**: `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\>

The rule context

## Returns

`boolean`

`true` if node is a render function, `false` if not
