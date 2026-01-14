[@eslint-react/core](../README.md) / isRenderFunctionLoose

# Function: isRenderFunctionLoose()

```ts
function isRenderFunctionLoose(context: RuleContext, node: Node): node is TSESTreeFunction;
```

Unsafe check whether given node is a render function
```tsx
const renderRow = () => <div />
`                 ^^^^^^^^^^^^`
_ = <Component renderRow={() => <div />} />
`                         ^^^^^^^^^^^^^   `
```

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `context` | `RuleContext` | The rule context |
| `node` | `Node` | The AST node to check |

## Returns

`node is TSESTreeFunction`

`true` if node is a render function, `false` if not
