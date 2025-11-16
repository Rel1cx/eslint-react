[@eslint-react/core](../README.md) / isRenderFunctionLoose

# Function: isRenderFunctionLoose()

```ts
function isRenderFunctionLoose(context: RuleContext, node: TSESTreeFunction): boolean;
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
| `node` | `TSESTreeFunction` | The AST node to check |

## Returns

`boolean`

`true` if node is a render function, `false` if not
