[@eslint-react/core](../README.md) / isDeclaredInRenderPropLoose

# Function: isDeclaredInRenderPropLoose()

```ts
function isDeclaredInRenderPropLoose(node: Node): boolean;
```

Unsafe check whether given node is declared inside a render prop
```tsx
_ = <Component renderRow={"node"} />
`                         ^^^^^^   `
_ = <Component rows={ [{ render: "node" }] } />
`                                ^^^^^^       `
```

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `node` | `Node` | The AST node to check |

## Returns

`boolean`

`true` if component is declared inside a render prop, `false` if not
