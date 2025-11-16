[@eslint-react/core](../README.md) / isRenderPropLoose

# Function: isRenderPropLoose()

```ts
function isRenderPropLoose(context: RuleContext, node: JSXAttribute): boolean;
```

Unsafe check whether given JSXAttribute is a render prop
```tsx
_ = <Component renderRow={() => <div />} />
`              ^^^^^^^^^^^^^^^^^^^^^^^^^  `
```

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `context` | `RuleContext` | The rule context |
| `node` | `JSXAttribute` | The AST node to check |

## Returns

`boolean`

`true` if node is a render prop, `false` if not
